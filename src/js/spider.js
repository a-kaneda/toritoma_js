import Enemy from './enemy';
import EnemyShot from './enemyshot';
import Util from './util';
// 状態
var STATE;
(function (STATE) {
    STATE[STATE["INIT"] = 0] = "INIT";
    STATE[STATE["NWAY_SHOT"] = 1] = "NWAY_SHOT";
    STATE[STATE["NET_SHOT"] = 2] = "NET_SHOT";
    STATE[STATE["MOVE_TO_CENTER"] = 3] = "MOVE_TO_CENTER";
    STATE[STATE["SIEGE"] = 4] = "SIEGE";
    STATE[STATE["COUNT"] = 5] = "COUNT"; // 状態の種類の数
})(STATE || (STATE = {}));
;
// 状態遷移間隔
const STATE_INTERVAL = [999, 900, 900, 90, 900];
// 移動位置
const MOVE_POSITION = [
    { x: 152, y: 48 },
    { x: 106, y: 96 },
    { x: 106, y: 48 },
    { x: 152, y: 96 },
];
// 蜘蛛の巣弾発射時の位置
const MOVE_POSITION_OF_SIEGE = { x: 129, y: 72 };
// 移動スピード
const MOVE_SPEED = 1.0;
// 移動位置変更の間隔
const MOVE_INTERVAL = 10;
// 3-way弾発射間隔
const N3_WAY_INTERVAL = 40;
// 3-way弾スピード
const N3_WAY_SHOT_SPEED = 0.75;
// 5-way弾発射間隔
const N5_WAY_INTERVAL = 40;
// 5-way弾スピード
const N5_WAY_SHOT_SPEED = 0.5;
// 蜘蛛の巣弾の各弾の配置位置
const NET_SHOT_POSITION = [
    { x: 0, y: 3 }, { x: 0, y: 10 }, { x: 0, y: 17 }, { x: 0, y: 24 },
    { x: 0, y: -3 }, { x: 0, y: -10 }, { x: 0, y: -17 }, { x: 0, y: -24 },
    { x: 6, y: 5 }, { x: 6, y: 21 }, { x: 6, y: -5 }, { x: 6, y: -21 },
    { x: -6, y: 5 }, { x: -6, y: 21 }, { x: -6, y: -5 }, { x: -6, y: -21 },
    { x: 11, y: 9 }, { x: 11, y: 17 }, { x: 11, y: -9 }, { x: 11, y: -17 },
    { x: -11, y: 9 }, { x: -11, y: 17 }, { x: -11, y: -9 }, { x: -11, y: -17 },
    { x: 16, y: 13 }, { x: 19, y: 7 }, { x: 16, y: -13 }, { x: 19, y: -7 },
    { x: -16, y: 13 }, { x: -19, y: 7 }, { x: -16, y: -13 }, { x: -19, y: -7 },
    { x: 21, y: 0 }, { x: -21, y: 0 }
];
// 蜘蛛の巣弾発射間隔
const NET_SHOT_INTERVAL = 90;
// 蜘蛛の巣弾のスピード
const NET_SHOT_SPEED = 0.5;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 30;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 12;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;
// 包囲弾の発射間隔
const SIEGE_SHOT_INTERVAL = 5;
// 包囲弾のスピード
const SIEGE_SHOT_SPEED = 1.25;
// 包囲弾の初期角度
const SIEGE_SHOT_START_ANGLE = Math.PI * 3.0 / 4.0;
// 包囲弾の最終角度
const SIEGE_SHOT_END_ANGLE = Math.PI / 8.0;
// 包囲弾の角度変更スピード
const SIEGE_SHOT_ANGLE_SPEED = 0.2;
// 包囲弾の1-way弾発射間隔
const N1_WAY_INTERVAL = 80;
// 包囲弾の1-way弾スピード
const N1_WAY_SHOT_SPEED = 0.4;
// 包囲弾内のグループ弾発射間隔
const GROUP_SHOT_INTERVAL = 40;
// 包囲弾内のグループ弾スピード
const GROUP_SHOT_SPEED = 1.0;
// 包囲弾内のグループ弾の弾数
const GROUP_SHOT_COUNT = 4;
// 包囲弾内のグループ弾の位置
const GROUP_SHOT_POSITION = [
    { x: 0, y: 4 }, { x: 0, y: -4 }, { x: 4, y: 0 }, { x: -4, y: 0 }
];
/**
 * 敵キャラクター、クモ。
 */
class Spider extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'spider', scene);
        // 状態を初期化する。
        this._state = STATE.INIT;
        // 移動先番号を初期化する。
        this._movePosIndex = 0;
        // 移動間隔を初期化する。
        this._moveInterval = 0;
        // 包囲弾の角度を初期化する。
        this._siegeAngle = 0;
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 攻撃パターン1:
     *     右上、左下、左上、右下、右上と移動しながら弾を撃つ。
     *     高速な3-way弾と低速な13-way弾を発射する。
     * 攻撃パターン2:
     *     右上、左下、左上、右下、右上と移動しながら弾を撃つ。
     *     全方位弾と蜘蛛の巣状の弾を発射する。
     * 攻撃パターン3:
     *     自機に向けて2-way弾を隙間なく発射。その間に円形のグループ弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        let nextPosition = { x: 0, y: 0 };
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // 最初は右上に移動する。
                nextPosition = MOVE_POSITION[0];
                // 移動位置に到達した場合は次の状態に遷移する。
                if (Math.abs(this._hitArea.x - nextPosition.x) < 0.01 &&
                    Math.abs(this._hitArea.y - nextPosition.y) < 0.01) {
                    this._state++;
                }
                break;
            case STATE.NWAY_SHOT:// n-way弾発射
                // 次の移動位置を決める。
                nextPosition = MOVE_POSITION[this._movePosIndex];
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > N5_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, N5_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > N3_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 16, N3_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            case STATE.NET_SHOT:// 蜘蛛の巣弾発射
                // 次の移動位置を決める。
                nextPosition = MOVE_POSITION[this._movePosIndex];
                // 蜘蛛の巣弾の発射間隔が経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > NET_SHOT_INTERVAL) {
                    // 蜘蛛の巣弾を発射する。
                    EnemyShot.fireGroupShot(this._hitArea, NET_SHOT_POSITION, NET_SHOT_POSITION.length, NET_SHOT_SPEED, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 全方位弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > ALL_DIRECTION_INTERVAL) {
                    // 全方位弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Math.PI, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            case STATE.MOVE_TO_CENTER:// 中央へ移動
                // 包囲弾発射時は中央で固定とする。
                nextPosition = MOVE_POSITION_OF_SIEGE;
                // 移動時間はリセットする。
                this._moveInterval = 0;
                break;
            case STATE.SIEGE:// 2-way弾による包囲弾発射
                // 包囲弾発射時は中央で固定とする。
                nextPosition = MOVE_POSITION_OF_SIEGE;
                // 移動時間はリセットする。
                this._moveInterval = 0;
                // 中央位置に到達したら弾を発射し始める。
                if (Math.abs(this._hitArea.x - nextPosition.x) < 0.01 &&
                    Math.abs(this._hitArea.y - nextPosition.y) < 0.01) {
                    // 包囲弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > SIEGE_SHOT_INTERVAL) {
                        // 包囲弾の角度を求める。
                        let angle = SIEGE_SHOT_START_ANGLE - this._siegeAngle * SIEGE_SHOT_ANGLE_SPEED;
                        // 最終角度に到達していれば最終角度を設定する。
                        if (angle <= SIEGE_SHOT_END_ANGLE) {
                            angle = SIEGE_SHOT_END_ANGLE;
                        }
                        // 弾を発射する。
                        EnemyShot.fireNWay(this._hitArea, Math.PI, 2, angle, SIEGE_SHOT_SPEED, false, scene);
                        // 包囲弾の角度を狭める。
                        this._siegeAngle++;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                    // 1グループ弾発射間隔時間経過したらグループ弾を発射する。
                    this._shotInterval[1]++;
                    if (this._shotInterval[1] > GROUP_SHOT_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        EnemyShot.fireGroupShot(this._hitArea, GROUP_SHOT_POSITION, GROUP_SHOT_COUNT, GROUP_SHOT_SPEED, scene);
                        // 弾発射間隔を初期化する。
                        this._shotInterval[1] = 0;
                    }
                    // 1-way弾発射間隔時間経過したら弾を発射する。
                    this._shotInterval[2]++;
                    if (this._shotInterval[2] > N1_WAY_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 1, 0, N1_WAY_SHOT_SPEED, false, scene);
                        // 弾発射間隔を初期化する。
                        this._shotInterval[2] = 0;
                    }
                }
                break;
            default:
                break;
        }
        //        console.log(`nextPosition={${nextPosition.x}, ${nextPosition.y}}, state=${this._state}`);
        // 移動先と現在位置が異なる場合は速度の設定を行う。
        if (Math.abs(this._hitArea.x - nextPosition.x) > 0.01 || Math.abs(this._hitArea.y - nextPosition.y) > 0.01) {
            // 移動先の角度を計算する。
            const moveAngle = Util.calcAngle(this._hitArea, nextPosition);
            // 移動スピードを設定する。
            let speedX = MOVE_SPEED * Math.cos(moveAngle);
            let speedY = MOVE_SPEED * Math.sin(moveAngle) * -1;
            // x方向の移動距離がスピードより小さい場合は通り過ぎないように移動先座標をセットする。
            if (Math.abs(this._hitArea.x - nextPosition.x) < speedX) {
                this._hitArea.x = nextPosition.x;
                speedX = 0;
            }
            // x方向の移動距離がスピードより小さい場合は通り過ぎないように移動先座標をセットする。
            if (Math.abs(this._hitArea.y - nextPosition.y) < speedY) {
                this._hitArea.y = nextPosition.y;
                speedY = 0;
            }
            // 移動する。
            this._hitArea.x += speedX;
            this._hitArea.y += speedY;
        }
        else {
            // 移動時間をカウントし、位置変更の間隔が経過した場合は移動位置を変更する。
            this._moveInterval++;
            if (this._moveInterval > MOVE_INTERVAL) {
                this._moveInterval = 0;
                this._movePosIndex = (this._movePosIndex + 1) % MOVE_POSITION.length;
            }
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._state]) {
            // 次の状態へ進める。
            this._state++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._state >= STATE.COUNT) {
                this._state = STATE.INIT + 1;
            }
            // 状態遷移間隔、弾発射間隔を初期化する。
            this._stateInterval = 0;
            for (let i = 0; i < this._shotInterval.length; i++) {
                this._shotInterval[i] = 0;
            }
            // 包囲弾の角度を初期化する。
            this._siegeAngle = 0;
        }
        // ボスHPゲージの表示を更新する。
        if (this._hp > 0) {
            scene.bossLife = this._hp / this._maxHP;
        }
        else {
            scene.bossLife = 0;
        }
    }
}
export default Spider;
