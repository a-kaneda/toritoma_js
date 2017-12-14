/**
 * @class Player
 * @brief 自機
 * ユーザー捜査に応じて移動する。
 */
phina.define('Player', {
    _static: {
        // キーボード入力による移動スピード
        SPEED_BY_KEY: 2,
        // タッチ操作による移動スピード
        SPEED_BY_TOUCH: 1.8 / ScreenSize.ZOOM_RATIO,
        // ゲームパッドによる移動スピード
        SPEED_BY_GAMEPAD: 4,
        // 自機弾発射間隔
        SHOT_INTERVAL: 12,
        // 当たり判定幅
        HIT_WIDTH: 8,
        // 当たり判定高さ
        HIT_HEIGHT: 8,
        // 復活後無敵フレーム数
        INVINCIBLE_FRAME: 120,
        // 状態
        STATUS: {
            // 通常
            NORMAL: 1,
            // 死亡
            DEATH: 2,
            // 無敵
            INVINCIBLE: 3,
        },
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
        this.animation.gotoAndPlay('player_normal');

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER;

        // 座標、サイズを設定する。
        this.rect = {
            x: x,
            y: y,
            width: Player.HIT_WIDTH,
            height: Player.HIT_HEIGHT,
        };

        // メンバを初期化する。
        this.shotInterval = 0;
        this.status = Player.STATUS.NORMAL;
        this.power = 1;
        this.invincibleFrame = 0;
    },
    /**
     * @function update
     * @brief 更新処理
     * 座標をスプライトに適用する。
     * ブロックやキャラクターとの当たり判定処理を行う。
     * 自機弾を発射する。
     *
     * @param [in/out] scene シーン
     */
    update: function(scene) {

        // ブロックと衝突している場合
        if (Util.checkCollidedBlock(this.rect, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックによって押されて移動する。
            var dest = Util.pushCharacter(this.rect, scene.getStagePosition(), scene.getBlockMap(), false);
            this.rect.x = dest.x;
            this.rect.y = dest.y;
        }

        if (this.status === Player.STATUS.INVINCIBLE) {
            // 無敵状態フレーム数を経過した場合は通常状態に戻す。
            this.invincibleFrame--;
            if (this.invincibleFrame <= 0) {
                this.status = Player.STATUS.NORMAL;
            }
        } 

        if (this.status === Player.STATUS.NORMAL || this.status === Player.STATUS.INVINCIBLE) {

            // 自機弾発射間隔が経過した場合は自機弾を発射する。
            this.shotInterval++;
            if (this.shotInterval >= Player.SHOT_INTERVAL) {
                scene.addCharacter(PlayerShot(this.rect.x, this.rect.y, false, scene));
                this.shotInterval = 0;
            }
        }

        if (this.status === Player.STATUS.NORMAL) {

            // 敵キャラとの当たり判定処理を行う。
            this._checkHitChacater(scene);
        }

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.rect.x), Math.floor(this.rect.y));
    },
    /**
     * @function moveKeyLeft
     * @brief 左キーによる移動
     * キーボードの左キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyLeft: function(scene) {
        this._move(this.rect.x - Player.SPEED_BY_KEY,
                   this.rect.y,
                   scene);
    },
    /**
     * @function moveKeyRight
     * @brief 右キーによる移動
     * キーボードの右キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyRight: function(scene) {
        this._move(this.rect.x + Player.SPEED_BY_KEY,
                   this.rect.y,
                   scene);
    },
    /**
     * @function moveKeyUp
     * @brief 上キーによる移動
     * キーボードの上キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyUp: function(scene) {
        this._move(this.rect.x,
                   this.rect.y - Player.SPEED_BY_KEY,
                   scene);
    },
    /**
     * @function moveKeyDown
     * @brief 下キーによる移動
     * キーボードの下キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyDown: function(scene) {
        this._move(this.rect.x,
                   this.rect.y + Player.SPEED_BY_KEY,
                   scene);
    },
    /**
     * @function moveTouch
     * @brief タッチによる移動
     * タッチ入力による移動処理を行う。
     *
     * @param [in] x x座標方向のタッチ位置スライド量
     * @param [in] y y座標方向のタッチ位置スライド量
     * @param [in/out] scene シーン
     */
    moveTouch: function(x, y, scene) {
        this._move(this.rect.x + x * Player.SPEED_BY_TOUCH,
                   this.rect.y + y * Player.SPEED_BY_TOUCH,
                   scene);
    },
    /**
     * @function moveTouch
     * @brief ゲームパッドによる移動
     * ゲームパッド入力による移動処理を行う。
     *
     * @param [in] x x座標方向のスティック入力値
     * @param [in] y y座標方向のスティック入力値
     * @param [in/out] scene シーン
     */
    moveGamepad: function(x, y, scene) {
        this._move(this.rect.x + x * Player.SPEED_BY_GAMEPAD,
                   this.rect.y + y * Player.SPEED_BY_GAMEPAD,
                   scene);
    },
    /**
     * @function rebirth
     * @brief 復活処理
     * 死亡後の復活処理を行う。
     * 一定時間無敵状態とし、再度スプライトを配置する。
     *
     * @param [in/out] scene シーン
     */
    rebirth: function(scene) {

        // ステータスを無敵状態にする。
        this.status = Player.STATUS.INVINCIBLE;

        // 無敵状態フレーム数を設定する。
        this.invincibleFrame = Player.INVINCIBLE_FRAME;

        // スプライトを配置する。
        scene.addCharacterSprite(this.sprite);
    },
    /**
     * @function _move
     * @brief 移動処理
     * 座標を変更し、各種当たり判定処理を行う。
     *
     * @param [in] x 移動後のx座標
     * @param [in] y 移動後のy座標
     * @param [in/out] scene シーン
     */
    _move: function(x, y, scene) {

        // 前回値を保存する。
        var prevX = this.rect.x;
        var prevY = this.rect.y;

        // 死亡中でない場合のみ移動を行う。
        if (this.status != Player.STATUS.DEATH) {
            // 現在の座標を変更する。
            this.rect.x = x;
            this.rect.y = y;
        }

        // 衝突しているブロックがないか調べる。
        var block = Util.checkCollidedBlock(this.rect, scene.getStagePosition(), scene.getBlockMap());

        // 衝突しているブロックがある場合は移動する。
        if (block != null) {
            var newPosition = Util.moveByBlock(this.rect, prevX, prevY, block, scene.getStagePosition(), scene.getBlockMap());
            this.rect.x = newPosition.x;
            this.rect.y = newPosition.y;
        }

        // 画面外に出ていないかチェックする。
        this._checkScreenArea();
    },
    /**
     * @function _checkScreenArea
     * @breif 画面外に出ていないかチェックする
     * 画面外に出ていないかチェックする。
     * 画面外に出ていた場合は画面内に座標を補正する。
     */
    _checkScreenArea: function() {

        // 左側画面範囲外には移動させないようにする。
        if (this.rect.x < 0) {
            this.rect.x = 0;
        }

        // 右側画面範囲外には移動させないようにする。
        if (this.rect.x > ScreenSize.STAGE_RECT.width - 1) {
            this.rect.x = ScreenSize.STAGE_RECT.width - 1;
        }

        // 上側画面範囲外には移動させないようにする。
        if (this.rect.y < 0) {
            this.rect.y = 0;
        }

        // 下側画面範囲外には移動させないようにする。
        if (this.rect.y > ScreenSize.STAGE_RECT.height - 1) {
            this.rect.y = ScreenSize.STAGE_RECT.height - 1;
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

            // 対象が敵キャラクター、敵弾の場合
            if (characters[i].type === Character.type.ENEMY ||
                characters[i].type === Character.type.ENEMY_SHOT) {

                // 接触しているかどうかを調べる。
                if (Util.isHitCharacter(this.rect, characters[i].rect)) {

                    // 敵キャラクターの衝突処理を実行する。
                    characters[i].hit(this, scene);

                    // 死亡時エフェクトを作成する。
                    scene.addCharacter(PlayerDeathEffect(this.rect.x, this.rect.y, scene));

                    // 敵キャラクターに接触した場合はステータスを死亡に変更してスプライトを削除する。
                    this.status = Player.STATUS.DEATH;
                    this.sprite.remove();

                    // シーンの死亡時処理を実行する。
                    scene.miss();
                }
            }
        }
    },
});
