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
    superClass: 'phina.display.Sprite',
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] isOption 発射元がオプションかどうか
     */
    init: function(x, y, isOption) {
        // 親クラスのコンストラクタを呼び出す。
        this.superInit('image_8x8', 8, 8);

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER_SHOT;

        // 座標を設定する。
        this.floatX = x;
        this.floatY = y;

        // 当たり判定を設定する。
        this.hitWidth = PlayerShot.HIT_WIDTH;
        this.hitHeight = PlayerShot.HIT_HEIGHT;

        // スプライトシートの設定を行う。
        this.spriteSheet = FrameAnimation('image_8x8_ss');
        this.spriteSheet.attachTo(this);
        this.spriteSheet.gotoAndPlay('player_shot');

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
     */
    update: function() {

        // 右へ移動する。
        this.floatX += 5;

        // 座標をスプライトに適用する。
        this.x = Math.floor(this.floatX);
        this.y = Math.floor(this.floatY);

        // 当たり判定処理を行う。
        this._checkHitChacater();

        // 画面外に出た場合は自分自身を削除する。
        if (this.floatX > ScreenSize.STAGE_RECT.width + 16) {
            this.remove();
        }
    },
    /**
     * @function _checkHitChacater
     * @breif 当たり判定処理
     * 他のキャラクターとの当たり判定を処理する。
     */
    _checkHitChacater: function() {

        // 親ノード（キャラクターレイヤー）に配置されているキャラクターを取得する。
        var characters = this.parent.children;

        // 各キャラクターとの当たり判定を処理する。
        for (var i = 0; i < characters.length; i++) {

            // 対象が敵キャラクターの場合
            if (characters[i].type === Character.type.ENEMY) {

                // 接触しているかどうかを調べる。
                if (Util.isHitCharacter(this, characters[i])) {

                    // 敵キャラクターの衝突処理を実行する。
                    characters[i].hit(this);

                    // 敵キャラクターに接触した場合は自分自身は削除する。
                    this.remove();
                    break;
                }
            }
        }
    },
});
