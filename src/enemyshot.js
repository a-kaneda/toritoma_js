/**
 * @class EnemyShot
 * @brief 敵弾
 * 敵が発射する弾。
 */
phina.define('EnemyShot', {
    _static: {
        // 当たり判定幅
        HIT_WIDTH: 3,
        // 当たり判定高さ
        HIT_HEIGHT: 3,
        // かすりゲージ増加率
        GRAZE_RATE: 0.02,
    },
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] angle 進行方向
     * @param [in] speed スピード
     * @param [in/out] scene シーン
     */
    init: function(x, y, angle, speed, scene) {

        // スプライトを作成する。
        this.sprite = Sprite('image_8x8', 8, 8);
        scene.addCharacterSprite(this.sprite);

        // アニメーションの設定を行う。
        this.animation = FrameAnimation('image_8x8_ss');
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('enemy_shot');

        // キャラクタータイプを設定する。
        this.type = Character.type.ENEMY_SHOT;

        // 座標、サイズを設定する。
        this.rect = {
            x: x,
            y: y,
            width: EnemyShot.HIT_WIDTH,
            height: EnemyShot.HIT_HEIGHT,
        };

        // x方向のスピードを計算する。
        this.speedX = Math.cos(angle) * speed;
        
        // y方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this.speedY = Math.sin(angle) * speed * -1;

        // かすり時のゲージ増加率を設定する。
        this.grazeRate = EnemyShot.GRAZE_RATE;
    },
    /**
     * @function update
     * @brief 更新処理
     * スピードに応じて移動する。
     * 画面外に出ると自分自身を削除する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // スピードに応じて移動する。
        this.rect.x += this.speedX;
        this.rect.y += this.speedY;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.rect.x), Math.floor(this.rect.y));

        // ブロックとの当たり判定処理を行う。
        if (Util.checkCollidedBlock(this.rect, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.rect.x < -this.rect.width * 2 ||
            this.rect.x > ScreenSize.STAGE_RECT.width + this.rect.width * 2 ||
            this.rect.y < -this.rect.height * 2 ||
            this.rect.y > ScreenSize.STAGE_RECT.height + this.rect.height * 2) {

            scene.removeCharacter(this);
            this.sprite.remove();
            return;
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

        // 自分自身を削除する。
        scene.removeCharacter(this);
        this.sprite.remove();
    },
    /**
     * @function graze
     * @brief かすり処理
     * かすり時のゲージ増加比率を返し、二重にかすらないようにメンバ変数の値を0にする。
     *
     * @return ゲージ増加比率
     */
    graze: function() {
        var ret = this.grazeRate;
        this.grazeRate = 0;
        return ret;
    },
});
