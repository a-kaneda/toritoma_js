import LabelButton from './labelbutton';
import MyColor from './mycolor';
import ScreenSize from './screensize';
import Cursor from './cursor';
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
var BUTTON_ID;
(function (BUTTON_ID) {
    BUTTON_ID[BUTTON_ID["RESUME"] = 0] = "RESUME";
    BUTTON_ID[BUTTON_ID["QUIT"] = 1] = "QUIT";
})(BUTTON_ID || (BUTTON_ID = {}));
;
/**
 * 一時停止画面。
 */
class PauseLayer {
    /**
     * コンストラクタ。
     */
    constructor() {
        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();
        // PAUSEラベルを作成する。
        const pauseLabel = new phina.display.Label({
            text: 'PAUSE',
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
        // RESUMEボタンを作成する。
        const resumeButton = new LabelButton(BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('RESUME')
            .setPosition(BUTTON_POS_X[BUTTON_ID.RESUME], BUTTON_POS_Y)
            .onEffect(() => { this._setEnable(false); })
            .onPush(() => {
            if (this._onResumeFunc !== null) {
                this._onResumeFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(resumeButton);
        // QUITボタンを作成する。
        const quitButton = new LabelButton(BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('QUIT')
            .setPosition(BUTTON_POS_X[BUTTON_ID.QUIT], BUTTON_POS_Y)
            .onEffect(() => { this._setEnable(false); })
            .onPush(() => {
            if (this._onQuitFunc !== null) {
                this._onQuitFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(quitButton);
        // カーソルを作成する。
        this._cursor = new Cursor()
            .addChildTo(this._rootNode)
            .addPosition(BUTTON_ID.RESUME, {
            x: CURSOR_POS_X[BUTTON_ID.RESUME],
            y: CURSOR_POS_Y,
            left: -1,
            right: BUTTON_ID.QUIT,
            up: -1,
            down: -1,
        })
            .addPosition(BUTTON_ID.QUIT, {
            x: CURSOR_POS_X[BUTTON_ID.QUIT],
            y: CURSOR_POS_Y,
            left: BUTTON_ID.RESUME,
            right: -1,
            up: -1,
            down: -1,
        })
            .setPosition(BUTTON_ID.RESUME);
        // コールバック関数を初期化する。
        this._onResumeFunc = null;
        this._onQuitFunc = null;
        // 初期状態は有効とする。
        this._enable = true;
    }
    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._rootNode.addChildTo(parent);
        return this;
    }
    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove() {
        this._rootNode.remove();
        return this;
    }
    /**
     * RESUMEボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onResume(func) {
        this._onResumeFunc = func;
        return this;
    }
    /**
     * QUITボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onQuit(func) {
        this._onQuitFunc = func;
        return this;
    }
    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    input(keyboard, gamepad) {
        // 入力が有効な場合に処理を行う。
        if (this._enable) {
            // カーソルの移動処理を行う。
            this._cursor.input(keyboard, gamepad);
            // キーボードのzキーかゲームパッドのAボタンが押された場合は選択中のボタンの処理を行う。
            if (keyboard.getKeyDown('z') || gamepad.getKeyDown('a')) {
                this._buttons[this._cursor.position].select();
            }
        }
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    _setEnable(value) {
        // 有効か無効かを設定する。
        this._enable = value;
        // 各ボタンの有効か無効かを設定する。
        for (let button of this._buttons) {
            button.setEnable(value);
        }
    }
}
export default PauseLayer;
