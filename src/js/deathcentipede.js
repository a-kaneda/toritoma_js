import Explosion from './explosion';
import CentipedeTail from './centipedetail';
import EnemyFactory from './enemyfactory';
/**
 * ムカデの尻尾破壊時処理。
 */
class DeathCentipede {
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
     * 爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 対象のキャラクターがムカデの尻尾で、
        // 1個前の体が設定されている場合のみ処理を行う。
        if (this._target instanceof CentipedeTail && this._target.parent) {
            // 2個前の体が存在する場合（1個前が胴体の場合）と
            // 1個前が頭の場合で処理を分岐する。
            if (this._target.parent.parent) {
                // 2個前の体が存在する場合（1個前が胴体の場合）
                // 爆発アニメーションを作成する。
                scene.addCharacter(new Explosion(this._target.rect.x, this._target.rect.y, scene));
                // 1個前の胴体の位置に尻尾を作成する。
                const tail = EnemyFactory.create(this._target.parent.rect.x, this._target.parent.rect.y, 'centipede_tail', scene);
                if (tail && tail instanceof CentipedeTail) {
                    // シーンに追加する。
                    scene.addCharacter(tail);
                    // 前の部分の体を尻尾の親ノードとして設定する。
                    tail.parent = this._target.parent.parent;
                    // 前の部分の体の次の部分に今回作成した体を設定する。
                    this._target.parent.parent.child = tail;
                }
                // 頭を検索する。
                let head = this._target.parent.parent;
                while (head.parent) {
                    head = head.parent;
                }
                // 頭のヒットポイントを減らす。
                head.hp = head.hp - 1;
                // 1個前の体を削除する。
                this._target.parent.hp = 0;
            }
            else {
                // 1個前が頭の場合は頭を破壊する。
                this._target.parent.hp = 0;
            }
        }
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
export default DeathCentipede;
