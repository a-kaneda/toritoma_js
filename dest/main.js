/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module screensize */
// 拡大率
const ZOOM_RATIO = 2;
// スクリーンの幅
const SCREEN_WIDTH = 240 * ZOOM_RATIO;
// スクリーンの高さ
const SCREEN_HEIGHT = 180 * ZOOM_RATIO;
// ゲーム画面のサイズ
const STAGE_RECT = {
    x: 24,
    y: 0,
    width: 192,
    height: 144,
};
/**
 * 画面サイズを管理する。
 */
class ScreenSize {
    /** 拡大率 */
    static get ZOOM_RATIO() {
        return ZOOM_RATIO;
    }
    /** スクリーンの幅 */
    static get SCREEN_WIDTH() {
        return SCREEN_WIDTH;
    }
    /** スクリーンの高さ */
    static get SCREEN_HEIGHT() {
        return SCREEN_HEIGHT;
    }
    /** ゲーム画面のサイズ */
    static get STAGE_RECT() {
        return STAGE_RECT;
    }
    ;
}
/* harmony default export */ __webpack_exports__["a"] = (ScreenSize);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * コントロールサイズ
 */
var ControlSize = {
    title: {
        x: 0,
        y: 0,
        width: 128,
        height: 112,
    },
    chickenGaugeEmpty: {
        x: 0,
        y: 112,
        width: 128,
        height: 8,
    },
    chickenGaugeFull: {
        x: 0,
        y: 120,
        width: 128,
        height: 8,
    },
    bossLifeGaugeEmpty: {
        x: 128,
        y: 0,
        width: 8,
        height: 96,
    },
    bossLifeGaugeFull: {
        x: 136,
        y: 0,
        width: 8,
        height: 96,
    },
    shieldButtonOff: {
        x: 144,
        y: 0,
        width: 32,
        height: 32,
    },
    shieldButtonOn: {
        x: 176,
        y: 0,
        width: 32,
        height: 32,
    },
    frameBack: {
        x: 208,
        y: 0,
        width: 16,
        height: 16,
    },
    frameTopLeft: {
        x: 224,
        y: 0,
        width: 4,
        height: 4,
    },
    frameTop: {
        x: 228,
        y: 0,
        width: 4,
        height: 4,
    },
    frameTopRight: {
        x: 232,
        y: 0,
        width: 4,
        height: 4,
    },
    frameLeft: {
        x: 224,
        y: 4,
        width: 4,
        height: 4,
    },
    frameRight: {
        x: 232,
        y: 4,
        width: 4,
        height: 4,
    },
    frameBottomLeft: {
        x: 224,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottom: {
        x: 228,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottomRight: {
        x: 232,
        y: 8,
        width: 4,
        height: 4,
    },
    life: {
        x: 240,
        y: 0,
        width: 8,
        height: 8,
    },
    pauseButton: {
        x: 208,
        y: 16,
        width: 16,
        height: 16,
    },
    cursor: {
        x: 224,
        y: 15,
        width: 22,
        height: 17,
    },
    buttonTopLeft: {
        x: 144,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonTop: {
        x: 152,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonTopRight: {
        x: 160,
        y: 32,
        width: 8,
        height: 8,
    },
    buttonLeft: {
        x: 144,
        y: 40,
        width: 8,
        height: 8,
    },
    buttonRight: {
        x: 160,
        y: 40,
        width: 8,
        height: 8,
    },
    buttonBottomLeft: {
        x: 144,
        y: 48,
        width: 8,
        height: 8,
    },
    buttonBottom: {
        x: 152,
        y: 48,
        width: 8,
        height: 8,
    },
    buttonBottomRight: {
        x: 160,
        y: 48,
        width: 8,
        height: 8,
    },
    prevButton: {
        x: 176,
        y: 32,
        width: 16,
        height: 16,
    },
    nextButton: {
        x: 192,
        y: 32,
        width: 16,
        height: 16,
    },
    backButton: {
        x: 208,
        y: 32,
        width: 16,
        height: 16,
    },
};
/* harmony default export */ __webpack_exports__["a"] = (ControlSize);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DeathEffect; });
/**
 * キャラクター種別
 */
const type = {
    /** 自機 */
    PLAYER: 1,
    /** 自機オプション */
    PLAYER_OPTION: 2,
    /** 自機弾 */
    PLAYER_SHOT: 3,
    /** 敵 */
    ENEMY: 4,
    /** 敵弾 */
    ENEMY_SHOT: 5,
    /** エフェクト */
    EFFECT: 6,
};
/** 敵キャラ死亡エフェクト */
var DeathEffect;
(function (DeathEffect) {
    DeathEffect[DeathEffect["NORMAL"] = 0] = "NORMAL";
    DeathEffect[DeathEffect["BOSS"] = 1] = "BOSS";
})(DeathEffect || (DeathEffect = {}));
/**
 * 敵キャラパラメータ定義。
 */
const enemy = {
    // トンボ
    dragonfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
        death: DeathEffect.NORMAL,
    },
    // アリ
    ant: {
        size: 16,
        width: 16,
        height: 8,
        hp: 7,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // チョウ
    butterfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 10,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // テントウムシ
    ladybug: {
        size: 16,
        width: 16,
        height: 16,
        hp: 18,
        defense: 0,
        score: 200,
        death: DeathEffect.NORMAL,
    },
    // カブトムシ
    rhinocerosbeetle: {
        size: 64,
        width: 64,
        height: 40,
        hp: 1000,
        defense: 0,
        score: 3000,
        death: DeathEffect.BOSS,
    },
};
/**
 * キャラクターに関する定数を管理する。
 */
class Character {
    /**
     * キャラクタータイプ。
     */
    static get type() {
        return type;
    }
    /**
     * 敵キャラクターパラメータ。
     */
    static get enemy() {
        return enemy;
    }
    /**
     * 指定されたキャラクターが敵かどうかを判定する。
     * @param obj キャラクター
     * @return 敵かどうか
     */
    static isEnemy(obj) {
        if (obj.type === Character.type.ENEMY) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 指定されたキャラクターが敵弾かどうかを判定する。
     * @param obj キャラクター
     * @return 敵弾かどうか
     */
    static isEnemyShot(obj) {
        if (obj.type === Character.type.ENEMY_SHOT) {
            return true;
        }
        else {
            return false;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Character);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module mycolor */
// 使用する色、0:薄い、3:濃い
const COLORS = ['#9cb389', '#6e8464', '#40553f', '#12241A'];
// 背景色
const BACK_COLOR = '#9cb389';
// 前景色
const FORE_COLOR = '#12241A';
/**
 * ゲーム内で使用する色を定義する。
 */
class MyColor {
    /**
     * 使用する色、0:薄い、3:濃い
     */
    static get COLORS() {
        return COLORS;
    }
    /**
     * 背景色
     */
    static get BACK_COLOR() {
        return BACK_COLOR;
    }
    /**
     * 前景色
     */
    static get FORE_COLOR() {
        return FORE_COLOR;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (MyColor);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stage_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize_js__ = __webpack_require__(0);


/**
 * 当たり判定処理を行う。
 */
class Collider {
    /**
     * コンストラクタ、当たり判定の範囲を設定する。
     * @param x x座標
     * @param y y座標
     * @param width 幅
     * @param height 高さ
     */
    constructor(x, y, width, height) {
        // メンバ変数に格納する。
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    /** x座標 */
    get x() {
        return this._x;
    }
    /** x座標 */
    set x(value) {
        this._x = value;
    }
    /** y座標 */
    get y() {
        return this._y;
    }
    /** y座標 */
    set y(value) {
        this._y = value;
    }
    /** 幅 */
    get width() {
        return this._width;
    }
    /** 幅 */
    set width(value) {
        this._width = value;
    }
    /** 高さ */
    get height() {
        return this._height;
    }
    /** 高さ */
    set height(value) {
        this._height = value;
    }
    /**
     * 衝突しているキャラクターを検索する。
     * @param characters キャラクター配列
     * @param types 検索対象のキャラクター種別
     * @return 衝突しているキャラクター配列
     */
    getHitCharacter(characters, types) {
        let ret = [];
        // 各キャラクターとの当たり判定を処理する。
        for (let i = 0; i < characters.length; i++) {
            // 検索対象のキャラクター種別か調べる。
            if (types.indexOf(characters[i].type) >= 0) {
                // 接触しているかどうかを調べる。
                if (this.isHitCharacter(characters[i].rect)) {
                    // 見つかったキャラクターを戻り値に追加する。
                    ret.push(characters[i]);
                }
            }
        }
        return ret;
    }
    /**
     * Y軸方向に障害物を検索する。
     * @param isUpside 上向きに検索する場合true
     * @param xpos x座標
     * @param stagePosition ステージのスクロール位置
     * @param blockMap 障害物マップ
     * @return 見つかった障害物、見つからなかった場合は、
     *     上方向の検索の場合はステージ上端、
     *     下方向の検索の場合はステージ下端を返す。
     */
    getBlockY(isUpside, xpos, stagePosition, blockMap) {
        if (isUpside) {
            return this.getBlockYUpside(xpos, stagePosition, blockMap);
        }
        else {
            return this.getBlockYDownside(xpos, stagePosition, blockMap);
        }
    }
    /**
     * Y軸上方向に障害物を検索する。
     * @param xpos x座標
     * @param stagePosition ステージのスクロール位置
     * @param blockMap 障害物マップ
     * @return 見つかった障害物、見つからなかった場合は、ステージ上端を返す。
     */
    getBlockYUpside(xpos, stagePosition, blockMap) {
        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this._y / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE), blockMap.length - 1);
        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        // 下から上方向に検索する。
        for (let y = ybegin; y >= 0; y--) {
            if (blockMap[y][x]) {
                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };
                return ret;
            }
        }
        // 見つからなかった場合、ステージ上端を返す。
        const ret = {
            x: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.width / 2,
            y: 0,
            width: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.width,
            height: 0,
        };
        return ret;
    }
    /**
     * Y軸下方向に障害物を検索する。
     * @param xpos x座標
     * @param stagePosition ステージのスクロール位置
     * @param blockMap 障害物マップ
     * @return 見つかった障害物、見つからなかった場合は、ステージ下端を返す。
     */
    getBlockYDownside(xpos, stagePosition, blockMap) {
        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this._y / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE), blockMap.length - 1);
        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        // 上から下方向に検索する。
        for (let y = ybegin; y < blockMap.length; y++) {
            if (blockMap[y][x]) {
                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };
                return ret;
            }
        }
        // 見つからなかった場合、ステージ下端を返す。
        const ret = {
            x: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.width / 2,
            y: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.height,
            width: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.width,
            height: 0,
        };
        return ret;
    }
    /**
     * キャラクター同士の当たり判定。
     * キャラクター同士が衝突しているかどうかを判定する。
     * @param target 対象のキャラクター
     * @return 衝突しているかどうか
     */
    isHitCharacter(target) {
        if (this.x - this.width / 2 < target.x + target.width / 2 &&
            this.x + this.width / 2 > target.x - target.width / 2 &&
            this.y - this.height < target.y + target.height / 2 &&
            this.y + this.height > target.y - target.height / 2) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 衝突しているブロックを調べる。
     * キャラクターの周囲にあるマップを探し、衝突しているブロックがあれば
     * そのブロックの座標とサイズを返す。衝突していなければnullを返す。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 衝突しているブロック、見つからなければnull。
     */
    checkCollidedBlock(character, stagePosition, blockMap) {
        // ブロックマップの検索範囲を計算する。
        let xmin = Math.floor((character.x - character.width / 2 + stagePosition) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        let xmax = Math.ceil((character.x + character.width / 2 + stagePosition) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        let ymin = Math.floor((character.y - character.height / 2) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        let ymax = Math.ceil((character.y + character.height / 2) / __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE);
        // x、yの上下限値をチェックする。
        if (xmin < 0) {
            xmin = 0;
        }
        if (xmax >= blockMap[0].length) {
            xmax = blockMap[0].length - 1;
        }
        if (ymin < 0) {
            ymin = 0;
        }
        if (ymax >= blockMap.length) {
            ymax = blockMap.length - 1;
        }
        // 周囲のタイルから衝突しているブロックを探す。
        for (let y = ymin; y <= ymax; y++) {
            for (let x = xmin; x <= xmax; x++) {
                // 衝突しているブロックが見つかった場合
                if (blockMap[y][x] &&
                    character.x - character.width / 2 < x * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width &&
                    character.x + character.width / 2 > x * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x &&
                    character.y - character.height / 2 < y * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height &&
                    character.y + character.height / 2 > y * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y) {
                    // ブロックの中心座標とサイズを戻り値とする。
                    // 変数名や値はキャラクターに合わせる。
                    const ret = {
                        x: x * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                        y: y * __WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                        width: blockMap[y][x].width,
                        height: blockMap[y][x].height,
                    };
                    return ret;
                }
            }
        }
        return null;
    }
    /**
     * ブロック衝突による移動を行う。
     * 右方向移動中に衝突した場合はブロックの左端に移動する。他の方向も同様。
     * 移動前から衝突している場合はその方向には移動しない。このケースは
     * ブロック移動による押出処理で対応する。
     * 縦横どちらにも移動する場合には横方向だけ移動して再度衝突をチェックし、
     * 衝突しなければ横方向だけ移動し、衝突すれば縦方向だけ移動する。
     * @param character キャラクター
     * @param prevX 移動前x座標
     * @param prevY 移動前y座標
     * @param block 衝突したブロックの位置とサイズ
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 移動後の座標
     */
    moveByBlock(character, prevX, prevY, block, stagePosition, blockMap) {
        // 衝突による移動先の座標を現在の座標で初期化する
        let newPosition = {
            x: character.x,
            y: character.y,
            width: character.width,
            height: character.height,
        };
        // 障害物の横方向の端に合わせて移動した場合は
        // 縦方向の移動は不要になるため、フラグを立てて後で使用する。
        let isXMoved = false;
        // x方向右に進んでいる時に衝突した場合
        if (character.x > prevX &&
            character.x + character.width / 2 > block.x - block.width / 2) {
            // 前回の右端が障害物の前回の左端よりも右側ならば
            // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
            // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
            // 脱出を試みる。
            if (prevX + character.width / 2 > block.x - block.width / 2) {
                newPosition.x = prevX;
                // 横方向移動のフラグは立てない。
                // 縦方向移動のフラグがたった場合はここでの変更は元に戻すため。
            }
            else {
                // そうでない場合は右端を障害物の左端に合わせる
                newPosition.x = block.x - block.width / 2 - character.width / 2;
                // 横方向移動のフラグを立てる
                isXMoved = true;
            }
        }
        else if (character.x < prevX &&
            character.x - character.width / 2 < block.x + block.width / 2) {
            // 前回の左端が障害物の前回の右端よりも左側ならば
            // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
            // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
            // 脱出を試みる。
            if (prevX - character.width / 2 < block.x + block.width / 2) {
                newPosition.x = prevX;
                // 横方向移動のフラグは立てない。
                // 縦方向移動のフラグがたった場合はここでの変更は元に戻すため。
            }
            else {
                // そうでない場合は左端を障害物の右端に合わせる
                newPosition.x = block.x + block.width / 2 + character.width / 2;
                // 横方向移動のフラグを立てる
                isXMoved = true;
            }
        }
        else {
            // x方向に進んでいない、または衝突していない場合は無処理
        }
        // 障害物の縦方向の端に合わせて移動した場合は
        // 横方向の移動は不要になるため、フラグを立てて後で使用する。
        let isYMoved = false;
        // y方向上に進んでいる時に衝突した場合
        if (character.y < prevY &&
            character.y - character.height / 2 < block.y + block.height / 2) {
            // 前回の上端が障害物の前回の下端よりも上側ならば
            // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
            // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
            // 脱出を試みる。
            if (prevY - character.height / 2 < block.y + block.height / 2) {
                newPosition.y = prevY;
                // 縦方向移動のフラグは立てない。
                // 横方向移動のフラグがたった場合はここでの変更は元に戻すため。
            }
            else {
                // そうでない場合は上端を障害物の下端に合わせる
                newPosition.y = block.y + block.height / 2 + character.height / 2;
                // 縦方向移動のフラグを立てる
                isYMoved = true;
            }
        }
        else if (character.y > prevY &&
            character.y + character.height / 2 > block.y - block.height / 2) {
            // 前回の下端が障害物の前回の上端よりも下側ならば
            // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
            // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
            // 脱出を試みる。
            if (prevY + character.height / 2 > block.y - block.height / 2) {
                newPosition.y = prevY;
                // 縦方向移動のフラグは立てない。
                // 横方向移動のフラグがたった場合はここでの変更は元に戻すため。
            }
            else {
                // そうでない場合は下端を障害物の上端に合わせる
                newPosition.y = block.y - block.height / 2 - character.height / 2;
                // 縦方向移動のフラグを立てる
                isYMoved = true;
            }
        }
        else {
            // y方向に進んでいない、または衝突していない場合は無処理
        }
        // xy方向両方へ移動した場合
        if (isXMoved && isYMoved) {
            // y座標だけ元に戻して衝突するか調べる。
            const newYPosBackup = newPosition.y;
            newPosition.y = character.y;
            if (this.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {
                // x座標だけ元に戻して衝突するか調べる。
                const newXPosBackupt = newPosition.x;
                newPosition.x = character.x;
                newPosition.y = newYPosBackup;
                if (this.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {
                    // 片方だけでは衝突する場合は両方の値を採用する。
                    newPosition.x = newXPosBackupt;
                }
            }
        }
        else if (isXMoved) {
            // y方向は元に戻す。
            newPosition.y = character.y;
        }
        else if (isYMoved) {
            // x方向は元に戻す。
            newPosition.x = character.x;
        }
        else {
            // 変更後の値を採用する。
            // 障害物に入り込んでいる方向については移動前のものに戻される。
        }
        // 移動後の座標を戻り値として返す。
        return newPosition;
    }
    /**
     * ブロックを避けて上に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 移動後の位置
     */
    _dodgeBlockUp(character, stagePosition, blockMap) {
        // 上方向に移動してブロックを回避する。
        const dest = this._dodgeBlock(character, stagePosition, blockMap, (dest, block) => { dest.y = block.y - block.height / 2 - dest.height / 2; });
        // 移動先の座標を返す。
        return dest;
    }
    /**
     * ブロックを避けて下に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 移動後の位置
     */
    _dodgeBlockDown(character, stagePosition, blockMap) {
        // 下方向に移動してブロックを回避する。
        const dest = this._dodgeBlock(character, stagePosition, blockMap, (dest, block) => { dest.y = block.y + block.height / 2 + dest.height / 2; });
        // 移動先の座標を返す。
        return dest;
    }
    /**
     * ブロックを避けて左に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 移動後の位置
     */
    _dodgeBlockLeft(character, stagePosition, blockMap) {
        // 左方向に移動してブロックを回避する。
        const dest = this._dodgeBlock(character, stagePosition, blockMap, (dest, block) => { dest.x = block.x - block.width / 2 - dest.width / 2; });
        // 移動先の座標を返す。
        return dest;
    }
    /**
     * ブロックを避けて右に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @return 移動後の位置
     */
    _dodgeBlockRight(character, stagePosition, blockMap) {
        // 右方向に移動してブロックを回避する。
        const dest = this._dodgeBlock(character, stagePosition, blockMap, (dest, block) => { dest.x = block.x + block.width / 2 + dest.width / 2; });
        // 移動先の座標を返す。
        return dest;
    }
    /**
     * ブロックを避けて移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * 衝突していない場合、画面外まで出る場合は移動前の位置を返す。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @param move 移動する方法
     * @return 移動後の位置
     */
    _dodgeBlock(character, stagePosition, blockMap, move) {
        // 移動先座標の情報を現在位置で初期化する。
        const dest = {
            x: character.x,
            y: character.y,
            width: character.width,
            height: character.height,
        };
        // 衝突するブロックがなくなるまでループする。
        while (true) {
            // 衝突しているブロックを取得する。
            var block = this.checkCollidedBlock(dest, stagePosition, blockMap);
            if (block == null) {
                break;
            }
            // 回避するように移動する。
            move(dest, block);
        }
        // 移動先の座標を返す。
        return dest;
    }
    /**
     * ブロックとぶつかったキャラクターを押し動かす。
     * @param character キャラクター
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     * @param canMoveOut 画面外へ移動できるかどうか
     * @return 移動先座標
     */
    pushCharacter(character, stagePosition, blockMap, canMoveOut) {
        // 各方向への回避した場合の移動先座標を求める。
        const left = this._dodgeBlockLeft(character, stagePosition, blockMap);
        // 画面外への移動を許可する場合は常に左へ移動する。
        if (canMoveOut) {
            return left;
        }
        // 各方向への回避した場合の移動先座標を求める。
        const right = this._dodgeBlockRight(character, stagePosition, blockMap);
        const up = this._dodgeBlockUp(character, stagePosition, blockMap);
        const down = this._dodgeBlockDown(character, stagePosition, blockMap);
        // 移動先候補を設定する。
        // 移動の優先度は
        //   1.スクロール方向
        //   2.スクロールと垂直方向の近い方
        //   3.スクロールと垂直方向の遠い方
        //   4.スクロールと反対方向
        let movePos = new Array(4);
        // 1番目はスクロール方向（左方向）とする。
        movePos[0] = left;
        // 上への移動量の方が小さい場合
        if (character.y - up.y < down.y - character.y) {
            // 2番目を上、3番目を下とする。
            movePos[1] = up;
            movePos[2] = down;
        }
        else {
            // 2番目を下、3番目を上とする。
            movePos[1] = down;
            movePos[2] = up;
        }
        // 4番目はスクロールと反対方向（右方向）とする。
        movePos[3] = right;
        // 4方向へ移動を試みる。
        for (let i = 0; i < 4; i++) {
            // 画面範囲外に出ているかをチェックする。
            if (movePos[i].x >= 0 &&
                movePos[i].x < __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.width &&
                movePos[i].y >= 0 &&
                movePos[i].y < __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].STAGE_RECT.height) {
                // 範囲内の場合はそこへ移動する。
                return movePos[i];
            }
        }
        // どちらにも移動できない場合は移動前の位置を返す。
        return character;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Collider);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collider__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explosion__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screensize__ = __webpack_require__(0);
/** @module enemy */





/**
 * 敵キャラクター。
 */
class Enemy {
    /**
     * コンストラクタ。
     * @param x x座標
     * @param y y座標
     * @param type 種別。
     * @param scene シーン
     */
    constructor(x, y, type, scene) {
        // サイズを取得する。
        const size = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].size;
        // サイズに応じて画像、スプライトシートのファイル名を変える。
        const imageFile = 'image_' + size + 'x' + size;
        const ssFile = 'image_' + size + 'x' + size + '_ss';
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite(imageFile, 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation(ssFile);
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay(type);
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_0__collider__["a" /* default */](x, y, __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].width, __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].height);
        // HPを設定する。
        this._hp = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].hp;
        // 防御力を設定する。
        this._defense = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].defense;
        // スコアを設定する。
        this._score = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].score;
        // 死亡エフェクトを設定する。
        this._death = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].enemy[type].death;
        // 死亡エフェクト間隔を初期化する。
        this._deathInterval = 0;
        // キャラクター種別を設定する。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY;
    }
    /** キャラクター種別。 */
    get type() {
        return this._type;
    }
    /** 位置とサイズ。 */
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene) {
        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this._hp <= 0) {
            this._deathEffect(scene);
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > __WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].STAGE_RECT.width + this._hitArea.width * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
        // キャラクター種別ごとの固有の処理を行う。
        this.action(scene);
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
    /**
     * 攻撃処理。
     * このキャラクターへの攻撃を処理する。
     * 指定した攻撃力 - 防御力をダメージとしてHPから引く。
     * @param power 攻撃力
     */
    attack(power) {
        // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
        if (this._defense < power) {
            this._hp -= power - this._defense;
        }
    }
    /**
     * 死亡処理。
     * @param scene シーン
     */
    _deathEffect(scene) {
        switch (this._death) {
            case __WEBPACK_IMPORTED_MODULE_1__character__["b" /* DeathEffect */].NORMAL:
                this._deathNormal(scene);
                break;
            case __WEBPACK_IMPORTED_MODULE_1__character__["b" /* DeathEffect */].BOSS:
                this._deathBoss(scene);
                break;
            default:
                break;
        }
    }
    /**
     * 雑魚敵の死亡処理。爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param scene シーン
     */
    _deathNormal(scene) {
        // 爆発アニメーションを作成する。
        scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */](this._hitArea.x, this._hitArea.y, scene));
        // スコアを加算する。
        scene.addScore(this._score);
        // 自分自身を削除する。
        scene.removeCharacter(this);
        this._sprite.remove();
    }
    /**
     * ボス敵の死亡処理。一定時間爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param scene シーン
     */
    _deathBoss(scene) {
        // 爆発の間隔
        const EXPLOSION_INTERVAL = 20;
        // 状態遷移間隔
        const STATE_INTERVAL = 300;
        // ボス死亡エフェクト中はキャラクター種別をエフェクトに変更する。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.EFFECT;
        // 爆発の間隔が経過している場合は爆発を発生させる。
        this._deathInterval++;
        if (this._deathInterval % EXPLOSION_INTERVAL == 0) {
            // 爆発発生位置を決める。
            const x = this._hitArea.x + (Math.random() - 0.5) * this._hitArea.width;
            const y = this._hitArea.y + (Math.random() - 0.5) * this._hitArea.height;
            // 爆発アニメーションを作成する。
            scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */](x, y, scene));
        }
        // 状態遷移間隔が経過している場合は死亡処理を行う。
        if (this._deathInterval > STATE_INTERVAL) {
            // スコアを加算する。
            scene.addScore(this._score);
            // 自分自身を削除する。
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collider__ = __webpack_require__(4);
/** @module enemyshot */



// 当たり判定幅
const HIT_WIDTH = 3;
// 当たり判定高さ
const HIT_HEIGHT = 3;
// かすりゲージ増加率
const GRAZE_RATE = 0.02;
// 反射弾の攻撃力
const REFLECTION_POWER = 5;
/**
 * 敵が発射する弾。
 */
class EnemyShot {
    /**
     * n-way弾を作成する。
     * @param x x座標
     * @param y y座標
     * @param angle 発射する方向
     * @param count 個数
     * @param interval 弾の間隔の角度
     * @param speed 弾のスピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    static fireNWay(x, y, angle, count, interval, speed, isScroll, scene) {
        // 敵弾が無効化されていない場合は処理をしない。。
        if (scene.isDisableEnemyShot()) {
            return;
        }
        // 指定された個数分、弾を生成する。
        for (let i = 0; i < count; i++) {
            // 中央の角度からどれだけずらすかを計算する。
            const angleDiff = (-1 * (count - 1 - 2 * i) / 2) * interval;
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(x, y, angle + angleDiff, speed, isScroll, scene));
        }
    }
    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param angle 進行方向
     * @param speed スピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    constructor(x, y, angle, speed, isScroll, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_8x8', 8, 8);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_8x8_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('enemy_shot');
        // キャラクター種別を敵弾とする。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY_SHOT;
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_2__collider__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);
        // x方向のスピードを計算する。
        this._speedX = Math.cos(angle) * speed;
        // y方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._speedY = Math.sin(angle) * speed * -1;
        // スクロールに合わせて移動するかどうかを設定する。
        this._isScroll = isScroll;
        // かすり時のゲージ増加率を設定する。
        this._grazeRate = GRAZE_RATE;
    }
    /** キャラクター種別 */
    get type() {
        return this._type;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /**
     * スピードに応じて移動する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    update(scene) {
        // スピードに応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
        // タイプが自機弾になっている場合、反射弾として敵との当たり判定を行う。
        if (this._type === __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.PLAYER_SHOT) {
            // 衝突している敵キャラクターを検索する。
            const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY]);
            // 衝突している敵キャラクターがいる場合。
            if (hitCharacters.length > 0) {
                const topCharacter = hitCharacters[0];
                if (__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].isEnemy(topCharacter)) {
                    // 敵キャラクターの衝突処理を実行する。
                    topCharacter.attack(REFLECTION_POWER);
                    // 敵キャラクターに接触した場合は自分自身は削除する。
                    scene.removeCharacter(this);
                    this._sprite.remove();
                    // ヒット音を再生するために自機弾衝突フラグを立てる。
                    // 1回のフレームで連続で音声が鳴らないようにシーン側で音声を鳴らす処理を行う。
                    scene.isHitPlayerShot = true;
                    // 敵キャラと衝突した場合は処理を終了する。
                    return;
                }
            }
        }
        // ブロックとの当たり判定処理を行う。
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.width + this._hitArea.width * 2 ||
            this._hitArea.y < -this._hitArea.height * 2 ||
            this._hitArea.y > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.height + this._hitArea.height * 2) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
    /**
     * 削除する。
     * @param scene シーン
     */
    remove(scene) {
        // 自分自身を削除する。
        scene.removeCharacter(this);
        this._sprite.remove();
    }
    /**
     * かすり時のゲージ増加比率を返し、二重にかすらないようにメンバ変数の値を0にする。
     * @return ゲージ増加比率
     */
    graze() {
        const ret = this._grazeRate;
        this._grazeRate = 0;
        return ret;
    }
    /**
     * 移動方向を180度反転させ、自機弾として扱うようにする。
     */
    reflect() {
        // キャラクタータイプを自機弾に変更する。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.PLAYER_SHOT;
        // 進行方向を反転する。
        this._speedX *= -1;
        this._speedY *= -1;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (EnemyShot);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__labelbutton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playingscene__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__howtoplayscene__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__creditscene__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controlsize__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cursor__ = __webpack_require__(10);







// タイトルの位置、x座標
const TITLE_POS_X = 130;
// タイトルの位置、y座標
const TITLE_POS_Y = __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_HEIGHT / 2;
// ボタンの数
const BUTTON_NUM = 3;
// ボタンのID
var BUTTON_ID;
(function (BUTTON_ID) {
    BUTTON_ID[BUTTON_ID["GAME_START"] = 0] = "GAME_START";
    BUTTON_ID[BUTTON_ID["HOW_TO_PLAY"] = 1] = "HOW_TO_PLAY";
    BUTTON_ID[BUTTON_ID["CREDIT"] = 2] = "CREDIT";
})(BUTTON_ID || (BUTTON_ID = {}));
;
// ボタンの位置、x座標
const BUTTON_POS_X = 360;
// ボタンの位置、y座標
const BUTTON_POS_Y = [
    Math.round(__WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_HEIGHT / (BUTTON_NUM + 1)),
    Math.round((__WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_HEIGHT * 2) / (BUTTON_NUM + 1)),
    Math.round((__WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_HEIGHT * 3) / (BUTTON_NUM + 1))
];
// ボタンの幅
const BUTTON_WIDTH = 176;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// カーソルの位置、x座標
const CURSOR_POS_X = 256;
/**
 * タイトルのシーン
 */
class TitleScene {
    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     * @param gamepadManager ゲームパッド管理クラス
     */
    constructor(phinaScene, gamepadManager) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // タイトルロゴを作成する。
        const title = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.width, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.height)
            .addChildTo(this._rootNode)
            .setPosition(TITLE_POS_X, TITLE_POS_Y);
        title.srcRect.set(__WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.x, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.y, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.width, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.height);
        title.scaleX = __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].ZOOM_RATIO;
        title.scaleY = __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].ZOOM_RATIO;
        // ボタン配列を作成する。
        this._buttons = [];
        // ゲームスタートボタンを作成する。
        const gameStartButton = new __WEBPACK_IMPORTED_MODULE_0__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('GAME START')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[0])
            .onEffect(() => { this._disableInput(); })
            .onPush(() => { this._replaceScene('PlayingScene'); });
        this._buttons.push(gameStartButton);
        // 遊び方説明ボタンを作成する。
        const howToPlayButton = new __WEBPACK_IMPORTED_MODULE_0__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('HOW TO PLAY')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[1])
            .onEffect(() => { this._disableInput(); })
            .onPush(() => { this._replaceScene('HowToPlayScene'); });
        this._buttons.push(howToPlayButton);
        // クレジットボタンを作成する。
        const creditButton = new __WEBPACK_IMPORTED_MODULE_0__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel('CREDIT')
            .setPosition(BUTTON_POS_X, BUTTON_POS_Y[2])
            .onEffect(() => { this._disableInput(); })
            .onPush(() => { this._replaceScene('CreditScene'); });
        this._buttons.push(creditButton);
        // カーソルを作成する。
        this._cursor = new __WEBPACK_IMPORTED_MODULE_6__cursor__["a" /* default */]()
            .addChildTo(this._rootNode);
        // カーソル位置の情報を作成する。
        for (let i = 0; i < BUTTON_NUM; i++) {
            // 上に移動するときの位置を決める。ループするようにする。
            const prevPos = i - 1 >= 0 ? i - 1 : BUTTON_NUM - 1;
            // 下に移動するときの位置を決める。ループするようにする。
            const nextPos = i + 1 < BUTTON_NUM ? i + 1 : 0;
            // カーソル位置を登録する。
            this._cursor.addPosition(i, {
                x: CURSOR_POS_X,
                y: BUTTON_POS_Y[i],
                left: -1,
                right: -1,
                up: prevPos,
                down: nextPos
            });
        }
        // 初期位置はGAME STARTボタンの位置とする。
        this._cursor.setPosition(BUTTON_ID.GAME_START);
        // 初期状態は入力は有効とする。
        this._isDisableInput = false;
    }
    /**
     * 更新処理。
     * キー入力処理を行う。
     * @param app アプリケーション
     */
    update(app) {
        // 入力が無効になっていない場合
        if (!this._isDisableInput) {
            // カーソル移動処理を行う。
            this._cursor.input(app.keyboard, this._gamepadManager.get());
            // キーボードの入力処理を行う。
            this._inputKeyboard(app);
            // ゲームパッドの入力処理を行う。。
            this._inputGamepad();
        }
    }
    /**
     * PlayingSceneにシーンを遷移する。
     * @param sceneName シーン名
     */
    _replaceScene(sceneName) {
        this._rootNode.remove();
        switch (sceneName) {
            case 'PlayingScene':
                this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_1__playingscene__["a" /* default */](this._phinaScene, this._gamepadManager);
                break;
            case 'HowToPlayScene':
                this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_2__howtoplayscene__["a" /* default */](this._phinaScene, this._gamepadManager);
                break;
            case 'CreditScene':
                this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_3__creditscene__["a" /* default */](this._phinaScene, this._gamepadManager);
                break;
            default:
                break;
        }
    }
    /**
     * キーボードの入力処理を行う。
     * zキーでボタンを選択する。
     * @param app アプリケーション
     */
    _inputKeyboard(app) {
        // キーボードを取得する。
        const key = app.keyboard;
        // zキーが押されている場合
        if (key.getKeyDown('z')) {
            // 選択中のボタンを実行する。
            this._execButton();
        }
    }
    /**
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad() {
        // ゲームパッドの状態を更新する。
        this._gamepadManager.update();
        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get();
        // Aボタンが押されている場合
        if (gamepad.getKeyDown('a')) {
            // 選択中のボタンを実行する。
            this._execButton();
        }
    }
    /**
     * 選択中のボタンを実行する。
     */
    _execButton() {
        // 選択中のボタンを実行する。
        this._buttons[this._cursor.position].select();
    }
    /**
     * 入力を無効化する。
     */
    _disableInput() {
        // 入力を無効化する。
        this._isDisableInput = true;
        // カーソルを無効化する。。
        this._cursor.setEnable(false);
        // ボタンを無効化する。
        for (let button of this._buttons) {
            button.setEnable(false);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (TitleScene);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
class PointDevice {
    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     * @param event イベント
     */
    static detectDeviceType(event) {
        // touchstartイベントの場合はマウス不使用とする。
        if (event.type === 'touchstart') {
            PointDevice._isMouseUsed = false;
            PointDevice._isTouchUsed = true;
        }
        else {
            PointDevice._isMouseUsed = true;
            PointDevice._isTouchUsed = false;
        }
        document.removeEventListener('touchstart', PointDevice.detectDeviceType, true);
        document.removeEventListener('mousemove', PointDevice.detectDeviceType, true);
    }
    /**
     * デバイスの種類を調べるため、タッチ開始、マウス移動の
     * イベントにチェック用関数を登録する。
     */
    static checkDeviceType() {
        PointDevice._isMouseUsed = false;
        PointDevice._isTouchUsed = false;
        document.addEventListener('touchstart', PointDevice.detectDeviceType, true);
        document.addEventListener('mousemove', PointDevice.detectDeviceType, true);
    }
    /** マウスが接続されているかどうか。 */
    static get isMouseUsed() {
        return PointDevice._isMouseUsed;
    }
    /** タッチデバイスがあるかどうか */
    static get isTouchUsed() {
        return PointDevice._isTouchUsed;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PointDevice);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module util */
/**
 * アプリ全体で使用する関数群を定義する。
 */
class Util {
    /**
     * srcを始点、destを終点としたときの角度を求める。
     * @param src 始点
     * @param dest 終点
     * @return 角度
     */
    static calcAngle(src, dest) {
        // x座標の差分を計算する。
        const diffX = dest.x - src.x;
        // phina.jsではy座標は上が原点のため、反転させる。
        const diffY = src.y - dest.y;
        // 角度を計算する。
        const ret = Math.atan2(diffY, diffX);
        return ret;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(1);


// 方向を表す文字列
const DIRECTIONS = ['left', 'right', 'up', 'down'];
/**
 * カーソル。
 */
class Cursor {
    /**
     * コンストラクタ。
     */
    constructor() {
        // 画像を読み込む。
        this._sprite = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.height);
        this._sprite.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.x, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.y, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].cursor.height);
        this._sprite.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        this._sprite.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        // カーソル位置配列を作成する。
        this._positions = {};
        // 現在のカーソル位置情報を初期化する。
        this._currentPosition = 0;
        // 初期状態は有効とする。
        this._enable = true;
        // ゲームパッドの前回入力があったかどうかの情報を初期化する。
        this._prevGamepadInput = {};
        for (let direction of DIRECTIONS) {
            this._prevGamepadInput[direction] = false;
        }
    }
    /** 現在のカーソル位置のID */
    get position() {
        return this._currentPosition;
    }
    /**
     * 画像を親ノードに追加する。
     * @param parent 親ノード]
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._sprite.addChildTo(parent);
        return this;
    }
    /**
     * カーソル位置情報を追加する。
     * @param id カーソル位置のID、一意な値を指定する。
     * @param position カーソル位置情報
     * @return 自インスタンス
     */
    addPosition(id, position) {
        this._positions[id] = position;
        return this;
    }
    /**
     * カーソルの位置を設定する。addPositionで登録したカーソル位置へ移動する。
     * @param id カーソル位置のID
     * @return 自インスタンス
     */
    setPosition(id) {
        // カーソル位置が登録されている場合
        if (this._positions[id]) {
            // 現在のカーソル位置を変更する。
            this._currentPosition = id;
            // 画像の表示位置を変更する。
            this._sprite.x = this._positions[id].x;
            this._sprite.y = this._positions[id].y;
        }
        return this;
    }
    /**
     * 有効か無効かを設定する。
     * @param value 有効か無効か
     * @return 自インスタンス
     */
    setEnable(value) {
        this._enable = value;
        return this;
    }
    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    input(keyboard, gamepad) {
        // 有効な場合は処理を行う。
        if (this._enable) {
            // キーボードの入力処理を行う。
            this._inputKeyboard(keyboard);
            // ゲームパッドの入力処理を行う。
            this._inputGamepad(gamepad);
        }
        return this;
    }
    /**
     * キーボードの入力処理を行う。
     * 上下キーでカーソルを移動し、zキーでボタンを選択する。
     * @param keyboard キーボード
     */
    _inputKeyboard(keyboard) {
        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {
            // 方向キーが押された場合
            if (keyboard.getKeyDown(direction)) {
                // カーソル位置を移動する。
                this._move(direction);
            }
        }
    }
    /**
     * ゲームパッドの入力処理を行う。
     * @param gamepad ゲームパッド
     */
    _inputGamepad(gamepad) {
        // アナログスティックの入力を取得する。
        const stick = gamepad.getStickDirection(0);
        // アナログスティックの入力方向を調べる。
        const input = {
            'left': false,
            'right': false,
            'up': false,
            'down': false,
        };
        // 左方向に入力されている場合
        if (stick.x < -0.5) {
            input.left = true;
        }
        // 右方向に入力されている場合
        if (stick.x > 0.5) {
            input.right = true;
        }
        // 上方向に入力されている場合
        if (stick.y < -0.5) {
            input.up = true;
        }
        // 下方向に入力されている場合
        if (stick.y > 0.5) {
            input.down = true;
        }
        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {
            // アナログスティックが入力されている場合
            if (input[direction]) {
                // 前回入力されていなかった場合
                if (!this._prevGamepadInput[direction]) {
                    // カーソル位置を移動する。
                    this._move(direction);
                }
                // 前回入力をありにする。
                this._prevGamepadInput[direction] = true;
            }
            else {
                // 前回入力を無しにする。
                this._prevGamepadInput[direction] = false;
            }
        }
    }
    /**
     * カーソル位置を移動する。
     * @param direction 移動方向
     */
    _move(direction) {
        // 現在のカーソル位置の情報がある場合は処理を行う。
        if (this._positions[this._currentPosition]) {
            // 次のカーソル位置を取得する。
            const nextPosition = this._positions[this._currentPosition][direction];
            // 次のカーソル位置の情報がある場合は移動処理を行う。
            if (this._positions[nextPosition]) {
                // カーソル位置を移動する。
                this.setPosition(nextPosition);
                // 効果音を鳴らす。
                phina.asset.SoundManager.play('cursor');
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Cursor);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);


/**
 * 枠を作成する。
 */
class Frame {
    /**
     * コンストラクタ。
     * @param imageName 画像名の先頭文字列
     * @param width 幅
     * @param height 高さ
     */
    constructor(imageName, width, height) {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // 画像名を設定する。
        this._imageName = imageName;
        // 枠を作成する。
        this._createFrames(width, height);
    }
    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._base.addChildTo(parent);
        return this;
    }
    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    setPosition(x, y) {
        this._base.x = x;
        this._base.y = y;
        return this;
    }
    /**
     * ボタンの枠の部分を作成する。
     * @param width 幅
     * @param height 高さ
     */
    _createFrames(width, height) {
        // フレーム1個分のサイズを取得する。
        const FrameSize = __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][this._imageName + 'TopLeft'].width * __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO;
        for (let x = -width / 2; x <= width / 2; x += FrameSize) {
            for (let y = -height / 2; y <= height / 2; y += FrameSize) {
                // 一番上
                if (y === -height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'TopLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, this._imageName + 'Top');
                    }
                    else {
                        this._createFrame(x, y, this._imageName + 'TopRight');
                    }
                }
                else if (y + FrameSize <= height / 2) {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'Left');
                    }
                    else if (x + FrameSize <= width / 2) {
                        // 上下左右真ん中部分は画像無し。
                    }
                    else {
                        this._createFrame(x, y, this._imageName + 'Right');
                    }
                }
                else {
                    // 一番左
                    if (x === -width / 2) {
                        this._createFrame(x, y, this._imageName + 'BottomLeft');
                    }
                    else if (x + FrameSize <= width / 2) {
                        this._createFrame(x, y, this._imageName + 'Bottom');
                    }
                    else {
                        this._createFrame(x, y, this._imageName + 'BottomRight');
                    }
                }
            }
        }
    }
    /**
     * 枠の画像を読み込み、ベースに配置する。
     * @param x x座標
     * @param y y座標
     * @param type 枠のタイプ
     */
    _createFrame(x, y, type) {
        // 枠の画像を読み込む。
        const frame = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].width, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].height);
        frame.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].x, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].y, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].width, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][type].height);
        frame.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO;
        frame.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO;
        frame.addChildTo(this._base)
            .setPosition(x, y);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Frame);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);


/**
 * 画像を使用したボタン。
 * control.pngの中の画像を指定する。
 * ControlSizeの中にサイズ情報を入れておく必要がある。
 */
class ImageBUtton {
    /**
     * コンストラクタ。
     * 画像の読み込みとボタン部分を作成する。
     * @param name コントロール名
     */
    constructor(name) {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // 画像を読み込む。
        this._image = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].width, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].height)
            .addChildTo(this._base);
        this._image.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].x, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].y, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].width, __WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].height);
        this._image.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO;
        this._image.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO;
        // ボタン部分を作成する。
        // タップをやりやすくするため、画像より大きめにサイズを取る。
        this._button = new phina.display.RectangleShape({
            width: Math.ceil(__WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].width * __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO * 2),
            height: Math.ceil(__WEBPACK_IMPORTED_MODULE_0__controlsize__["a" /* default */][name].height * __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].ZOOM_RATIO * 2),
        })
            .addChildTo(this._base);
        // ボタン部分を非表示にする。
        this._button.alpha = 0;
        // タッチ操作を有効にする。
        this._button.setInteractive(true);
        // ベース部分に追加する。
        this._button.addChildTo(this._base);
        // タッチ開始イベントのハンドラを作成する。
        this._button.on('pointstart', (event) => {
            if (this._enable && this._onPush !== null) {
                this._onPush();
            }
        });
        // 初期状態は有効とする。
        this._enable = true;
        // コールバック関数を初期化する。
        this._onPush = null;
    }
    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._base.addChildTo(parent);
        return this;
    }
    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    setPosition(x, y) {
        this._base.x = x;
        this._base.y = y;
        return this;
    }
    /**
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onPush(func) {
        this._onPush = func;
        return this;
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    setEnable(value) {
        this._enable = value;
        return this;
    }
    /**
     * ボタン選択時の処理を行う。
     */
    push() {
        if (this._onPush !== null) {
            this._onPush();
        }
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ImageBUtton);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mycolor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__frame__ = __webpack_require__(11);




// ボタン選択からハンドラ実行までのインターバル(msec)
const EXEC_INTERVAL = 500;
/**
 * ラベルを使用したボタン。
 */
class LabelButton {
    /**
     * コンストラクタ。
     * @param width 幅
     * @param height 高さ
     */
    constructor(width, height) {
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            width: width + __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].buttonTopLeft.width * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO,
            height: height + __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].buttonTopLeft.height * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor__["a" /* default */].BACK_COLOR,
            strokeWidth: 0,
            padding: 0,
        });
        // 枠を作成する。
        const frame = new __WEBPACK_IMPORTED_MODULE_3__frame__["a" /* default */]('button', width, height)
            .addChildTo(this._base);
        // ラベルを作成する。
        this._label = new phina.display.Label({
            text: '',
            fontSize: 24,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._base);
        // ボタン選択エフェクト開始時のコールバック関数を初期化する。
        this._onEffect = null;
        // ボタン選択時のコールバック関数を初期化する。
        this._onPush = null;
        // 初期状態は有効とする。
        this._enable = true;
        // タッチ操作を有効にする。
        this._base.setInteractive(true);
        // タッチ開始イベントのハンドラを作成する。
        this._base.on('pointstart', (event) => {
            this.select();
        });
    }
    /**
     * phina.jsのエレメントに画像を追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._base.addChildTo(parent);
        return this;
    }
    /**
     * 表示位置を設定する。
     * @param x x座標
     * @param y y座標
     * @return 自インスタンス
     */
    setPosition(x, y) {
        this._base.x = x;
        this._base.y = y;
        return this;
    }
    /**
     * ボタン選択エフェクト開始時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onEffect(func) {
        this._onEffect = func;
        return this;
    }
    /**
     * ボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     * @return 自インスタンス
     */
    onPush(func) {
        this._onPush = func;
        return this;
    }
    /**
     * ラベルのテキストを設定する。
     * @param label ラベルのテキスト
     * @return 自インスタンス
     */
    setLabel(label) {
        this._label.text = label;
        return this;
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    setEnable(value) {
        this._enable = value;
        return this;
    }
    /**
     * ボタン選択時の処理を行う。
     * @return 自インスタンス
     */
    select() {
        // 有効なときに処理を行う。
        if (this._enable) {
            // エフェクト開始時のコールバック関数を呼び出す。。
            if (this._onEffect !== null) {
                this._onEffect();
            }
            // 効果音を鳴らす。
            phina.asset.SoundManager.play('select');
            // 点滅アニメーションを実行する。
            // 100ms周期で表示、非表示を切り替える。
            this._base.tweener.wait(100)
                .set({ alpha: 0 })
                .wait(100)
                .set({ alpha: 1 })
                .wait(100)
                .set({ alpha: 0 })
                .wait(100)
                .set({ alpha: 1 })
                .play();
            // イベントハンドラが設定されている場合は一定時間後にハンドラを実行する。
            if (this._onPush !== null) {
                setTimeout(this._onPush, EXEC_INTERVAL);
            }
        }
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (LabelButton);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imagebutton__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);


// 戻るボタンの位置x座標(画面左からの位置)
const BACK_BUTTON_POS_X = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_WIDTH - 28;
// 戻るボタンの位置y座標(画面上からの位置)
const BACK_BUTTON_POS_Y = 28;
// 前ページボタンの位置x座標(画面左からの位置)
const PREV_BUTTON_POS_X = 40;
// 前ページボタンの位置y座標(画面上からの位置)
const PREV_BUTTON_POS_Y = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_HEIGHT / 2;
// 次ページボタンの位置x座標(画面左からの位置)
const NEXT_BUTTON_POS_X = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_WIDTH - 40;
// 次ページボタンの位置y座標(画面上からの位置)
const NEXT_BUTTON_POS_Y = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_HEIGHT / 2;
/**
 * ページを持った画面のインターフェース。
 * 前ページボタン、次ページボタン、戻るボタンを持つ。
 */
class PageLayer {
    /**
     * コンストラクタ。
     */
    constructor() {
        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();
        // 戻るボタンを作成する。
        this._backButton = new __WEBPACK_IMPORTED_MODULE_0__imagebutton__["a" /* default */]('backButton')
            .setPosition(BACK_BUTTON_POS_X, BACK_BUTTON_POS_Y)
            .addChildTo(this._rootNode);
        // 前ページボタンを作成する。
        this._prevButton = new __WEBPACK_IMPORTED_MODULE_0__imagebutton__["a" /* default */]('prevButton')
            .setPosition(PREV_BUTTON_POS_X, PREV_BUTTON_POS_Y)
            .onPush(() => { this._goToPrevPage(); })
            .addChildTo(this._rootNode);
        // 次ページボタンを作成する。
        this._nextButton = new __WEBPACK_IMPORTED_MODULE_0__imagebutton__["a" /* default */]('nextButton')
            .setPosition(NEXT_BUTTON_POS_X, NEXT_BUTTON_POS_Y)
            .onPush(() => { this._goToNextPage(); })
            .addChildTo(this._rootNode);
        // ページ配列を作成する。
        this._pages = [];
        // ページ番号を初期化する。
        this._currentPageNum = 0;
    }
    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._rootNode.addChildTo(parent);
        return this;
    }
    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove() {
        this._rootNode.remove();
        return this;
    }
    /**
     * ページを追加する。
     * @param page ページ
     */
    addPage(page) {
        // メンバ変数に格納する。
        this._pages.push(page);
        // 1個目の場合は画面に配置する。
        if (this._pages.length === 1) {
            this._pages[0].addChildTo(this._rootNode);
        }
        return this;
    }
    /**
     * 戻るボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onBackButton(func) {
        // 戻るボタンにコールバック関数を設定する。
        this._backButton.onPush(() => {
            // 効果音を鳴らす。
            phina.asset.SoundManager.play('select');
            // コールバック関数を呼び出す。
            func();
        });
        return this;
    }
    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    input(keyboard, gamepad) {
        // キーボードのESCキーかゲームパッドのBボタンが押された場合は戻るボタンの処理を行う。
        if (keyboard.getKeyDown('escape') || gamepad.getKeyDown('b')) {
            this._backButton.push();
        }
        else if (keyboard.getKeyDown('left') || gamepad.getKeyDown('left')) {
            this._goToPrevPage();
        }
        else if (keyboard.getKeyDown('right') || gamepad.getKeyDown('right')) {
            this._goToNextPage();
        }
        else {
            // その他のキー入力は処理しない。
        }
    }
    /**
     * 前ページへ移動する。
     */
    _goToPrevPage() {
        // 効果音を鳴らす。
        phina.asset.SoundManager.play('cursor');
        // 現在のページを画面から取り除く。
        this._pages[this._currentPageNum].remove();
        // ページ番号を一つ減らす。
        this._currentPageNum--;
        // 最初のページを過ぎた場合は最後のページに移動する。
        if (this._currentPageNum < 0) {
            this._currentPageNum = this._pages.length - 1;
        }
        // 移動後のページを画面に配置する。
        this._pages[this._currentPageNum].addChildTo(this._rootNode);
    }
    /**
     * 次ページへ移動する。
     */
    _goToNextPage() {
        // 効果音を鳴らす。
        phina.asset.SoundManager.play('cursor');
        // 現在のページを画面から取り除く。
        this._pages[this._currentPageNum].remove();
        // ページ番号を一つ増やす。
        this._currentPageNum++;
        // 最後のページを過ぎた場合は最初のページに移動する。
        if (this._currentPageNum >= this._pages.length) {
            this._currentPageNum = 0;
        }
        // 移動後のページを画面に配置する。
        this._pages[this._currentPageNum].addChildTo(this._rootNode);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PageLayer);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collider__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/** @module playershot */



// 自機の攻撃力
const PLAYER_POWER = 4;
// オプションの攻撃力
const OPTION_POWER = 2;
// 当たり判定幅
const HIT_WIDTH = 3;
// 当たり判定高さ
const HIT_HEIGHT = 3;
/**
 * 自機弾。
 * 右方向に直進する。
 */
class PlayerShot {
    /**
     * コンストラクタ。座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param isOption 発射元がオプションかどうか
     * @param scene シーン
     */
    constructor(x, y, isOption, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_8x8', 8, 8);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_8x8_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('player_shot');
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_1__collider__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);
        // 攻撃力を設定する。
        if (isOption) {
            this._power = OPTION_POWER;
        }
        else {
            this._power = PLAYER_POWER;
        }
    }
    /** キャラクター種別 */
    get type() {
        return __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.PLAYER_SHOT;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    update(scene) {
        // 右へ移動する。
        this._hitArea.x += 5;
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.ENEMY]);
        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {
            const topCharacter = hitCharacters[0];
            if (__WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].isEnemy(topCharacter)) {
                // 敵キャラクターの衝突処理を実行する。
                topCharacter.attack(this._power);
                // 敵キャラクターに接触した場合は自分自身は削除する。
                scene.removeCharacter(this);
                this._sprite.remove();
                // ヒット音を再生するために自機弾衝突フラグを立てる。
                // 1回のフレームで連続で音声が鳴らないようにシーン側で音声を鳴らす処理を行う。
                scene.isHitPlayerShot = true;
                // 敵キャラと衝突した場合は処理を終了する。
                return;
            }
        }
        // ブロックとの当たり判定処理を行う。
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
        // 画面外の敵にダメージを与えないように画面端付近で攻撃力を0にする。
        if (this._hitArea.x > __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width - this._hitArea.width) {
            this._power = 0;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x > __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this._sprite.remove();
            return;
        }
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PlayerShot);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tilemapmanager__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dragonfly__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ant__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__butterfly__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ladybug__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rhinocerosbeetle__ = __webpack_require__(36);
/** @module stage */







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
        this._mapManager = new __WEBPACK_IMPORTED_MODULE_1__tilemapmanager__["a" /* default */](mapName);
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
        const maxCol = Math.floor((-this._x + __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.width) / TILE_SIZE) + 2;
        // イベント実行する範囲を計算する。
        const execPos = this._executedCol * TILE_SIZE;
        const execWidth = (maxCol - this._executedCol) * TILE_SIZE;
        // イベント実行する範囲がある場合
        if (execWidth > 0) {
            // イベントレイヤーのオブジェクトを検索する。
            const objects = this._mapManager.getObjects('event', execPos, 0, execWidth, __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.height);
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
                    case 'bgm':
                        // BGMを再生する。
                        phina.asset.SoundManager.playMusic(obj.name);
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
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__dragonfly__["a" /* default */](x, y, scene));
                break;
            case 'ant':
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_3__ant__["a" /* default */](x, y, scene));
                break;
            case 'butterfly':
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_4__butterfly__["a" /* default */](x, y, scene));
                break;
            case 'ladybug':
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_5__ladybug__["a" /* default */](x, y, scene));
                break;
            case 'rhinocerosbeetle':
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_6__rhinocerosbeetle__["a" /* default */](x, y, scene));
                break;
            default:
                break;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Stage);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * LabelArea拡張クラス。
 * 単語の途中で改行を行わないようにするオプションkeepWordを追加。
 */
phina.define('phina.ui.LabelAreaEx', {
    superClass: 'phina.ui.LabelArea',
    // 単語の途中で改行を行わないようにするかどうか
    _keepWord: false,
    /**
     * コンストラクタ。
     * @param options オプション
     */
    init: function (options) {
        this.superInit(options);
        // オプションにkeepWordが指定されている場合はメンバ変数に設定する。
        // デフォルトは無効とする。
        if (typeof (options) === 'object' && options.keepWord !== undefined) {
            this._keepWord = options.keepWord;
        }
        else {
            this._keepWord = false;
        }
    },
    /**
     * 描画エリアから文字列がはみ出る場合に強制的に改行する。
     * @param lines 元々の文字列
     * @return 改行した文字列
     */
    spliceLines: function (lines) {
        const rowWidth = this.width;
        const context = this.canvas.context;
        context.font = this.font;
        let cache = this.getTextWidthCache();
        // update cache
        const textChars = this._text.split('');
        textChars.forEach(function (ch) {
            if (!cache[ch]) {
                cache[ch] = context.measureText(ch).width;
            }
        });
        const keepWord = this._keepWord;
        let localLines = [];
        lines.forEach(function (line) {
            let str = '';
            let totalWidth = 0;
            let word = '';
            let wordWidth = 0;
            // はみ出ていたら強制的に改行する
            let lineChars = line.split('');
            lineChars.forEach(function (ch) {
                let w = cache[ch];
                // はみ出す場合
                if ((totalWidth + w) > rowWidth) {
                    localLines.push(str);
                    str = '';
                    // 次の行の長さを今までの単語の長さから開始する。
                    totalWidth = wordWidth;
                }
                // 単語の途中での改行が禁止されている場合
                if (keepWord) {
                    // ブランク以外の場合は単語が続いているものとして単語に追加する。
                    if (ch !== ' ') {
                        word += ch;
                        wordWidth += w;
                    }
                    else {
                        str += word;
                        str += ch;
                        word = '';
                        wordWidth = 0;
                    }
                    // はみ出すかどうかの判定のためにトータルの長さは常に計算する。
                    totalWidth += w;
                }
                else {
                    str += ch;
                    totalWidth += w;
                }
            });
            // 残りを push する
            localLines.push(str + word);
        });
        return localLines;
    },
});
// exportするものがないのでダミー変数をexportする。
var LabelAreaExDummy = 0;
/* harmony default export */ __webpack_exports__["a"] = (LabelAreaExDummy);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy_js__ = __webpack_require__(5);



// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動スピード
const MOVE_SPEED = 0.5;
// 移動するフレーム数
const MOVE_FRAME = 120;
// 弾発射間隔
const SHOT_INTERVAL = 30;
// 弾発射時間
const SHOT_FRAME = 120;
// 状態
const STATE = {
    LEFT_MOVE: 1,
    RIGHT_MOVE: 2,
    FIRE: 3,
};
/**
 * 敵キャラクター、アリ。
 * 天井または地面に張り付いて歩く。
 *
 * 左移動:左方向への移動。一定時間経過後に弾発射に遷移する。
 *
 * 弾発射:停止して弾の発射。自機に向かって1-wayを一定数発射する。
 * 一定時間経過後に右移動に遷移する。
 *
 * 右移動:地面右方向への移動。一定時間経過後に弾発射に遷移する。
 */
class Ant extends __WEBPACK_IMPORTED_MODULE_2__enemy_js__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ant', scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 初期状態は左移動とする。
        this._state = STATE.LEFT_MOVE;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 上下の障害物との距離から逆さまかどうかを判定する。
        this._isUpsideDown = this._checkUpsideDown(scene);
        // 逆さまな場合は画像の上下を反転する。
        if (this._isUpsideDown) {
            this._sprite.scaleY = -1;
        }
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 天井または地面に張り付いて歩く。
     *
     * 初期状態:上下どちらに張り付くか判定する。距離の近い方に張り付く。
     * 天井に張り付く場合は画像を上下反転する。
     *
     * 左移動:左方向への移動。一定時間経過後に弾発射に遷移する。
     *
     * 弾発射:停止して弾の発射。自機に向かって1-wayを一定数発射する。
     * 一定時間経過後に右移動に遷移する。
     *
     * 右移動:地面右方向への移動。一定時間経過後に弾発射に遷移する。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 状態によって処理を分岐する
        switch (this._state) {
            case STATE.LEFT_MOVE:// 左移動
                // 左へ移動する。
                this._hitArea.x -= MOVE_SPEED;
                // 左右反転はなしにする。
                this._sprite.scaleX = 1;
                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= MOVE_FRAME) {
                    // 弾発射に遷移する。
                    this._state = STATE.FIRE;
                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }
                break;
            case STATE.RIGHT_MOVE:// 右移動
                // 右へ移動する。
                this._hitArea.x += MOVE_SPEED;
                // 左右反転はありにする。
                this._sprite.scaleX = -1;
                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= MOVE_FRAME) {
                    // 弾発射に遷移する。
                    this._state = STATE.FIRE;
                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }
                break;
            case STATE.FIRE:// 弾発射
                // 自分より右側に自機がいれば左右反転する。
                if (this._hitArea.x < scene.playerPosition.x) {
                    this._sprite.scaleX = -1;
                }
                else {
                    this._sprite.scaleX = 1;
                }
                // 状態遷移間隔が経過したら右移動状態に遷移する。
                this._stateChangeInterval++;
                if (this._stateChangeInterval >= SHOT_FRAME) {
                    // 右移動に遷移する。
                    this._state = STATE.RIGHT_MOVE;
                    // 次の状態遷移への間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                // 弾発射間隔が経過したら自機へ向けて1-way弾を発射する。
                this._shotInterval++;
                if (this._shotInterval >= SHOT_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot_js__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
                    this._shotInterval = 0;
                }
                break;
            default:
                break;
        }
        // 障害物との衝突判定を行う。
        this._checkBlockHit(scene);
    }
    /**
     * 逆さま判定。上下の障害物の距離を調べ、上の障害物の方が近い場合は上下反転しているものとする。
     * @param scene シーン
     * @return 逆さまかどうか
     */
    _checkUpsideDown(scene) {
        // 上方向の障害物を検索する。
        const upsideBlock = this._hitArea.getBlockY(true, this._hitArea.x, scene.getStagePosition(), scene.getBlockMap());
        // 下方向の障害物を検索する。
        const downsideBlock = this._hitArea.getBlockY(false, this._hitArea.x, scene.getStagePosition(), scene.getBlockMap());
        // 上方向の障害物の方が近い場合は逆さまと判断する。
        if (this._hitArea.y - (upsideBlock.y + upsideBlock.height / 2) < (downsideBlock.y - downsideBlock.height / 2) - this._hitArea.y) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 障害物との衝突を処理する。
     * 通常は自分の足元の一番上の障害物の位置にy座標を合わせ、逆さまの場合は一番下の障害物に合わせる。
     * ブロック半分までの段差は超えられるものとし、それ以上の段差がある場合は手前の障害物の上で停止する。
     * @param scene シーン
     */
    _checkBlockHit(scene) {
        // 移動可能な段差
        const MOVABLE_STEP = 8;
        // 左側の足元の障害物を検索する。
        const leftBlock = this._hitArea.getBlockY(this._isUpsideDown, this._hitArea.x - this._hitArea.width / 2, scene.getStagePosition(), scene.getBlockMap());
        // 右側の足元の障害物を検索する。
        const rightBlock = this._hitArea.getBlockY(this._isUpsideDown, this._hitArea.x + this._hitArea.width / 2, scene.getStagePosition(), scene.getBlockMap());
        // 逆さまの場合は障害物の上端の値を使用し、通常の場合は下端の値を使用する。
        let leftBlockPos = 0;
        let rightBlockPos = 0;
        if (this._isUpsideDown) {
            leftBlockPos = leftBlock.y + leftBlock.height / 2;
            rightBlockPos = rightBlock.y + rightBlock.height / 2;
        }
        else {
            leftBlockPos = leftBlock.y - leftBlock.height / 2;
            rightBlockPos = rightBlock.y - rightBlock.height / 2;
        }
        // 左右の段差が移動可能な段差を超えている場合
        if (Math.abs(leftBlockPos - rightBlockPos) > MOVABLE_STEP) {
            // 進行方向と反対の障害物に合わせる。
            if (this._state === STATE.LEFT_MOVE) {
                this._hitArea.x = rightBlock.x - rightBlock.width / 2 + this._hitArea.width / 2;
                if (this._isUpsideDown) {
                    this._hitArea.y = rightBlock.y + rightBlock.width / 2 + this._hitArea.height / 2;
                }
                else {
                    this._hitArea.y = rightBlock.y - rightBlock.width / 2 - this._hitArea.height / 2;
                }
            }
            else {
                this._hitArea.x = leftBlock.x - leftBlock.width / 2 + this._hitArea.width / 2;
                if (this._isUpsideDown) {
                    this._hitArea.y = leftBlock.y + leftBlock.width / 2 + this._hitArea.height / 2;
                }
                else {
                    this._hitArea.y = leftBlock.y - leftBlock.width / 2 - this._hitArea.height / 2;
                }
            }
        }
        else {
            // 逆さまの場合は下の方に合わせる。
            if (this._isUpsideDown) {
                this._hitArea.y = Math.max(leftBlockPos, rightBlockPos) + this._hitArea.height / 2;
            }
            else {
                this._hitArea.y = Math.min(leftBlockPos, rightBlockPos) - this._hitArea.height / 2;
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Ant);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(1);


/**
 * ボスHPゲージの画像を表示する。
 */
class BossLifeGauge {
    /**
     * コンストラクタ、画像の読み込みを行う。
     */
    constructor() {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // 空ゲージの画像を読み込む。
        this._emptyImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.height);
        this._emptyImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.x, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.y, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeEmpty.height);
        this._emptyImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        this._emptyImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        this._emptyImage.addChildTo(this._base);
        // 満ゲージの画像を読み込む。
        this._fullImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height);
        this._fullImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.x, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.y, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.width, __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height);
        this._fullImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        this._fullImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        this._fullImage.addChildTo(this._base);
        // 上端を基準にゲージを増減させるため、原点位置を下端に変更する。
        this._fullImage.setOrigin(0.5, 1);
        this._fullImage.y = __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height;
    }
    /**
     * ゲージのたまっている比率に応じたスプライト。
     */
    get sprite() {
        return this._base;
    }
    /**
     * ゲージが溜まっている比率(0～1)。
     * 満ゲージの表示幅を連動して変更させる。
     */
    set rate(value) {
        // 画像の高さを指定された比率に設定する。
        this._fullImage.height = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height * value);
        this._fullImage.srcRect.height = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height * value);
        this._fullImage.srcRect.y = __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.y + __WEBPACK_IMPORTED_MODULE_1__controlsize__["a" /* default */].bossLifeGaugeFull.height - this._fullImage.srcRect.height;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (BossLifeGauge);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(6);


// 状態
var STATE;
(function (STATE) {
    STATE[STATE["UP_MOVE"] = 0] = "UP_MOVE";
    STATE[STATE["DOWN_MOVE"] = 1] = "DOWN_MOVE";
})(STATE || (STATE = {}));
// 状態変化間隔
const STATE_CHANGE_INTERVAL = 50;
// 弾発射間隔
const SHOT_INTERVAL = 60;
// x方向の移動スピード
const MOVE_SPEED_X = 0.5;
// y方向の移動スピード
const MOVE_SPEED_Y = 0.75;
// 弾のスピード
const SHOT_SPEED = 0.75;
/**
 * 敵キャラ、チョウ。
 * 上下に斜めに移動しながら左へ進む。
 * 定周期で左方向へ3-way弾を発射する。
 */
class Butterfly extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'butterfly', scene);
        // 初期状態は上方向への移動とする。
        this._state = STATE.UP_MOVE;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 上下に斜めに移動しながら左へ進む。
     * 定周期で左方向へ3-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // 状態変化間隔を経過している場合は上下移動の状態を変化させる。
        this._stateChangeInterval++;
        if (this._stateChangeInterval >= STATE_CHANGE_INTERVAL) {
            this._stateChangeInterval = 0;
            if (this._state === STATE.UP_MOVE) {
                this._state = STATE.DOWN_MOVE;
            }
            else {
                this._state = STATE.UP_MOVE;
            }
        }
        // 左方向に移動する。
        this._hitArea.x -= MOVE_SPEED_X;
        // 状態に応じて上下方向に移動する。
        if (this._state === STATE.UP_MOVE) {
            this._hitArea.y -= MOVE_SPEED_Y;
        }
        else {
            this._hitArea.y += MOVE_SPEED_Y;
        }
        // 弾発射間隔経過しているときは左方向へ3-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, 3, Math.PI / 8.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Butterfly);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize_js__ = __webpack_require__(1);


/**
 * チキンゲージの画像を表示する。
 */
class ChickenGauge {
    /**
     * コンストラクタ、画像の読み込みを行う。
     */
    constructor() {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // 空ゲージの画像を読み込む。
        this._emptyImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.height);
        this._emptyImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.x, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.y, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeEmpty.height);
        this._emptyImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._emptyImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._emptyImage.addChildTo(this._base);
        // 満ゲージの画像を読み込む。
        this._fullImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.height);
        this._fullImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.x, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.y, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.height);
        this._fullImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._fullImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._fullImage.addChildTo(this._base);
        // 左端を基準にゲージを増減させるため、原点位置を左端に変更する。
        this._fullImage.setOrigin(0, 0.5);
        this._fullImage.x = -__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.width;
        // ゲージの初期値は0とする。
        this._fullImage.width = 0;
        this._fullImage.srcRect.width = 0;
    }
    /**
     * ゲージのたまっている比率に応じたスプライト。
     */
    get sprite() {
        return this._base;
    }
    /**
     * ゲージが溜まっている比率(0～1)。
     * 満ゲージの表示幅を連動して変更させる。
     */
    set rate(value) {
        // 画像の幅を指定された比率に設定する。
        this._fullImage.width = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.width * value);
        this._fullImage.srcRect.width = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].chickenGaugeFull.width * value);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ChickenGauge);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__titlescene__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagelayer__ = __webpack_require__(14);


/**
 * クレジットを表示するシーン。
 */
class CreditScene {
    /**
     * コンストラクタ。
     * @param phinaScene phina.js上のシーンインスタンス
     * @param gamepadManager ゲームパッド管理クラス
     */
    constructor(phinaScene, gamepadManager) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // ページレイヤーを作成する。
        this._pageLayer = new __WEBPACK_IMPORTED_MODULE_1__pagelayer__["a" /* default */]()
            .addChildTo(this._rootNode)
            .onBackButton(() => {
            this._rootNode.remove();
            this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_0__titlescene__["a" /* default */](this._phinaScene, this._gamepadManager);
        });
    }
    /**
     * 更新処理。
     * @param app アプリケーション
     */
    update(app) {
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
/* harmony default export */ __webpack_exports__["a"] = (CreditScene);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemyshot_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(5);
/** @module dragonfly */


// 移動スピード
const MOVE_SPEED = 0.5;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 弾発射間隔（1周目）
const SHOT_INTERVAL = 120;
/**
 * 敵キャラクター、トンボ。
 * 左方向に直進する。
 * 左方向に直進する弾を発射する。
 */
class Dragonfly extends __WEBPACK_IMPORTED_MODULE_1__enemy_js__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'dragonfly', scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    action(scene) {
        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            __WEBPACK_IMPORTED_MODULE_0__enemyshot_js__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Dragonfly);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);

/**
 * 爆発アニメーションを行う。
 */
class Explosion {
    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 爆発音を再生する。
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('explosion');
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));
        // 爆発音を再生する。
        phina.asset.SoundManager.play('bomb_min');
    }
    /** キャラクター種別 */
    get type() {
        return __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.EFFECT;
    }
    /** 位置とサイズ */
    get rect() {
        return {
            x: this._sprite.x,
            y: this._sprite.y,
            width: this._sprite.width,
            height: this._sprite.height,
        };
    }
    /**
     * アニメーションが終了すると自分自身を削除する。
     * @param scene シーン
     */
    update(scene) {
        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localizer__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__frame__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mycolor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pointdevice__ = __webpack_require__(8);





// 画像の幅
const IMAGE_WIDTH = 128;
// 画像の高さ
const IMAGE_HEIGHT = 64;
// 画像の位置x座標
const IMAGE_POS_X = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_WIDTH / 2;
// 画像の位置y座標
const IMAGE_POS_Y = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_HEIGHT - 230;
// テキストの幅
const TEXT_WIDTH = 200;
// テキストの高さ
const TEXT_HEIGHT = 80;
// テキストの位置x座標
const TEXT_POS_X = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_WIDTH / 2;
// テキストの位置y座標
const TEXT_POS_Y = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_HEIGHT - 85;
// テキストの枠の余白
const FRAME_MARGIN = 16;
// ページ数
const PAGE_COUNT = 6;
// ページラベルの位置x座標
const PAGE_LABEL_POS_X = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_WIDTH / 2;
// ページラベルの位置y座標
const PAGE_LABEL_POS_Y = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].SCREEN_HEIGHT - 20;
/**
 * 遊び方説明画面のページ。
 */
class HowToPlayPage {
    /**
     * ページ数
     */
    static get PAGE_COUNT() {
        return PAGE_COUNT;
    }
    /**
     * コンストラクタ。
     * @param gamepadManager ゲームパッド管理
     * @param page ページ番号(0始まり)
     */
    constructor(page, gamepadManager) {
        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();
        // 説明画像を読み込む。
        const howToImage = new phina.display.Sprite('howtoimage', IMAGE_WIDTH, IMAGE_HEIGHT);
        howToImage.srcRect.set(0, page * IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_HEIGHT);
        howToImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        howToImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
        howToImage.addChildTo(this._rootNode)
            .setPosition(IMAGE_POS_X, IMAGE_POS_Y);
        if (window.debug.howToImage === undefined) {
            window.debug.howToImage = [];
        }
        window.debug.howToImage[page] = howToImage;
        // テキスト部分を作成する。
        const textBox = new phina.ui.LabelAreaEx({
            text: '',
            width: TEXT_WIDTH,
            height: TEXT_HEIGHT,
            fontSize: 16,
            fill: __WEBPACK_IMPORTED_MODULE_3__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
            keepWord: __WEBPACK_IMPORTED_MODULE_1__localizer__["a" /* default */].isKeepWord,
        })
            .addChildTo(this._rootNode)
            .setPosition(TEXT_POS_X, TEXT_POS_Y);
        // リソーステキストを取得し、テキスト部分に設定する。
        const textKey = 'HowToPlay_' + this._checkInputDevice(gamepadManager) + '_' + (page + 1).toString();
        const text = __WEBPACK_IMPORTED_MODULE_1__localizer__["a" /* default */].getString(textKey);
        textBox.text = text;
        // テキストの枠を作成する。
        const frame = new __WEBPACK_IMPORTED_MODULE_2__frame__["a" /* default */]('frame', TEXT_WIDTH + FRAME_MARGIN, TEXT_HEIGHT + FRAME_MARGIN)
            .setPosition(TEXT_POS_X, TEXT_POS_Y)
            .addChildTo(this._rootNode);
        // ページ番号ラベルのテキストを作成する。
        const pageLabelText = (page + 1).toString() + ' / ' + PAGE_COUNT;
        // ページ番号ラベルを作成する。
        const pageLabel = new phina.display.Label({
            text: pageLabelText,
            fontSize: 16,
            fill: __WEBPACK_IMPORTED_MODULE_3__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        })
            .addChildTo(this._rootNode)
            .setPosition(PAGE_LABEL_POS_X, PAGE_LABEL_POS_Y);
    }
    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._rootNode.addChildTo(parent);
        return this;
    }
    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove() {
        this._rootNode.remove();
        return this;
    }
    /**
     * 入力デバイスを調べる。
     * ゲームパッドがつながっている場合は'gamepad'、
     * タッチデバイスの場合は'touch'、
     * いずれでもない場合は'keyboard'、
     * を返す。
     * @param gamepadManager ゲームパッド管理
     * @return 入力デバイス
     */
    _checkInputDevice(gamepadManager) {
        // ゲームパッドがつながっている場合
        if (gamepadManager.isConnected(0)) {
            return 'gamepad';
        }
        else if (__WEBPACK_IMPORTED_MODULE_4__pointdevice__["a" /* default */].isTouchUsed) {
            return 'touch';
        }
        else {
            return 'keyboard';
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (HowToPlayPage);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagelayer__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__titlescene__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__howtoplaypage__ = __webpack_require__(25);



/**
 * 遊び方説明シーン。
 */
class HowToPlayScene {
    /**
     * コンストラクタ。
     * @param phinaScene phina.js上のシーンインスタンス
     * @param gamepadManager ゲームパッド管理クラス
     */
    constructor(phinaScene, gamepadManager) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // ページレイヤーを作成する。
        this._pageLayer = new __WEBPACK_IMPORTED_MODULE_0__pagelayer__["a" /* default */]()
            .addChildTo(this._rootNode)
            .onBackButton(() => {
            this._rootNode.remove();
            this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_1__titlescene__["a" /* default */](this._phinaScene, this._gamepadManager);
        });
        // 各ページを作成する。
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_2__howtoplaypage__["a" /* default */].PAGE_COUNT; i++) {
            this._pageLayer.addPage(new __WEBPACK_IMPORTED_MODULE_2__howtoplaypage__["a" /* default */](i, this._gamepadManager));
        }
    }
    /**
     * 更新処理。
     * @param app アプリケーション
     */
    update(app) {
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
/* harmony default export */ __webpack_exports__["a"] = (HowToPlayScene);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(9);



// 弾発射間隔
const SHOT_INTERVAL = 60;
// 移動スピード
const MOVE_SPEED = 0.65;
// 弾のスピード
const SHOT_SPEED = 0.75;
/**
 * 敵キャラ、テントウムシ。
 * まっすぐ進む。一定間隔で自機を狙う1-way弾発射。
 */
class Ladybug extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ladybug', scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param scene シーン
     */
    action(scene) {
        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Ladybug);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mycolor_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controlsize_js__ = __webpack_require__(1);
/** @module life */



// 残機最大値
const MAX_LIFE = 99;
// 画像位置
const IMAGE_POS_X = -16;
// ラベル位置
const LABEL_POS_X = 8;
/**
 * 残機を表示する。
 */
class Life {
    /**
     * コンストラクタ。
     * 画像と数値のラベルをくっつけたコントールを作成する。
     */
    constructor() {
        // ベース部分を作成する。
        this._base = new phina.display.RectangleShape({
            height: 22,
            width: 52,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor_js__["a" /* default */].BACK_COLOR,
            strokeWidth: 0,
        });
        // スプライト画像を読み込む。
        this._image = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.width, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.height);
        // 画像のサイズと位置を設定する。
        this._image.srcRect.set(__WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.x, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.y, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.width, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].life.height);
        this._image.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._image.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._image.x = IMAGE_POS_X;
        this._image.addChildTo(this._base);
        // ラベルを作成する。
        // ':00'の形式で表示すると、なぜかiPadのsafariで見ると十の位の0の右側にごみが表示されるため、
        // 後ろにブランクを付ける。
        this._label = new phina.display.Label({
            text: ':00 ',
            fontSize: 20,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor_js__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        });
        this._label.x = LABEL_POS_X;
        this._label.addChildTo(this._base);
        // 残機を初期化する。
        this._life = 0;
    }
    /**
     * 残機画像、ラベルを合わせたスプライト。
     */
    get sprite() {
        return this._base;
    }
    /**
     * 残機。ラベルの文字列も連動して変化する。
     */
    set life(value) {
        // 残機を変更する。
        this._life = value;
        // 最大値を超えている場合は最大値に補正する。
        if (this._life > MAX_LIFE) {
            this._life = MAX_LIFE;
        }
        // ラベルの表示文字列を変更する。
        // ':00'の形式で表示すると、なぜかiPadのsafariで見ると十の位の0の右側にごみが表示されるため、
        // 後ろにブランクを付ける。
        this._label.text = ':' + ('00' + this._life).slice(-2) + ' ';
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Life);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stringresource__ = __webpack_require__(38);

/**
 * ローカライズを行うクラス。
 */
class Localizer {
    /**
     * 文字列が言語設定に対応したものかどうかを調べる。
     * @param obj 文字列
     */
    static isLaungageType(obj) {
        switch (obj) {
            case 'en':
            case 'ja':
            case 'zh':
            case 'ko':
                return true;
            default:
                return false;
        }
    }
    /**
     * 言語設定
     */
    static get langauge() {
        // デフォルトは英語とする。
        let language = 'en';
        // localStorageに言語設定が保存されている場合はlocalStorageの値を使用する。
        if (localStorage.language && Localizer.isLaungageType(localStorage.language)) {
            language = localStorage.language;
        }
        else {
            // localStorageに言語設定が保存されていない場合は
            // ブラウザ設定から言語設定を取得する。
            if (window.navigator.language) {
                let languageSetting = window.navigator.language.slice(0, 2);
                if (Localizer.isLaungageType(languageSetting)) {
                    language = languageSetting;
                }
            }
        }
        // 言語設定を返す。
        return language;
    }
    /**
     * 単語の途中で改行をしないようにするかどうか。
     */
    static get isKeepWord() {
        // 英語の場合は単語を保持する。
        if (Localizer.langauge === 'en') {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * StringResourceに登録された文字列を取得する。
     * @param key 文字列のキー
     */
    static getString(key) {
        return __WEBPACK_IMPORTED_MODULE_0__stringresource__["a" /* default */][Localizer.langauge][key];
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Localizer);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mycolor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__titlescene__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__labelareaex__ = __webpack_require__(17);





window.debug = {};
// LabelAreaExが取り込まれるようにダミー変数を使用する。
__WEBPACK_IMPORTED_MODULE_4__labelareaex__["a" /* default */];
// マウスが接続されているかどうかを調べる。
__WEBPACK_IMPORTED_MODULE_0__pointdevice__["a" /* default */].checkDeviceType();
/**
 * アセット定義。
 */
const ASSETS = {
    image: {
        'back': './images/back.png',
        'control': './images/control.png',
        'image_8x8': './images/image_8x8.png',
        'image_16x16': './images/image_16x16.png',
        'image_64x64': './images/image_64x64.png',
        'howtoimage': './images/howtoimage.png',
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
        'image_64x64_ss': './images/image_64x64_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'boss': './sound/boss.mp3',
        'select': './sound/select.mp3',
        'cursor': './sound/cursor.mp3',
        'hit': './sound/hit.mp3',
        'bomb_min': './sound/bomb_min.mp3',
        'miss': './sound/miss.mp3',
        'pause': './sound/pause.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular-min.ttf',
    },
};
/**
 * ローディングシーン。
 */
phina.define('LoadingScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * コンストラクタ。
     * @param options 起動パラメータ。
     */
    init: function (options) {
        this.superInit(options);
        // 背景色を指定する。
        this.backgroundColor = __WEBPACK_IMPORTED_MODULE_2__mycolor__["a" /* default */].BACK_COLOR;
        // MONOCHROMESOFTのラベルを作成する。
        const label = new phina.display.Label({
            text: 'MONOCHROMESOFT',
            fontSize: 32,
            fill: __WEBPACK_IMPORTED_MODULE_2__mycolor__["a" /* default */].FORE_COLOR,
        })
            .addChildTo(this)
            .setPosition(this.width / 2, this.height / 2);
        // 進捗バーを作成する。
        const progressbar = new phina.display.RectangleShape({
            height: 20,
            width: 1,
            fill: __WEBPACK_IMPORTED_MODULE_2__mycolor__["a" /* default */].FORE_COLOR,
            strokeWidth: 0,
            padding: 0,
        })
            .addChildTo(this)
            .setOrigin(0, 0.5)
            .setPosition(0, this.height * 0.75);
        // ローダーを作成する。
        const loader = new phina.asset.AssetLoader();
        // ロードが進行したときの処理を作成する。
        loader.on('progress', (event) => {
            const e = event;
            // 進捗率に応じてプログレスバーの幅を広げる。
            // 進捗が0以下の場合は幅を1にする。
            // chromeだと問題ないが、safariでdrawImageの幅を0にすると
            // InvalidStateError DOM Exception 11が発生するため。
            if (e.progress <= 0) {
                progressbar.width = 1;
            }
            else {
                progressbar.width = e.progress * this.width;
            }
        });
        // ローダーによるロード完了ハンドラを設定する。
        loader.on('load', () => {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            this.flare('loaded');
        });
        // ロード開始
        loader.load(options.assets);
    },
});
/**
 * メインシーン。
 */
phina.define('MainScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * コンストラクタ。
     */
    init: function () {
        window.debug['scene'] = this;
        // 親クラスのコンストラクタを呼び出す。
        this.superInit({
            width: __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_WIDTH,
            height: __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_HEIGHT,
        });
        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;
        // 背景色を指定する。
        this.backgroundColor = __WEBPACK_IMPORTED_MODULE_2__mycolor__["a" /* default */].BACK_COLOR;
        // BGMとSEの音量を設定する。
        phina.asset.SoundManager.setVolume(0.5);
        phina.asset.SoundManager.setVolumeMusic(0.2);
        // ゲームパッドマネージャーを作成する。
        const gamepadManager = new phina.input.GamepadManager();
        // 初期シーンを設定する。
        this.scene = new __WEBPACK_IMPORTED_MODULE_3__titlescene__["a" /* default */](this, gamepadManager);
    },
    /**
     * 更新処理。内部のシーン処理の更新処理を実行する。
     * @param app アプリケーション
     */
    update: function (app) {
        this.scene.update(app);
    }
});
// メイン処理
phina.main(function () {
    // 画面サイズの補正の有効無効を切り替える。
    let isFit = true;
    if (localStorage.disableFit === 'true') {
        isFit = false;
    }
    // アプリケーションを生成する。
    let app = new phina.game.GameApp({
        width: __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_WIDTH,
        height: __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].SCREEN_HEIGHT,
        startLabel: 'main',
        assets: ASSETS,
        fit: isFit,
    });
    // FPSを設定する。
    app.fps = 60;
    // FPSを表示する。（デバッグ用）
    if (localStorage.viewFPS === 'true') {
        app.enableStats();
    }
    // iOSのsafariではユーザが操作時のみ音の再生が可能なため、タッチ時にダミーで音声の再生を行う。
    // https://github.com/phinajs/phina.js/issues/197
    app.domElement.addEventListener('touchend', function dummy() {
        const s = new phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });
    // アプリケーションを実行する。
    app.run();
});


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__labelbutton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mycolor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursor__ = __webpack_require__(10);




// ラベルの位置、x座標
const LABEL_POS_X = Math.floor(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH * 0.5);
// ラベルの位置、y座標
const LABEL_POS_Y = Math.floor(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT * 0.3);
// ボタンの幅
const BUTTON_WIDTH = 128;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// ボタンの位置、x座標
const BUTTON_POS_X = [
    Math.floor(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH * 0.3),
    Math.floor(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH * 0.7),
];
// ボタンの位置、y座標
const BUTTON_POS_Y = Math.floor(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT * 0.6);
// カーソルの位置、x座標
const CURSOR_POS_X = [
    BUTTON_POS_X[0] - BUTTON_WIDTH / 2 - 16,
    BUTTON_POS_X[1] - BUTTON_WIDTH / 2 - 16,
];
// カーソルの位置、y座標
const CURSOR_POS_Y = BUTTON_POS_Y;
// ボタンのID
var BUTTON_ID;
(function (BUTTON_ID) {
    BUTTON_ID[BUTTON_ID["LEFT"] = 0] = "LEFT";
    BUTTON_ID[BUTTON_ID["RIGHT"] = 1] = "RIGHT";
})(BUTTON_ID || (BUTTON_ID = {}));
;
/**
 * メニュー画面。
 * タイトルとボタンが2つある。
 */
class MenuLayer {
    /**
     * コンストラクタ。
     * @param title タイトルの文字列
     * @param left 左側のボタンのラベル
     * @param right 右側のボタンのラベル
     */
    constructor(title, left, right) {
        // ルートノードを作成する。
        this._rootNode = new phina.display.DisplayElement();
        // タイトルのラベルを作成する。
        const titleLabel = new phina.display.Label({
            text: title,
            fontSize: 36,
            backgroundColor: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].BACK_COLOR,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
            x: LABEL_POS_X,
            y: LABEL_POS_Y,
            strokeWidth: 0,
            padding: 0,
        }).addChildTo(this._rootNode);
        // ボタン配列を作成する。
        this._buttons = [];
        // 左のボタンを作成する。
        const resumeButton = new __WEBPACK_IMPORTED_MODULE_0__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel(left)
            .setPosition(BUTTON_POS_X[BUTTON_ID.LEFT], BUTTON_POS_Y)
            .onEffect(() => { this._setEnable(false); })
            .onPush(() => {
            if (this._onLeftButtonFunc !== null) {
                this._onLeftButtonFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(resumeButton);
        // 右のボタンを作成する。
        const quitButton = new __WEBPACK_IMPORTED_MODULE_0__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
            .addChildTo(this._rootNode)
            .setLabel(right)
            .setPosition(BUTTON_POS_X[BUTTON_ID.RIGHT], BUTTON_POS_Y)
            .onEffect(() => { this._setEnable(false); })
            .onPush(() => {
            if (this._onRightButtonFunc !== null) {
                this._onRightButtonFunc();
            }
            this._setEnable(true);
        });
        this._buttons.push(quitButton);
        // カーソルを作成する。
        this._cursor = new __WEBPACK_IMPORTED_MODULE_3__cursor__["a" /* default */]()
            .addChildTo(this._rootNode)
            .addPosition(BUTTON_ID.LEFT, {
            x: CURSOR_POS_X[BUTTON_ID.LEFT],
            y: CURSOR_POS_Y,
            left: -1,
            right: BUTTON_ID.RIGHT,
            up: -1,
            down: -1,
        })
            .addPosition(BUTTON_ID.RIGHT, {
            x: CURSOR_POS_X[BUTTON_ID.RIGHT],
            y: CURSOR_POS_Y,
            left: BUTTON_ID.LEFT,
            right: -1,
            up: -1,
            down: -1,
        })
            .setPosition(BUTTON_ID.LEFT);
        // コールバック関数を初期化する。
        this._onLeftButtonFunc = null;
        this._onRightButtonFunc = null;
        // 初期状態は有効とする。
        this._enable = true;
    }
    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent) {
        this._rootNode.addChildTo(parent);
        return this;
    }
    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove() {
        this._rootNode.remove();
        return this;
    }
    /**
     * 左のボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onLeftButton(func) {
        this._onLeftButtonFunc = func;
        return this;
    }
    /**
     * 右のボタン選択時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onRightButton(func) {
        this._onRightButtonFunc = func;
        return this;
    }
    /**
     * 入力処理を行う。
     * @param keyboard キーボード
     * @param gamepad ゲームパッド
     */
    input(keyboard, gamepad) {
        // 入力が有効な場合に処理を行う。
        if (this._enable) {
            // カーソルの移動処理を行う。
            this._cursor.input(keyboard, gamepad);
            // キーボードのzキーかゲームパッドのAボタンが押された場合は選択中のボタンの処理を行う。
            if (keyboard.getKeyDown('z') || gamepad.getKeyDown('a')) {
                this._buttons[this._cursor.position].select();
            }
        }
    }
    /**
     * 有効か無効かを設定する。
     * @param value 設定値
     */
    _setEnable(value) {
        // 有効か無効かを設定する。
        this._enable = value;
        // 各ボタンの有効か無効かを設定する。
        for (let button of this._buttons) {
            button.setEnable(value);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (MenuLayer);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collider__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playershot__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playerdeatheffect__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__playeroption__ = __webpack_require__(34);






// キーボード入力による移動スピード
const SPEED_BY_KEY = 2;
// タッチ操作による移動スピード
const SPEED_BY_TOUCH = 1.8 / __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
// ゲームパッドによる移動スピード
const SPEED_BY_GAMEPAD = 3;
// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅
const HIT_WIDTH = 4;
// 当たり判定高さ
const HIT_HEIGHT = 4;
// かすり当たり判定幅
const GRAZE_WIDTH = 16;
// かすり当たり判定高さ
const GRAZE_HEIGHT = 16;
// 復活後無敵フレーム数
const INVINCIBLE_FRAME = 120;
// 状態
const STATUS = {
    // 通常
    NORMAL: 1,
    // 死亡
    DEATH: 2,
    // 無敵
    INVINCIBLE: 3,
};
// オプション最大数
const MAX_OPTION_COUNT = 3;
// シールド使用時のゲージ使用量
const CONSUMPTION_GAUGE = 0.005;
/**
 * 自機。ユーザー操作に応じて移動する。
 */
class Player {
    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('player_normal');
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_2__collider__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);
        // かすり当たり判定を作成する。
        this._grazeArea = new __WEBPACK_IMPORTED_MODULE_2__collider__["a" /* default */](x, y, GRAZE_WIDTH, GRAZE_HEIGHT);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 初期状態は通常状態とする。
        this._status = STATUS.NORMAL;
        // 無敵時間を初期化する。
        this._invincibleFrame = 0;
        // チキンゲージを初期化する。
        this._chickenGauge = 0;
        // 最初はオプションなしとする。
        this._option = null;
        // シールド使用不使用を初期化する。
        this._shield = false;
        // デバッグ用: 死亡しないようにする。
        if (localStorage.noDeath === 'true') {
            this._noDeath = true;
        }
        else {
            this._noDeath = false;
        }
        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this._noShot = true;
        }
        else {
            this._noShot = false;
        }
    }
    /** キャラクター種別 */
    get type() {
        return __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.PLAYER;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /** チキンゲージの溜まっている比率。0～1の範囲。 */
    get chickenGauge() {
        return this._chickenGauge;
    }
    /**
     * シールド使用不使用。
     * オプションがあればオプションの設定も変更する。
     */
    set shield(value) {
        // シールド使用不使用を設定する。
        this._shield = value;
        // オプションがある場合はオプションのシールド使用不使用を設定する。
        if (this._option !== null) {
            this._option.setShield(value);
        }
    }
    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * ブロックやキャラクターとの当たり判定処理を行う。
     * 自機弾を発射する。
     * @param scene シーン
     */
    update(scene) {
        // ブロックと衝突している場合
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックによって押されて移動する。
            const dest = this._hitArea.pushCharacter(this._hitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this._hitArea.x = dest.x;
            this._hitArea.y = dest.y;
        }
        // 無敵状態の場合
        if (this._status === STATUS.INVINCIBLE) {
            // 無敵状態フレーム数をカウントする。
            this._invincibleFrame--;
            // 無敵状態フレーム数を経過した場合
            if (this._invincibleFrame <= 0) {
                // ステータスを通常状態に戻す。
                this._status = STATUS.NORMAL;
                // 点滅アニメーションを停止する。
                this._sprite.tweener.clear();
                // アニメーションが非表示で終了している可能性があるので、
                // 表示状態にする。
                this._sprite.alpha = 1;
            }
        }
        // 通常状態、無敵状態の場合
        if (this._status === STATUS.NORMAL || this._status === STATUS.INVINCIBLE) {
            // 自機弾発射間隔が経過した場合は自機弾を発射する。
            this._shotInterval++;
            if (this._shotInterval >= SHOT_INTERVAL && !this._noShot) {
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_3__playershot__["a" /* default */](this._hitArea.x, this._hitArea.y, false, scene));
                this._shotInterval = 0;
            }
            // 敵弾とのかすり判定を行う。
            this._checkGraze(scene);
            // シールド使用時はチキンゲージを消費する。
            if (this._shield) {
                this._chickenGauge -= CONSUMPTION_GAUGE;
                if (this._chickenGauge < 0) {
                    this._chickenGauge = 0;
                }
            }
        }
        // 通常状態の場合
        if (this._status === STATUS.NORMAL) {
            // 敵キャラとの当たり判定処理を行う。
            this._checkHitChacater(scene);
        }
        // オプション個数を更新する。
        this._updateOptionCount(scene);
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
    /**
     * キーボードの左キー入力による移動処理を行う。
     * @param scene シーン
     */
    moveKeyLeft(scene) {
        this._move(this._hitArea.x - SPEED_BY_KEY, this._hitArea.y, scene);
    }
    /**
     * キーボードの右キー入力による移動処理を行う。
     * @param scene シーン
     */
    moveKeyRight(scene) {
        this._move(this._hitArea.x + SPEED_BY_KEY, this._hitArea.y, scene);
    }
    /**
     * キーボードの上キー入力による移動処理を行う。
     * @param scene シーン
     */
    moveKeyUp(scene) {
        this._move(this._hitArea.x, this._hitArea.y - SPEED_BY_KEY, scene);
    }
    /**
     * キーボードの下キー入力による移動処理を行う。
     * @param scene シーン
     */
    moveKeyDown(scene) {
        this._move(this._hitArea.x, this._hitArea.y + SPEED_BY_KEY, scene);
    }
    /**
     * タッチ入力による移動処理を行う。
     * @param x x座標方向のタッチ位置スライド量
     * @param y y座標方向のタッチ位置スライド量
     * @param scene シーン
     */
    moveTouch(x, y, scene) {
        this._move(this._hitArea.x + x * SPEED_BY_TOUCH, this._hitArea.y + y * SPEED_BY_TOUCH, scene);
    }
    /**
     * ゲームパッド入力による移動処理を行う。
     * @param x x座標方向のスティック入力値
     * @param y y座標方向のスティック入力値
     * @param scene シーン
     */
    moveGamepad(x, y, scene) {
        this._move(this._hitArea.x + x * SPEED_BY_GAMEPAD, this._hitArea.y + y * SPEED_BY_GAMEPAD, scene);
    }
    /**
     * 死亡後の復活処理を行う。
     * 一定時間無敵状態とし、画像を点滅表示する。
     * @param scene シーン
     */
    rebirth(scene) {
        // ステータスを無敵状態にする。
        this._status = STATUS.INVINCIBLE;
        // チキンゲージを初期化する。
        this._chickenGauge = 0;
        // 無敵状態フレーム数を設定する。
        this._invincibleFrame = INVINCIBLE_FRAME;
        // 画像を表示する。
        this._sprite.alpha = 1;
        // 点滅アニメーションを実行する。
        // 100ms周期で表示、非表示を切り替える。
        this._sprite.tweener
            .wait(100)
            .set({ alpha: 0 })
            .wait(100)
            .set({ alpha: 1 })
            .setLoop(true)
            .play();
    }
    /**
     * 座標を変更し、各種当たり判定処理を行う。
     * @param x 移動後のx座標
     * @param y 移動後のy座標
     * @param scene シーン
     */
    _move(x, y, scene) {
        // 前回値を保存する。
        const prevX = this._hitArea.x;
        const prevY = this._hitArea.y;
        // 死亡中でない場合のみ移動を行う。
        if (this._status != STATUS.DEATH) {
            // 現在の座標を変更する。
            this._hitArea.x = x;
            this._hitArea.y = y;
        }
        // 衝突しているブロックがないか調べる。
        let block = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());
        // 衝突しているブロックがある場合は移動する。
        while (block != null) {
            // 移動位置を計算する。
            const newPosition = this._hitArea.moveByBlock(this._hitArea, prevX, prevY, block, scene.getStagePosition(), scene.getBlockMap());
            // 移動できない場合はループを抜ける。
            if (this._hitArea.x == newPosition.x && this._hitArea.y == newPosition.y) {
                break;
            }
            // 移動後の座標を反映する。
            this._hitArea.x = newPosition.x;
            this._hitArea.y = newPosition.y;
            // 移動後に再度衝突していないかチェックする。
            block = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());
        }
        // 画面外に出ていないかチェックする。
        this._checkScreenArea();
        // オプションがある場合はオプションを移動前の座標へ移動する。
        if (this._option !== null) {
            this._option.move(prevX, prevY);
        }
    }
    /**
     * 画面外に出ていないかチェックする。
     * 画面外に出ていた場合は画面内に座標を補正する。
     */
    _checkScreenArea() {
        // 左側画面範囲外には移動させないようにする。
        if (this._hitArea.x < 0) {
            this._hitArea.x = 0;
        }
        // 右側画面範囲外には移動させないようにする。
        if (this._hitArea.x > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.width - 1) {
            this._hitArea.x = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.width - 1;
        }
        // 上側画面範囲外には移動させないようにする。
        if (this._hitArea.y < 0) {
            this._hitArea.y = 0;
        }
        // 下側画面範囲外には移動させないようにする。
        if (this._hitArea.y > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.height - 1) {
            this._hitArea.y = __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.height - 1;
        }
    }
    /**
     * 他のキャラクターとの当たり判定を処理する。
     * @param scene シーン
     */
    _checkHitChacater(scene) {
        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY, __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY_SHOT]);
        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {
            // 先頭のキャラクターとの衝突処理を実行する。
            const topCharacter = hitCharacters[0];
            // 敵弾の場合は削除する。
            if (__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].isEnemyShot(topCharacter)) {
                topCharacter.remove(scene);
            }
            // 敵キャラクターに接触した場合は死亡処理を行う。
            if (!this._noDeath) {
                // 死亡時エフェクトを作成する。
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_4__playerdeatheffect__["a" /* default */](this._hitArea.x, this._hitArea.y, scene));
                // ステータスを死亡に変更する。
                this._status = STATUS.DEATH;
                // 画像を非表示にする。
                this._sprite.alpha = 0;
                // シーンの死亡時処理を実行する。
                scene.miss();
            }
        }
    }
    /**
     * 敵弾とのかすり判定を処理する。
     * @param scene シーン
     */
    _checkGraze(scene) {
        // かすり当たり判定位置を更新する。
        this._grazeArea.x = this._hitArea.x;
        this._grazeArea.y = this._hitArea.y;
        // かすっている敵弾を検索する。
        const hitCharacters = this._grazeArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY_SHOT]);
        // かすっている敵弾とかすり処理を行う。
        for (let character of hitCharacters) {
            if (__WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].isEnemyShot(character)) {
                // チキンゲージを増加させる。
                this._chickenGauge += character.graze();
                // 上限値を超えた場合は上限値に補正する。
                if (this._chickenGauge > 1) {
                    this._chickenGauge = 1;
                }
            }
        }
    }
    /**
     * チキンゲージに応じてオプション個数を更新する。
     * @param scene シーン
     */
    _updateOptionCount(scene) {
        // チキンゲージからオプション個数を計算する
        const count = Math.floor(this._chickenGauge / (1 / (MAX_OPTION_COUNT + 1)));
        // オプション個数がある場合
        if (count > 0) {
            // オプションが作成されていなければ作成する。
            if (this._option === null) {
                this._option = new __WEBPACK_IMPORTED_MODULE_5__playeroption__["a" /* default */](this._hitArea.x, this._hitArea.y, this._shield, scene);
                scene.addCharacter(this._option);
            }
            // オプションにオプション個数を設定する。
            this._option.setCount(count, scene);
        }
        else {
            // オプションが作成されていれば削除する。
            if (this._option !== null) {
                // オプションにオプション個数を設定し、削除処理を行う。
                this._option.setCount(count, scene);
                // メンバ変数をクリアする。
                this._option = null;
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);
/** @module playerdeatheffect */

/**
 * 自機死亡時のエフェクトを表示する。
 */
class PlayerDeathEffect {
    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 死亡時SEを再生する。
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('player_death');
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(x), Math.floor(y));
        // 死亡音を再生する。
        phina.asset.SoundManager.play('miss');
    }
    /** キャラクター種別 */
    get type() {
        return __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.EFFECT;
    }
    /** 位置とサイズ */
    get rect() {
        return {
            x: this._sprite.x,
            y: this._sprite.y,
            width: this._sprite.width,
            height: this._sprite.height,
        };
    }
    /**
     * 更新処理。下に落ちる。
     * アニメーションが終了すると自分自身を削除する。
     * @param scene シーン
     */
    update(scene) {
        // 下に落ちる。
        this._sprite.y = Math.floor(this._sprite.y + 1);
        // アニメーションが終了すると自分自身を削除する。
        if (this._animation.finished) {
            scene.removeCharacter(this);
            this._sprite.remove();
        }
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PlayerDeathEffect);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collider__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playershot__ = __webpack_require__(15);
/** @module playeroption */



// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅(シールド反射時のみ使用する)
const HIT_WIDTH = 16;
// 当たり判定高さ(シールド反射時のみ使用する)
const HIT_HEIGHT = 16;
// オプション間の間隔(何フレーム分遅れて移動するか)
const OPTION_SPACE = 20;
/**
 * 自機オプション。
 * 自機の後ろについて移動する。
 * チキンゲージの比率に応じて増える。
 */
class PlayerOption {
    /**
     * コンストラクタ。
     * 座標の設定とスプライトシートの設定を行う。
     * @param x x座標
     * @param y y座標
     * @param shield シールド使用不使用
     * @param scene シーン
     */
    constructor(x, y, shield, scene) {
        // スプライト画像を読み込む。
        this._sprite = new phina.display.Sprite('image_16x16', 16, 16);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // シールド使用不使用を設定する。
        this._shield = shield;
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_16x16_ss');
        this._animation.attachTo(this._sprite);
        // シールド使用不使用によって画像を変更する。
        if (this._shield) {
            this._animation.gotoAndPlay('player_option_shield');
        }
        else {
            this._animation.gotoAndPlay('player_option_normal');
        }
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_1__collider__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);
        // 移動位置の配列を作成する。
        this._movePosition = [];
        // 次のオプションは初期状態はなしとする。
        this._nextOption = null;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this._noShot = true;
        }
        else {
            this._noShot = false;
        }
    }
    /** キャラクター種別 */
    get type() {
        return __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.PLAYER_OPTION;
    }
    /** 位置とサイズ */
    get rect() {
        return this._hitArea;
    }
    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * シールド使用時は敵弾との当たり判定処理を行う。
     * 自機弾を発射する。
     * @param scene シーン
     */
    update(scene) {
        // 弾発射間隔経過しているときは自機弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL && !this._noShot) {
            // 敵弾が無効化されていない場合は自機弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__playershot__["a" /* default */](this._hitArea.x, this._hitArea.y, true, scene));
                this._shotInterval = 0;
            }
        }
        // シールド使用時は当たり判定処理を行う。
        if (this._shield) {
            this._checkHitChacater(scene);
        }
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation() {
        this._animation.paused = true;
        return this;
    }
    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation() {
        this._animation.paused = false;
        return this;
    }
    /**
     * 指定された座標へ移動する。
     * ただし、すぐに移動するのではなく、OPTION_SPACEの間隔分遅れて移動する。
     * オプションが他に存在する場合は、移動前の座標に対して移動を指示する。
     * @param x x座標
     * @param y y座標
     */
    move(x, y) {
        // 次のオプションが存在する場合は自分の移動前の座標に移動するように指示する。
        if (this._nextOption !== null) {
            this._nextOption.move(this._hitArea.x, this._hitArea.y);
        }
        // 移動先座標が間隔分溜まっている場合は先頭の座標に移動する
        if (this._movePosition.length >= OPTION_SPACE) {
            // 先頭の要素を取り出す。
            const pos = this._movePosition.shift();
            if (pos !== undefined) {
                // 移動する。
                this._hitArea.x = pos.x;
                this._hitArea.y = pos.y;
            }
        }
        // 移動先座標の配列の末尾に追加する
        this._movePosition.push({ x: x, y: y });
    }
    /**
     * オプションの個数を設定する。
     * 0以下が指定されると自分自身を削除する。
     * 2個以上が指定されると再帰的に次のオプションを作成する。
     * @param count オプション個数
     * @param scene シーン
     */
    setCount(count, scene) {
        // 個数が2個以上の場合はオプションを作成する。
        if (count >= 2) {
            // 次のオプションが作成されていなければ作成する。
            if (this._nextOption === null) {
                this._nextOption = new PlayerOption(this._hitArea.x, this._hitArea.y, this._shield, scene);
                scene.addCharacter(this._nextOption);
            }
            // 次のオプションに自分の分を減らした個数を設定する。
            this._nextOption.setCount(count - 1, scene);
        }
        else {
            // 次のオプションが作成されていれば削除する。
            if (this._nextOption !== null) {
                // 次のオプションに自分の分を減らした個数を設定し、削除処理を行う。
                this._nextOption.setCount(count - 1, scene);
                // メンバ変数をクリアする。
                this._nextOption = null;
            }
            // 0以下が指定された場合は自分自身も削除する。
            if (count <= 0) {
                scene.removeCharacter(this);
                this._sprite.remove();
            }
        }
    }
    /**
     * シールド使用不使用を設定する。
     * 次のオプションがあればオプションの設定も変更する。
     * @param shield シールド使用不使用
     */
    setShield(shield) {
        // シールド使用不使用が変化した場合はアニメーションを変更する。
        if (!this._shield && shield) {
            this._animation.gotoAndPlay('player_option_shield');
        }
        else if (this._shield && !shield) {
            this._animation.gotoAndPlay('player_option_normal');
        }
        else {
            // 変化がない場合はアニメーションを継続する。
            // 毎回アニメーションを変更すると、都度最初のフレームに戻り、
            // アニメーションが行われなくなるため。
        }
        // シールド使用不使用を設定する。
        this._shield = shield;
        // 次のオプションがある場合は次のオプションのシールド使用不使用を設定する。
        if (this._nextOption !== null) {
            this._nextOption.setShield(this._shield);
        }
    }
    /**
     * 敵弾との当たり判定を処理する。衝突した敵弾の反射処理を行う。
     * @param scene シーン
     */
    _checkHitChacater(scene) {
        // 衝突している敵弾を検索する。
        const hitCharacters = this._hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].type.ENEMY_SHOT]);
        // 衝突している敵キャラクターがいる場合。
        for (let character of hitCharacters) {
            if (__WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */].isEnemyShot(character)) {
                // 敵弾反射処理を実行する。
                character.reflect();
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PlayerOption);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mycolor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controlsize__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__player__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__life__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__chickengauge__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bosslifegauge__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shieldbutton__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__titlescene__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__menulayer__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__imagebutton__ = __webpack_require__(12);














// 初期残機
const INITIAL_LIFE = 2;
// 残機位置x座標(ステージ左端からの位置)
const LIFE_POS_X = 32;
// 残機位置y座標(画面上からの位置)
const LIFE_POS_Y = 12;
// スコアラベル位置(画面上からの位置)
const SCORE_POS_Y = 12;
// 復活待機フレーム数
const REBIRTH_WAIT = 60;
// チキンゲージ位置(画面下からの位置)
const CHICKEN_GAUGE_POS_Y = 12;
// シールドボタン位置x座標(画面右からの位置)
const SHIELD_BUTTON_POS_X = 50;
// シールドボタン位置y座標(画面下からの位置)
const SHIELD_BUTTON_POS_Y = 50;
// 一時停止ボタン位置x座標(画面右からの位置)
const PUASE_BUTTON_POS_X = 28;
// 一時停止ボタン位置y座標(画面上からの位置)
const PAUSE_BUTTON_POS_Y = 28;
// ボスHPゲージ位置x座標(ステージ左端からの位置)
const BOSS_LIFE_GAUGE_POS_X = 360;
// ボスHPゲージ位置x座標(画面上からの位置)
const BOSS_LIFE_GAUGE_POS_Y = 144;
// 自機弾衝突音発生間隔
const HIT_PLAYER_SHOT_INTERVAL = 6;
// ゲームオーバー時の待機時間（msec）
const GAMEOVER_INTERVAL = 1000;
// シーンの状態
var SCENE_STATE;
(function (SCENE_STATE) {
    SCENE_STATE[SCENE_STATE["PLAYING"] = 0] = "PLAYING";
    SCENE_STATE[SCENE_STATE["WAIT_GAMEOVER"] = 1] = "WAIT_GAMEOVER";
    SCENE_STATE[SCENE_STATE["GAMEOVER"] = 2] = "GAMEOVER";
    SCENE_STATE[SCENE_STATE["PAUSE"] = 3] = "PAUSE";
    SCENE_STATE[SCENE_STATE["QUIT_MENU"] = 4] = "QUIT_MENU";
})(SCENE_STATE || (SCENE_STATE = {}));
/**
 * ゲームの各ステージをプレイするメインのシーン。
 */
class PlayingScene {
    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param phinaScene phina.js上のシーンインスタンス
     */
    constructor(phinaScene, gamepadManager) {
        // phina.jsのシーンインスタンスを設定する。
        this._phinaScene = phinaScene;
        // ゲームパッドマネージャーを設定する。
        this._gamepadManager = gamepadManager;
        // ルートノードを作成し、シーンに配置する。
        this._rootNode = new phina.display.DisplayElement().addChildTo(this._phinaScene);
        // 背景レイヤーを作成する。
        this._backgroundLayer = new phina.display.DisplayElement().addChildTo(this._rootNode);
        // 背景レイヤーの位置、サイズを設定する。
        this._backgroundLayer.setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO, __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.y * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO);
        this._backgroundLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        this._backgroundLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        // キャラクターレイヤーを作成する。
        this._characterLayer = new phina.display.DisplayElement().addChildTo(this._rootNode);
        // キャラクターレイヤーの位置、サイズを設定する。
        this._characterLayer.setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO, __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.y * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO);
        this._characterLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        this._characterLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        // 枠レイヤーを作成する。
        this._frameLayer = new phina.display.DisplayElement().addChildTo(this._rootNode);
        // 枠レイヤーの位置、サイズを設定する。
        this._frameLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        this._frameLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
        // 情報レイヤーを作成する。
        this._infoLayer = new phina.display.DisplayElement().addChildTo(this._rootNode);
        // ステージの外枠を作成する。
        this._createFrame();
        // 初期ステージを読み込む。
        this._stage = new __WEBPACK_IMPORTED_MODULE_5__stage__["a" /* default */]('stage1', this._backgroundLayer);
        // スコアラベルの背景部分を作成する。
        this._scoreLabelBase = new phina.display.RectangleShape({
            height: 22,
            width: 148,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this._phinaScene.gridX.center()),
            y: SCORE_POS_Y,
        }).addChildTo(this._infoLayer);
        // スコアラベルを作成する。
        this._scoreLabel = new phina.display.Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this._scoreLabelBase);
        // スコアを初期化する。
        this._score = 0;
        // 残機表示を作成する。
        this._lifeLabel = new __WEBPACK_IMPORTED_MODULE_7__life__["a" /* default */]();
        // 残機表示の位置を設定する。
        this._lifeLabel.sprite.addChildTo(this._infoLayer);
        this._lifeLabel.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO + LIFE_POS_X;
        this._lifeLabel.sprite.y = LIFE_POS_Y;
        // 残機を初期化する。
        this._setLife(INITIAL_LIFE);
        // シールドボタンを作成する。
        this._shieldButton = new __WEBPACK_IMPORTED_MODULE_10__shieldbutton__["a" /* default */]();
        // シールドボタンの位置を設定する。
        this._shieldButton.sprite.addChildTo(this._infoLayer);
        this._shieldButton.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH - SHIELD_BUTTON_POS_X;
        this._shieldButton.sprite.y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y;
        // 一時停止ボタンを作成する。
        this._pauseButton = new __WEBPACK_IMPORTED_MODULE_13__imagebutton__["a" /* default */]('pauseButton')
            .setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH - PUASE_BUTTON_POS_X, PAUSE_BUTTON_POS_Y)
            .onPush(() => { this._pause(); })
            .addChildTo(this._infoLayer);
        // チキンゲージを作成する。
        this._chickenGauge = new __WEBPACK_IMPORTED_MODULE_8__chickengauge__["a" /* default */]();
        // チキンゲージの位置を設定する。
        this._chickenGauge.sprite.addChildTo(this._infoLayer);
        this._chickenGauge.sprite.x = Math.round(this._phinaScene.gridX.center());
        this._chickenGauge.sprite.y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;
        // ボスHPゲージを作成する。
        this._bossLifeGauge = new __WEBPACK_IMPORTED_MODULE_9__bosslifegauge__["a" /* default */]();
        // ボスHPゲージの位置を設定する。
        this._bossLifeGauge.sprite.addChildTo(this._infoLayer);
        this._bossLifeGauge.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO + BOSS_LIFE_GAUGE_POS_X;
        this._bossLifeGauge.sprite.y = BOSS_LIFE_GAUGE_POS_Y;
        // 初期状態はボスHPゲージは非表示とする。
        this._bossLifeGauge.sprite.alpha = 0;
        // 復活待機フレーム数を初期化する。
        this._rebirthWait = 0;
        // キャラクター管理配列を作成する。
        this._characters = [];
        // 自機を作成する。
        this._player = new __WEBPACK_IMPORTED_MODULE_6__player__["a" /* default */](Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width / 4), Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height / 2), this);
        // タッチ情報を初期化する。
        this._touch = { id: -1, x: 0, y: 0 };
        // 自機弾衝突フラグを初期化する。
        this._isHitPlayerShot = false;
        // 自機弾衝突音発生間隔を初期化する。
        this._hitPlayerShotInterval = HIT_PLAYER_SHOT_INTERVAL;
        // 一時停止レイヤーを作成する。
        this._pauseLayer = new __WEBPACK_IMPORTED_MODULE_12__menulayer__["a" /* default */]('PAUSE', 'RESUME', 'QUIT')
            .onLeftButton(() => { this._resume(); })
            .onRightButton(() => { this._viewQuitMenu(); });
        // 終了メニュー時のレイヤーを作成する。
        this._quitLayer = new __WEBPACK_IMPORTED_MODULE_12__menulayer__["a" /* default */]('QUIT GAME?', 'YES', 'NO')
            .onLeftButton(() => { this._replaceScene(); })
            .onRightButton(() => { this._viewPauseMenu(); });
        // 初期状態はプレイ中とする。
        this._changeState(SCENE_STATE.PLAYING);
    }
    /**
     * 更新処理。
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     * @param app アプリケーション
     */
    update(app) {
        // ゲームパッドの状態を更新する。
        this._gamepadManager.update();
        // 入力処理を行う。
        this._input(app);
        // プレイ中、待機中の場合
        if (this._state === SCENE_STATE.PLAYING ||
            this._state === SCENE_STATE.WAIT_GAMEOVER) {
            // ステージやキャラクターの状態を更新する。
            this._updateStageData();
        }
        // チキンゲージ表示を更新する。
        this._chickenGauge.rate = this._player.chickenGauge;
        // スコア表示を更新する。
        this._scoreLabel.text = 'SCORE: ' + ('000000' + this._score).slice(-6);
    }
    /**
     * キャラクターを追加する。
     * @param character 追加するキャラクター
     */
    addCharacter(character) {
        this._characters.push(character);
    }
    /**
     * キャラクターのスプライトを追加する。
     * @param sprite 追加するスプライト
     */
    addCharacterSprite(sprite) {
        sprite.addChildTo(this._characterLayer);
    }
    /**
     * キャラクターを削除する。
     * @param character 削除するキャラクター
     */
    removeCharacter(character) {
        const i = this._characters.indexOf(character);
        if (i >= 0) {
            this._characters.splice(i, 1);
        }
    }
    /**
     * スコアを追加する。
     * @param score 追加するスコア
     */
    addScore(score) {
        this._score += score;
    }
    /**
     * ブロックマップを取得する。
     * @return ブロックマップ
     */
    getBlockMap() {
        return this._stage.blockMap;
    }
    /**
     * ステージが左方向に何ドット移動しているかを取得する。
     * @return ステージ位置
     */
    getStagePosition() {
        return -this._stage.x;
    }
    /** ステージのスクロールスピード */
    get scrollSpeed() {
        return this._stage.speed;
    }
    /** キャラクター管理配列 */
    get characters() {
        return this._characters;
    }
    /** 自機の位置 */
    get playerPosition() {
        return {
            x: this._player.rect.x,
            y: this._player.rect.y,
        };
    }
    /** 自機弾衝突フラグ */
    set isHitPlayerShot(value) {
        this._isHitPlayerShot = value;
    }
    /** ボスHPゲージの比率。 */
    set bossLife(value) {
        // ボスHPゲージを表示する。
        this._bossLifeGauge.sprite.alpha = 1;
        // ゲージを設定する。
        this._bossLifeGauge.rate = value;
    }
    /**
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss() {
        // 残機が残っている場合
        if (this._life > 0) {
            // 残機を一つ減らす。
            this._setLife(this._life - 1);
            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this._rebirthWait = REBIRTH_WAIT;
            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        else {
            // 状態を待機中に変更する。
            this._changeState(SCENE_STATE.WAIT_GAMEOVER);
            // BGMを停止する。
            phina.asset.SoundManager.stopMusic();
            // 一定時間後にゲームオーバー状態に遷移する。
            setTimeout(() => { this._gameOver(); }, GAMEOVER_INTERVAL);
        }
    }
    /**
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     * @return 敵弾が無効化されているかどうか
     */
    isDisableEnemyShot() {
        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this._rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 入力処理を行う。
     * @param app アプリケーション
     */
    _input(app) {
        // 状態に応じて入力処理を振り分ける。
        switch (this._state) {
            case SCENE_STATE.PLAYING:
                this._inputOnPlaying(app);
                break;
            case SCENE_STATE.GAMEOVER:
                this._inputOnGameOver(app);
                break;
            case SCENE_STATE.PAUSE:
                this._pauseLayer.input(app.keyboard, this._gamepadManager.get(0));
                break;
            case SCENE_STATE.QUIT_MENU:
                this._quitLayer.input(app.keyboard, this._gamepadManager.get(0));
                break;
            default:
                break;
        }
    }
    /**
     * プレイ中の入力処理を行う。
     * @param app アプリケーション
     */
    _inputOnPlaying(app) {
        // キーボード入力を行う。
        const keyboard = this._inputKeyboard(app);
        // タッチ入力を行う。
        const touch = this._inputTouch(app);
        // ゲームパッド入力を行う。
        const gamepad = this._inputGamepad();
        // シールドボタン入力状態に応じて自機の状態を変化させる。
        if (keyboard.shield || touch.shield || gamepad.shield) {
            this._player.shield = true;
        }
        else {
            this._player.shield = false;
        }
        // 一時停止が入力された場合は一時停止処理を行う。
        if (keyboard.pause || touch.pause || gamepad.pause) {
            this._pause();
        }
    }
    /**
     * ゲームオーバー時の入力処理を行う。
     * @param app アプリケーション
     */
    _inputOnGameOver(app) {
        // キーボードを取得する。
        const key = app.keyboard;
        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get();
        // キーボードのzキーか、ゲームパッドのAボタンでタイトル画面に戻る。
        if (key.getKeyDown('z') || gamepad.getKeyDown('a')) {
            this._replaceScene();
        }
    }
    /**
     * キーボードの入力処理を行う。
     * @param app アプリケーション
     */
    _inputKeyboard(app) {
        // キーボードを取得する。
        const key = app.keyboard;
        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        };
        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this._player.moveKeyLeft(this);
        }
        if (key.getKey('right')) {
            this._player.moveKeyRight(this);
        }
        if (key.getKey('up')) {
            this._player.moveKeyUp(this);
        }
        if (key.getKey('down')) {
            this._player.moveKeyDown(this);
        }
        // zキーでシールドを使用する。
        if (key.getKey('z')) {
            inputState.shield = true;
        }
        // ESCキーで一時停止する。
        if (key.getKeyDown('escape')) {
            inputState.pause = true;
        }
        return inputState;
    }
    /**
     * タッチの入力処理を行う。
     * @param app アプリケーション
     */
    _inputTouch(app) {
        const touches = app.pointers;
        let sliding = false;
        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        };
        for (let i = 0; i < touches.length; i++) {
            // マウスが接続されていない場合はスライドの処理を行う。
            if (!__WEBPACK_IMPORTED_MODULE_0__pointdevice__["a" /* default */].isMouseUsed) {
                // スライド操作をしていない状態だった場合、最初のタッチ位置を記憶する。
                if (this._touch.id < 0) {
                    this._touch.id = touches[i].id;
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
                // スライド操作をしている場合はスライド量に応じて自機を移動する。
                if (this._touch.id == touches[i].id) {
                    this._player.moveTouch(touches[i].x - this._touch.x, touches[i].y - this._touch.y, this);
                    this._touch.x = touches[i].x;
                    this._touch.y = touches[i].y;
                    sliding = true;
                    continue;
                }
            }
        }
        // スライドしていない場合はタッチ情報を初期化する。
        if (!sliding) {
            this._touch.id = -1;
            this._touch.x = 0;
            this._touch.y = 0;
        }
        // シールドボタンがタッチされている場合はシールドを使用する。
        if (this._shieldButton.isTouch) {
            inputState.shield = true;
        }
        return inputState;
    }
    /**
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad() {
        // 入力状態を初期化する。
        let inputState = {
            shield: false,
            pause: false,
        };
        // ゲームパッドを取得する。
        const gamepad = this._gamepadManager.get();
        // アナログスティックの入力を取得する。
        const stick = gamepad.getStickDirection(0);
        // アナログスティックの入力値が閾値を超えている場合は移動する。
        if (stick.length() > 0.5) {
            this._player.moveGamepad(stick.x, stick.y, this);
        }
        // Aボタンでシールドを使用する。
        if (gamepad.getKey('a')) {
            inputState.shield = true;
        }
        // STARTボタンで一時停止する。
        if (gamepad.getKeyDown('start')) {
            inputState.pause = true;
        }
        return inputState;
    }
    /**
     * ステージの外側の枠と背景を作成する。
     */
    _createFrame() {
        // ステージの外側の背景を作成する。
        this._createFrameBack();
        // ステージの外側の枠を作成する。
        this._createFrameBar();
    }
    /**
     * ステージの外側の背景を作成する。
     */
    _createFrameBack() {
        {
            // 左側の枠の座標を計算する。
            let x = 0;
            let y = 0;
            let width = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width) / 2);
            let height = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
            // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
            if (width % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width > 0) {
                x -= __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width - width % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width;
                width += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width - width % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width;
            }
            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height > 0) {
                y -= __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height;
                height += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height;
            }
            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height) {
                    const back = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
        {
            // 右側の枠の座標を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width;
            let y = 0;
            const width = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width) / 2);
            let height = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO;
            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height > 0) {
                y -= __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height;
                height += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height;
            }
            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height) {
                    const back = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
        {
            // 下側の枠の座標を計算する。
            const x = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width) / 2);
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            const width = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height) {
                    const back = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.addChildTo(this._frameLayer);
                }
            }
        }
    }
    /**
     * ステージの外側の枠を作成する。
     */
    _createFrameBar() {
        {
            // 左側の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x - __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            // 枠を並べる。
            for (let i = 0; i < height; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.height) {
                const bar = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameLeft.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 右側の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            // 枠を並べる。
            for (let i = 0; i < height; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.height) {
                const bar = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameRight.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 下側の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            const width = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width;
            // 枠を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.width) {
                const bar = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottom.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x + i, y);
                bar.addChildTo(this._frameLayer);
            }
        }
        {
            // 左下の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x - __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.width;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            // 枠を並べる。
            const bar = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.height);
            bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }
        {
            // 右下の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height;
            // 枠を並べる。
            const bar = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.height);
            bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.x, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.y, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize__["a" /* default */].frameBottomRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this._frameLayer);
        }
    }
    /**
     * 残機を変更し、残機ラベルを更新する。
     * @param life 残機
     */
    _setLife(life) {
        this._life = life;
        this._lifeLabel.life = this._life;
    }
    /**
     * 自機復活処理。
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    _rebirthPlayer() {
        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this._rebirthWait > 0) {
            this._rebirthWait--;
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this._rebirthWait <= 0) {
                // 自機を復活させる
                this._player.rebirth(this);
            }
        }
    }
    /**
     * 敵弾をすべて削除する。
     */
    _removeEnemyShot() {
        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (let i = this._characters.length - 1; i >= 0; i--) {
            const character = this._characters[i];
            if (__WEBPACK_IMPORTED_MODULE_4__character__["a" /* default */].isEnemyShot(character)) {
                character.remove(this);
            }
        }
    }
    /**
     * ゲームオーバー処理を行う。
     */
    _gameOver() {
        // 状態をゲームオーバーに遷移する。
        this._changeState(SCENE_STATE.GAMEOVER);
        // ゲームオーバーのラベルを画面に配置する。
        const gameOverLabel = new phina.display.Label({
            text: 'GAME OVER',
            fontSize: 36,
            backgroundColor: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].BACK_COLOR,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
            x: Math.round(this._phinaScene.gridX.center()),
            y: Math.round(this._phinaScene.gridY.center()),
            strokeWidth: 0,
            padding: 0,
        }).addChildTo(this._infoLayer);
        // 画面全体にタイトルへ戻るボタンを配置する。
        const backButton = new phina.display.DisplayElement({
            width: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH,
            height: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT,
            x: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH / 2,
            y: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT / 2,
        })
            .addChildTo(this._infoLayer)
            .setInteractive(true)
            .on('pointstart', (event) => {
            this._replaceScene();
        });
    }
    /**
     * ステージやキャラクターの状態を更新する。
     */
    _updateStageData() {
        // ステージの状態を更新する。
        this._stage.update(this);
        // プレイヤーの状態を更新する。
        this._player.update(this);
        // 自機弾衝突フラグを初期化する。
        this._isHitPlayerShot = false;
        // 各キャラクターの状態を更新する。
        for (let i = 0; i < this._characters.length; i++) {
            this._characters[i].update(this);
        }
        // 自機弾が衝突した場合はSEを鳴らす。
        // 連続で音が鳴らないように音を鳴らしたときは自機音衝突間隔を初期化して、
        // 規定フレーム分経過するまで次の音が鳴らないようにする。
        this._hitPlayerShotInterval++;
        if (this._isHitPlayerShot && this._hitPlayerShotInterval > HIT_PLAYER_SHOT_INTERVAL) {
            phina.asset.SoundManager.play('hit');
            this._hitPlayerShotInterval = 0;
        }
        // 自機復活処理を行う。
        this._rebirthPlayer();
    }
    /**
     * キャラクターのアニメーションを停止する。
     */
    _stopCharacterAnimation() {
        this._player.pauseAnimation();
        for (let character of this._characters) {
            character.pauseAnimation();
        }
    }
    /**
     * キャラクターのアニメーションを開始する。
     */
    _startCharacterAnimation() {
        this._player.startAnimation();
        for (let character of this._characters) {
            character.startAnimation();
        }
    }
    /**
     * タイトルシーンへと切り替える。
     */
    _replaceScene() {
        // BGMを停止する。
        phina.asset.SoundManager.stopMusic();
        // 全要素を取り除く。
        this._rootNode.remove();
        // タイトルシーンへ遷移する。
        this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_11__titlescene__["a" /* default */](this._phinaScene, this._gamepadManager);
    }
    /**
     * ゲームを一時停止する。
     */
    _pause() {
        // 効果音を鳴らす。
        phina.asset.SoundManager.play('pause');
        // BGMを一時停止する。
        phina.asset.SoundManager.pauseMusic();
        // 状態をポーズに遷移する。
        this._changeState(SCENE_STATE.PAUSE);
    }
    /**
     * ゲームを再開する。
     */
    _resume() {
        // BGMを再開する。
        phina.asset.SoundManager.resumeMusic();
        // 状態をプレイ中に遷移する。
        this._changeState(SCENE_STATE.PLAYING);
    }
    /**
     * ゲーム終了メニューを表示する。
     */
    _viewQuitMenu() {
        // 状態を終了メニューに遷移する。
        this._changeState(SCENE_STATE.QUIT_MENU);
    }
    /**
     * 一時停止メニューを表示する。
     */
    _viewPauseMenu() {
        // 状態をポーズに遷移する。
        this._changeState(SCENE_STATE.PAUSE);
    }
    /**
     * 状態を遷移し、コントロールの有効無効を切り替える。。
     * @param state 遷移先の状態
     */
    _changeState(state) {
        // プレイ中かゲームオーバー待機中の場合は各キャラクターのアニメーションを行う。
        if (state === SCENE_STATE.PLAYING || state === SCENE_STATE.WAIT_GAMEOVER) {
            this._startCharacterAnimation();
        }
        else {
            this._stopCharacterAnimation();
        }
        // 一時停止中の場合は一時停止レイヤーを画面に配置する。
        if (state === SCENE_STATE.PAUSE) {
            this._pauseLayer.addChildTo(this._rootNode);
        }
        else {
            this._pauseLayer.remove();
        }
        // 終了メニューの場合は終了メニューを画面に配置する。
        if (state === SCENE_STATE.QUIT_MENU) {
            this._quitLayer.addChildTo(this._rootNode);
        }
        else {
            this._quitLayer.remove();
        }
        // プレイ中の場合は一時停止ボタンを有効にする。
        if (state === SCENE_STATE.PLAYING) {
            this._pauseButton.setEnable(true);
        }
        else {
            this._pauseButton.setEnable(false);
        }
        // プレイ中の場合はシールドボタンを有効にする。
        if (state === SCENE_STATE.PLAYING) {
            this._shieldButton.enable = true;
        }
        else {
            this._shieldButton.enable = false;
        }
        // メンバ変数を変更する。
        this._state = state;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PlayingScene);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(9);



// 移動状態
var MOVE_STATE;
(function (MOVE_STATE) {
    MOVE_STATE[MOVE_STATE["LEFT_MOVE"] = 0] = "LEFT_MOVE";
    MOVE_STATE[MOVE_STATE["DOWN_MOVE"] = 1] = "DOWN_MOVE";
    MOVE_STATE[MOVE_STATE["UP_MOVE"] = 2] = "UP_MOVE";
})(MOVE_STATE || (MOVE_STATE = {}));
// 弾発射状態
var SHOT_STATE;
(function (SHOT_STATE) {
    SHOT_STATE[SHOT_STATE["NO_SHOT"] = 0] = "NO_SHOT";
    SHOT_STATE[SHOT_STATE["LEFT_SHOT"] = 1] = "LEFT_SHOT";
    SHOT_STATE[SHOT_STATE["N_WAY"] = 2] = "N_WAY";
    SHOT_STATE[SHOT_STATE["ALL_DIRECTION"] = 3] = "ALL_DIRECTION";
})(SHOT_STATE || (SHOT_STATE = {}));
;
// x座標最小位置
const X_POS_MIN = 150;
// y座標最小位置
const Y_POS_MIN = 40;
// y座標最大位置
const Y_POS_MAX = 105;
// 移動スピード
const MOVE_SPEED = 0.5;
// 状態遷移間隔
const STATE_CHANGE_INTERVAL = [0, 900, 900, 900];
// 左方向への弾の発射間隔
const LEFT_SHOT_INTERVAL = 60;
// 左方向への弾の上下の発射位置
const LEFT_SHOT_POSITION = 15;
// 左方向への弾のスピード
const LEFT_SHOT_SPEED = 0.75;
// 左方向への弾発射時の1-way弾の発射間隔
const LEFT_SHOT_1WAY_INTERVAL = 60;
// 左方向への弾発射時の1-way弾のスピード
const LEFT_SHOT_1WAY_SPEED = 0.5;
// n-way弾の塊の発射間隔
const NWAY_GROUP_SHOT_INTERVAL = 60;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 6;
// n-way弾の発射時間
const NWAY_SHOT_TIME = 30;
// n-way弾の弾数
const NWAY_COUNT = 3;
// n-way弾の角度の間隔
const NWAY_ANGLE = Math.PI / 8;
// n-way弾のスピード
const NWAY_SPEED = 1;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 30;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 12;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;
/**
 * 敵キャラ、カブトムシ。
 * 左に真っすぐ進み、画像がすべて表示できた部分で上下に移動する。
 * 攻撃パターン1:左方向にまっすぐ3-wayと自機を狙う1-way弾を発射する
 * 攻撃パターン2:定周期に一塊の5-way弾を発射する
 * 攻撃パターン3:全方位弾を発射する
 */
class RhinocerosBeetle extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param scene シーン
     */
    constructor(x, y, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'rhinocerosbeetle', scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 初期移動状態は左移動とする。
        this._moveState = MOVE_STATE.LEFT_MOVE;
        // 初期弾発射状態は弾発射なしとする。
        this._shotState = SHOT_STATE.NO_SHOT;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 左に真っすぐ進み、画像がすべて表示できた部分で上下に移動する。
     * 攻撃パターン1:左方向にまっすぐ3-wayと自機を狙う1-way弾を発射する
     * 攻撃パターン2:定周期に一塊の5-way弾を発射する
     * 攻撃パターン3:全方位弾を発射する
     * @param scene シーン
     */
    action(scene) {
        // 移動状態に応じて、移動する。
        switch (this._moveState) {
            case MOVE_STATE.LEFT_MOVE:// 左方向へ移動。
                // 左方向へ移動する。
                this._hitArea.x -= MOVE_SPEED;
                // x座標最小位置まで移動したら下方向移動する。
                if (this._hitArea.x < X_POS_MIN) {
                    this._moveState = MOVE_STATE.DOWN_MOVE;
                }
                break;
            case MOVE_STATE.DOWN_MOVE:// 下方向へ移動。
                // 下方向へ移動する。
                this._hitArea.y += MOVE_SPEED;
                // y座標最大値まで移動したら上方向移動する。
                if (this._hitArea.y > Y_POS_MAX) {
                    this._moveState = MOVE_STATE.UP_MOVE;
                }
                break;
            case MOVE_STATE.UP_MOVE:// 上方向へ移動。
                // 上方向へ移動する。
                this._hitArea.y -= MOVE_SPEED;
                // y座標最小値まで移動したら下方向移動する。
                if (this._hitArea.y < Y_POS_MIN) {
                    this._moveState = MOVE_STATE.DOWN_MOVE;
                }
                break;
            default:
                break;
        }
        // 弾発射状態に応じて弾を発射する。
        switch (this._shotState) {
            case SHOT_STATE.NO_SHOT:// 弾を撃たない
                // 左方向への移動が終わったら、左方向へ弾発射を始める。
                if (this._moveState !== MOVE_STATE.LEFT_MOVE) {
                    this._shotState = SHOT_STATE.LEFT_SHOT;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;
                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }
                break;
            case SHOT_STATE.LEFT_SHOT:// 左方向へ弾発射
                // 左方向への弾発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= LEFT_SHOT_INTERVAL) {
                    // 3箇所から同時に弾を発射する
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y - LEFT_SHOT_POSITION, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y + LEFT_SHOT_POSITION, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 1-way弾の弾発射間隔が経過している場合は弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] >= LEFT_SHOT_1WAY_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, LEFT_SHOT_1WAY_SPEED, false, scene);
                    this._shotInterval[1] = 0;
                }
                // 状態遷移間隔が経過している場合は、自機へ向けてn-way弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.N_WAY;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;
                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }
                break;
            case SHOT_STATE.N_WAY:// 自機へ向けてn-way弾発射
                // n-way弾グループの発射間隔が経過している場合はn-way弾を発射し始める。
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= NWAY_GROUP_SHOT_INTERVAL) {
                    // n-way弾の発射間隔が経過している場合は弾を発射する。
                    this._shotInterval[1]++;
                    if (this._shotInterval[1] >= NWAY_SHOT_INTERVAL) {
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), NWAY_COUNT, NWAY_ANGLE, NWAY_SPEED, false, scene);
                        this._shotInterval[1] = 0;
                    }
                    // n-way弾発射時間が経過している場合は発射間隔を初期化して、次のグループ弾発射間隔まで待機する。
                    if (this._shotInterval[0] >= NWAY_GROUP_SHOT_INTERVAL + NWAY_SHOT_TIME) {
                        this._shotInterval[0] = 0;
                        this._shotInterval[1] = 0;
                    }
                }
                // 状態遷移間隔が経過している場合は、全方位に弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.ALL_DIRECTION;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;
                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }
                break;
            case SHOT_STATE.ALL_DIRECTION:// 全方位に弾発射
                // 全方位弾の発射間隔が経過している場合は弾を発射する
                this._shotInterval[0]++;
                if (this._shotInterval[0] >= ALL_DIRECTION_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea.x, this._hitArea.y, Math.PI, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    this._shotInterval[0] = 0;
                }
                // 状態遷移間隔が経過している場合は、左方向へ弾発射へ遷移する。
                this._stateInterval++;
                if (this._stateInterval >= STATE_CHANGE_INTERVAL[this._shotState]) {
                    this._shotState = SHOT_STATE.LEFT_SHOT;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                    this._shotInterval[1] = 0;
                    // 状態遷移間隔を初期化する。
                    this._stateInterval = 0;
                }
                break;
            default:
                break;
        }
        // ボスHPゲージの表示を更新する。
        if (this._hp > 0) {
            scene.bossLife = this._hp / this._maxHP;
        }
        else {
            scene.bossLife = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (RhinocerosBeetle);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize_js__ = __webpack_require__(0);
/** @module shieldbutton */


// ボタンサイズ
const BUTTON_SIZE = 128;
/**
 * シールドボタンの画像表示とタッチ処理を行う。
 */
class ShieldButton {
    /**
     * コンストラクタ。
     * 画像の読み込みとボタン部分を作成する。
     */
    constructor() {
        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();
        // タッチしていない状態の画像を読み込む。
        this._offImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.height);
        // タッチしていない状態のサイズを設定する。
        this._offImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.x, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.y, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOff.height);
        this._offImage.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._offImage.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        // ベース部分に追加する。
        this._offImage.addChildTo(this._base);
        // タッチしている状態の画像を読み込む。
        this._onImage = new phina.display.Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.height);
        // タッチしている状態のサイズを設定する。
        this._onImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.x, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.y, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].shieldButtonOn.height);
        this._onImage.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this._onImage.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        // ベース部分に追加する。
        this._onImage.addChildTo(this._base);
        // ボタン部分を作成する。
        // タップをやりやすくするため、画像より大きめにサイズを取る。
        this._button = new phina.display.RectangleShape({
            height: BUTTON_SIZE,
            width: BUTTON_SIZE,
        });
        // ボタン部分を非表示にする。
        this._button.alpha = 0;
        // タッチ操作を有効にする。
        this._button.setInteractive(true);
        // ベース部分に追加する。
        this._button.addChildTo(this._base);
        // タッチ開始イベントのハンドラを作成する。
        this._button.on('pointstart', (event) => {
            if (this._enable) {
                this._touch = true;
                this._offImage.alpha = 0;
                this._onImage.alpha = 1;
            }
        });
        // タッチ終了イベントのハンドラを作成する。
        this._button.on('pointend', (event) => {
            this._touch = false;
            this._offImage.alpha = 1;
            this._onImage.alpha = 0;
        });
        // 初期状態はタッチしていない状態とする。
        this._touch = false;
        this._offImage.alpha = 1;
        this._onImage.alpha = 0;
    }
    /** 画像、ボタンを合わせたスプライト。 */
    get sprite() {
        return this._base;
    }
    /** タッチされているかどうか。 */
    get isTouch() {
        return this._touch;
    }
    /** 有効かどうか */
    set enable(value) {
        this._enable = value;
        // 無効にした場合はタッチしていない状態にする。
        if (!this._enable) {
            this._touch = false;
            this._offImage.alpha = 1;
            this._onImage.alpha = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ShieldButton);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var StringResource = {
    en: {
        "HowToPlay_touch_1": "Sliding finger across the screen moves your character.",
        "HowToPlay_touch_2": "Automatically shot is fired.",
        "HowToPlay_touch_3": "Getting near an enemy shot increase the Chicken gauge.",
        "HowToPlay_touch_4": "When the Chicken gauge is charged, chicks come to help.",
        "HowToPlay_touch_5": "When push the Shield button, chicks wear an egg and reflect enemy shot.",
        "HowToPlay_touch_6": "While push the Shield button, the Chiken gauge is decreased.",
        "HowToPlay_gamepad_1": "Using the left analog stick moves your character.",
        "HowToPlay_gamepad_2": "Automatically shot is fired.",
        "HowToPlay_gamepad_3": "Getting near an enemy shot increase the Chicken gauge.",
        "HowToPlay_gamepad_4": "When the Chicken gauge is charged, chicks come to help.",
        "HowToPlay_gamepad_5": "When push A button, chicks wear an egg and reflect enemy shot.",
        "HowToPlay_gamepad_6": "While push A button, the Chiken gauge is decreased.",
        "HowToPlay_keyboard_1": "Pressing cursor keys moves your character.",
        "HowToPlay_keyboard_2": "Automatically shot is fired.",
        "HowToPlay_keyboard_3": "Getting near an enemy shot increase the Chicken gauge.",
        "HowToPlay_keyboard_4": "When the Chicken gauge is charged, chicks come to help.",
        "HowToPlay_keyboard_5": "When press Z key, chicks wear an egg and reflect enemy shot.",
        "HowToPlay_keyboard_6": "While press Z key, the Chiken gauge is decreased.",
        "Tweet1stLoop": "Toritoma, Go on to stage %d. Earned %d points the score. #toritoma",
        "Tweet2ndLoop": "Toritoma, Go on to stage %d in %d%s lap. Earned %d points the score. #toritoma",
        "CreditName_1": "Production\n    Kaneda",
        "CreditName_2": "BGM\n    Maou Damashii",
        "CreditName_3": "Jingle\n    YouFulca",
        "CreditName_4": "Sound Effect\n    Skipmore",
        "CreditName_5": "Font\n    Misaki Font",
        "CreditName_6": "Font\n    Noto Fonts",
        "CreditLink_1": "http://blog.monochrome-soft.com/",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://www.geocities.jp/littlimi/misaki.htm",
        "CreditLink_6": "https://www.google.com/get/noto/",
        "StoreMessage": "・Remove ads.\n・Unlock 2nd lap after the game clear.",
        "StorePurchased": "PURCHASED",
    },
    ja: {
        "HowToPlay_touch_1": "画面をスライドすると自機が移動します。",
        "HowToPlay_touch_2": "自動的にショットが発射されます。",
        "HowToPlay_touch_3": "敵の弾に近づくとチキンゲージが溜まります。",
        "HowToPlay_touch_4": "チキンゲージが溜まるとヒヨコが助けにきます。",
        "HowToPlay_touch_5": "シールドボタンを押すとヒヨコが卵をかぶって敵の弾を跳ね返します。",
        "HowToPlay_touch_6": "シールドボタンを押している間はチキンゲージが減っていきます。",
        "HowToPlay_gamepad_1": "左スティックを傾けると自機が移動します。",
        "HowToPlay_gamepad_2": "自動的にショットが発射されます。",
        "HowToPlay_gamepad_3": "敵の弾に近づくとチキンゲージが溜まります。",
        "HowToPlay_gamepad_4": "チキンゲージが溜まるとヒヨコが助けにきます。",
        "HowToPlay_gamepad_5": "Aボタンを押すとヒヨコが卵をかぶって敵の弾を跳ね返します。",
        "HowToPlay_gamepad_6": "Aボタンを押している間はチキンゲージが減っていきます。",
        "HowToPlay_keyboard_1": "カーソルキーで自機が移動します。",
        "HowToPlay_keyboard_2": "自動的にショットが発射されます。",
        "HowToPlay_keyboard_3": "敵の弾に近づくとチキンゲージが溜まります。",
        "HowToPlay_keyboard_4": "チキンゲージが溜まるとヒヨコが助けにきます。",
        "HowToPlay_keyboard_5": "Zキーを押すとヒヨコが卵をかぶって敵の弾を跳ね返します。",
        "HowToPlay_keyboard_6": "Zキーを押している間はチキンゲージが減っていきます。",
        "Tweet1stLoop": "とりとま、ステージ%dまで進めてスコアを%d点獲得しました。 #toritoma",
        "Tweet2ndLoop": "とりとま、%d周目ステージ%dまで進めてスコアを%d点獲得しました。 #toritoma",
        "CreditName_1": "製作\n    金田",
        "CreditName_2": "BGM\n    魔王魂",
        "CreditName_3": "ジングル\n    ユーフルカ",
        "CreditName_4": "効果音\n    スキップモア",
        "CreditName_5": "フォント\n    美咲フォント",
        "CreditName_6": "フォント\n    Noto Fonts",
        "CreditLink_1": "http://blog.monochrome-soft.com/",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://www.geocities.jp/littlimi/misaki.htm",
        "CreditLink_6": "https://www.google.com/get/noto/",
        "StoreMessage": "・広告の削除\n・2周目モードの解除",
        "StorePurchased": "購入済み",
    },
    zh: {
        "HowToPlay_touch_1": "滑动指头在画面上就你的角色动。",
        "HowToPlay_touch_2": "子弹自动被开。",
        "HowToPlay_touch_3": "擦敌的子弹就鸡计堆积。",
        "HowToPlay_touch_4": "当鸡计堆积，雏鸡来帮助。",
        "HowToPlay_touch_5": "当按盾钮，雏鸡戴蛋壳，弹回敌的子弹。",
        "HowToPlay_touch_6": "当按盾钮，鸡计减少。",
        "HowToPlay_gamepad_1": "推左摇杆就你的角色动。",
        "HowToPlay_gamepad_2": "子弹自动被开。",
        "HowToPlay_gamepad_3": "擦敌的子弹就鸡计堆积。",
        "HowToPlay_gamepad_4": "当鸡计堆积，雏鸡来帮助。",
        "HowToPlay_gamepad_5": "当按A钮，雏鸡戴蛋壳，弹回敌的子弹。",
        "HowToPlay_gamepad_6": "当按A钮，鸡计减少。",
        "HowToPlay_keyboard_1": "按光标键就你的角色动。",
        "HowToPlay_keyboard_2": "子弹自动被开。",
        "HowToPlay_keyboard_3": "擦敌的子弹就鸡计堆积。",
        "HowToPlay_keyboard_4": "当鸡计堆积，雏鸡来帮助。",
        "HowToPlay_keyboard_5": "当按下Z键时，雏鸡戴蛋壳，弹回敌的子弹。",
        "HowToPlay_keyboard_6": "当按下Z键时，鸡计减少。",
        "Tweet1stLoop": "鸡射，到达第%d阶段。获得%d分。 #toritoma",
        "Tweet2ndLoop": "鸡射，到达第%d循环的第%d阶段。获得%d分。 #toritoma",
        "CreditName_1": "制作\n    金田",
        "CreditName_2": "背景音乐\n    魔王魂",
        "CreditName_3": "静乐县\n    YouFulca",
        "CreditName_4": "音效\n    Skipmore",
        "CreditName_5": "字体\n    美咲字体",
        "CreditName_6": "字体\n    Noto Fonts",
        "CreditLink_1": "http://blog.monochrome-soft.com/",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://www.geocities.jp/littlimi/misaki.htm",
        "CreditLink_6": "https://www.google.com/get/noto/",
        "StoreMessage": "・排除广告。\n・解锁过关后的第二循环。",
        "StorePurchased": "购买了",
    },
    ko: {
        "HowToPlay_touch_1": "화면을 슬라이드하면 자신의 캐릭터가 이동합니다.",
        "HowToPlay_touch_2": "자동으로 샷이 발사됩니다.",
        "HowToPlay_touch_3": "적의 총알에 가까워지면 치킨 게이지가 쌓입니다.",
        "HowToPlay_touch_4": "치킨 게이지가 쌓이면 병아리가 도와주러 합니다.",
        "HowToPlay_touch_5": "방패 버튼을 누르면 병아리가 달걀을 쓰고 적의 총알을 반사합니다.",
        "HowToPlay_touch_6": "방패 버튼을 누르고있는 동안은 치킨 게이지가 줄어 듭니다.",
        "HowToPlay_gamepad_1": "왼쪽 스틱을 기울이면 자신의 캐릭터가 이동합니다.",
        "HowToPlay_gamepad_2": "자동으로 샷이 발사됩니다.",
        "HowToPlay_gamepad_3": "적의 총알에 가까워지면 치킨 게이지가 쌓입니다.",
        "HowToPlay_gamepad_4": "치킨 게이지가 쌓이면 병아리가 도와주러 합니다.",
        "HowToPlay_gamepad_5": "A 버튼을 누르면 병아리가 달걀을 쓰고 적의 총알을 반사합니다.",
        "HowToPlay_gamepad_6": "A 버튼을 누르고있는 동안은 치킨 게이지가 줄어 듭니다.",
        "HowToPlay_keyboard_1": "커서 키로 자신의 캐릭터가 이동합니다.",
        "HowToPlay_keyboard_2": "자동으로 샷이 발사됩니다.",
        "HowToPlay_keyboard_3": "적의 총알에 가까워지면 치킨 게이지가 쌓입니다.",
        "HowToPlay_keyboard_4": "치킨 게이지가 쌓이면 병아리가 도와주러 합니다.",
        "HowToPlay_keyboard_5": "Z 키를 누르면 병아리가 달걀을 쓰고 적의 총알을 반사합니다.",
        "HowToPlay_keyboard_6": "Z 키를 누르고있는 동안은 치킨 게이지가 줄어 듭니다.",
        "Tweet1stLoop": "토리토마, %d 단계까지 진행하고 점수를 %d 점 획득했습니다. #toritoma",
        "Tweet2ndLoop": "토리토마, %d 회차 %d 단계까지 진행하고 점수를 %d 점 획득했습니다. #toritoma",
        "CreditName_1": "제작\n    카네다",
        "CreditName_2": "BGM\n    마왕 영혼",
        "CreditName_3": "징글\n    유후루카",
        "CreditName_4": "효과음\n    스킵 모어",
        "CreditName_5": "글꼴\n    미사키 글꼴",
        "CreditName_6": "글꼴\n    Noto Fonts",
        "CreditLink_1": "http://blog.monochrome-soft.com/",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://www.geocities.jp/littlimi/misaki.htm",
        "CreditLink_6": "https://www.google.com/get/noto/",
        "StoreMessage": "・광고 삭제\n・2 회차 모드 해제",
        "StorePurchased": "구입 완료",
    },
};
/* harmony default export */ __webpack_exports__["a"] = (StringResource);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module tilemapmanager */
/**
 * Tiled Map Editorで作成したデータを読み込む。
 * データはjs形式でエクスポートして使用するものとする。
 */
class TileMapManager {
    /**
     * 初期化処理。
     * 使用するマップの名前を指定する。
     * @param mapName マップ名
     */
    constructor(mapName) {
        // マップ名に対応するマップを取得する。
        this._map = TileMaps[mapName];
        // オブジェクトマップを初期化する。
        this._objectMap = {};
    }
    /**
     * 指定したレイヤーの画像をテクスチャとして取得する。
     * @param layerName レイヤー名
     * @return マップ画像のテクスチャ
     */
    getIamge(layerName) {
        // マップの幅と高さのドット数を求める。
        const width = this._map.width * this._map.tilewidth;
        const height = this._map.height * this._map.tileheight;
        // canvasを作成する。
        const canvas = new phina.graphics.Canvas().setSize(width, height);
        // レイヤー名に対応するレイヤーを取得する。
        let work = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i];
            }
        }
        // 型チェックを行い、異常があれば処理を終了する。
        const isTileLayer = (item) => item !== null && item.type === 'tilelayer';
        if (!isTileLayer(work)) {
            return null;
        }
        const layer = work;
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
    createObjectMap(layerName, type) {
        // 指定された種別のオブジェクトマップを作成する。
        this._objectMap[type] = new Array(this._map.height);
        for (let i = 0; i < this._map.height; i++) {
            this._objectMap[type][i] = new Array(this._map.width);
        }
        // レイヤー名に対応するレイヤーを取得する。
        let work = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i];
            }
        }
        // 型チェックを行い、異常があれば処理を終了する。
        const isTileLayer = (item) => item !== null && item.type === 'tilelayer';
        if (!isTileLayer(work)) {
            return;
        }
        const layer = work;
        // レイヤー内の各タイルを処理する。
        for (let i = 0; i < layer.data.length; i++) {
            // タイルが配置されている場合
            const gid = layer.data[i];
            if (gid > 0) {
                // gidに対応するタイルセットを検索する。
                for (let j = 0; j < this._map.tilesets.length; j++) {
                    // タイルがあった場合
                    const tile = this._map.tilesets[j].tiles[gid - 1];
                    if (tile) {
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
    /**
     * layerNameで指定されたレイヤーの座標x, yから幅width、高さheightの範囲内にあるオブジェクトを取得する。
     * @param layerName レイヤー名
     * @param x 検索範囲左上のx座標
     * @param y 検索範囲左上のy座標
     * @param width 検索範囲幅
     * @param height 検索範囲高さ
     * @return 検索結果のオブジェクトの配列
     */
    getObjects(layerName, x, y, width, height) {
        let objects = [];
        // レイヤー名に対応するレイヤーを取得する。
        let work = null;
        for (let i = 0; i < this._map.layers.length; i++) {
            if (this._map.layers[i].name == layerName) {
                work = this._map.layers[i];
            }
        }
        // 型チェックを行い、異常があれば処理を終了する。
        const isObjectLayer = (item) => item !== null && item.type === 'objectgroup';
        if (!isObjectLayer(work)) {
            return objects;
        }
        const layer = work;
        // レイヤー内のオブジェクトを検索する。
        for (let i = 0; i < layer.objects.length; i++) {
            let object = layer.objects[i];
            // 指定した範囲内に存在するオブジェクトを戻り値に格納する。
            if (object.x < x + width &&
                object.x + object.width - 1 >= x &&
                object.y < y + height &&
                object.y + object.height - 1 >= y) {
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
    getObjectMap(name) {
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
    _drawTile(canvas, tilesets, index, x, y) {
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
/* harmony default export */ __webpack_exports__["a"] = (TileMapManager);


/***/ })
/******/ ]);