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

        // キャラクタータイプを設定する。
        this.type = Character.type.ENEMY;

        // 座標を設定する。
        this.floatX = x;
        this.floatY = y;

        // パラメータを設定する。
        Character.setEnemyParam('dragonfly', this);

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
        this.floatX -= 1;

        // 座標をスプライトに適用する。
        this.x = Math.floor(this.floatX);
        this.y = Math.floor(this.floatY);

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {
            this.remove();
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.floatX < -32) {
            this.remove();
        }
    },
    /**
     * @function hit
     * @brief 衝突処理
     * 他のキャラクターと衝突したときの処理を行う。
     *
     * @param character 衝突したキャラクター
     */
    hit: function(character) {
        // 衝突したキャラクターが自機弾の場合
        if (character.type === Character.type.PLAYER_SHOT) {
            // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
            if (this.defense < character.power) {
                this.hp -= character.power - this.defense;
            }
        }
    },
});
