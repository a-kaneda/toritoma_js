import ScreenSize from './screensize'
import ControlSize from './controlsize'

// 方向を表す文字列
const DIRECTIONS: Direction[] = ['left', 'right', 'up', 'down'];

/**
 * カーソル。
 */
class Cursor {

    /** 画像 */
    private _sprite: phina.display.Sprite;
    /** カーソル位置情報 */
    private _positions: {[id: number]: CursorPositon};
    /** 現在のカーソル位置 */
    private _currentPosition: number;
    /** 有効か無効か */
    private _enable: boolean;
    /** ゲームパッドの前回入力があったかどうか */
    private _prevGamepadInput: {[direction: string]: boolean};

    /**
     * コンストラクタ。
     */
    constructor() {

        // 画像を読み込む。
        this._sprite = new phina.display.Sprite('control', ControlSize.cs.cursor.width, ControlSize.cs.cursor.height)
        this._sprite.srcRect.set(ControlSize.cs.cursor.x,
            ControlSize.cs.cursor.y,
            ControlSize.cs.cursor.width,
            ControlSize.cs.cursor.height);
        this._sprite.scaleX = ScreenSize.ZOOM_RATIO;
        this._sprite.scaleY = ScreenSize.ZOOM_RATIO;

        // カーソル位置配列を作成する。
        this._positions = {};

        // 現在のカーソル位置情報を初期化する。
        this._currentPosition = 0;

        // 初期状態は有効とする。
        this._enable = true;

        // ゲームパッドの前回入力があったかどうかの情報を初期化する。
        this._prevGamepadInput = {};
        for (let direction of DIRECTIONS) {
            this._prevGamepadInput[direction] = false;
        }
    }

    /** 現在のカーソル位置のID */
    public get position(): number {
        return this._currentPosition;
    }

    /**
     * 画像を親ノードに追加する。
     * @param parent 親ノード]
     * @return 自インスタンス
     */
    public addChildTo(parent: phina.display.DisplayElement): this {
        this._sprite.addChildTo(parent);
        return this;
    }

    /**
     * カーソル位置情報を追加する。
     * @param id カーソル位置のID、一意な値を指定する。
     * @param position カーソル位置情報
     * @return 自インスタンス
     */
    public addPosition(id: number, position: CursorPositon): this {
        this._positions[id] = position;
        return this;
    }

    /**
     * カーソルの位置を設定する。addPositionで登録したカーソル位置へ移動する。
     * @param id カーソル位置のID
     * @return 自インスタンス
     */
    public setPosition(id: number): this {

        // カーソル位置が登録されている場合
        if (this._positions[id]) {

            // 現在のカーソル位置を変更する。
            this._currentPosition = id;

            // 画像の表示位置を変更する。
            this._sprite.x = this._positions[id].x;
            this._sprite.y = this._positions[id].y;
        }

        return this;
    }

    /**
     * 有効か無効かを設定する。
     * @param value 有効か無効か
     * @return 自インスタンス
     */
    public setEnable(value: boolean): this {
        this._enable = value;
        return this;
    }

    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    public input(keyboard: phina.input.Keyboard, gamepad: phina.input.Gamepad): this {

        // 有効な場合は処理を行う。
        if (this._enable) {

            // キーボードの入力処理を行う。
            this._inputKeyboard(keyboard);

            // ゲームパッドの入力処理を行う。
            this._inputGamepad(gamepad);
        }

        return this;
    }

    /**
     * キーボードの入力処理を行う。
     * 上下キーでカーソルを移動し、zキーでボタンを選択する。
     * @param keyboard キーボード
     */
    private _inputKeyboard(keyboard: phina.input.Keyboard): void {

        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {

            // 方向キーが押された場合
            if (keyboard.getKeyDown(direction)) {

                // カーソル位置を移動する。
                this._move(direction);
            }
        }    
    }

    /**
     * ゲームパッドの入力処理を行う。
     * @param gamepad ゲームパッド
     */
    private _inputGamepad(gamepad: phina.input.Gamepad): void {

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
        if (stick.x < -0.5) {
            input.left = true;
        }

        // 右方向に入力されている場合
        if (stick.x > 0.5) {
            input.right = true;
        }

        // 上方向に入力されている場合
        if (stick.y < -0.5) {
            input.up = true;
        }

        // 下方向に入力されている場合
        if (stick.y > 0.5) {
            input.down = true;
        }

        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {

            // アナログスティックが入力されている場合
            if (input[direction]) {

                // 前回入力されていなかった場合
                if (this._prevGamepadInput[direction]) {

                    // カーソル位置を移動する。
                    this._move(direction);
                }

                // 前回入力をありにする。
                this._prevGamepadInput[direction] = true;
            }
            else {

                // 前回入力を無しにする。
                this._prevGamepadInput[direction] = false;
            }
        }
    }

    /**
     * カーソル位置を移動する。
     * @param direction 移動方向
     */
    private _move(direction: 'left' | 'right' | 'up' | 'down'): void {

        // 現在のカーソル位置の情報がある場合は処理を行う。
        if (this._positions[this._currentPosition]) {

            // 次のカーソル位置を取得する。
            const nextPosition = this._positions[this._currentPosition][direction];

            // 次のカーソル位置の情報がある場合は移動処理を行う。
            if (this._positions[nextPosition]) {

                // カーソル位置を移動する。
                this.setPosition(nextPosition);

                // 効果音を鳴らす。
                phina.asset.SoundManager.play('cursor');            
            }
        }
    }
}

export default Cursor;