import MyColor from './mycolor';
class Button {
    /**
     * コンストラクタ。
     * @param width 幅
     * @param height 高さ
     */
    constructor(width, height) {
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            width: height,
            height: width,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            padding: 0,
        });
        // ラベルを作成する。
        this._label = new phina.display.Label({
            text: '',
            fontSize: 32,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._base);
        // イベントハンドラを初期化する。
        this._handler = null;
        // タッチ操作を有効にする。
        this._base.setInteractive(true);
        // タッチ開始イベントのハンドラを作成する。
        this._base.on('pointstart', (event) => {
            console.log(this._handler);
            if (this._handler !== null) {
                this._handler();
            }
        });
    }
    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._base.addChildTo(parent);
        return this;
    }
    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    setPosition(x, y) {
        this._base.x = x;
        this._base.y = y;
        return this;
    }
    /**
     * イベントハンドラを設定する。
     * @param handler イベントハンドラ
     * @return 自インスタンス
     */
    setHandler(handler) {
        this._handler = handler;
        return this;
    }
    /**
     * ラベルのテキストを設定する。
     * @param label ラベルのテキスト
     * @return 自インスタンス
     */
    setLabel(label) {
        this._label.text = label;
        return this;
    }
}
export default Button;
