/** @module playeroption */
import Character from './character';
import Collider from './collider';
import PlayerShot from './playershot';
// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅(シールド反射時のみ使用する)
const HIT_WIDTH = 16;
// 当たり判定高さ(シールド反射時のみ使用する)
const HIT_HEIGHT = 16;
// オプション間の間隔(何フレーム分遅れて移動するか)
const OPTION_SPACE = 20;
/**
 * 自機オプション。
 * 自機の後ろについて移動する。
 * チキンゲージの比率に応じて増える。
 */
class PlayerOption {
    /**
     * コンストラクタ。
     * 座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param shield シールド使用不使用
     * @param scene シーン
     */
    constructor(x, y, shield, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // シールド使用不使用を設定する。
        this._shield = shield;
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        // シールド使用不使用によって画像を変更する。
        if (this._shield) {
            this._animation.gotoAndPlay('player_option_shield');
        }
        else {
            this._animation.gotoAndPlay('player_option_normal');
        }
        // 当たり判定を作成する。
        this._hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);
        // 移動位置の配列を作成する。
        this._movePosition = [];
        // 次のオプションは初期状態はなしとする。
        this._nextOption = null;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this._noShot = true;
        }
        else {
            this._noShot = false;
        }
    }
    /** キャラクター種別 */
    get type() {
        return Character.type.PLAYER_OPTION;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * シールド使用時は敵弾との当たり判定処理を行う。
     * 自機弾を発射する。
     * @param scene シーン
     */
    update(scene) {
        // シーンの状態がプレイ中の場合のみ、自機発射や当たり判定等の処理を行う。
        if (scene.isPlaying) {
            // 弾発射間隔経過しているときは自機弾を発射する
            this._shotInterval++;
            if (this._shotInterval >= SHOT_INTERVAL && !this._noShot) {
                // 敵弾が無効化されていない場合は自機弾を生成する。
                if (!scene.isDisableEnemyShot()) {
                    scene.addCharacter(new PlayerShot(this._hitArea.x, this._hitArea.y, true, scene));
                    this._shotInterval = 0;
                }
            }
            // シールド使用時は当たり判定処理を行う。
            if (this._shield) {
                this._checkHitChacater(scene);
            }
        }
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
     * 指定された座標へ移動する。
     * ただし、すぐに移動するのではなく、OPTION_SPACEの間隔分遅れて移動する。
     * オプションが他に存在する場合は、移動前の座標に対して移動を指示する。
     * @param x x座標
     * @param y y座標
     */
    move(x, y) {
        // 次のオプションが存在する場合は自分の移動前の座標に移動するように指示する。
        if (this._nextOption !== null) {
            this._nextOption.move(this._hitArea.x, this._hitArea.y);
        }
        // 移動先座標が間隔分溜まっている場合は先頭の座標に移動する
        if (this._movePosition.length >= OPTION_SPACE) {
            // 先頭の要素を取り出す。
            const pos = this._movePosition.shift();
            if (pos !== undefined) {
                // 移動する。
                this._hitArea.x = pos.x;
                this._hitArea.y = pos.y;
            }
        }
        // 移動先座標の配列の末尾に追加する
        this._movePosition.push({ x: x, y: y });
    }
    /**
     * オプションの個数を設定する。
     * 0以下が指定されると自分自身を削除する。
     * 2個以上が指定されると再帰的に次のオプションを作成する。
     * @param count オプション個数
     * @param scene シーン
     */
    setCount(count, scene) {
        // 個数が2個以上の場合はオプションを作成する。
        if (count >= 2) {
            // 次のオプションが作成されていなければ作成する。
            if (this._nextOption === null) {
                this._nextOption = new PlayerOption(this._hitArea.x, this._hitArea.y, this._shield, scene);
                scene.addCharacter(this._nextOption);
            }
            // 次のオプションに自分の分を減らした個数を設定する。
            this._nextOption.setCount(count - 1, scene);
        }
        else {
            // 次のオプションが作成されていれば削除する。
            if (this._nextOption !== null) {
                // 次のオプションに自分の分を減らした個数を設定し、削除処理を行う。
                this._nextOption.setCount(count - 1, scene);
                // メンバ変数をクリアする。
                this._nextOption = null;
            }
            // 0以下が指定された場合は自分自身も削除する。
            if (count <= 0) {
                scene.removeCharacter(this);
            }
        }
    }
    /**
     * シールド使用不使用を設定する。
     * 次のオプションがあればオプションの設定も変更する。
     * @param shield シールド使用不使用
     */
    setShield(shield) {
        // シールド使用不使用が変化した場合はアニメーションを変更する。
        if (!this._shield && shield) {
            this._animation.gotoAndPlay('player_option_shield');
        }
        else if (this._shield && !shield) {
            this._animation.gotoAndPlay('player_option_normal');
        }
        else {
            // 変化がない場合はアニメーションを継続する。
            // 毎回アニメーションを変更すると、都度最初のフレームに戻り、
            // アニメーションが行われなくなるため。
        }
        // シールド使用不使用を設定する。
        this._shield = shield;
        // 次のオプションがある場合は次のオプションのシールド使用不使用を設定する。
        if (this._nextOption !== null) {
            this._nextOption.setShield(this._shield);
        }
    }
    /**
     * 敵弾との当たり判定を処理する。衝突した敵弾の反射処理を行う。
     * @param scene シーン
     */
    _checkHitChacater(scene) {
        // 衝突している敵弾を検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY_SHOT]);
        // 衝突している敵キャラクターがいる場合。
        for (let character of hitCharacters) {
            if (Character.isEnemyShot(character)) {
                // 敵弾反射処理を実行する。
                character.reflect();
            }
        }
    }
}
export default PlayerOption;
