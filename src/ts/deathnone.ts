import CharacterIF from './characterif';
import PlayingScene from './playingscene';

/**
 * エフェクトなし敵キャラ破壊時処理。
 */
class DeathNormal {

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
     * エフェクトなしで自分を削除する。
     * @param scene シーン
     */
    public update(scene: PlayingScene): void {

        // スコアを加算する。
        scene.addScore(this._score);

        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);

        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}

export default DeathNormal;