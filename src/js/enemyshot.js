import ScreenSize from './screensize';
import Character from './character';
import Util from './util';
import Collider from './collider';
// 当たり判定幅
const HIT_WIDTH = 3;
// 当たり判定高さ
const HIT_HEIGHT = 3;
// かすりゲージ増加率
const GRAZE_RATE = 0.02;
// 反射弾の攻撃力
const REFLECTION_POWER = 5;
/**
 * 敵が発射する弾。
 */
class EnemyShot {
    /**
     * n-way弾を作成する。
     * @param position 座標
     * @param angle 発射する方向
     * @param count 個数
     * @param interval 弾の間隔の角度
     * @param speed 弾のスピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    static fireNWay(position, angle, count, interval, speed, isScroll, scene) {
        // 敵弾が無効化されていない場合は処理をしない。。
        if (scene.isDisableEnemyShot()) {
            return;
        }
        // 指定された個数分、弾を生成する。
        for (let i = 0; i < count; i++) {
            // 中央の角度からどれだけずらすかを計算する。
            const angleDiff = (-1 * (count - 1 - 2 * i) / 2) * interval;
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(position, angle + angleDiff, speed, isScroll, scene));
        }
    }
    /**
     * 自機を狙う一塊のグループ弾を発射する。
     * 中心点から自機の角度を計算し、すべての弾をその角度で発射する。
     * @param position グループ弾の中心点の座標
     * @param distance 中心点からの距離
     * @param count 弾の数
     * @param speed 弾の速度
     * @param scene シーン
     */
    static fireGroupShot(position, distance, count, speed, scene) {
        // 自機へ向かう角度を計算する。
        const angle = Util.calcAngle(position, scene.playerPosition);
        // 各弾の位置に通常弾を生成する
        for (let i = 0; i < count; i++) {
            // 弾の座標を計算する。
            const p = {
                x: position.x + distance[i].x,
                y: position.y + distance[i].y,
            };
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(p, angle, speed, false, scene));
        }
    }
    /**
     * 一定時間で破裂する弾を発射する。
     * @param position 発射する位置
     * @param count 破裂後の数
     * @param interval 破裂後の弾の間隔
     * @param speed 弾の速度
     * @param burstInterval 破裂までの間隔
     * @param burstSpeed 破裂後の速度
     * @param data ゲームデータ
     */
    static fireBurstShot(position, count, interval, speed, burstInterval, burstSpeed, scene) {
        // 中心点からの弾の距離
        const distance = 4.0;
        // 自機へ向かう角度を計算する。
        const angle = Util.calcAngle(position, scene.playerPosition);
        // 個別の弾の角度を計算する。
        const burstAngles = Util.calcNWayAngle(Math.PI, count, interval);
        // 各弾を発射する。
        for (let burstAngle of burstAngles) {
            // 破裂弾を生成する。
            const p = {
                x: position.x + Math.cos(burstAngle) * distance,
                y: position.y - Math.sin(burstAngle) * distance,
            };
            // 弾を生成する。
            let enemyshot = new EnemyShot(p, angle, speed, false, scene)
                .setChangeSpeed(burstInterval, burstSpeed, burstAngle);
            scene.addCharacter(enemyshot);
        }
    }
    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param position 座標
     * @param angle 進行方向
     * @param speed スピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    constructor(position, angle, speed, isScroll, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_8x8', 8, 8);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_8x8_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('enemy_shot');
        // キャラクター種別を敵弾とする。
        this._type = Character.type.ENEMY_SHOT;
        // 当たり判定を作成する。
        this._hitArea = new Collider(position.x, position.y, HIT_WIDTH, HIT_HEIGHT);
        // x方向のスピードを計算する。
        this._speedX = Math.cos(angle) * speed;
        // y方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._speedY = Math.sin(angle) * speed * -1;
        // スクロールに合わせて移動するかどうかを設定する。
        this._isScroll = isScroll;
        // かすり時のゲージ増加率を設定する。
        this._grazeRate = GRAZE_RATE;
        // デフォルトは速度変更なしとする。
        this._changeSpeed = false;
        this._changeInterval = 0;
        this._changeSpeedX = 0;
        this._changeSpeedY = 0;
    }
    /** キャラクター種別 */
    get type() {
        return this._type;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /**
     * スピードに応じて移動する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    update(scene) {
        // スピードに応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
        // タイプが自機弾になっている場合、反射弾として敵との当たり判定を行う。
        if (this._type === Character.type.PLAYER_SHOT) {
            // 衝突している敵キャラクターを検索する。
            const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY]);
            // 衝突している敵キャラクターがいる場合。
            if (hitCharacters.length > 0) {
                const topCharacter = hitCharacters[0];
                if (Character.isEnemy(topCharacter)) {
                    // 敵キャラクターの衝突処理を実行する。
                    topCharacter.attack(REFLECTION_POWER);
                    // 敵キャラクターに接触した場合は自分自身は削除する。
                    scene.removeCharacter(this);
                    this._sprite.remove();
                    // ヒット音を再生するために自機弾衝突フラグを立てる。
                    // 1回のフレームで連続で音声が鳴らないようにシーン側で音声を鳴らす処理を行う。
                    scene.isHitPlayerShot = true;
                    // 敵キャラと衝突した場合は処理を終了する。
                    return;
                }
            }
        }
        // 反射されていない状態で速度変更を行う弾の場合
        if (this._type === Character.type.ENEMY_SHOT && this._changeSpeed) {
            // 速度変更間隔が経過している場合は速度を変更する。
            this._changeInterval--;
            if (this._changeInterval < 0) {
                this._speedX = this._changeSpeedX;
                this._speedY = this._changeSpeedY;
                this._changeSpeed = false;
            }
        }
        // ブロックとの当たり判定処理を行う。
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > ScreenSize.STAGE_RECT.width + this._hitArea.width * 2 ||
            this._hitArea.y < -this._hitArea.height * 2 ||
            this._hitArea.y > ScreenSize.STAGE_RECT.height + this._hitArea.height * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
    /**
     * 削除する。
     * @param scene シーン
     */
    remove(scene) {
        // 自分自身を削除する。
        scene.removeCharacter(this);
        this._sprite.remove();
    }
    /**
     * かすり時のゲージ増加比率を返し、二重にかすらないようにメンバ変数の値を0にする。
     * @return ゲージ増加比率
     */
    graze() {
        const ret = this._grazeRate;
        this._grazeRate = 0;
        return ret;
    }
    /**
     * 移動方向を180度反転させ、自機弾として扱うようにする。
     */
    reflect() {
        // キャラクタータイプを自機弾に変更する。
        this._type = Character.type.PLAYER_SHOT;
        // 進行方向を反転する。
        this._speedX *= -1;
        this._speedY *= -1;
    }
    /**
     * 途中で速度を変更する設定を行う。
     * @param interval 速度変更までの間隔
     * @param speed 変更後の速度
     * @param angle 変更後の角度
     */
    setChangeSpeed(interval, speed, angle) {
        // 速度変更までの間隔を設定する。
        this._changeInterval = interval;
        // 変更後のx方向のスピードを計算する。
        this._changeSpeedX = Math.cos(angle) * speed;
        // 変更後のy方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._changeSpeedY = Math.sin(angle) * speed * -1;
        // 速度変更を有効にする。
        this._changeSpeed = true;
        return this;
    }
}
export default EnemyShot;
