/** @module explosion */
import PlayingScene from './playingscene'
import Character from './character'
import CharacterIF from './characterif'
import Rect from './rect'

/**
 * 爆発アニメーションを行う。
 */
class Explosion implements CharacterIF {

    /** スプライト */
    private _sprite: phina.pixi.Sprite;
    /** アニメーション */
    private _animation: phina.accessory.FrameAnimation;

    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 爆発音を再生する。
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x: number, y: number, scene: PlayingScene) {

        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);

        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('explosion');

        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));

        // 爆発音を再生する。
        phina.asset.SoundManager.play('bomb_min');
    }

    /** キャラクター種別 */
    public get type(): number {
        return Character.type.EFFECT;
    }

    /** 位置とサイズ */
    public get rect(): Rect {
        return {
            x: this._sprite.x,
            y: this._sprite.y,
            width: this._sprite.width,
            height: this._sprite.height,
        };
    }
    
    /**
     * アニメーションが終了すると自分自身を削除する。
     * @param scene シーン
     */
    public update(scene: PlayingScene): void {

        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }

    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    public pauseAnimation(): this {
        this._animation.paused = true;
        return this;
    }

    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    public startAnimation(): this {
        this._animation.paused = false;
        return this;
    }
}

export default Explosion;
