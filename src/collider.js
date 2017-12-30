/** @module collider */
import Util from './util.js'
import Stage from './stage.js'
import ScreenSize from './screensize.js'

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

    /**
     * Y軸方向に障害物を検索する。
     * @param {boolean} isUpside - 上向きに検索する場合true
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、
     *     上方向の検索の場合はステージ上端、
     *     下方向の検索の場合はステージ下端を返す。
     */
    getBlockY(isUpside, xpos, stagePosition, blockMap) {

        if (isUpside) {
            return this.getBlockYUpside(xpos, stagePosition, blockMap);
        }
        else {
            return this.getBlockYDownside(xpos, stagePosition, blockMap);
        }
    }

    /**
     * Y軸上方向に障害物を検索する。
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、ステージ上端を返す。
     */
    getBlockYUpside(xpos, stagePosition, blockMap) {

        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this.y / Stage.TILE_SIZE), blockMap.length - 1);

        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / Stage.TILE_SIZE)

        // 下から上方向に検索する。
        for (let y = ybegin; y >= 0; y--) {

            if (blockMap[y][x]) {

                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * Stage.TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * Stage.TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };

                return ret;
            }
        }

        // 見つからなかった場合、ステージ上端を返す。
        const ret = {
            x: ScreenSize.STAGE_RECT / 2,
            y: 0,
            width: ScreenSize.STAGE_RECT,
            height: 0,
        };

        return ret;
    }

    /**
     * Y軸下方向に障害物を検索する。
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、ステージ下端を返す。
     */
    getBlockYDownside(xpos, stagePosition, blockMap) {

        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this.y / Stage.TILE_SIZE), blockMap.length - 1);

        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / Stage.TILE_SIZE)

        // 上から下方向に検索する。
        for (let y = ybegin; y < blockMap.length; y++) {

            if (blockMap[y][x]) {

                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * Stage.TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * Stage.TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };

                return ret;
            }
        }

        // 見つからなかった場合、ステージ下端を返す。
        const ret = {
            x: ScreenSize.STAGE_RECT.width / 2,
            y: ScreenSize.STAGE_RECT.height,
            width: ScreenSize.STAGE_RECT.width,
            height: 0,
        };

        return ret;
    }
}

export default Collider;
