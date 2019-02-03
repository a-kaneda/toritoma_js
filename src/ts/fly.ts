import Enemy from './enemy';
import PlayingScene from './playingscene';
import EnemyShot from './enemyshot';
import Point from './point';
import Util from './util';
import EnemyParam from './enemyparam';
import EnemyFactory from './enemyfactory';
import Maggot from './maggot';
import FlyIF from './flyif';
import Explosion from './explosion';
import Character from './character';
import ScreenSize from './screensize';

// 弾発射状態
enum SHOT_STATE {
    WAIT = 0,       // 待機状態
    ENTRY1,         // 登場1
    ENTRY2,         // 登場2
    ENTRY3,         // 登場3
    NWAY,           // n-way弾発射
    ALL_DIRECTION,  // 全方位弾発射
    ALL_RANGE,      // 全画面弾発射
    STATE_COUNT,    // 状態の種類の数
};
// 状態遷移間隔
const STATE_INTERVAL = [999, 0, 300, 300, 900, 900, 900];
// ウジの数
const MAGGOT_COUNT = 16;
// ウジの生成位置
const MAGGOT_POSITION: Point[] = [
    {x: 0, y: -12},
    {x: 0, y: 0},
    {x: 0, y: 12},
    {x: 12, y: 0},
    {x: 12, y: 12},
    {x: 12, y: 24},
    {x: 12, y: -12},
    {x: 12, y: -24},
    {x: -12, y: 0},
    {x: -12, y: 12},
    {x: -12, y: 24},
    {x: -12, y: -12},
    {x: -12, y: -24},
    {x: -24, y: 0},
    {x: 24, y: 12},
    {x: 24, y: -12},
];
// 爆発の間隔
const EXPLOSION_INTERVAL = 20;
// 移動速度
const MOVE_SPEED = 1;
// 移動角速度
const MOVE_ANGLE_VELOCITY = 0.05;
// 移動位置x座標
const MOVE_POSITION_X = [106, 168];
// 移動待機時間
const MOVE_INTERVAL = 60;
// 移動位置到達判定範囲
const MOVE_ARRIVAL_RANGE = 4;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 45;
// n-way弾の弾数
const NWAY_SHOT_COUNT = 13;
// n-way弾の角度の間隔
const NWAY_SHOT_ANGLE = Math.PI / 16;
// n-way弾のスピード
const NWAY_SHOT_SPEED = 0.5;
// 矢印弾の待機時間
const ARROW_SHOT_WAIT = 150;
// 矢印弾の発射時間
const ARROW_SHOT_TIME = 60;
// 矢印弾の発射間隔
const ARROW_SHOT_INTERVAL = 60;
// 矢印弾の数
const ARROW_SHOT_COUNT = 5;
// 矢印弾のスピード
const ARROW_SHOT_SPEED = [0.5, 0.6, 0.7, 0.8, 0.9];
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 20;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 8;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.5;
// 全方位弾の回転スピード
const ALL_DIRECTION_ROTATION_SPEED = 0.1;
// 全画面弾の発射間隔
const ALL_RANGE_INTERVAL = 60;
// 全画面弾の弾の位置の間隔
const ALL_RANGE_POSITION_INTERVAL = 50;
// 全画面弾のスピード
const ALL_RANGE_SPEED = 0.4;
// 全画面弾の発射位置移動スピード
const ALL_RANGE_POSITION_SPEED = 1.5;
// 3-way弾発射間隔
const N3WAY_INTERVAL = 90;
// 3-way弾スピード
const N3WAY_SHOT_SPEED = 0.5;
// 縦方向の移動範囲の画面端からの距離
const MAX_MOVE_RANGE_FROM_EDGE = 48;

/**
 * 敵キャラ、ハエ。
 */
class Fly extends Enemy implements FlyIF {

    /** HP最大値 */
    private _maxHP: number;
    /** 弾発射状態。 */
    private _shotState: SHOT_STATE;
    /** 弾発射間隔。 */
    private _shotInterval: number[];
    /** 状態遷移間隔。 */
    private _stateInterval: number;
    /** 次の位置、x座標 */
    private _nextPositionX: number;
    /** 次の位置、y座標 */
    private _nextPositionY: number;
    /** 移動待機時間 */
    private _moveWait: number;
    /** ウジの数 */
    private _maggotCount: number;
    /** 爆発間隔 */
    private _explosionInterval: number;
    /** 全方位弾の発射方向 */
    private _allDirectionAngle: number;
    /** 全画面弾の発射位置 */
    private _allRangePosition: number;
    /** 移動スピード、x方向 */
    private _speedX: number;
    /** 移動スピード、y方向 */
    private _speedY: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x: number, y: number, param: EnemyParam, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'fly', param, scene);

        // 各変数を初期化する。
        this._shotInterval = [0, 0, 0];
        this._stateInterval = 0;
        this._explosionInterval = 0;
        this._nextPositionX = 0;
        this._nextPositionY = 0;
        this._allDirectionAngle = 0;
        this._allRangePosition = 0;
        this._moveWait = 0;
        this._speedX = 0;
        this._speedY = 0;
        
        // 初期弾発射状態は待機状態とする。
        this._shotState = SHOT_STATE.WAIT;

        // 画像を非表示にする。
        this._sprite.alpha = 0;

        // 初期状態では当たり判定処理が行われないようにキャラクター種別をエフェクトにしておく。
        this.type = Character.type.EFFECT;

        // ウジを作成する。
        let animationFrame = 0;
        for (let i = 0; i < MAGGOT_COUNT; i++) {

            // ウジを作成する。
            const maggot = EnemyFactory.create(x + MAGGOT_POSITION[i].x, y + MAGGOT_POSITION[i].y, 'maggot', scene);
            if (maggot && maggot instanceof Maggot) {

                // シーンに追加する。
                scene.addCharacter(maggot);

                // 動きがバラバラになるようにアニメーションフレームを設定する。
                maggot.setAnimationFrame(animationFrame);
                animationFrame += 3;
                animationFrame %= 30;

                // それぞれの動作を変える。
                maggot.shotType = i;

                // 親オブジェクトを設定する。
                maggot.parent = this;
            }
        }

        // ウジの数を初期化する。
        this._maggotCount = MAGGOT_COUNT;
        
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;

        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }

    /** ウジの数 */
    public get maggotCount(): number {
        return this._maggotCount
    }

    /** ウジの数 */
    public set maggotCount(value: number) {
        this._maggotCount = value;
    }

    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 初期状態:当たり判定をなくし、画像を非常時にして、ウジを生成する。
     * 待機状態:ウジがすべて倒されるまで待機する。(無処理)
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // 弾発射状態に応じて、弾を発射する。
        switch (this._shotState) {
        case SHOT_STATE.WAIT:   // 待機状態

            // 状態が状態変化間隔をリセットする。
            this._stateInterval = 0;

            // ウジの数が0になった場合は登場する。
            if (this._maggotCount <= 0) {
                this._shotState = SHOT_STATE.ENTRY1;
            }

            break;

        case SHOT_STATE.ENTRY1: // 登場1

            // 無処理
            break;

        case SHOT_STATE.ENTRY2: // 登場2

            // 爆発の間隔が経過している場合は爆発を発生させる。
            this._explosionInterval++;
            if (this._explosionInterval > EXPLOSION_INTERVAL) {

                // 爆発発生位置を決める
                const w = this._hitArea.width;
                const h = this._hitArea.height;
                const x = this._hitArea.x + Math.floor(Math.random() * (w * 2 + 1)) - w;
                const y = this._hitArea.y + Math.floor(Math.random() * (h * 2 + 1)) - h;
                
                // 爆発アニメーションを作成する。
                scene.addCharacter(new Explosion(x, y, scene));
                
                this._explosionInterval = 0;
            }
            break;

        case SHOT_STATE.ENTRY3: // 登場3

            // 画像を表示する。
            if (this._sprite.alpha === 0) {
                this._sprite.alpha = 1;

                // キャラクター種別を敵キャラクターに戻す。
                this.type = Character.type.ENEMY;

                // 登場時にBGMを変更する。。
                phina.asset.SoundManager.playMusic('lastboss');
            }

            // 次の移動位置を設定する。
            this._nextPositionX = MOVE_POSITION_X[0];
            this._nextPositionY = scene.playerPosition.y;
            
            // 画面端まで移動すると、回転して方向を変えるときに画面外に出てしまうため上下限を決める。
            if (this._nextPositionY < MAX_MOVE_RANGE_FROM_EDGE) {
                this._nextPositionY = MAX_MOVE_RANGE_FROM_EDGE;
            }
            else if (this._nextPositionY > ScreenSize.STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE) {
                this._nextPositionY = ScreenSize.STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE
            }
            else {
                // Do nothing.
            }

            break;

        case SHOT_STATE.NWAY:   // n-way弾発射

            // 定周期にn-way弾を発射する。
            this._shotInterval[0]++;
            if (this._shotInterval[0] > NWAY_SHOT_INTERVAL) {
                
                EnemyShot.fireNWay(this._hitArea,
                    Util.calcAngle(this._hitArea, scene.playerPosition),
                    NWAY_SHOT_COUNT,
                    NWAY_SHOT_ANGLE,
                    NWAY_SHOT_SPEED,
                    false,
                    scene);
                    
                this._shotInterval[0] = 0;
            }

            // 矢印弾グループの待機時間が経過している場合は矢印弾を発射し始める。
            this._shotInterval[1]++;
            if (this._shotInterval[1] > ARROW_SHOT_WAIT) {

                // 矢印弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[2]++;
                if (this._shotInterval[2] > ARROW_SHOT_INTERVAL) {

                    // 矢印弾を発射する
                    for (let i = 0; i < ARROW_SHOT_COUNT; i++) {

                        EnemyShot.fireNWay(this._hitArea,
                            Util.calcAngle(this._hitArea, scene.playerPosition),
                            5,
                            Math.PI / 32.0,
                            ARROW_SHOT_SPEED[i],
                            false,
                            scene);
                    }

                    this._shotInterval[2] = 0;
                }

                // 矢印弾の発射時間が経過している場合は矢印弾グループの発射間隔分待機する。
                if (this._shotInterval[1] > ARROW_SHOT_TIME + ARROW_SHOT_WAIT) {
                    this._shotInterval[1] = 0;
                }
            }

            break;

        case SHOT_STATE.ALL_DIRECTION:  // 全方位弾発射

            // 全方位弾の発射間隔が経過している場合は弾を発射する。
            this._shotInterval[0]++;
            if (this._shotInterval[0] > ALL_DIRECTION_INTERVAL) {

                EnemyShot.fireNWay(this._hitArea,
                    this._allDirectionAngle,
                    ALL_DIRECTION_COUNT,
                    ALL_DIRECTION_ANGLE,
                    ALL_DIRECTION_SPEED,
                    false,
                    scene);
                                    
                EnemyShot.fireNWay(this._hitArea,
                    -this._allDirectionAngle,
                    ALL_DIRECTION_COUNT,
                    ALL_DIRECTION_ANGLE,
                    ALL_DIRECTION_SPEED,
                    false,
                    scene);

                // 角度を進める。
                this._allDirectionAngle += ALL_DIRECTION_ROTATION_SPEED;

                this._shotInterval[0] = 0;
            }

            // 3-way弾発射間隔時間経過したら弾を発射する。
            this._shotInterval[1]++;
            if (this._shotInterval[1] > N3WAY_INTERVAL) {

                // 自機へ向けて弾を発射する。
                EnemyShot.fireNWay(this._hitArea,
                    Util.calcAngle(this._hitArea, scene.playerPosition),
                    3,
                    Math.PI / 16.0,
                    N3WAY_SHOT_SPEED,
                    false,
                    scene);
                
                this._shotInterval[1] = 0;
            }

            break;

        case SHOT_STATE.ALL_RANGE:  // 全画面弾発射

            // 全画面弾の発射間隔が経過している場合は弾を発射する。
            this._shotInterval[0]++;
            if (this._shotInterval[0] > ALL_DIRECTION_INTERVAL) {

                // 上方向から下方向への弾を発射する。
                for (let i = -this._allRangePosition; i < ScreenSize.STAGE_RECT.width; i += ALL_RANGE_POSITION_INTERVAL) {
                   
                    // 画面外の座標は飛ばす
                    if (i < 0) {
                        continue;
                    }
                   
                    EnemyShot.fireNWay({x: i, y: ScreenSize.STAGE_RECT.height - 18},
                        -Math.PI / 2,
                        1,
                        0,
                        ALL_RANGE_SPEED,
                        true,
                        scene);
                }

                // 右方向から左方向への弾を発射する
                for (let i = -this._allRangePosition; i < ScreenSize.STAGE_RECT.height; i += ALL_RANGE_POSITION_INTERVAL) {

                    // 画面外の座標は飛ばす
                    if (i < 0) {
                        continue;
                    }
                   
                    EnemyShot.fireNWay({x: ScreenSize.STAGE_RECT.width, y: i},
                        Math.PI,
                        1,
                        0,
                        ALL_RANGE_SPEED,
                        true,
                        scene);
                }

                // 発射位置の座標を移動する。
                this._allRangePosition += ALL_RANGE_POSITION_SPEED;
                
                this._shotInterval[0] = 0;
            }

            // 3-way弾発射間隔時間経過したら弾を発射する。
            this._shotInterval[1]++;
            if (this._shotInterval[1] > N3WAY_INTERVAL) {

                // 自機へ向けて弾を発射する。
                EnemyShot.fireNWay(this._hitArea,
                    Util.calcAngle(this._hitArea, scene.playerPosition),
                    3,
                    Math.PI / 16.0,
                    N3WAY_SHOT_SPEED,
                    false,
                    scene);
                
                this._shotInterval[1] = 0;
            }
            
            break;

        default:
            break;
        }

        // 登場以降は移動を行う。
        if (this._shotState > SHOT_STATE.ENTRY3) {

            // 待機時間が残っている場合
            if (this._moveWait > 0) {

                // 待機時間をカウントする。
                this._moveWait--;

                // 待機時間がなくなった場合は次の位置を設定する。
                if (this._moveWait <= 0) {

                    // x座標は2箇所を交互に設定する。
                    if (this._nextPositionX === MOVE_POSITION_X[0]) {
                        this._nextPositionX = MOVE_POSITION_X[1];
                    }
                    else {
                        this._nextPositionX = MOVE_POSITION_X[0];
                    }

                    // y座標は自機の位置を設定する。
                    this._nextPositionY = scene.playerPosition.y;

                    // 画面端まで移動すると、回転して方向を変えるときに画面外に出てしまうため上下限を決める。
                    if (this._nextPositionY < MAX_MOVE_RANGE_FROM_EDGE) {
                        this._nextPositionY = MAX_MOVE_RANGE_FROM_EDGE;
                    }
                    else if (this._nextPositionY > ScreenSize.STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE) {
                        this._nextPositionY = ScreenSize.STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE
                    }
                    else {
                        // Do nothing.
                    }
                }

                // 速度を0に設定する。
                this._speedX = 0;
                this._speedY = 0;
            }
            // 移動位置に到達している場合
            else if (Math.abs(this._hitArea.x - this._nextPositionX) < MOVE_ARRIVAL_RANGE &&
                     Math.abs(this._hitArea.y - this._nextPositionY) < MOVE_ARRIVAL_RANGE) {

                // 待機時間を設定する。
                this._moveWait = MOVE_INTERVAL;

                // 速度を0に設定する。
                this._speedX = 0;
                this._speedY = 0;
            }
            // 移動中の場合
            else {

                // 目的地の角度を求める。
                const destAngle = Util.calcAngle(this._hitArea, {x: this._nextPositionX, y: this._nextPositionY});

                // 現在の角度を求める。
                const currentAngle = this.normalizeAngle((-1 * this._sprite.rotation + 90) * Math.PI / 180);

                // 回転する方向を決める。
                const rotationDirection = this.calcRotationDirection(currentAngle, destAngle);

                // 回転する方向に角度を動かす。
                let nextAngle = currentAngle + rotationDirection * MOVE_ANGLE_VELOCITY;
                if (Math.abs(currentAngle - destAngle) < MOVE_ANGLE_VELOCITY) {
                    nextAngle = destAngle;
                }

                // 画像を回転する。
                this._sprite.rotation = -1 * nextAngle * 180 / Math.PI + 90;

                // 速度を向きから決定する。
                this._speedX = Math.cos(nextAngle) * MOVE_SPEED;
                this._speedY = -1 * Math.sin(nextAngle) * MOVE_SPEED;
            }
        }

        // 移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;

        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._shotState]) {

            // 次の状態へ進める。
            this._shotState++;

            // 状態が最大を超える場合は最初の状態へループする。
            if (this._shotState >= SHOT_STATE.STATE_COUNT) {

                // 登場時の次の状態とする。
                this._shotState = SHOT_STATE.ENTRY3 + 1;
            }

            // 各変数を初期化する。
            this._stateInterval = 0;
            this._shotInterval[0] = 0;
            this._shotInterval[1] = 0;
            this._shotInterval[2] = 0;
            this._explosionInterval = 0;
            this._allDirectionAngle = 0;
            this._allRangePosition = 0;
        }

        // ボスHPゲージの表示を更新する。
        if (this._hp > 0) {
            scene.bossLife = this._hp / this._maxHP;
        }
        else {
            scene.bossLife = 0;
        }
    }

    /**
     * 角度を+πから-πの間に正規化する。
     * @param angle 角度
     */
    private normalizeAngle(angle: number): number {

        // -πより小さい間はプラス方向に回転させる。
        while (angle < -Math.PI) {
            angle += 2 * Math.PI;
        }

        // +πより大きい間はマイナス方向に回転させる。
        while (angle > Math.PI) {
            angle -= 2 * Math.PI;
        }

        return angle;
    }

    /**
     * 現在の角度から見て、対象の角度が時計回りの側にあるか反時計回りの側にあるかを計算する。
     * @param srcAngle 現在の角度
     * @param destAngle 計算対象の角度
     * @return 1:反時計回り、-1:時計回り、0:直進
     */
    private calcRotationDirection(srcAngle: number, destAngle: number): number {

        // 現在の角度から見て入力角度が時計回りの側か反時計回りの側か調べる。
        // sin(目的角度 - 現在の角度) > 0の場合は反時計回り
        // sin(目的角度 - 現在の角度) < 0の場合は時計回り
        const destsin = Math.sin(destAngle - srcAngle);
        
        // 回転方向を設定する
        let rotdirect = 0;
        if (destsin > 0.0) {
            rotdirect = 1;
        }
        else if (destsin < 0.0) {
            rotdirect = -1;
        }
        else {

            // 上記判定でこのelseに入るのは入力角度が同じ向きか反対向きのときだけ。
            // 同じ向きか反対向きか調べる。
            // cos(入力角度 - 現在角度) < 0の場合は反対向き。
            // 反対向きの場合は反時計回りとする
            const destcos = Math.cos(destAngle - srcAngle);
            if (destcos < 0.0) {
                rotdirect = 1;
            }
            else {
                rotdirect = 0;
            }
        }
        
        return rotdirect;
    }
}

export default Fly;