/** @module enemyshot */
import ScreenSize from './screensize';
import Character from './character';
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
     * @param x x座標
     * @param y y座標
     * @param angle 発射する方向
     * @param count 個数
     * @param interval 弾の間隔の角度
     * @param speed 弾のスピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    static fireNWay(x, y, angle, count, interval, speed, isScroll, scene) {
        // 敵弾が無効化されていない場合は処理をしない。。
        if (scene.isDisableEnemyShot()) {
            return;
        }
        // 指定された個数分、弾を生成する。
        for (let i = 0; i < count; i++) {
            // 中央の角度からどれだけずらすかを計算する。
            const angleDiff = (-1 * (count - 1 - 2 * i) / 2) * interval;
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(x, y, angle + angleDiff, speed, isScroll, scene));
        }
    }
    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param angle 進行方向
     * @param speed スピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    constructor(x, y, angle, speed, isScroll, scene) {
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
        this._hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);
        // x方向のスピードを計算する。
        this._speedX = Math.cos(angle) * speed;
        // y方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._speedY = Math.sin(angle) * speed * -1;
        // スクロールに合わせて移動するかどうかを設定する。
        this._isScroll = isScroll;
        // かすり時のゲージ増加率を設定する。
        this._grazeRate = GRAZE_RATE;
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
                    // 敵キャラと衝突した場合は処理を終了する。
                    return;
                }
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
}
export default EnemyShot;
