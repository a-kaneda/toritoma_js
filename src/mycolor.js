// 使用する色、0:薄い、3:濃い
const COLORS = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// 背景色
const BACK_COLOR = '#9cb389';
// 前景色
const FORE_COLOR = '#12241A';

/**
 * @class MyColor
 * @brief 色定義
 * ゲーム内で使用する色を定義する。
 */
export default class MyColor {
    static get COLORS() {
        return COLORS;
    }
    static get BACK_COLOR() {
        return BACK_COLOR;
    }
    static get FORE_COLOR() {
        return FORE_COLOR;
    }
}
