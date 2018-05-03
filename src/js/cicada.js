import Enemy from './enemy';
import Util from './util.js';
import EnemyShot from './enemyshot';
// 状態
const STATE = {
    INIT: 1,
    MOVE: 2,
    STOP: 3,
};
// 移動スピード
const MOVE_SPEED = 0.75;
// 移動間隔
const MOVE_INTERVAL = 60;
// 弾発射間隔
const SHOT_INTERVAL = 20;
// 待機間隔
const WAIT_INTERVAL = 70;
// 弾のスピード
const SHOT_SPEED = 0.5;
/**
 * 敵キャラクター。セミ。
 */
class Cicada extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'cicada', scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 初期状態は停止とする。
        this._state = STATE.STOP;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 移動速度を初期化する。
        this._speedX = 0;
        this._speedY = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 自機に向かって一定時間飛ぶ。その後待機して自機に向かって3-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // 移動速度を計算する。
                this._calcMoveSpeed(scene);
                // 移動中アニメーションを設定する。
                this._animation.gotoAndPlay('cicada_fly');
                // 移動の状態へ遷移する。
                this._state = STATE.MOVE;
                break;
            case STATE.MOVE:// 移動状態
                // 移動間隔経過したら次の状態へ進める。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > MOVE_INTERVAL) {
                    // 停止状態へ遷移する。
                    this._state = STATE.STOP;
                    // 待機中アニメーションを設定する。
                    this._animation.gotoAndPlay('cicada');
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.STOP:// 停止状態
                // スクロールに合わせて移動する。
                this._speedX = -scene.scrollSpeed;
                this._speedY = 0;
                // 弾発射間隔経過で自機に向かって3-way弾を発射する。
                this._shotInterval++;
                if (this._shotInterval > SHOT_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 8, SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }
                // 待機間隔経過で初期状態に戻る。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_INTERVAL) {
                    // 初期状態へ遷移する。
                    this._state = STATE.INIT;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            default:
                break;
        }
        // 速度に応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
    }
    /**
     * 自機の位置へ移動するように移動速度を計算する。
     * @param scene シーン
     */
    _calcMoveSpeed(scene) {
        // 自機との角度を計算する。
        const angle = Util.calcAngle(this._hitArea, scene.playerPosition);
        // 縦横の速度を決定する。
        this._speedX = MOVE_SPEED * Math.cos(angle);
        this._speedY = -MOVE_SPEED * Math.sin(angle);
    }
}
export default Cicada;
