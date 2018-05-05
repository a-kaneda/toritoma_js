import Util from './util.js'
import EnemyShot from './enemyshot.js'
import Enemy from './enemy.js'
import PlayingScene from './playingscene'
import WalkingCharacter from './walkingcharacter'

// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動スピード
const MOVE_SPEED = 0.5;
// 移動するフレーム数
const MOVE_FRAME = 120;
// 弾発射間隔
const SHOT_INTERVAL = 30;
// 弾発射時間
const SHOT_FRAME = 120;
// 状態
const STATE = {
    LEFT_MOVE: 1,   // 左移動
    RIGHT_MOVE: 2,  // 右移動
    FIRE: 3,        // 弾発射
};

/**
 * 敵キャラクター、アリ。
 * 天井または地面に張り付いて歩く。
 *
 * 左移動:左方向への移動。一定時間経過後に弾発射に遷移する。
 * 
 * 弾発射:停止して弾の発射。自機に向かって1-wayを一定数発射する。
 * 一定時間経過後に右移動に遷移する。
 * 
 * 右移動:地面右方向への移動。一定時間経過後に弾発射に遷移する。
 */
class Ant extends Enemy {

    /** 弾発射間隔。 */
    private _shotInterval: number;
    /** 状態。左移動、弾発射、右移動と遷移する。 */
    private _state: number;
    /** 次の状態に遷移するまでの間隔。 */
    private _stateChangeInterval: number;
    /** 逆さまかどうか。 */
    private _isUpsideDown: boolean;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ant', scene);

        // 弾発射間隔を初期化する。
        this._shotInterval = 0;

        // 初期状態は左移動とする。
        this._state = STATE.LEFT_MOVE;

        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;

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
     * 天井または地面に張り付いて歩く。
     *
     * 初期状態:上下どちらに張り付くか判定する。距離の近い方に張り付く。
     * 天井に張り付く場合は画像を上下反転する。
     * 
     * 左移動:左方向への移動。一定時間経過後に弾発射に遷移する。
     * 
     * 弾発射:停止して弾の発射。自機に向かって1-wayを一定数発射する。
     * 一定時間経過後に右移動に遷移する。
     * 
     * 右移動:地面右方向への移動。一定時間経過後に弾発射に遷移する。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;

        // 状態によって処理を分岐する
        switch (this._state) {
            case STATE.LEFT_MOVE:   // 左移動

                // 左へ移動する。
                this._hitArea.x -= MOVE_SPEED;

                // 左右反転はなしにする。
                this._sprite.scaleX = 1;

                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= MOVE_FRAME) {

                    // 弾発射に遷移する。
                    this._state = STATE.FIRE;

                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                    
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }

                break;

            case STATE.RIGHT_MOVE:  // 右移動

                // 右へ移動する。
                this._hitArea.x += MOVE_SPEED;

                // 左右反転はありにする。
                this._sprite.scaleX = -1;

                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= MOVE_FRAME) {

                    // 弾発射に遷移する。
                    this._state = STATE.FIRE;

                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                    
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }

                break;

            case STATE.FIRE:        // 弾発射

                // 自分より右側に自機がいれば左右反転する。
                if (this._hitArea.x < scene.playerPosition.x) {
                    this._sprite.scaleX = -1;
                }
                else {
                    this._sprite.scaleX = 1;
                }

                // 状態遷移間隔が経過したら右移動状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= SHOT_FRAME ) {

                    // 右移動に遷移する。
                    this._state = STATE.RIGHT_MOVE;

                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                }

                // 弾発射間隔が経過したら自機へ向けて1-way弾を発射する。
                this._shotInterval++;
                if (this._shotInterval >= SHOT_INTERVAL) {

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

                break;

            default:
                break;
        }

        // 障害物との衝突判定を行う。
        const walkingCharacter = new WalkingCharacter();
        walkingCharacter.checkBlockHit(this._hitArea, this._isUpsideDown, scene);

        // 移動後の位置にキャラクターを移動する。
        this._hitArea.x = walkingCharacter.movePosition.x;
        this._hitArea.y = walkingCharacter.movePosition.y;
    }
}

export default Ant;
