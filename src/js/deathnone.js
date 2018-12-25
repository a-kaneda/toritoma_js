/**
 * エフェクトなし敵キャラ破壊時処理。
 */
class DeathNormal {
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
    }
    /**
     * 更新処理。
     * エフェクトなしで自分を削除する。
     * @param scene シーン
     */
    update(scene) {
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
export default DeathNormal;
