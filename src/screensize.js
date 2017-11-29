// 拡大率
const ZOOM_RATIO = 2;

/**
 * @class ScreenSize
 * @brief 画面サイズ
 * 画面サイズを管理する。
 */
phina.define('ScreenSize', {
    _static: {
        // 拡大率
        ZOOM_RATIO: ZOOM_RATIO,
        // スクリーンの幅
        SCREEN_WIDTH: 240 * ZOOM_RATIO,
        // スクリーンの高さ
        SCREEN_HEIGHT: 160 * ZOOM_RATIO,
        // ゲーム画面のサイズ
        STAGE_RECT: {
            x: 24,
            y: 0,
            width: 192,
            height: 144,
        },
    },
});

