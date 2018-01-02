/** @module screensize */
// 拡大率
const ZOOM_RATIO = 2;
// スクリーンの幅
const SCREEN_WIDTH = 240 * ZOOM_RATIO;
// スクリーンの高さ
const SCREEN_HEIGHT = 160 * ZOOM_RATIO;
// ゲーム画面のサイズ
const STAGE_RECT = {
    x: 24,
    y: 0,
    width: 192,
    height: 144,
};
/**
 * 画面サイズを管理する。
 */
class ScreenSize {
    /** 拡大率 */
    static get ZOOM_RATIO() {
        return ZOOM_RATIO;
    }
    /** スクリーンの幅 */
    static get SCREEN_WIDTH() {
        return SCREEN_WIDTH;
    }
    /** スクリーンの高さ */
    static get SCREEN_HEIGHT() {
        return SCREEN_HEIGHT;
    }
    /** ゲーム画面のサイズ */
    static get STAGE_RECT() {
        return STAGE_RECT;
    }
    ;
}
export default ScreenSize;
