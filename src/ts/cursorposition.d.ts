/**
 * カーソル位置。
 */
type CursorPositon = {
    /** x座標 */
    x: number,
    /** y座標 */
    y: number,
    /** 左のカーソル位置のID */
    left: number,
    /** 右のカーソル位置のID */
    right: number,
    /** 上のカーソル位置のID */
    up: number,
    /** 下のカーソル位置のID */
    down: number,
};

/**
 * 方向を表す文字列。
 */
type Direction = 'left' | 'right' | 'up' | 'down';