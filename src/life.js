/**
 * @class Life
 * @brief 残機表示
 * 残機を表示する。
 */
phina.define('Life', {
    _static: {
        // 残機最大値
        MAX_LIFE: 99,
        // 画像位置
        IMAGE_POS_X: -16,
        // ラベル位置
        LABEL_POS_X: 8,
    },
    /**
     * @function init
     * @brief コンストラクタ
     * 画像と数値のラベルをくっつけたコントールを作成する。
     */
    init: function() {

        // ベース部分を作成する。
        this.base = RectangleShape({
            height: 22,
            width: 52,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
        });

        // 画像を読み込む。
        this.image = Sprite('control', ControlSize.life.width, ControlSize.life.height);
        this.image.srcRect.set(ControlSize.life.x, ControlSize.life.y, ControlSize.life.width, ControlSize.life.height);
        this.image.scaleX = ScreenSize.ZOOM_RATIO;
        this.image.scaleY = ScreenSize.ZOOM_RATIO;
        this.image.x = Life.IMAGE_POS_X;
        this.image.addChildTo(this.base);

        // ラベルを作成する。
        this.label = Label({
            text: ':00',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        });
        this.label.x = Life.LABEL_POS_X;
        this.label.addChildTo(this.base);

        // 残機の初期値は0とする。
        this.life = 0;
    },
    /**
     * @function getSprite
     * @brief スプライト取得
     * 残機画像、ラベルを合わせたスプライトを取得する。
     *
     * @return スプライト
     */
    getSprite: function() {
        return this.base;
    },
    /**
     * @function setLife
     * @brief 残機設定
     * 残機を設定し、
     */
    setLife: function(life) {

        // 残機を変更する。
        this.life = life;

        // 最大値を超えている場合は最大値に補正する。
        if (this.life > Life.MAX_LIFE) {
            this.life = Life.MAX_LIFE;
        }

        // ラベルの表示文字列を変更する。
        this.label.text = ':' + ('00' + this.life).slice(-2);
    },
});
