import ScreenSize from './screensize';
import ControlSize from './controlsize';
import DPad from './dpad';
// 方向を表す文字列
const DIRECTIONS = ['left', 'right', 'up', 'down'];
/**
 * カーソル。
 */
class Cursor {
    /**
     * コンストラクタ。
     */
    constructor() {
        // 画像を読み込む。
        this._sprite = new phina.display.Sprite('control', ControlSize.cursor.width, ControlSize.cursor.height);
        this._sprite.srcRect.set(ControlSize.cursor.x, ControlSize.cursor.y, ControlSize.cursor.width, ControlSize.cursor.height);
        this._sprite.scaleX = ScreenSize.ZOOM_RATIO;
        this._sprite.scaleY = ScreenSize.ZOOM_RATIO;
        // カーソル位置配列を作成する。
        this._positions = {};
        // 現在のカーソル位置情報を初期化する。
        this._currentPosition = 0;
        // 初期状態は有効とする。
        this._enable = true;
        // 方向キー管理クラスを作成する。
        this._dpad = new DPad().onKeyDown((direction) => { this._move(direction); });
    }
    /** 現在のカーソル位置のID */
    get position() {
        return this._currentPosition;
    }
    /**
     * 画像を親ノードに追加する。
     * @param parent 親ノード]
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._sprite.addChildTo(parent);
        return this;
    }
    /**
     * カーソル位置情報を追加する。
     * @param id カーソル位置のID、一意な値を指定する。
     * @param position カーソル位置情報
     * @return 自インスタンス
     */
    addPosition(id, position) {
        this._positions[id] = position;
        return this;
    }
    /**
     * カーソルの位置を設定する。addPositionで登録したカーソル位置へ移動する。
     * @param id カーソル位置のID
     * @return 自インスタンス
     */
    setPosition(id) {
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
    setEnable(value) {
        this._enable = value;
        return this;
    }
    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    input(keyboard, gamepad) {
        // 有効な場合は処理を行う。
        if (this._enable) {
            // キーボードの入力処理を行う。
            this._inputKeyboard(keyboard);
            // ゲームパッドの入力処理を行う。
            this._dpad.input(gamepad);
        }
        return this;
    }
    /**
     * キーボードの入力処理を行う。
     * 上下キーでカーソルを移動し、zキーでボタンを選択する。
     * @param keyboard キーボード
     */
    _inputKeyboard(keyboard) {
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
     * カーソル位置を移動する。
     * @param direction 移動方向
     */
    _move(direction) {
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
