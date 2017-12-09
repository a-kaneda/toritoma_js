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
        HIT_WIDTH: 6,
        // 当たり判定高さ
        HIT_HEIGHT: 6,
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
        this.rect = {
            x: x,
            y: y,
            width: PlayerShot.HIT_WIDTH,
            height: PlayerShot.HIT_HEIGHT,
        };

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
        this.rect.x += 5;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.rect.x), Math.floor(this.rect.y));

        // 当たり判定処理を行う。
        this._checkHitChacater(scene);

        // 画面外に出た場合は自分自身を削除する。
        if (this.rect.x > ScreenSize.STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    },
    /**
     * @function _checkHitChacater
     * @breif 当たり判定処理
     * 他のキャラクターとの当たり判定を処理する。
     *
     * @param [in/out] scene シーン
     */
    _checkHitChacater: function(scene) {

        // 親ノード（キャラクターレイヤー）に配置されているキャラクターを取得する。
        var characters = scene.characters;

        // 各キャラクターとの当たり判定を処理する。
        for (var i = 0; i < characters.length; i++) {

            // 対象が敵キャラクターの場合
            if (characters[i].type === Character.type.ENEMY) {

                // 接触しているかどうかを調べる。
                if (Util.isHitCharacter(this.rect, characters[i].rect)) {

                    // 敵キャラクターの衝突処理を実行する。
                    characters[i].hit(this);

                    // 敵キャラクターに接触した場合は自分自身は削除する。
                    scene.removeCharacter(this);
                    this.sprite.remove();
                    break;
                }
            }
        }
    },
});
