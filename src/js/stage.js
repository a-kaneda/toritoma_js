/** @module stage */
import ScreenSize from './screensize';
import TileMapManager from './tilemapmanager';
import Dragonfly from './dragonfly';
import Ant from './ant';
import Butterfly from './butterfly';
import Ladybug from './ladybug';
// タイルのサイズ
const TILE_SIZE = 16;
/**
 * ステージのマップ、背景、イベント処理を管理する。
 */
class Stage {
    /** タイルサイズ */
    static get TILE_SIZE() {
        return TILE_SIZE;
    }
    /**
     * コンストラクタ。
     * mapNameで指定されたマップを読み込み、background、foreground、blockのレイヤーの画像をlayerに配置する。
     * stageWidthをメンバ変数に格納する。
     * @param {string} manName - マップ名
     * @param {phina.display.DisplayElement} layer - ステージ画像を配置するレイヤー
     */
    constructor(mapName, layer) {
        // スクロールスピードを初期化する。
        this._speed = 0;
        // スクロール位置を初期化する。
        this._x = 0;
        // イベントを実行した列番号を初期化する。
        this._executedCol = 0;
        // タイルマップ管理クラスを作成する。
        this._mapManager = new TileMapManager(mapName);
        // 障害物のマップを作成する。
        this._mapManager.createObjectMap('block', 'collision');
        // 背景画像を読み込む。
        const backgroundTexture = this._mapManager.getIamge('background');
        if (backgroundTexture !== null) {
            this._background = new phina.display.Sprite(backgroundTexture).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        }
        else {
            this._background = null;
        }
        // 前景画像を読み込む。
        const foregroundTexture = this._mapManager.getIamge('foreground');
        if (foregroundTexture != null) {
            this._foreground = new phina.display.Sprite(foregroundTexture).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        }
        else {
            this._foreground = null;
        }
        // 障害物画像を読み込む。
        const blockTexture = this._mapManager.getIamge('block');
        if (blockTexture != null) {
            this._block = new phina.display.Sprite(blockTexture).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        }
        else {
            this._block = null;
        }
    }
    /** スクロール位置 */
    get x() {
        return this._x;
    }
    /** スクロールスピード */
    get speed() {
        return this._speed;
    }
    /** 障害物マップ */
    get blockMap() {
        return this._mapManager.getObjectMap('collision');
    }
    /**
     * ステージの状態を更新する。
     * @param scene シーン
     */
    update(scene) {
        // イベントを実行する。
        this._execEvent(scene);
        // スピードに応じて移動する。
        this._move();
    }
    /**
     * マップのイベントレイヤーのオブジェクトを取得し、イベントを実行する。
     * 実行する範囲は前回実行した列から現在画面に表示している列 + 2列。
     * @param scene シーン
     */
    _execEvent(scene) {
        // 画面外2個先の列まで処理を行う。
        const maxCol = Math.floor((-this._x + ScreenSize.STAGE_RECT.width) / TILE_SIZE) + 2;
        // イベント実行する範囲を計算する。
        const execPos = this._executedCol * TILE_SIZE;
        const execWidth = (maxCol - this._executedCol) * TILE_SIZE;
        // イベント実行する範囲がある場合
        if (execWidth > 0) {
            // イベントレイヤーのオブジェクトを検索する。
            const objects = this._mapManager.getObjects('event', execPos, 0, execWidth, ScreenSize.STAGE_RECT.height);
            // イベントを実行する。
            for (let obj of objects) {
                switch (obj.type) {
                    case 'speed':
                        // スクロールスピードを変更する。
                        if (obj.properties !== undefined) {
                            this._speed = obj.properties.speed;
                        }
                        break;
                    case 'enemy':
                        // 敵キャラを生成する。
                        this._createEnemy(obj.name, this._x + obj.x + obj.width / 2, obj.y + obj.height / 2, scene);
                        break;
                    default:
                        break;
                }
            }
            // 実行済みの列番号を更新する。
            this._executedCol = maxCol;
        }
    }
    /**
     * スピードに応じてマップ全体を移動する。
     */
    _move() {
        // スピードに応じて移動する。
        this._x -= this._speed;
        // 各画像を座標に合わせて移動する。
        if (this._background !== null) {
            this._background.x = Math.floor(this._x);
        }
        if (this._foreground !== null) {
            this._foreground.x = Math.floor(this._x);
        }
        if (this._block !== null) {
            this._block.x = Math.floor(this._x);
        }
    }
    /**
     * 敵キャラクターを生成する。
     * @param type 敵キャラクターの種類
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    _createEnemy(type, x, y, scene) {
        switch (type) {
            case 'dragonfly':
                scene.addCharacter(new Dragonfly(x, y, scene));
                break;
            case 'ant':
                scene.addCharacter(new Ant(x, y, scene));
                break;
            case 'butterfly':
                scene.addCharacter(new Butterfly(x, y, scene));
                break;
            case 'ladybug':
                scene.addCharacter(new Ladybug(x, y, scene));
                break;
            default:
                break;
        }
    }
}
export default Stage;
