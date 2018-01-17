import Scene from './scene'
import Button from './button'
import MainScene from './mainscene.d'
import PlayinScene from './playingscene'
import ControlSize from './controlsize'
import ScreenSize from './screensize'
import Cursor from './cursor'

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
// ボタンのID
enum BUTTON_ID {
    GAME_START = 0,
    HOW_TO_PLAY,
    CREDIT,
};

/**
 * タイトルのシーン
 */
class TitleScene implements Scene {

    /** phina.jsのシーンインスタンス */
    private _phinaScene: MainScene;
    /** ゲームパッドマネージャー。 */
    private _gamepadManager: phina.input.GamepadManager;
    /** 全ノードのルート */
    private _rootNode: phina.display.DisplayElement;
    /** ボタン */
    private _buttons: Button[];
    /** カーソル */
    private _cursor: Cursor;
    /** 入力が無効化されているかどうか */
    private _isDisableInput: boolean;

    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene: MainScene, gamepadManager: phina.input.GamepadManager) {

        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;

        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;

        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);

        // タイトルロゴを作成する。
        const title = new phina.display.Sprite('control', ControlSize.cs.title.width, ControlSize.cs.title.height)
        .addChildTo(this._rootNode)
        .setPosition(TITLE_POS_X, TITLE_POS_Y);
        title.srcRect.set(ControlSize.cs.title.x,
            ControlSize.cs.title.y,
            ControlSize.cs.title.width,
            ControlSize.cs.title.height);
        title.scaleX = ScreenSize.ZOOM_RATIO;
        title.scaleY = ScreenSize.ZOOM_RATIO;

        // ボタン配列を作成する。
        this._buttons = [];

        // ゲームスタートボタンを作成する。
        const gameStartButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel('GAME START')
        .setPosition(BUTTON_POS_X, BUTTON_POS_Y[0])
        .onEffect(() => {this._disableInput()})
        .onPush(() => {this._replaceScene('PlayingScene')})
        this._buttons.push(gameStartButton);

        // 遊び方説明ボタンを作成する。
        const howToPlayButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel('HOW TO PLAY')
        .setPosition(BUTTON_POS_X, BUTTON_POS_Y[1])
        .onEffect(() => {this._disableInput()})
        .onPush(() => {this._replaceScene('HowToPlayScene')})
        this._buttons.push(howToPlayButton);

        // クレジットボタンを作成する。
        const creditButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel('CREDIT')
        .setPosition(BUTTON_POS_X, BUTTON_POS_Y[2])
        .onEffect(() => {this._disableInput()})
        .onPush(() => {this._replaceScene('CreditScene')})
        this._buttons.push(creditButton);

        // カーソルを作成する。
        this._cursor = new Cursor()
        .addChildTo(this._rootNode);

        // カーソル位置の情報を作成する。
        for (let i = 0; i < BUTTON_NUM; i++) {

            // 上に移動するときの位置を決める。ループするようにする。
            const prevPos = i - 1 >= 0 ? i - 1 : BUTTON_NUM - 1;

            // 下に移動するときの位置を決める。ループするようにする。
            const nextPos = i + 1 < BUTTON_NUM ? i + 1 : 0;

            // カーソル位置を登録する。
            this._cursor.addPosition(i, {
                x: CURSOR_POS_X,
                y: BUTTON_POS_Y[i],
                left: -1,
                right: -1, 
                up: prevPos, 
                down: nextPos});
        }

        // 初期位置はGAME STARTボタンの位置とする。
        this._cursor.setPosition(BUTTON_ID.GAME_START);

        // 初期状態は入力は有効とする。
        this._isDisableInput = false;
    }

    /**
     * 更新処理。
     * キー入力処理を行う。
     * @param app アプリケーション
     */
    public update(app: phina.game.GameApp): void {

        // 入力が無効になっていない場合
        if (!this._isDisableInput) {

            // カーソル移動処理を行う。
            this._cursor.input(app.keyboard, this._gamepadManager.get());

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
    private _replaceScene(sceneName: 'PlayingScene' | 'HowToPlayScene' | 'CreditScene'): void {
        this._rootNode.remove();

        switch (sceneName) {
            case 'PlayingScene':
                this._phinaScene.scene = new PlayinScene(this._phinaScene, this._gamepadManager);
                break;
            default:
                break;
        }
    }

    /**
     * キーボードの入力処理を行う。
     * zキーでボタンを選択する。
     * @param app アプリケーション
     */
    private _inputKeyboard(app: phina.game.GameApp): void {

        // キーボードを取得する。
        const key = app.keyboard;

        // zキーが押されている場合
        if (key.getKeyDown('z')) {

            // 選択中のボタンを実行する。
            this._execButton();
        }
    }

    /**
     * ゲームパッドの入力処理を行う。
     */
    private _inputGamepad(): void {

        // ゲームパッドの状態を更新する。
        this._gamepadManager.update();

        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get();

        // Aボタンが押されている場合
        if (gamepad.getKeyDown('a')) {

            // 選択中のボタンを実行する。
            this._execButton();
        }
    }
    
    /**
     * 選択中のボタンを実行する。
     */
    private _execButton(): void {

        // 選択中のボタンを実行する。
        this._buttons[this._cursor.position].select();
    }

    /**
     * 入力を無効化する。
     */
    private _disableInput(): void {

        // 入力を無効化する。
        this._isDisableInput = true;

        // カーソルを無効化する。。
        this._cursor.setEnable(false);

        // ボタンを無効化する。
        for (let button of this._buttons) {
            button.setEnable(false);
        }
    }
}

export default TitleScene;