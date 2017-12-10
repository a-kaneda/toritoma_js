/**
 * @class PlayerDeathEffect
 * @brief 自機死亡エフェクト
 * 自機死亡時のエフェクトを表示する。
 */
phina.define('PlayerDeathEffect', {
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とアニメーションの設定を行う。
     * 死亡時SEを再生する。
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
        this.animation.gotoAndPlay('player_death');

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(x), Math.floor(y));

        // 死亡音を再生する。
        SoundManager.play('miss');
    },
    /**
     * @function update
     * @brief 更新処理
     * 下に落ちる。
     * アニメーションが終了すると自分自身を削除する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // 下に落ちる。
        this.sprite.y = Math.floor(this.sprite.y + 1);

        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    },
});
