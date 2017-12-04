/**
 * @class Explosion
 * @brief 爆発
 * 爆発アニメーションを行う。
 */
phina.define('Explosion', {
    superClass: 'phina.display.Sprite',
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     */
    init: function(x, y) {

        // 親クラスのコンストラクタを呼び出す。
        this.superInit('image_16x16', 16, 16);

        // 座標を設定する。
        this.x = Math.floor(x);
        this.y = Math.floor(y);

        // スプライトシートの設定を行う。
        this.animation = FrameAnimation('image_16x16_ss');
        this.animation.attachTo(this);
        this.animation.gotoAndPlay('explosion');
    },
    /**
     * @function update
     * @brief 更新処理
     * アニメーションが終了すると自分自身を削除する。
     */
    update: function() {
        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            this.remove();
        }
    },
});
