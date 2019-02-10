/** @module tilemapmanager */

/**
 * Tiled Map Editorで作成したデータを読み込む。
 * データはjs形式でエクスポートして使用するものとする。
 */
class TileMapManager {

    /** タイルマップ */
    private _map: TileMap;
    /** オブジェクトマップ */
    private _objectMap: {[key: string]: TileMapObject[][]};

    /**
     * 初期化処理。
     * 使用するマップの名前を指定する。
     * @param mapName マップ名
     */
    constructor(mapName: string) {

        // マップ名に対応するマップを取得する。
        this._map = phina.asset.AssetManager.get('json', mapName).data;

        // オブジェクトマップを初期化する。
        this._objectMap = {};
    }

    /**
     * 指定したレイヤーの画像をテクスチャとして取得する。
     * @param layerName レイヤー名
     * @return マップ画像のテクスチャ
     */
     public getIamge(layerName: string): phina.asset.Texture | null {

        // マップの幅と高さのドット数を求める。
        const width = this._map.width * this._map.tilewidth;
        const height = this._map.height * this._map.tileheight;

        // canvasを作成する。
        const canvas = new phina.graphics.Canvas().setSize(width, height);

        // レイヤー名に対応するレイヤーを取得する。
        let work: TileLayer | ObjectLayer | null = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i]
            }
        }

        // 型チェックを行い、異常があれば処理を終了する。
        const isTileLayer = (item: any): item is TileLayer => item !== null && item.type === 'tilelayer';
        if (!isTileLayer(work)) {
            return null;
        }

        const layer: TileLayer = work;

        // 各タイルを作成したcanvasに描画していく。
        for (let i = 0; i < layer.data.length; i++) {

            // タイルが配置されている場合
            if (layer.data[i] > 0) {

                // 一次元配列になっているので、x座標とy座標を計算する。
                const x = i % layer.width;
                const y = Math.floor(i / layer.width);

                // タイルを描画する。
                this._drawTile(canvas, this._map.tilesets, layer.data[i], x * this._map.tilewidth, y * this._map.tileheight);
            }
        }

        // テクスチャを作成し、描画結果として返す。
        const texture = new phina.asset.Texture();
        texture.domElement = canvas.domElement;
        return texture;
    }

    /**
     * タイルセットのオブジェクトの情報を作成する。
     * @param layerName レイヤー名
     * @param type オブジェクトの種別
     */
    public createObjectMap(layerName: string, type: string): void {

        // 指定された種別のオブジェクトマップを作成する。
        this._objectMap[type] = new Array(this._map.height);
        for (let i = 0; i < this._map.height; i++) {
            this._objectMap[type][i] = new Array(this._map.width);
        }
        
        // レイヤー名に対応するレイヤーを取得する。
        let work: TileLayer | ObjectLayer | null = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i];
            }
        }

        // 型チェックを行い、異常があれば処理を終了する。
        const isTileLayer = (item: any): item is TileLayer => item !== null && item.type === 'tilelayer';
        if (!isTileLayer(work)) {
            return;
        }

        const layer: TileLayer = work;

        // レイヤー内の各タイルを処理する。
        for (let i = 0; i < layer.data.length; i++) {

            // タイルが配置されている場合
            const gid = layer.data[i];
            if (gid > 0) {

                // gidに対応するタイルセットを検索する。
                for (let j = 0; j < this._map.tilesets.length; j++) {

                    for (let tile of this._map.tilesets[j].tiles) {
                    
                        // タイルがあった場合
                        if (tile.id == gid - 1) {

                            // 指定された種別のオブジェクトを検索する。
                            for (let k = 0; k < tile.objectgroup.objects.length; k++) {
    
                                const obj = tile.objectgroup.objects[k];
                                if (obj.type === type) {
    
                                    // 一次元配列になっているので、x座標とy座標を計算する。
                                    const x = i % layer.width;
                                    const y = Math.floor(i / layer.width);
    
                                    // オブジェクトマップにオブジェクトを格納する。
                                    this._objectMap[type][y][x] = obj;

                                    break;
                                }
                            }
    
                            break;
                        }
    
                    }
                }
            }
        }
    }

    /**
     * layerNameで指定されたレイヤーの座標x, yから幅width、高さheightの範囲内にあるオブジェクトを取得する。
     * @param layerName レイヤー名
     * @param x 検索範囲左上のx座標
     * @param y 検索範囲左上のy座標
     * @param width 検索範囲幅
     * @param height 検索範囲高さ
     * @return 検索結果のオブジェクトの配列
     */
    public getObjects(layerName: string, x: number, y: number, width: number, height: number): TileMapObject[] {

        let objects: TileMapObject[] = [];

         // レイヤー名に対応するレイヤーを取得する。
         let work: TileLayer | ObjectLayer | null = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i];
            }
        }

        // 型チェックを行い、異常があれば処理を終了する。
        const isObjectLayer = (item: any): item is ObjectLayer => item !== null && item.type === 'objectgroup';
        if (!isObjectLayer(work)) {
            return objects;
        }

        const layer: ObjectLayer = work;

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

    /**
     * オブジェクトマップを取得する。
     * @param name レイヤー名
     * @return オブジェクトマップ
     */
    public getObjectMap(name: string): TileMapObject[][] {
        return this._objectMap[name];
    }

    /**
     * canvasにタイルを描画する。タイルセットの名前と同じ名前でphina.jsのassetに登録をしておくこと。
     * @param canvas canvas
     * @param tilesets タイルセット配列
     * @param index タイルのgid
     * @param x 描画先x座標
     * @param y 描画先y座標
     */
    private _drawTile(canvas: phina.graphics.Canvas, tilesets: TileSet[], index: number, x: number, y: number): void {

        // gidに対応するタイルセットを検索する。
        let found = -1;
        for (let i = 0; i < tilesets.length; i++) {
            if (index >= tilesets[i].firstgid && index < tilesets[i].firstgid + tilesets[i].tilecount) {
                found = i;
                break;
            }
        }
        
        // 見つからなかった場合は処理を終了する。
        if (found < 0) {
            return;
        }

        const imageName = tilesets[found].name;
        const tileX = ((index - tilesets[found].firstgid) % tilesets[found].columns) * tilesets[found].tilewidth;
        const tileY = Math.floor((index - tilesets[found].firstgid) / tilesets[found].columns) * tilesets[found].tileheight;
        const tileWidth = tilesets[found].tilewidth;
        const tileHeight = tilesets[found].tileheight;

        // 画像を取得する。
        const image = phina.asset.AssetManager.get('image', imageName);

        // 画像のタイルを切出してcanvasに描画する。
        canvas.context.drawImage(image.domElement, tileX, tileY, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
    }
}

export default TileMapManager;
