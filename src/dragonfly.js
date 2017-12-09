/**
 * @class Dragonfly
 * @brief トンボ
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
phina.define('Dragonfly', {
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
        this.animation.gotoAndPlay('dragonfly');

        // キャラクタータイプを設定する。
        this.type = Character.type.ENEMY;

        // 座標を設定する。
        this.rect = {
            x: x,
            y: y,
        };

        // パラメータを設定する。
        Character.setEnemyParam('dragonfly', this);
    },
    /**
     * @function update
     * @brief 更新処理
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // 左へ移動する。
        this.rect.x -= 1;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.rect.x), Math.floor(this.rect.y));

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {

            // 爆発アニメーションを作成する。
            scene.addCharacter(Explosion(this.rect.x, this.rect.y, scene));

            // スコアを加算する。
            scene.addScore(this.score);

            // 自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.floatX < -32) {
            scene.removeCharacter(this);
            this.sprite.remove();
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
