// phina.jsを読み込む
var phina = require('./vendor/phina.js');

// マウスが接続されているかどうか
var isMouseUsed = false;

function detectDeviceType(event) {
	isMouseUsed = !event.changedTouches;
    console.log('isMouseUsed=' + isMouseUsed);
	document.removeEventListener('touchstart', detectDeviceType);
	document.removeEventListener('mousemove', detectDeviceType);
}
document.addEventListener('touchstart', detectDeviceType);
document.addEventListener('mousemove', detectDeviceType);

// phina.js をグローバル領域に展開
phina.globalize();

// モノクロの各色の定義
const COLOR = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// スクリーンの幅
const SCREEN_WIDTH = 240;
// スクリーンの高さ
const SCREEN_HEIGHT = 160;

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

        // 自機の移動スピードを設定する。
        this.player.SPEED_BY_KEY = 2;
        this.player.SPEED_BY_TOUCH = 1.8;

        // 自機のスプライトシートを作成する。
        this.player_ss = FrameAnimation('player_ss');
        this.player_ss.attachTo(this.player);
        this.player_ss.gotoAndPlay('normal');

        // タッチ情報を初期化する。
        this.touch = {id: -1, x:0, y:0};
    },
    update: function(app) {

        var key = app.keyboard;

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this.player.x -= this.player.SPEED_BY_KEY;
        }
        if (key.getKey('right')) {
            this.player.x += this.player.SPEED_BY_KEY;
        }
        if (key.getKey('up')) {
            this.player.y -= this.player.SPEED_BY_KEY;
        }
        if (key.getKey('down')) {
            this.player.y += this.player.SPEED_BY_KEY;
        }

        var touches = app.pointers;
        var sliding = false;

        for (var i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!isMouseUsed) {

                // スライド操作をしていない状態だった場合、最初のタッチ位置を記憶する。
                if (this.touch.id < 0) {
                    this.touch.id = touches[i].id;
                    this.touch.x = touches[i].x;
                    this.touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }

                // スライド操作をしている場合はスライド量に応じて自機を移動する。
                if (this.touch.id == touches[i].id) {
                    this.player.x += (touches[i].x - this.touch.x) * this.player.SPEED_BY_TOUCH;
                    this.player.y += (touches[i].y - this.touch.y) * this.player.SPEED_BY_TOUCH;
                    this.touch.x = touches[i].x;
                    this.touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
            }
        }

        // スライドしていない場合はタッチ情報を初期化する。
        if (!sliding) {
            this.touch.id = -1;
            this.touch.x = 0;
            this.touch.y = 0;
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
    });

    // FPSを設定する。
    app.fps = 60;

    // FPSを表示する。（デバッグ用）
    app.enableStats();

    // アプリケーションを実行する。
    app.run();
});
