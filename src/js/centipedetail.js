import Enemy from './enemy';
import { STATE } from './centipedeif';
import EnemyShot from './enemyshot';
import Util from './util';
// 3-way弾の発射間隔
const N3WAY_SHOT_INTERVAL = 30;
// 3-way弾の弾数
const N3WAY_SHOT_COUNT = 3;
// 3-way弾の角度の間隔
const N3WAY_SHOT_ANGLE = Math.PI / 8;
// 3-way弾のスピード
const N3WAY_SHOT_SPEED = 0.75;
// 3-way弾発射までの間
const N3WAY_SHOT_WATI = 220;
/**
 * 敵キャラ、ムカデの尻尾。
 */
class CentipedeTail extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede_tail', param, scene);
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = STATE.ENTRY;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // ひとつ前の体を初期化する。。
        this._parent = null;
        // 後ろの体を初期化する。
        this._child = null;
    }
    /** ひとつ前の体 */
    get parent() {
        return this._parent;
    }
    /** ひとつ前の体 */
    set parent(value) {
        this._parent = value;
    }
    /** ひとつ後ろの体 */
    get child() {
        return this._child;
    }
    /** ひとつ後ろの体 */
    set child(value) {
        this._child = value;
    }
    /** ヒットポイント */
    get hp() {
        return this._hp;
    }
    /** ヒットポイント */
    set hp(value) {
        this._hp = value;
    }
    /**
     * 一番古い移動履歴を取得する。
     * @return 一番古い移動履歴
     */
    getFirstMoveHistory() {
        return this._moveHistory[0];
    }
    /**
     * 状態を設定する。
     * @param state 状態
     */
    setState(state) {
        // 自分の状態を設定する。
        this._state = state;
        // 子オブジェクトに現在の状態を通知する。
        if (this._child) {
            this._child.setState(this._state);
        }
        return this;
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
     * @param scene シーン
     */
    action(scene) {
        // 一つ前の体がメンバに設定されていない場合は処理しない。
        if (!this._parent) {
            return;
        }
        // 移動前の位置を記憶しておく。
        const prevPosition = { x: this._hitArea.x, y: this._hitArea.y };
        // 移動履歴の末尾を自分の座標に設定する。
        this._hitArea.x = this._parent.getFirstMoveHistory().x;
        this._hitArea.y = this._parent.getFirstMoveHistory().y;
        // 前回位置との差から体の向きを決める。
        const dx = this._hitArea.x - prevPosition.x;
        const dy = this._hitArea.y - prevPosition.y;
        const angle = Math.atan2(dy, dx);
        // 画像を回転させる。
        this._sprite.rotation = angle * 180 / Math.PI;
        // 定周期に3-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval > N3WAY_SHOT_WATI + N3WAY_SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), N3WAY_SHOT_COUNT, N3WAY_SHOT_ANGLE, N3WAY_SHOT_SPEED, false, scene);
            // 弾発射間隔を初期化する。
            this._shotInterval = N3WAY_SHOT_WATI;
        }
    }
}
export default CentipedeTail;
