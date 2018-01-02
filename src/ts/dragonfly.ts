/** @module dragonfly */

import EnemyShot from './enemyshot.js'
import Enemy from './enemy.js'
import PlayingScene from './playingscene';

// 移動スピード
const MOVE_SPEED = 0.5;
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

    /** 弾発射間隔 */
    private _shotInterval: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'dragonfly', scene);

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
    protected action(scene: PlayingScene): void {

        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;

        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            EnemyShot.fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}

export default Dragonfly;
