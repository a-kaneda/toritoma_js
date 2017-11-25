/**
 * @class Dragonfly
 * @brief トンボ
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
phina.define('Dragonfly', {
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
        this.superInit('enemy_16x16', 16, 16);

        // 座標を設定する。
        this.floatX = x;
        this.floatY = y;

        // スプライトシートの設定を行う。
        this.spriteSheet = FrameAnimation('enemy_16x16_ss');
        this.spriteSheet.attachTo(this);
        this.spriteSheet.gotoAndPlay('dragonfly');
    },
    /**
     * @function update
     * @brief 更新処理
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     */
    update: function() {

        // 左へ移動する。
        this.floatX -= 1.0;

        // 座標をスプライトに適用する。
        this.x = Math.floor(this.floatX);
        this.y = Math.floor(this.floatY);

        // 画面外に出た場合は自分自身を削除する。
        if (this.floatX < -32) {
            this.remove();
        }
    }
});
