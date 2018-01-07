import Button from './button';
import PlayinScene from './playingscene';
import ControlSize from './controlsize';
import ScreenSize from './screensize';
// タイトルの位置、x座標
const TITLE_POS_X = 130;
// タイトルの位置、y座標
const TITLE_POS_Y = 150;
// ボタンの位置、x座標
const BUTTON_POS_X = 360;
// ボタンの位置、y座標
const BUTTON_POS_Y = [80, 160, 240];
// ボタンの幅
const BUTTON_WIDTH = 176;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// カーソルの位置、x座標
const CURSOR_POS_X = 256;
// ボタンの数
const BUTTON_NUM = 3;
/**
 * タイトルのシーン
 */
class TitleScene {
    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを作成する。
        this._gamepadManager = new phina.input.GamepadManager();
        // ゲームパッドを取得する。
        this._gamepad = this._gamepadManager.get(0);
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // タイトルロゴを作成する。
        const title = new phina.display.Sprite('control', ControlSize.cs.title.width, ControlSize.cs.title.height)
            .addChildTo(this._rootNode)
            .setPosition(TITLE_POS_X, TITLE_POS_Y);
        title.srcRect.set(ControlSize.cs.title.x, ControlSize.cs.title.y, ControlSize.cs.title.width, ControlSize.cs.title.height);
        title.scaleX = ScreenSize.ZOOM_RATIO;
        title.scaleY = ScreenSize.ZOOM_RATIO;
        // ボタン配列を作成する。
        this._buttons = [];
        // ゲームスタートボタンを作成する。
        const gameStartButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('GAME START')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[0])
            .setHandler(() => { this._replaceScene('PlayingScene'); })
            .setDisableFunc(() => { return this._disableInput; }, (value) => { this._disableInput = value; });
        this._buttons.push(gameStartButton);
        // 遊び方説明ボタンを作成する。
        const howToPlayButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('HOW TO PLAY')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[1])
            .setHandler(() => { this._replaceScene('HowToPlayScene'); })
            .setDisableFunc(() => { return this._disableInput; }, (value) => { this._disableInput = value; });
        this._buttons.push(howToPlayButton);
        // クレジットボタンを作成する。
        const creditButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('CREDIT')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[2])
            .setHandler(() => { this._replaceScene('CreditScene'); })
            .setDisableFunc(() => { return this._disableInput; }, (value) => { this._disableInput = value; });
        this._buttons.push(creditButton);
        // カーソルを作成する。
        this._cursor = new phina.display.Sprite('control', ControlSize.cs.cursor.width, ControlSize.cs.cursor.height)
            .addChildTo(this._rootNode)
            .setPosition(CURSOR_POS_X, BUTTON_POS_Y[0]);
        this._cursor.srcRect.set(ControlSize.cs.cursor.x, ControlSize.cs.cursor.y, ControlSize.cs.cursor.width, ControlSize.cs.cursor.height);
        this._cursor.scaleX = ScreenSize.ZOOM_RATIO;
        this._cursor.scaleY = ScreenSize.ZOOM_RATIO;
        // 初期選択ボタンは1個目とする。
        this._selectButton = 0;
        // 入力内容を初期化する。
        this._isUpInputKeyboard = false;
        this._isDownInputKeyboard = false;
        this._isUpInputGamepad = false;
        this._isDownInputGamepad = false;
        // 初期状態は入力は有効とする。
        this._disableInput = false;
    }
    /**
     * 更新処理。
     * キー入力処理を行う。
     * @param app アプリケーション
     */
    update(app) {
        // 入力が無効になっていない場合
        if (!this._disableInput) {
            // キーボードの入力処理を行う。
            this._inputKeyboard(app);
            // ゲームパッドの入力処理を行う。。
            this._inputGamepad();
        }
    }
    /**
     * PlayingSceneにシーンを遷移する。
     * @param sceneName シーン名
     */
    _replaceScene(sceneName) {
        this._rootNode.remove();
        switch (sceneName) {
            case 'PlayingScene':
                this._phinaScene.scene = new PlayinScene(this._phinaScene);
                break;
            default:
                break;
        }
    }
    /**
     * キーボードの入力処理を行う。
     * 上下キーでカーソルを移動し、zキーでボタンを選択する。
     * @param app アプリケーション
     */
    _inputKeyboard(app) {
        // キーボードを取得する。
        const key = app.keyboard;
        // 上キーが押されている場合
        if (key.getKey('up')) {
            // 前回上キーが押されていなければ処理を行う。。
            if (!this._isUpInputKeyboard) {
                // カーソルを移動する。
                this._moveCursor(this._selectButton - 1);
            }
            // 上キーが押されたことを記憶する。
            this._isUpInputKeyboard = true;
        }
        else {
            // 上キーが押されていない状態にする。
            this._isUpInputKeyboard = false;
        }
        // 下キーが押されている場合
        if (key.getKey('down')) {
            // 前回下キーが押されていなければ処理を行う。。
            if (!this._isDownInputKeyboard) {
                // カーソルを移動する。
                this._moveCursor(this._selectButton + 1);
            }
            // 下キーが押されたことを記憶する。
            this._isDownInputKeyboard = true;
        }
        else {
            // 下キーが押されていない状態にする。
            this._isDownInputKeyboard = false;
        }
        // zキーが押されている場合
        if (key.getKey('z')) {
            // 選択中のボタンを実行する。
            this._execButton();
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
        // 上キーが押されている場合
        if (stick.y < -0.5) {
            // 前回上キーが押されていなければ処理を行う。。
            if (!this._isUpInputGamepad) {
                // カーソルを移動する。
                this._moveCursor(this._selectButton - 1);
            }
            // 上キーが押されたことを記憶する。
            this._isUpInputGamepad = true;
        }
        else {
            // 上キーが押されていない状態にする。
            this._isUpInputGamepad = false;
        }
        // 下キーが押されている場合
        if (stick.y > 0.5) {
            // 前回下キーが押されていなければ処理を行う。。
            if (!this._isDownInputGamepad) {
                // カーソルを移動する。
                this._moveCursor(this._selectButton + 1);
            }
            // 下キーが押されたことを記憶する。
            this._isDownInputGamepad = true;
        }
        else {
            // 下キーが押されていない状態にする。
            this._isDownInputGamepad = false;
        }
        // Aボタンでシールドを使用する。
        if (gamepad.getKey('a')) {
            // 選択中のボタンを実行する。
            this._execButton();
        }
    }
    /**
     * カーソルを移動する。
     * 一番上から上に移動しようとした場合は一番下に移動する。
     * 一番下から下に移動しようとした場合は一番上に移動する。
     * @param selectButton 選択するボタンのインデックス
     */
    _moveCursor(selectButton) {
        // 最小値未満の場合は最大値に変える。
        if (selectButton < 0) {
            selectButton = BUTTON_NUM - 1;
        }
        // 最大値超過の場合は最小値にする。
        if (selectButton >= BUTTON_NUM) {
            selectButton = 0;
        }
        // メンバ変数の値を変える。
        this._selectButton = selectButton;
        // カーソルの位置を変える。
        this._cursor.y = BUTTON_POS_Y[this._selectButton];
        // 効果音を鳴らす。
        phina.asset.SoundManager.play('cursor');
    }
    /**
     * 選択中のボタンを実行する。
     */
    _execButton() {
        // 選択中のボタンを実行する。
        this._buttons[this._selectButton].select();
        // 入力を無効化する。
        this._disableInput = true;
    }
}
export default TitleScene;
