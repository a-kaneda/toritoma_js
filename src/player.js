import ScreenSize from './screensize.js'
import Character from './character.js'
import Util from './util.js'
import Collider from './collider.js'
import PlayerShot from './playershot.js'
import PlayerDeathEffect from './playerdeatheffect.js'
import PlayerOption from './playeroption.js'

// キーボード入力による移動スピード
const SPEED_BY_KEY = 2;
// タッチ操作による移動スピード
const SPEED_BY_TOUCH = 1.8 / ScreenSize.ZOOM_RATIO;
// ゲームパッドによる移動スピード
const SPEED_BY_GAMEPAD = 3;
// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅
const HIT_WIDTH = 4;
// 当たり判定高さ
const HIT_HEIGHT = 4;
// かすり当たり判定幅
const GRAZE_WIDTH = 16;
// かすり当たり判定高さ
const GRAZE_HEIGHT = 16;
// 復活後無敵フレーム数
const INVINCIBLE_FRAME = 120;
// 状態
const STATUS = {
    // 通常
    NORMAL: 1,
    // 死亡
    DEATH: 2,
    // 無敵
    INVINCIBLE: 3,
};
// オプション最大数
const MAX_OPTION_COUNT = 3;
// シールド使用時のゲージ使用量
const CONSUMPTION_GAUGE = 0.005;

/**
 * @class Player
 * @brief 自機
 * ユーザー操作に応じて移動する。
 */
export default class Player {

    /**
     * @function init
     * @brief コンストラクタ
     * 座標の設定とスプライトシートの設定を行う。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     * @param [in/out] scene シーン
     */
    constructor(x, y, scene) {

        // スプライトを作成する。
        this.sprite = Sprite('image_16x16', 16, 16);
        scene.addCharacterSprite(this.sprite);

        // アニメーションの設定を行う。
        this.animation = FrameAnimation('image_16x16_ss');
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('player_normal');

        // キャラクタータイプを設定する。
        this.type = Character.type.PLAYER;

        // 当たり判定を作成する。
        this.hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        // かすり当たり判定を作成する。
        this.grazeArea = new Collider(x, y, GRAZE_WIDTH, GRAZE_HEIGHT);

        // メンバを初期化する。
        this.shotInterval = 0;
        this.status = STATUS.NORMAL;
        this.power = 1;
        this.invincibleFrame = 0;
        this.chickenGauge = 0;
        this.option = null;
        this.shield = false;

        // デバッグ用
        if (localStorage.noDeath === 'true') {
            this.noDeath = true;
        }
        else {
            this.noDeath = false;
        }
    }

    /**
     * @function update
     * @brief 更新処理
     * 座標をスプライトに適用する。
     * ブロックやキャラクターとの当たり判定処理を行う。
     * 自機弾を発射する。
     *
     * @param [in/out] scene シーン
     */
    update(scene) {

        // ブロックと衝突している場合
        if (Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {

            // ブロックによって押されて移動する。
            var dest = Util.pushCharacter(this.hitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this.hitArea.x = dest.x;
            this.hitArea.y = dest.y;
        }

        // 無敵状態の場合
        if (this.status === STATUS.INVINCIBLE) {

            // 無敵状態フレーム数をカウントする。
            this.invincibleFrame--;

            // 無敵状態フレーム数を経過した場合
            if (this.invincibleFrame <= 0) {

                // ステータスを通常状態に戻す。
                this.status = STATUS.NORMAL;

                // 点滅アニメーションを停止する。
                this.sprite.tweener.clear();

                // アニメーションが非表示で終了している可能性があるので、
                // 表示状態にする。
                this.sprite.alpha = 1;
            }
        } 

        // 通常状態、無敵状態の場合
        if (this.status === STATUS.NORMAL || this.status === STATUS.INVINCIBLE) {

            // 自機弾発射間隔が経過した場合は自機弾を発射する。
            this.shotInterval++;
            if (this.shotInterval >= SHOT_INTERVAL) {
                scene.addCharacter(new PlayerShot(this.hitArea.x, this.hitArea.y, false, scene));
                this.shotInterval = 0;
            }

            // 敵弾とのかすり判定を行う。
            this._checkGraze(scene);

            // シールド使用時はチキンゲージを消費する。
            if (this.shield) {
                this.chickenGauge -= CONSUMPTION_GAUGE;
                if (this.chickenGauge < 0) {
                    this.chickenGauge = 0;
                }
            }
        }

        // 通常状態の場合
        if (this.status === STATUS.NORMAL) {

            // 敵キャラとの当たり判定処理を行う。
            this._checkHitChacater(scene);
        }

        // オプション個数を更新する。
        this._updateOptionCount(scene);

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));
    }

    /**
     * @function moveKeyLeft
     * @brief 左キーによる移動
     * キーボードの左キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyLeft(scene) {
        this._move(this.hitArea.x - SPEED_BY_KEY,
                   this.hitArea.y,
                   scene);
    }

    /**
     * @function moveKeyRight
     * @brief 右キーによる移動
     * キーボードの右キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyRight(scene) {
        this._move(this.hitArea.x + SPEED_BY_KEY,
                   this.hitArea.y,
                   scene);
    }

    /**
     * @function moveKeyUp
     * @brief 上キーによる移動
     * キーボードの上キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyUp(scene) {
        this._move(this.hitArea.x,
                   this.hitArea.y - SPEED_BY_KEY,
                   scene);
    }

    /**
     * @function moveKeyDown
     * @brief 下キーによる移動
     * キーボードの下キー入力による移動処理を行う。
     *
     * @param [in/out] scene シーン
     */
    moveKeyDown(scene) {
        this._move(this.hitArea.x,
                   this.hitArea.y + SPEED_BY_KEY,
                   scene);
    }

    /**
     * @function moveTouch
     * @brief タッチによる移動
     * タッチ入力による移動処理を行う。
     *
     * @param [in] x x座標方向のタッチ位置スライド量
     * @param [in] y y座標方向のタッチ位置スライド量
     * @param [in/out] scene シーン
     */
    moveTouch(x, y, scene) {
        this._move(this.hitArea.x + x * SPEED_BY_TOUCH,
                   this.hitArea.y + y * SPEED_BY_TOUCH,
                   scene);
    }

    /**
     * @function moveTouch
     * @brief ゲームパッドによる移動
     * ゲームパッド入力による移動処理を行う。
     *
     * @param [in] x x座標方向のスティック入力値
     * @param [in] y y座標方向のスティック入力値
     * @param [in/out] scene シーン
     */
    moveGamepad(x, y, scene) {
        this._move(this.hitArea.x + x * SPEED_BY_GAMEPAD,
                   this.hitArea.y + y * SPEED_BY_GAMEPAD,
                   scene);
    }

    /**
     * @function rebirth
     * @brief 復活処理
     * 死亡後の復活処理を行う。
     * 一定時間無敵状態とし、画像を点滅表示する。
     *
     * @param [in/out] scene シーン
     */
    rebirth(scene) {

        // ステータスを無敵状態にする。
        this.status = STATUS.INVINCIBLE;

        // チキンゲージを初期化する。
        this.chickenGauge = 0;

        // 無敵状態フレーム数を設定する。
        this.invincibleFrame = INVINCIBLE_FRAME;

        // 画像を表示する。
        this.sprite.alpha = 1;

        // 点滅アニメーションを実行する。
        // 100ms周期で表示、非表示を切り替える。
        this.sprite.tweener
            .wait(100)
            .set({ alpha: 0 })
            .wait(100)
            .set({ alpha: 1 })
            .setLoop(true)
            .play();
    }

    /**
     * @function getChickenGauge
     * @brief チキンゲージ取得
     * チキンゲージの溜まっている比率を0～1の範囲で取得する。
     *
     * @return チキンゲージ
     */
    getChickenGauge() {
        return this.chickenGauge;
    }

    /**
     * @function setShield
     * @brief シールド使用不使用設定
     * シールド使用不使用を設定する。
     * オプションがあればオプションの設定も変更する。
     *
     * @param [in] shield シールド使用不使用
     */
    setShield(shield) {

        // シールド使用不使用を設定する。
        this.shield = shield;

        // オプションがある場合はオプションのシールド使用不使用を設定する。
        if (this.option !== null) {
            this.option.setShield(shield);
        }
    }

    /**
     * @function _move
     * @brief 移動処理
     * 座標を変更し、各種当たり判定処理を行う。
     *
     * @param [in] x 移動後のx座標
     * @param [in] y 移動後のy座標
     * @param [in/out] scene シーン
     */
    _move(x, y, scene) {

        // 前回値を保存する。
        var prevX = this.hitArea.x;
        var prevY = this.hitArea.y;

        // 死亡中でない場合のみ移動を行う。
        if (this.status != STATUS.DEATH) {
            // 現在の座標を変更する。
            this.hitArea.x = x;
            this.hitArea.y = y;
        }

        // 衝突しているブロックがないか調べる。
        var block = Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap());

        // 衝突しているブロックがある場合は移動する。
        while (block != null) {

            // 移動位置を計算する。
            var newPosition = Util.moveByBlock(this.hitArea, prevX, prevY, block, scene.getStagePosition(), scene.getBlockMap());

            // 移動できない場合はループを抜ける。
            if (this.hitArea.x == newPosition.x && this.hitArea.y == newPosition.y) {
                break;
            }
            
            // 移動後の座標を反映する。
            this.hitArea.x = newPosition.x;
            this.hitArea.y = newPosition.y;

            // 移動後に再度衝突していないかチェックする。
            block = Util.checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap());
        }

        // 画面外に出ていないかチェックする。
        this._checkScreenArea();

        // オプションがある場合はオプションを移動前の座標へ移動する。
        if (this.option !== null) {
            this.option.move(prevX, prevY);
        }
    }

    /**
     * @function _checkScreenArea
     * @breif 画面外に出ていないかチェックする
     * 画面外に出ていないかチェックする。
     * 画面外に出ていた場合は画面内に座標を補正する。
     */
    _checkScreenArea() {

        // 左側画面範囲外には移動させないようにする。
        if (this.hitArea.x < 0) {
            this.hitArea.x = 0;
        }

        // 右側画面範囲外には移動させないようにする。
        if (this.hitArea.x > ScreenSize.STAGE_RECT.width - 1) {
            this.hitArea.x = ScreenSize.STAGE_RECT.width - 1;
        }

        // 上側画面範囲外には移動させないようにする。
        if (this.hitArea.y < 0) {
            this.hitArea.y = 0;
        }

        // 下側画面範囲外には移動させないようにする。
        if (this.hitArea.y > ScreenSize.STAGE_RECT.height - 1) {
            this.hitArea.y = ScreenSize.STAGE_RECT.height - 1;
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

        // 衝突している敵キャラクターを検索する。
        var hitCharacters = this.hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY, Character.type.ENEMY_SHOT]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            // 敵キャラクターの衝突処理を実行する。
            hitCharacters[0].hit(this, scene);

            // 敵キャラクターに接触した場合は死亡処理を行う。
            if (!this.noDeath) {

                // 死亡時エフェクトを作成する。
                scene.addCharacter(new PlayerDeathEffect(this.hitArea.x, this.hitArea.y, scene));

                // ステータスを死亡に変更する。
                this.status = STATUS.DEATH;

                // 画像を非表示にする。
                this.sprite.alpha = 0;

                // シーンの死亡時処理を実行する。
                scene.miss();
            }
        }
    }

    /**
     * @function _checkGraze
     * @breif かすり判定処理
     * 敵弾とのかすり判定を処理する。
     *
     * @param [in/out] scene シーン
     */
    _checkGraze(scene) {

        // かすり当たり判定位置を更新する。
        this.grazeArea.x = this.hitArea.x;
        this.grazeArea.y = this.hitArea.y;

        // かすっている敵弾を検索する。
        var hitCharacters = this.grazeArea.getHitCharacter(scene.characters, [Character.type.ENEMY_SHOT]);

        // かすっている敵弾とかすり処理を行う。
        for (var i = 0; i < hitCharacters.length; i++) {

            // チキンゲージを増加させる。
            this.chickenGauge += hitCharacters[i].graze();

            // 上限値を超えた場合は上限値に補正する。
            if (this.chickenGauge > 1) {
                this.chickenGauge = 1;
            }
        }
    }
    
    /**
     * @function _updateOptionCount
     * @brief オプション個数更新
     * チキンゲージに応じてオプション個数を更新する。
     * 
     * @param [in/out] scene シーン
     */
    _updateOptionCount(scene) {

        // チキンゲージからオプション個数を計算する
        var count = Math.floor(this.chickenGauge / (1 / (MAX_OPTION_COUNT + 1)));

        // オプション個数がある場合
        if (count > 0) {

            // オプションが作成されていなければ作成する。
            if (this.option === null) {
                this.option = new PlayerOption(this.hitArea.x, this.hitArea.y, this.shield, scene);
                scene.addCharacter(this.option);
            }

            // オプションにオプション個数を設定する。
            this.option.setCount(count, scene);
        }
        // オプション個数がない場合
        else {

            // オプションが作成されていれば削除する。
            if (this.option !== null) {

                // オプションにオプション個数を設定し、削除処理を行う。
                this.option.setCount(count, scene);

                // メンバ変数をクリアする。
                this.option = null;
            }
        }
    }
}
