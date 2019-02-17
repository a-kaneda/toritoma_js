import PointDevice from './pointdevice';
import MyColor from './mycolor';
import ScreenSize from './screensize';
import ControlSize from './controlsize';
import Character from './character';
import Player from './player';
import Life from './life';
import ChickenGauge from './chickengauge';
import BossLifeGauge from './bosslifegauge';
import ShieldButton from './shieldbutton';
import CharacterIF from './characterif';
import Point from './point';
import Scene from './scene';
import TitleScene from './titlescene';
import MainScene from './mainscene.d';
import MenuLayer from './menulayer';
import ImageButton from './imagebutton';
import StageStatus from './stagestatus';
import GamepadManager from './gamepadmanager';

// 初期残機
const INITIAL_LIFE = 2;
// 残機位置x座標(ステージ左端からの位置)
const LIFE_POS_X = 32;
// 残機位置y座標(画面上からの位置)
const LIFE_POS_Y = 12;
// スコアラベル位置(画面上からの位置)
const SCORE_POS_Y = 12;
// 復活待機フレーム数
const REBIRTH_WAIT = 60;
// チキンゲージ位置(画面下からの位置)
const CHICKEN_GAUGE_POS_Y = 36;
// シールドボタン位置x座標(画面右からの位置)
const SHIELD_BUTTON_POS_X = 50;
// シールドボタン位置y座標(画面下からの位置)
const SHIELD_BUTTON_POS_Y = 50;
// 一時停止ボタン位置x座標(画面右からの位置)
const PUASE_BUTTON_POS_X = 28;
// 一時停止ボタン位置y座標(画面上からの位置)
const PAUSE_BUTTON_POS_Y = 28;
// ボスHPゲージ位置x座標(ステージ左端からの位置)
const BOSS_LIFE_GAUGE_POS_X = 360;
// ボスHPゲージ位置x座標(画面上からの位置)
const BOSS_LIFE_GAUGE_POS_Y = 144;
// 自機弾衝突音発生間隔
const HIT_PLAYER_SHOT_INTERVAL = 6;
// ゲームオーバー時の待機時間（msec）
const GAMEOVER_INTERVAL = 1000;
// ゲームオーバーラベルの配置位置y座標
const GAMEOVER_LABEL_POS_Y = Math.round(ScreenSize.STAGE_RECT.height * ScreenSize.ZOOM_RATIO / 2);
// 初期ステージ番号
const INITIAL_STAGE = 1;
// ステージ数
const STAGE_COUNT = 6;
// ステージクリア後の待機フレーム数
const STAGE_CLEAR_WAIT = 540;
// ステージクリアラベルの配置位置y座標
const STAGE_CLEAR_LABEL_POS_Y = Math.round(ScreenSize.STAGE_RECT.height * ScreenSize.ZOOM_RATIO / 2);

// シーンの状態
enum SCENE_STATE {
    PLAYING,        // プレイ中
    WAIT_GAMEOVER,  // ゲームオーバー待機中
    GAMEOVER,       // ゲームオーバー
    PAUSE,          // ポーズ中
    QUIT_MENU,      // ゲーム終了メニュー
    STAGE_CLEAR,    // ステージクリア
}

// 入力状態
type INPUT_STATE = {
    shield: boolean,    // シールドの使用
    pause: boolean,     // 一時停止
}

/**
 * ゲームの各ステージをプレイするメインのシーン。
 */
class PlayingScene implements Scene {

    /** phina.jsのシーンインスタンス */
    private _phinaScene: MainScene;
    /** 全ノードのルート */
    private _rootNode: phina.display.DisplayElement;
    /** 背景レイヤー。 */
    private _backgroundLayer: phina.display.PixiLayer;
    /** キャラクターレイヤー。 */
    private _characterLayer: phina.display.PixiLayer;
    /** 枠レイヤー。 */
    private _frameLayer: phina.display.PixiLayer;
    /** 情報レイヤー。 */
    private _infoLayer: phina.display.DisplayElement;
    /** ステージ状態 */
    private _stageStatus: StageStatus;
    /** スコアラベルの背景部分。 */
    private _scoreLabelBase: phina.display.RectangleShape;
    /** スコアラベル。 */
    private _scoreLabel: phina.display.Label;
    /** スコア。 */
    private _score: number;
    /** 残機表示 */
    private _lifeLabel: Life;
    /** シールドボタン。 */
    private _shieldButton: ShieldButton;
    /** 一時停止ボタン */
    private _pauseButton: ImageButton;
    /** チキンゲージ。 */
    private _chickenGauge: ChickenGauge;
    /** ボスHPゲージ。 */
    private _bossLifeGauge: BossLifeGauge;
    /** 復活待機フレーム数。 */
    private _rebirthWait: number;
    /** キャラクター管理配列。 */
    private _characters: CharacterIF[];
    /** 自機 */
    private _player: Player;
    /** タッチ情報。 */
    private _touch: {id: number, x: number, y:number};
    /** 自機弾衝突フラグ */
    private _isHitPlayerShot: boolean;
    /** 自機弾衝突音発生間隔 */
    private _hitPlayerShotInterval: number;
    /** シーンの状態 */
    private _state: SCENE_STATE;
    /** 一時停止時のレイヤー */
    private _pauseLayer: MenuLayer;
    /** 終了メニュー時のレイヤー */
    private _quitLayer: MenuLayer;
    /** ステージクリア時のラベル */
    private _stageClearLabel: phina.display.Label;

    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene: MainScene) {

        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;

        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);

        // 背景レイヤーを作成する。
        this._backgroundLayer = new phina.display.PixiLayer({
            width: ScreenSize.SCREEN_WIDTH, 
            height: ScreenSize.SCREEN_HEIGHT
        }).addChildTo(this._rootNode);

        // 背景レイヤーの位置、サイズを設定する。
        this._backgroundLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
            ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this._backgroundLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._backgroundLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // キャラクターレイヤーを作成する。
        this._characterLayer = new phina.display.PixiLayer({
            width: ScreenSize.SCREEN_WIDTH, 
            height: ScreenSize.SCREEN_HEIGHT
        }).addChildTo(this._rootNode);

        // キャラクターレイヤーの位置、サイズを設定する。
        this._characterLayer.setPosition(ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO,
            ScreenSize.STAGE_RECT.y * ScreenSize.ZOOM_RATIO);
        this._characterLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._characterLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 枠レイヤーを作成する。
        this._frameLayer = new phina.display.PixiLayer({
            width: ScreenSize.SCREEN_WIDTH, 
            height: ScreenSize.SCREEN_HEIGHT
        }).addChildTo(this._rootNode);

        // 枠レイヤーの位置、サイズを設定する。
        this._frameLayer.scaleX = ScreenSize.ZOOM_RATIO;
        this._frameLayer.scaleY = ScreenSize.ZOOM_RATIO;

        // 情報レイヤーを作成する。
        this._infoLayer = new phina.display.DisplayElement().addChildTo(this._rootNode);

        // ステージの外枠を作成する。
        this._createFrame();

        // スコアラベルの背景部分を作成する。
        this._scoreLabelBase = new phina.display.RectangleShape({
            height: 22,
            width: 148,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this._phinaScene.gridX.center()),
            y: SCORE_POS_Y,
        }).addChildTo(this._infoLayer);

        // スコアラベルを作成する。
        this._scoreLabel = new phina.display.Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._scoreLabelBase);

        // スコアを初期化する。
        this._score = 0;

        // 残機表示を作成する。
        this._lifeLabel = new Life();

        // 残機表示の位置を設定する。
        this._lifeLabel.sprite.addChildTo(this._infoLayer);
        this._lifeLabel.sprite.x = ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO + LIFE_POS_X;
        this._lifeLabel.sprite.y = LIFE_POS_Y;

        // 残機を初期化する。
        this._lifeLabel.life = INITIAL_LIFE;

        // シールドボタンを作成する。
        this._shieldButton = new ShieldButton();

        // モバイル機器の場合のみシールドボタンを配置する。
        if (Platform.isMobile()) {
            this._shieldButton.sprite.addChildTo(this._infoLayer);
            this._shieldButton.sprite.x = ScreenSize.SCREEN_WIDTH - SHIELD_BUTTON_POS_X; 
            this._shieldButton.sprite.y = ScreenSize.SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y;
        }
        
        // 一時停止ボタンを作成する。
        this._pauseButton = new ImageButton('pauseButton');

        // モバイル機器の場合のみ一時停止ボタンを配置する。
        if (Platform.isMobile()) {
            this._pauseButton.setPosition(ScreenSize.SCREEN_WIDTH - PUASE_BUTTON_POS_X, PAUSE_BUTTON_POS_Y)
            .onPush(() => {this._pause()})
            .addChildTo(this._infoLayer);
        }

        // チキンゲージを作成する。
        this._chickenGauge = new ChickenGauge();

        // チキンゲージの位置を設定する。
        this._chickenGauge.sprite.addChildTo(this._infoLayer);
        this._chickenGauge.sprite.x = Math.round(this._phinaScene.gridX.center());
        this._chickenGauge.sprite.y = ScreenSize.SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;

        // ボスHPゲージを作成する。
        this._bossLifeGauge = new BossLifeGauge();

        // ボスHPゲージの位置を設定する。
        this._bossLifeGauge.sprite.addChildTo(this._infoLayer);
        this._bossLifeGauge.sprite.x = ScreenSize.STAGE_RECT.x * ScreenSize.ZOOM_RATIO + BOSS_LIFE_GAUGE_POS_X;
        this._bossLifeGauge.sprite.y = BOSS_LIFE_GAUGE_POS_Y;

        // ボスHPゲージは初期状態は非表示にする。
        this._bossLifeGauge.sprite.alpha = 0;

        // 復活待機フレーム数を初期化する。
        this._rebirthWait = 0;

        // キャラクター管理配列を作成する。
        this._characters = [];

        // 自機を作成する。
        this._player = new Player(Math.round(ScreenSize.STAGE_RECT.width / 4),
            Math.round(ScreenSize.STAGE_RECT.height / 2),
            this);

        // タッチ情報を初期化する。
        this._touch = {id: -1, x:0, y:0};

        // 自機弾衝突フラグを初期化する。
        this._isHitPlayerShot = false;

        // 自機弾衝突音発生間隔を初期化する。
        this._hitPlayerShotInterval = HIT_PLAYER_SHOT_INTERVAL;

        // 一時停止レイヤーを作成する。
        this._pauseLayer = new MenuLayer('PAUSE', 'RESUME', 'QUIT')
        .onLeftButton(() => {this._resume()})
        .onRightButton(() => {this._viewQuitMenu()});

        // 終了メニュー時のレイヤーを作成する。
        this._quitLayer = new MenuLayer('QUIT GAME?', 'YES', 'NO')
        .onLeftButton(() => {this._replaceScene()})
        .onRightButton(() => {this._viewPauseMenu()});

        // ステージクリア時のラベルを作成する。
        this._stageClearLabel = new phina.display.Label({
            text: 'STAGE CLEAR',
            fontSize: 36,
            backgroundColor: MyColor.BACK_COLOR,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
            x: Math.round(this._phinaScene.gridX.center()),
            y: STAGE_CLEAR_LABEL_POS_Y,
            strokeWidth: 0,
            padding: 0,
        });

        // 初期ステージを読み込む。
        if (localStorage.initialStage) {
            this._stageStatus = new StageStatus(parseInt(localStorage.initialStage, 10), this._backgroundLayer);
        }
        else {
            this._stageStatus = new StageStatus(INITIAL_STAGE, this._backgroundLayer);
        }

        // 初期状態はプレイ中とする。
        this._state = SCENE_STATE.PLAYING;
        this._changeState(SCENE_STATE.PLAYING);
    }

    /**
     * 更新処理。
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     * @param app アプリケーション
     */
    public update(app: phina.game.GameApp): void {

        // ゲームパッドの状態を更新する。
        GamepadManager.get().update();

        // プレイ中でステージクリアフラグがたっている場合は状態を遷移する。
        if (this._state === SCENE_STATE.PLAYING && this._stageStatus.isStageCleared) {
            
            // ステージクリアのジングルを再生する。
            phina.asset.SoundManager.playMusic('clear', 0, false);

            // 状態をステージクリアに遷移する。
            this._changeState(SCENE_STATE.STAGE_CLEAR);
        }
        
        // 入力処理を行う。
        this._input(app);

        // プレイ中、待機中、ステージクリアの場合
        if (this._state === SCENE_STATE.PLAYING ||
            this._state === SCENE_STATE.WAIT_GAMEOVER ||
            this._state === SCENE_STATE.STAGE_CLEAR) {

            // ステージやキャラクターの状態を更新する。
            this._updateStageData();
        }

        // チキンゲージ表示を更新する。
        this._chickenGauge.rate = this._player.chickenGauge;

        // スコア表示を更新する。
        this._scoreLabel.text = 'SCORE: ' + ('000000' + this._score).slice(-6);

        // ステージクリア状態の場合
        if (this._state === SCENE_STATE.STAGE_CLEAR) {

            // 自機が死んでいない場合
            if (this._rebirthWait <= 0) {

                // ステージクリア後待機時間を経過した場合は次のステージへ移行する。
                if (this._stageStatus.isOverStageClearWait) {

                    // 最終ステージでない場合
                    if (this._stageStatus.stageNumber < STAGE_COUNT) {

                        // ステージを一つ進める。
                        this._setStage(this._stageStatus.stageNumber + 1);
                    }
                    // 最終ステージの場合
                    else {
                        
                        // 1ステージに戻る。
                        this._setStage(1);
                    }
                    
                    // プレイ中状態に遷移する。
                    this._changeState(SCENE_STATE.PLAYING);
                }
            }
        }
    }

    /**
     * キャラクターを追加する。
     * @param character 追加するキャラクター
     */
    public addCharacter(character: CharacterIF): void {
        this._characters.push(character);
    }

    /**
     * キャラクターのスプライトを追加する。
     * @param sprite 追加するスプライト
     */
    public addCharacterSprite(sprite: phina.display.DisplayElement): void {
        sprite.addChildTo(this._characterLayer);
    }

    /**
     * キャラクターを削除する。
     * @param character 削除するキャラクター
     */
    public removeCharacter(character: CharacterIF): void {

        // シーン中のキャラクター配列から削除する。
        const i = this._characters.indexOf(character);
        if (i >= 0) {
            this._characters.splice(i, 1);
        }

        // キャラクターの削除処理を行う。
        character.remove();
    }

    /**
     * スコアを追加する。
     * @param score 追加するスコア
     */
    public addScore(score: number): void {
        this._score += score;
    }

    /**
     * 
     * @param increase 
     */
    public addChickenGauge(increase: number): void {
        this._player.addChickenGauge(increase);
    }

    /**
     * ブロックマップを取得する。
     * @return ブロックマップ
     */
    public getBlockMap(): TileMapObject[][] {
        return this._stageStatus.blockMap;
    }

    /**
     * ステージが左方向に何ドット移動しているかを取得する。
     * @return ステージ位置
     */
    public getStagePosition(): number {
        return this._stageStatus.position;
    }

    /** ステージのスクロールスピード */
    public get scrollSpeed(): number {
        return this._stageStatus.scrollSpeed;
    }

    /** キャラクター管理配列 */
    public get characters(): CharacterIF[] {
        return this._characters;
    }

    /** 自機の位置 */
    public get playerPosition(): Point {
        return {
            x: this._player.rect.x,
            y: this._player.rect.y,
        };
    }

    /** 自機弾衝突フラグ */
    public set isHitPlayerShot(value: boolean) {
        this._isHitPlayerShot = value;
    }

    /** ボスHPゲージの比率。 */
    public set bossLife(value: number) {

        // ボスHPゲージを表示する。
        this._bossLifeGauge.sprite.alpha = 1;

        // ゲージを設定する。
        this._bossLifeGauge.rate = value;
    }

    /** プレイ中状態かどうか。 */
    public get isPlaying(): boolean {

        if (this._state === SCENE_STATE.PLAYING) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    public miss(): void {

        // 残機が残っている場合
        if (this._lifeLabel.life > 0) {

            // 残機を一つ減らす。
            this._lifeLabel.life = this._lifeLabel.life - 1;

            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this._rebirthWait = REBIRTH_WAIT;

            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        // 残機が残っていない場合
        else {

            // 状態を待機中に変更する。
            this._changeState(SCENE_STATE.WAIT_GAMEOVER);

            // BGMを停止する。
            phina.asset.SoundManager.stopMusic();

            // 一定時間後にゲームオーバー状態に遷移する。
            setTimeout(() => {this._gameOver()}, GAMEOVER_INTERVAL);
        }
    }

    /**
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     * @return 敵弾が無効化されているかどうか
     */
    public isDisableEnemyShot(): boolean {

        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this._rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * ステージクリア時の処理を行う。
     */
    public stageClear(): void {

        // ステージ状態をクリア状態にする。
        this._stageStatus.stageClear();
    }

    /**
     * 入力処理を行う。
     * @param app アプリケーション
     */
    private _input(app: phina.game.GameApp): void {

        // 状態に応じて入力処理を振り分ける。
        switch (this._state) {
            case SCENE_STATE.PLAYING:
            case SCENE_STATE.STAGE_CLEAR:
                this._inputOnPlaying(app);
                break;
            case SCENE_STATE.GAMEOVER:
                this._inputOnGameOver(app);
                break;
            case SCENE_STATE.PAUSE:
                this._pauseLayer.input(app.keyboard);
                break;
            case SCENE_STATE.QUIT_MENU:
                this._quitLayer.input(app.keyboard);
                break;
            default:
                break;
        }
    }

    /**
     * プレイ中の入力処理を行う。
     * @param app アプリケーション
     */
    private _inputOnPlaying(app: phina.game.GameApp): void {

        // キーボード入力を行う。
        const keyboard = this._inputKeyboard(app);

        // タッチ入力を行う。
        const touch = this._inputTouch(app);

        // ゲームパッド入力を行う。
        const gamepad = this._inputGamepad();

        // プレイ中の場合はシールドと一時停止の処理を行う。
        // その他の状態のときはキャラクターの移動のみ許可する。
        if (this._state === SCENE_STATE.PLAYING) {

            // シールドボタン入力状態に応じて自機の状態を変化させる。
            if (keyboard.shield || touch.shield || gamepad.shield) {

                this._player.shield = true;
            }
            else {
                this._player.shield = false;
            }

            // 一時停止が入力された場合は一時停止処理を行う。
            if (keyboard.pause || touch.pause || gamepad.pause) {
                this._pause();
            }
        }
        else {
            this._player.shield = false;            
        }
    }

    /**
     * ゲームオーバー時の入力処理を行う。
     * @param app アプリケーション
     */
    private _inputOnGameOver(app: phina.game.GameApp): void {

        // キーボードを取得する。
        const key = app.keyboard;

        // ゲームパッド管理クラスを取得する。
        const gamepadManager = GamepadManager.get();

        // キーボードのzキーか、ゲームパッドのAボタンでタイトル画面に戻る。
        if (key.getKeyDown('z') || gamepadManager.getButtonPressed('a')) {
            this._replaceScene();
        }

    }

    /**
     * キーボードの入力処理を行う。
     * @param app アプリケーション
     */
    private _inputKeyboard(app: phina.game.GameApp): INPUT_STATE {

        // キーボードを取得する。
        const key = app.keyboard;

        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        }

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this._player.moveKeyLeft(this);
        }
        if (key.getKey('right')) {
            this._player.moveKeyRight(this);
        }
        if (key.getKey('up')) {
            this._player.moveKeyUp(this);
        }
        if (key.getKey('down')) {
            this._player.moveKeyDown(this);
        }

        // zキーでシールドを使用する。
        if (key.getKey('z')) {
            inputState.shield = true;
        }

        // ESCキーで一時停止する。
        if (key.getKeyDown('escape')) {
            inputState.pause = true;            
        }

        return inputState;
    }

    /**
     * タッチの入力処理を行う。
     * @param app アプリケーション
     */
    private _inputTouch(app: phina.game.GameApp): INPUT_STATE {

        const touches = app.pointers;
        let sliding = false;

        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        }

        for (let i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!PointDevice.isMouseUsed) {

                // スライド操作をしていない状態だった場合、最初のタッチ位置を記憶する。
                if (this._touch.id < 0) {
                    this._touch.id = touches[i].id;
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }

                // スライド操作をしている場合はスライド量に応じて自機を移動する。
                if (this._touch.id == touches[i].id) {
                    this._player.moveTouch(touches[i].x - this._touch.x, touches[i].y - this._touch.y, this);
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
            }
        }

        // スライドしていない場合はタッチ情報を初期化する。
        if (!sliding) {
            this._touch.id = -1;
            this._touch.x = 0;
            this._touch.y = 0;
        }

        // シールドボタンがタッチされている場合はシールドを使用する。
        if (this._shieldButton.isTouch) {
            inputState.shield = true;
        }

        return inputState;
    }

    /**
     * ゲームパッドの入力処理を行う。
     */
    private _inputGamepad(): INPUT_STATE {

        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        }

        // ゲームパッド管理クラスを取得する。
        const gamepadManager = GamepadManager.get();

        // アナログスティックの入力を取得する。
        const stick_x = gamepadManager.getAxesX(0);
        const stick_y = gamepadManager.getAxesY(0);

        // アナログスティックの入力値が閾値を超えている場合は移動する。
        if (Math.sqrt(stick_x * stick_x + stick_y * stick_y) > 0.5) {
            this._player.moveGamepad(stick_x, stick_y, this);
        }

        // Aボタンでシールドを使用する。
        if (gamepadManager.getButtonPressed('a')) {
            inputState.shield = true;
        }

        // STARTボタンで一時停止する。
        if (gamepadManager.getButtonDown('start')) {
            inputState.pause = true;
        }

        return inputState;
    }

    /**
     * ステージの外側の枠と背景を作成する。
     */
    private _createFrame(): void {

        // ステージの外側の背景を作成する。
        this._createFrameBack();

        // ステージの外側の枠を作成する。
        this._createFrameBar();
    }

    /**
     * ステージの外側の背景を作成する。
     */
    private _createFrameBack(): void {

        {
            // 左側の枠の座標を計算する。
            let x = 0;
            let y = 0;
            let width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            let height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

            // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
            if (width % ControlSize.frameBack.width > 0) {
                x -= ControlSize.frameBack.width - width % ControlSize.frameBack.width;
                width += ControlSize.frameBack.width - width % ControlSize.frameBack.width;
            }

            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height > 0) {
                y -= ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
                height += ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
            }

            // 背景を並べる。
            for (let i = 0; i < width; i += ControlSize.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.frameBack.height) {
                    const back = new phina.pixi.Sprite('control', 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(ControlSize.frameBack.x, 
                        ControlSize.frameBack.y, 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }

        {
            // 右側の枠の座標を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            let y = 0;
            const width = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            let height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO;

            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height > 0) {
                y -= ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
                height += ControlSize.frameBack.height - ScreenSize.STAGE_RECT.height % ControlSize.frameBack.height;
            }

            // 背景を並べる。
            for (let i = 0; i < width; i += ControlSize.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.frameBack.height) {
                    const back = new phina.pixi.Sprite('control', 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(ControlSize.frameBack.x, 
                        ControlSize.frameBack.y, 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }

        {
            // 下側の枠の座標を計算する。
            const x = Math.ceil((ScreenSize.SCREEN_WIDTH / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.width) / 2);
            const y = ScreenSize.STAGE_RECT.height;
            const width = ScreenSize.STAGE_RECT.width;
            const height = ScreenSize.SCREEN_HEIGHT / ScreenSize.ZOOM_RATIO - ScreenSize.STAGE_RECT.height;

            // 背景を並べる。
            for (let i = 0; i < width; i += ControlSize.frameBack.width) {
                for (let j = 0; j < height; j += ControlSize.frameBack.height) {
                    const back = new phina.pixi.Sprite('control', 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.srcRect.set(ControlSize.frameBack.x, 
                        ControlSize.frameBack.y, 
                        ControlSize.frameBack.width, 
                        ControlSize.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
    }

    /**
     * ステージの外側の枠を作成する。
     */
    private _createFrameBar() {

        {
            // 左側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x - ControlSize.frameLeft.width;
            const height = ScreenSize.STAGE_RECT.height;

            // 枠を並べる。
            for (let i = 0; i < height; i += ControlSize.frameLeft.height) {
                const bar = new phina.pixi.Sprite('control', 
                    ControlSize.frameLeft.width, 
                    ControlSize.frameLeft.height);
                bar.srcRect.set(ControlSize.frameLeft.x, 
                    ControlSize.frameLeft.y, 
                    ControlSize.frameLeft.width, 
                    ControlSize.frameLeft.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }

        {
            // 右側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            const height = ScreenSize.STAGE_RECT.height;

            // 枠を並べる。
            for (let i = 0; i < height; i += ControlSize.frameRight.height) {
                const bar = new phina.pixi.Sprite('control', 
                    ControlSize.frameRight.width, 
                    ControlSize.frameRight.height);
                bar.srcRect.set(ControlSize.frameRight.x, 
                    ControlSize.frameRight.y, 
                    ControlSize.frameRight.width, 
                    ControlSize.frameRight.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }

        {
            // 下側の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x;
            const y = ScreenSize.STAGE_RECT.height;
            const width = ScreenSize.STAGE_RECT.width;

            // 枠を並べる。
            for (let i = 0; i < width; i += ControlSize.frameBottom.width) {
                const bar = new phina.pixi.Sprite('control', 
                    ControlSize.frameBottom.width, 
                    ControlSize.frameBottom.height);
                bar.srcRect.set(ControlSize.frameBottom.x, 
                    ControlSize.frameBottom.y, 
                    ControlSize.frameBottom.width, 
                    ControlSize.frameBottom.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x + i, y);
                bar.addChildTo(this._frameLayer);
            }
        }

        {
            // 左下の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x - ControlSize.frameBottomLeft.width;
            const y = ScreenSize.STAGE_RECT.height;

            // 枠を並べる。
            const bar = new phina.pixi.Sprite('control', 
                ControlSize.frameBottomLeft.width, 
                ControlSize.frameBottomLeft.height);
            bar.srcRect.set(ControlSize.frameBottomLeft.x,
                ControlSize.frameBottomLeft.y,
                ControlSize.frameBottomLeft.width,
                ControlSize.frameBottomLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }

        {
            // 右下の枠の位置を計算する。
            const x = ScreenSize.STAGE_RECT.x + ScreenSize.STAGE_RECT.width;
            const y = ScreenSize.STAGE_RECT.height;

            // 枠を並べる。
            const bar = new phina.pixi.Sprite('control', 
                ControlSize.frameBottomRight.width, 
                ControlSize.frameBottomRight.height);
            bar.srcRect.set(ControlSize.frameBottomRight.x,
                ControlSize.frameBottomRight.y,
                ControlSize.frameBottomRight.width,
                ControlSize.frameBottomRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }
    }

    /**
     * 自機復活処理。
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    private _rebirthPlayer(): void {

        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this._rebirthWait > 0) {
        
            this._rebirthWait--;
        
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this._rebirthWait <= 0) {

                // 自機を復活させる
                this._player.rebirth(this);
            }
        }
    }

    /**
     * 敵弾をすべて削除する。
     */
    private _removeEnemyShot(): void {

        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (let i = this._characters.length - 1; i >= 0; i--) {   

            const character = this._characters[i];
            if (Character.isEnemyShot(character)) {
                this.removeCharacter(character);
            }
        }
    }

    /**
     * ゲームオーバー処理を行う。
     */
    private _gameOver(): void {

        // 状態をゲームオーバーに遷移する。
        this._changeState(SCENE_STATE.GAMEOVER);

        // ゲームオーバーのラベルを画面に配置する。
        const gameOverLabel = new phina.display.Label({
            text: 'GAME OVER',
            fontSize: 36,
            backgroundColor: MyColor.BACK_COLOR,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
            x: Math.round(this._phinaScene.gridX.center()),
            y: GAMEOVER_LABEL_POS_Y,
            strokeWidth: 0,
            padding: 0,
        }).addChildTo(this._infoLayer);

        // 画面全体にタイトルへ戻るボタンを配置する。
        const backButton = new phina.display.DisplayElement({
            width: ScreenSize.SCREEN_WIDTH,
            height: ScreenSize.SCREEN_HEIGHT,
            x: ScreenSize.SCREEN_WIDTH / 2,
            y: ScreenSize.SCREEN_HEIGHT / 2,
        })
        .addChildTo(this._infoLayer)
        .setInteractive(true)
        .on('pointstart', (event: Event) => {
            this._replaceScene();
        });
    }

    /**
     * ステージやキャラクターの状態を更新する。
     */
    private _updateStageData(): void {

        // ステージの状態を更新する。
        this._stageStatus.update(this);

        // プレイヤーの状態を更新する。
        this._player.update(this);

        // 自機弾衝突フラグを初期化する。
        this._isHitPlayerShot = false;

        // 各キャラクターの状態を更新する。
        for (let i = 0; i < this._characters.length; i++) {
            this._characters[i].update(this);
        }

        // 自機弾が衝突した場合はSEを鳴らす。
        // 連続で音が鳴らないように音を鳴らしたときは自機音衝突間隔を初期化して、
        // 規定フレーム分経過するまで次の音が鳴らないようにする。
        this._hitPlayerShotInterval++;
        if (this._isHitPlayerShot && this._hitPlayerShotInterval > HIT_PLAYER_SHOT_INTERVAL) {
            phina.asset.SoundManager.play('hit');
            this._hitPlayerShotInterval = 0;
        }

        // 自機復活処理を行う。
        this._rebirthPlayer();
    }

    /**
     * キャラクターのアニメーションを停止する。
     */
    private _stopCharacterAnimation(): void {

        this._player.pauseAnimation();

        for (let character of this._characters) {
            character.pauseAnimation();
        }
    }

    /**
     * キャラクターのアニメーションを開始する。
     */
    private _startCharacterAnimation(): void {

        this._player.startAnimation();
        
        for (let character of this._characters) {
            character.startAnimation();
        }
    }

    /**
     * タイトルシーンへと切り替える。
     */
    private _replaceScene(): void {

        // BGMを停止する。
        phina.asset.SoundManager.stopMusic();

        // 全要素を取り除く。
        this._rootNode.remove();

        // タイトルシーンへ遷移する。
        this._phinaScene.scene = new TitleScene(this._phinaScene);
    }

    /**
     * ゲームを一時停止する。
     */
    private _pause(): void {

        // 効果音を鳴らす。
        phina.asset.SoundManager.play('pause');

        // BGMを一時停止する。
        phina.asset.SoundManager.pauseMusic();

        // 状態をポーズに遷移する。
        this._changeState(SCENE_STATE.PAUSE);
    }

    /**
     * ゲームを再開する。
     */
    private _resume(): void {

        // BGMを再開する。
        phina.asset.SoundManager.resumeMusic();

        // 状態をプレイ中に遷移する。
        this._changeState(SCENE_STATE.PLAYING);
    }

    /**
     * ゲーム終了メニューを表示する。
     */
    private _viewQuitMenu(): void {

        // 状態を終了メニューに遷移する。
        this._changeState(SCENE_STATE.QUIT_MENU);
    }

    /**
     * 一時停止メニューを表示する。
     */
    private _viewPauseMenu(): void {

        // 状態をポーズに遷移する。
        this._changeState(SCENE_STATE.PAUSE);
    }

    /**
     * 状態を遷移し、コントロールの有効無効を切り替える。。
     * @param state 遷移先の状態
     */
    private _changeState(state: SCENE_STATE): void {

        // 状態に応じてキャラクターのアニメーションを行うかどうかを切り替える。
        if (state === SCENE_STATE.PLAYING || 
            state === SCENE_STATE.WAIT_GAMEOVER ||
            state === SCENE_STATE.STAGE_CLEAR) {

            this._startCharacterAnimation();
        }
        else {
            this._stopCharacterAnimation();
        }

        // 一時停止中の場合は一時停止レイヤーを画面に配置する。
        if (state === SCENE_STATE.PAUSE) {
            this._pauseLayer.addChildTo(this._rootNode);
        }
        else {
            this._pauseLayer.remove();
        }

        // 終了メニューの場合は終了メニューを画面に配置する。
        if (state === SCENE_STATE.QUIT_MENU) {
            this._quitLayer.addChildTo(this._rootNode);
        }
        else {
            this._quitLayer.remove();
        }

        // プレイ中の場合は一時停止ボタンを有効にする。
        if (state === SCENE_STATE.PLAYING) {
            this._pauseButton.setEnable(true);
        }
        else {
            this._pauseButton.setEnable(false);            
        }

        // プレイ中の場合はシールドボタンを有効にする。
        if (state === SCENE_STATE.PLAYING) {
            this._shieldButton.enable = true;
        }
        else {
            this._shieldButton.enable = false;
        }

        // ステージクリアの場合はラベルを表示する。
        if (state === SCENE_STATE.STAGE_CLEAR) {
            this._stageClearLabel.addChildTo(this._infoLayer);
        }
        else {
            this._stageClearLabel.remove();
        }

        // メンバ変数を変更する。
        this._state = state;
    }

    /**
     * ステージ情報を読み込む。
     * @param stageNumber ステージ番号
     */
    private _setStage(stageNumber: number): void {

        // 現在のステージを画面から取り除く。
        this._stageStatus.remove();

        // ステージ情報を作成する。
        this._stageStatus = new StageStatus(stageNumber, this._backgroundLayer);

        // ボスHPゲージを非表示にする。
        this._bossLifeGauge.sprite.alpha = 0;
    }
}

export default PlayingScene;
