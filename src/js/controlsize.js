/**
 * コントロールサイズ
 */
const cs = {
    chickenGaugeEmpty: {
        x: 0,
        y: 0,
        width: 128,
        height: 8,
    },
    chickenGaugeFull: {
        x: 0,
        y: 8,
        width: 128,
        height: 8,
    },
    bossLifeGaugeEmpty: {
        x: 0,
        y: 16,
        width: 8,
        height: 96,
    },
    bossLifeGaugeFull: {
        x: 8,
        y: 16,
        width: 8,
        height: 96,
    },
    shieldButtonOff: {
        x: 16,
        y: 16,
        width: 32,
        height: 32,
    },
    shieldButtonOn: {
        x: 48,
        y: 16,
        width: 32,
        height: 32,
    },
    frameBack: {
        x: 80,
        y: 16,
        width: 16,
        height: 16,
    },
    frameLeftTop: {
        x: 96,
        y: 16,
        width: 4,
        height: 4,
    },
    frameTop: {
        x: 100,
        y: 16,
        width: 4,
        height: 4,
    },
    frameRightTop: {
        x: 104,
        y: 16,
        width: 4,
        height: 4,
    },
    frameLeft: {
        x: 96,
        y: 20,
        width: 4,
        height: 4,
    },
    frameRight: {
        x: 104,
        y: 20,
        width: 4,
        height: 4,
    },
    frameBottomLeft: {
        x: 96,
        y: 24,
        width: 4,
        height: 4,
    },
    frameBottom: {
        x: 100,
        y: 24,
        width: 4,
        height: 4,
    },
    frameBottomRight: {
        x: 104,
        y: 24,
        width: 4,
        height: 4,
    },
    life: {
        x: 112,
        y: 16,
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
