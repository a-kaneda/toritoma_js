import Enemy from './enemy';
import EnemyShot from './enemyshot';
// 状態
var STATE;
(function (STATE) {
    STATE[STATE["UP_MOVE"] = 0] = "UP_MOVE";
    STATE[STATE["DOWN_MOVE"] = 1] = "DOWN_MOVE";
})(STATE || (STATE = {}));
// 状態変化間隔
const STATE_CHANGE_INTERVAL = 50;
// 弾発射間隔
const SHOT_INTERVAL = 60;
// x方向の移動スピード
const MOVE_SPEED_X = 0.5;
// y方向の移動スピード
const MOVE_SPEED_Y = 0.75;
// 弾のスピード
const SHOT_SPEED = 0.75;
/**
 * 敵キャラ、チョウ。
 * 上下に斜めに移動しながら左へ進む。
 * 定周期で左方向へ3-way弾を発射する。
 */
class Butterfly extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'butterfly', scene);
        // 初期状態は上方向への移動とする。
        this._state = STATE.UP_MOVE;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
    }
    /**
     * 更新処理。
     * 上下に斜めに移動しながら左へ進む。
     * 定周期で左方向へ3-way弾を発射する。
     * @param scene シーン
     */
    update(scene) {
        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this._hp <= 0) {
            this.death(scene);
            return;
        }
        // 状態変化間隔を経過している場合は上下移動の状態を変化させる。
        this._stateChangeInterval++;
        if (this._stateChangeInterval >= STATE_CHANGE_INTERVAL) {
            this._stateChangeInterval = 0;
            if (this._state === STATE.UP_MOVE) {
                this._state = STATE.DOWN_MOVE;
            }
            else {
                this._state = STATE.UP_MOVE;
            }
        }
        // 左方向に移動する。
        this._hitArea.x -= MOVE_SPEED_X;
        // 状態に応じて上下方向に移動する。
        if (this._state === STATE.UP_MOVE) {
            this._hitArea.y -= MOVE_SPEED_Y;
        }
        else {
            this._hitArea.y += MOVE_SPEED_Y;
        }
        // 弾発射間隔経過しているときは左方向へ3-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            EnemyShot.fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, 3, Math.PI / 8.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
}
export default Butterfly;
