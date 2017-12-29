/** @module dragonfly */

import Collider from './collider.js'
import Character from './character.js'
import Explosion from './explosion.js'
import EnemyShot from './enemyshot.js'

// 移動スピード
const MOVE_SPEED = -0.5;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 弾発射間隔（1周目）
const SHOT_INTERVAL = 120;

/**
 * 敵キャラクター、トンボ。
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
class Dragonfly {

    /**
     * コンストラクタ
     *
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

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
        this.animation.gotoAndPlay('dragonfly');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = Character.type.ENEMY;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new Collider(x, y, Character.enemy['dragonfly'].width, Character.enemy['dragonfly'].height); 

        /**
         * HP
         * @type {number}
         */
        this.hp = Character.enemy['dragonfly'].hp;

        /**
         * 防御力
         * @type {number}
         */
        this.defense = Character.enemy['dragonfly'].defense;

        /**
         * スコア
         * @type {number}
         */
        this.score = Character.enemy['dragonfly'].score;

        /**
         * 弾発射間隔
         * @type {number}
         */
        this.shotInterval = 0;
    }
    
    /**
     * 更新処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     *
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 左へ移動する。
        this.hitArea.x += MOVE_SPEED;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {

            // 爆発アニメーションを作成する。
            scene.addCharacter(new Explosion(this.hitArea.x, this.hitArea.y, scene));

            // スコアを加算する。
            scene.addScore(this.score);

            // 自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();

            return;
        }

        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= SHOT_INTERVAL) {
            // 敵弾が無効化されていない場合は敵弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new EnemyShot(this.hitArea.x, this.hitArea.y, Math.PI, SHOT_SPEED, scene));
            }
            this.shotInterval = 0;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
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
}

export default Dragonfly;
