// phina.jsを読み込む
var phina = require('./vendor/phina.js');

// phina.js をグローバル領域に展開
phina.globalize();

// モノクロの各色の定義
const COLOR = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// スクリーンの幅
const SCREEN_WIDTH = 480;
// スクリーンの高さ
const SCREEN_HEIGHT = 320;

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });

    // 背景色を指定する。
    this.backgroundColor = COLOR[0];
  },
});

// メイン処理
phina.main(function() {
  
  // アプリケーションを生成する。
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    startLabel: 'main', // メインシーンから開始する。
  });

  // FPSを設定する。
  app.fps = 60;

  // FPSを表示する。（デバッグ用）
  app.enableStats();

  // アプリケーションを実行する。
  app.run();
});
