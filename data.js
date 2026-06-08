/* ========== カテゴリ ========== */
const CATS = [
  {key:'all',   label:'すべて'},
  {key:'ramen', label:'ラーメン'},
  {key:'burger',label:'バーガー'},
  {key:'pizza', label:'ピザ'},
  {key:'chinese',label:'中華'},
  {key:'sushi', label:'寿司・魚介'},
  {key:'donburi',label:'丼'}
];

/* ========== プロモ ========== */
const PROMOS = [
  {bg:'linear-gradient(135deg,#e7d4a6,#c8a25a)', h:'深夜0時の解放区', p:'罪悪感は明日へ先送り。'},
  {bg:'linear-gradient(135deg,#d6b98c,#a87f4a)', h:'初回 -¥500', p:'背徳の入り口に割引を。'},
  {bg:'linear-gradient(135deg,#c8a25a,#8a6a32)', h:'家系 1/10 で当たり', p:'JOMONを引き当てろ。'},
  {bg:'linear-gradient(135deg,#e0cba0,#b89a63)', h:'請求は永遠に ¥0', p:'届かないからこそ自由。'}
];

/* ========== 画像（TheMealDB・ホットリンクOK・検証済み） ========== */
const IMG = {
  ramen:   'https://www.themealdb.com/images/media/meals/ip5xtp1769779958.jpg',
  ramen2:  'https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg',
  gyoza:   'https://www.themealdb.com/images/media/meals/1525874812.jpg',
  chashu:  'https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg',
  burger:  'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  burger2: 'https://www.themealdb.com/images/media/meals/44bzep1761848278.jpg',
  fries:   'https://www.themealdb.com/images/media/meals/j80gmw1764372176.jpg',
  pizza:   'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
  pizza2:  'https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg',
  pasta:   'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
  loMein:  'https://www.themealdb.com/images/media/meals/1529444830.jpg',
  mapo:    'https://www.themealdb.com/images/media/meals/1525874812.jpg',
  stirfry: 'https://www.themealdb.com/images/media/meals/m0p0j81765568742.jpg',
  sushi:   'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  salmon:  'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
  karaage: 'https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg',
  katsudon:'https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg',
  katsu:   'https://www.themealdb.com/images/media/meals/lwsnkl1604181187.jpg',
  curry:   'https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg',
  gohan:   'https://www.themealdb.com/images/media/meals/kw92t41604181871.jpg'
};

/* ========== 店舗 ========== */
const SHOPS = [
  {
    name:'豚骨ラーメン 縄文', cat:'ramen', time:'25-35分', rate:4.7, rev:1820,
    lat:35.6618, lng:139.7041, hero:IMG.ramen,
    promo:'家系含むカートで JOMON 1/10',
    menu:[
      {n:'豚骨ラーメン', d:'濃厚スープに細麺。背徳の定番。', p:980, img:IMG.ramen},
      {n:'のり増し家系', d:'のり10枚。タレ多め。', p:1080, img:IMG.ramen2},
      {n:'チャーシュー麺', d:'炙りチャーシュー5枚。', p:1280, img:IMG.chashu},
      {n:'餃子', d:'パリッと焼き上げ6個。', p:420, img:IMG.gyoza}
    ]
  },
  {
    name:'グルメバーガー BRUTE', cat:'burger', time:'20-30分', rate:4.6, rev:980,
    lat:35.6645, lng:139.6987, hero:IMG.burger,
    promo:'家系・バーガーで JOMON 1/10',
    menu:[
      {n:'ビッグマウント', d:'パティ2枚＋ベーコン。', p:1380, img:IMG.burger},
      {n:'クラシックバーガー', d:'シンプル王道。', p:980, img:IMG.burger2},
      {n:'フライドポテト L', d:'背徳の山盛り。', p:480, img:IMG.fries}
    ]
  },
  {
    name:'ピザ・ノッテ', cat:'pizza', time:'30-40分', rate:4.5, rev:1340,
    lat:35.6702, lng:139.7100, hero:IMG.pizza,
    promo:'ピザで JOMON 1/10',
    menu:[
      {n:'マルゲリータ', d:'モッツァレラとバジル。', p:1480, img:IMG.pizza},
      {n:'ラザニア風ピザ', d:'チーズ三重奏。', p:1680, img:IMG.pizza2},
      {n:'カルボナーラ・パスタ', d:'濃厚クリーム。', p:1280, img:IMG.pasta}
    ]
  },
  {
    name:'町中華 龍門', cat:'chinese', time:'25-35分', rate:4.4, rev:760,
    lat:35.6580, lng:139.7016, hero:IMG.loMein,
    promo:'',
    menu:[
      {n:'牛肉炒麺', d:'焼きそば牛肉たっぷり。', p:980, img:IMG.loMein},
      {n:'麻婆豆腐', d:'花椒しびれる本格派。', p:880, img:IMG.mapo},
      {n:'牛肉とブロッコリー炒め', d:'白飯が進む。', p:1080, img:IMG.stirfry}
    ]
  },
  {
    name:'寿司・海月', cat:'sushi', time:'30-45分', rate:4.8, rev:2210,
    lat:35.6655, lng:139.7295, hero:IMG.sushi,
    promo:'寿司・魚介はハズレ確定（JOMON出ません）',
    menu:[
      {n:'にぎり盛り合わせ', d:'旬のネタ10貫。', p:1980, img:IMG.sushi},
      {n:'照り焼きサーモン', d:'はちみつ照り焼き。', p:1280, img:IMG.salmon}
    ]
  },
  {
    name:'丼処 ぬくもり', cat:'donburi', time:'20-30分', rate:4.6, rev:1110,
    lat:35.6599, lng:139.6968, hero:IMG.katsudon,
    promo:'',
    menu:[
      {n:'カツ丼', d:'とろ卵とサクサクカツ。', p:880, img:IMG.katsudon},
      {n:'唐揚げ丼', d:'ジューシー唐揚げ5個。', p:780, img:IMG.karaage},
      {n:'カツカレー', d:'特製ルウとトンカツ。', p:980, img:IMG.curry},
      {n:'豚カツ膳', d:'厚切りロース。', p:1080, img:IMG.katsu}
    ]
  }
];

/* ========== ガチャ判定用カテゴリ ========== */
const FISH_CATS  = ['sushi'];        // ハズレ確定
const LUCKY_CATS = ['ramen','pizza','burger']; // 1/10

/* ========== 配達員（12人） ========== */
const RIDERS = [
  {name:'タナカ ケンジ',  img:'https://randomuser.me/api/portraits/men/32.jpg',  rate:'4.9 ・ 配達3,200回'},
  {name:'スズキ ミサキ',  img:'https://randomuser.me/api/portraits/women/44.jpg',rate:'4.8 ・ 配達1,870回'},
  {name:'サトウ リク',    img:'https://randomuser.me/api/portraits/men/65.jpg',  rate:'5.0 ・ 配達5,540回'},
  {name:'イトウ ハルカ',  img:'https://randomuser.me/api/portraits/women/68.jpg',rate:'4.7 ・ 配達980回'},
  {name:'ヤマモト ダイチ',img:'https://randomuser.me/api/portraits/men/12.jpg',  rate:'4.9 ・ 配達4,110回'},
  {name:'ナカムラ ソウタ',img:'https://randomuser.me/api/portraits/men/45.jpg',  rate:'4.6 ・ 配達1,240回'},
  {name:'コバヤシ アオイ',img:'https://randomuser.me/api/portraits/women/22.jpg',rate:'4.8 ・ 配達2,650回'},
  {name:'ワタナベ ユウト',img:'https://randomuser.me/api/portraits/men/76.jpg',  rate:'4.9 ・ 配達3,980回'},
  {name:'タカハシ メイ',  img:'https://randomuser.me/api/portraits/women/90.jpg',rate:'5.0 ・ 配達6,210回'},
  {name:'マツモト レン',  img:'https://randomuser.me/api/portraits/men/8.jpg',   rate:'4.5 ・ 配達640回'},
  {name:'イノウエ サクラ',img:'https://randomuser.me/api/portraits/women/57.jpg',rate:'4.7 ・ 配達1,520回'},
  {name:'キムラ ハヤト',  img:'https://randomuser.me/api/portraits/men/91.jpg',  rate:'4.8 ・ 配達2,990回'}
];

/* ========== JOMON（当たり配達員） ========== */
const JOMON = {name:'草間 縄文', img:'IMG_2764.jpeg', rate:'∞ ・ 配達 ∞回'};
