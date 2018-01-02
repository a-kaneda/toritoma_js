/** @module util */
/**
 * アプリ全体で使用する関数群を定義する。
 */
class Util {
    /**
     * srcを始点、destを終点としたときの角度を求める。
     * @param {Object} src - 始点
     * @param {Object} dest - 終点
     * @return {number} 角度
     */
    static calcAngle(src, dest) {
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
