import Enemy from './enemy';
import { STATE } from './centipedeif';
import EnemyShot from './enemyshot';
// 弾発射間隔
const SHOT_INTERVAL = 90;
// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動履歴保存数
const MOVE_HISOTRY_COUNT = 11;
/**
 * 敵キャラ、ムカデの胴体。
 */
class CentipedeBody extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede_body', param, scene);
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = STATE.ENTRY;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 前の体を初期化する。
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
        // 移動履歴を保存する。
        this._moveHistory.push({ x: this._hitArea.x, y: this._hitArea.y });
        // 移動履歴が保存数を超えた場合は先頭から削除していく。
        while (this._moveHistory.length > MOVE_HISOTRY_COUNT) {
            this._moveHistory.shift();
        }
        // 胴体部分からの発射の状態の時は弾を発射する。
        if (this._state === STATE.BODY_SHOT) {
            // 弾発射間隔経過しているときは上下方向へ弾を発射する。
            this._shotInterval++;
            if (this._shotInterval > SHOT_INTERVAL) {
                // 上下へ弾を発射する。
                EnemyShot.fireNWay(this._hitArea, Math.PI, 2, Math.PI, SHOT_SPEED, false, scene);
                // 弾発射間隔を初期化する。
                this._shotInterval = 0;
            }
        }
        else {
            // 弾を発射する状態以外の場合は弾発射間隔を初期化する。
            this._shotInterval = 0;
        }
    }
}
export default CentipedeBody;
