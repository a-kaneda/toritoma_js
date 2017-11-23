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
        // 画面に表示されるステージの高さ
        STAGE_HEIGHT: 144,
    },
    /**
     * @function init
     * @brief コンストラクタ
     * mapNameで指定されたマップを読み込み、background、foreground、blockのレイヤーの画像をlayerに配置する。
     * stageWidthをメンバ変数に格納する。
     * 
     * @param [in] manName マップ名
     * @param [in/out] layer ステージ画像を配置するレイヤー
     * @param [in] stageWidth 画面に表示するステージの幅
     */
    init: function(mapName, layer, stageWidth) {

        this.width = stageWidth;
        this.speed = 0;
        
        this.mapManager = TileMapManager(mapName);
        this.background = Sprite(this.mapManager.getIamge('background')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        this.foreground = Sprite(this.mapManager.getIamge('foreground')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);
        this.block = Sprite(this.mapManager.getIamge('block')).setOrigin(0, 0).setPosition(0, 0).addChildTo(layer);

        this.x = 0;
        this.executedCol = 0;
    },
    /**
     * @function update
     * @brief 更新処理
     * ステージの状態を更新する。
     */
    update: function() {

        // イベントを実行する。
        this._execEvent();

        // スピードに応じて移動する。
        this._move();
    },
    /**
     * @function _execEvent
     * @brief イベント実行処理
     * マップのイベントレイヤーのオブジェクトを取得し、イベントを実行する。
     * 実行する範囲は前回実行した列から現在画面に表示している列 + 2列。
     */
    _execEvent: function() {

        // 画面外2個先の列まで処理を行う。
        var maxCol = Math.floor((-this.x + this.width) / Stage.TILE_SIZE) + 2;

        // イベント実行する範囲を計算する。
        var execPos = this.executedCol * Stage.TILE_SIZE;
        var execWidth = (maxCol - this.executedCol) * Stage.TILE_SIZE;
        
        // イベント実行する範囲がある場合
        if (execWidth > 0) {

            // イベントレイヤーのオブジェクトを検索する。
            var objects = this.mapManager.getObjects('event', execPos, 0, execWidth, Stage.STAGE_HEIGHT);

            // イベントを実行する。
            for (var i = 0; i < objects.length; i++) {
                switch (objects[i].type) {
                case 'speed':
                    this.speed = objects[i].properties['speed'];
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
});
