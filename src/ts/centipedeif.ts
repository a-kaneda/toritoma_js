import Point from './point';
import CharacterIF from './characterif';

export enum STATE {
    ENTRY = 0,          // 登場
    N5WAY_SHOT,         // 5-way弾発射
    HIGH_SPEED_SHOT,    // 1-way弾発射
    BODY_SHOT,          // 胴体部分からのショット
    COUNT,              // 状態の種類の数
}

/**
 * ムカデの頭、胴体、尻尾の共通インターフェース。
 */
interface CentipedeIF extends CharacterIF {

    /** ひとつ前の体 */
    parent: CentipedeIF | null;

    /** ひとつ後ろの体 */
    child: CentipedeIF | null;

    /** ヒットポイント */
    hp: number;

    /**
     * 一番古い移動履歴を取得する。
     * @return 一番古い移動履歴
     */
    getFirstMoveHistory(): Point;

    /**
     * 状態を設定する。
     * @param state 状態
     */
    setState(state: number): this;
}

export default CentipedeIF;