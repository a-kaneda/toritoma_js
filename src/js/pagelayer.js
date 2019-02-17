import ImageButton from './imagebutton';
import ScreenSize from './screensize';
import DPad from './dpad';
import GamepadManager from './gamepadmanager';
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
            .onPush(() => { this._goToPrevPage(); })
            .addChildTo(this._rootNode);
        // 次ページボタンを作成する。
        this._nextButton = new ImageButton('nextButton')
            .setPosition(NEXT_BUTTON_POS_X, NEXT_BUTTON_POS_Y)
            .onPush(() => { this._goToNextPage(); })
            .addChildTo(this._rootNode);
        // ページ配列を作成する。
        this._pages = [];
        // ページ番号を初期化する。
        this._currentPageNum = 0;
        // 方向キー管理クラスを作成する。
        this._dpad = new DPad().onKeyDown((direction) => { this._onCursorKey(direction); });
    }
    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._rootNode.addChildTo(parent);
        return this;
    }
    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove() {
        this._rootNode.remove();
        return this;
    }
    /**
     * ページを追加する。
     * @param page ページ
     */
    addPage(page) {
        // メンバ変数に格納する。
        this._pages.push(page);
        // 1個目の場合は画面に配置する。
        if (this._pages.length === 1) {
            this._pages[0].addChildTo(this._rootNode);
        }
        return this;
    }
    /**
     * 戻るボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onBackButton(func) {
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
     */
    input(keyboard) {
        // ゲームパッド管理クラスを取得する。
        const gamepadManager = GamepadManager.get();
        // キーボードのESCキーかゲームパッドのBボタンが押された場合は戻るボタンの処理を行う。
        if (keyboard.getKeyDown('escape') || gamepadManager.getButtonPressed('B')) {
            this._backButton.push();
        }
        else if (keyboard.getKeyDown('left')) {
            this._goToPrevPage();
        }
        else if (keyboard.getKeyDown('right')) {
            this._goToNextPage();
        }
        else {
            // その他のキー入力は処理しない。
        }
        // ゲームパッドのカーソルキーの入力処理を行う。
        this._dpad.input();
    }
    /**
     * カーソルキー入力時の処理。
     * @param direction 方向
     */
    _onCursorKey(direction) {
        // 左キーが押された場合は前ページへ移動し、
        // 右キーが押された場合は次ページへ移動する。
        switch (direction) {
            case 'left':
                this._goToPrevPage();
                break;
            case 'right':
                this._goToNextPage();
                break;
            default:
                break;
        }
    }
    /**
     * 前ページへ移動する。
     */
    _goToPrevPage() {
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
    _goToNextPage() {
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
