var toritoma = toritoma || {};

// phina.jsを読み込む
var phina = require('./vendor/phina.js');

// 各ステージのマップデータを読み込む
var tmx_stage1 = require('./stage1.js');

var tileMapManager = require('./tilemapmanager.js');
var stage = require('./stage.js');
var controlSize = require('./controlsize.js');
var dragonfly = require('./dragonfly.js');

// マウスが接続されているかどうか
toritoma.isMouseUsed = false;

// マウス移動とタッチ操作の際に呼ばれ、タッチ操作でない場合はマウス接続されていると判断する。
function detectDeviceType(event) {
	toritoma.isMouseUsed = !event.changedTouches;
	document.removeEventListener('touchstart', detectDeviceType);
	document.removeEventListener('mousemove', detectDeviceType);
}
document.addEventListener('touchstart', detectDeviceType);
document.addEventListener('mousemove', detectDeviceType);

// phina.js をグローバル領域に展開
phina.globalize();

// モノクロの各色の定義
const COLOR = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// 拡大率
const ZOOM_RATIO = 2;
// スクリーンの幅
const SCREEN_WIDTH = 240 * ZOOM_RATIO;
// スクリーンの高さ
const SCREEN_HEIGHT = 160 * ZOOM_RATIO;
// ゲーム画面のサイズ
const STAGE_RECT = {
    x: 24,
    y: 0,
    width: 192,
    height: 144,
};

// アセット
const ASSETS = {
    image: {
        'player': './images/player.png',
        'back': './images/back.png',
        'block': './images/block.png',
        'control': './images/control.png',
        'enemy_16x16': './images/enemy_16x16.png',
    },
    spritesheet: {
        'player_ss': './images/player_ss.json',
        'enemy_16x16_ss': './images/enemy_16x16_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular.ttf',
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

        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;

        // ゲームパッドを取得する。
        this.gamepadManager = phina.input.GamepadManager();
        this.gamepad = this.gamepadManager.get(0);

        // 背景色を指定する。
        this.backgroundColor = COLOR[0];

        // 背景レイヤーを作成する。
        this.backgroundLayer = DisplayElement().setPosition(STAGE_RECT.x * ZOOM_RATIO, STAGE_RECT.y * ZOOM_RATIO).addChildTo(this);
        this.backgroundLayer.scaleX = ZOOM_RATIO;
        this.backgroundLayer.scaleY = ZOOM_RATIO;

        // キャラクターレイヤーを作成する。
        this.characterLayer = DisplayElement().addChildTo(this);
        this.characterLayer.scaleX = ZOOM_RATIO;
        this.characterLayer.scaleY = ZOOM_RATIO;

        // 枠レイヤーを作成する。
        this.frameLayer = DisplayElement().addChildTo(this);
        this.frameLayer.scaleX = ZOOM_RATIO;
        this.frameLayer.scaleY = ZOOM_RATIO;

        // 情報レイヤーを作成する。
        this.infoLayer = DisplayElement().addChildTo(this);

        // ステージの外枠を作成する。
        this._createFrame();

        // ステージを作成する。
        this.stage = Stage('stage1', this.backgroundLayer, STAGE_RECT.width);

        // スコアラベルを作成する。
        this.scoreLabelBase = RectangleShape({
            height: 22,
            width: 148,
            fill: COLOR[0],
            strokeWidth: 0,
            x: Math.round(this.gridX.center()),
            y: 14,
        }).addChildTo(this.infoLayer);

        this.scoreLabel = Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: COLOR[3],
            fontFamily: 'noto',
        }).addChildTo(this.scoreLabelBase);

        this.score = 0;

        // 自機画像を作成する。
        this.player = Sprite('player', 16, 16);
        this.player.x = Math.round(this.gridX.center() / ZOOM_RATIO);
        this.player.y = Math.round(this.gridY.center() / ZOOM_RATIO);
        this.player.addChildTo(this.characterLayer);

        // 自機の移動スピードを設定する。
        this.player.SPEED_BY_KEY = 2;
        this.player.SPEED_BY_TOUCH = 1.8 / ZOOM_RATIO;
        this.player.SPEED_BY_GAMEPAD = 4;

        // 自機のスプライトシートを作成する。
        this.player_ss = FrameAnimation('player_ss');
        this.player_ss.attachTo(this.player);
        this.player_ss.gotoAndPlay('normal');

        // タッチ情報を初期化する。
        this.touch = {id: -1, x:0, y:0};

        // BGMを再生する。
        SoundManager.playMusic('stage1');
    },
    update: function(app) {

        // ゲームパッドの状態を更新する。
        this.gamepadManager.update();

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

        // '.'入力でコンソールコマンドを入力する。
        if (key.getKeyDown('period')) {
            var command = window.prompt('', '').split(' ');
            switch (command[0]) {
            case 'log':
                console.log('this.' + command[1] + '=' + this[command[1]]);
                break;
            case 'save':
                localStorage.setItem(command[1], command[2]);
                break;
            case 'load':
                console.log(command[1] + '=' + localStorage.getItem(command[1]));
                break;
            case 'clear':
                localStorage.clear();
                console.log('Clear local storage.');
                break;
            case 'score':
                this.score = parseInt(command[1], 10);
                break;
            default:
                break;
            }
        }

        var touches = app.pointers;
        var sliding = false;

        for (var i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!toritoma.isMouseUsed) {

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
                    this.player.x += Math.round((touches[i].x - this.touch.x) * this.player.SPEED_BY_TOUCH);
                    this.player.y += Math.round((touches[i].y - this.touch.y) * this.player.SPEED_BY_TOUCH);
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

        // アナログスティックの入力を取得する。
        var stick = this.gamepad.getStickDirection(0);

        if (stick.length() > 0.5) {
            this.player.position.add(stick.mul(this.player.SPEED_BY_GAMEPAD));
        }

        // スコア表示を更新する。
        this.scoreLabel.text = 'SCORE: ' + ('000000' + this.score).slice(-6);

        this.stage.update(this.characterLayer);
    },
    /**
     * @function _crateFrame
     * @brief ステージ外枠背景作成
     *
     * ステージの外側の枠と背景を作成する。
     */
    _createFrame: function() {

        // ステージの外側の背景を作成する。
        this._createFrameBack();

        // ステージの外側の枠を作成する。
        this._createFrameBar();
    },
    /**
     * @function _createFrameBack
     * @brief ステージ外枠背景作成
     *
     * ステージの外側の背景を作成する。
     */
    _createFrameBack: function() {

        // 左側の枠の座標を計算する。
        var x = 0;
        var y = 0;
        var w = Math.ceil((SCREEN_WIDTH / ZOOM_RATIO - STAGE_RECT.width) / 2);
        var h = SCREEN_HEIGHT / ZOOM_RATIO;

        // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
        if (w % ControlSize.frameBack.w > 0) {
            x -= ControlSize.frameBack.w - w % ControlSize.frameBack.w;
            w += ControlSize.frameBack.w - w % ControlSize.frameBack.w;
        }

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (STAGE_RECT.height % ControlSize.frameBack.h > 0) {
            y -= ControlSize.frameBack.h - STAGE_RECT.height % ControlSize.frameBack.h;
            h += ControlSize.frameBack.h - STAGE_RECT.height % ControlSize.frameBack.h;
        }

        // 背景を並べる。
        for (var i = 0; i < w; i += ControlSize.frameBack.w) {
            for (var j = 0; j < h; j += ControlSize.frameBack.h) {
                var back = Sprite('control', ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.addChildTo(this.frameLayer);
            }
        }

        // 右側の枠の座標を計算する。
        var x = STAGE_RECT.x + STAGE_RECT.width;
        var y = 0;
        var w = Math.ceil((SCREEN_WIDTH / ZOOM_RATIO - STAGE_RECT.width) / 2);
        var h = SCREEN_HEIGHT / ZOOM_RATIO;

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (STAGE_RECT.height % ControlSize.frameBack.h > 0) {
            y -= ControlSize.frameBack.h - STAGE_RECT.height % ControlSize.frameBack.h;
            h += ControlSize.frameBack.h - STAGE_RECT.height % ControlSize.frameBack.h;
        }

        // 背景を並べる。
        for (var i = 0; i < w; i += ControlSize.frameBack.w) {
            for (var j = 0; j < h; j += ControlSize.frameBack.h) {
                var back = Sprite('control', ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.addChildTo(this.frameLayer);
            }
        }

        // 下側の枠の座標を計算する。
        var x = Math.ceil((SCREEN_WIDTH / ZOOM_RATIO - STAGE_RECT.width) / 2);
        var y = STAGE_RECT.height;
        var w = STAGE_RECT.width;
        var h = SCREEN_HEIGHT / ZOOM_RATIO - STAGE_RECT.height;


        // 背景を並べる。
        for (var i = 0; i < w; i += ControlSize.frameBack.w) {
            for (var j = 0; j < h; j += ControlSize.frameBack.h) {
                var back = Sprite('control', ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.w, ControlSize.frameBack.h);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.addChildTo(this.frameLayer);
            }
        }
    },
    /**
     * @function _createFrameBar
     * @brief ステージ外枠作成
     *
     * ステージの外側の枠を作成する。
     */
    _createFrameBar: function() {

        // 左側の枠の位置を計算する。
        var x = STAGE_RECT.x - ControlSize.frameLeft.w;
        var h = STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < h; i += ControlSize.frameLeft.h) {
            var bar = Sprite('control', ControlSize.frameLeft.w, ControlSize.frameLeft.h);
            bar.srcRect.set(ControlSize.frameLeft.x, ControlSize.frameLeft.y, ControlSize.frameLeft.w, ControlSize.frameLeft.h);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 右側の枠の位置を計算する。
        var x = STAGE_RECT.x + STAGE_RECT.width;
        var h = STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < h; i += ControlSize.frameRight.h) {
            var bar = Sprite('control', ControlSize.frameRight.w, ControlSize.frameRight.h);
            bar.srcRect.set(ControlSize.frameRight.x, ControlSize.frameRight.y, ControlSize.frameRight.w, ControlSize.frameRight.h);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 下側の枠の位置を計算する。
        var x = STAGE_RECT.x;
        var y = STAGE_RECT.height;
        var w = STAGE_RECT.width;

        // 枠を並べる。
        for (var i = 0; i < w; i += ControlSize.frameBottom.w) {
            var bar = Sprite('control', ControlSize.frameBottom.w, ControlSize.frameBottom.h);
            bar.srcRect.set(ControlSize.frameBottom.x, ControlSize.frameBottom.y, ControlSize.frameBottom.w, ControlSize.frameBottom.h);
            bar.setOrigin(0, 0);
            bar.setPosition(x + i, y);
            bar.addChildTo(this.frameLayer);
        }

        // 左下の枠の位置を計算する。
        var x = STAGE_RECT.x - ControlSize.frameBottomLeft.w;
        var y = STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.frameBottomLeft.w, ControlSize.frameBottomLeft.h);
        bar.srcRect.set(ControlSize.frameBottomLeft.x, ControlSize.frameBottomLeft.y, ControlSize.frameBottomLeft.w, ControlSize.frameBottomLeft.h);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);

        // 右下の枠の位置を計算する。
        var x = STAGE_RECT.x + STAGE_RECT.width;
        var y = STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.frameBottomRight.w, ControlSize.frameBottomRight.h);
        bar.srcRect.set(ControlSize.frameBottomRight.x, ControlSize.frameBottomRight.y, ControlSize.frameBottomRight.w, ControlSize.frameBottomRight.h);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);
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

    // iOSのsafariではユーザが操作時のみ音の再生が可能なため、タッチ時にダミーで音声の再生を行う。
    // https://github.com/phinajs/phina.js/issues/197
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // アプリケーションを実行する。
    app.run();
});
