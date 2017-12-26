/**
 * @class Dragonfly
 * @brief トンボ
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
phina.define('Dragonfly', {
    _static: {
        // 移動スピード
        MOVE_SPEED: -0.5,
        // 弾のスピード
        SHOT_SPEED: 0.75,
        // 弾発射間隔（1周目）
        SHOT_INTERVAL: 120,
    },
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

        // 当たり判定を作成する。
        this.hitArea = Collider(x, y, Character.enemy['dragonfly'].width, Character.enemy['dragonfly'].height); 

        // HPを設定する。
        this.hp = Character.enemy['dragonfly'].hp;

        // 防御力を設定する。
        this.defense = Character.enemy['dragonfly'].defense;

        // スコアを設定する。
        this.score = Character.enemy['dragonfly'].score;

        // メンバを初期化する。
        this.shotInterval = 0;
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
        this.hitArea.x += Dragonfly.MOVE_SPEED;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {

            // 爆発アニメーションを作成する。
            scene.addCharacter(Explosion(this.hitArea.x, this.hitArea.y, scene));

            // スコアを加算する。
            scene.addScore(this.score);

            // 自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();

            return;
        }

        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= Dragonfly.SHOT_INTERVAL) {
            // 敵弾が無効化されていない場合は敵弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(EnemyShot(this.hitArea.x, this.hitArea.y, Math.PI, Dragonfly.SHOT_SPEED, scene));
            }
            this.shotInterval = 0;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    },
    /**
     * @function hit
     * @brief 衝突処理
     * 他のキャラクターと衝突したときの処理を行う。
     *
     * @param [in] character 衝突したキャラクター
     * @param [in/out] scene シーン
     */
    hit: function(character, scene) {
        // 衝突したキャラクターが自機または自機弾の場合
        if (character.type === Character.type.PLAYER ||
            character.type === Character.type.PLAYER_SHOT) {

            // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
            if (this.defense < character.power) {
                this.hp -= character.power - this.defense;
            }
        }
    },
});
