import Util from './util.js'

/**
 * @class Collider
 * @brief 当たり判定
 * 当たり判定処理を行う。
 */
export default class Collider {

    /**
     * @function init
     * @brief コンストラクタ
     * 当たり判定の範囲を設定する。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] width 幅
     * @param [in] height 高さ
     */
    constructor(x, y, width, height) {

        // メンバ変数に格納する。
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * @function getHitCharacter
     * @brief 衝突キャラクター検索
     * 衝突しているキャラクターを検索する。
     *
     * @param [in] characters キャラクター配列
     * @param [in] types 検索対象のキャラクター種別
     * @return 衝突しているキャラクター配列
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
