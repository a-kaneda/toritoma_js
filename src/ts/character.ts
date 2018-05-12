/** @module character */
import Enemy from './enemy'
import EnemyShot from './enemyshot'
import CharacterIF from './characterif'

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
export enum DeathEffect {
    NORMAL,     // 雑魚
    BOSS,       // ボス
}

/** 敵キャラパラメータ */
type EnemyParam = {
    /** 画像サイズ */
    size: number,
    /** 当たり判定、幅 */
    width: number,
    /** 当たり判定、高さ */
    height: number,
    /** HP */
    hp: number,
    /** 防御力 */
    defense: number,
    /** スコア */
    score: number,
    /** 死亡エフェクト */
    death: DeathEffect,
};

/**
 * 敵キャラパラメータ定義。
 */
const enemy: { [key: string]: EnemyParam} = {
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
    // セミ
    cicada: {
        size: 16,
        width: 16,
        height: 16,
        hp: 20,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // バッタ
    grasshopper: {
        size: 16,
        width: 16,
        height: 16,
        hp: 9,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // ハチ
    hornet: {
        size: 16,
        width: 16,
        height: 16,
        hp: 12,
        defense: 0,
        score: 200,
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
        defense: 99,
        score: 3000,
        death: DeathEffect.BOSS,
    },
    // ハチの巣
    honeycomb: {
        size: 64,
        width: 64,
        height: 64,
        hp: 1200,
        defense: 99,
        score: 3000,
        death: DeathEffect.BOSS,
    },
    // クモ
    spider: {
        size: 64,
        width: 64,
        height: 64,
        hp: 1600,
        defense: 0,
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
    static isEnemy(obj: CharacterIF): obj is Enemy {
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
    static isEnemyShot(obj: CharacterIF): obj is EnemyShot {
        if (obj.type === Character.type.ENEMY_SHOT) {
            return true;
        }
        else {
            return false;
        }
    }
}

export default Character;