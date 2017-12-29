/** @module explosion */

/**
 * 爆発アニメーションを行う。
 */
class Explosion {

    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 爆発音を再生する。
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
        this.animation.gotoAndPlay('explosion');

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(x), Math.floor(y));

        // 爆発音を再生する。
        SoundManager.play('bomb_min');
    }
    
    /**
     * アニメーションが終了すると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    }
}

export default Explosion;
