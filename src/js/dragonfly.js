/** @module dragonfly */
import EnemyShot from './enemyshot.js';
import Enemy from './enemy.js';
// 移動スピード
const MOVE_SPEED = -0.5;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 弾発射間隔（1周目）
const SHOT_INTERVAL = 120;
/**
 * 敵キャラクター、トンボ。
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
class Dragonfly extends Enemy {
    /**
     * コンストラクタ
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'dragonfly', scene);
        /**
         * 弾発射間隔
         * @type {number}
         */
        this._shotInterval = 0;
    }
    /**
     * 更新処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
        // 左へ移動する。
        this._hitArea.x += MOVE_SPEED;
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this._hp <= 0) {
            this.death(scene);
            return;
        }
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 敵弾が無効化されていない場合は敵弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new EnemyShot(this._hitArea.x, this._hitArea.y, Math.PI, SHOT_SPEED, scene));
            }
            this._shotInterval = 0;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
}
export default Dragonfly;
