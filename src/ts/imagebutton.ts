import ControlSize from './controlsize'
import ScreenSize from './screensize'

/**
 * 画像を使用したボタン。
 * control.pngの中の画像を指定する。
 * ControlSizeの中にサイズ情報を入れておく必要がある。
 */
class ImageBUtton {

    /** ベース部分 */
    private _base: phina.display.DisplayElement;
    /** 画像部分 */
    private _image: phina.display.Sprite;
    /** ボタン部分 */
    private _button: phina.display.RectangleShape;
    /** ボタン選択時のコールバック関数 */
    private _onPush: (() => void) | null;
    /** 有効かどうか */
    private _enable: boolean;

    /**
     * コンストラクタ。
     * 画像の読み込みとボタン部分を作成する。
     * @param name コントロール名
     */
    constructor(name: string) {

        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();

        // 画像を読み込む。
        this._image = new phina.display.Sprite('control', 
            ControlSize[name].width, 
            ControlSize[name].height)
        .addChildTo(this._base);
        this._image.srcRect.set(ControlSize[name].x,
            ControlSize[name].y,
            ControlSize[name].width,
            ControlSize[name].height);
        this._image.scaleX = ScreenSize.ZOOM_RATIO;
        this._image.scaleY = ScreenSize.ZOOM_RATIO;
    
        // ボタン部分を作成する。
        // タップをやりやすくするため、画像より大きめにサイズを取る。
        this._button = new phina.display.RectangleShape({
            width: Math.ceil(ControlSize[name].width * 1.5),
            height: Math.ceil(ControlSize[name].height * 1.5),
        })
        .addChildTo(this._base);

        // ボタン部分を非表示にする。
        this._button.alpha = 0;

        // タッチ操作を有効にする。
        this._button.setInteractive(true);

        // ベース部分に追加する。
        this._button.addChildTo(this._base);

        // タッチ開始イベントのハンドラを作成する。
        this._button.on('pointstart', (event: Event) => {
            if (this._enable && this._onPush !== null) {
                this._onPush();
            }
        });

        // 初期状態は有効とする。
        this._enable = true;

        // コールバック関数を初期化する。
        this._onPush = null;
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
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    public onPush(func: () => void): this {
        this._onPush = func;
        return this;
    }

    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    public setEnable(value: boolean): this {
        this._enable = value;
        return this;
    }

    /**
     * ボタン選択時の処理を行う。
     */
    public push(): this{
        if (this._onPush !== null) {
            this._onPush();
        }
        return this;
    }
}

export default ImageBUtton;