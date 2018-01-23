/**
 * コントロールサイズ
 */
const cs = {
    title: {
        x: 0,
        y: 0,
        width: 128,
        height: 112,
    },
    chickenGaugeEmpty: {
        x: 0,
        y: 112,
        width: 128,
        height: 8,
    },
    chickenGaugeFull: {
        x: 0,
        y: 120,
        width: 128,
        height: 8,
    },
    bossLifeGaugeEmpty: {
        x: 128,
        y: 0,
        width: 8,
        height: 96,
    },
    bossLifeGaugeFull: {
        x: 136,
        y: 0,
        width: 8,
        height: 96,
    },
    shieldButtonOff: {
        x: 144,
        y: 0,
        width: 32,
        height: 32,
    },
    shieldButtonOn: {
        x: 176,
        y: 0,
        width: 32,
        height: 32,
    },
    frameBack: {
        x: 208,
        y: 0,
        width: 16,
        height: 16,
    },
    frameLeftTop: {
        x: 224,
        y: 0,
        width: 4,
        height: 4,
    },
    frameTop: {
        x: 228,
        y: 0,
        width: 4,
        height: 4,
    },
    frameRightTop: {
        x: 232,
        y: 0,
        width: 4,
        height: 4,
    },
    frameLeft: {
        x: 224,
        y: 4,
        width: 4,
        height: 4,
    },
    frameRight: {
        x: 232,
        y: 4,
        width: 4,
        height: 4,
    },
    frameBottomLeft: {
        x: 224,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottom: {
        x: 228,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottomRight: {
        x: 232,
        y: 8,
        width: 4,
        height: 4,
    },
    life: {
        x: 240,
        y: 0,
        width: 8,
        height: 8,
    },
    pauseButton: {
        x: 208,
        y: 16,
        width: 16,
        height: 16,
    },
    cursor: {
        x: 224,
        y: 15,
        width: 22,
        height: 17,
    },
    buttonTopLeft: {
        x: 144,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonTop: {
        x: 152,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonTopRight: {
        x: 160,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonLeft: {
        x: 144,
        y: 40,
        width: 8,
        height: 8,
    },
    buttonRight: {
        x: 160,
        y: 40,
        width: 8,
        height: 8,
    },
    buttonBottomLeft: {
        x: 144,
        y: 48,
        width: 8,
        height: 8,
    },
    buttonBottom: {
        x: 152,
        y: 48,
        width: 8,
        height: 8,
    },
    buttonBottomRight: {
        x: 160,
        y: 48,
        width: 8,
        height: 8,
    },
};
/**
 * control.png内のコントロールの位置とサイズを定義する。
 */
class ControlSize {
    /**
     * control.png内のコントロールの位置とサイズ。
     */
    static get cs() {
        return cs;
    }
}
;
export default ControlSize;
