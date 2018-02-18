import ControlSize from './controlsize'
import ScreenSize from './screensize'

/**
 * 枠を作成する。
 */
class Frame {

    /** ベース部分 */
    private _base : phina.display.DisplayElement;    
    /** 画像名の先頭文字列 */
    private _imageName: string;

    /**
     * コンストラクタ。
     * @param imageName 画像名の先頭文字列
     * @param width 幅
     * @param height 高さ
     */
    constructor(imageName: string, width: number, height: number) {

        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();

        // 画像名を設定する。
        this._imageName = imageName;

        // 枠を作成する。
        this._createFrames(width, height);
    }

    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    public addChildTo(parent: phina.app.Element): this {
        this._base.addChildTo(parent);
        return this;
    }

    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    public setPosition(x: number, y: number): this {
        this._base.x = x;
        this._base.y = y;
        return this;
    }

    /**
     * ボタンの枠の部分を作成する。
     * @param width 幅
     * @param height 高さ
     */
    private _createFrames(width: number, height: number): void {

        // フレーム1個分のサイズを取得する。
        const FrameSize = ControlSize[this._imageName + 'TopLeft'].width * ScreenSize.ZOOM_RATIO;

        for (let x = -width / 2; x <= width / 2; x += FrameSize) {

            for (let y = -height / 2; y <= height / 2; y += FrameSize) {

                // 一番上
                if (y === -height / 2) {

                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'TopLeft');
                    }
                    // 左右真ん中
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, this._imageName + 'Top');
                    }
                    // 一番右
                    else {
                        this._createFrame(x, y, this._imageName + 'TopRight');
                    }
                }
                // 上下真ん中
                else if (y + FrameSize <= height / 2) {

                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'Left');
                    }
                    // 左右真ん中
                    else if (x + FrameSize <= width / 2) {
                        // 上下左右真ん中部分は画像無し。
                    }
                    // 一番右
                    else {
                        this._createFrame(x, y, this._imageName + 'Right');
                    }
                }
                // 一番下
                else {

                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'BottomLeft');
                    }
                    // 左右真ん中
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, this._imageName + 'Bottom');
                    }
                    // 一番右
                    else {
                        this._createFrame(x, y, this._imageName + 'BottomRight');
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
    private _createFrame(x: number, y: number, type: string): void {

        // 枠の画像を読み込む。
        const frame = new phina.display.Sprite('control',
            ControlSize[type].width,
            ControlSize[type].height);
        frame.srcRect.set(ControlSize[type].x,
            ControlSize[type].y,
            ControlSize[type].width,
            ControlSize[type].height);
        frame.scaleX = ScreenSize.ZOOM_RATIO;
        frame.scaleY = ScreenSize.ZOOM_RATIO;
        frame.addChildTo(this._base)
        .setPosition(x, y);
    }
}

export default Frame;