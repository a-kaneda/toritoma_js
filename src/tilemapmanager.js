/**
 * @class TileMapManager
 * @brief Tiled Map Editorデータ管理クラス
 * 
 * Tiled Map Editorで作成したデータを読み込む。
 * データはjs形式でエクスポートして使用するものとする。
 */
phina.define('TileMapManager', {

    /**
     * @function init
     * @brief 初期化処理
     *
     * 使用するマップの名前を指定する。
     *
     * @param [in] mapName マップ名
     */
    init: function(mapName) {

        // マップ名に対応するマップを取得する。
        this.map = TileMaps[mapName];
    },

    /**
     * @function getIamge
     * @brief レイヤー画像取得処理
     *
     * 指定したレイヤーの画像をテクスチャとして取得する。
     *
     * @param [in] layerName レイヤー名
     * @return マップ画像のテクスチャ
     */
     getIamge: function(layerName) {

        // マップの幅と高さのドット数を求める。
        var width = this.map.width * this.map.tilewidth;
        var height = this.map.height * this.map.tileheight;

        // canvasを作成する。
        var canvas = phina.graphics.Canvas().setSize(width, height);

        // レイヤー名に対応するレイヤーを取得する。
        var layer;
        for (var i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layerName) {
                layer = this.map.layers[i];
            }
        }

        // 各タイルを作成したcanvasに描画していく。
        for (var i = 0; i < layer.data.length; i++) {

            // タイルが配置されている場合
            if (layer.data[i] > 0) {

                // 一次元配列になっているので、x座標とy座標を計算する。
                var x = i % layer.width;
                var y = Math.floor(i / layer.width);

                // タイルを描画する。
                this._drawTile(canvas, this.map.tilesets, layer.data[i], x * this.map.tilewidth, y * this.map.tileheight);
            }
        }

        // テクスチャを作成し、描画結果として返す。
        var texture = phina.asset.Texture();
        texture.domElement = canvas.domElement;
        return texture;
    },

    /**
     * @function _drawTile
     * @brief タイル描画処理
     *
     * canvasにタイルを描画する。タイルセットの名前と同じ名前でphina.jsのassetに登録をしておくこと。
     * 
     * @param [in/out] canvas canvas
     * @param [in] tilesets タイルセット配列
     * @param [in] index タイルのgid
     * @param [in] x 描画先x座標
     * @param [in] y 描画先y座標
     */
    _drawTile: function(canvas, tilesets, index, x, y) {

        var imageName;
        var tileX;
        var tileY;
        var tileWidth;
        var tileHeight;

        // gidに対応するタイルセットを検索する。
        for (var i = 0; i < tilesets.length; i++) {
            if (index >= tilesets[i].firstgid && index < tilesets[i].firstgid + tilesets[i].tilecount) {
                imageName = tilesets[i].name;
                tileX = ((index - tilesets[i].firstgid) % tilesets[i].columns) * tilesets[i].tilewidth;
                tileY = Math.floor((index - tilesets[i].firstgid) / tilesets[i].columns) * tilesets[i].tileheight;
                tileWidth = tilesets[i].tilewidth;
                tileHeight = tilesets[i].tileheight;
                break;
            }
        }

        // 画像を取得する。
        var image = phina.asset.AssetManager.get('image', imageName);

        // 画像のタイルを切出してcanvasに描画する。
        canvas.context.drawImage(image.domElement, tileX, tileY, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
    },

    /**
     * @function getObjects
     * @brief オブジェクト検索処理
     * 
     * layerNameで指定されたレイヤーの座標x, yから幅w、高さhの範囲内にあるオブジェクトを取得する。
     *
     * @param [in] layerName レイヤー名
     * @param [in] x 検索範囲左上のx座標
     * @param [in] y 検索範囲左上のy座標
     * @apram [in] w 検索範囲幅
     * @param [in] h 検索範囲高さ
     * @return 検索結果のオブジェクトの配列
     */
    getObjects: function(layerName, x, y, w, h) {
        var objects = [];

         // レイヤー名に対応するレイヤーを取得する。
        var layer;
        for (var i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layerName) {
                layer = this.map.layers[i];
            }
        }

        // レイヤー内のオブジェクトを検索する。
        for (var i = 0;i < layer.objects.length; i++) {
            var object = layer.objects[i];

            // 指定した範囲内に存在するオブジェクトを戻り値に格納する。
            if (object.x < x + w &&
                object.x + object.width - 1 >= x &&
                object.y < y + h &&
                object.y + object.height - 1>= y) {

                objects.push(object);
            }
        }

        // 検索結果を返す。
        return objects;
   },
});

