/** @module playerdeatheffect */
import Character from './character';
/**
 * 自機死亡時のエフェクトを表示する。
 */
class PlayerDeathEffect {
    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 死亡時SEを再生する。
     *
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
        this._animation.gotoAndPlay('player_death');
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));
        // 死亡音を再生する。
        phina.asset.SoundManager.play('miss');
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
     * 更新処理。下に落ちる。
     * アニメーションが終了すると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
        // 下に落ちる。
        this._sprite.y = Math.floor(this._sprite.y + 1);
        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
}
export default PlayerDeathEffect;
