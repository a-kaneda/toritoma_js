/** @module stage */

import ScreenSize from './screensize.js'
import TileMapManager from './tilemapmanager.js'
import Dragonfly from './dragonfly.js'

// タイルのサイズ
const TILE_SIZE = 16;

/**
 * ステージのマップ、背景、イベント処理を管理する。
 */
class Stage {

    /**
     * タイルサイズ
     * @type {number}
     */
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

        /**
         * スクロールスピード。
         * @type {number}
         */
        this.speed = 0;

        /**
         * スクロール位置。
         * @type {number}
         */
        this.x = 0;

        /**
         * イベントを実行した列番号。
         * @type {number}
         */
        this.executedCol = 0;

        /**
         * タイルマップ管理クラス。
         * @type {TileMapManager}
         */ 
        this.mapManager = new TileMapManager(mapName);
        
        // 障害物のマップを作成する。
        this.mapManager.createObjectMap('block', 'collision');

        /**
         * 背景画像。
         * @type {phina.display.Sprite}
         */
        this.background = Sprite(this.mapManager.getIamge('background')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);

        /**
         * 前景画像。
         * @type {phina.display.Sprite}
         */
        this.foreground = Sprite(this.mapManager.getIamge('foreground')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);

        /**
         * 障害物画像。
         * @type {phina.display.Sprite}
         */
        this.block = Sprite(this.mapManager.getIamge('block')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
    }

    /**
     * ステージの状態を更新する。
     * @param {PlayingScene} scene - シーン
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
     * @param {PlayingScene} scene - シーン
     */
    _execEvent(scene) {

        // 画面外2個先の列まで処理を行う。
        const maxCol = Math.floor((-this.x + ScreenSize.STAGE_RECT.width) / TILE_SIZE) + 2;

        // イベント実行する範囲を計算する。
        const execPos = this.executedCol * TILE_SIZE;
        const execWidth = (maxCol - this.executedCol) * TILE_SIZE;
        
        // イベント実行する範囲がある場合
        if (execWidth > 0) {

            // イベントレイヤーのオブジェクトを検索する。
            const objects = this.mapManager.getObjects('event', execPos, 0, execWidth, ScreenSize.STAGE_RECT.height);

            // イベントを実行する。
            for (let i = 0; i < objects.length; i++) {
                switch (objects[i].type) {
                case 'speed':
                    // スクロールスピードを変更する。
                    this.speed = objects[i].properties.speed;
                    break;
                case 'enemy':
                    // 敵キャラを生成する。
                    this._createEnemy(objects[i].name,
                                      this.x + objects[i].x + objects[i].width / 2,
                                      objects[i].y + objects[i].height / 2,
                                      scene);
                    break;
                default:
                    break;
                }
            }

            // 実行済みの列番号を更新する。
            this.executedCol = maxCol;
        }
    }
    
    /**
     * スピードに応じてマップ全体を移動する。
     */
    _move() {

        // スピードに応じて移動する。
        this.x -= this.speed;

        // 各画像を座標に合わせて移動する。
        this.background.x = Math.floor(this.x);
        this.foreground.x = Math.floor(this.x);
        this.block.x = Math.floor(this.x);
    }

    /**
     * 敵キャラクターを生成する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    _createEnemy(type, x, y, scene) {
        switch (type) {
        case 'dragonfly':
            scene.addCharacter(new Dragonfly(x, y, scene));
            break;
        default:
            break;
        }
    }
}

export default Stage;
