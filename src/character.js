/** @module character */

/**
 * キャラクター種別
 * @enum {number}
 */
const type = {
    /** 自機 */
    PLAYER: 1,
    /** 自機オプション */
    PLAYER_OPTION: 2,
    /** 自機弾 */
    PLAYER_SHOT: 3,
    /** 敵 */
    ENEMY: 4,
    /** 敵弾 */
    ENEMY_SHOT: 5,
};

/**
 * 敵キャラパラメータ
 * @type {object}
 */
const enemy = {
    /** トンボ */
    dragonfly: {
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
    },
};

/**
 * キャラクターに関する定数を管理する。
 */
class Character {

    /**
     * キャラクタータイプ
     * @type {Array}
     */
    static get type() {
        return type;
    }

    /**
     * 敵キャラクターパラメータ
     * @type {object}
     */
    static get enemy() {
        return enemy;
    }
}

export default Character;
