/** @module playershot */

import Character from './character'
import Util from './util'
import Collider from './collider'
import ScreenSize from './screensize'
import PlayingScene from './playingscene'
import Rect from './rect'
import CharacterIF from './characterif'

// 自機の攻撃力
const PLAYER_POWER = 4;
// オプションの攻撃力
const OPTION_POWER = 2;
// 当たり判定幅
const HIT_WIDTH = 3;
// 当たり判定高さ
const HIT_HEIGHT = 3;

/**
 * 自機弾。
 * 右方向に直進する。
 */
class PlayerShot implements CharacterIF {

    /** スプライト */
    private _sprite: phina.display.Sprite;
    /** アニメーション */
    private _animation: phina.accessory.FrameAnimation;
    /** 当たり判定 */
    private _hitArea: Collider;
    /** 攻撃力 */
    private _power: number;

    /**
     * コンストラクタ。座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param isOption 発射元がオプションかどうか
     * @param scene シーン
     */
    constructor(x: number, y: number, isOption: boolean, scene: PlayingScene) {

        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite('image_8x8', 8, 8);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);

        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_8x8_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('player_shot');

        // 当たり判定を作成する。
        this._hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        // 攻撃力を設定する。
        if (isOption) {
            this._power = OPTION_POWER;
        }
        else {
            this._power = PLAYER_POWER;
        }
    }

    /** キャラクター種別 */
    public get type(): number {
        return Character.type.PLAYER_SHOT;
    }

    /** 位置とサイズ */
    public get rect(): Rect {
        return this._hitArea;
    }

    /**
     * 更新処理。
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    public update(scene: PlayingScene): void {

        // 右へ移動する。
        this._hitArea.x += 5;

        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));

        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            const topCharacter = hitCharacters[0];
            if (Character.isEnemy(topCharacter)) {
                
                // 敵キャラクターの衝突処理を実行する。
                topCharacter.attack(this._power);

                // 敵キャラクターに接触した場合は自分自身は削除する。
                scene.removeCharacter(this);
                this._sprite.remove();

                // ヒット音を再生するために自機弾衝突フラグを立てる。
                // 1回のフレームで連続で音声が鳴らないようにシーン側で音声を鳴らす処理を行う。
                scene.isHitPlayerShot = true;

                // 敵キャラと衝突した場合は処理を終了する。
                return;
            }  
        }
        
        // ブロックとの当たり判定処理を行う。
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }

        // 画面外の敵にダメージを与えないように画面端付近で攻撃力を0にする。
        if (this._hitArea.x > ScreenSize.STAGE_RECT.width - this._hitArea.width) {
            this._power = 0;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x > ScreenSize.STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
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

export default PlayerShot;
