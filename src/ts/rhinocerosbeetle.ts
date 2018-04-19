import Enemy from './enemy'
import PlayingScene from './playingscene'
import EnemyShot from './enemyshot'
import Util from './util.js'

// 移動状態
enum MOVE_STATE {
    LEFT_MOVE,  // 左へ移動する。
    DOWN_MOVE,  // 下へ移動する。
    UP_MOVE,    // 上へ移動する。
}
// 弾発射状態
enum SHOT_STATE {
    NO_SHOT,        // 弾を撃たない
    LEFT_SHOT,      // 左方向へ弾発射
    N_WAY,          // 自機へ向けてn-way弾発射
    ALL_DIRECTION,  // 全方位に弾発射
};
// x座標最小位置
const X_POS_MIN = 150;
// y座標最小位置
const Y_POS_MIN = 40;
// y座標最大位置
const Y_POS_MAX = 105;
// 移動スピード
const MOVE_SPEED = 0.5;
// 状態遷移間隔
const STATE_CHANGE_INTERVAL = [0, 900, 900, 900];
// 左方向への弾の発射間隔
const LEFT_SHOT_INTERVAL = 60;
// 左方向への弾の上下の発射位置
const LEFT_SHOT_POSITION = 15;
// 左方向への弾のスピード
const LEFT_SHOT_SPEED = 0.75;
// 左方向への弾発射時の1-way弾の発射間隔
const LEFT_SHOT_1WAY_INTERVAL = 60;
// 左方向への弾発射時の1-way弾のスピード
const LEFT_SHOT_1WAY_SPEED = 0.5;
// n-way弾の塊の発射間隔
const NWAY_GROUP_SHOT_INTERVAL = 60;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 6;
// n-way弾の発射時間
const NWAY_SHOT_TIME = 30;
// n-way弾の弾数
const NWAY_COUNT = 3;
// n-way弾の角度の間隔
const NWAY_ANGLE = Math.PI / 8;
// n-way弾のスピード
const NWAY_SPEED = 1;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 30;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 12;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;

/**
 * 敵キャラ、カブトムシ。
 * 左に真っすぐ進み、画像がすべて表示できた部分で上下に移動する。
 * 攻撃パターン1:左方向にまっすぐ3-wayと自機を狙う1-way弾を発射する
 * 攻撃パターン2:定周期に一塊の5-way弾を発射する
 * 攻撃パターン3:全方位弾を発射する
 */
class RhinocerosBeetle extends Enemy {

    /** 弾発射間隔。 */
    private _shotInterval: number[];
    /** 状態遷移間隔。 */
    private _stateInterval: number;
    /** 移動方向状態。 */
    private _moveState: MOVE_STATE;
    /** 弾発射状態。 */
    private _shotState: SHOT_STATE;
    /** HP最大値 */
    private _maxHP: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'rhinocerosbeetle', scene);

        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0];

        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;

        // 初期移動状態は左移動とする。
        this._moveState = MOVE_STATE.LEFT_MOVE;

        // 初期弾発射状態は弾発射なしとする。
        this._shotState = SHOT_STATE.NO_SHOT;

        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;

        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左に真っすぐ進み、画像がすべて表示できた部分で上下に移動する。
     * 攻撃パターン1:左方向にまっすぐ3-wayと自機を狙う1-way弾を発射する
     * 攻撃パターン2:定周期に一塊の5-way弾を発射する
     * 攻撃パターン3:全方位弾を発射する
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // 移動状態に応じて、移動する。
        switch (this._moveState) {
            case MOVE_STATE.LEFT_MOVE:  // 左方向へ移動。

                // 左方向へ移動する。
                this._hitArea.x -= MOVE_SPEED;

                // x座標最小位置まで移動したら下方向移動する。
                if (this._hitArea.x < X_POS_MIN) {
                    this._moveState = MOVE_STATE.DOWN_MOVE;
                }

                break;

            case MOVE_STATE.DOWN_MOVE:  // 下方向へ移動。

                // 下方向へ移動する。
                this._hitArea.y += MOVE_SPEED;

                // y座標最大値まで移動したら上方向移動する。
                if (this._hitArea.y > Y_POS_MAX) {
                    this._moveState = MOVE_STATE.UP_MOVE;
                }

                break;

            case MOVE_STATE.UP_MOVE:    // 上方向へ移動。

                // 上方向へ移動する。
                this._hitArea.y -= MOVE_SPEED;

                // y座標最小値まで移動したら下方向移動する。
                if (this._hitArea.y < Y_POS_MIN) {
                    this._moveState = MOVE_STATE.DOWN_MOVE;
                }
                
                break;

            default:
                break;
        }

        // 弾発射状態に応じて弾を発射する。
        switch (this._shotState) {
            case SHOT_STATE.NO_SHOT:        // 弾を撃たない

                // 左方向への移動が終わったら、左方向へ弾発射を始める。
                if (this._moveState !== MOVE_STATE.LEFT_MOVE) {
                    this._shotState = SHOT_STATE.LEFT_SHOT;

                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;

                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }

                break;

            case SHOT_STATE.LEFT_SHOT:      // 左方向へ弾発射

                // 左方向への弾発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= LEFT_SHOT_INTERVAL) {

                    // 3箇所から同時に弾を発射する
                    EnemyShot.fireNWay(this._hitArea, 
                        Math.PI, 
                        1, 
                        0, 
                        LEFT_SHOT_SPEED, 
                        false, 
                        scene);
                    EnemyShot.fireNWay(
                        {
                            x: this._hitArea.x,
                            y: this._hitArea.y - LEFT_SHOT_POSITION,
                        }, 
                        Math.PI, 
                        1, 
                        0, 
                        LEFT_SHOT_SPEED, 
                        false, 
                        scene);
                    EnemyShot.fireNWay(
                        {
                            x: this._hitArea.x,
                            y: this._hitArea.y + LEFT_SHOT_POSITION,
                        }, 
                        Math.PI, 
                        1, 
                        0, 
                        LEFT_SHOT_SPEED, 
                        false, 
                        scene);

                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }

                // 1-way弾の弾発射間隔が経過している場合は弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] >= LEFT_SHOT_1WAY_INTERVAL) {
                    EnemyShot.fireNWay(this._hitArea, 
                        Util.calcAngle(this._hitArea, scene.playerPosition), 
                        1, 
                        0, 
                        LEFT_SHOT_1WAY_SPEED, 
                        false, 
                        scene);
                    this._shotInterval[1] = 0;
                }

                // 状態遷移間隔が経過している場合は、自機へ向けてn-way弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.N_WAY;

                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;

                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }

                break;

            case SHOT_STATE.N_WAY:          // 自機へ向けてn-way弾発射

                // n-way弾グループの発射間隔が経過している場合はn-way弾を発射し始める。
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= NWAY_GROUP_SHOT_INTERVAL) {

                    // n-way弾の発射間隔が経過している場合は弾を発射する。
                    this._shotInterval[1]++;
                    if (this._shotInterval[1] >= NWAY_SHOT_INTERVAL) {
                        EnemyShot.fireNWay(this._hitArea, 
                            Util.calcAngle(this._hitArea, scene.playerPosition), 
                            NWAY_COUNT, 
                            NWAY_ANGLE, 
                            NWAY_SPEED, 
                            false, 
                            scene);
    
                        this._shotInterval[1] = 0;
                    }

                    // n-way弾発射時間が経過している場合は発射間隔を初期化して、次のグループ弾発射間隔まで待機する。
                    if (this._shotInterval[0] >= NWAY_GROUP_SHOT_INTERVAL + NWAY_SHOT_TIME) {
                        this._shotInterval[0] = 0;
                        this._shotInterval[1] = 0;
                    }
                }

                // 状態遷移間隔が経過している場合は、全方位に弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.ALL_DIRECTION;

                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;

                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }

                break;

            case SHOT_STATE.ALL_DIRECTION:  // 全方位に弾発射

                // 全方位弾の発射間隔が経過している場合は弾を発射する
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= ALL_DIRECTION_INTERVAL) {
                    EnemyShot.fireNWay(this._hitArea, 
                        Math.PI, 
                        ALL_DIRECTION_COUNT, 
                        ALL_DIRECTION_ANGLE, 
                        ALL_DIRECTION_SPEED, 
                        false, 
                        scene);

                    this._shotInterval[0] = 0;                
                }

                // 状態遷移間隔が経過している場合は、左方向へ弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.LEFT_SHOT;

                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;

                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }

                break;

            default:
                break;
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

export default RhinocerosBeetle;