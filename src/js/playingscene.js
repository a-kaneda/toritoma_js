/** @module playingscene */
import PointDevice from './pointdevice';
import MyColor from './mycolor';
import ScreenSize from './screensize';
import ControlSize from './controlsize';
import Character from './character';
import Stage from './stage';
import Player from './player';
import Life from './life';
import ChickenGauge from './chickengauge';
import ShieldButton from './shieldbutton';
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
 * ゲームの各ステージをプレイするメインのシーン。
 */
class PlayingScene {
    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param {MainScene} phinaScene - phina.js上のシーンインスタンス
     */
    constructor(phinaScene) {
        /**
         * phina.jsのシーンインスタンス
         * @type {MainScene}
         */
        this._phinaScene = phinaScene;
        /**
         * ゲームパッドマネージャー。
         * @type {phina.input.GamepadManager}
         */
        this._gamepadManager = new phina.input.GamepadManager();
        /**
         * ゲームパッド。
         * @type {phina.input.Gamepad}
         */
        this._gamepad = this._gamepadManager.get(0);
        /**
         * 背景レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this._backgroundLayer = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // 背景レイヤーの位置、サイズを設定する。
        this._backgroundLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO, ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this._backgroundLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._backgroundLayer.scaleY = ScreenSize.ZOOM_RATIO;
        /**
         * キャラクターレイヤー。
         * @type {phina.display.DisplayElement}
         */
        this._characterLayer = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // キャラクターレイヤーの位置、サイズを設定する。
        this._characterLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO, ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this._characterLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._characterLayer.scaleY = ScreenSize.ZOOM_RATIO;
        /**
         * 枠レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this._frameLayer = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // 枠レイヤーの位置、サイズを設定する。
        this._frameLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._frameLayer.scaleY = ScreenSize.ZOOM_RATIO;
        /**
         * 情報レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this._infoLayer = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // ステージの外枠を作成する。
        this._createFrame();
        /**
         * ステージ
         * @type {Stage}
         */
        this._stage = new Stage('stage1', this._backgroundLayer);
        /**
         * スコアラベルの背景部分。
         * @type {phina.display.RectangleShape}
         */
        this._scoreLabelBase = new phina.display.RectangleShape({
            height: 22,
            width: 148,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this._phinaScene.gridX.center()),
            y: SCORE_POS_Y,
        }).addChildTo(this._infoLayer);
        /**
         * スコアラベル。
         * @type {phina.display.Label}
         */
        this._scoreLabel = new phina.display.Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._scoreLabelBase);
        /**
         * スコア。
         * @type {number}
         */
        this._score = 0;
        /**
         * 残機表示
         * @type {Life}
         */
        this._lifeLabel = new Life();
        // 残機表示の位置を設定する。
        this._lifeLabel.sprite.addChildTo(this._infoLayer);
        this._lifeLabel.sprite.x = ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO + LIFE_POS_X;
        this._lifeLabel.sprite.y = LIFE_POS_Y;
        // 残機を初期化する。
        this._setLife(INITIAL_LIFE);
        /**
         * シールドボタン。
         * @type {ShieldButton}
         */
        this._shieldButton = new ShieldButton();
        // シールドボタンの位置を設定する。
        this._shieldButton.sprite.addChildTo(this._infoLayer);
        this._shieldButton.sprite.x = ScreenSize.SCREEN_WIDTH - SHIELD_BUTTON_POS_X;
        this._shieldButton.sprite.y = ScreenSize.SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y;
        /**
         * チキンゲージ。
         * @type {ChickenGauge}
         */
        this._chickenGauge = new ChickenGauge();
        // チキンゲージの位置を設定する。
        this._chickenGauge.sprite.addChildTo(this._infoLayer);
        this._chickenGauge.sprite.x = Math.round(this._phinaScene.gridX.center());
        this._chickenGauge.sprite.y = ScreenSize.SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;
        /**
         * 復活待機フレーム数。
         * @type {number}
         */
        this._rebirthWait = 0;
        /**
         * キャラクター管理配列。
         * @type {Array}
         */
        this._characters = [];
        /**
         * 自機
         * @type {Player}
         */
        this._player = new Player(Math.round(ScreenSize.STAGE_RECT.width / 4), Math.round(ScreenSize.STAGE_RECT.height / 2), this);
        /**
         * タッチ情報。
         * @type {Object}
         */
        this._touch = { id: -1, x: 0, y: 0 };
        // BGMの音量を設定する。
        phina.asset.SoundManager.setVolumeMusic(0.2);
        // BGMを再生する。
        phina.asset.SoundManager.playMusic('stage1');
    }
    /**
     * 更新処理。
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    update(app) {
        // ボタン入力状態を初期化する。
        this._inputShieldButton = false;
        // キーボード入力を行う。
        this._inputKeyboard(app);
        // タッチ入力を行う。
        this._inputTouch(app);
        // ゲームパッド入力を行う。
        this._inputGamepad();
        // シールドボタン入力状態に応じて自機の状態を変化させる。
        if (this._inputShieldButton) {
            this._player.shield = true;
        }
        else {
            this._player.shield = false;
        }
        // ステージの状態を更新する。
        this._stage.update(this);
        // プレイヤーの状態を更新する。
        this._player.update(this);
        // 各キャラクターの状態を更新する。
        for (let i = 0; i < this._characters.length; i++) {
            this._characters[i].update(this);
        }
        // 自機復活処理を行う。
        this._rebirthPlayer();
        // チキンゲージ表示を更新する。
        this._chickenGauge.rate = this._player.chickenGauge;
        // スコア表示を更新する。
        this._scoreLabel.text = 'SCORE: ' + ('000000' + this._score).slice(-6);
    }
    /**
     * キャラクターを追加する。
     * @param {Object} character - 追加するキャラクター
     */
    addCharacter(character) {
        this._characters.push(character);
    }
    /**
     * キャラクターのスプライトを追加する。
     * @param {phina.display.DisplayElement} sprite - 追加するスプライト
     */
    addCharacterSprite(sprite) {
        sprite.addChildTo(this._characterLayer);
    }
    /**
     * キャラクターを削除する。
     * @param {Object} character - 削除するキャラクター
     */
    removeCharacter(character) {
        const i = this._characters.indexOf(character);
        if (i >= 0) {
            this._characters.splice(i, 1);
        }
    }
    /**
     * スコアを追加する。
     * @param {number} score - 追加するスコア
     */
    addScore(score) {
        this._score += score;
    }
    /**
     * ブロックマップを取得する。
     * @return {Array} ブロックマップ
     */
    getBlockMap() {
        return this._stage.blockMap;
    }
    /**
     * ステージが左方向に何ドット移動しているかを取得する。
     * @return {number} ステージ位置
     */
    getStagePosition() {
        return -this._stage.x;
    }
    /**
     * ステージのスクロールスピード
     * @type {number}
     */
    get scrollSpeed() {
        return this._stage.speed;
    }
    get characters() {
        return this._characters;
    }
    /**
     * 自機の位置
     * @type {Object}
     */
    get playerPosition() {
        return {
            x: this._player.rect.x,
            y: this._player.rect.y,
        };
    }
    /**
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss() {
        // 残機が残っている場合
        if (this._life > 0) {
            // 残機を一つ減らす。
            this._setLife(this._life - 1);
            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this._rebirthWait = REBIRTH_WAIT;
            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        else {
        }
    }
    /**
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     * @return {boolean} 敵弾が無効化されているかどうか
     */
    isDisableEnemyShot() {
        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this._rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * キーボードの入力処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    _inputKeyboard(app) {
        // キーボードを取得する。
        const key = app.keyboard;
        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this._player.moveKeyLeft(this);
        }
        if (key.getKey('right')) {
            this._player.moveKeyRight(this);
        }
        if (key.getKey('up')) {
            this._player.moveKeyUp(this);
        }
        if (key.getKey('down')) {
            this._player.moveKeyDown(this);
        }
        // zキーでシールドを使用する。
        if (key.getKey('z')) {
            this._inputShieldButton = true;
        }
    }
    /**
     * タッチの入力処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    _inputTouch(app) {
        const touches = app.pointers;
        let sliding = false;
        for (let i = 0; i < touches.length; i++) {
            // マウスが接続されていない場合はスライドの処理を行う。
            if (!PointDevice.isMouseUsed) {
                // スライド操作をしていない状態だった場合、最初のタッチ位置を記憶する。
                if (this._touch.id < 0) {
                    this._touch.id = touches[i].id;
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
                // スライド操作をしている場合はスライド量に応じて自機を移動する。
                if (this._touch.id == touches[i].id) {
                    this._player.moveTouch(touches[i].x - this._touch.x, touches[i].y - this._touch.y, this);
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
            }
        }
        // スライドしていない場合はタッチ情報を初期化する。
        if (!sliding) {
            this._touch.id = -1;
            this._touch.x = 0;
            this._touch.y = 0;
        }
        // シールドボタンがタッチされている場合はシールドを使用する。
        if (this._shieldButton.isTouch) {
            this._inputShieldButton = true;
        }
    }
    /**
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad() {
        // ゲームパッドの状態を更新する。
        this._gamepadManager.update();
        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get();
        // アナログスティックの入力を取得する。
        const stick = this._gamepad.getStickDirection(0);
        if (stick.length > 0.5) {
            this._player.moveGamepad(stick.x, stick.y, this);
        }
        // Aボタンでシールドを使用する。
        if (gamepad.getKey('a')) {
            this._inputShieldButton = true;
        }
    }
    /**
     * ステージの外側の枠と背景を作成する。
     */
    _createFrame() {
        // ステージの外側の背景を作成する。
        this._createFrameBack();
        // ステージの外側の枠を作成する。
        this._createFrameBar();
    }
    /**
     * ステージの外側の背景を作成する。
     */
    _createFrameBack() {
        {
            // 左側の枠の座標を計算する。
            let x = 0;
            let y = 0;
            let width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            let height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;
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
            for (let i = 0; i < width; i += ControlSize.cs.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                    const back = new phina.display.Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
        {
            // 右側の枠の座標を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            let y = 0;
            const width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            let height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;
            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height > 0) {
                y -= ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
                height += ControlSize.cs.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.cs.frameBack.height;
            }
            // 背景を並べる。
            for (let i = 0; i < width; i += ControlSize.cs.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                    const back = new phina.display.Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
        {
            // 下側の枠の座標を計算する。
            const x = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            const y = ScreenSize.STAGE_RECT.height;
            const width = ScreenSize.STAGE_RECT.width;
            const height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.height;
            // 背景を並べる。
            for (let i = 0; i < width; i += ControlSize.cs.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.cs.frameBack.height) {
                    const back = new phina.display.Sprite('control', ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.srcRect.set(ControlSize.cs.frameBack.x, ControlSize.cs.frameBack.y, ControlSize.cs.frameBack.width, ControlSize.cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
    }
    /**
     * ステージの外側の枠を作成する。
     */
    _createFrameBar() {
        {
            // 左側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x - ControlSize.cs.frameLeft.width;
            const height = ScreenSize.STAGE_RECT.height;
            // 枠を並べる。
            for (let i = 0; i < height; i += ControlSize.cs.frameLeft.height) {
                const bar = new phina.display.Sprite('control', ControlSize.cs.frameLeft.width, ControlSize.cs.frameLeft.height);
                bar.srcRect.set(ControlSize.cs.frameLeft.x, ControlSize.cs.frameLeft.y, ControlSize.cs.frameLeft.width, ControlSize.cs.frameLeft.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 右側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            const height = ScreenSize.STAGE_RECT.height;
            // 枠を並べる。
            for (let i = 0; i < height; i += ControlSize.cs.frameRight.height) {
                const bar = new phina.display.Sprite('control', ControlSize.cs.frameRight.width, ControlSize.cs.frameRight.height);
                bar.srcRect.set(ControlSize.cs.frameRight.x, ControlSize.cs.frameRight.y, ControlSize.cs.frameRight.width, ControlSize.cs.frameRight.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 下側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x;
            const y = ScreenSize.STAGE_RECT.height;
            const width = ScreenSize.STAGE_RECT.width;
            // 枠を並べる。
            for (let i = 0; i < width; i += ControlSize.cs.frameBottom.width) {
                const bar = new phina.display.Sprite('control', ControlSize.cs.frameBottom.width, ControlSize.cs.frameBottom.height);
                bar.srcRect.set(ControlSize.cs.frameBottom.x, ControlSize.cs.frameBottom.y, ControlSize.cs.frameBottom.width, ControlSize.cs.frameBottom.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x + i, y);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 左下の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x - ControlSize.cs.frameBottomLeft.width;
            const y = ScreenSize.STAGE_RECT.height;
            // 枠を並べる。
            const bar = new phina.display.Sprite('control', ControlSize.cs.frameBottomLeft.width, ControlSize.cs.frameBottomLeft.height);
            bar.srcRect.set(ControlSize.cs.frameBottomLeft.x, ControlSize.cs.frameBottomLeft.y, ControlSize.cs.frameBottomLeft.width, ControlSize.cs.frameBottomLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }
        {
            // 右下の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            const y = ScreenSize.STAGE_RECT.height;
            // 枠を並べる。
            const bar = new phina.display.Sprite('control', ControlSize.cs.frameBottomRight.width, ControlSize.cs.frameBottomRight.height);
            bar.srcRect.set(ControlSize.cs.frameBottomRight.x, ControlSize.cs.frameBottomRight.y, ControlSize.cs.frameBottomRight.width, ControlSize.cs.frameBottomRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }
    }
    /**
     * 残機を変更し、残機ラベルを更新する。
     * @param {number} life - 残機
     */
    _setLife(life) {
        this._life = life;
        this._lifeLabel.life = this._life;
    }
    /**
     * 自機復活処理。
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    _rebirthPlayer() {
        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this._rebirthWait > 0) {
            this._rebirthWait--;
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this._rebirthWait <= 0) {
                // 自機を復活させる
                this._player.rebirth(this);
            }
        }
    }
    /**
     * 敵弾をすべて削除する。
     */
    _removeEnemyShot() {
        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (let i = this._characters.length - 1; i >= 0; i--) {
            const character = this._characters[i];
            if (Character.isEnemyShot(character)) {
                character.remove(this);
            }
        }
    }
}
export default PlayingScene;
