/** @module life */
import MyColor from './mycolor.js';
import ScreenSize from './screensize.js';
import ControlSize from './controlsize.js';
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
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            height: 22,
            width: 52,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
        });
        // スプライト画像を読み込む。
        this._image = new phina.display.Sprite('control', ControlSize.cs.life.width, ControlSize.cs.life.height);
        // 画像のサイズと位置を設定する。
        this._image.srcRect.set(ControlSize.cs.life.x, ControlSize.cs.life.y, ControlSize.cs.life.width, ControlSize.cs.life.height);
        this._image.scaleX = ScreenSize.ZOOM_RATIO;
        this._image.scaleY = ScreenSize.ZOOM_RATIO;
        this._image.x = IMAGE_POS_X;
        this._image.addChildTo(this._base);
        // ラベルを作成する。
        // ':00'の形式で表示すると、なぜかiPadのsafariで見ると十の位の0の右側にごみが表示されるため、
        // 後ろにブランクを付ける。
        this._label = new phina.display.Label({
            text: ':00 ',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        });
        this._label.x = LABEL_POS_X;
        this._label.addChildTo(this._base);
        // 残機を初期化する。
        this._life = 0;
    }
    /**
     * 残機画像、ラベルを合わせたスプライト。
     */
    get sprite() {
        return this._base;
    }
    /**
     * 残機。ラベルの文字列も連動して変化する。
     */
    set life(value) {
        // 残機を変更する。
        this._life = value;
        // 最大値を超えている場合は最大値に補正する。
        if (this._life > MAX_LIFE) {
            this._life = MAX_LIFE;
        }
        // ラベルの表示文字列を変更する。
        // ':00'の形式で表示すると、なぜかiPadのsafariで見ると十の位の0の右側にごみが表示されるため、
        // 後ろにブランクを付ける。
        this._label.text = ':' + ('00' + this._life).slice(-2) + ' ';
    }
}
export default Life;
