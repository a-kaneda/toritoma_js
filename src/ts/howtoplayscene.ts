import PageLayer from './pagelayer';
import Scene from './scene';
import MainScene from './mainscene';
import TitleScene from './titlescene';
import HowToPlayPage from './howtoplaypage';
import GamepadManager from './gamepadmanager';

/**
 * 遊び方説明シーン。
 */
class HowToPlayScene implements Scene {

    /** phina.jsのシーンインスタンス */
    private _phinaScene: MainScene;
    /** ルートノード */
    private _rootNode: phina.display.DisplayElement;
    /** ページレイヤー */
    private _pageLayer: PageLayer;

    /**
     * コンストラクタ。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene: MainScene) {

        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;

        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);

        // ページレイヤーを作成する。
        this._pageLayer = new PageLayer()
        .addChildTo(this._rootNode)
        .onBackButton(() => {
            this._rootNode.remove();
            this._phinaScene.scene = new TitleScene(this._phinaScene);
        });

        // 各ページを作成する。
        for (let i = 0; i < HowToPlayPage.PAGE_COUNT; i++) {
            this._pageLayer.addPage(new HowToPlayPage(i));
        }
    }

    /**
     * 更新処理。
     * @param app アプリケーション
     */
    public update(app: phina.game.GameApp): void {

        // ゲームパッドの状態を更新する。
        GamepadManager.get().update();

        // キーボードを取得する。
        const keyboard = app.keyboard;

        // レイヤーの入力処理を行う。
        this._pageLayer.input(keyboard);
    }
}

export default HowToPlayScene;