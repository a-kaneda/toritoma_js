import Character from './character';
/**
 * 爆発アニメーションを行う。
 */
class Explosion {
    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 爆発音を再生する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {
        /**
         * スプライト
         * @type {phina.display.Sprite}
         */
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        // アニメーションの設定を行う。
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('explosion');
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));
        // 爆発音を再生する。
        phina.asset.SoundManager.play('bomb_min');
    }
    get type() {
        return Character.type.EFFECT;
    }
    get rect() {
        return {
            x: this._sprite.x,
            y: this._sprite.y,
            width: this._sprite.width,
            height: this._sprite.height,
        };
    }
    /**
     * アニメーションが終了すると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
}
export default Explosion;
