import PointDevice from './pointdevice.js'
import MyColor from './mycolor.js'
import ScreenSize from './screensize.js'
import ControlSize from './controlsize.js'
import Character from './character.js'
import Stage from './stage.js'
import Player from './player.js'
import Life from './life.js'
import ChickenGauge from './chickengauge.js'
import ShieldButton from './shieldbutton.js'

// 初期残機
const INITIAL_LIFE = 2;
// 残機位置x座標(ステージ左端からの位置)
const LIFE_POS_X = 32;
// 残機位置y座標(画面上からの位置)
const LIFE_POS_Y = 12;
// スコアラベル位置(画面上からの位置)
const SCORE_POS_Y = 12;
// 復活待機フレーム数
const REBIRTH_WAIT = 60;
// チキンゲージ位置(画面下からの位置)
const CHICKEN_GAUGE_POS_Y = 12;
// シールドボタン位置x座標(画面右からの位置)
const SHIELD_BUTTON_POS_X = 50;
// シールドボタン位置y座標(画面下からの位置)
const SHIELD_BUTTON_POS_Y = 50;

/**
 * @class PlayingScene
 * @brief メインシーン
 * ゲームの各ステージをプレイするメインのシーン。
 */
export default class PlayingScene {

    /**
     * @function init
     * @brief コンストラクタ
     * 各種データの初期化と生成を行う。
     *
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene) {

        // デバッグ用にシーンをグローバル変数に入れる。
        DebugObject.scene = this;

        // phina.jsのシーンインスタンスを保持する。
        this.phinaScene = phinaScene;

        // ゲームパッドを取得する。
        this.gamepadManager = phina.input.GamepadManager();
        this.gamepad = this.gamepadManager.get(0);

        // 背景レイヤーを作成する。
        this.backgroundLayer = DisplayElement().addChildTo(this.phinaScene);
        this.backgroundLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
                                         ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this.backgroundLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.backgroundLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // キャラクターレイヤーを作成する。
        this.characterLayer = DisplayElement().addChildTo(this.phinaScene);
        this.characterLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
                                        ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this.characterLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.characterLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 枠レイヤーを作成する。
        this.frameLayer = DisplayElement().addChildTo(this.phinaScene);
        this.frameLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this.frameLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 情報レイヤーを作成する。
        this.infoLayer = DisplayElement().addChildTo(this.phinaScene);

        // ステージの外枠を作成する。
        this._createFrame();

        // ステージを作成する。
        this.stage = new Stage('stage1', this.backgroundLayer);

        // スコアラベルを作成する。
        this.scoreLabelBase = RectangleShape({
            height: 22,
            width: 148,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this.phinaScene.gridX.center()),
            y: SCORE_POS_Y,
        }).addChildTo(this.infoLayer);

        this.scoreLabel = Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this.scoreLabelBase);

        this.score = 0;

        // 残機表示を作成する。
        this.lifeLabel = new Life();
        this.lifeLabel.getSprite().addChildTo(this.infoLayer);
        this.lifeLabel.getSprite().x = ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO + LIFE_POS_X;
        this.lifeLabel.getSprite().y = LIFE_POS_Y;

        // 残機を初期化する。
        this._setLife(INITIAL_LIFE);

        // シールドボタンを作成する。
        this.shieldButton = new ShieldButton();
        this.shieldButton.getSprite().addChildTo(this.infoLayer);
        this.shieldButton.getSprite().x = ScreenSize.SCREEN_WIDTH - SHIELD_BUTTON_POS_X; 
        this.shieldButton.getSprite().y = ScreenSize.SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y; 

        // チキンゲージを作成する。
        this.chickenGauge = new ChickenGauge();
        this.chickenGauge.getSprite().addChildTo(this.infoLayer);
        this.chickenGauge.getSprite().x = Math.round(this.phinaScene.gridX.center());
        this.chickenGauge.getSprite().y = ScreenSize.SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;

        // 復活待機フレーム数を初期化する。
        this.rebirthWait = 0;

        // キャラクター管理配列を作成する。
        this.characters = [];

        // 自機を作成する。
        this.player = new Player(Math.round(ScreenSize.STAGE_RECT.width / 4),
                                 Math.round(ScreenSize.STAGE_RECT.height / 2),
                                 this);

        // タッチ情報を初期化する。
        this.touch = {id: -1, x:0, y:0};

        // BGMの音量を設定する。
        SoundManager.setVolumeMusic(0.2);

        // BGMを再生する。
        SoundManager.playMusic('stage1');
    }

    /**
     * @function update
     * @brief 更新処理
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     *
     * @param [in] app アプリケーション
     */
    update(app) {

        // ボタン入力状態を初期化する。
        this.inputShieldButton = false;

        // キーボード入力を行う。
        this._inputKeyboard(app);

        // タッチ入力を行う。
        this._inputTouch(app);

        // ゲームパッド入力を行う。
        this._inputGamepad();

        // シールドボタン入力状態に応じて自機の状態を変化させる。
        if (this.inputShieldButton) {
            this.player.setShield(true);
        }
        else {
            this.player.setShield(false);
        }

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
    }

    /**
     * @function addCharacter
     * @brief キャラクター追加
     * キャラクターを追加する。
     *
     * @param [in] character 追加するキャラクター
     */
    addCharacter(character) {
        this.characters.push(character);
    }

    /**
     * @function addCharacterSprite
     * @brief キャラクタースプライトの追加
     * キャラクターのスプライトを追加する。
     *
     * @param [in/out] sprite 追加するスプライト
     */
    addCharacterSprite(sprite) {
        sprite.addChildTo(this.characterLayer);
    }

    /**
     * @function removeCharacter
     * @brief キャラクター削除
     * キャラクターを削除する。
     *
     * @param [in/out] character 削除するキャラクター
     */
    removeCharacter(character) {
        var i = this.characters.indexOf(character);
        if (i >= 0) {
            this.characters.splice(i, 1);
        }
    }

    /**
     * @function addScore
     * @brief スコア追加
     * スコアを追加する。
     *
     * @param [in] score 追加するスコア
     */
    addScore(score) {
        this.score += score;
    }

    /**
     * @function getBlockMap
     * @brief ブロックマップ取得
     * ブロックマップを取得する。
     *
     * @return ブロックマップ
     */
    getBlockMap() {
        return this.stage.mapManager.objectMap.collision;
    }

    /**
     * @function getStagePosition
     * @brief ステージ位置取得
     * ステージが左方向に何ドット移動しているかを取得する。
     *
     * @return ステージ位置
     */
    getStagePosition() {
        return -this.stage.x;
    }

    /**
     * @function miss
     * @brief 自機死亡時処理
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss() {

        // 残機が残っている場合
        if (this.life > 0) {

            // 残機を一つ減らす。
            this._setLife(this.life - 1);

            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this.rebirthWait = REBIRTH_WAIT;

            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        // 残機が残っていない場合
        else {
        }
    }

    /**
     * @function isDisableEnemyShot
     * @brief 敵弾が無効化されているかどうか
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     *
     * @return 敵弾が無効化されているかどうか
     */
    isDisableEnemyShot() {

        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this.rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @function _inputKeyboard
     * @brief キーボード入力処理
     * キーボードの入力処理を行う。
     *
     * @param [in] app アプリケーション
     */
    _inputKeyboard(app) {

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

        // zキーでシールドを使用する。
        if (key.getKey('z')) {
            this.inputShieldButton = true;
        }
    }

    /**
     * @function _inputTouch
     * @brief タッチ入力処理
     * タッチの入力処理を行う。
     *
     * @param [in] app アプリケーション
     */
    _inputTouch(app) {

        var touches = app.pointers;
        var sliding = false;

        for (var i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!PointDevice.isMouseUsed) {

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

        // シールドボタンがタッチされている場合はシールドを使用する。
        if (this.shieldButton.isTouch()) {
            this.inputShieldButton = true;
        }
    }

    /**
     * @function _inputGamepad
     * @brief ゲームパッド入力処理
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad() {

        // ゲームパッドの状態を更新する。
        this.gamepadManager.update();

        // ゲームパッドを取得する。
        var gamepad = this.gamepadManager.get();

        // アナログスティックの入力を取得する。
        var stick = this.gamepad.getStickDirection(0);

        if (stick.length() > 0.5) {
            this.player.moveGamepad(stick.x, stick.y, this);
        }

        // Aボタンでシールドを使用する。
        if (gamepad.getKey('a')) {
            this.inputShieldButton = true;
        }
    }

    /**
     * @function _crateFrame
     * @brief ステージ外枠背景作成
     *
     * ステージの外側の枠と背景を作成する。
     */
    _createFrame() {

        // ステージの外側の背景を作成する。
        this._createFrameBack();

        // ステージの外側の枠を作成する。
        this._createFrameBar();
    }

    /**
     * @function _createFrameBack
     * @brief ステージ外枠背景作成
     *
     * ステージの外側の背景を作成する。
     */
    _createFrameBack() {

        // 左側の枠の座標を計算する。
        var x = 0;
        var y = 0;
        var width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

        // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
        if (width % ControlSize.cs.frameBack.width > 0) {
            x -= ControlSize.cs.frameBack.width - width % ControlSize.cs.frameBack.width;
            width += ControlSize.cs.frameBack.width - width % ControlSize.cs.frameBack.width;
        }

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height > 0) {
            y -= ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
            height += ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
        }

        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.cs.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                var back = Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.addChildTo(this.frameLayer);
            }
        }

        // 右側の枠の座標を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var y = 0;
        var width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

        // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
        if (ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height > 0) {
            y -= ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
            height += ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
        }

        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.cs.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                var back = Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.addChildTo(this.frameLayer);
            }
        }

        // 下側の枠の座標を計算する。
        var x = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
        var y = ScreenSize.STAGE_RECT.height;
        var width = ScreenSize.STAGE_RECT.width;
        var height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.height;


        // 背景を並べる。
        for (var i = 0; i < width; i += ControlSize.cs.frameBack.width) {
            for (var j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                var back = Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                back.setOrigin(0, 0);
                back.setPosition(x + i, y + j);
                back.addChildTo(this.frameLayer);
            }
        }
    }

    /**
     * @function _createFrameBar
     * @brief ステージ外枠作成
     *
     * ステージの外側の枠を作成する。
     */
    _createFrameBar() {

        // 左側の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x - ControlSize.cs.frameLeft.width;
        var height = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < height; i += ControlSize.cs.frameLeft.height) {
            var bar = Sprite('control', ControlSize.cs.frameLeft.width, ControlSize.cs.frameLeft.height);
            bar.srcRect.set(ControlSize.cs.frameLeft.x, ControlSize.cs.frameLeft.y, ControlSize.cs.frameLeft.width, ControlSize.cs.frameLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 右側の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var height = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        for (var i = 0; i < height; i += ControlSize.cs.frameRight.height) {
            var bar = Sprite('control', ControlSize.cs.frameRight.width, ControlSize.cs.frameRight.height);
            bar.srcRect.set(ControlSize.cs.frameRight.x, ControlSize.cs.frameRight.y, ControlSize.cs.frameRight.width, ControlSize.cs.frameRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, i);
            bar.addChildTo(this.frameLayer);
        }

        // 下側の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x;
        var y = ScreenSize.STAGE_RECT.height;
        var width = ScreenSize.STAGE_RECT.width;

        // 枠を並べる。
        for (var i = 0; i < width; i += ControlSize.cs.frameBottom.width) {
            var bar = Sprite('control', ControlSize.cs.frameBottom.width, ControlSize.cs.frameBottom.height);
            bar.srcRect.set(ControlSize.cs.frameBottom.x, ControlSize.cs.frameBottom.y, ControlSize.cs.frameBottom.width, ControlSize.cs.frameBottom.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x + i, y);
            bar.addChildTo(this.frameLayer);
        }

        // 左下の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x - ControlSize.cs.frameBottomLeft.width;
        var y = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.cs.frameBottomLeft.width, ControlSize.cs.frameBottomLeft.height);
        bar.srcRect.set(ControlSize.cs.frameBottomLeft.x,
                        ControlSize.cs.frameBottomLeft.y,
                        ControlSize.cs.frameBottomLeft.width,
                        ControlSize.cs.frameBottomLeft.height);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);

        // 右下の枠の位置を計算する。
        var x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
        var y = ScreenSize.STAGE_RECT.height;

        // 枠を並べる。
        var bar = Sprite('control', ControlSize.cs.frameBottomRight.width, ControlSize.cs.frameBottomRight.height);
        bar.srcRect.set(ControlSize.cs.frameBottomRight.x,
                        ControlSize.cs.frameBottomRight.y,
                        ControlSize.cs.frameBottomRight.width,
                        ControlSize.cs.frameBottomRight.height);
        bar.setOrigin(0, 0);
        bar.setPosition(x, y);
        bar.addChildTo(this.frameLayer);
    }

    /**
     * @function _setLife
     * @brief 残機設定
     * 残機を変更し、残機ラベルを更新する。
     */
    _setLife(life) {
        this.life = life;
        this.lifeLabel.setLife(this.life);
    }

    /**
     * @function _rebirthPlayer
     * @brief 自機復活処理
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    _rebirthPlayer() {

        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this.rebirthWait > 0) {
        
            this.rebirthWait--;
        
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this.rebirthWait <= 0) {

                // 自機を復活させる
                this.player.rebirth(this);
            }
        }
    }

    /**
     * @function _removeEnemyShot
     * @brief 敵弾削除
     * 敵弾をすべて削除する。
     */
    _removeEnemyShot() {

        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (var i = this.characters.length - 1; i >= 0; i--) {
            if (this.characters[i].type == Character.type.ENEMY_SHOT) {
                this.characters[i].sprite.remove();
                this.characters.splice(i, 1);
            }
        }

    }
}
