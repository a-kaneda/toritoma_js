import Enemy from './enemy';
import EnemyShot from './enemyshot';
import Util from './util';
import ScreenSize from './screensize';
import EnemyFactory from './enemyfactory';
// 状態
var STATE;
(function (STATE) {
    STATE[STATE["INIT"] = 0] = "INIT";
    STATE[STATE["FIVE_WAY_SHOT"] = 1] = "FIVE_WAY_SHOT";
    STATE[STATE["ALL_DIRECTION_SHOT"] = 2] = "ALL_DIRECTION_SHOT";
    STATE[STATE["ALL_RANGE_SHOT"] = 3] = "ALL_RANGE_SHOT";
    STATE[STATE["STATE_COUNT"] = 4] = "STATE_COUNT";
})(STATE || (STATE = {}));
;
// 状態遷移間隔
const STATE_INTERVAL = [340, 900, 900, 900];
// ハチを呼び出す間隔
const CALL_HORNET_INTERVAL = 120;
// ハチの登場位置x座標
const HORNET_X_POSITION = 192;
// ハチの登場位置y座標
const HORNET_Y_POSITION = [100, 72, 44];
// 5-way弾発射間隔
const FIVE_WAY_INTERVAL = 40;
// 5-way弾スピード
const FIVE_WAY_SHOT_SPEED = 0.5;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 60;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 24;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;
// 画面全体弾発射間隔
const ALL_RANGE_INTERVAL = 60;
// 画面全体弾の弾数
const ALL_RANGE_COUNT = 7;
// 画面全体弾のスピード
const ALL_RANGE_SPEED = 0.25;
// 画面全体弾の発射位置y座標
const ALL_RANGE_Y_POSITION = 126;
// 1-way弾発射間隔
const ONE_WAY_INTERVAL = 40;
// 1-way弾スピード
const ONE_WAY_SHOT_SPEED = 0.75;
/**
 * 敵キャラクター、ハチの巣。
 */
class Hoenycomb extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'honeycomb', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 状態を初期化する。
        this._state = STATE.INIT;
        // 全方位弾の発射角度を初期化する。
        this._allDirectionAngle = Math.PI;
        // ハチを呼び出す位置を初期化する。
        this._hornetPosition = 0;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 定周期でハチを登場させる。
     * 攻撃パターン1:5-way弾を自機に向けて発射する
     * 攻撃パターン2:全方位弾を角度を変えながら発射する
     * 攻撃パターン3:地面から上方向に画面全体に弾を発射する
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // スクロールに合わせて移動する。
                this._hitArea.x -= scene.scrollSpeed;
                break;
            case STATE.FIVE_WAY_SHOT:// 5-way弾発射
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > FIVE_WAY_INTERVAL) {
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, FIVE_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                break;
            case STATE.ALL_DIRECTION_SHOT:// 全方位弾発射
                // 全方位弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_DIRECTION_INTERVAL) {
                    EnemyShot.fireNWay(this._hitArea, this._allDirectionAngle, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    // 1回毎に発射する角度を変える。
                    this._allDirectionAngle += ALL_DIRECTION_ANGLE / 2;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                break;
            case STATE.ALL_RANGE_SHOT:// 地面からの画面全体の弾発射
                // 画面全体弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_RANGE_INTERVAL) {
                    // 左端の弾の座標を計算する。
                    const x = ScreenSize.STAGE_RECT.width / (ALL_RANGE_COUNT + 1);
                    // 各弾を発射する。
                    for (let i = 0; i < ALL_RANGE_COUNT; i++) {
                        EnemyShot.fireNWay({ x: x * (i + 1), y: ALL_RANGE_Y_POSITION }, Math.PI / 2, 1, 0, ALL_RANGE_SPEED, false, scene);
                    }
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 1-way弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > ONE_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 1, 0, ONE_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            default:
                break;
        }
        // 初期状態以外の場合は定周期にハチを呼ぶ。
        if (this._state !== STATE.INIT) {
            this._shotInterval[2]++;
            if (this._shotInterval[2] > CALL_HORNET_INTERVAL) {
                // ハチを呼ぶ。
                const hornet = EnemyFactory.create(HORNET_X_POSITION, HORNET_Y_POSITION[this._hornetPosition], 'hornet', scene);
                if (hornet) {
                    scene.addCharacter(hornet);
                }
                // ハチのd位置を呼ぶたびに切り替える。
                this._hornetPosition++;
                if (this._hornetPosition >= HORNET_Y_POSITION.length) {
                    this._hornetPosition = 0;
                }
                // ハチを呼び出す間隔を初期化する。
                this._shotInterval[2] = 0;
            }
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._state]) {
            // 登場時は無敵状態なので状態遷移時に防御力を0にする。
            this._defense = 0;
            // 次の状態へ進める。
            this._state++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._state >= STATE.STATE_COUNT) {
                this._state = STATE.INIT + 1;
            }
            // 弾発射間隔を初期化する。
            for (let i = 0; i < this._shotInterval.length; i++) {
                this._shotInterval[i] = 0;
            }
            // 状態遷移間隔を初期化する。
            this._stateInterval = 0;
            // 全方位弾の発射角度を初期化する。
            this._allDirectionAngle = Math.PI;
            // ハチを呼び出す位置を初期化する。
            this._hornetPosition = 0;
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
export default Hoenycomb;
