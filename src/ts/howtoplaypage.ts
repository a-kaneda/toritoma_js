import ScreenSize from './screensize';
import Localizer from './localizer';
import Frame from './frame';
import MyColor from './mycolor';
import PointDevice from './pointdevice';
import GamepadManager from './gamepadmanager';

// 画像の幅
const IMAGE_WIDTH = 128;
// 画像の高さ
const IMAGE_HEIGHT = 64;
// 画像の位置x座標
const IMAGE_POS_X = ScreenSize.SCREEN_WIDTH / 2;
// 画像の位置y座標
const IMAGE_POS_Y = ScreenSize.SCREEN_HEIGHT - 230;
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
// ページラベルの位置x座標
const PAGE_LABEL_POS_X = ScreenSize.SCREEN_WIDTH / 2;
// ページラベルの位置y座標
const PAGE_LABEL_POS_Y = ScreenSize.SCREEN_HEIGHT - 20;

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

        if (window.debug.howToImage === undefined) {
            window.debug.howToImage = [];
        }
        window.debug.howToImage[page] = howToImage;

        // テキスト部分を作成する。
        const textBox = new phina.ui.LabelAreaEx({
            text: '',
            width: TEXT_WIDTH,
            height: TEXT_HEIGHT,
            fontSize: 16,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
            keepWord: Localizer.isKeepWord,
        })
        .addChildTo(this._rootNode)
        .setPosition(TEXT_POS_X, TEXT_POS_Y);

        // リソーステキストを取得し、テキスト部分に設定する。
        const textKey = 'HowToPlay_' + this._checkInputDevice() + '_' + (page + 1).toString();
        const text = Localizer.getString(textKey);
        textBox.text = text;

        // テキストの枠を作成する。
        const frame = new Frame('frame', TEXT_WIDTH + FRAME_MARGIN, TEXT_HEIGHT + FRAME_MARGIN)
        .setPosition(TEXT_POS_X, TEXT_POS_Y)
        .addChildTo(this._rootNode);

        // ページ番号ラベルのテキストを作成する。
        const pageLabelText = (page + 1).toString() + ' / ' + PAGE_COUNT;

        // ページ番号ラベルを作成する。
        const pageLabel = new phina.display.Label({
            text: pageLabelText,
            fontSize: 16,
            fill: MyColor.FORE_COLOR,
            fontFamily: 'noto',
        })
        .addChildTo(this._rootNode)
        .setPosition(PAGE_LABEL_POS_X, PAGE_LABEL_POS_Y);
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
     * 入力デバイスを調べる。
     * ゲームパッドがつながっている場合は'gamepad'、
     * タッチデバイスの場合は'touch'、
     * いずれでもない場合は'keyboard'、
     * を返す。
     * @return 入力デバイス
     */
    private _checkInputDevice(): string {

        // ゲームパッドがつながっている場合
        if (GamepadManager.get().getGamepad()) {
            return 'gamepad';
        }
        // タッチデバイスがつながっている場合
        else if (PointDevice.isTouchUsed) {
            return 'touch'
        }
        // どちらもない場合はキーボードとする。
        else {
            return 'keyboard';
        }
    }
}

export default HowToPlayPage;