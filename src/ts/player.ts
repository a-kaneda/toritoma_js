import ScreenSize from './screensize'
import Character from './character'
import Util from './util'
import Collider from './collider'
import PlayerShot from './playershot'
import PlayerDeathEffect from './playerdeatheffect'
import PlayerOption from './playeroption'
import PlayingScene from './playingscene'
import Rect from './rect'
import CharacterIF from './characterif'

// キーボード入力による移動スピード
const SPEED_BY_KEY = 2;
// タッチ操作による移動スピード
const SPEED_BY_TOUCH = 1.8 / ScreenSize.ZOOM_RATIO;
// ゲームパッドによる移動スピード
const SPEED_BY_GAMEPAD = 3;
// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅
const HIT_WIDTH = 2;
// 当たり判定高さ
const HIT_HEIGHT = 2;
// ブロックとの当たり判定幅
const BLOCK_HIT_WIDTH = 4;
// ブロックとの当たり判定高さ
const BLOCK_HIT_HEIGHT = 4;
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
 * 自機。ユーザー操作に応じて移動する。
 */
class Player implements CharacterIF {

    /** スプライト */
    private _sprite: phina.pixi.Sprite;
    /** アニメーション */
    private _animation: phina.accessory.FrameAnimation;
    /** 当たり判定 */
    private _hitArea: Collider;
    /** 障害物との当たり判定 */
    private _blockHitArea: Collider;
    /** かすり当たり判定 */
    private _grazeArea: Collider;
    /** 弾発射間隔 */
    private _shotInterval: number;
    /** 状態 */
    private _status: number;
    /** 無敵時間 */
    private _invincibleFrame: number;
    /** チキンゲージ */
    private _chickenGauge: number;
    /** オプション */
    private _option: PlayerOption | null;
    /** シールド使用不使用 */
    private _shield: boolean;
    /** (デバッグ用)死亡しない */
    private _noDeath: boolean;
    /** (デバッグ用)弾を発射しない */
    private _noShot: boolean;

    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
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
        this._animation.gotoAndPlay('player_normal');

        // 当たり判定を作成する。
        this._hitArea = new Collider(x, y, HIT_WIDTH, HIT_HEIGHT);

        // 壁との当たり判定を作成する。
        this._blockHitArea = new Collider(x, y, BLOCK_HIT_WIDTH, BLOCK_HIT_HEIGHT);

        // かすり当たり判定を作成する。
        this._grazeArea = new Collider(x, y, GRAZE_WIDTH, GRAZE_HEIGHT);

        // 弾発射間隔を初期化する。
        this._shotInterval = 0;

        // 初期状態は通常状態とする。
        this._status = STATUS.NORMAL;

        // 無敵時間を初期化する。
        this._invincibleFrame = 0;

        // チキンゲージを初期化する。
        this._chickenGauge = 0;

        // 最初はオプションなしとする。
        this._option = null;

        // シールド使用不使用を初期化する。
        this._shield = false;

        // デバッグ用: 死亡しないようにする。
        if (localStorage.noDeath === 'true') {
            this._noDeath = true;
        }
        else {
            this._noDeath = false;
        }

        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this._noShot = true;
        }
        else {
            this._noShot = false;
        }
    }

    /** キャラクター種別 */
    public get type(): number {
        return Character.type.PLAYER;
    }

    /** 位置とサイズ */
    public get rect(): Rect {
        return this._hitArea;
    }

    /** チキンゲージの溜まっている比率。0～1の範囲。 */
    public get chickenGauge(): number {
        return this._chickenGauge;
    }

    /**
     * シールド使用不使用。
     * オプションがあればオプションの設定も変更する。
     */
    public set shield(value: boolean) {

        // シールド使用不使用を設定する。
        this._shield = value;

        // オプションがある場合はオプションのシールド使用不使用を設定する。
        if (this._option !== null) {
            this._option.setShield(value);
        }
    }

    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * ブロックやキャラクターとの当たり判定処理を行う。
     * 自機弾を発射する。
     * @param scene シーン
     */
    public update(scene: PlayingScene): void {

        // 壁との当たり判定の位置を更新する。
        this._blockHitArea.x = this._hitArea.x;
        this._blockHitArea.y = this._hitArea.y;

        // ブロックと衝突している場合
        if (this._blockHitArea.checkCollidedBlock(this._blockHitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {

            // ブロックによって押されて移動する。
            const dest = this._blockHitArea.pushCharacter(this._blockHitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this._blockHitArea.x = this._hitArea.x = dest.x;
            this._blockHitArea.y = this._hitArea.y = dest.y;
        }

        // 無敵状態の場合
        if (this._status === STATUS.INVINCIBLE) {

            // 無敵状態フレーム数をカウントする。
            this._invincibleFrame--;

            // 無敵状態フレーム数を経過した場合
            if (this._invincibleFrame <= 0) {

                // ステータスを通常状態に戻す。
                this._status = STATUS.NORMAL;

                // 点滅アニメーションを停止する。
                this._sprite.tweener.clear();

                // アニメーションが非表示で終了している可能性があるので、
                // 表示状態にする。
                this._sprite.alpha = 1;
            }
        } 

        // シーンの状態がプレイ中の場合のみ、自機発射や当たり判定等の処理を行う。
        if (scene.isPlaying) {

            // 通常状態、無敵状態の場合
            if (this._status === STATUS.NORMAL || this._status === STATUS.INVINCIBLE) {

                // 自機弾発射間隔が経過した場合は自機弾を発射する。
                this._shotInterval++;
                if (this._shotInterval >= SHOT_INTERVAL && !this._noShot) {
                    scene.addCharacter(new PlayerShot(this._hitArea.x, this._hitArea.y, false, scene));
                    this._shotInterval = 0;
                }

                // 敵弾とのかすり判定を行う。
                this._checkGraze(scene);

                // シールド使用時はチキンゲージを消費する。
                if (this._shield) {
                    this.addChickenGauge(-CONSUMPTION_GAUGE);
                }
            }

            // 通常状態の場合
            if (this._status === STATUS.NORMAL) {

                // 敵キャラとの当たり判定処理を行う。
                this._checkHitChacater(scene);
            }
        }

        // オプション個数を更新する。
        this._updateOptionCount(scene);

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
     * キーボードの左キー入力による移動処理を行う。
     * @param scene シーン
     */
    public moveKeyLeft(scene: PlayingScene): void {
        this._move(this._hitArea.x - SPEED_BY_KEY,
                   this._hitArea.y,
                   scene);
    }

    /**
     * キーボードの右キー入力による移動処理を行う。
     * @param scene シーン
     */
    public moveKeyRight(scene: PlayingScene): void {
        this._move(this._hitArea.x + SPEED_BY_KEY,
                   this._hitArea.y,
                   scene);
    }

    /**
     * キーボードの上キー入力による移動処理を行う。
     * @param scene シーン
     */
    public moveKeyUp(scene: PlayingScene): void {
        this._move(this._hitArea.x,
                   this._hitArea.y - SPEED_BY_KEY,
                   scene);
    }

    /**
     * キーボードの下キー入力による移動処理を行う。
     * @param scene シーン
     */
    public moveKeyDown(scene: PlayingScene): void {
        this._move(this._hitArea.x,
                   this._hitArea.y + SPEED_BY_KEY,
                   scene);
    }

    /**
     * タッチ入力による移動処理を行う。
     * @param x x座標方向のタッチ位置スライド量
     * @param y y座標方向のタッチ位置スライド量
     * @param scene シーン
     */
    public moveTouch(x: number, y: number, scene: PlayingScene): void {
        this._move(this._hitArea.x + x * SPEED_BY_TOUCH,
                   this._hitArea.y + y * SPEED_BY_TOUCH,
                   scene);
    }

    /**
     * ゲームパッド入力による移動処理を行う。
     * @param x x座標方向のスティック入力値
     * @param y y座標方向のスティック入力値
     * @param scene シーン
     */
    public moveGamepad(x: number, y: number, scene: PlayingScene): void {
        this._move(this._hitArea.x + x * SPEED_BY_GAMEPAD,
                   this._hitArea.y + y * SPEED_BY_GAMEPAD,
                   scene);
    }

    /**
     * 死亡後の復活処理を行う。
     * 一定時間無敵状態とし、画像を点滅表示する。
     * @param scene シーン
     */
    public rebirth(scene: PlayingScene): void {

        // ステータスを無敵状態にする。
        this._status = STATUS.INVINCIBLE;

        // チキンゲージを初期化する。
        this._chickenGauge = 0;

        // 無敵状態フレーム数を設定する。
        this._invincibleFrame = INVINCIBLE_FRAME;

        // 画像を表示する。
        this._sprite.alpha = 1;

        // 点滅アニメーションを実行する。
        // 100ms周期で表示、非表示を切り替える。
        this._sprite.tweener
            .wait(100)
            .set({ alpha: 0 })
            .wait(100)
            .set({ alpha: 1 })
            .setLoop(true)
            .play();
    }

    /**
     * チキンゲージを増加する。
     * @param increase 増加量（マイナスの場合、減少）
     * @return 自インスタンス
     */
    public addChickenGauge(increase: number): this {
        
        this._chickenGauge += increase;
        
        // 下限値を下回った場合は下限値にする。
        if (this._chickenGauge < 0) {
            this._chickenGauge = 0;
        }

        // 上限値を超えた場合は上限値にする。
        if (this._chickenGauge > 1) {
            this._chickenGauge = 1;
        }

        return this;
    }

    /**
     * 座標を変更し、各種当たり判定処理を行う。
     * @param x 移動後のx座標
     * @param y 移動後のy座標
     * @param scene シーン
     */
    private _move(x: number, y: number, scene: PlayingScene): void {

        // 前回値を保存する。
        const prevX = this._blockHitArea.x;
        const prevY = this._blockHitArea.y;

        // 死亡中でない場合のみ移動を行う。
        if (this._status != STATUS.DEATH) {
            // 現在の座標を変更する。
            this._blockHitArea.x = x;
            this._blockHitArea.y = y;
        }

        // 衝突しているブロックがある場合は移動する。
        this._blockHitArea.collideBlock(prevX, prevY, scene.getStagePosition(), scene.getBlockMap());

        // 移動した結果を当たり判定に反映させる。
        this._hitArea.x = this._blockHitArea.x;
        this._hitArea.y = this._blockHitArea.y;

        // 画面外に出ていないかチェックする。
        this._checkScreenArea();

        // オプションがある場合はオプションを移動前の座標へ移動する。
        if (this._option !== null) {
            this._option.move(prevX, prevY);
        }
    }

    /**
     * 画面外に出ていないかチェックする。
     * 画面外に出ていた場合は画面内に座標を補正する。
     */
    private _checkScreenArea(): void {

        // 左側画面範囲外には移動させないようにする。
        if (this._hitArea.x < 0) {
            this._hitArea.x = 0;
        }

        // 右側画面範囲外には移動させないようにする。
        if (this._hitArea.x > ScreenSize.STAGE_RECT.width - 1) {
            this._hitArea.x = ScreenSize.STAGE_RECT.width - 1;
        }

        // 上側画面範囲外には移動させないようにする。
        if (this._hitArea.y < 0) {
            this._hitArea.y = 0;
        }

        // 下側画面範囲外には移動させないようにする。
        if (this._hitArea.y > ScreenSize.STAGE_RECT.height - 1) {
            this._hitArea.y = ScreenSize.STAGE_RECT.height - 1;
        }
    }

    /**
     * 他のキャラクターとの当たり判定を処理する。
     * @param scene シーン
     */
    private _checkHitChacater(scene: PlayingScene): void {

        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [Character.type.ENEMY, Character.type.ENEMY_SHOT]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            // 先頭のキャラクターとの衝突処理を実行する。
            const topCharacter = hitCharacters[0];

            // 敵弾の場合は削除する。
            if (Character.isEnemyShot(topCharacter)) {
                scene.removeCharacter(topCharacter);
            }

            // 敵キャラクターに接触した場合は死亡処理を行う。
            if (!this._noDeath) {

                // 死亡時エフェクトを作成する。
                scene.addCharacter(new PlayerDeathEffect(this._hitArea.x, this._hitArea.y, scene));

                // ステータスを死亡に変更する。
                this._status = STATUS.DEATH;

                // 画像を非表示にする。
                this._sprite.alpha = 0;

                // シーンの死亡時処理を実行する。
                scene.miss();
            }
        }
    }

    /**
     * 敵弾とのかすり判定を処理する。
     * @param scene シーン
     */
    private _checkGraze(scene: PlayingScene): void {

        // かすり当たり判定位置を更新する。
        this._grazeArea.x = this._hitArea.x;
        this._grazeArea.y = this._hitArea.y;

        // かすっている敵弾を検索する。
        const hitCharacters = this._grazeArea.getHitCharacter(scene.characters, [Character.type.ENEMY_SHOT]);

        // かすっている敵弾とかすり処理を行う。
        for (let character of hitCharacters) {

            if (Character.isEnemyShot(character)) {
                
                // チキンゲージを増加させる。
                this.addChickenGauge(character.graze());
            }
        }
    }
    
    /**
     * チキンゲージに応じてオプション個数を更新する。
     * @param scene シーン
     */
    private _updateOptionCount(scene: PlayingScene): void {

        // チキンゲージからオプション個数を計算する
        const count = Math.floor(this._chickenGauge / (1 / (MAX_OPTION_COUNT + 1)));

        // オプション個数がある場合
        if (count > 0) {

            // オプションが作成されていなければ作成する。
            if (this._option === null) {
                this._option = new PlayerOption(this._hitArea.x, this._hitArea.y, this._shield, scene);
                scene.addCharacter(this._option);
            }

            // オプションにオプション個数を設定する。
            this._option.setCount(count, scene);
        }
        // オプション個数がない場合
        else {

            // オプションが作成されていれば削除する。
            if (this._option !== null) {

                // オプションにオプション個数を設定し、削除処理を行う。
                this._option.setCount(count, scene);

                // メンバ変数をクリアする。
                this._option = null;
            }
        }
    }
}

export default Player;
