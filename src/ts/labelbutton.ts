import MyColor from './mycolor'
import ControlSize from './controlsize'
import ScreenSize from './screensize'
import Frame from './frame'

// ボタン選択からハンドラ実行までのインターバル(msec)
const EXEC_INTERVAL = 500;

/**
 * ラベルを使用したボタン。
 */
class LabelButton {

    /** ベース部分 */
    private _base : phina.display.DisplayElement;
    /** ラベル */
    private _label: phina.display.Label;
    /** 有効か無効か */
    private _enable: boolean;
    /** ボタン選択エフェクト開始時のコールバック関数 */
    private _onEffect: (() => void) | null;
    /** ボタン選択時のコールバック関数 */
    private _onPush: (() => void) | null;

    /**
     * コンストラクタ。
     * @param width 幅 
     * @param height 高さ
     */
    constructor(width: number, height: number) {

        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            width: width + ControlSize.buttonTopLeft.width * ScreenSize.ZOOM_RATIO,
            height: height + ControlSize.buttonTopLeft.height * ScreenSize.ZOOM_RATIO,
            fill: MyColor.BACK_COLOR,
            strokeWidth: 0,
            padding: 0,
        });

        // 枠を作成する。
        const frame = new Frame('button', width, height)
        .addChildTo(this._base);

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
        this._base.on('pointstart', (event: Event) => {
            this.select();
        });
    }

    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    public addChildTo(parent: phina.app.Element): this {
        this._base.addChildTo(parent);
        return this;
    }

    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    public setPosition(x: number, y: number): this {
        this._base.x = x;
        this._base.y = y;
        return this;
    }

    /**
     * ボタン選択エフェクト開始時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    public onEffect(func: () => void): this {
        this._onEffect = func;
        return this;
    }

    /**
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    public onPush(func: () => void): this {
        this._onPush = func;
        return this;
    }

    /**
     * クリック時のイベントリスナーを設定する。
     * ユーザー操作からの処理でなければリンクを開く際に
     * ブラウザがブロックしてしまうことに対する対策。
     * @param func イベントリスナー
     * @return 自インスタンス
     */
    public onClick(func: (event: any) => void): this {
        this._base.onclick = func;
        return this;
    }

    /**
     * ラベルのテキストを設定する。
     * @param label ラベルのテキスト
     * @return 自インスタンス
     */
    public setLabel(label: string): this {
        this._label.text = label;
        return this;
    }

    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    public setEnable(value: boolean): this {
        this._enable = value;
        return this;
    }

    /**
     * ボタン選択時の処理を行う。
     * @return 自インスタンス
     */
    public select(): this {

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
}

export default LabelButton;