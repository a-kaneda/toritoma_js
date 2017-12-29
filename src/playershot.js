/** @module playershot */

import Character from './character.js'
import Util from './util.js'
import Collider from './collider.js'
import ScreenSize from './screensize.js'

// 自機の攻撃力
const PLAYER_POWER = 4;
// オプションの攻撃力
const OPTION_POWER = 2;
// 当たり判定幅
const HIT_WIDTH = 3;
// 当たり判定高さ
const HIT_HEIGHT = 3;

/**
 * 自機弾。
 * 右方向に直進する。
 */
class PlayerShot {

    /**
     * コンストラクタ。座標の設定とスプライトシートの設定を行う。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} isOption - 発射元がオプションかどうか
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, isOption, scene) {

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
        this.animation.gotoAndPlay('player_shot');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = Character.type.PLAYER_SHOT;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        /**
         * 攻撃力
         * @type {number}
         */
        this.power = 0;

        // 攻撃力を設定する。
        if (isOption) {
            this.power = OPTION_POWER;
        }
        else {
            this.power = PLAYER_POWER;
        }
    }

    /**
     * 更新処理。
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 右へ移動する。
        this.hitArea.x += 5;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

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
        
        // ブロックとの当たり判定処理を行う。
        if (Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x > ScreenSize.STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }
    }
}

export default PlayerShot;
