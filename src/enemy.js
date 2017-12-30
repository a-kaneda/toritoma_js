/** @module enemy */

import Collider from './collider.js'
import Character from './character.js'
import Explosion from './explosion.js'

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
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay(type);

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = Character.type.ENEMY;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new Collider(x, y, Character.enemy[type].width, Character.enemy[type].height); 

        /**
         * HP
         * @type {number}
         */
        this.hp = Character.enemy[type].hp;

        /**
         * 防御力
         * @type {number}
         */
        this.defense = Character.enemy[type].defense;

        /**
         * スコア
         * @type {number}
         */
        this.score = Character.enemy[type].score;
    }
    
    /**
     * 更新処理。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
    }
    
    /**
     * 衝突処理。
     * 他のキャラクターと衝突したときの処理を行う。
     *
     * @param {object} character - 衝突したキャラクター
     * @param {PlayingScene} scene - シーン
     */
    hit(character, scene) {

        // 衝突したキャラクターが自機または自機弾の場合
        if (character.type === Character.type.PLAYER ||
            character.type === Character.type.PLAYER_SHOT) {

            // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
            if (this.defense < character.power) {
                this.hp -= character.power - this.defense;
            }
        }
    }

    /**
     * 死亡処理。爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    death(scene) {

        // 爆発アニメーションを作成する。
        scene.addCharacter(new Explosion(this.hitArea.x, this.hitArea.y, scene));

        // スコアを加算する。
        scene.addScore(this.score);

        // 自分自身を削除する。
        scene.removeCharacter(this);
        this.sprite.remove();
    }
}

export default Enemy;
