/**
 * @class PlayerShot
 * @brief 自機弾
 * 右方向に直進する。
 */
phina.define('PlayerShot', {
    _static: {
        // 自機の攻撃力
        PLAYER_POWER: 4,
        // オプションの攻撃力
        OPTION_POWER: 2,
        // 当たり判定幅
        HIT_WIDTH: 3,
        // 当たり判定高さ
        HIT_HEIGHT: 3,
    },
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] isOption 発射元がオプションかどうか
     * @param [in/out] scene シーン
     */
    init: function(x, y, isOption, scene) {

        // スプライトを作成する。
        this.sprite = Sprite('image_8x8', 8, 8);
        scene.addCharacterSprite(this.sprite);

        // アニメーションの設定を行う。
        this.animation = FrameAnimation('image_8x8_ss');
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('player_shot');

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER_SHOT;

        // 座標、サイズを設定する。
        // 当たり判定を作成する。
        this.hitArea = Collider(x, y, PlayerShot.HIT_WIDTH, PlayerShot.HIT_HEIGHT);

        // 攻撃力を設定する。
        if (isOption) {
            this.power = PlayerShot.OPTION_POWER;
        }
        else {
            this.power = PlayerShot.PLAYER_POWER;
        }
    },
    /**
     * @function update
     * @brief 更新処理
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // 右へ移動する。
        this.hitArea.x += 5;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // 衝突している敵キャラクターを検索する。
        var hitCharacters = this.hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            // 敵キャラクターの衝突処理を実行する。
            hitCharacters[0].hit(this);

            // 敵キャラクターに接触した場合は自分自身は削除する。
            scene.removeCharacter(this);
            this.sprite.remove();

            // 敵キャラと衝突した場合は処理を終了する。
            return;
        }
        
        // ブロックとの当たり判定処理を行う。
        if (Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x > ScreenSize.STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }
    },
});
