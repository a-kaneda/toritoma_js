import Enemy from './enemy';
import EnemyShot from './enemyshot';
// 状態
var STATE;
(function (STATE) {
    STATE[STATE["MOVE_IN"] = 0] = "MOVE_IN";
    STATE[STATE["FIRE"] = 1] = "FIRE";
    STATE[STATE["MOVE_OUT"] = 2] = "MOVE_OUT"; // 退場
})(STATE || (STATE = {}));
;
// 弾の数
const SHOT_COUNT = 5;
// 弾のスピード
const SHOT_SPEED = [0.75, 0.85, 0.95, 1.05, 1.15];
// 登場時のx方向の移動スピード
const MOVE_IN_SPEED_X = -1.0;
// 退場時のx方向の移動スピード
const MOVE_OUT_SPEED_X = -1.3;
// 退場時のy方向の移動スピード
const MOVE_OUT_SPEED_Y = -0.25;
// 登場時移動フレーム数
const MOVE_IN_INTERVAL = 30;
// 弾発射までの待機フレーム数
const WAIT_FOR_FIRE_INTERVAL = 6;
// 退場までの待機フレーム数
const WAIT_FOR_MOVE_OUT_INTERVAL = 12;
/**
 * 敵キャラクター、ハチ。
 */
class Hornet extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'hornet', param, scene);
        // 初期状態は左移動とする。
        this._state = STATE.MOVE_IN;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 登場時のx方向の移動速度は固定とする。
        this._speedX = MOVE_IN_SPEED_X;
        // 登場時のy方向の移動速度は自機の位置に到達できるように設定する。
        this._speedY = (scene.playerPosition.y - this._hitArea.y) / MOVE_IN_INTERVAL;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 画面上半分から登場するときは左下に向かって一定時間進み、一時停止して弾を発射、その後左上に向かって飛んで行く。
     * 画面下半分から登城するときは左上に向かって一定時間進み、あとの処理は同じ。
     * 弾は5種類のスピードの弾を左方向に発射する。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.MOVE_IN:// 登場
                // 登場移動時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > MOVE_IN_INTERVAL) {
                    // 停止する。
                    this._speedX = 0;
                    this._speedY = 0;
                    // 弾発射の状態へ遷移する。
                    this._state = STATE.FIRE;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.FIRE:// 弾発射
                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_FOR_FIRE_INTERVAL) {
                    // 左へ5種類の弾を発射する。
                    for (let i = 0; i < SHOT_COUNT; i++) {
                        EnemyShot.fireNWay(this._hitArea, Math.PI, 3, Math.PI / 32, SHOT_SPEED[i], false, scene);
                    }
                    // 退場の状態へ遷移する。
                    this._state = STATE.MOVE_OUT;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.MOVE_OUT:// 退場
                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_FOR_MOVE_OUT_INTERVAL) {
                    // 左上へ移動する。
                    this._speedX = MOVE_OUT_SPEED_X;
                    this._speedY = MOVE_OUT_SPEED_Y;
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
}
export default Hornet;
