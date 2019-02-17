import GamepadManager from "./gamepadmanager";

// 方向を表す文字列
const DIRECTIONS: Direction[] = ['left', 'right', 'up', 'down'];

/**
 * 方向キー入力を処理する。
 * アナログスティックが入力されたタイミングでonKeyDownに設定された関数を実行する。
 * 押しっぱなしの場合には処理はされない。
 */
class DPad {

    /** カーソルキー入力時のコールバック関数 */
    private _onKeyDown: ((direction: Direction) => void) | null;
    /** 前回入力があったかどうか */
    private _prevInput: {[direction: string]: boolean};
    
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
    public onKeyDown(func: (direction: Direction) => void): this {
        this._onKeyDown = func;
        return this;
    }

    /**
     * ゲームパッドの入力処理を行う。
     */
    public input(): this {

        // ゲームパッド管理クラスを取得する。
        const gamepadManager = GamepadManager.get();

        // アナログスティックの入力を取得する。
        const stick_x = gamepadManager.getAxesX(0);
        const stick_y = gamepadManager.getAxesY(0);

        // アナログスティックの入力方向を調べる。
        const input = {
            'left': false,
            'right': false,
            'up': false,
            'down': false,
        };

        // 左方向に入力されている場合
        if (stick_x < -0.5 || gamepadManager.getButtonPressed('left')) {
            input.left = true;
        }

        // 右方向に入力されている場合
        if (stick_x > 0.5 || gamepadManager.getButtonPressed('right')) {
            input.right = true;
        }

        // 上方向に入力されている場合
        if (stick_y < -0.5 || gamepadManager.getButtonPressed('up')) {
            input.up = true;
        }

        // 下方向に入力されている場合
        if (stick_y > 0.5 || gamepadManager.getButtonPressed('down')) {
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