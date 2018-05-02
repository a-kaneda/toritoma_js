/**
 * キャラクター種別
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
    /** エフェクト */
    EFFECT: 6,
};
/** 敵キャラ死亡エフェクト */
export var DeathEffect;
(function (DeathEffect) {
    DeathEffect[DeathEffect["NORMAL"] = 0] = "NORMAL";
    DeathEffect[DeathEffect["BOSS"] = 1] = "BOSS";
})(DeathEffect || (DeathEffect = {}));
/**
 * 敵キャラパラメータ定義。
 */
const enemy = {
    // トンボ
    dragonfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
        death: DeathEffect.NORMAL,
    },
    // アリ
    ant: {
        size: 16,
        width: 16,
        height: 8,
        hp: 7,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // チョウ
    butterfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 10,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // テントウムシ
    ladybug: {
        size: 16,
        width: 16,
        height: 16,
        hp: 18,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // ミノムシ
    bagworm: {
        size: 16,
        width: 16,
        height: 16,
        hp: 30,
        defense: 0,
        score: 300,
        death: DeathEffect.NORMAL,
    },
    // カブトムシ
    rhinocerosbeetle: {
        size: 64,
        width: 64,
        height: 40,
        hp: 1000,
        defense: 0,
        score: 3000,
        death: DeathEffect.BOSS,
    },
    // カマキリ
    mantis: {
        size: 64,
        width: 64,
        height: 64,
        hp: 1300,
        defense: 3,
        score: 3000,
        death: DeathEffect.BOSS,
    },
};
/**
 * キャラクターに関する定数を管理する。
 */
class Character {
    /**
     * キャラクタータイプ。
     */
    static get type() {
        return type;
    }
    /**
     * 敵キャラクターパラメータ。
     */
    static get enemy() {
        return enemy;
    }
    /**
     * 指定されたキャラクターが敵かどうかを判定する。
     * @param obj キャラクター
     * @return 敵かどうか
     */
    static isEnemy(obj) {
        if (obj.type === Character.type.ENEMY) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 指定されたキャラクターが敵弾かどうかを判定する。
     * @param obj キャラクター
     * @return 敵弾かどうか
     */
    static isEnemyShot(obj) {
        if (obj.type === Character.type.ENEMY_SHOT) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default Character;
