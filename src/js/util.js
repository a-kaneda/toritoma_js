/** @module util */
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
    static calcAngle(src, dest) {
        // x座標の差分を計算する。
        const diffX = dest.x - src.x;
        // phina.jsではy座標は上が原点のため、反転させる。
        const diffY = src.y - dest.y;
        // 角度を計算する。
        const ret = Math.atan2(diffY, diffX);
        return ret;
    }
    /**
     * N-Way弾の各弾の進行角度を計算する。
     * @param center 中心角度
     * @param count 弾数
     * @param interval 弾の間の角度
     * @return 各弾の角度
     */
    static calcNWayAngle(center, count, interval) {
        // 戻り値を用意する。
        let angles = [];
        // 最小値の角度を計算する。
        const minAngle = center - (interval * (count - 1)) / 2.0;
        // 各弾の発射角度を計算する。
        for (let i = 0; i < count; i++) {
            // 弾の角度を計算する
            const angle = minAngle + i * interval;
            // 戻り値に追加する。
            angles.push(angle);
        }
        return angles;
    }
}
export default Util;
