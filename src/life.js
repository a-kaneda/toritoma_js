/** @module life */

import MyColor from './mycolor.js'
import ScreenSize from './screensize.js'
import ControlSize from './controlsize.js'

// 残機最大値
const MAX_LIFE = 99;
// 画像位置
const IMAGE_POS_X = -16;
// ラベル位置
const LABEL_POS_X = 8;

/**
 * 残機を表示する。
 */
class Life {

    /**
     * コンストラクタ。
     * 画像と数値のラベルをくっつけたコントールを作成する。
     */
    constructor() {

        /**
         * ベース部分
         * @type {phina.display.RectangleShape}
         */
        this.base = RectangleShape({
            height: 22,
            width: 52,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
        });

        /**
         * 画像
         * @type {phina.display.Sprite}
         */
        this.image = Sprite('control', ControlSize.cs.life.width, ControlSize.cs.life.height);

        // 画像のサイズと位置を設定する。
        this.image.srcRect.set(ControlSize.cs.life.x, ControlSize.cs.life.y, ControlSize.cs.life.width, ControlSize.cs.life.height);
        this.image.scaleX = ScreenSize.ZOOM_RATIO;
        this.image.scaleY = ScreenSize.ZOOM_RATIO;
        this.image.x = IMAGE_POS_X;
        this.image.addChildTo(this.base);

        /**
         * ラベル
         * @type {phina.display.Label}
         */
        this.label = Label({
            text: ':00',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        });
        this.label.x = LABEL_POS_X;
        this.label.addChildTo(this.base);

        /**
         * 残機
         * @type {number}
         */
        this.life = 0;
    }

    /**
     * 残機画像、ラベルを合わせたスプライトを取得する。
     * @return {phina.display.RectangleShape} スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * 残機を設定し、ラベルの文字列を変更する。
     * @param {number} life - 残機
     */
    setLife(life) {

        // 残機を変更する。
        this.life = life;

        // 最大値を超えている場合は最大値に補正する。
        if (this.life > MAX_LIFE) {
            this.life = MAX_LIFE;
        }

        // ラベルの表示文字列を変更する。
        this.label.text = ':' + ('00' + this.life).slice(-2);
    }
}

export default Life;
