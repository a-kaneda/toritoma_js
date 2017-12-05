/**
 * @class Stage
 * @brief ステージ管理クラス
 * 
 * ステージのマップ、背景、イベント処理を管理する。
 */
phina.define('Stage', {
    _static: {
        // タイルのサイズ
        TILE_SIZE: 16,
    },
    /**
     * @function init
     * @brief コンストラクタ
     * mapNameで指定されたマップを読み込み、background、foreground、blockのレイヤーの画像をlayerに配置する。
     * stageWidthをメンバ変数に格納する。
     * 
     * @param [in] manName マップ名
     * @param [in] scene シーン
     * @param [in/out] layer ステージ画像を配置するレイヤー
     */
    init: function(mapName, scene, layer) {

        // メンバを初期化する。
        this.speed = 0;
        this.x = 0;
        this.executedCol = 0;
        
        // タイルマップを読み込み、背景画像を配置する。
        this.mapManager = TileMapManager(mapName);
        this.background = Sprite(this.mapManager.getIamge('background')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        this.foreground = Sprite(this.mapManager.getIamge('foreground')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        this.block = Sprite(this.mapManager.getIamge('block')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);

        // シーンを記憶する。
        this.scene = scene;
    },
    /**
     * @function update
     * @brief 更新処理
     * ステージの状態を更新する。
     *
     * @param [in/out] characterLayer 敵キャラクターを配置するレイヤー
     */
    update: function(characterLayer) {

        // イベントを実行する。
        this._execEvent(characterLayer);

        // スピードに応じて移動する。
        this._move();
    },
    /**
     * @function _execEvent
     * @brief イベント実行処理
     * マップのイベントレイヤーのオブジェクトを取得し、イベントを実行する。
     * 実行する範囲は前回実行した列から現在画面に表示している列 + 2列。
     *
     * @param [in] characterLayer 敵キャラクターを配置するレイヤー
     */
    _execEvent: function(characterLayer) {

        // 画面外2個先の列まで処理を行う。
        var maxCol = Math.floor((-this.x + ScreenSize.STAGE_RECT.width) / Stage.TILE_SIZE) + 2;

        // イベント実行する範囲を計算する。
        var execPos = this.executedCol * Stage.TILE_SIZE;
        var execWidth = (maxCol - this.executedCol) * Stage.TILE_SIZE;
        
        // イベント実行する範囲がある場合
        if (execWidth > 0) {

            // イベントレイヤーのオブジェクトを検索する。
            var objects = this.mapManager.getObjects('event', execPos, 0, execWidth, ScreenSize.STAGE_RECT.height);

            // イベントを実行する。
            for (var i = 0; i < objects.length; i++) {
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
                                      characterLayer);
                    break;
                default:
                    break;
                }
            }

            // 実行済みの列番号を更新する。
            this.executedCol = maxCol;
        }
    },
    /**
     * @function _move
     * @brief 移動処理
     * スピードに応じてマップ全体を移動する。
     */
    _move: function() {

        // スピードに応じて移動する。
        this.x -= this.speed;

        // 各画像を座標に合わせて移動する。
        this.background.x = Math.floor(this.x);
        this.foreground.x = Math.floor(this.x);
        this.block.x = Math.floor(this.x);
    },
    /**
     * @function _createEnemy
     * @brief 敵生成
     * 敵キャラクターを生成する。
     *
     * @param [in] x x座標
     * @param [in] y y座標
     @ @param [in/out] characterLayer 敵キャラクターを配置するレイヤー
     */
    _createEnemy: function(type, x, y, characterLayer) {
        switch (type) {
        case 'dragonfly':
            Dragonfly(x, y, this.scene).addChildTo(characterLayer);
            break;
        default:
            break;
        }
    },
});
