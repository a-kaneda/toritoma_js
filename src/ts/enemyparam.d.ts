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
    death: string,
    /** x方向原点位置 */
    originX: number,
    /** y方向原点位置 */
    originY: number,
};

export default EnemyParam;