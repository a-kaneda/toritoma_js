import EnemyShot from './enemyshot';
import Enemy from './enemy';
import PlayingScene from './playingscene';
import EnemyParam from './enemyparam';
import Util from './util';
import Collider from './collider';

// 移動スピード
const MOVE_SPEED = 0.75;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 弾発射間隔
const SHOT_INTERVAL = 40;

/**
 * 敵キャラクター、ゴキブリ。
 */
class Cockroach extends Enemy {

    /** 弾発射間隔 */
    private _shotInterval: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x: number, y: number, param: EnemyParam, scene: PlayingScene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'cockroach', param, scene);

        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 自機に向かって体当たりをしてくる。定周期で自機に向かって2-way弾を発射する。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // 自機との角度を求める
        const angle = Util.calcAngle(this._hitArea, scene.playerPosition);
        
        // 縦横の速度を決定する
        const speedX = MOVE_SPEED * Math.cos(angle);
        const speedY = -1.0 * MOVE_SPEED * Math.sin(angle);

        // x方向に移動する。
        this._hitArea.x += speedX;
        
        // ブロックと衝突しているかチェックする。
        const coollidedBlockX = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());

        // ブロックと衝突している場合はブロックの端まで移動する。
        if (coollidedBlockX) {
            if (speedX > 0) {
                this._hitArea.x = coollidedBlockX.x - coollidedBlockX.width / 2 - this._hitArea.width / 2;
            }
            else {
                this._hitArea.x = coollidedBlockX.x + coollidedBlockX.width / 2 + this._hitArea.width / 2;
            }
        }

        // y方向に移動する。
        this._hitArea.y += speedY;

        // ブロックと衝突しているかチェックする。
        const coollidedBlockY = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());

        // ブロックと衝突している場合はブロックの端まで移動する。
        if (coollidedBlockY) {
            if (speedY > 0) {
                this._hitArea.y = coollidedBlockY.y - coollidedBlockY.height / 2 - this._hitArea.height / 2;
            }
            else {
                this._hitArea.y = coollidedBlockY.y + coollidedBlockY.height / 2 + this._hitArea.height / 2;
            }
        }

        // 画像を回転させる。
        this._sprite.rotation = -1.0 * angle * 180 / Math.PI + 90;
                 
        // ブロックと衝突している場合
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {

            // ブロックによって押されて移動する。
            const dest = this._hitArea.pushCharacter(this._hitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this._hitArea.x = dest.x;
            this._hitArea.y = dest.y;
        }
        
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            EnemyShot.fireNWay(this._hitArea, Math.PI, 2, Math.PI / 16.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}

export default Cockroach;
