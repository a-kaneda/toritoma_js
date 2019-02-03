import CharacterIF from './characterif';
import PlayingScene from './playingscene';
import Explosion from './explosion';
import Maggot from './maggot';

/**
 * 雑魚敵破壊時処理。
 */
class DeathMaggot {

    /** 対象のキャラクター */
    private _target: CharacterIF;
    /** 破壊時に加算するスコア */
    private _score: number;
    /** 破壊時に加算するゲージ */
    private _gauge: number;

    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character: CharacterIF, score: number, gauge: number) {

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
    public update(scene: PlayingScene): void {

        // 対象のキャラクターがウジで、
        // ハエが設定されている場合のみ処理を行う。
        if (this._target instanceof Maggot && this._target.parent) {

            // ウジの数を一つ減らす。
            this._target.parent.maggotCount--;

            // ハエの位置を自分の位置に移動する。
            this._target.parent.rect.x = this._target.rect.x;
            this._target.parent.rect.y = this._target.rect.y;
        }

        // 爆発アニメーションを作成する。
        scene.addCharacter(new Explosion(this._target.rect.x, this._target.rect.y, scene));

        // スコアを加算する。
        scene.addScore(this._score);

        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);

        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}

export default DeathMaggot;