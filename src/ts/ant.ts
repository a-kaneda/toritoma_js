import Util from './util.js'
import EnemyShot from './enemyshot.js'
import Enemy from './enemy.js'
import PlayingScene from './playingscene'
import ScreenSize from './screensize'

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
        this._isUpsideDown = this._checkUpsideDown(scene);

        // 逆さまな場合は画像の上下を反転する。
        if (this._isUpsideDown) {
            this._sprite.scaleY = -1;
        }
    }
    
    /**
     * 更新処理。
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
    public update(scene: PlayingScene): void {

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this._hp <= 0) {

            this.death(scene);

            return;
        }

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

                // 弾発射間隔が経過したら弾を発射する。
                this._shotInterval++;
                if (this._shotInterval >= SHOT_INTERVAL) {

                    // 敵弾が無効化されていない場合は敵弾を生成する。
                    if (!scene.isDisableEnemyShot()) {

                        // 自機へ向けて弾を発射する。
                        scene.addCharacter(new EnemyShot(this._hitArea.x,
                                                         this._hitArea.y,
                                                         Util.calcAngle(this._hitArea, scene.playerPosition),
                                                         SHOT_SPEED,
                                                         scene));
                    }
                    this._shotInterval = 0;
                }

                break;

            default:
                break;
        }

        // 障害物との衝突判定を行う。
        this._checkBlockHit(scene);

        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));

        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > ScreenSize.STAGE_RECT.width + this._hitArea.width * 2) {

            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }

    /**
     * 逆さま判定。上下の障害物の距離を調べ、上の障害物の方が近い場合は上下反転しているものとする。
     * @param scene シーン
     * @return 逆さまかどうか
     */
    private _checkUpsideDown(scene: PlayingScene): boolean {

        // 上方向の障害物を検索する。
        const upsideBlock = this._hitArea.getBlockY(true, this._hitArea.x, scene.getStagePosition(), scene.getBlockMap());

        // 下方向の障害物を検索する。
        const downsideBlock = this._hitArea.getBlockY(false, this._hitArea.x, scene.getStagePosition(), scene.getBlockMap());

        // 上方向の障害物の方が近い場合は逆さまと判断する。
        if (this._hitArea.y - (upsideBlock.y + upsideBlock.height / 2) < (downsideBlock.y - downsideBlock.height / 2) - this._hitArea.y) {

            return true;
        }
        else {

            return false;
        }
    }

    /**
     * 障害物との衝突を処理する。
     * 通常は自分の足元の一番上の障害物の位置にy座標を合わせ、逆さまの場合は一番下の障害物に合わせる。
     * ブロック半分までの段差は超えられるものとし、それ以上の段差がある場合は手前の障害物の上で停止する。
     * @param scene シーン
     */
    private _checkBlockHit(scene: PlayingScene): void {

        // 移動可能な段差
        const MOVABLE_STEP = 8;

        // 左側の足元の障害物を検索する。
        const leftBlock = this._hitArea.getBlockY(this._isUpsideDown,
                                                 this._hitArea.x - this._hitArea.width / 2,
                                                 scene.getStagePosition(),
                                                 scene.getBlockMap());

        // 右側の足元の障害物を検索する。
        const rightBlock = this._hitArea.getBlockY(this._isUpsideDown,
                                                  this._hitArea.x + this._hitArea.width / 2,
                                                  scene.getStagePosition(),
                                                  scene.getBlockMap());

        // 逆さまの場合は障害物の上端の値を使用し、通常の場合は下端の値を使用する。
        let leftBlockPos = 0;
        let rightBlockPos = 0;
        if (this._isUpsideDown) {
            leftBlockPos = leftBlock.y + leftBlock.height / 2;
            rightBlockPos = rightBlock.y + rightBlock.height / 2;
        }
        else {
            leftBlockPos = leftBlock.y - leftBlock.height / 2;
            rightBlockPos = rightBlock.y - rightBlock.height / 2;
        }

        // 左右の段差が移動可能な段差を超えている場合
        if (Math.abs(leftBlockPos - rightBlockPos) > MOVABLE_STEP) {

            // 進行方向と反対の障害物に合わせる。
            if (this._state === STATE.LEFT_MOVE) {
                this._hitArea.x = rightBlock.x - rightBlock.width / 2 + this._hitArea.width / 2;

                if (this._isUpsideDown) {
                    this._hitArea.y = rightBlock.y + rightBlock.width / 2 + this._hitArea.height / 2;
                }
                else {
                    this._hitArea.y = rightBlock.y - rightBlock.width / 2 - this._hitArea.height / 2;
                }
            }
            else {
                this._hitArea.x = leftBlock.x - leftBlock.width / 2 + this._hitArea.width / 2;

                if (this._isUpsideDown) {
                    this._hitArea.y = leftBlock.y + leftBlock.width / 2 + this._hitArea.height / 2;
                }
                else {
                    this._hitArea.y = leftBlock.y - leftBlock.width / 2 - this._hitArea.height / 2;
                }
            }
        }
        else {

            // 逆さまの場合は下の方に合わせる。
            if (this._isUpsideDown) {

                this._hitArea.y = Math.max(leftBlockPos, rightBlockPos) + this._hitArea.height / 2;

            }
            // 通常の場合は上の方に合わせる。
            else {

                this._hitArea.y = Math.min(leftBlockPos, rightBlockPos) - this._hitArea.height / 2;
            }
        }
    }
}

export default Ant;
