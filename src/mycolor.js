/**
 * @class MyColor
 * @brief 色定義
 * ゲーム内で使用する色を定義する。
 */
phina.define('MyColor', {
    _static: {
        // 使用する色、0:薄い、3:濃い
        COLORS: ['#9cb389', '#6e8464', '#40553f', '#12241A'],
        // 背景色
        BACK_COLOR: '#9cb389',
        // 前景色
        FORE_COLOR: '#12241A',
    },
});
