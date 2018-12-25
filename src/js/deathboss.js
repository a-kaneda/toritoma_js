import Explosion from './explosion';
/**
 * ボスキャラクター破壊時処理。
 */
class DeathBoss {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
        // 死亡エフェクト間隔を初期化する。
        this._deathInterval = 0;
    }
    /**
     * 更新処理。
     * 一定時間爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 爆発の間隔
        const EXPLOSION_INTERVAL = 20;
        // 状態遷移間隔
        const STATE_INTERVAL = 300;
        // 爆発の間隔が経過している場合は爆発を発生させる。
        this._deathInterval++;
        if (this._deathInterval % EXPLOSION_INTERVAL == 0) {
            // 爆発発生位置を決める。
            const x = this._target.rect.x + (Math.random() - 0.5) * this._target.rect.width;
            const y = this._target.rect.y + (Math.random() - 0.5) * this._target.rect.height;
            // 爆発アニメーションを作成する。
            scene.addCharacter(new Explosion(x, y, scene));
        }
        // 状態遷移間隔が経過している場合は死亡処理を行う。
        if (this._deathInterval > STATE_INTERVAL) {
            // スコアを加算する。
            scene.addScore(this._score);
            // チキンゲージを増加させる。
            scene.addChickenGauge(this._gauge);
            // ステージクリア処理を行う。
            scene.stageClear();
            // キャラクターを削除する。
            scene.removeCharacter(this._target);
        }
    }
}
export default DeathBoss;
