import ScreenSize from './screensize.js'
import ControlSize from './controlsize.js'

/**
 * チキンゲージの画像を表示する。
 */
class ChickenGauge {

    /** 画像ベース部分 */
    private _base: phina.display.DisplayElement;
    /** 空ゲージの画像 */
    private _emptyImage: phina.display.Sprite;
    /** 満ゲージの画像 */
    private _fullImage: phina.display.Sprite;

    /**
     * コンストラクタ、画像の読み込みを行う。
     */
    constructor() {

        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();

        // 空ゲージの画像を読み込む。
        this._emptyImage = new phina.display.Sprite('control', ControlSize.cs.chickenGaugeEmpty.width, ControlSize.cs.chickenGaugeEmpty.height);
        this._emptyImage.srcRect.set(ControlSize.cs.chickenGaugeEmpty.x,
                                    ControlSize.cs.chickenGaugeEmpty.y,
                                    ControlSize.cs.chickenGaugeEmpty.width,
                                    ControlSize.cs.chickenGaugeEmpty.height);
        this._emptyImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._emptyImage.scaleY = ScreenSize.ZOOM_RATIO;
        this._emptyImage.addChildTo(this._base);

        // 満ゲージの画像を読み込む。
        this._fullImage = new phina.display.Sprite('control', ControlSize.cs.chickenGaugeFull.width, ControlSize.cs.chickenGaugeFull.height);
        this._fullImage.srcRect.set(ControlSize.cs.chickenGaugeFull.x,
                                   ControlSize.cs.chickenGaugeFull.y,
                                   ControlSize.cs.chickenGaugeFull.width,
                                   ControlSize.cs.chickenGaugeFull.height);
        this._fullImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._fullImage.scaleY = ScreenSize.ZOOM_RATIO;
        this._fullImage.addChildTo(this._base);

        // 左端を基準にゲージを増減させるため、原点位置を左端に変更する。
        this._fullImage.setOrigin(0, 0.5);
        this._fullImage.x = -ControlSize.cs.chickenGaugeFull.width;

        // ゲージの初期値は0とする。
        this._fullImage.width = 0;
        this._fullImage.srcRect.width = 0;
    }

    /**
     * ゲージのたまっている比率に応じたスプライト。
     */
    public get sprite(): phina.display.DisplayElement {
        return this._base;
    }

    /**
     * ゲージが溜まっている比率(0～1)。
     * 満ゲージの表示幅を連動して変更させる。
     */
    public set rate(value: number) {

        // 画像の幅を指定された比率に設定する。
        this._fullImage.width = Math.round(ControlSize.cs.chickenGaugeFull.width * value);
        this._fullImage.srcRect.width = Math.round(ControlSize.cs.chickenGaugeFull.width * value);
    }
}

export default ChickenGauge;
