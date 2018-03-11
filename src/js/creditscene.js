import TitleScene from './titlescene';
import PageLayer from './pagelayer';
import MyColor from './mycolor';
import ScreenSize from './screensize';
import Localizer from './localizer';
import LabelButton from './labelbutton';
// テキストの幅
const TEXT_WIDTH = 200;
// テキストの高さ
const TEXT_HEIGHT = 80;
// テキストの位置x座標
const TEXT_POS_X = Math.round(ScreenSize.SCREEN_WIDTH * 0.35);
// テキストの位置y座標
const TEXT_POS_Y = [
    Math.round(ScreenSize.SCREEN_HEIGHT * 0.3),
    Math.round(ScreenSize.SCREEN_HEIGHT * 0.55),
    Math.round(ScreenSize.SCREEN_HEIGHT * 0.8),
];
// ボタンの位置、x座標
const BUTTON_POS_X = Math.round(ScreenSize.SCREEN_WIDTH * 0.7);
// ボタンの位置、y座標
const BUTTON_POS_Y = [
    TEXT_POS_Y[0],
    TEXT_POS_Y[1],
    TEXT_POS_Y[2],
];
// ボタンの幅
const BUTTON_WIDTH = 112;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// 1ページの項目数
const PAGE_ITEM_NUM = 3;
// ページ数
const PAGE_NUM = 2;
/**
 * クレジットを表示するシーン。
 */
class CreditScene {
    /**
     * コンストラクタ。
     * @param phinaScene phina.js上のシーンインスタンス
     * @param gamepadManager ゲームパッド管理クラス
     */
    constructor(phinaScene, gamepadManager) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // ページレイヤーを作成する。
        this._pageLayer = new PageLayer()
            .addChildTo(this._rootNode)
            .onBackButton(() => {
            this._rootNode.remove();
            this._phinaScene.scene = new TitleScene(this._phinaScene, this._gamepadManager);
        });
        // 各ページを作成する。
        for (let i = 0; i < PAGE_NUM; i++) {
            // ページを作成する。
            const page = new phina.display.DisplayElement();
            // 各項目を作成する。
            for (let j = 0; j < PAGE_ITEM_NUM; j++) {
                // テキスト部分を作成する。
                const textBox = new phina.ui.LabelAreaEx({
                    text: '',
                    width: TEXT_WIDTH,
                    height: TEXT_HEIGHT,
                    fontSize: 24,
                    fill: MyColor.FORE_COLOR,
                    fontFamily: 'noto',
                    keepWord: false,
                })
                    .setPosition(TEXT_POS_X, TEXT_POS_Y[j])
                    .addChildTo(page);
                // リソーステキストを取得し、テキスト部分に設定する。
                const textKey = 'CreditName_' + (i * PAGE_ITEM_NUM + j + 1);
                const text = Localizer.getString(textKey);
                textBox.text = text;
                // リンクボタンを作成する。
                const linkButton = new LabelButton(BUTTON_WIDTH, BUTTON_HEIGHT)
                    .setLabel('WEB SITE')
                    .onClick((event) => {
                    // リンクURLを取得し、リンク先を開く。
                    const urlKey = 'CreditLink_' + (i * PAGE_ITEM_NUM + j + 1);
                    const url = Localizer.getString(urlKey);
                    window.open(url);
                })
                    .setEnable(false)
                    .setPosition(BUTTON_POS_X, BUTTON_POS_Y[j])
                    .addChildTo(page);
            }
            // ページを追加する。
            this._pageLayer.addPage(page);
        }
    }
    /**
     * 更新処理。
     * @param app アプリケーション
     */
    update(app) {
        // ゲームパッドの状態を更新する。
        this._gamepadManager.update();
        // キーボードを取得する。
        const keyboard = app.keyboard;
        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get(0);
        // レイヤーの入力処理を行う。
        this._pageLayer.input(keyboard, gamepad);
    }
}
export default CreditScene;
