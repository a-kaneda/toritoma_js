import ScreenSize from './screensize'
import Localizer from './localizer'
import Frame from './frame'

// 画像の幅
const IMAGE_WIDTH = 128;
// 画像の高さ
const IMAGE_HEIGHT = 64;
// 画像の位置x座標
const IMAGE_POS_X = ScreenSize.SCREEN_WIDTH / 2;
// 画像の位置y座標
const IMAGE_POS_Y = ScreenSize.SCREEN_HEIGHT - 200;
// テキストの幅
const TEXT_WIDTH = 200;
// テキストの高さ
const TEXT_HEIGHT = 80;
// テキストの位置x座標
const TEXT_POS_X = ScreenSize.SCREEN_WIDTH / 2;
// テキストの位置y座標
const TEXT_POS_Y = ScreenSize.SCREEN_HEIGHT - 85;
// テキストの枠の余白
const FRAME_MARGIN = 16;
// ページ数
const PAGE_COUNT = 6;

/**
 * 遊び方説明画面のページ。
 */
class HowToPlayPage implements DisplayElement {

    /** ルートノード */
    private _rootNode: phina.display.DisplayElement;

    /**
     * ページ数
     */
    static get PAGE_COUNT(): number {
        return PAGE_COUNT;
    }
    
    /**
     * コンストラクタ。
     * @param page ページ番号(0始まり)
     */
    constructor(page: number) {

        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();

        // 説明画像を読み込む。
        const howToImage = new phina.display.Sprite('howtoimage',
            IMAGE_WIDTH,
            IMAGE_HEIGHT);
        howToImage.srcRect.set(0,
            page * IMAGE_HEIGHT,
            IMAGE_WIDTH,
            IMAGE_HEIGHT);
        howToImage.scaleX = ScreenSize.ZOOM_RATIO;
        howToImage.scaleY = ScreenSize.ZOOM_RATIO;
        howToImage.addChildTo(this._rootNode)
        .setPosition(IMAGE_POS_X, IMAGE_POS_Y);

        // テキスト部分を作成する。
        const textBox = new phina.ui.LabelAreaEx({
            text: '',
            width: TEXT_WIDTH,
            height: TEXT_HEIGHT,
            fontSize: 16,
            keepWord: true,
        })
        .addChildTo(this._rootNode)
        .setPosition(TEXT_POS_X, TEXT_POS_Y);

        // リソーステキストを取得し、テキスト部分に設定する。
        const textKey = 'HowToPlay_' + (page + 1).toString();
        const text = Localizer.getString(textKey);
        textBox.text = text;

        // テキストの枠を作成する。
        const frame = new Frame('frame', TEXT_WIDTH + FRAME_MARGIN, TEXT_HEIGHT + FRAME_MARGIN)
        .setPosition(TEXT_POS_X, TEXT_POS_Y)
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
}

export default HowToPlayPage;