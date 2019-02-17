import LabelButton from './labelbutton';
import MyColor from './mycolor';
import ScreenSize from './screensize';
import Cursor from './cursor';
import GamepadManager from './gamepadmanager';

// ラベルの位置、x座標
const LABEL_POS_X = Math.floor(ScreenSize.SCREEN_WIDTH * 0.5);
// ラベルの位置、y座標
const LABEL_POS_Y = Math.floor(ScreenSize.SCREEN_HEIGHT * 0.3);
// ボタンの幅
const BUTTON_WIDTH = 128;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// ボタンの位置、x座標
const BUTTON_POS_X = [
    Math.floor(ScreenSize.SCREEN_WIDTH * 0.3),
    Math.floor(ScreenSize.SCREEN_WIDTH * 0.7),
];
// ボタンの位置、y座標
const BUTTON_POS_Y = Math.floor(ScreenSize.SCREEN_HEIGHT * 0.6);
// カーソルの位置、x座標
const CURSOR_POS_X = [
    BUTTON_POS_X[0] - BUTTON_WIDTH / 2 - 16,
    BUTTON_POS_X[1] - BUTTON_WIDTH / 2 - 16,
];
// カーソルの位置、y座標
const CURSOR_POS_Y = BUTTON_POS_Y;
// ボタンのID
enum BUTTON_ID {
    LEFT = 0,
    RIGHT,
};

/**
 * メニュー画面。
 * タイトルとボタンが2つある。
 */
class MenuLayer {

    /** ルートノード */
    private _rootNode: phina.display.DisplayElement;
    /** 左のボタン選択時の動作 */
    private _onLeftButtonFunc: (() => void) | null;
    /** 右のボタン選択時の動作 */
    private _onRightButtonFunc: (() => void) | null;
    /** 操作を受け付けるかどうか */
    private _enable: boolean;
    /** ボタン */
    private _buttons: LabelButton[];
    /** カーソル */
    private _cursor: Cursor;

    /**
     * コンストラクタ。
     * @param title タイトルの文字列
     * @param left 左側のボタンのラベル
     * @param right 右側のボタンのラベル
     */
    constructor(title: string, left: string, right: string) {

        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();

        // タイトルのラベルを作成する。
        const titleLabel = new phina.display.Label({
            text: title,
            fontSize: 36,
            backgroundColor: MyColor.BACK_COLOR,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
            x: LABEL_POS_X,
            y: LABEL_POS_Y,
            strokeWidth: 0,
            padding: 0,
        }).addChildTo(this._rootNode);

        // ボタン配列を作成する。
        this._buttons = [];

        // 左のボタンを作成する。
        const resumeButton = new LabelButton(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel(left)
        .setPosition(BUTTON_POS_X[BUTTON_ID.LEFT], BUTTON_POS_Y)
        .onEffect(() => {this._setEnable(false)})
        .onPush(() => {
            if (this._onLeftButtonFunc !== null) {
                this._onLeftButtonFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(resumeButton);

        // 右のボタンを作成する。
        const quitButton = new LabelButton(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel(right)
        .setPosition(BUTTON_POS_X[BUTTON_ID.RIGHT], BUTTON_POS_Y)
        .onEffect(() => {this._setEnable(false)})
        .onPush(() => {
            if (this._onRightButtonFunc !== null) {
                this._onRightButtonFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(quitButton);

        // カーソルを作成する。
        this._cursor = new Cursor()
        .addChildTo(this._rootNode)
        .addPosition(BUTTON_ID.LEFT, {
            x: CURSOR_POS_X[BUTTON_ID.LEFT], 
            y: CURSOR_POS_Y,
            left: -1,
            right: BUTTON_ID.RIGHT,
            up: -1,
            down: -1,
        })
        .addPosition(BUTTON_ID.RIGHT, {
            x: CURSOR_POS_X[BUTTON_ID.RIGHT], 
            y: CURSOR_POS_Y,
            left: BUTTON_ID.LEFT,
            right: -1,
            up: -1,
            down: -1,
        })
        .setPosition(BUTTON_ID.LEFT);

        // コールバック関数を初期化する。
        this._onLeftButtonFunc = null;
        this._onRightButtonFunc = null;

        // 初期状態は有効とする。
        this._enable = true;
    }

    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    public addChildTo(parent: phina.app.Element): this {
        this._rootNode.addChildTo(parent);
        return this;
    }

    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    public remove(): this {
        this._rootNode.remove();
        return this;
    }
    
    /**
     * 左のボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    public onLeftButton(func: () => void): this {
        this._onLeftButtonFunc = func;
        return this;
    }

    /**
     * 右のボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    public onRightButton(func: () => void): this {
        this._onRightButtonFunc = func;
        return this;
    }

    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     */
    public input(keyboard: phina.input.Keyboard): void {

        // 入力が有効な場合に処理を行う。
        if (this._enable) {

            // ゲームパッド管理クラスを取得する。
            const gamepadManager = GamepadManager.get();

            // カーソルの移動処理を行う。
            this._cursor.input(keyboard);

            // キーボードのzキーかゲームパッドのAボタンが押された場合は選択中のボタンの処理を行う。
            if (keyboard.getKeyDown('z') || gamepadManager.getButtonPressed('a')) {

                this._buttons[this._cursor.position].select();
            }
        }
    }

    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    private _setEnable(value: boolean): void {

        // 有効か無効かを設定する。
        this._enable = value;

        // 各ボタンの有効か無効かを設定する。
        for (let button of this._buttons) {
            button.setEnable(value);
        }
    }
}

 export default MenuLayer;