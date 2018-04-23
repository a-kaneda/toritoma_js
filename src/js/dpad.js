// 方向を表す文字列
const DIRECTIONS = ['left', 'right', 'up', 'down'];
/**
 * 方向キー入力を処理する。
 * アナログスティックが入力されたタイミングでonKeyDownに設定された関数を実行する。
 * 押しっぱなしの場合には処理はされない。
 */
class DPad {
    /**
     * コンストラクタ。
     */
    constructor() {
        // ゲームパッドの前回入力があったかどうかの情報を初期化する。
        this._prevInput = {};
        for (let direction of DIRECTIONS) {
            this._prevInput[direction] = false;
        }
        // コールバック関数を初期化する。
        this._onKeyDown = null;
    }
    /**
     * カーソルキー入力時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onKeyDown(func) {
        this._onKeyDown = func;
        return this;
    }
    /**
     * ゲームパッドの入力処理を行う。
     * @param gamepad ゲームパッド
     */
    input(gamepad) {
        // アナログスティックの入力を取得する。
        const stick = gamepad.getStickDirection(0);
        // アナログスティックの入力方向を調べる。
        const input = {
            'left': false,
            'right': false,
            'up': false,
            'down': false,
        };
        // 左方向に入力されている場合
        if (stick.x < -0.5 || gamepad.getKey('left')) {
            input.left = true;
        }
        // 右方向に入力されている場合
        if (stick.x > 0.5 || gamepad.getKey('right')) {
            input.right = true;
        }
        // 上方向に入力されている場合
        if (stick.y < -0.5 || gamepad.getKey('up')) {
            input.up = true;
        }
        // 下方向に入力されている場合
        if (stick.y > 0.5 || gamepad.getKey('down')) {
            input.down = true;
        }
        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {
            // 方向キーが入力されている場合
            if (input[direction]) {
                // 前回入力されていなかった場合
                if (!this._prevInput[direction] && this._onKeyDown) {
                    // カーソルキー入力時のコールバック関数を呼び出す。
                    this._onKeyDown(direction);
                }
                // 前回入力をありにする。
                this._prevInput[direction] = true;
            }
            else {
                // 前回入力を無しにする。
                this._prevInput[direction] = false;
            }
        }
        return this;
    }
}
export default DPad;
