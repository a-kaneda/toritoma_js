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
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('player_death');
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));
        // 死亡音を再生する。
        phina.asset.SoundManager.play('miss');
    }
    /** キャラクター種別 */
    get type() {
        return Character.type.EFFECT;
    }
    /** 位置とサイズ */
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
     * @param scene シーン
     */
    update(scene) {
        // 下に落ちる。
        this._sprite.y = Math.floor(this._sprite.y + 1);
        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
        }
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
}
export default PlayerDeathEffect;
