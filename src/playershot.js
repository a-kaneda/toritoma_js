/**
 * @class PlayerShot
 * @brief 自機弾
 * 右方向に直進する。
 */
phina.define('PlayerShot', {
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
        this.superInit('image_8x8', 8, 8);

        // 座標を設定する。
        this.floatX = x;
        this.floatY = y;

        // スプライトシートの設定を行う。
        this.spriteSheet = FrameAnimation('image_8x8_ss');
        this.spriteSheet.attachTo(this);
        this.spriteSheet.gotoAndPlay('player_shot');
    },
    /**
     * @function update
     * @brief 更新処理
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     */
    update: function() {

        // 右へ移動する。
        this.floatX += 5;

        // 座標をスプライトに適用する。
        this.x = Math.floor(this.floatX);
        this.y = Math.floor(this.floatY);

        // 画面外に出た場合は自分自身を削除する。
        if (this.floatX > ScreenSize.STAGE_RECT.width + 16) {
            this.remove();
        }
    },
});
