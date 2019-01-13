import Enemy from './enemy';
import PlayingScene from './playingscene';
import EnemyShot from './enemyshot';
import Util from './util';
import EnemyParam from './enemyparam';

// 弾発射間隔
const SHOT_INTERVAL = 60;
// 移動スピード
const MOVE_SPEED = 0.65;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 方向転換を行うまでの間隔
const CHANGE_DIRECTION_INTERVAL = 120;

/**
 * 敵キャラ、クワガタ。
 * 登場時に自機の方向へ進行方向を決めて真っ直ぐ飛ぶ。定周期で3-way弾を発射する。
 * 途中で方向転換を行い、自機の方向へ向き直す。ただし、後ろの方向には戻らないようにx方向は常に左にする。
 */
class StagBeetle extends Enemy {

    /** 弾発射間隔 */
    private _shotInterval: number;
    /** 方向転換間隔 */
    private _changeDirectionInterval: number;
    /** x方向の移動スピード */
    private _speedX: number;
    /** y方向の移動スピード */
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
        super(x, y, 'stagbeetle', param, scene);

        // 自機との角度を計算する。
        const angle = Util.calcAngle(this._hitArea, scene.playerPosition);

        // 縦横の速度を決定する
        // ただし、後ろには戻らないようにx方向は絶対値とする
        this._speedX = -1.0 * Math.abs(MOVE_SPEED * Math.cos(angle));
        this._speedY = -1.0 * MOVE_SPEED * Math.sin(angle);

        // 各変数を初期化する。
        this._shotInterval = 0;
        this._changeDirectionInterval = 0;
    }
    
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // 移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;

        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            EnemyShot.fireNWay(this._hitArea,
                               Util.calcAngle(this._hitArea, scene.playerPosition), 
                               3, 
                               Math.PI / 8.0, 
                               SHOT_SPEED, 
                               false, 
                               scene);
            this._shotInterval = 0;
        }

        // 方向転換間隔経過しているときは移動方向を変更する。
        this._changeDirectionInterval++;
        if (this._changeDirectionInterval >= CHANGE_DIRECTION_INTERVAL) {

            // 自機との角度を計算する。
            const angle = Util.calcAngle(this._hitArea, scene.playerPosition);

            // 縦横の速度を決定する
            // ただし、後ろには戻らないようにx方向は絶対値とする
            this._speedX = -1.0 * Math.abs(MOVE_SPEED * Math.cos(angle));
            this._speedY = -1.0 * MOVE_SPEED * Math.sin(angle);

            this._changeDirectionInterval = 0;
        }
    }
}

export default StagBeetle;