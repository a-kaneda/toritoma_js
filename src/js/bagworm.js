import Enemy from './enemy';
import EnemyShot from './enemyshot';
// 弾のスピード
const SHOT_SPEED = 0.5;
// 弾発射間隔
const SHOT_INTERVAL = 60;
/**
 * 敵キャラクター。ミノムシ。
 */
class Bagworm extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'bagworm', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * スクロールスピードに合わせて移動する。一定時間で全方位に12-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 弾発射間隔経過しているときは全方位に弾を発射する。
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 全方位に 12-way弾を発射する。
            EnemyShot.fireNWay(this._hitArea, Math.PI, 12, Math.PI / 6, SHOT_SPEED, true, scene);
            this._shotInterval = 0;
        }
    }
}
;
export default Bagworm;
