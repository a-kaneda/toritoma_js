/** @module mycolor */

// 使用する色、0:薄い、3:濃い
const COLORS = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// 背景色
const BACK_COLOR = '#9cb389';
// 前景色
const FORE_COLOR = '#12241A';

/**
 * ゲーム内で使用する色を定義する。
 */
class MyColor {
    
    /**
     * 使用する色、0:薄い、3:濃い
     */
    static get COLORS() {
        return COLORS;
    }

    /**
     * 背景色
     */
    static get BACK_COLOR() {
        return BACK_COLOR;
    }

    /**
     * 前景色
     */
    static get FORE_COLOR() {
        return FORE_COLOR;
    }
}

export default MyColor;
