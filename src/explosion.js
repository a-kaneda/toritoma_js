/**
 * @class Explosion
 * @brief 爆発
 * 爆発アニメーションを行う。
 */
phina.define('Explosion', {
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in/out] scene シーン
     */
    init: function(x, y, scene) {

        // スプライトを作成する。
        this.sprite = Sprite('image_16x16', 16, 16);
        scene.addCharacterSprite(this.sprite);

        // アニメーションの設定を行う。
        this.animation = FrameAnimation('image_16x16_ss');
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('explosion');

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(x), Math.floor(y));

        // 爆発音を再生する。
        SoundManager.play('bomb_min');
    },
    /**
     * @function update
     * @brief 更新処理
     * アニメーションが終了すると自分自身を削除する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    },
});
