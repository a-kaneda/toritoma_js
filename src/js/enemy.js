/** @module enemy */
import Collider from './collider';
import Character from './character';
import Explosion from './explosion';
import ScreenSize from './screensize';
/**
 * 敵キャラクター。
 */
class Enemy {
    /**
     * コンストラクタ。
     * @param x x座標
     * @param y y座標
     * @param type 種別。
     * @param scene シーン
     */
    constructor(x, y, type, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay(type);
        // 当たり判定を作成する。
        this._hitArea = new Collider(x, y, Character.enemy[type].width, Character.enemy[type].height);
        // HPを設定する。
        this._hp = Character.enemy[type].hp;
        // 防御力を設定する。
        this._defense = Character.enemy[type].defense;
        // スコアを設定する。
        this._score = Character.enemy[type].score;
    }
    // キャラクター種別。
    get type() {
        return Character.type.ENEMY;
    }
    // 位置とサイズ。
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene) {
        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this._hp <= 0) {
            this.death(scene);
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > ScreenSize.STAGE_RECT.width + this._hitArea.width * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
        // キャラクター種別ごとの固有の処理を行う。
        this.action(scene);
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * 攻撃処理。
     * このキャラクターへの攻撃を処理する。
     * 指定した攻撃力 - 防御力をダメージとしてHPから引く。
     * @param power 攻撃力
     */
    attack(power) {
        // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
        if (this._defense < power) {
            this._hp -= power - this._defense;
        }
    }
    /**
     * 死亡処理。爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param scene シーン
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
