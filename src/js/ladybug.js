import Enemy from './enemy';
import EnemyShot from './enemyshot';
import Util from './util';
// 弾発射間隔
const SHOT_INTERVAL = 60;
// 移動スピード
const MOVE_SPEED = 0.65;
// 弾のスピード
const SHOT_SPEED = 0.75;
/**
 * 敵キャラ、テントウムシ。
 * まっすぐ進む。一定間隔で自機を狙う1-way弾発射。
 */
class Ladybug extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ladybug', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    action(scene) {
        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
export default Ladybug;
