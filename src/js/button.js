import MyColor from './mycolor';
import ControlSize from './controlsize';
import ScreenSize from './screensize';
class Button {
    /**
     * コンストラクタ。
     * @param width 幅
     * @param height 高さ
     */
    constructor(width, height) {
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            width: width + ControlSize.cs.buttonTopLeft.width * ScreenSize.ZOOM_RATIO,
            height: height + ControlSize.cs.buttonTopLeft.height * ScreenSize.ZOOM_RATIO,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            padding: 0,
        });
        // 枠を作成する。
        this._createFrames(width, height);
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
    /**
     * ボタンの枠の部分を作成する。
     * @param width 幅
     * @param height 高さ
     */
    _createFrames(width, height) {
        // フレーム1個分のサイズを取得する。
        const FrameSize = ControlSize.cs.buttonTopLeft.width * ScreenSize.ZOOM_RATIO;
        for (let x = -width / 2; x <= width / 2; x += FrameSize) {
            for (let y = -height / 2; y <= height / 2; y += FrameSize) {
                // 一番上
                if (y === -height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonTopLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, 'buttonTop');
                    }
                    else {
                        this._createFrame(x, y, 'buttonTopRight');
                    }
                }
                else if (y + FrameSize <= height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        // 上下左右真ん中部分は画像無し。
                    }
                    else {
                        this._createFrame(x, y, 'buttonRight');
                    }
                }
                else {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonBottomLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, 'buttonBottom');
                    }
                    else {
                        this._createFrame(x, y, 'buttonBottomRight');
                    }
                }
            }
        }
    }
    /**
     * 枠の画像を読み込み、ベースに配置する。
     * @param x x座標
     * @param y y座標
     * @param type 枠のタイプ
     */
    _createFrame(x, y, type) {
        // 枠の画像を読み込む。
        const frame = new phina.display.Sprite('control', ControlSize.cs[type].width, ControlSize.cs[type].height);
        frame.srcRect.set(ControlSize.cs[type].x, ControlSize.cs[type].y, ControlSize.cs[type].width, ControlSize.cs[type].height);
        frame.scaleX = ScreenSize.ZOOM_RATIO;
        frame.scaleY = ScreenSize.ZOOM_RATIO;
        frame.addChildTo(this._base)
            .setPosition(x, y);
    }
}
export default Button;
