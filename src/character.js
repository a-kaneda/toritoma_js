// キャラクター種別
const type = {
    // 自機
    PLAYER: 1,
    // 自機オプション
    PLAYER_OPTION: 2,
    // 自機弾
    PLAYER_SHOT: 3,
    // 敵
    ENEMY: 4,
    // 敵弾
    ENEMY_SHOT: 5,
};

// 敵キャラパラメータ
const enemy = {
    // トンボ
    dragonfly: {
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
    },
};

/**
 * @class Character
 * @brief キャラクター定数
 * キャラクターに関する定数を管理する。
 */
export default class Character {
    static get type() {
        return type;
    }
    static get enemy() {
        return enemy;
    }
}
