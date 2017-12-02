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
    },
    superClass: 'phina.display.Sprite',
    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] characterLayer キャラクターを配置するレイヤー
     */
    init: function(x, y) {
        // 親クラスのコンストラクタを呼び出す。
        this.superInit('player', 16, 16);

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER;

        // 座標を設定する。
        this.floatX = x;
        this.floatY = y;

        // スプライトシートの設定を行う。
        this.spriteSheet = FrameAnimation('player_ss');
        this.spriteSheet.attachTo(this);
        this.spriteSheet.gotoAndPlay('normal');

        // メンバを初期化する。
        this.shotInterval = 0;
    },
    /**
     * @function update
     * @brief 更新処理
     * 座標をスプライトに適用する。
     */
    update : function() {

        // 自機弾発射間隔が経過した場合は自機弾を発射する。
        this.shotInterval++;
        if (this.shotInterval >= Player.SHOT_INTERVAL) {
            PlayerShot(this.floatX, this.floatY).addChildTo(this.parent);
            this.shotInterval = 0;
        }

        // 座標をスプライトに適用する。
        this.x = Math.floor(this.floatX);
        this.y = Math.floor(this.floatY);
    },
    /**
     * @function moveKeyLeft
     * @brief 左キーによる移動
     * キーボードの左キー入力による移動処理を行う。
     */
    moveKeyLeft: function() {
        this.floatX -= Player.SPEED_BY_KEY;
    },
    /**
     * @function moveKeyRight
     * @brief 右キーによる移動
     * キーボードの右キー入力による移動処理を行う。
     */
    moveKeyRight: function() {
        this.floatX += Player.SPEED_BY_KEY;
    },
    /**
     * @function moveKeyUp
     * @brief 上キーによる移動
     * キーボードの上キー入力による移動処理を行う。
     */
    moveKeyUp: function() {
        this.floatY -= Player.SPEED_BY_KEY;
    },
    /**
     * @function moveKeyDown
     * @brief 下キーによる移動
     * キーボードの下キー入力による移動処理を行う。
     */
    moveKeyDown: function() {
        this.floatY += Player.SPEED_BY_KEY;
    },
    /**
     * @function moveTouch
     * @brief タッチによる移動
     * タッチ入力による移動処理を行う。
     *
     * @param [in] x x座標方向のタッチ位置スライド量
     * @param [in] y y座標方向のタッチ位置スライド量
     */
    moveTouch: function(x, y) {
        this.floatX += x * Player.SPEED_BY_TOUCH;
        this.floatY += y * Player.SPEED_BY_TOUCH;
    },
    /**
     * @function moveTouch
     * @brief ゲームパッドによる移動
     * ゲームパッド入力による移動処理を行う。
     *
     * @param [in] x x座標方向のスティック入力値
     * @param [in] y y座標方向のスティック入力値
     */
    moveGamepad: function(x, y) {
        this.floatX += x * Player.SPEED_BY_GAMEPAD;
        this.floatY += y * Player.SPEED_BY_GAMEPAD;
    },
});
