// phina.jsを読み込む
var phina = require('./vendor/phina.js');

// 各ステージのマップデータを読み込む
var tmx_stage1 = require('./stage1.js');

// マウスが接続されているかどうか
var isMouseUsed = false;

// マウス移動とタッチ操作の際に呼ばれ、タッチ操作でない場合はマウス接続されていると判断する。
function detectDeviceType(event) {
	isMouseUsed = !event.changedTouches;
	document.removeEventListener('touchstart', detectDeviceType);
	document.removeEventListener('mousemove', detectDeviceType);
}
document.addEventListener('touchstart', detectDeviceType);
document.addEventListener('mousemove', detectDeviceType);

// phina.js をグローバル領域に展開
phina.globalize();

// モノクロの各色の定義
const COLOR = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// 拡大率
const ZOOM_RATIO = 2;
// スクリーンの幅
const SCREEN_WIDTH = 240 * ZOOM_RATIO;
// スクリーンの高さ
const SCREEN_HEIGHT = 160 * ZOOM_RATIO;

// アセット
const ASSETS = {
    image: {
        'player': './images/player.png',
        'back': './images/back.png',
        'block': './images/block.png',
    },
    spritesheet: {
        'player_ss': './images/player_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
    },
};

var TileMapManager = TileMapManager || {}; 

/**
 * @function getIamge
 * @brief レイヤー画像取得処理
 * 指定したマップ、レイヤーの画像をテクスチャとして取得する。
 *
 * @param [in] mapName マップ名
 * @param [in] layerName レイヤー名
 * @return マップ画像のテクスチャ
 */
TileMapManager.getIamge = function(mapName, layerName) {

    // マップ名に対応するマップを取得する。
    var map = TileMaps[mapName];

    // マップの幅と高さのドット数を求める。
    var width = map.width * map.tilewidth;
    var height = map.height * map.tileheight;

    // canvasを作成する。
    var canvas = phina.graphics.Canvas().setSize(width, height);

    // レイヤー名に対応するレイヤーを取得する。
    var layer;
    for (var i = 0; i < map.layers.length; i++) {
        if (map.layers[i].name == layerName) {
            layer = map.layers[i];
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
            this._drawTile(canvas, map.tilesets, layer.data[i], x * map.tilewidth, y * map.tileheight);
        }
    }

    // テクスチャを作成し、描画結果として返す。
    var texture = phina.asset.Texture();
    texture.domElement = canvas.domElement;
    return texture;
};

/**
 * @function _drawTile
 * @brief タイル描画処理
 * canvasにタイルを描画する。タイルセットの名前と同じ名前でphina.jsのassetに登録をしておくこと。
 * 
 * @param [in/out] canvas canvas
 * @param [in] tilesets タイルセット配列
 * @param [in] index タイルのgid
 * @param [in] x 描画先x座標
 * @param [in] y 描画先y座標
 */
TileMapManager._drawTile = function(canvas, tilesets, index, x, y) {

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
};

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function() {
        this.superInit({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        });

        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;

        // ゲームパッドを取得する。
        this.gamepadManager = phina.input.GamepadManager();
        this.gamepad = this.gamepadManager.get(0);

        // 背景色を指定する。
        this.backgroundColor = COLOR[0];

        // 背景レイヤーを作成する。
        this.backgroundLayer = DisplayElement().setPosition(0, 0).addChildTo(this);

        // キャラクターレイヤーを作成する。
        this.characterLayer = DisplayElement().addChildTo(this);

        // 背景画像を読み込む。
        this.background = Sprite(TileMapManager.getIamge('stage1', 'background')).setOrigin(0, 0).setPosition(0, 0).addChildTo(this.backgroundLayer);
        this.background.scaleX = ZOOM_RATIO;
        this.background.scaleY = ZOOM_RATIO;
        this.foreground = Sprite(TileMapManager.getIamge('stage1', 'foreground')).setOrigin(0, 0).setPosition(0, 0).addChildTo(this.backgroundLayer);
        this.foreground.scaleX = ZOOM_RATIO;
        this.foreground.scaleY = ZOOM_RATIO;
        this.block = Sprite(TileMapManager.getIamge('stage1', 'block')).setOrigin(0, 0).setPosition(0, 0).addChildTo(this.backgroundLayer);
        this.block.scaleX = ZOOM_RATIO;
        this.block.scaleY = ZOOM_RATIO;

        // 自機画像を作成する。
        this.player = Sprite('player', 16, 16);
        this.player.x = Math.round(this.gridX.center());
        this.player.y = Math.round(this.gridY.center());
        this.player.scaleX = ZOOM_RATIO;
        this.player.scaleY = ZOOM_RATIO;
        this.player.addChildTo(this.characterLayer);

        // 自機の移動スピードを設定する。
        this.player.SPEED_BY_KEY = 2 * ZOOM_RATIO;
        this.player.SPEED_BY_TOUCH = 1.8 * ZOOM_RATIO;
        this.player.SPEED_BY_GAMEPAD = 4 * ZOOM_RATIO;

        // 自機のスプライトシートを作成する。
        this.player_ss = FrameAnimation('player_ss');
        this.player_ss.attachTo(this.player);
        this.player_ss.gotoAndPlay('normal');

        // タッチ情報を初期化する。
        this.touch = {id: -1, x:0, y:0};

        // BGMを再生する。
        SoundManager.playMusic('stage1');
    },
    update: function(app) {

        // ゲームパッドの状態を更新する。
        this.gamepadManager.update();

        var key = app.keyboard;

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this.player.x -= this.player.SPEED_BY_KEY;
        }
        if (key.getKey('right')) {
            this.player.x += this.player.SPEED_BY_KEY;
        }
        if (key.getKey('up')) {
            this.player.y -= this.player.SPEED_BY_KEY;
        }
        if (key.getKey('down')) {
            this.player.y += this.player.SPEED_BY_KEY;
        }

        // '.'入力でコンソールコマンドを入力する。
        if (key.getKeyDown('period')) {
            var command = window.prompt('', '').split(' ');
            switch (command[0]) {
            case 'log':
                var log = '';
                for (var i = 1; i < command.length; i++) {
                    log += command[i] + ' ';
                }
                console.log(log);
                break;
            case 'save':
                localStorage.setItem(command[1], command[2]);
                break;
            case 'load':
                console.log(command[1] + '=' + localStorage.getItem(command[1]));
                break;
            case 'clear':
                localStorage.clear();
                console.log('Clear local storage.');
                break;
            default:
                break;
            }
        }

        var touches = app.pointers;
        var sliding = false;

        for (var i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!isMouseUsed) {

                // スライド操作をしていない状態だった場合、最初のタッチ位置を記憶する。
                if (this.touch.id < 0) {
                    this.touch.id = touches[i].id;
                    this.touch.x = touches[i].x;
                    this.touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }

                // スライド操作をしている場合はスライド量に応じて自機を移動する。
                if (this.touch.id == touches[i].id) {
                    this.player.x += Math.round((touches[i].x - this.touch.x) * this.player.SPEED_BY_TOUCH);
                    this.player.y += Math.round((touches[i].y - this.touch.y) * this.player.SPEED_BY_TOUCH);
                    this.touch.x = touches[i].x;
                    this.touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
            }
        }

        // スライドしていない場合はタッチ情報を初期化する。
        if (!sliding) {
            this.touch.id = -1;
            this.touch.x = 0;
            this.touch.y = 0;
        }

        // アナログスティックの入力を取得する。
        var stick = this.gamepad.getStickDirection(0);

        if (stick.length() > 0.5) {
            this.player.position.add(stick.mul(this.player.SPEED_BY_GAMEPAD));
        }
    },
});

// メイン処理
phina.main(function() {

    // アプリケーションを生成する。
    var app = GameApp({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        startLabel: 'main',
        assets: ASSETS,
    });

    // FPSを設定する。
    app.fps = 60;

    // FPSを表示する。（デバッグ用）
    app.enableStats();

    // iOSのsafariではユーザが操作時のみ音の再生が可能なため、タッチ時にダミーで音声の再生を行う。
    // https://github.com/phinajs/phina.js/issues/197
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // アプリケーションを実行する。
    app.run();
});
