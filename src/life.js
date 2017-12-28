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
 * @class Life
 * @brief 残機表示
 * 残機を表示する。
 */
export default class Life {

    /**
     * @function init
     * @brief コンストラクタ
     * 画像と数値のラベルをくっつけたコントールを作成する。
     */
    constructor() {

        // ベース部分を作成する。
        this.base = RectangleShape({
            height: 22,
            width: 52,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
        });

        // 画像を読み込む。
        this.image = Sprite('control', ControlSize.cs.life.width, ControlSize.cs.life.height);
        this.image.srcRect.set(ControlSize.cs.life.x, ControlSize.cs.life.y, ControlSize.cs.life.width, ControlSize.cs.life.height);
        this.image.scaleX = ScreenSize.ZOOM_RATIO;
        this.image.scaleY = ScreenSize.ZOOM_RATIO;
        this.image.x = IMAGE_POS_X;
        this.image.addChildTo(this.base);

        // ラベルを作成する。
        this.label = Label({
            text: ':00',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        });
        this.label.x = LABEL_POS_X;
        this.label.addChildTo(this.base);

        // 残機の初期値は0とする。
        this.life = 0;
    }

    /**
     * @function getSprite
     * @brief スプライト取得
     * 残機画像、ラベルを合わせたスプライトを取得する。
     *
     * @return スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * @function setLife
     * @brief 残機設定
     * 残機を設定し、
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
