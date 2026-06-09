/* ====== Supabase 設定 ====== */
const SUPABASE_URL = 'https://ovlpawzrjemolbzcdvvh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Uwhc7Oqn2RGDf2W4DQ0SvQ_ijHrwpmT';

let sb = null;
try {
  if (window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) { console.warn('Supabase init failed', e); }

/* ====== UUID（localStorage 保存） ====== */
function getUUID(){
  let u = localStorage.getItem('jomon_uuid');
  if(!u){
    u = (crypto.randomUUID ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{
          const r=Math.random()*16|0, v=c==='x'?r:(r&0x3|0x8); return v.toString(16);
        }));
    localStorage.setItem('jomon_uuid', u);
  }
  return u;
}
const MY_UUID = getUUID();

/* ====== 画面遷移 ====== */
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  if(id==='cart') renderCart();
}

/* ====== 状態 ====== */
let HOME = {lat:35.6618, lng:139.7041};
let currentShop = null;
let cart = [];
let activeCat = 'all';

/* ====== 住所設定 ====== */
async function setAddress(){
  const q = document.getElementById('addrInput').value.trim();
  const msg = document.getElementById('addrMsg');
  if(!q){ msg.textContent='住所を入力してください。'; return; }
  msg.textContent='検索中…';
  try{
    const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(q+' 日本'));
    const data = await res.json();
    if(data && data.length){
      HOME = {lat:parseFloat(data[0].lat), lng:parseFloat(data[0].lon)};
      document.getElementById('deliverTo').textContent = 'お届け先：'+q;
      document.getElementById('deliverTo').style.display='block';
      renderShops();
      go('shops');
    }else{
      msg.textContent='見つかりませんでした。市区町村＋町名で試してください。';
    }
  }catch(e){
    HOME = {lat:35.6618, lng:139.7041};
    document.getElementById('deliverTo').textContent = 'お届け先：'+q;
    document.getElementById('deliverTo').style.display='block';
    renderShops();
    go('shops');
  }
}

/* ====== 距離・配達料 ====== */
function distKm(a,b){
  const R=6371, dLat=(b.lat-a.lat)*Math.PI/180, dLng=(b.lng-a.lng)*Math.PI/180;
  const x=Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function deliveryFee(km){
  let f = 250 + km*120;
  return Math.min(800, Math.max(250, Math.round(f/10)*10));
}

/* ====== プロモ・カテゴリ・店舗描画 ====== */
function renderPromos(){
  document.getElementById('promos').innerHTML = PROMOS.map(p=>
    `<div class="promo" style="background:${p.bg}"><h3>${p.h}</h3><p>${p.p}</p></div>`).join('');
}
function renderCats(){
  document.getElementById('cats').innerHTML = CATS.map(c=>
    `<div class="cat-chip ${c.key===activeCat?'active':''}" onclick="activeCat='${c.key}';renderCats();renderShops()">${c.label}</div>`).join('');
}
function renderShops(){
  const list = SHOPS.filter(s=>activeCat==='all'||s.cat===activeCat);
  document.getElementById('shopList').innerHTML = list.map(s=>{
    const km = distKm(HOME, {lat:s.lat,lng:s.lng});
    const idx = SHOPS.indexOf(s);
    return `<div class="shop" onclick="openShop(${idx})">
      <img class="hero" src="${s.hero}" alt="${s.name}" loading="lazy">
      <div class="body">
        <div class="name">${s.name}</div>
        <div class="meta"><span class="rate">★ ${s.rate}</span><span>(${s.rev})</span><span>${s.time}</span><span>${km.toFixed(1)}km</span></div>
        ${s.promo?`<div class="promo-tag">${s.promo}</div>`:''}
      </div>
    </div>`;
  }).join('');
}

/* ====== 店舗詳細 ====== */
function openShop(idx){
  currentShop = SHOPS[idx];
  const s = currentShop;
  document.getElementById('menuBody').innerHTML = `
    <img class="menu-hero" src="${s.hero}" alt="${s.name}">
    <h2 class="menu-title">${s.name}</h2>
    <div class="menu-sub">★ ${s.rate}（${s.rev}件）・ ${s.time}${s.promo?' ・ '+s.promo:''}</div>
    ${s.menu.map((m,i)=>`
      <div class="mitem">
        <img src="${m.img}" alt="${m.n}" loading="lazy">
        <div class="mi-body">
          <div class="mi-n">${m.n}</div>
          <div class="mi-d">${m.d}</div>
          <div class="mi-p">¥${m.p.toLocaleString()}</div>
        </div>
        <button class="add" onclick="addToCart(${i})">＋</button>
      </div>`).join('')}
  `;
  go('menu');
}

/* ====== カート ====== */
function addToCart(i){
  const m = currentShop.menu[i];
  const found = cart.find(c=>c.n===m.n);
  if(found){ found.q++; } else { cart.push({...m, q:1, cat:currentShop.cat}); }
  updateCartbar();
}
function changeQty(i,d){
  cart[i].q += d;
  if(cart[i].q<=0) cart.splice(i,1);
  renderCart(); updateCartbar();
}
function updateCartbar(){
  const bar = document.getElementById('cartbar');
  if(!cart.length){ bar.style.display='none'; return; }
  const count = cart.reduce((a,c)=>a+c.q,0);
  const sub = cart.reduce((a,c)=>a+c.p*c.q,0);
  document.getElementById('cartbarCount').textContent = count+'点';
  document.getElementById('cartbarTotal').textContent = '¥'+sub.toLocaleString();
  bar.style.display='flex';
}
function calcTotal(coupon){
  const sub = cart.reduce((a,c)=>a+c.p*c.q,0);
  const km = currentShop ? distKm(HOME,{lat:currentShop.lat,lng:currentShop.lng}) : 2;
  const fee = cart.length ? deliveryFee(km) : 0;
  const service = Math.round(sub*0.05);
  let discount = 0;
  if(coupon==='first') discount = 500;
  if(coupon==='half')  discount = Math.round(sub*0.5);
  let total = sub + fee + service - discount;
  if(total<0) total=0;
  return {sub, fee, service, discount, total};
}
function renderCart(){
  const body = document.getElementById('cartBody');
  if(!cart.length){ body.innerHTML='<p style="color:var(--sub)">カートは空です。</p>'; return; }
  const coupon = document.getElementById('couponSel') ? document.getElementById('couponSel').value : 'none';
  const t = calcTotal(coupon);
  body.innerHTML = `
    ${cart.map((c,i)=>`
      <div class="cart-item">
        <div>${c.n}<br><span style="color:var(--sub);font-size:12px">¥${c.p.toLocaleString()}</span></div>
        <div class="ci-qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${c.q}</span>
          <button onclick="changeQty(${i},1)">＋</button>
        </div>
      </div>`).join('')}
    <div class="coupon">
      <select id="couponSel" onchange="renderCart()">
        <option value="none" ${coupon==='none'?'selected':''}>クーポンを選択</option>
        <option value="first" ${coupon==='first'?'selected':''}>初回 -¥500</option>
        <option value="half" ${coupon==='half'?'selected':''}>背徳半額 -50%</option>
      </select>
    </div>
    <div class="totals">
      <div class="row"><span>小計</span><span>¥${t.sub.toLocaleString()}</span></div>
      <div class="row"><span>配達料</span><span>¥${t.fee.toLocaleString()}</span></div>
      <div class="row"><span>サービス料</span><span>¥${t.service.toLocaleString()}</span></div>
      ${t.discount?`<div class="row"><span>割引</span><span>-¥${t.discount.toLocaleString()}</span></div>`:''}
      <div class="row grand"><span>合計</span><span>¥${t.total.toLocaleString()}</span></div>
      <div class="row" style="color:var(--accent-d)"><span>請求額</span><span>¥0</span></div>
    </div>
    <button class="primary" onclick="placeOrder()">この内容で注文（請求 ¥0）</button>
  `;
}

/* ====== ガチャ判定（確率はコード内のみ・サイトには非表示） ====== */
function isJomonHit(){
  const cats = cart.map(c=>c.cat);
  if(cats.some(c=>FISH_CATS.includes(c))) return false;
  if(cats.includes('pizza') && cats.includes('ramen')) return Math.random()<1/10;
  return Math.random()<1/319;
}

/* ====== 注文 ====== */
let lastHit = false;
function placeOrder(){
  if(!cart.length) return;
  lastHit = isJomonHit();
  startTracking(lastHit);
  cart = [];
  updateCartbar();
  go('track');
  if(lastHit) showJackpot();
}

/* ====== 追跡 ====== */
let mapObj = null;
function startTracking(hit){
  const rider = hit ? JOMON : RIDERS[Math.floor(Math.random()*RIDERS.length)];
  const info = document.getElementById('trackInfo');
  const shop = currentShop;

  if(mapObj){ mapObj.remove(); mapObj=null; }
  document.getElementById('map').innerHTML='';
  mapObj = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(mapObj);
  L.marker([shop.lat,shop.lng]).addTo(mapObj).bindPopup(shop.name);
  L.marker([HOME.lat,HOME.lng]).addTo(mapObj).bindPopup('お届け先');
  L.polyline([[shop.lat,shop.lng],[HOME.lat,HOME.lng]],{color:'#06c167'}).addTo(mapObj);

  // 店舗とお届け先の両方が必ず画面に収まるようにする
  const bounds = L.latLngBounds([[shop.lat,shop.lng],[HOME.lat,HOME.lng]]);
  mapObj.fitBounds(bounds, {padding:[40,40]});

  // 地図のサイズを再計算（切れ防止）＋もう一度フィット
  setTimeout(()=>{
    if(mapObj){
      mapObj.invalidateSize();
      mapObj.fitBounds(bounds, {padding:[40,40]});
    }
  }, 300);

  const km = distKm(HOME,{lat:shop.lat,lng:shop.lng});
  let eta = Math.max(8, Math.round(km*6));
  const steps = ['注文を確定','店舗が調理開始','配達員が受け取り','お届け先へ向かっています','配達完了'];
  let stepIdx = 0;

  function render(){
    info.innerHTML = `
      <div class="eta">あと約 ${eta} 分</div>
      <div class="rider">
        <img src="${rider.img}" alt="${rider.name}" onerror="this.style.display='none'">
        <div><div class="r-name">${rider.name}${hit?'（？）':''}</div><div class="r-rate">★ ${rider.rate}</div></div>
      </div>
      <div class="steps">${steps.map((s,i)=>`<div class="step ${i<=stepIdx?'done':''}">${i<=stepIdx?'●':'○'} ${s}</div>`).join('')}</div>
    `;
  }
  render();

  const timer = setInterval(()=>{
    eta = Math.max(0, eta-1);
    if(stepIdx < steps.length-1) stepIdx++;
    render();
    if(stepIdx>=steps.length-1){
      clearInterval(timer);
      showRealAd();
    }
  }, 1500);
}

/* ====== 配達完了後の広告枠 ====== */
function showRealAd(){
  const ad = document.getElementById('realAd');
  ad.style.display='block';
  ad.innerHTML = `
    <h3>本当にお腹が空いたら</h3>
    <p style="font-size:13px;color:var(--sub);line-height:1.7">このアプリでは料理は届きません。実際に注文するなら、下のサービスからどうぞ。</p>
    <a href="https://www.ubereats.com/jp" target="_blank" rel="noopener">Uber Eats で注文する</a>
  `;
}

/* ====== JOMON 当たり演出 ====== */
async function showJackpot(){
  const ov = document.createElement('div');
  ov.className='jackpot show';
  ov.innerHTML = `
    <div class="jp-frame">
      <h2>JOMON 出現</h2>
      <p>草間 縄文 があなたの元へ向かっています</p>
      <img src="${JOMON.img}" style="width:140px;height:140px;border-radius:12px;object-fit:cover;margin-bottom:16px" onerror="this.style.display='none'">
      <br><button onclick="this.closest('.jackpot').remove()">受け取る</button>
    </div>`;
  document.body.appendChild(ov);
  burst();
  await registerJomon();
}
function burst(){
  const colors=['#f5d76e','#06c167','#fff','#ffd24a'];
  for(let i=0;i<60;i++){
    const c=document.createElement('div');
    c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.top='-10px';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(c);
    const fall=2000+Math.random()*1500;
    c.animate([{transform:'translateY(0) rotate(0)'},{transform:`translateY(110vh) rotate(${720*Math.random()}deg)`}],{duration:fall,easing:'ease-in'});
    setTimeout(()=>c.remove(), fall);
  }
}

/* ====== JOMON カウンター（Supabase） ====== */
async function registerJomon(){
  if(!sb) return;
  try{
    const {data, error} = await sb.rpc('increment_jomon', {p_uuid: MY_UUID});
    if(error){ console.warn(error); return; }
    await refreshCounter();
  }catch(e){ console.warn(e); }
}
async function refreshCounter(){
  const countEl = document.getElementById('jcCount');
  const rankEl  = document.getElementById('jcRank');
  if(!sb){ countEl.textContent='0回'; rankEl.textContent='ローカル動作中'; return; }
  try{
    const {data, error} = await sb.rpc('get_jomon_rank', {p_uuid: MY_UUID});
    if(error || !data || !data.length){ countEl.textContent='0回'; rankEl.textContent='計測中…'; return; }
    const r = data[0];
    countEl.textContent = (r.my_count||0)+'回';
    rankEl.textContent  = `${r.my_count?`${r.my_rank}位 / ${r.total}人中`:`全${r.total}人が挑戦中`}`;
  }catch(e){ rankEl.textContent='計測中…'; }
}

/* ====== 初期化 ====== */
function init(){
  renderPromos();
  renderCats();
  renderShops();
  refreshCounter();
  // 初回起動時のみ、パロディである旨を明示（App Store審査対策）
  if(!localStorage.getItem('jomon_disclaimer')){
    alert('Jomon Eats はジョーク／パロディアプリです。料理は実際には届かず、料金は一切発生しません（請求 ¥0）。');
    localStorage.setItem('jomon_disclaimer','1');
  }
}
init();
