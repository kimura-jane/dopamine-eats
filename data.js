/* ========== カテゴリ ========== */
const CATS = [
  {key:'all',    label:'すべて'},
  {key:'ramen',  label:'ラーメン'},
  {key:'burger', label:'バーガー'},
  {key:'pizza',  label:'ピザ'},
  {key:'chinese',label:'中華'},
  {key:'sushi',  label:'寿司・魚介'},
  {key:'donburi',label:'丼'}
];

/* ========== プロモ（確率に触れない宣伝文句のみ） ========== */
const PROMOS = [
  {bg:'linear-gradient(135deg,#06c167,#05a356)', h:'深夜0時の解放区', p:'罪悪感は明日へ先送り。'},
  {bg:'linear-gradient(135deg,#0a0a0a,#3a3a3a)', h:'初回 -¥500', p:'背徳の入り口に割引を。'},
  {bg:'linear-gradient(135deg,#05a356,#0a8c49)', h:'請求は永遠に ¥0', p:'届かないからこそ自由。'},
  {bg:'linear-gradient(135deg,#222,#06c167)',    h:'今夜のごほうび', p:'カロリーは見なかったことに。'}
];

/* ========== 画像 ==========
   ラーメン系は種類別に Wikimedia Commons の Special:FilePath（恒久URL・ホットリンク可）。
   その他は TheMealDB（検証済み）。 */
const IMG = {
  // --- ラーメン種類別（Wikimedia Commons） ---
  ramenTonkotsu: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tonkotsu_ramen_in_Tokyo.jpg',
  ramenIekei:    'https://commons.wikimedia.org/wiki/Special:FilePath/Iekeiramen111.jpg',
  ramenToripaitan:'https://commons.wikimedia.org/wiki/Special:FilePath/Ramen-Izumi-Tori-paitan-Nagoya.jpg',
  ramenMiso:     'https://commons.wikimedia.org/wiki/Special:FilePath/Tenkaippin_Miso_Ramen.jpg',
  ramenJiro:     'https://commons.wikimedia.org/wiki/Special:FilePath/Ramen_Jiro_001.jpg',
  ramenShoyu:    'https://commons.wikimedia.org/wiki/Special:FilePath/Soy_ramen.jpg',
  gyoza:         'https://commons.wikimedia.org/wiki/Special:FilePath/Gy%C5%8Dza_003.jpg',
  chashu:        'https://commons.wikimedia.org/wiki/Special:FilePath/Tonkotsu_ramen_in_Tokyo.jpg',

  // --- その他（TheMealDB・検証済み） ---
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

/* ========== 店舗（30軒） ========== */
const SHOPS = [
  // --- ラーメン系（種類別の画像に修正） ---
  {name:'豚骨ラーメン 縄文', cat:'ramen', time:'25-35分', rate:4.7, rev:1820, lat:35.6618, lng:139.7041, hero:IMG.ramenTonkotsu, promo:'深夜営業中',
    menu:[{n:'豚骨ラーメン', d:'濃厚スープに細麺。背徳の定番。', p:980, img:IMG.ramenTonkotsu},
          {n:'のり増し', d:'のり10枚。タレ多め。', p:1080, img:IMG.ramenTonkotsu},
          {n:'チャーシュー麺', d:'炙りチャーシュー5枚。', p:1280, img:IMG.ramenTonkotsu},
          {n:'餃子', d:'パリッと焼き上げ6個。', p:420, img:IMG.gyoza}]},
  {name:'家系ラーメン 武蔵丸', cat:'ramen', time:'20-30分', rate:4.5, rev:990, lat:35.6700, lng:139.6950, hero:IMG.ramenIekei, promo:'',
    menu:[{n:'家系ラーメン 並', d:'豚骨醤油の王道。', p:900, img:IMG.ramenIekei},
          {n:'ライス無料', d:'スープに浸して。', p:0, img:IMG.gohan},
          {n:'味玉ラーメン', d:'とろり半熟。', p:1050, img:IMG.ramenIekei}]},
  {name:'濃厚鶏白湯 とりの', cat:'ramen', time:'25-35分', rate:4.6, rev:1340, lat:35.6555, lng:139.7100, hero:IMG.ramenToripaitan, promo:'',
    menu:[{n:'鶏白湯ラーメン', d:'クリーミーで濃厚。', p:1050, img:IMG.ramenToripaitan},
          {n:'特製チャーシュー丼', d:'ミニサイズの背徳。', p:580, img:IMG.gohan},
          {n:'餃子', d:'肉汁あふれる。', p:420, img:IMG.gyoza}]},
  {name:'背脂煮干し 轟', cat:'ramen', time:'30-40分', rate:4.4, rev:760, lat:35.6480, lng:139.7000, hero:IMG.ramenShoyu, promo:'',
    menu:[{n:'背脂煮干しそば', d:'こってり煮干し。', p:1000, img:IMG.ramenShoyu},
          {n:'のり増し', d:'追いのり。', p:1100, img:IMG.ramenShoyu}]},
  {name:'味噌ラーメン 雪国', cat:'ramen', time:'25-35分', rate:4.5, rev:880, lat:35.6750, lng:139.7200, hero:IMG.ramenMiso, promo:'',
    menu:[{n:'濃厚味噌ラーメン', d:'コクのある赤味噌。', p:980, img:IMG.ramenMiso},
          {n:'炙りチャーシュー麺', d:'香ばしい。', p:1280, img:IMG.ramenMiso},
          {n:'餃子', d:'6個入り。', p:420, img:IMG.gyoza}]},
  {name:'二郎系 漢盛り', cat:'ramen', time:'30-45分', rate:4.3, rev:2100, lat:35.6900, lng:139.7000, hero:IMG.ramenJiro, promo:'大盛無料',
    menu:[{n:'ラーメン マシマシ', d:'野菜・脂・にんにく全部乗せ。', p:1100, img:IMG.ramenJiro},
          {n:'豚増し', d:'分厚いチャーシュー。', p:1400, img:IMG.ramenJiro}]},

  // --- バーガー系 ---
  {name:'グルメバーガー BRUTE', cat:'burger', time:'20-30分', rate:4.6, rev:980, lat:35.6645, lng:139.6987, hero:IMG.burger, promo:'',
    menu:[{n:'ビッグマウント', d:'パティ2枚＋ベーコン。', p:1380, img:IMG.burger},
          {n:'クラシックバーガー', d:'シンプル王道。', p:980, img:IMG.burger2},
          {n:'フライドポテト L', d:'背徳の山盛り。', p:480, img:IMG.fries}]},
  {name:'チーズバーガー研究所', cat:'burger', time:'20-30分', rate:4.5, rev:1240, lat:35.6700, lng:139.7300, hero:IMG.burger2, promo:'',
    menu:[{n:'トリプルチーズ', d:'チーズ3枚溶け盛り。', p:1480, img:IMG.burger2},
          {n:'ベーコンチーズ', d:'カリカリベーコン。', p:1280, img:IMG.burger},
          {n:'ポテト', d:'塩多め。', p:450, img:IMG.fries}]},
  {name:'深夜バーガー NOCT', cat:'burger', time:'15-25分', rate:4.4, rev:640, lat:35.6400, lng:139.7050, hero:IMG.burger, promo:'深夜営業中',
    menu:[{n:'ダブルパティ', d:'夜中の暴力的うまさ。', p:1200, img:IMG.burger},
          {n:'チーズフライ', d:'チーズだく。', p:600, img:IMG.fries}]},
  {name:'アボカドバーガー Green', cat:'burger', time:'25-35分', rate:4.6, rev:870, lat:35.6620, lng:139.7150, hero:IMG.burger2, promo:'',
    menu:[{n:'アボカドベーコン', d:'濃厚アボカド。', p:1380, img:IMG.burger2},
          {n:'クラシック', d:'王道の安心感。', p:980, img:IMG.burger},
          {n:'ポテト L', d:'山盛り。', p:480, img:IMG.fries}]},

  // --- ピザ系 ---
  {name:'ピザ・ノッテ', cat:'pizza', time:'30-40分', rate:4.5, rev:1340, lat:35.6702, lng:139.7100, hero:IMG.pizza, promo:'',
    menu:[{n:'マルゲリータ', d:'モッツァレラとバジル。', p:1480, img:IMG.pizza},
          {n:'ラザニア風ピザ', d:'チーズ三重奏。', p:1680, img:IMG.pizza2},
          {n:'カルボナーラ・パスタ', d:'濃厚クリーム。', p:1280, img:IMG.pasta}]},
  {name:'ナポリピザ Forno', cat:'pizza', time:'30-45分', rate:4.7, rev:1620, lat:35.6800, lng:139.7250, hero:IMG.pizza2, promo:'',
    menu:[{n:'マルゲリータDOC', d:'本格石窯焼き。', p:1580, img:IMG.pizza},
          {n:'クアトロフォルマッジ', d:'4種チーズ。', p:1880, img:IMG.pizza2}]},
  {name:'アメリカンピザ BIG SLICE', cat:'pizza', time:'25-35分', rate:4.3, rev:980, lat:35.6500, lng:139.6900, hero:IMG.pizza, promo:'2枚目半額',
    menu:[{n:'ペパロニLサイズ', d:'背徳の大判。', p:1980, img:IMG.pizza},
          {n:'ミートラバーズ', d:'肉だらけ。', p:2180, img:IMG.pizza2},
          {n:'ガーリックパスタ', d:'にんにく強め。', p:1180, img:IMG.pasta}]},
  {name:'チーズ窯 Lievito', cat:'pizza', time:'30-40分', rate:4.6, rev:1100, lat:35.6850, lng:139.6980, hero:IMG.pizza2, promo:'',
    menu:[{n:'チーズたっぷりマルゲリータ', d:'のびるチーズ。', p:1680, img:IMG.pizza2},
          {n:'ボロネーゼ', d:'肉肉しいパスタ。', p:1380, img:IMG.pasta}]},

  // --- 中華系 ---
  {name:'町中華 龍門', cat:'chinese', time:'25-35分', rate:4.4, rev:760, lat:35.6580, lng:139.7016, hero:IMG.loMein, promo:'',
    menu:[{n:'牛肉炒麺', d:'焼きそば牛肉たっぷり。', p:980, img:IMG.loMein},
          {n:'麻婆豆腐', d:'花椒しびれる本格派。', p:880, img:IMG.mapo},
          {n:'牛肉とブロッコリー炒め', d:'白飯が進む。', p:1080, img:IMG.stirfry}]},
  {name:'四川厨房 紅', cat:'chinese', time:'30-40分', rate:4.5, rev:1020, lat:35.6650, lng:139.7350, hero:IMG.mapo, promo:'',
    menu:[{n:'本格麻婆豆腐', d:'痺れと辛さ。', p:980, img:IMG.mapo},
          {n:'回鍋肉', d:'甘辛味噌炒め。', p:1080, img:IMG.stirfry},
          {n:'焼きそば', d:'香ばしい。', p:880, img:IMG.loMein}]},
  {name:'香港飯店 金龍', cat:'chinese', time:'25-35分', rate:4.3, rev:690, lat:35.6420, lng:139.7180, hero:IMG.stirfry, promo:'',
    menu:[{n:'牛肉オイスター炒め', d:'濃厚オイスター。', p:1180, img:IMG.stirfry},
          {n:'焼きそば', d:'たっぷり野菜。', p:880, img:IMG.loMein}]},
  {name:'餃子酒場 満福', cat:'chinese', time:'20-30分', rate:4.6, rev:1450, lat:35.6720, lng:139.6880, hero:IMG.gyoza, promo:'',
    menu:[{n:'焼き餃子 12個', d:'背徳の山盛り。', p:780, img:IMG.gyoza},
          {n:'麻婆豆腐', d:'ごはんが進む。', p:880, img:IMG.mapo},
          {n:'チャーハン', d:'パラパラ。', p:780, img:IMG.gohan}]},

  // --- 寿司・魚介系 ---
  {name:'寿司・海月', cat:'sushi', time:'30-45分', rate:4.8, rev:2210, lat:35.6655, lng:139.7295, hero:IMG.sushi, promo:'',
    menu:[{n:'にぎり盛り合わせ', d:'旬のネタ10貫。', p:1980, img:IMG.sushi},
          {n:'照り焼きサーモン', d:'はちみつ照り焼き。', p:1280, img:IMG.salmon}]},
  {name:'回転寿司 まる潮', cat:'sushi', time:'25-40分', rate:4.4, rev:1780, lat:35.6500, lng:139.7400, hero:IMG.sushi, promo:'',
    menu:[{n:'特上にぎり', d:'大トロ入り。', p:2480, img:IMG.sushi},
          {n:'サーモンづくし', d:'サーモン5貫。', p:1280, img:IMG.salmon}]},
  {name:'海鮮丼と寿司 漁火', cat:'sushi', time:'30-45分', rate:4.6, rev:1340, lat:35.6780, lng:139.7450, hero:IMG.salmon, promo:'',
    menu:[{n:'海鮮にぎり', d:'新鮮ネタ。', p:1880, img:IMG.sushi},
          {n:'サーモン照り焼き', d:'香ばしい。', p:1180, img:IMG.salmon}]},

  // --- 丼系 ---
  {name:'丼処 ぬくもり', cat:'donburi', time:'20-30分', rate:4.6, rev:1110, lat:35.6599, lng:139.6968, hero:IMG.katsudon, promo:'',
    menu:[{n:'カツ丼', d:'とろ卵とサクサクカツ。', p:880, img:IMG.katsudon},
          {n:'唐揚げ丼', d:'ジューシー唐揚げ5個。', p:780, img:IMG.karaage},
          {n:'カツカレー', d:'特製ルウとトンカツ。', p:980, img:IMG.curry},
          {n:'豚カツ膳', d:'厚切りロース。', p:1080, img:IMG.katsu}]},
  {name:'唐揚げ専門 黄金鶏', cat:'donburi', time:'20-30分', rate:4.7, rev:1560, lat:35.6680, lng:139.7050, hero:IMG.karaage, promo:'',
    menu:[{n:'唐揚げ丼 特盛', d:'唐揚げ8個。', p:980, img:IMG.karaage},
          {n:'唐揚げ単品 6個', d:'おやつに。', p:680, img:IMG.karaage},
          {n:'ごはん大盛', d:'背徳の白米。', p:200, img:IMG.gohan}]},
  {name:'カレーハウス 灯', cat:'donburi', time:'25-35分', rate:4.5, rev:920, lat:35.6450, lng:139.7250, hero:IMG.curry, promo:'',
    menu:[{n:'カツカレー', d:'分厚いカツ。', p:1080, img:IMG.curry},
          {n:'唐揚げカレー', d:'がっつり。', p:1080, img:IMG.curry},
          {n:'大盛ライス', d:'ルウたっぷりで。', p:200, img:IMG.gohan}]},
  {name:'とんかつ 膳屋', cat:'donburi', time:'25-35分', rate:4.6, rev:1080, lat:35.6820, lng:139.7120, hero:IMG.katsu, promo:'',
    menu:[{n:'特厚ロースカツ膳', d:'サクサク衣。', p:1380, img:IMG.katsu},
          {n:'カツ丼', d:'卵とじ。', p:980, img:IMG.katsudon}]},
  {name:'親子丼と天丼 鳥金', cat:'donburi', time:'20-30分', rate:4.5, rev:840, lat:35.6550, lng:139.6850, hero:IMG.gohan, promo:'',
    menu:[{n:'特製カツ丼', d:'ボリューム満点。', p:980, img:IMG.katsudon},
          {n:'唐揚げ丼', d:'ジューシー。', p:880, img:IMG.karaage}]},
  {name:'深夜の丼 喰', cat:'donburi', time:'15-25分', rate:4.3, rev:700, lat:35.6380, lng:139.6980, hero:IMG.katsudon, promo:'深夜営業中',
    menu:[{n:'スタミナカツ丼', d:'夜中の罪。', p:1080, img:IMG.katsudon},
          {n:'カツカレー', d:'シメに。', p:1080, img:IMG.curry}]},
  {name:'からあげ酒場 とり吉', cat:'donburi', time:'20-30分', rate:4.4, rev:990, lat:35.6900, lng:139.7300, hero:IMG.karaage, promo:'',
    menu:[{n:'唐揚げ盛り合わせ', d:'10個入り。', p:1080, img:IMG.karaage},
          {n:'唐揚げ丼', d:'タレだく。', p:880, img:IMG.karaage}]},

  // --- 追加ラーメンで30軒に（醤油） ---
  {name:'醤油らーめん 一灯', cat:'ramen', time:'25-35分', rate:4.6, rev:1230, lat:35.6610, lng:139.7400, hero:IMG.ramenShoyu, promo:'',
    menu:[{n:'中華そば', d:'澄んだ醤油。', p:880, img:IMG.ramenShoyu},
          {n:'チャーシューワンタン麺', d:'贅沢盛り。', p:1380, img:IMG.ramenShoyu},
          {n:'餃子', d:'6個。', p:420, img:IMG.gyoza}]}
];

/* ========== ガチャ判定用カテゴリ（※確率は app.js 側、サイト非表示） ========== */
const FISH_CATS  = ['sushi'];                    // 含むとハズレ確定
const LUCKY_CATS = ['ramen','pizza','burger'];   // ピザ＋家系ラーメン両方で確変

/* ========== 配達員（30人） ========== */
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
  {name:'キムラ ハヤト',  img:'https://randomuser.me/api/portraits/men/91.jpg',  rate:'4.8 ・ 配達2,990回'},
  {name:'ハヤシ ナナ',    img:'https://randomuser.me/api/portraits/women/12.jpg',rate:'4.9 ・ 配達3,410回'},
  {name:'シミズ タクミ',  img:'https://randomuser.me/api/portraits/men/23.jpg',  rate:'4.7 ・ 配達1,760回'},
  {name:'モリ ユイ',      img:'https://randomuser.me/api/portraits/women/33.jpg',rate:'4.8 ・ 配達2,140回'},
  {name:'アベ ショウ',    img:'https://randomuser.me/api/portraits/men/52.jpg',  rate:'4.6 ・ 配達1,090回'},
  {name:'イケダ リン',    img:'https://randomuser.me/api/portraits/women/65.jpg',rate:'5.0 ・ 配達5,880回'},
  {name:'ハシモト カイ',  img:'https://randomuser.me/api/portraits/men/3.jpg',   rate:'4.9 ・ 配達4,330回'},
  {name:'ヤマグチ ミオ',  img:'https://randomuser.me/api/portraits/women/9.jpg', rate:'4.7 ・ 配達1,320回'},
  {name:'マツダ ハル',    img:'https://randomuser.me/api/portraits/men/40.jpg',  rate:'4.8 ・ 配達2,510回'},
  {name:'オカダ ノゾミ',  img:'https://randomuser.me/api/portraits/women/41.jpg',rate:'4.9 ・ 配達3,700回'},
  {name:'ハラ ソラ',      img:'https://randomuser.me/api/portraits/men/55.jpg',  rate:'4.5 ・ 配達720回'},
  {name:'フジタ アカリ',  img:'https://randomuser.me/api/portraits/women/50.jpg',rate:'4.8 ・ 配達2,860回'},
  {name:'ナカジマ ジン',  img:'https://randomuser.me/api/portraits/men/18.jpg',  rate:'4.7 ・ 配達1,640回'},
  {name:'コンドウ エマ',  img:'https://randomuser.me/api/portraits/women/26.jpg',rate:'5.0 ・ 配達6,050回'},
  {name:'イシイ ガク',    img:'https://randomuser.me/api/portraits/men/61.jpg',  rate:'4.6 ・ 配達1,180回'},
  {name:'サカモト ヒナ',  img:'https://randomuser.me/api/portraits/women/72.jpg',rate:'4.9 ・ 配達3,290回'},
  {name:'ヤマザキ ツバサ',img:'https://randomuser.me/api/portraits/men/77.jpg',  rate:'4.8 ・ 配達2,430回'},
  {name:'ムラカミ コハル',img:'https://randomuser.me/api/portraits/women/85.jpg',rate:'4.7 ・ 配達1,510回'},
  {name:'オオタ ダン',    img:'https://randomuser.me/api/portraits/men/99.jpg',  rate:'4.9 ・ 配達4,720回'}
];

/* ========== JOMON（当たり配達員） ========== */
const JOMON = {name:'草間 縄文', img:'IMG_2764.jpeg', rate:'∞ ・ 配達 ∞回'};
