import ImageButton from './imagebutton'
import ScreenSize from './screensize'

// 戻るボタンの位置x座標(画面左からの位置)
const BACK_BUTTON_POS_X = ScreenSize.SCREEN_WIDTH - 28;
// 戻るボタンの位置y座標(画面上からの位置)
const BACK_BUTTON_POS_Y = 28;
// 前ページボタンの位置x座標(画面左からの位置)
const PREV_BUTTON_POS_X = 40;
// 前ページボタンの位置y座標(画面上からの位置)
const PREV_BUTTON_POS_Y = ScreenSize.SCREEN_HEIGHT / 2;
// 次ページボタンの位置x座標(画面左からの位置)
const NEXT_BUTTON_POS_X = ScreenSize.SCREEN_WIDTH - 40;
// 次ページボタンの位置y座標(画面上からの位置)
const NEXT_BUTTON_POS_Y = ScreenSize.SCREEN_HEIGHT / 2;

/**
 * ページを持った画面のインターフェース。
 * 前ページボタン、次ページボタン、戻るボタンを持つ。
 */
class PageLayer {

    /** ルートノード */
    private _rootNode: phina.display.DisplayElement;
    /** 戻るボタン */
    private _backButton: ImageButton;
    /** 前ページボタン */
    private _prevButton: ImageButton;
    /** 次ページボタン */
    private _nextButton: ImageButton;
    /** ページ */
    private _pages: DisplayElement[];
    /** 現在のページ番号 */
    private _currentPageNum: number;

    /**
     * コンストラクタ。
     */
    constructor() {

        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();

        // 戻るボタンを作成する。
        this._backButton = new ImageButton('backButton')
        .setPosition(BACK_BUTTON_POS_X, BACK_BUTTON_POS_Y)
        .addChildTo(this._rootNode);

        // 前ページボタンを作成する。
        this._prevButton = new ImageButton('prevButton')
        .setPosition(PREV_BUTTON_POS_X, PREV_BUTTON_POS_Y)
        .onPush(() => {this._goToPrevPage()})
        .addChildTo(this._rootNode);

        // 次ページボタンを作成する。
        this._nextButton = new ImageButton('nextButton')
        .setPosition(NEXT_BUTTON_POS_X, NEXT_BUTTON_POS_Y)
        .addChildTo(this._rootNode);
    }

    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    public addChildTo(parent: phina.app.Element): this {
        this._rootNode.addChildTo(parent);
        return this;
    }

    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    public remove(): this {
        this._rootNode.remove();
        return this;
    }

    /**
     * 戻るボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    public onBackButton(func: () => void): this {

        // 戻るボタンにコールバック関数を設定する。
        this._backButton.onPush(() => {

            // 効果音を鳴らす。
            phina.asset.SoundManager.play('select');

            // コールバック関数を呼び出す。
            func();
        });

        return this;
    }

    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    public input(keyboard: phina.input.Keyboard, gamepad: phina.input.Gamepad): void {

        // キーボードのESCキーかゲームパッドのBボタンが押された場合は戻るボタンの処理を行う。
        if (keyboard.getKeyDown('escape') || gamepad.getKeyDown('b')) {
            this._backButton.push();
        }
        // キーボードの左キーかゲームパッドの左キーが押された場合は前ページボタンの処理を行う。
        else if (keyboard.getKeyDown('left') || gamepad.getKeyDown('left')) {
            this._goToPrevPage();
        }
        // キーボードの右キーかゲームパッドの右キーが押された場合は次ページボタンの処理を行う。
        else if (keyboard.getKeyDown('right') || gamepad.getKeyDown('right')) {
            this._goToNextPage();
        }
        else {
            // その他のキー入力は処理しない。
        }
    }

    /**
     * 前ページへ移動する。
     */
    private _goToPrevPage(): void {

        // 効果音を鳴らす。
        phina.asset.SoundManager.play('cursor');
            
        // 現在のページを画面から取り除く。
        this._pages[this._currentPageNum].remove();

        // ページ番号を一つ減らす。
        this._currentPageNum--;

        // 最初のページを過ぎた場合は最後のページに移動する。
        if (this._currentPageNum < 0) {
            this._currentPageNum = this._pages.length - 1;
        }

        // 移動後のページを画面に配置する。
        this._pages[this._currentPageNum].addChildTo(this._rootNode);
    }

    /**
     * 次ページへ移動する。
     */
    private _goToNextPage(): void {

        // 効果音を鳴らす。
        phina.asset.SoundManager.play('cursor');
            
        // 現在のページを画面から取り除く。
        this._pages[this._currentPageNum].remove();

        // ページ番号を一つ増やす。
        this._currentPageNum++;

        // 最後のページを過ぎた場合は最初のページに移動する。
        if (this._currentPageNum >= this._pages.length) {
            this._currentPageNum = 0;
        }

        // 移動後のページを画面に配置する。
        this._pages[this._currentPageNum].addChildTo(this._rootNode);
    }
}

export default PageLayer;