import Enemy from './enemy';
import { STATE } from './centipedeif';
import CentipedeBody from './centipedebody';
import CentipedeTail from './centipedetail';
import EnemyShot from './enemyshot';
import Util from './util';
import EnemyFactory from './enemyfactory';
// 状態遷移間隔
const STATE_INTERVAL = [170, 900, 900, 900];
// 移動方向変更の境界線x方向最小値
const MOVE_CHANGE_POINT_X_MIN = 8.0;
// 移動方向変更の境界線x方向最大値
const MOVE_CHANGE_POINT_X_MAX = 184.0;
// 移動方向変更の境界線y方向最小値
const MOVE_CHANGE_POINT_Y_MIN = 16.0;
// 移動方向変更の境界線y方向最大値
const MOVE_CHANGE_POINT_Y_MAX = 128.0;
// 移動スピード
const MOVE_SPEED = 0.5;
// 胴体の数
const BODY_COUNT = 18;
// 5-way弾発射間隔
const N5WAY_INTERVAL = 60;
// 5-way弾スピード
const N5WAY_SHOT_SPEED = 0.5;
// 1-way弾の待機時間
const N1WAY_WAIT_TIME = 10;
// 1-way弾の発射時間
const N1WAY_SHOT_TIME = 80;
// 1-way弾発射間隔
const N1WAY_INTERVAL = 20;
// 1-way弾スピード
const N1WAY_SHOT_SPEED = 0.75;
// 移動履歴保存数
const MOVE_HISOTRY_COUNT = 11;
/**
 * 敵キャラ、ムカデ。
 */
class Centipede extends Enemy {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede', param, scene);
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = STATE.ENTRY;
        // 弾発射間隔、状態遷移間隔を初期化する。
        this._5wayInterval = 0;
        this._1wayWaitInterval = 0;
        this._1wayShotInterval = 0;
        this._stateInverval = 0;
        // 前後の体を初期化する。
        this._parent = null;
        this._child = null;
        // 胴体部分を作成する。
        let parent = this;
        let animationFrame = 0;
        for (let i = 0; i < BODY_COUNT; i++) {
            // 胴体を作成する。
            const body = EnemyFactory.create(x, y, 'centipede_body', scene);
            if (body && body instanceof CentipedeBody) {
                // シーンに追加する。
                scene.addCharacter(body);
                // 足の動きが交互になるようにアニメーションフレームを設定する。
                body.setAnimationFrame(animationFrame);
                animationFrame = 1 - animationFrame;
                // 1個前の体を設定する。
                body.parent = parent;
                // 前の部分の体の次の部分に今回作成した体を設定する。
                parent.child = body;
                // 今回作成した胴体を次の胴体の前の部分に使用する。
                parent = body;
            }
        }
        // 尻尾を作成する。
        const tail = EnemyFactory.create(x, y, 'centipede_tail', scene);
        if (tail && tail instanceof CentipedeTail) {
            // シーンに追加する。
            scene.addCharacter(tail);
            // 足の動きが交互になるようにアニメーションフレームを設定する。
            tail.setAnimationFrame(animationFrame);
            // 1個前の体を設定する。
            tail.parent = parent;
            // 前の部分の体の次の部分に今回作成した体を設定する。
            parent.child = tail;
        }
        // 初期移動方向は左下とする。
        this._moveDirectionX = -1;
        this._moveDirectionY = 1;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
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
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.ENTRY:// 登場
                // 左方向へ移動する。
                this._hitArea.x -= 0.5;
                // 画像を回転させる。
                this._sprite.rotation = 180;
                break;
            case STATE.N5WAY_SHOT:// 5-way弾発射
                // 弾発射間隔時間経過したら弾を発射する。
                this._5wayInterval++;
                if (this._5wayInterval > N5WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, N5WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._5wayInterval = 0;
                }
                break;
            case STATE.HIGH_SPEED_SHOT:// 1-way弾による高速弾発射
                // 1-way弾グループの待機時間が経過している場合は1-way弾を発射し始める。
                this._1wayWaitInterval++;
                if (this._1wayWaitInterval > N1WAY_WAIT_TIME) {
                    // 弾発射間隔時間経過したら弾を発射する。
                    this._1wayShotInterval++;
                    if (this._1wayShotInterval > N1WAY_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        EnemyShot.fireNWay(this._hitArea, Util.calcAngle(this._hitArea, scene.playerPosition), 1, 0, N1WAY_SHOT_SPEED, false, scene);
                        // 弾発射間隔を初期化する。
                        this._1wayShotInterval = 0;
                    }
                    // 1-way弾発射時間を経過した場合、待機時間を初期化する。
                    if (this._1wayWaitInterval > N1WAY_WAIT_TIME + N1WAY_SHOT_TIME) {
                        this._1wayWaitInterval = 0;
                        this._1wayShotInterval = 0;
                    }
                }
                break;
            default:
                break;
        }
        // 登場時以外は斜めに移動する。
        // 端まで行くと向きを反転する。
        if (this._state !== STATE.ENTRY) {
            // 下方向へ移動中に下端に達したら向きを変える。
            // 上方向へ移動中に上端に達したら向きを変える。
            if ((this._moveDirectionY > 0 && this._hitArea.y > MOVE_CHANGE_POINT_Y_MAX) ||
                (this._moveDirectionY < 0 && this._hitArea.y < MOVE_CHANGE_POINT_Y_MIN)) {
                this._moveDirectionY *= -1;
            }
            // 左方向へ移動中に左端に達したら向きを変える。
            // 右方向へ移動中に右端に達したら向きを変える。
            if ((this._moveDirectionX > 0 && this._hitArea.x > MOVE_CHANGE_POINT_X_MAX) ||
                (this._moveDirectionX < 0 && this._hitArea.x < MOVE_CHANGE_POINT_X_MIN)) {
                this._moveDirectionX *= -1;
            }
            // スピードを設定する。
            const speedX = MOVE_SPEED * this._moveDirectionX;
            const speedY = MOVE_SPEED * this._moveDirectionY;
            // 移動する。
            this._hitArea.x += speedX;
            this._hitArea.y += speedY;
            // 移動方向の角度を計算する。
            const angle = Math.atan2(speedY, speedX);
            // 画像を回転させる。
            this._sprite.rotation = angle * 180 / Math.PI;
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInverval++;
        if (this._stateInverval > STATE_INTERVAL[this._state]) {
            // 次の状態へ進める。
            if (this._state + 1 < STATE.COUNT) {
                this.setState(this._state + 1);
            }
            else {
                // 状態が最大を超える場合は最初の状態へループする。
                this.setState(STATE.ENTRY + 1);
            }
            // 弾発射間隔、状態遷移間隔を初期化する。
            this._5wayInterval = 0;
            this._1wayWaitInterval = 0;
            this._1wayShotInterval = 0;
            this._stateInverval = 0;
        }
        // 移動履歴を保存する。
        this._moveHistory.push({ x: this._hitArea.x, y: this._hitArea.y });
        // 移動履歴が保存数を超えた場合は先頭から削除していく。
        while (this._moveHistory.length > MOVE_HISOTRY_COUNT) {
            this._moveHistory.shift();
        }
        // ボスHPゲージの表示を更新する。
        if (this._hp > 0) {
            scene.bossLife = this._hp / this._maxHP;
        }
        else {
            scene.bossLife = 0;
        }
    }
}
export default Centipede;
