/**
 * @class PlayerOption
 * @brief 自機オプション
 * 自機の後ろについて移動する。
 * チキンゲージの比率に応じて増える。
 */
phina.define('PlayerOption', {
    _static: {
        // 自機弾発射間隔
        SHOT_INTERVAL: 12,
        // 当たり判定幅(シールド反射時のみ使用する)
        HIT_WIDTH: 16,
        // 当たり判定高さ(シールド反射時のみ使用する)
        HIT_HEIGHT: 16,
        // オプション間の間隔(何フレーム分遅れて移動するか)
        OPTION_SPACE: 20,
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
        this.animation.gotoAndPlay('player_option_normal');

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER_OPTION;

        // 座標、サイズを設定する。
        this.rect = {
            x: x,
            y: y,
            width: PlayerOption.HIT_WIDTH,
            height: PlayerOption.HIT_HEIGHT,
        };

        // メンバを初期化する。
        this.movePosition = [];
        this.nextOption = null;
        this.shotInterval = 0;
     },
    /**
     * @function update
     * @brief 更新処理
     * 座標をスプライトに適用する。
     * シールド使用時は敵弾との当たり判定処理を行う。
     * 自機弾を発射する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // 弾発射間隔経過しているときは自機弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= PlayerOption.SHOT_INTERVAL) {
            // 敵弾が無効化されていない場合は自機弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(PlayerShot(this.rect.x, this.rect.y, true, scene));
                this.shotInterval = 0;
            }
        }

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.rect.x), Math.floor(this.rect.y));
    },
    /**
     * @function move
     * @brief 移動処理
     * 指定された座標へ移動する。
     * ただし、すぐに移動するのではなく、OPTION_SPACEの間隔分遅れて移動する。
     * オプションが他に存在する場合は、移動前の座標に対して移動を指示する。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     */
    move: function(x, y) {

        // 次のオプションが存在する場合は自分の移動前の座標に移動するように指示する。
        if (this.nextOption !== null) {
            this.nextOption.move(this.rect.x, this.rect.y);
        }
    
        // 移動先座標が間隔分溜まっている場合は先頭の座標に移動する
        if (this.movePosition.length >= PlayerOption.OPTION_SPACE) {

            // 先頭の要素を取り出す。
            var pos = this.movePosition.shift();

            // 移動する。
            this.rect.x = pos.x;
            this.rect.y = pos.y;
        }

        // 移動先座標の配列の末尾に追加する
        this.movePosition.push({x: x, y: y});
    },
    /**
     * @function setCount
     * @brief オプション個数設定
     * オプションの個数を設定する。
     * 0以下が指定されると自分自身を削除する。
     * 2個以上が指定されると再帰的に次のオプションを作成する。
     *
     * @param [in] count オプション個数
     * @param [in/out] scene シーン
     */
    setCount: function(count, scene) {

        // 個数が2個以上の場合はオプションを作成する。
        if (count >= 2) {

            // 次のオプションが作成されていなければ作成する。
            if (this.nextOption === null) {
                this.nextOption = PlayerOption(this.rect.x, this.rect.y, scene);
                scene.addCharacter(this.nextOption);
            }

            // 次のオプションに自分の分を減らした個数を設定する。
            this.nextOption.setCount(count - 1, scene);
        }
        else {

            // 次のオプションが作成されていれば削除する。
            if (this.nextOption !== null) {

                // 次のオプションに自分の分を減らした個数を設定し、削除処理を行う。
                this.nextOption.setCount(count - 1, scene);

                // メンバ変数をクリアする。
                this.nextOption = null;
            }

            // 0以下が指定された場合は自分自身も削除する。
            if (count <= 0) {
                scene.removeCharacter(this);
                this.sprite.remove();
            }
        }
    },
});
