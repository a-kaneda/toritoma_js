// phina.jsを読み込む
var phina = require('./vendor/phina.js');

// グローバル変数定義用
phina.define('toritoma', {
});

// 各ステージのマップデータを読み込む
var tmx_stage1 = require('./stage1.js');

// 各クラス定義を読み込む。
var myColor = require('./mycolor.js');
var util = require('./util.js');
var screenSize = require('./screensize.js');
var character = require('./character.js');
var tileMapManager = require('./tilemapmanager.js');
var stage = require('./stage.js');
var controlSize = require('./controlsize.js');
var life = require('./life.js');
var chickenGauge = require('./chickengauge.js');
var player = require('./player.js');
var playerShot = require('./playershot.js');
var playerOption = require('./playeroption.js');
var playerDeathEffect = require('./playerdeatheffect.js');
var explosion = require('./explosion.js');
var enemyShot = require('./enemyshot.js');
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

// アセット
const ASSETS = {
    image: {
        'back': './images/back.png',
        'control': './images/control.png',
        'image_8x8': './images/image_8x8.png',
        'image_16x16': './images/image_16x16.png',
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'bomb_min': './sound/bomb_min.mp3',
        'miss': './sound/miss.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular-min.ttf',
    },
};

// MainScene クラスを定義
/**
 * @class MainScene
 * @brief メインシーン
 * ゲームの各ステージをプレイするメインのシーン。
 */
phina.define('MainScene', {
    _static: {
        // 初期残機
        INITIAL_LIFE: 2,
        // 残機位置x座標(ステージ左端からの位置)
        LIFE_POS_X: 32,
        // 残機位置y座標(画面上からの位置)
        LIFE_POS_Y: 12,
        // スコアラベル位置(画面上からの位置)
        SCORE_POS_Y: 12,
        // 復活待機フレーム数
        REBIRTH_WAIT: 60,
        // チキンゲージ位置(画面下からの位置)
        CHICKEN_GAUGE_POS_Y: 12,
    },
    superClass: 'DisplayScene',
    /**
     * @function init
     * @brief コンストラクタ
     * 各種データの初期化と生成を行う。
     */
    init: function() {
        this.superInit({
            width: ScreenSize.SCREEN_WIDTH,
            height: ScreenSize.SCREEN_HEIGHT,
        });

        // デバッグ用にシーンをグローバル変数に入れる。
        toritoma.scene = this;

        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;

        // ゲームパッドを取得する。
        this.gamepadManager = phina.input.GamepadManager();
        this.gamepad = this.gamepadManager.get(0);

        // 背景色を指定する。
        this.backgroundColor = MyColor.BACK_COLOR;

        // 背景レイヤーを作成する。
        this.backgroundLayer = DisplayElement().addChildTo(this);
        this.backgroundLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
                                         ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this.backgroundLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.backgroundLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // キャラクターレイヤーを作成する。
        this.characterLayer = DisplayElement().addChildTo(this);
        this.characterLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
                                        ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this.characterLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.characterLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 枠レイヤーを作成する。
        this.frameLayer = DisplayElement().addChildTo(this);
        this.frameLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.frameLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 情報レイヤーを作成する。
        this.infoLayer = DisplayElement().addChildTo(this);

        // ステージの外枠を作成する。
        this._createFrame();

        // ステージを作成する。
        this.stage = Stage('stage1', this.backgroundLayer);

        // スコアラベルを作成する。
        this.scoreLabelBase = RectangleShape({
            height: 22,
            width: 148,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this.gridX.center()),
            y: MainScene.SCORE_POS_Y,
        }).addChildTo(this.infoLayer);

        this.scoreLabel = Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this.scoreLabelBase);

        this.score = 0;

        // 残機表示を作成する。
        this.lifeLabel = Life();
        this.lifeLabel.getSprite().addChildTo(this.infoLayer);
        this.lifeLabel.getSprite().x = ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO + MainScene.LIFE_POS_X;
        this.lifeLabel.getSprite().y = MainScene.LIFE_POS_Y;

        // 残機を初期化する。
        this._setLife(MainScene.INITIAL_LIFE);

        // チキンゲージを作成する。
        this.chickenGauge = ChickenGauge();
        this.chickenGauge.getSprite().addChildTo(this.infoLayer);
        this.chickenGauge.getSprite().x = Math.round(this.gridX.center());
        this.chickenGauge.getSprite().y = ScreenSize.SCREEN_HEIGHT - MainScene.CHICKEN_GAUGE_POS_Y;

        // 復活待機フレーム数を初期化する。
        this.rebirthWait = 0;

        // キャラクター管理配列を作成する。
        this.characters = [];

        // 自機を作成する。
        this.player = Player(Math.round(ScreenSize.STAGE_RECT.width / 4),
                             Math.round(ScreenSize.STAGE_RECT.height / 2),
                             this);

        // タッチ情報を初期化する。
        this.touch = {id: -1, x:0, y:0};

        // BGMの音量を設定する。
        SoundManager.setVolumeMusic(0.2);

        // BGMを再生する。
        SoundManager.playMusic('stage1');
    },
    /**
     * @function update
     * @brief 更新処理
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     *
     * @param [in] app アプリケーション
     */
    update: function(app) {

        // キーボード入力を行う。
        this._inputKeyboard(app);

        // タッチ入力を行う。
        this._inputTouch(app);

        // ゲームパッド入力を行う。
        this._inputGamepad();

        // ステージの状態を更新する。
        this.stage.update(this);

        // プレイヤーの状態を更新する。
        this.player.update(this);

        // 各キャラクターの状態を更新する。
        for (var i = 0; i < this.characters.length; i++) {
            this.characters[i].update(this);
        }

        // 自機復活処理を行う。
        this._rebirthPlayer();

        // チキンゲージ表示を更新する。
        this.chickenGauge.setRate(this.player.getChickenGauge());

        // スコア表示を更新する。
        this.scoreLabel.text = 'SCORE: ' + ('000000' + this.score).slice(-6);
    },
    /**
     * @function addCharacter
     * @brief キャラクター追加
     * キャラクターを追加する。
     *
     * @param [in] character 追加するキャラクター
     */
    addCharacter: function(character) {
        this.characters.push(character);
    },
    /**
     * @function addCharacterSprite
     * @brief キャラクタースプライトの追加
     * キャラクターのスプライトを追加する。
     *
     * @param [in/out] sprite 追加するスプライト
     */
    addCharacterSprite: function(sprite) {
        sprite.addChildTo(this.characterLayer);
    },
    /**
     * @function removeCharacter
     * @brief キャラクター削除
     * キャラクターを削除する。
     *
     * @param [in/out] character 削除するキャラクター
     */
    removeCharacter: function(character) {
        var i = this.characters.indexOf(character);
        if (i >= 0) {
            this.characters.splice(i, 1);
        }
    },
    /**
     * @function addScore
     * @brief スコア追加
     * スコアを追加する。
     *
     * @param [in] score 追加するスコア
     */
    addScore: function(score) {
        this.score += score;
    },
    /**
     * @function getBlockMap
     * @brief ブロックマップ取得
     * ブロックマップを取得する。
     *
     * @return ブロックマップ
     */
    getBlockMap: function() {
        return this.stage.mapManager.objectMap.collision;
    },
    /**
     * @function getStagePosition
     * @brief ステージ位置取得
     * ステージが左方向に何ドット移動しているかを取得する。
     *
     * @return ステージ位置
     */
    getStagePosition: function() {
        return -this.stage.x;
    },
    /**
     * @function miss
     * @brief 自機死亡時処理
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss: function() {

        // 残機が残っている場合
        if (this.life > 0) {

            // 残機を一つ減らす。
            this._setLife(this.life - 1);

            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this.rebirthWait = MainScene.REBIRTH_WAIT;

            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        // 残機が残っていない場合
        else {
        }
    },
    /**
     * @function isDisableEnemyShot
     * @brief 敵弾が無効化されているかどうか
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     *
     * @return 敵弾が無効化されているかどうか
     */
    isDisableEnemyShot: function() {

        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this.rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    },
    /**
     * @function _inputKeyboard
     * @brief キーボード入力処理
     * キーボードの入力処理を行う。
     *
     * @param [in] app アプリケーション
     */
    _inputKeyboard: function(app) {

        // キーボードを取得する。
        var key = app.keyboard;

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this.player.moveKeyLeft(this);
        }
        if (key.getKey('right')) {
            this.player.moveKeyRight(this);
        }
        if (key.getKey('up')) {
            this.player.moveKeyUp(this);
        }
        if (key.getKey('down')) {
            this.player.moveKeyDown(this);
        }

    },
    /**
     * @function _inputTouch
     * @brief タッチ入力処理
     * タッチの入力処理を行う。
     *
     * @param [in] app アプリケーション
     */
    _inputTouch: function(app) {

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
                    this.player.moveTouch(touches[i].x - this.touch.x, touches[i].y - this.touch.y, this);
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
    /**
     * @function _inputGamepad
     * @brief ゲームパッド入力処理
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad: function() {

        // ゲームパッドの状態を更新する。
        this.gamepadManager.update();

        // アナログスティックの入力を取得する。
        var stick = this.gamepad.getStickDirection(0);

        if (stick.length() > 0.5) {
            this.player.moveGamepad(stick.x, stick.y, this);
        }
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
        var width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

        // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
        if (width % ControlSize.frameBack.width > 0) {
            x -= ControlSize.frameBack.width - width % ControlSize.frameBack.width;
            width += ControlSize.frameBack.width - width % ControlSize.frameBack.width;
        }

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height > 0) {
            y -= ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
            height += ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
        }

        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.frameBack.height) {
                var back = Sprite('control', ControlSize.frameBack.width, ControlSize.frameBack.height);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.width, ControlSize.frameBack.height);
                back.addChildTo(this.frameLayer);
            }
        }

        // 右側の枠の座標を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var y = 0;
        var width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height > 0) {
            y -= ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
            height += ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
        }

        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.frameBack.height) {
                var back = Sprite('control', ControlSize.frameBack.width, ControlSize.frameBack.height);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.width, ControlSize.frameBack.height);
                back.addChildTo(this.frameLayer);
            }
        }

        // 下側の枠の座標を計算する。
        var x = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var y = ScreenSize.STAGE_RECT.height;
        var width = ScreenSize.STAGE_RECT.width;
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.height;


        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.frameBack.height) {
                var back = Sprite('control', ControlSize.frameBack.width, ControlSize.frameBack.height);
                back.srcRect.set(ControlSize.frameBack.x, ControlSize.frameBack.y, ControlSize.frameBack.width, ControlSize.frameBack.height);
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
        var x = ScreenSize.STAGE_RECT.x - ControlSize.frameLeft.width;
        var height = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < height; i += ControlSize.frameLeft.height) {
            var bar = Sprite('control', ControlSize.frameLeft.width, ControlSize.frameLeft.height);
            bar.srcRect.set(ControlSize.frameLeft.x, ControlSize.frameLeft.y, ControlSize.frameLeft.width, ControlSize.frameLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 右側の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var height = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < height; i += ControlSize.frameRight.height) {
            var bar = Sprite('control', ControlSize.frameRight.width, ControlSize.frameRight.height);
            bar.srcRect.set(ControlSize.frameRight.x, ControlSize.frameRight.y, ControlSize.frameRight.width, ControlSize.frameRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 下側の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x;
        var y = ScreenSize.STAGE_RECT.height;
        var width = ScreenSize.STAGE_RECT.width;

        // 枠を並べる。
        for (var i = 0; i < width; i += ControlSize.frameBottom.width) {
            var bar = Sprite('control', ControlSize.frameBottom.width, ControlSize.frameBottom.height);
            bar.srcRect.set(ControlSize.frameBottom.x, ControlSize.frameBottom.y, ControlSize.frameBottom.width, ControlSize.frameBottom.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x + i, y);
            bar.addChildTo(this.frameLayer);
        }

        // 左下の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x - ControlSize.frameBottomLeft.width;
        var y = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.frameBottomLeft.width, ControlSize.frameBottomLeft.height);
        bar.srcRect.set(ControlSize.frameBottomLeft.x, ControlSize.frameBottomLeft.y, ControlSize.frameBottomLeft.width, ControlSize.frameBottomLeft.height);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);

        // 右下の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var y = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.frameBottomRight.width, ControlSize.frameBottomRight.height);
        bar.srcRect.set(ControlSize.frameBottomRight.x, ControlSize.frameBottomRight.y, ControlSize.frameBottomRight.width, ControlSize.frameBottomRight.height);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);
    },
    /**
     * @function _setLife
     * @brief 残機設定
     * 残機を変更し、残機ラベルを更新する。
     */
    _setLife: function(life) {
        this.life = life;
        this.lifeLabel.setLife(this.life);
    },
    /**
     * @function _rebirthPlayer
     * @brief 自機復活処理
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    _rebirthPlayer: function() {

        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this.rebirthWait > 0) {
        
            this.rebirthWait--;
        
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this.rebirthWait <= 0) {

                // 自機を復活させる
                this.player.rebirth(this);
            }
        }
    },
    /**
     * @function _removeEnemyShot
     * @brief 敵弾削除
     * 敵弾をすべて削除する。
     */
    _removeEnemyShot: function() {

        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (var i = this.characters.length - 1; i >= 0; i--) {
            if (this.characters[i].type == Character.type.ENEMY_SHOT) {
                this.characters[i].sprite.remove();
                this.characters.splice(i, 1);
            }
        }

    },
});

// メイン処理
phina.main(function() {

    // 画面サイズの補正の有効無効を切り替える。
    var isFit = true;
    if (localStorage.disableFit == 'true') {
        isFit = false;
    }

    // アプリケーションを生成する。
    var app = GameApp({
        width: ScreenSize.SCREEN_WIDTH,
        height: ScreenSize.SCREEN_HEIGHT,
        startLabel: 'main',
        assets: ASSETS,
        fit: isFit,
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
