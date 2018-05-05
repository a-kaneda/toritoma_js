import Enemy from './enemy'
import PlayingScene from './playingscene'
import WalkingCharacter from './walkingcharacter'
import Util from './util.js'
import EnemyShot from './enemyshot.js'

// 状態
const STATE = {
    WAIT: 1,        // 待機状態
    LEFT_MOVE: 2,   // 左移動
};
// 移動スピード
const MOVE_SPEED = -0.5;
// ジャンプのスピード
const JUMP_SPEED = 2.0;
// 重力加速度
const GRAVITATION_ACCELERATION = 0.075;
// 左移動間隔
const LEFT_MOVE_INTERVAL = 60;
// 待機間隔
const WAIT_INTERVAL = 60;
// 弾発射間隔
const SHOT_INTERVAL = 30;
// 弾のスピード
const SHOT_SPEED = 0.75;

/**
 * 敵キャラクター、バッタ。
 */
class Grasshopper extends Enemy {

    /** 弾発射間隔。 */
    private _shotInterval: number;
    /** 状態。左移動、弾発射、右移動と遷移する。 */
    private _state: number;
    /** 次の状態に遷移するまでの間隔。 */
    private _stateChangeInterval: number;
    /** 逆さまかどうか。 */
    private _isUpsideDown: boolean;
    /** x方向の移動速度 */
    private _speedX: number;
    /** y方向の移動速度 */
    private _speedY: number;
    /** y方向の加速度 */
    private _accelerationY: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'grasshopper', scene);

        // 弾発射間隔を初期化する。
        this._shotInterval = 0;

        // 状態を初期化する。
        this._state = STATE.WAIT;

        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;

        // 速度を初期化する。
        this._speedX = 0;
        this._speedY = 0;
        this._accelerationY = 0;

        // 上下の障害物との距離から逆さまかどうかを判定する。
        const walkingCharacter = new WalkingCharacter();
        this._isUpsideDown = walkingCharacter.checkUpsideDown(this._hitArea, scene);

        // 逆さまな場合は画像の上下を反転する。
        if (this._isUpsideDown) {
            this._sprite.scaleY = -1;
        }
    }

    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 地面または天井を移動する。左方向へジャンプ、着地して弾発射を繰り返す。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // 移動前の位置を記憶しておく。
        const prevX = this._hitArea.x;
        const prevY = this._hitArea.y;

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;

        // 左移動中の場合
        switch (this._state) {
            case STATE.LEFT_MOVE:   // 左移動

                // 加速度に応じて速度を変更する。
                this._speedY += this._accelerationY;

                // 一定時間経過したら次の状態へ進める。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > LEFT_MOVE_INTERVAL) {

                    // 弾発射の状態へ遷移する。
                    this._state = STATE.WAIT;

                    // 停止する。
                    this._speedX = 0;

                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }

                break;

            case STATE.WAIT:    // 待機

                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_INTERVAL) {

                    // 左方向へのスピードを設定する。
                    this._speedX = MOVE_SPEED;

                    // ジャンプする方向へ加速する。
                    if (this._isUpsideDown) {
                        this._speedY = JUMP_SPEED;
                    }
                    else {
                        this._speedY = -JUMP_SPEED;
                    }

                    // 重力加速度を設定する。
                    if (this._isUpsideDown) {
                        this._accelerationY = -GRAVITATION_ACCELERATION;
                    }
                    else {
                        this._accelerationY = GRAVITATION_ACCELERATION;
                    }

                    // 左移動の状態へ遷移する。
                    this._state = STATE.LEFT_MOVE;

                    // ジャンプ時の画像に切替える。
                    this._animation.gotoAndPlay('grasshopper_jump');

                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }

                break;

            default:
                break;
        }

        // 弾発射間隔経過で自機に向かって1-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval > SHOT_INTERVAL) {

            // 自機へ向けて弾を発射する。
            EnemyShot.fireNWay(this._hitArea, 
                Util.calcAngle(this._hitArea, scene.playerPosition), 
                1, 
                0, 
                SHOT_SPEED, 
                false, 
                scene);
                                
            this._shotInterval = 0;
        }

        // 速度に応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;

        // 衝突しているブロックがある場合は移動する。
        this._hitArea.collideBlock(prevX, prevY, scene.getStagePosition(), scene.getBlockMap());

        // 落ちていく方向に移動しようとして、座標が変わっていない場合は障害物に着地したものとして停止する。
        if ((!this._isUpsideDown && this._speedY > 0 && this._hitArea.y <= prevY) ||
            (this._isUpsideDown && this._speedY < 0 && this._hitArea.y >= prevY)) {
            
            this._speedX = 0;
            this._speedY = 0;
            this._accelerationY = 0;

            // 着地時の画像に切替える。
            this._animation.gotoAndPlay('grasshopper');
        }
    }    
}

export default Grasshopper;