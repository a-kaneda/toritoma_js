/** @module util */

import ScreenSize from './screensize'
import Stage from './stage'
import Point from './point'
import Rect from './rect'

/**
 * アプリ全体で使用する関数群を定義する。
 */
class Util {

    /**
     * srcを始点、destを終点としたときの角度を求める。
     * @param src 始点
     * @param dest 終点
     * @return 角度
     */
    public static calcAngle(src: Point, dest: Point): number {

        // x座標の差分を計算する。
        const diffX = dest.x - src.x;

        // phina.jsではy座標は上が原点のため、反転させる。
        const diffY = src.y - dest.y;

        // 角度を計算する。
        const ret = Math.atan2(diffY, diffX);

        return ret;
    }
}

export default Util;
