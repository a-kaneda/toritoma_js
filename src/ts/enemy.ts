import Collider from './collider';
import Character from './character';
import PlayingScene from './playingscene';
import CharacterIF from './characterif';
import Rect from './rect';
import ScreenSize from './screensize';
import DeathEnemy from './deathenemy';
import EnemyParam from './enemyparam';

/**
 * 敵キャラクター。
 */
abstract class Enemy implements CharacterIF {

    /** スプライト */
    protected _sprite: phina.pixi.Sprite;
    /** 当たり判定 */
    protected _hitArea: Collider;
    /** HP */
    protected _hp: number;
    /** アニメーション */
    protected _animation: phina.accessory.FrameAnimation;
    /** 防御力 */
    protected _defense: number;
    /** 死亡エフェクト */
    private _deathEffect: DeathEnemy | null;
    /** キャラクター種別 */
    private _type: number;

    /**
     * コンストラクタ。
     * @param x x座標
     * @param y y座標
     * @param type 種別。
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x: number, y: number, type: string, param: EnemyParam, scene: PlayingScene) {

        // サイズを取得する。
        const size = param.size;

        // サイズに応じて画像、スプライトシートのファイル名を変える。
        const imageFile = 'image_' + size + 'x' + size;
        const ssFile = 'image_' + size + 'x' + size + '_ss';

        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite(imageFile, 16, 16);

        // 原点位置を設定する。
        this._sprite.setOrigin(param.originX, param.originY);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);

        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation(ssFile);
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay(type);

        // 当たり判定を作成する。
        this._hitArea = new Collider(x, y, param.width, param.height); 

        // HPを設定する。
        this._hp = param.hp;

        // 防御力を設定する。
        this._defense = param.defense;

        // 死亡エフェクトを初期化する。
        this._deathEffect = null;

        // キャラクター種別を設定する。
        this._type = Character.type.ENEMY;
    }

    /** キャラクター種別。 */
    public get type(): number {
        return this._type;
    }

    /** キャラクター種別。 */
    public set type(value: number) {
        this._type = value;
    }

    /** 位置とサイズ。 */
    public get rect(): Rect {
        return this._hitArea;
    }

    /** 死亡エフェクト */
    public set deathEffect(value: DeathEnemy) {
        this._deathEffect = value;
    }
    
    /**
     * 更新処理。
     * @param scene シーン
     */
    public update(scene: PlayingScene): void {

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        // また、破壊エフェクト中に衝突処理が走らないように種別をエフェクトに変更する。
        if (this._hp <= 0) {
            this._type = Character.type.EFFECT;
            if (this._deathEffect) {
                this._deathEffect.update(scene);
            }
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > ScreenSize.STAGE_RECT.width + this._hitArea.width * 4) {

            scene.removeCharacter(this);
            return;
        }

        // キャラクター種別ごとの固有の処理を行う。
        this.action(scene);

        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }

    /**
     * シーンから取り除く。
     */
    public remove(): this {
        this._sprite.remove();
        return this;
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
    
    /**
     * 攻撃処理。
     * このキャラクターへの攻撃を処理する。
     * 指定した攻撃力 - 防御力をダメージとしてHPから引く。
     * @param power 攻撃力
     */
    public attack(power: number): void {

        // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
        if (this._defense < power) {
            this._hp -= power - this._defense;
        }
    }

    /**
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    protected abstract action(scene: PlayingScene): void;
}

export default Enemy;
