import Enemy from './enemy';
import WalkingCharacter from './walkingcharacter';
import EnemyShot from './enemyshot';
import Util from './util';
// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動スピード
const MOVE_SPEED = 0.1;
// 弾発射間隔
const SHOT_INTERVAL = 90;
/**
 * 敵キャラクター、カタツムリ。
 */
class Snail extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'snail', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
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
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;
        // 弾発射間隔が経過したら自機へ向けて1-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 8, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
        // 障害物との衝突判定を行う。
        const walkingCharacter = new WalkingCharacter();
        walkingCharacter.checkBlockHit(this._hitArea, this._isUpsideDown, scene);
        // 移動後の位置にキャラクターを移動する。
        this._hitArea.x = walkingCharacter.movePosition.x;
        this._hitArea.y = walkingCharacter.movePosition.y;
    }
}
export default Snail;
