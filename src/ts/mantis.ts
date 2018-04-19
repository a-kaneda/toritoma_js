import Enemy from './enemy'
import PlayingScene from './playingscene'
import ScreenSize from './screensize'
import EnemyShot from './enemyshot'
import Point from './point'
import Util from './util'

// 弾発射状態
enum SHOT_STATE {
    NO_SHOT,        // 弾を撃たない
    ARC_SHOT,       // 弧形弾発射
    BURST_SHOT,     // 破裂弾発射
    NWAY_SHOT,      // n-way弾発射
    STATE_COUNT,    // 状態の種類の数
};
// Y座標位置、地面の高さ + キャラクター高さ / 2で地面の上に乗っているようにする。
const POS_Y = ScreenSize.STAGE_RECT.height - 16 - 64 / 2;
// 状態遷移間隔
const STATE_INTERVAL = [340, 900, 900, 900];
// 手の位置、x座標
const HAND_POSITION_X = -24;
// 手の位置、y座標
const HAND_POSITION_Y = -24;
// 定周期弾の発射間隔
const CYCLE_SHOT_INTERVAL = 60;
// 定周期弾の弾数
const CYCLE_SHOT_COUNT = 3;
// 定周期弾の角度の間隔
const CYCLE_SHOT_ANGLE = Math.PI / 8;
// 定周期弾のスピード
const CYCLE_SHOT_SPEED = 1.0;
// 弧形段の弾数
const ARC_SHOT_COUNT = 9;
// 弧形弾の配置位置
const ARC_SHOT_POSITION: Point[] = [
    {x: 0, y: 0},
    {x: 3, y: 6},
    {x: 7, y: 12},
    {x: 12, y: 17},
    {x: 18, y: 21},
    {x: -1, y: -7},
    {x: 0, y: -14},
    {x: 2, y: -21},
    {x: 6, y: -27}
];
// 弧形弾の発射待機時間
const ARC_SHOT_WAIT_INTERVAL = 90;
// 弧形弾の発射間隔
const ARC_SHOT_INTERVAL = 60;
// 弧形弾のスピード
const ARC_SHOT_SPEED = 0.75;
// 破裂弾の発射待機時間
const BURST_SHOT_WAIT_INTERVAL = 90;
// 破裂弾の発射間隔
const BURST_SHOT_INTERVAL = 60;
// 破裂弾の破裂前のスピード
const BURST_SHOT_BEFORE_SPEED = 0.75;
// 破裂弾の破裂後のスピード
const BURST_SHOT_AFTER_SPEED = 1.25;
// 破裂弾の破裂までの間隔
const BURST_SHOT_BURST_INTERVAL = 80;
// 破裂弾の弾数
const BURST_SHOT_COUNT = 12;
// 破裂弾の各弾の間隔
const BURST_SHOT_ANGLE_INTERVAL = Math.PI / 6.0;
// n-way弾の待機間隔
const NWAY_SHOT_WAIT_INTERVAL = 90;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 20;
// n-way弾のスピード
const NWAY_SHOT_SPEED = 0.75;
// n-way弾の弾数
const NWAY_COUNT = [9, 10];
// n-way弾の角度の間隔
const NWAY_ANGLE_INTERVAL = Math.PI / 10.0;
// 画像名称
const SPRITE_NAME = ["mantis", "mantis_uphand_1", "mantis_uphand_2"];

/**
 * 敵キャラ、カマキリ。
 */
class Mantis extends Enemy {

    /** HP最大値 */
    private _maxHP: number;
    /** 弾発射状態。 */
    private _shotState: SHOT_STATE;
    /** 上げている腕の数 */
    private _upArmNum: number;
    /** 弾発射間隔。 */
    private _shotInterval: number[];
    /** 状態遷移間隔。 */
    private _stateInterval: number;
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'mantis', scene);

        // y座標を設定する。
        this._hitArea.y = POS_Y;

        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0];

        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        
        // 初期弾発射状態は弾発射なしとする。
        this._shotState = SHOT_STATE.NO_SHOT;

        // 最初は腕を上げていない状態とする。
        this._upArmNum = 0;

        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;

        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }

    /**
     * 敵キャラクター種別ごとの固有の処理。
     * スクロールに応じて移動する。攻撃パターンの状態にかかわらず、常に3-way弾を発射する。
     * 攻撃の前に鎌を振り上げ、攻撃と同時に鎌を片方ずつ下ろすアニメーションを行う。
     * 攻撃パターン1:弧の形に並んだ弾を自機に向けて発射する。
     * 攻撃パターン2:塊弾を自機に向けて発射する。自機の位置に到達すると塊弾は12-way弾として弾ける。
     * 攻撃パターン3:9-way弾と10-way弾を短い間隔で連続で発射する。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;

        // 弾発射状態に応じて、弾を発射する。
        switch (this._shotState) {
            case SHOT_STATE.ARC_SHOT:   // 弧形弾発射

                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {

                    // 弧形弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > ARC_SHOT_WAIT_INTERVAL) {

                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                // 腕を振り上げている場合
                else {
                    
                    // 弧形弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > ARC_SHOT_INTERVAL) {

                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;

                        // 弧形弾を発射する。
                        EnemyShot.fireGroupShot(this._hitArea,
                            ARC_SHOT_POSITION, 
                            ARC_SHOT_COUNT, 
                            ARC_SHOT_SPEED, 
                            scene);
                    }
                }

                break;

            case SHOT_STATE.BURST_SHOT: // 破裂弾発射

                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {

                    // 弧形弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > BURST_SHOT_WAIT_INTERVAL) {

                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                // 腕を振り上げている場合
                else {
                    
                    // 弧形弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > BURST_SHOT_INTERVAL) {

                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;

                        // 破裂弾を発射する。
                        const position: Point = {
                            x: this._hitArea.x + HAND_POSITION_X,
                            y: this._hitArea.y + HAND_POSITION_Y,
                        };
                        EnemyShot.fireBurstShot(position,
                            BURST_SHOT_COUNT, 
                            BURST_SHOT_ANGLE_INTERVAL,
                            BURST_SHOT_BEFORE_SPEED, 
                            BURST_SHOT_BURST_INTERVAL,
                            BURST_SHOT_AFTER_SPEED,
                            scene);
                    }
                }
                
                break;

            case SHOT_STATE.NWAY_SHOT:  // n-way弾発射

                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {

                    // n-way弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > NWAY_SHOT_WAIT_INTERVAL) {

                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                // 腕を振り上げている場合
                else {
                    
                    // n-way弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > NWAY_SHOT_INTERVAL) {

                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;

                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;

                        // 破裂弾を発射する。
                        const position: Point = {
                            x: this._hitArea.x + HAND_POSITION_X,
                            y: this._hitArea.y + HAND_POSITION_Y,
                        };
                        EnemyShot.fireNWay(position, 
                            Util.calcAngle(this._hitArea, scene.playerPosition), 
                            NWAY_COUNT[1 - this._upArmNum], 
                            NWAY_ANGLE_INTERVAL, 
                            NWAY_SHOT_SPEED, 
                            false, 
                            scene);
                    }
                }

                break;

            default:
                break;
        }

        // 初期状態以外の場合は定周期に3-way弾を発射する。
        if (this._shotState !== SHOT_STATE.NO_SHOT) {

            this._shotInterval[1]++;
            if (this._shotInterval[1] > CYCLE_SHOT_INTERVAL) {
                EnemyShot.fireNWay(this._hitArea,
                    Util.calcAngle(this._hitArea, scene.playerPosition),
                    CYCLE_SHOT_COUNT,
                    CYCLE_SHOT_ANGLE,
                    CYCLE_SHOT_SPEED,
                    false,
                    scene);

                this._shotInterval[1] = 0;
            }
        }

        // 振り上げている腕の数に応じてグラフィックを変更する。
        this._animation.gotoAndPlay(SPRITE_NAME[this._upArmNum]);

        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._shotState]) {

            // 登場時は無敵状態なので状態遷移時に防御力を0にする。
            this._defense = 0;

            // 次の状態へ進める。
            this._shotState++;

            // 状態が最大を超える場合は最初の状態へループする。
            if (this._shotState >= SHOT_STATE.STATE_COUNT) {

                // 登場時の次の状態とする。
                this._shotState = 1;
            }

            // 状態遷移間隔、弾発射間隔を初期化する。
            this._stateInterval = 0;
            this._shotInterval[0] = 0;
            this._shotInterval[1] = 0;
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

export default Mantis;