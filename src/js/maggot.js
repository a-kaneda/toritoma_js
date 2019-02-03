import Enemy from './enemy';
import EnemyShot from './enemyshot';
// 状態
var STATE;
(function (STATE) {
    STATE[STATE["UP_MOVE"] = 0] = "UP_MOVE";
    STATE[STATE["DOWN_MOVE"] = 1] = "DOWN_MOVE";
})(STATE || (STATE = {}));
// 弾発射間隔
const SHOT_INTERVAL = [150, 170, 190, 210, 230, 250, 270, 290];
// 弾のスピード
const SHOT_SPEED = [0.5, 0.5, 0.6, 0.6, 0.7, 0.7, 0.8, 0.8];
// 弾の角度
const SHOT_ANGLE = Math.PI / 8;
// 種別数
const TYPE_COUNT = SHOT_INTERVAL.length;
// 弾発射までの間
const SHOT_WAIT = 230;
/**
 * 敵キャラ、ウジ。
 */
class Maggot extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'maggot', param, scene);
        // 弾発射間隔を初期化する。
        this._n3WayShotInterval = 0;
        this._n4WayShotInterval = 0;
        this._waitInterval = 0;
        // タイプを初期化する。
        this._shotType = 0;
        // 親オブジェクトを初期化する。
        this._parent = null;
    }
    /** 親オブジェクト */
    get parent() {
        return this._parent;
    }
    /** 親オブジェクト */
    set parent(value) {
        this._parent = value;
    }
    /** 種別。 */
    get shotType() {
        return this._shotType;
    }
    /** 種別。 */
    set shotType(value) {
        this._shotType = value % TYPE_COUNT;
        // 向きを変更する。
        this._sprite.rotation = (Math.PI / 4) * (this._shotType % TYPE_COUNT);
    }
    /**
     * アニメーションフレームを設定する。
     * @param frame アニメーションフレーム
     */
    setAnimationFrame(frame) {
        this._animation.currentFrameIndex = frame;
        return this;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 定周期に3-way弾を発射する。
     * 生成されたときに設定されたstateに応じて発射間隔と画像の向きを変える。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 画像を回転する。
        this._sprite.rotation = -45 * (this._shotType % 8);
        // 弾発射待機間隔をカウントする。
        this._waitInterval++;
        // 弾発射間隔経過しているときは3-way弾を発射する
        this._n3WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n3WayShotInterval >= SHOT_INTERVAL[this._shotType]) {
            EnemyShot.fireNWay(this._hitArea, Math.PI, 3, SHOT_ANGLE, SHOT_SPEED[this._shotType], false, scene);
            this._n3WayShotInterval = 0;
        }
        // 弾発射間隔経過しているときは4-way弾を発射する
        this._n4WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n4WayShotInterval >= SHOT_INTERVAL[(this._shotType + 3) % TYPE_COUNT]) {
            EnemyShot.fireNWay(this._hitArea, Math.PI, 4, SHOT_ANGLE, SHOT_SPEED[(this._shotType + 3) % TYPE_COUNT], false, scene);
            this._n4WayShotInterval = 0;
        }
    }
}
export default Maggot;
