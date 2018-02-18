import PageLayer from './pagelayer'
import Scene from './scene'
import MainScene from './mainscene'
import TitleScene from './titlescene'
import HowToPlayPage from './howtoplaypage'

/**
 * 遊び方説明シーン。
 */
class HowToPlayScene implements Scene {

    /** phina.jsのシーンインスタンス */
    private _phinaScene: MainScene;
    /** ゲームパッドマネージャー。 */
    private _gamepadManager: phina.input.GamepadManager;
    /** ルートノード */
    private _rootNode: phina.display.DisplayElement;
    /** ページレイヤー */
    private _pageLayer: PageLayer;

    /**
     * コンストラクタ。
     * @param phinaScene phina.js上のシーンインスタンス
     * @param gamepadManager ゲームパッド管理クラス
     */
    constructor(phinaScene: MainScene, gamepadManager: phina.input.GamepadManager) {

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
        this._gamepadManager.update();

        // キーボードを取得する。
        const keyboard = app.keyboard;

        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get(0);

        // レイヤーの入力処理を行う。
        this._pageLayer.input(keyboard, gamepad);
    }
}

export default HowToPlayScene;