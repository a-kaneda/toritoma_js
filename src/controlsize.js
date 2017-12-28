const cs = {
    frameBack: {
        x: 0,
        y: 0,
        width: 16,
        height: 16,
    },
    frameLeftTop: {
        x: 16,
        y: 0,
        width: 4,
        height: 4,
    },
    frameTop: {
        x: 20,
        y: 0,
        width: 4,
        height: 4,
    },
    frameRightTop: {
        x: 24,
        y: 0,
        width: 4,
        height: 4,
    },
    frameLeft: {
        x: 16,
        y: 4,
        width: 4,
        height: 4,
    },
    frameRight: {
        x: 24,
        y: 4,
        width: 4,
        height: 4,
    },
    frameBottomLeft: {
        x: 16,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottom: {
        x: 20,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottomRight: {
        x: 24,
        y: 8,
        width: 4,
        height: 4,
    },
    life: {
        x: 0,
        y: 16,
        width: 8,
        height: 8,
    },
    chickenGaugeEmpty: {
        x: 0,
        y: 24,
        width: 128,
        height: 8,
    },
    chickenGaugeFull: {
        x: 0,
        y: 32,
        width: 128,
        height: 8,
    },
    shieldButtonOff: {
        x: 0,
        y: 48,
        width: 32,
        height: 32,
    },
    shieldButtonOn: {
        x: 32,
        y: 48,
        width: 32,
        height: 32,
    },
};

/**
 * @class ControlSize
 * @brief コントロールサイズ
 *
 * control.png内のコントロールの位置とサイズを定義する。
 */
export default class ControlSize {

    static get cs() {
        return cs;
    }
};
