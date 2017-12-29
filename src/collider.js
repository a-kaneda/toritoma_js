/** @module collider */
import Util from './util.js'

/**
 * 当たり判定処理を行う。
 */
class Collider {

    /**
     * コンストラクタ、当たり判定の範囲を設定する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} width - 幅
     * @param {number} height - 高さ
     */
    constructor(x, y, width, height) {

        // メンバ変数に格納する。
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * 衝突しているキャラクターを検索する。
     * @param {Array} characters - キャラクター配列
     * @param {Array} types - 検索対象のキャラクター種別
     * @return {Array} 衝突しているキャラクター配列
     */
    getHitCharacter(characters, types) {

        let ret = [];

        // 各キャラクターとの当たり判定を処理する。
        for (let i = 0; i < characters.length; i++) {

            // 検索対象のキャラクター種別か調べる。
            if (types.indexOf(characters[i].type) >= 0) {

                // 接触しているかどうかを調べる。
                if (Util.isHitCharacter(this, characters[i].hitArea)) {

                    // 見つかったキャラクターを戻り値に追加する。
                    ret.push(characters[i]);
                }
            }
        }

        return ret;
    }
}

export default Collider;
