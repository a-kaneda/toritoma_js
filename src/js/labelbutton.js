import MyColor from './mycolor';
import ControlSize from './controlsize';
import ScreenSize from './screensize';
// ボタン選択からハンドラ実行までのインターバル(msec)
const EXEC_INTERVAL = 500;
/**
 * ラベルを使用したボタン。
 */
class LabelButton {
    /**
     * コンストラクタ。
     * @param width 幅
     * @param height 高さ
     */
    constructor(width, height) {
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            width: width + ControlSize.buttonTopLeft.width * ScreenSize.ZOOM_RATIO,
            height: height + ControlSize.buttonTopLeft.height * ScreenSize.ZOOM_RATIO,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            padding: 0,
        });
        // 枠を作成する。
        this._createFrames(width, height);
        // ラベルを作成する。
        this._label = new phina.display.Label({
            text: '',
            fontSize: 24,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._base);
        // ボタン選択エフェクト開始時のコールバック関数を初期化する。
        this._onEffect = null;
        // ボタン選択時のコールバック関数を初期化する。
        this._onPush = null;
        // 初期状態は有効とする。
        this._enable = true;
        // タッチ操作を有効にする。
        this._base.setInteractive(true);
        // タッチ開始イベントのハンドラを作成する。
        this._base.on('pointstart', (event) => {
            this.select();
        });
    }
    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._base.addChildTo(parent);
        return this;
    }
    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    setPosition(x, y) {
        this._base.x = x;
        this._base.y = y;
        return this;
    }
    /**
     * ボタン選択エフェクト開始時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onEffect(func) {
        this._onEffect = func;
        return this;
    }
    /**
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onPush(func) {
        this._onPush = func;
        return this;
    }
    /**
     * ラベルのテキストを設定する。
     * @param label ラベルのテキスト
     * @return 自インスタンス
     */
    setLabel(label) {
        this._label.text = label;
        return this;
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    setEnable(value) {
        this._enable = value;
        return this;
    }
    /**
     * ボタン選択時の処理を行う。
     * @return 自インスタンス
     */
    select() {
        // 有効なときに処理を行う。
        if (this._enable) {
            // エフェクト開始時のコールバック関数を呼び出す。。
            if (this._onEffect !== null) {
                this._onEffect();
            }
            // 効果音を鳴らす。
            phina.asset.SoundManager.play('select');
            // 点滅アニメーションを実行する。
            // 100ms周期で表示、非表示を切り替える。
            this._base.tweener.wait(100)
                .set({ alpha: 0 })
                .wait(100)
                .set({ alpha: 1 })
                .wait(100)
                .set({ alpha: 0 })
                .wait(100)
                .set({ alpha: 1 })
                .play();
            // イベントハンドラが設定されている場合は一定時間後にハンドラを実行する。
            if (this._onPush !== null) {
                setTimeout(this._onPush, EXEC_INTERVAL);
            }
        }
        return this;
    }
    /**
     * ボタンの枠の部分を作成する。
     * @param width 幅
     * @param height 高さ
     */
    _createFrames(width, height) {
        // フレーム1個分のサイズを取得する。
        const FrameSize = ControlSize.buttonTopLeft.width * ScreenSize.ZOOM_RATIO;
        for (let x = -width / 2; x <= width / 2; x += FrameSize) {
            for (let y = -height / 2; y <= height / 2; y += FrameSize) {
                // 一番上
                if (y === -height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonTopLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, 'buttonTop');
                    }
                    else {
                        this._createFrame(x, y, 'buttonTopRight');
                    }
                }
                else if (y + FrameSize <= height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        // 上下左右真ん中部分は画像無し。
                    }
                    else {
                        this._createFrame(x, y, 'buttonRight');
                    }
                }
                else {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, 'buttonBottomLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, 'buttonBottom');
                    }
                    else {
                        this._createFrame(x, y, 'buttonBottomRight');
                    }
                }
            }
        }
    }
    /**
     * 枠の画像を読み込み、ベースに配置する。
     * @param x x座標
     * @param y y座標
     * @param type 枠のタイプ
     */
    _createFrame(x, y, type) {
        // 枠の画像を読み込む。
        const frame = new phina.display.Sprite('control', ControlSize[type].width, ControlSize[type].height);
        frame.srcRect.set(ControlSize[type].x, ControlSize[type].y, ControlSize[type].width, ControlSize[type].height);
        frame.scaleX = ScreenSize.ZOOM_RATIO;
        frame.scaleY = ScreenSize.ZOOM_RATIO;
        frame.addChildTo(this._base)
            .setPosition(x, y);
    }
}
export default LabelButton;
