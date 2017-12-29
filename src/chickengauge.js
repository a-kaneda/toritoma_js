/** @module chickengauge */

import ScreenSize from './screensize.js'
import ControlSize from './controlsize.js'

/**
 * チキンゲージの画像を表示する。
 */
class ChickenGauge {

    /**
     * コンストラクタ、画像の読み込みを行う。
     */
    constructor() {

        // ベース部分を作成する。
        this.base = DisplayElement();

        // 空ゲージの画像を読み込む。
        this.emptyImage = Sprite('control', ControlSize.cs.chickenGaugeEmpty.width, ControlSize.cs.chickenGaugeEmpty.height);
        this.emptyImage.srcRect.set(ControlSize.cs.chickenGaugeEmpty.x,
                                    ControlSize.cs.chickenGaugeEmpty.y,
                                    ControlSize.cs.chickenGaugeEmpty.width,
                                    ControlSize.cs.chickenGaugeEmpty.height);
        this.emptyImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.emptyImage.scaleY = ScreenSize.ZOOM_RATIO;
        this.emptyImage.addChildTo(this.base);

        // 満ゲージの画像を読み込む。
        this.fullImage = Sprite('control', ControlSize.cs.chickenGaugeFull.width, ControlSize.cs.chickenGaugeFull.height);
        this.fullImage.srcRect.set(ControlSize.cs.chickenGaugeFull.x,
                                   ControlSize.cs.chickenGaugeFull.y,
                                   ControlSize.cs.chickenGaugeFull.width,
                                   ControlSize.cs.chickenGaugeFull.height);
        this.fullImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.fullImage.scaleY = ScreenSize.ZOOM_RATIO;
        this.fullImage.addChildTo(this.base);

        // 左端を基準にゲージを増減させるため、原点位置を左端に変更する。
        this.fullImage.setOrigin(0, 0.5);
        this.fullImage.x = -ControlSize.cs.chickenGaugeFull.width;

        // ゲージの初期値は0とする。
        this.fullImage.width = 0;
        this.fullImage.srcRect.width = 0;
    }

    /**
     * ゲージのたまっている比率に応じたスプライトを取得する。
     * @return {phina.display.DisplayElement} スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * ゲージが溜まっている比率を設定する。
     * @param {number} rate - ゲージが溜まっている比率(0～1)
     */
    setRate(rate) {

        // 画像の幅を指定された比率に設定する。
        this.fullImage.width = Math.round(ControlSize.cs.chickenGaugeFull.width * rate);
        this.fullImage.srcRect.width = Math.round(ControlSize.cs.chickenGaugeFull.width * rate);
    }
}

export default ChickenGauge;
