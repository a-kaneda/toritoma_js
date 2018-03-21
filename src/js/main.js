import PointDevice from './pointdevice';
import ScreenSize from './screensize';
import MyColor from './mycolor';
import TitleScene from './titlescene';
import LabelAreaExDummy from './labelareaex';
window.debug = {};
// LabelAreaExが取り込まれるようにダミー変数を使用する。
LabelAreaExDummy;
// マウスが接続されているかどうかを調べる。
PointDevice.checkDeviceType();
/**
 * アセット定義。
 */
const ASSETS = {
    image: {
        'back': './images/back.png',
        'control': './images/control.png',
        'image_8x8': './images/image_8x8.png',
        'image_16x16': './images/image_16x16.png',
        'image_64x64': './images/image_64x64.png',
        'howtoimage': './images/howtoimage.png',
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
        'image_64x64_ss': './images/image_64x64_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'stage2': './sound/stage2.mp3',
        'stage3': './sound/stage3.mp3',
        'stage4': './sound/stage4.mp3',
        'stage5': './sound/stage5.mp3',
        'stage6': './sound/stage6.mp3',
        'boss': './sound/boss.mp3',
        'lastboss': './sound/lastboss.mp3',
        'clear': './sound/clear.mp3',
        'select': './sound/select.mp3',
        'cursor': './sound/cursor.mp3',
        'hit': './sound/hit.mp3',
        'bomb_min': './sound/bomb_min.mp3',
        'miss': './sound/miss.mp3',
        'pause': './sound/pause.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular-min.ttf',
    },
};
/**
 * ローディングシーン。
 */
phina.define('LoadingScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * コンストラクタ。
     * @param options 起動パラメータ。
     */
    init: function (options) {
        this.superInit(options);
        // 背景色を指定する。
        this.backgroundColor = MyColor.BACK_COLOR;
        // MONOCHROMESOFTのラベルを作成する。
        const label = new phina.display.Label({
            text: 'MONOCHROMESOFT',
            fontSize: 32,
            fill: MyColor.FORE_COLOR,
        })
            .addChildTo(this)
            .setPosition(this.width / 2, this.height / 2);
        // 進捗バーを作成する。
        const progressbar = new phina.display.RectangleShape({
            height: 20,
            width: 1,
            fill: MyColor.FORE_COLOR,
            strokeWidth: 0,
            padding: 0,
        })
            .addChildTo(this)
            .setOrigin(0, 0.5)
            .setPosition(0, this.height * 0.75);
        // ローダーを作成する。
        const loader = new phina.asset.AssetLoader();
        // ロードが進行したときの処理を作成する。
        loader.on('progress', (event) => {
            const e = event;
            // 進捗率に応じてプログレスバーの幅を広げる。
            // 進捗が0以下の場合は幅を1にする。
            // chromeだと問題ないが、safariでdrawImageの幅を0にすると
            // InvalidStateError DOM Exception 11が発生するため。
            if (e.progress <= 0) {
                progressbar.width = 1;
            }
            else {
                progressbar.width = e.progress * this.width;
            }
        });
        // ローダーによるロード完了ハンドラを設定する。
        loader.on('load', () => {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            this.flare('loaded');
        });
        // ロード開始
        loader.load(options.assets);
    },
});
/**
 * メインシーン。
 */
phina.define('MainScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * コンストラクタ。
     */
    init: function () {
        window.debug['scene'] = this;
        // 親クラスのコンストラクタを呼び出す。
        this.superInit({
            width: ScreenSize.SCREEN_WIDTH,
            height: ScreenSize.SCREEN_HEIGHT,
        });
        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;
        // 背景色を指定する。
        this.backgroundColor = MyColor.BACK_COLOR;
        // BGMとSEの音量を設定する。
        phina.asset.SoundManager.setVolume(0.5);
        phina.asset.SoundManager.setVolumeMusic(0.2);
        // ゲームパッドマネージャーを作成する。
        const gamepadManager = new phina.input.GamepadManager();
        // 初期シーンを設定する。
        this.scene = new TitleScene(this, gamepadManager);
    },
    /**
     * 更新処理。内部のシーン処理の更新処理を実行する。
     * @param app アプリケーション
     */
    update: function (app) {
        this.scene.update(app);
    }
});
// メイン処理
phina.main(function () {
    // 画面サイズの補正の有効無効を切り替える。
    let isFit = true;
    if (localStorage.disableFit === 'true') {
        isFit = false;
    }
    // アプリケーションを生成する。
    let app = new phina.game.GameApp({
        width: ScreenSize.SCREEN_WIDTH,
        height: ScreenSize.SCREEN_HEIGHT,
        startLabel: 'main',
        assets: ASSETS,
        fit: isFit,
    });
    // FPSを設定する。
    app.fps = 60;
    // FPSを表示する。（デバッグ用）
    if (localStorage.viewFPS === 'true') {
        app.enableStats();
    }
    // iOSのsafariではユーザが操作時のみ音の再生が可能なため、タッチ時にダミーで音声の再生を行う。
    // https://github.com/phinajs/phina.js/issues/197
    app.domElement.addEventListener('touchend', function dummy() {
        const s = new phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });
    // アプリケーションを実行する。
    app.run();
});
