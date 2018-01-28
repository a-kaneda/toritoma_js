import ImageButton from './imagebutton'

/**
 * ページを持った画面のインターフェース。
 * 前ページボタン、次ページボタン、戻るボタンを持つ。
 */
class PageLayer {

    /** 前ページボタン */
    private _prevButton: ImageButton;
    /** 次ページボタン */
    private _nextButton: ImageButton;
    /** 戻るボタン */
    private _backButton: ImageButton;
    /** 前ページボタン選択時のコールバック関数 */
    private _onPrevButton: (() => void) | null;
    /** 次ページボタン選択時のコールバック関数 */
    private _onNextButton: (() => void) | null;
    /** 戻るボタン選択時のコールバック関数 */
    private _onBackBUtton: (() => void) | null;

    /**
     * コンストラクタ。
     */
    constructor() {

    }
}

export default PageLayer;