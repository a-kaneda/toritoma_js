// 最低限必要なボタンの数
const MIN_BUTTONS = 6;

/**
 * ゲームパッドを管理するクラス。
 */
class GamepadManager {

    /** インスタンス */
    private static _instance: GamepadManager;

    /**
     * インスタンスを取得する。
     * @return インスタンス
     */
    public static get(): GamepadManager {

        if (!this._instance) {
            this._instance = new GamepadManager();
        }

        return this._instance;
    }

    /** アクティブなゲームパッド */
    private _activeGamepad: Gamepad | null;
    /** ボタン名称マップ */
    private _buttonMap: {[key: string]: number};
    /** 前回のボタンの状態 */
    private _prevButtonStatus: boolean[];
    /** ボタンが押されたかどうか(押し続けている場合はfalse) */
    private _buttonDown: boolean[];

    /**
     * ゲームパッドを取得する。
     * @return ゲームパッド
     */
    public getGamepad(): Gamepad | null{
        return this._activeGamepad;
    }

    /**
     * ゲームパッドのボタンが押されているかどうかを調べる。
     * @param name ボタン名称
     */
    public getButtonPressed(name: string): boolean {
        
        // ボタンが存在しない場合は処理をしない。
        if (!(name in this._buttonMap)) {
            return false;
        }

        // ボタンのIDを取得する。
        const buttonID = this._buttonMap[name];

        // ゲームパッド、ボタン定義が存在し、ボタンが押されている場合はtrueを返す。
        if (this._activeGamepad && 
            buttonID < this._activeGamepad.buttons.length &&
            this._activeGamepad.buttons[buttonID].pressed) {

            return true;
        }
        else {
            return false;
        }
    }

    /**
     * ボタンが今回のフレームで押されたかどうかを取得する。
     * @param name ボタン名称
     */
    public getButtonDown(name: string): boolean {

        // ボタンが存在しない場合は処理をしない。
        if (!(name in this._buttonMap)) {
            return false;
        }

        // ボタンのIDを取得する。
        const buttonID = this._buttonMap[name];

        // ボタン定義が存在する場合は、ボタンが押されたかどうかを返す。
        if (buttonID < this._buttonDown.length) {
            return this._buttonDown[buttonID];
        }
        else {
            return false;
        }
    }

    /**
     * アナログスティックのx方向の入力値を取得する。
     * @param stick アナログスティックの番号
     */
    public getAxesX(stick: number): number {
        
        if (this._activeGamepad && stick * 2 < this._activeGamepad.axes.length) {
            return this._activeGamepad.axes[stick * 2];
        }
        else {
            return 0;
        }

    }

    /**
     * アナログスティックのy方向の入力値を取得する。
     * @param stick アナログスティックの番号
     */
    public getAxesY(stick: number): number {
        
        if (this._activeGamepad && stick * 2 + 1 < this._activeGamepad.axes.length) {
            return this._activeGamepad.axes[stick * 2 + 1];
        }
        else {
            return 0;
        }
        
    }

    /**
     * ゲームパッドの状態を更新する。
     */
    public update(): void {

        // アクティブなゲームパッドを更新する。
        this._activeGamepad = this._pollGamepads();

        // アクティブなゲームパッドが存在しない場合はボタン入力状態を初期化する。
        if (!this._activeGamepad) {
            this._prevButtonStatus = [];
            this._buttonDown = [];
        }
        else {

            // ボタン数が変化している場合はボタン入力状態を初期化する。
            if (this._prevButtonStatus.length !== this._activeGamepad.buttons.length) {
                this._resetButtonStatus();
            }
            else {
                // ボタン入力状態を更新する。
                this._updateButtonStatus();
            }
        }
    }

    /**
     * プライベートコンストラクタ。
     */
    private constructor() {
        
        // デフォルトのキーマップを作成する。
        this._buttonMap = {
            'a': 0,
            'b': 1,
            'x': 2,
            'y': 3,    
            'l1': 4,
            'r1': 5,
            'l2': 6,
            'r2': 7,
            'select': 8,
            'start': 9,
            'l3': 10,
            'r3': 11,
            'up': 12,
            'down': 13,
            'left': 14,
            'right': 15,
            'special': 16,
            'A': 0,
            'B': 1,
            'X': 2,
            'Y': 3,
            'L1': 4,
            'R1': 5,
            'L2': 6,
            'R2': 7,
            'SELECT': 8,
            'START': 9,
            'L3': 10,
            'R3': 11,
            'UP': 12,
            'DOWN': 13,
            'LEFT': 14,
            'RIGHT': 15,    
            'SPECIAL': 16,
        };

        // アクティブなゲームパッドを取得する。
        this._activeGamepad = this._pollGamepads();

        // ボタン入力状態を初期化する。
        this._prevButtonStatus = [];
        this._buttonDown = [];
        this._resetButtonStatus();
 
        // ゲームパッドイベントリスターを登録する。
        window.addEventListener("gamepadconnected", this._onGamepadConnected);
        window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected);
    }

    /**
     * ゲームパッド接続時の処理。
     * @param e イベント
     */
    private _onGamepadConnected(e: Event): void {

        // アクティブなゲームパッドを更新する。
        this._activeGamepad = this._pollGamepads();
    }

    /**
     * ゲームパッド切断時の処理。
     * @param e イベント
     */
    private _onGamepadDisconnected(e: Event): void {

        // アクティブなゲームパッドを更新する。
        this._activeGamepad = this._pollGamepads();
    }

    /**
     * 使用可能なゲームパッドを取得する。
     * @return ゲームパッド
     */
    private _pollGamepads(): Gamepad | null {

        let ret: Gamepad | null = null;

        // ゲームパッドを取得する。
        const gamepads = navigator.getGamepads ? navigator.getGamepads(): [];
        for (let i = 0; i < gamepads.length; i++) {

            const gamepad = gamepads[i];
            if (gamepad && gamepad.connected && gamepad.buttons.length >= MIN_BUTTONS) {
                ret = gamepad;
                break;
            }
        }

        return ret;
    }

    /**
     * ボタン入力状態を初期化する。
     */
    private _resetButtonStatus(): void {

        this._prevButtonStatus = [];
        this._buttonDown = [];

        if (this._activeGamepad) {
            for (let i = 0; i < this._activeGamepad.buttons.length; i++) {
                this._prevButtonStatus.push(this._activeGamepad.buttons[i].pressed);
                this._buttonDown.push(false);
            }
        }
    }

    /**
     * ボタン入力状態を更新する。
     */
    private _updateButtonStatus(): void {

        if (this._activeGamepad) {

            // 各ボタンの状態を更新する。
            for (let i = 0; i < this._activeGamepad.buttons.length; i++) {

                // 今回、新たに押された状態になったかどうかを調べる。
                if (!this._prevButtonStatus[i] && this._activeGamepad.buttons[i].pressed) {
                    this._buttonDown[i] = true;
                }
                else {
                    this._buttonDown[i] = false;
                }

                // 現在の状態を記憶する。
                this._prevButtonStatus[i] = this._activeGamepad.buttons[i].pressed;
            }
        }
    }
}

export default GamepadManager;