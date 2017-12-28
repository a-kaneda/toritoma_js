import Character from './character.js'
import Util from './util.js'
import Collider from './collider.js'
import PlayerShot from './playershot.js'

// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅(シールド反射時のみ使用する)
const HIT_WIDTH = 16;
// 当たり判定高さ(シールド反射時のみ使用する)
const HIT_HEIGHT = 16;
// オプション間の間隔(何フレーム分遅れて移動するか)
const OPTION_SPACE = 20;

/**
 * @class PlayerOption
 * @brief 自機オプション
 * 自機の後ろについて移動する。
 * チキンゲージの比率に応じて増える。
 */
export default class PlayerOption {

    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in] shield シールド使用不使用
     * @param [in/out] scene シーン
     */
    constructor(x, y, shield , scene) {

        // スプライトを作成する。
        this.sprite = Sprite('image_16x16', 16, 16);
        scene.addCharacterSprite(this.sprite);

        // シールド使用不使用を設定する。
        this.shield = shield;

        // アニメーションの設定を行う。
        this.animation = FrameAnimation('image_16x16_ss');
        this.animation.attachTo(this.sprite);

        // シールド使用不使用によって画像を変更する。
        if (this.shield) {
            this.animation.gotoAndPlay('player_option_shield');
        }
        else {
            this.animation.gotoAndPlay('player_option_normal');
        }

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER_OPTION;

        // 当たり判定を作成する。
        this.hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        // メンバを初期化する。
        this.movePosition = [];
        this.nextOption = null;
        this.shotInterval = 0;

        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this.noShot = true;
        }
        else {
            this.noShot = false;
        }
    }

    /**
     * @function update
     * @brief 更新処理
     * 座標をスプライトに適用する。
     * シールド使用時は敵弾との当たり判定処理を行う。
     * 自機弾を発射する。
     *
     * @param [in/out] scene シーン
     */
    update(scene) {

        // 弾発射間隔経過しているときは自機弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= SHOT_INTERVAL && !this.noShot) {

            // 敵弾が無効化されていない場合は自機弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new PlayerShot(this.hitArea.x, this.hitArea.y, true, scene));
                this.shotInterval = 0;
            }
        }

        // シールド使用時は当たり判定処理を行う。
        if (this.shield) {
            this._checkHitChacater(scene);
        }

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));
    }

    /**
     * @function move
     * @brief 移動処理
     * 指定された座標へ移動する。
     * ただし、すぐに移動するのではなく、OPTION_SPACEの間隔分遅れて移動する。
     * オプションが他に存在する場合は、移動前の座標に対して移動を指示する。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     */
    move(x, y) {

        // 次のオプションが存在する場合は自分の移動前の座標に移動するように指示する。
        if (this.nextOption !== null) {
            this.nextOption.move(this.hitArea.x, this.hitArea.y);
        }
    
        // 移動先座標が間隔分溜まっている場合は先頭の座標に移動する
        if (this.movePosition.length >= OPTION_SPACE) {

            // 先頭の要素を取り出す。
            const pos = this.movePosition.shift();

            // 移動する。
            this.hitArea.x = pos.x;
            this.hitArea.y = pos.y;
        }

        // 移動先座標の配列の末尾に追加する
        this.movePosition.push({x: x, y: y});
    }

    /**
     * @function setCount
     * @brief オプション個数設定
     * オプションの個数を設定する。
     * 0以下が指定されると自分自身を削除する。
     * 2個以上が指定されると再帰的に次のオプションを作成する。
     *
     * @param [in] count オプション個数
     * @param [in/out] scene シーン
     */
    setCount(count, scene) {

        // 個数が2個以上の場合はオプションを作成する。
        if (count >= 2) {

            // 次のオプションが作成されていなければ作成する。
            if (this.nextOption === null) {
                this.nextOption = new PlayerOption(this.hitArea.x, this.hitArea.y, this.shield, scene);
                scene.addCharacter(this.nextOption);
            }

            // 次のオプションに自分の分を減らした個数を設定する。
            this.nextOption.setCount(count - 1, scene);
        }
        else {

            // 次のオプションが作成されていれば削除する。
            if (this.nextOption !== null) {

                // 次のオプションに自分の分を減らした個数を設定し、削除処理を行う。
                this.nextOption.setCount(count - 1, scene);

                // メンバ変数をクリアする。
                this.nextOption = null;
            }

            // 0以下が指定された場合は自分自身も削除する。
            if (count <= 0) {
                scene.removeCharacter(this);
                this.sprite.remove();
            }
        }
    }

    /**
     * @function setShield
     * @brief シールド使用不使用設定
     * シールド使用不使用を設定する。
     * 次のオプションがあればオプションの設定も変更する。
     *
     * @param [in] shield シールド使用不使用
     */
    setShield(shield) {

        // シールド使用不使用が変化した場合はアニメーションを変更する。
        if (!this.shield && shield) {
            this.animation.gotoAndPlay('player_option_shield');
        }
        else if (this.shield && !shield) {
            this.animation.gotoAndPlay('player_option_normal');
        }
        else {
            // 変化がない場合はアニメーションを継続する。
            // 毎回アニメーションを変更すると、都度最初のフレームに戻り、
            // アニメーションが行われなくなるため。
        }

        // シールド使用不使用を設定する。
        this.shield = shield;

        // 次のオプションがある場合は次のオプションのシールド使用不使用を設定する。
        if (this.nextOption !== null) {
            this.nextOption.setShield(this.shield);
        }
    }
    
    /**
     * @function _checkHitChacater
     * @breif 当たり判定処理
     * 他のキャラクターとの当たり判定を処理する。
     *
     * @param [in/out] scene シーン
     */
    _checkHitChacater(scene) {

        // 衝突している敵弾を検索する。
        const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY_SHOT]);

        // 衝突している敵キャラクターがいる場合。
        for (let i = 0; i < hitCharacters.length; i++) {

            // 敵弾反射処理を実行する。
            hitCharacters[i].reflect();
        }
    }
}
