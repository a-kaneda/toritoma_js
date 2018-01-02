/** @module enemy */
import Collider from './collider';
import Character from './character';
import Explosion from './explosion';
/**
 * 敵キャラクター。
 */
class Enemy {
    /**
     * コンストラクタ。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {string} type - 種別。
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, type, scene) {
        /**
         * スプライト
         * @type {phina.display.Sprite}
         */
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        // アニメーションの設定を行う。
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay(type);
        /**
         * 当たり判定
         * @type {Collider}
         */
        this._hitArea = new Collider(x, y, Character.enemy[type].width, Character.enemy[type].height);
        /**
         * HP
         * @type {number}
         */
        this._hp = Character.enemy[type].hp;
        /**
         * 防御力
         * @type {number}
         */
        this._defense = Character.enemy[type].defense;
        /**
         * スコア
         * @type {number}
         */
        this._score = Character.enemy[type].score;
    }
    get type() {
        return Character.type.ENEMY;
    }
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
    }
    /**
     * 攻撃処理。
     * このキャラクターへの攻撃を処理する。
     * 指定した攻撃力 - 防御力をダメージとしてHPから引く。
     * @param power - 攻撃力
     */
    attack(power) {
        // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
        if (this._defense < power) {
            this._hp -= power - this._defense;
        }
    }
    /**
     * 死亡処理。爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    death(scene) {
        // 爆発アニメーションを作成する。
        scene.addCharacter(new Explosion(this._hitArea.x, this._hitArea.y, scene));
        // スコアを加算する。
        scene.addScore(this._score);
        // 自分自身を削除する。
        scene.removeCharacter(this);
        this._sprite.remove();
    }
}
export default Enemy;
