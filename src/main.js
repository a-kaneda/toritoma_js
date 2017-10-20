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

// アセット
const ASSETS = {
    image: {
        'player': './images/player.png'
    },
    spritesheet: {
        'player_ss': './images/player_ss.json'
    },
};

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

        // キャラクターレイヤーを作成する。
        this.characterLayer = DisplayElement().addChildTo(this);

        // 自機画像を作成する。
        this.player = Sprite('player', 16, 16);
        this.player.x = this.gridX.center();
        this.player.y = this.gridY.center();
        this.player.addChildTo(this.characterLayer);
        this.player.SPEED = 4;

        // 自機のスプライトシートを作成する。
        this.player_ss = FrameAnimation('player_ss');
        this.player_ss.attachTo(this.player);
        this.player_ss.gotoAndPlay('normal');
    },
    update: function(app) {

        var key = app.keyboard;

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this.player.x -= this.player.SPEED;
        }
        if (key.getKey('right')) {
            this.player.x += this.player.SPEED;
        }
        if (key.getKey('up')) {
            this.player.y -= this.player.SPEED;
        }
        if (key.getKey('down')) {
            this.player.y += this.player.SPEED;
        }
    },
});

// メイン処理
phina.main(function() {

    // アプリケーションを生成する。
    var app = GameApp({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        startLabel: 'main',
        assets: ASSETS,
        fit: false,
    });

    // FPSを設定する。
    app.fps = 60;

    // FPSを表示する。（デバッグ用）
    app.enableStats();

    // アプリケーションを実行する。
    app.run();
});
