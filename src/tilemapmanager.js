/** @module tilemapmanager */

/**
 * Tiled Map Editorで作成したデータを読み込む。
 * データはjs形式でエクスポートして使用するものとする。
 */
class TileMapManager {

    /**
     * 初期化処理。
     * 使用するマップの名前を指定する。
     * @param {string} mapName - マップ名
     */
    constructor(mapName) {

        /**
         * マップ名に対応するマップ。
         * @type {Object}
         */
        this.map = TileMaps[mapName];

        /**
         * オブジェクトマップ。
         * @type {Object}
         */
        this.objectMap = {};
    }

    /**
     * 指定したレイヤーの画像をテクスチャとして取得する。
     * @param {string} layerName - レイヤー名
     * @return {phina.asset.Texture} マップ画像のテクスチャ
     */
     getIamge(layerName) {

        // マップの幅と高さのドット数を求める。
        const width = this.map.width * this.map.tilewidth;
        const height = this.map.height * this.map.tileheight;

        // canvasを作成する。
        const canvas = phina.graphics.Canvas().setSize(width, height);

        // レイヤー名に対応するレイヤーを取得する。
        let layer;
        for (let i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layerName) {
                layer = this.map.layers[i];
            }
        }

        // 各タイルを作成したcanvasに描画していく。
        for (let i = 0; i < layer.data.length; i++) {

            // タイルが配置されている場合
            if (layer.data[i] > 0) {

                // 一次元配列になっているので、x座標とy座標を計算する。
                const x = i % layer.width;
                const y = Math.floor(i / layer.width);

                // タイルを描画する。
                this._drawTile(canvas, this.map.tilesets, layer.data[i], x * this.map.tilewidth, y * this.map.tileheight);
            }
        }

        // テクスチャを作成し、描画結果として返す。
        const texture = phina.asset.Texture();
        texture.domElement = canvas.domElement;
        return texture;
    }

    /**
     * タイルセットのオブジェクトの情報を作成する。
     * @param {string} layerName - レイヤー名
     * @param [type} type - オブジェクトの種別
     */
    createObjectMap(layerName, type) {

        // 指定された種別のオブジェクトマップを作成する。
        this.objectMap[type] = new Array(this.map.height);
        for (let i = 0; i < this.map.height; i++) {
            this.objectMap[type][i] = new Array(this.map.width);
        }
        
        // レイヤー名に対応するレイヤーを取得する。
        let layer;
        for (let i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layerName) {
                layer = this.map.layers[i];
            }
        }

        // レイヤー内の各タイルを処理する。
        for (let i = 0; i < layer.data.length; i++) {

            // タイルが配置されている場合
            const gid = layer.data[i];
            if (gid > 0) {

                // gidに対応するタイルセットを検索する。
                for (let j = 0; j < this.map.tilesets.length; j++) {

                    // タイルがあった場合
                    const tile = this.map.tilesets[j].tiles[gid - 1];
                    if (tile) {

                        // 指定された種別のオブジェクトを検索する。
                        for (let k = 0; k < tile.objectgroup.objects.length; k++) {

                            const obj = tile.objectgroup.objects[k];
                            if (obj.type === type) {

                                // 一次元配列になっているので、x座標とy座標を計算する。
                                const x = i % layer.width;
                                const y = Math.floor(i / layer.width);

                                // オブジェクトマップにオブジェクトを格納する。
                                this.objectMap[type][y][x] = obj;

                                break;
                            }
                        }

                        break;
                    }
                }
            }
        }
    }

    /**
     * canvasにタイルを描画する。タイルセットの名前と同じ名前でphina.jsのassetに登録をしておくこと。
     * @param {phina.graphics.Canvas} canvas - canvas
     * @param {Array} tilesets - タイルセット配列
     * @param {number} index - タイルのgid
     * @param {number} x - 描画先x座標
     * @param {number} y - 描画先y座標
     */
    _drawTile(canvas, tilesets, index, x, y) {

        let imageName;
        let tileX;
        let tileY;
        let tileWidth;
        let tileHeight;

        // gidに対応するタイルセットを検索する。
        for (let i = 0; i < tilesets.length; i++) {
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
        const image = phina.asset.AssetManager.get('image', imageName);

        // 画像のタイルを切出してcanvasに描画する。
        canvas.context.drawImage(image.domElement, tileX, tileY, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
    }

    /**
     * layerNameで指定されたレイヤーの座標x, yから幅width、高さheightの範囲内にあるオブジェクトを取得する。
     * @param {string} layerName - レイヤー名
     * @param {number} x - 検索範囲左上のx座標
     * @param {number} y - 検索範囲左上のy座標
     * @apram {number} width - 検索範囲幅
     * @param {number} height - 検索範囲高さ
     * @return {Object} 検索結果のオブジェクトの配列
     */
    getObjects(layerName, x, y, width, height) {

        let objects = [];

         // レイヤー名に対応するレイヤーを取得する。
        let layer;
        for (let i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name == layerName) {
                layer = this.map.layers[i];
            }
        }

        // レイヤー内のオブジェクトを検索する。
        for (let i = 0;i < layer.objects.length; i++) {
            let object = layer.objects[i];

            // 指定した範囲内に存在するオブジェクトを戻り値に格納する。
            if (object.x < x + width &&
                object.x + object.width - 1 >= x &&
                object.y < y + height &&
                object.y + object.height - 1>= y) {

                objects.push(object);
            }
        }

        // 検索結果を返す。
        return objects;
   }
}

export default TileMapManager;
