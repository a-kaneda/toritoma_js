import ScreenSize from './screensize'
import ControlSize from './controlsize'

/**
 * ボスHPゲージの画像を表示する。
 */
class BossLifeGauge {

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
        this._emptyImage = new phina.display.Sprite('control', 
            ControlSize.bossLifeGaugeEmpty.width, 
            ControlSize.bossLifeGaugeEmpty.height);
        this._emptyImage.srcRect.set(ControlSize.bossLifeGaugeEmpty.x,
            ControlSize.bossLifeGaugeEmpty.y,
            ControlSize.bossLifeGaugeEmpty.width,
            ControlSize.bossLifeGaugeEmpty.height);
        this._emptyImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._emptyImage.scaleY = ScreenSize.ZOOM_RATIO;
        this._emptyImage.addChildTo(this._base);

        // 満ゲージの画像を読み込む。
        this._fullImage = new phina.display.Sprite('control',
            ControlSize.bossLifeGaugeFull.width, 
            ControlSize.bossLifeGaugeFull.height);
        this._fullImage.srcRect.set(ControlSize.bossLifeGaugeFull.x,
            ControlSize.bossLifeGaugeFull.y,
            ControlSize.bossLifeGaugeFull.width,
            ControlSize.bossLifeGaugeFull.height);
        this._fullImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._fullImage.scaleY = ScreenSize.ZOOM_RATIO;
        this._fullImage.addChildTo(this._base);

        // 上端を基準にゲージを増減させるため、原点位置を下端に変更する。
        this._fullImage.setOrigin(0.5, 1);
        this._fullImage.y = ControlSize.bossLifeGaugeFull.height;
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

        // 画像の高さを指定された比率に設定する。
        this._fullImage.height = Math.round(ControlSize.bossLifeGaugeFull.height * value);
        this._fullImage.srcRect.height = Math.round(ControlSize.bossLifeGaugeFull.height * value);
        this._fullImage.srcRect.y = ControlSize.bossLifeGaugeFull.y + ControlSize.bossLifeGaugeFull.height - this._fullImage.srcRect.height;
    }
}

export default BossLifeGauge;
