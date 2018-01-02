import PointDevice from './pointdevice.js';
import ScreenSize from './screensize.js';
import MyColor from './mycolor.js';
import PlayingScene from './playingscene.js';
// phina.jsをグローバル領域に展開する。
phina.globalize();
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
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'bomb_min': './sound/bomb_min.mp3',
        'miss': './sound/miss.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular-min.ttf',
    },
};
/**
 * メインシーン。
 */
phina.define('MainScene', {
    superClass: 'DisplayScene',
    /**
     * コンストラクタ。
     */
    init: function () {
        // 親クラスのコンストラクタを呼び出す。
        this.superInit({
            width: ScreenSize.SCREEN_WIDTH,
            height: ScreenSize.SCREEN_HEIGHT,
        });
        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;
        // 背景色を指定する。
        this.backgroundColor = MyColor.BACK_COLOR;
        // 初期シーンを設定する。
        this.scene = new PlayingScene(this);
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
