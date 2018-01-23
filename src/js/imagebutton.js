import ControlSize from './controlsize';
import ScreenSize from './screensize';
/**
 * 画像を使用したボタン。
 * control.pngの中の画像を指定する。
 * ControlSizeの中にサイズ情報を入れておく必要がある。
 */
class ImageBUtton {
    /**
     * コンストラクタ。
     * 画像の読み込みとボタン部分を作成する。
     * @param name コントロール名
     */
    constructor(name) {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // 画像を読み込む。
        this._image = new phina.display.Sprite('control', ControlSize.cs[name].width, ControlSize.cs[name].height)
            .addChildTo(this._base);
        this._image.srcRect.set(ControlSize.cs[name].x, ControlSize.cs[name].y, ControlSize.cs[name].width, ControlSize.cs[name].height);
        this._image.scaleX = ScreenSize.ZOOM_RATIO;
        this._image.scaleY = ScreenSize.ZOOM_RATIO;
        // ボタン部分を作成する。
        // タップをやりやすくするため、画像より大きめにサイズを取る。
        this._button = new phina.display.RectangleShape({
            width: Math.ceil(ControlSize.cs[name].width * 1.5),
            height: Math.ceil(ControlSize.cs[name].height * 1.5),
        })
            .addChildTo(this._base);
        // ボタン部分を非表示にする。
        this._button.alpha = 0;
        // タッチ操作を有効にする。
        this._button.setInteractive(true);
        // ベース部分に追加する。
        this._button.addChildTo(this._base);
        // タッチ開始イベントのハンドラを作成する。
        this._button.on('pointstart', (event) => {
            if (this._enable && this._onPush !== null) {
                this._onPush();
            }
        });
        // コールバック関数を初期化する。
        this._onPush = null;
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
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onPush(func) {
        this._onPush = func;
        return this;
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    setEnable(value) {
        this._enable = value;
        return this;
    }
}
export default ImageBUtton;
