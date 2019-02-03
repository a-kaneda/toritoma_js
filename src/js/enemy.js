import Collider from './collider';
import Character from './character';
import ScreenSize from './screensize';
/**
 * 敵キャラクター。
 */
class Enemy {
    /**
     * コンストラクタ。
     * @param x x座標
     * @param y y座標
     * @param type 種別。
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, type, param, scene) {
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
    get type() {
        return this._type;
    }
    /** キャラクター種別。 */
    set type(value) {
        this._type = value;
    }
    /** 位置とサイズ。 */
    get rect() {
        return this._hitArea;
    }
    /** 死亡エフェクト */
    set deathEffect(value) {
        this._deathEffect = value;
    }
    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene) {
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
    /**
     * 攻撃処理。
     * このキャラクターへの攻撃を処理する。
     * 指定した攻撃力 - 防御力をダメージとしてHPから引く。
     * @param power 攻撃力
     */
    attack(power) {
        // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
        if (this._defense < power) {
            this._hp -= power - this._defense;
        }
    }
}
export default Enemy;
