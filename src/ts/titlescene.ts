import Scene from './scene'
import Button from './button'
import MainScene from './mainscene.d'
import PlayinScene from './playingscene'
import ControlSize from './controlsize'
import ScreenSize from './screensize'

// タイトルの位置、x座標
const TITLE_POS_X = 130;
// タイトルの位置、y座標
const TITLE_POS_Y = 150;
// ボタンの位置、x座標
const BUTTON_POS_X = 360;
// ボタンの位置、y座標
const BUTTON_POS_Y = [64, 128, 192, 256];
// ボタンの幅
const BUTTON_WIDTH = 208;
// ボタンの高さ
const BUTTON_HEIGHT = 48;

/**
 * タイトルのシーン
 */
class TitleScene implements Scene {

    /** phina.jsのシーンインスタンス */
    private _phinaScene: MainScene;
    /** 全ノードのルート */
    private _rootNode: phina.display.DisplayElement;

    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene: MainScene) {

        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;

        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);

        // タイトルロゴを作成する。
        const title = new phina.display.Sprite('control', ControlSize.cs.title.width, ControlSize.cs.title.height)
        .addChildTo(this._rootNode)
        .setPosition(TITLE_POS_X, TITLE_POS_Y);
        title.srcRect.set(ControlSize.cs.title.x,
            ControlSize.cs.title.y,
            ControlSize.cs.title.width,
            ControlSize.cs.title.height);
        title.scaleX = ScreenSize.ZOOM_RATIO;
        title.scaleY = ScreenSize.ZOOM_RATIO;

        window.debug['title'] = title;

        // ゲームスタートボタンを作成する。
        const gameStartButton = new Button(BUTTON_WIDTH, BUTTON_HEIGHT)
        .addChildTo(this._rootNode)
        .setLabel('GAME START')
        .setPosition(BUTTON_POS_X, BUTTON_POS_Y[0])
        .setHandler(() => {this._replaceScene('PlayingScene')});
    }

    /**
     * 更新処理。
     * キー入力処理を行う。
     * @param app アプリケーション
     */
    public update(app: phina.game.GameApp): void {

    }

    /**
     * PlayingSceneにシーンを遷移する。
     * @param sceneName シーン名
     */
    private _replaceScene(sceneName: 'PlayingScene'): void {
        this._rootNode.remove();

        switch (sceneName) {
            case 'PlayingScene':
                this._phinaScene.scene = new PlayinScene(this._phinaScene);
                break;
            default:
                break;
        }
    }
}

export default TitleScene;