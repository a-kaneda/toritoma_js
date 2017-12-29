/** @module enemyshot */

import ScreenSize from './screensize.js'
import Character from './character.js'
import Util from './util.js'
import Collider from './collider.js'

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
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} angle - 進行方向
     * @param {number} speed - スピード
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, angle, speed, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_8x8', 8, 8);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_8x8_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('enemy_shot');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = Character.type.ENEMY_SHOT;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        /** 
         * x方向のスピード
         * @type {number}
         */
        this.speedX = Math.cos(angle) * speed;
        
        /** 
         * y方向のスピード。phina.jsの座標系は下方向が正なので逆向きにする。
         * @type {number}
         */
        this.speedY = Math.sin(angle) * speed * -1;

        /**
         * かすり時のゲージ増加率
         * @type {number}
         */
        this.grazeRate = GRAZE_RATE;
    }
    
    /**
     * スピードに応じて移動する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // スピードに応じて移動する。
        this.hitArea.x += this.speedX;
        this.hitArea.y += this.speedY;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // タイプが自機弾になっている場合、反射弾として敵との当たり判定を行う。
        if (this.type === Character.type.PLAYER_SHOT) {

            // 衝突している敵キャラクターを検索する。
            const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY]);

            // 衝突している敵キャラクターがいる場合。
            if (hitCharacters.length > 0) {

                // 敵キャラクターの衝突処理を実行する。
                hitCharacters[0].hit(this);

                // 敵キャラクターに接触した場合は自分自身は削除する。
                scene.removeCharacter(this);
                this.sprite.remove();

                // 敵キャラと衝突した場合は処理を終了する。
                return;
            }
        }

        // ブロックとの当たり判定処理を行う。
        if (Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2 ||
            this.hitArea.x > ScreenSize.STAGE_RECT.width + this.hitArea.width * 2 ||
            this.hitArea.y < -this.hitArea.height * 2 ||
            this.hitArea.y > ScreenSize.STAGE_RECT.height + this.hitArea.height * 2) {

            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }
    }

    /**
     * 他のキャラクターと衝突したときの処理を行う。
     * @param {object} character - 衝突したキャラクター
     * @param {PlayingScene} scene - シーン
     */
    hit(character, scene) {

        // 自分自身を削除する。
        scene.removeCharacter(this);
        this.sprite.remove();
    }

    /**
     * かすり時のゲージ増加比率を返し、二重にかすらないようにメンバ変数の値を0にする。
     * @return {number} ゲージ増加比率
     */
    graze() {
        const ret = this.grazeRate;
        this.grazeRate = 0;
        return ret;
    }

    /**
     * 移動方向を180度反転させ、自機弾として扱うようにする。
     */
    reflect() {

        // キャラクタータイプを自機弾に変更する。
        this.type = Character.type.PLAYER_SHOT;

        // 攻撃力を設定する。
        this.power = REFLECTION_POWER;

        // 進行方向を反転する。
        this.speedX *= -1;
        this.speedY *= -1;
    }
}

export default EnemyShot;
