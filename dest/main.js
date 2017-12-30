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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
const SCREEN_HEIGHT = 160 * ZOOM_RATIO;
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

    /**
     * 拡大率
     * @type {number}
     */
    static get ZOOM_RATIO() {
        return ZOOM_RATIO;
    }

    /**
     * スクリーンの幅
     * @type {number}
     */
    static get SCREEN_WIDTH() {
        return SCREEN_WIDTH;
    }

    /**
     * スクリーンの高さ
     * @type {number}
     */
    static get SCREEN_HEIGHT() {
        return SCREEN_HEIGHT;
    }

    /**
     * ゲーム画面のサイズ
     * @type {Object}
     */
    static get STAGE_RECT() {
        return STAGE_RECT;
    };
}

/* harmony default export */ __webpack_exports__["a"] = (ScreenSize);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module character */

/**
 * キャラクター種別
 * @enum {number}
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
};

/**
 * 敵キャラパラメータ
 * @type {object}
 */
const enemy = {
    // トンボ
    dragonfly: {
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
    },
    // アリ
    ant: {
        width: 16,
        height: 8,
        hp: 7,
        defense: 0,
        score: 200,
    },
};

/**
 * キャラクターに関する定数を管理する。
 */
class Character {

    /**
     * キャラクタータイプ
     * @type {Array}
     */
    static get type() {
        return type;
    }

    /**
     * 敵キャラクターパラメータ
     * @type {object}
     */
    static get enemy() {
        return enemy;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Character);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_js__ = __webpack_require__(6);
/** @module util */




/**
 * アプリ全体で使用する関数群を定義する。
 */
class Util {

    /**
     * キャラクター同士の当たり判定。
     * キャラクター同士が衝突しているかどうかを判定する。
     * @param {Object} a - キャラクター1
     * @param {Object} b - キャラクター2
     * @return {boolean} 衝突しているかどうか
     */
    static isHitCharacter(a, b) {
        if (a.x - a.width / 2 < b.x + b.width / 2 &&
                a.x + a.width / 2 > b.x - b.width / 2 &&
                a.y - a.height < b.y + b.height / 2 &&
                a.y + a.height > b.y - b.height / 2) {

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
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 衝突しているブロック、見つからなければnull。
     */
    static checkCollidedBlock(character, stagePosition, blockMap) {

        // ブロックマップの検索範囲を計算する。
        let xmin = Math.floor((character.x - character.width / 2 + stagePosition) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE);
        let xmax = Math.ceil((character.x + character.width / 2 + stagePosition) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE);
        let ymin = Math.floor((character.y - character.height / 2) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE);
        let ymax = Math.ceil((character.y + character.height / 2) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE);

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
                        character.x - character.width / 2 < x * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width &&
                        character.x + character.width / 2 > x * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x &&
                        character.y - character.height / 2 < y * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height &&
                        character.y + character.height / 2 > y * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y) {

                    // ブロックの中心座標とサイズを戻り値とする。
                    // 変数名や値はキャラクターに合わせる。
                    const ret = {
                        x: x * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                        y: y * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
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
     * @param {Object} character - キャラクター
     * @param {number} prevX - 移動前x座標
     * @param {number} prevY - 移動前y座標
     * @param {Object} block - 衝突したブロックの位置とサイズ
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 移動後の座標
     */
    static moveByBlock(character, prevX, prevY, block, stagePosition, blockMap) {

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
                newPosition.x = block.x - block.width / 2 - character.width / 2 ;

                // 横方向移動のフラグを立てる
                isXMoved = true;
            }
        }
        // x方向左に進んでいる時に衝突した場合
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
        // y方向下に進んでいる時に衝突した場合
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
            if (Util.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {

                // x座標だけ元に戻して衝突するか調べる。
                const newXPosBackupt = newPosition.x;
                newPosition.x = character.x;
                newPosition.y = newYPosBackup;
                if (Util.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {

                    // 片方だけでは衝突する場合は両方の値を採用する。
                    newPosition.x = newXPosBackupt;
                }
            }
        }
        // x方向だけ移動した場合
        else if (isXMoved) {
            // y方向は元に戻す。
            newPosition.y = character.y;
        }
        // y方向だけ移動した場合
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
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 移動後の位置
     */
    static dodgeBlockUp(character, stagePosition, blockMap) {

        // 上方向に移動してブロックを回避する。
        const dest = Util._dodgeBlock(character,
                stagePosition,
                blockMap,
                function(dest, block) { dest.y = block.y - block.height / 2 - dest.height / 2; });

        // 移動先の座標を返す。
        return dest;
    }

    /**
     * ブロックを避けて下に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 移動後の位置
     */
    static dodgeBlockDown(character, stagePosition, blockMap) {

        // 下方向に移動してブロックを回避する。
        const dest = Util._dodgeBlock(character,
                stagePosition,
                blockMap,
                function(dest, block) { dest.y = block.y + block.height / 2 + dest.height / 2; });

        // 移動先の座標を返す。
        return dest;
    }

    /**
     * ブロックを避けて左に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 移動後の位置
     */
    static dodgeBlockLeft(character, stagePosition, blockMap) {

        // 左方向に移動してブロックを回避する。
        const dest = Util._dodgeBlock(character,
                stagePosition,
                blockMap,
                function(dest, block) { dest.x = block.x - block.width / 2 - dest.width / 2; });

        // 移動先の座標を返す。
        return dest;
    }

    /**
     * ブロックを避けて右に移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @return {Object} 移動後の位置
     */
    static dodgeBlockRight(character, stagePosition, blockMap) {

        // 右方向に移動してブロックを回避する。
        const dest = Util._dodgeBlock(character,
                stagePosition,
                blockMap,
                function(dest, block) { dest.x = block.x + block.width / 2 + dest.width / 2; });

        // 移動先の座標を返す。
        return dest;
    }

    /**
     * ブロックを避けて移動する。
     * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
     * 衝突していない場合、画面外まで出る場合は移動前の位置を返す。
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @param {function} move - 移動する方法
     * @return {Object} 移動後の位置
     */
    static _dodgeBlock(character, stagePosition, blockMap, move) {

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
            var block = Util.checkCollidedBlock(dest, stagePosition, blockMap); 
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
     * @param {Object} character - キャラクター
     * @param {number} stagePosition - ステージ位置
     * @param {Array} blockMap - ブロックマップ
     * @param {boolean} canMoveOut - 画面外へ移動できるかどうか
     * @return {Object} 移動先座標
     */
    static pushCharacter(character, stagePosition, blockMap, canMoveOut) {

        // 各方向への回避した場合の移動先座標を求める。
        const left = Util.dodgeBlockLeft(character, stagePosition, blockMap);

        // 画面外への移動を許可する場合は常に左へ移動する。
        if (canMoveOut) {
            return left;
        }

        // 各方向への回避した場合の移動先座標を求める。
        const right = Util.dodgeBlockRight(character, stagePosition, blockMap);
        const up = Util.dodgeBlockUp(character, stagePosition, blockMap);
        const down = Util.dodgeBlockDown(character, stagePosition, blockMap);

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
                    movePos[i].x < __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.width &&
                    movePos[i].y >= 0 &&
                    movePos[i].y < __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.height) {

                // 範囲内の場合はそこへ移動する。
                return movePos[i];
            }
        }

        // どちらにも移動できない場合は移動前の位置を返す。
        return character;
    }

    /**
     * srcを始点、destを終点としたときの角度を求める。
     * @param {Object} src - 始点
     * @param {Object} dest - 終点
     * @return {number} 角度
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize_js__ = __webpack_require__(0);
/** @module collider */




/**
 * 当たり判定処理を行う。
 */
class Collider {

    /**
     * コンストラクタ、当たり判定の範囲を設定する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} width - 幅
     * @param {number} height - 高さ
     */
    constructor(x, y, width, height) {

        // メンバ変数に格納する。
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * 衝突しているキャラクターを検索する。
     * @param {Array} characters - キャラクター配列
     * @param {Array} types - 検索対象のキャラクター種別
     * @return {Array} 衝突しているキャラクター配列
     */
    getHitCharacter(characters, types) {

        let ret = [];

        // 各キャラクターとの当たり判定を処理する。
        for (let i = 0; i < characters.length; i++) {

            // 検索対象のキャラクター種別か調べる。
            if (types.indexOf(characters[i].type) >= 0) {

                // 接触しているかどうかを調べる。
                if (__WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].isHitCharacter(this, characters[i].hitArea)) {

                    // 見つかったキャラクターを戻り値に追加する。
                    ret.push(characters[i]);
                }
            }
        }

        return ret;
    }

    /**
     * Y軸方向に障害物を検索する。
     * @param {boolean} isUpside - 上向きに検索する場合true
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、
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
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、ステージ上端を返す。
     */
    getBlockYUpside(xpos, stagePosition, blockMap) {

        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this.y / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE), blockMap.length - 1);

        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE)

        // 下から上方向に検索する。
        for (let y = ybegin; y >= 0; y--) {

            if (blockMap[y][x]) {

                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };

                return ret;
            }
        }

        // 見つからなかった場合、ステージ上端を返す。
        const ret = {
            x: __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT / 2,
            y: 0,
            width: __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT,
            height: 0,
        };

        return ret;
    }

    /**
     * Y軸下方向に障害物を検索する。
     * @param {number} xpos - x座標
     * @param {number} stagePosition - ステージのスクロール位置
     * @param {Array} blockMap - 障害物マップ
     * @return {Object} 見つかった障害物、見つからなかった場合は、ステージ下端を返す。
     */
    getBlockYDownside(xpos, stagePosition, blockMap) {

        // 検索開始位置を自分の位置からとする。
        const ybegin = Math.min(Math.floor(this.y / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE), blockMap.length - 1);

        // x方向のインデックスを計算する。
        const x = Math.floor((xpos + stagePosition) / __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE)

        // 上から下方向に検索する。
        for (let y = ybegin; y < blockMap.length; y++) {

            if (blockMap[y][x]) {

                // ブロックの中心座標とサイズを戻り値とする。
                // 変数名や値はキャラクターに合わせる。
                const ret = {
                    x: x * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                    y: y * __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */].TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                    width: blockMap[y][x].width,
                    height: blockMap[y][x].height,
                };

                return ret;
            }
        }

        // 見つからなかった場合、ステージ下端を返す。
        const ret = {
            x: __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width / 2,
            y: __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height,
            width: __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width,
            height: 0,
        };

        return ret;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Collider);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module controllsize */

/**
 * コントロールサイズ
 * @type {object}
 */
const cs = {
    frameBack: {
        x: 0,
        y: 0,
        width: 16,
        height: 16,
    },
    frameLeftTop: {
        x: 16,
        y: 0,
        width: 4,
        height: 4,
    },
    frameTop: {
        x: 20,
        y: 0,
        width: 4,
        height: 4,
    },
    frameRightTop: {
        x: 24,
        y: 0,
        width: 4,
        height: 4,
    },
    frameLeft: {
        x: 16,
        y: 4,
        width: 4,
        height: 4,
    },
    frameRight: {
        x: 24,
        y: 4,
        width: 4,
        height: 4,
    },
    frameBottomLeft: {
        x: 16,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottom: {
        x: 20,
        y: 8,
        width: 4,
        height: 4,
    },
    frameBottomRight: {
        x: 24,
        y: 8,
        width: 4,
        height: 4,
    },
    life: {
        x: 0,
        y: 16,
        width: 8,
        height: 8,
    },
    chickenGaugeEmpty: {
        x: 0,
        y: 24,
        width: 128,
        height: 8,
    },
    chickenGaugeFull: {
        x: 0,
        y: 32,
        width: 128,
        height: 8,
    },
    shieldButtonOff: {
        x: 0,
        y: 48,
        width: 32,
        height: 32,
    },
    shieldButtonOn: {
        x: 32,
        y: 48,
        width: 32,
        height: 32,
    },
};

/**
 * control.png内のコントロールの位置とサイズを定義する。
 */
class ControlSize {

    /**
     * control.png内のコントロールの位置とサイズ
     * @type {object}
     */
    static get cs() {
        return cs;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (ControlSize);


/***/ }),
/* 5 */
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
     * @type {string}
     */
    static get COLORS() {
        return COLORS;
    }

    /**
     * 背景色
     * @type {string}
     */
    static get BACK_COLOR() {
        return BACK_COLOR;
    }

    /**
     * 前景色
     * @type {string}
     */
    static get FORE_COLOR() {
        return FORE_COLOR;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MyColor);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tilemapmanager_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dragonfly_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ant_js__ = __webpack_require__(12);
/** @module stage */






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
        this.mapManager = new __WEBPACK_IMPORTED_MODULE_1__tilemapmanager_js__["a" /* default */](mapName);
        
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
        const maxCol = Math.floor((-this.x + __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.width) / TILE_SIZE) + 2;

        // イベント実行する範囲を計算する。
        const execPos = this.executedCol * TILE_SIZE;
        const execWidth = (maxCol - this.executedCol) * TILE_SIZE;
        
        // イベント実行する範囲がある場合
        if (execWidth > 0) {

            // イベントレイヤーのオブジェクトを検索する。
            const objects = this.mapManager.getObjects('event', execPos, 0, execWidth, __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.height);

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
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__dragonfly_js__["a" /* default */](x, y, scene));
                break;
            case 'ant':
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_3__ant_js__["a" /* default */](x, y, scene));
                break;
            default:
                break;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Stage);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module pointdevice */

/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
class PointDevice {

    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     * @param {TouchEvent} event - イベント
     */
    static detectDeviceType(event) {
        PointDevice._isMouseUsed = !event.changedTouches;
	    document.removeEventListener('touchstart', PointDevice.detectDeviceType);
        document.removeEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /**
     * デバイスの種類を調べるため、タッチ開始、マウス移動の
     * イベントにチェック用関数を登録する。
     */
    static checkDeviceType() {
        PointDevice._isMouseUsed = false;
        document.addEventListener('touchstart', PointDevice.detectDeviceType);
        document.addEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /**
     * マウスが接続されているかどうか。
     * @type {boolean}
     */
    static get isMouseUsed() {
        return this._isMouseUsed;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PointDevice);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collider_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explosion_js__ = __webpack_require__(15);
/** @module enemy */





/**
 * 敵キャラクター。
 */
class Enemy {

    /**
     * コンストラクタ。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {string} type - 種別。
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, type, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay(type);

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new __WEBPACK_IMPORTED_MODULE_0__collider_js__["a" /* default */](x, y, __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].enemy[type].width, __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].enemy[type].height); 

        /**
         * HP
         * @type {number}
         */
        this.hp = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].enemy[type].hp;

        /**
         * 防御力
         * @type {number}
         */
        this.defense = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].enemy[type].defense;

        /**
         * スコア
         * @type {number}
         */
        this.score = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].enemy[type].score;
    }
    
    /**
     * 更新処理。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {
    }
    
    /**
     * 衝突処理。
     * 他のキャラクターと衝突したときの処理を行う。
     *
     * @param {object} character - 衝突したキャラクター
     * @param {PlayingScene} scene - シーン
     */
    hit(character, scene) {

        // 衝突したキャラクターが自機または自機弾の場合
        if (character.type === __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.PLAYER ||
            character.type === __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.PLAYER_SHOT) {

            // 相手の攻撃力と自分の防御力の差をダメージとしてHPから減らす。
            if (this.defense < character.power) {
                this.hp -= character.power - this.defense;
            }
        }
    }

    /**
     * 死亡処理。爆発アニメーションを発生させ、スコアを加算し、自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    death(scene) {

        // 爆発アニメーションを作成する。
        scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_2__explosion_js__["a" /* default */](this.hitArea.x, this.hitArea.y, scene));

        // スコアを加算する。
        scene.addScore(this.score);

        // 自分自身を削除する。
        scene.removeCharacter(this);
        this.sprite.remove();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__collider_js__ = __webpack_require__(3);
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
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} angle - 進行方向
     * @param {number} speed - スピード
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, angle, speed, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_8x8', 8, 8);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_8x8_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('enemy_shot');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY_SHOT;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new __WEBPACK_IMPORTED_MODULE_3__collider_js__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);

        /** 
         * x方向のスピード
         * @type {number}
         */
        this.speedX = Math.cos(angle) * speed;
        
        /** 
         * y方向のスピード。phina.jsの座標系は下方向が正なので逆向きにする。
         * @type {number}
         */
        this.speedY = Math.sin(angle) * speed * -1;

        /**
         * かすり時のゲージ増加率
         * @type {number}
         */
        this.grazeRate = GRAZE_RATE;
    }
    
    /**
     * スピードに応じて移動する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // スピードに応じて移動する。
        this.hitArea.x += this.speedX;
        this.hitArea.y += this.speedY;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // タイプが自機弾になっている場合、反射弾として敵との当たり判定を行う。
        if (this.type === __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.PLAYER_SHOT) {

            // 衝突している敵キャラクターを検索する。
            const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY]);

            // 衝突している敵キャラクターがいる場合。
            if (hitCharacters.length > 0) {

                // 敵キャラクターの衝突処理を実行する。
                hitCharacters[0].hit(this);

                // 敵キャラクターに接触した場合は自分自身は削除する。
                scene.removeCharacter(this);
                this.sprite.remove();

                // 敵キャラと衝突した場合は処理を終了する。
                return;
            }
        }

        // ブロックとの当たり判定処理を行う。
        if (__WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2 ||
            this.hitArea.x > __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.width + this.hitArea.width * 2 ||
            this.hitArea.y < -this.hitArea.height * 2 ||
            this.hitArea.y > __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.height + this.hitArea.height * 2) {

            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }
    }

    /**
     * 他のキャラクターと衝突したときの処理を行う。
     * @param {object} character - 衝突したキャラクター
     * @param {PlayingScene} scene - シーン
     */
    hit(character, scene) {

        // 自分自身を削除する。
        scene.removeCharacter(this);
        this.sprite.remove();
    }

    /**
     * かすり時のゲージ増加比率を返し、二重にかすらないようにメンバ変数の値を0にする。
     * @return {number} ゲージ増加比率
     */
    graze() {
        const ret = this.grazeRate;
        this.grazeRate = 0;
        return ret;
    }

    /**
     * 移動方向を180度反転させ、自機弾として扱うようにする。
     */
    reflect() {

        // キャラクタータイプを自機弾に変更する。
        this.type = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.PLAYER_SHOT;

        // 攻撃力を設定する。
        this.power = REFLECTION_POWER;

        // 進行方向を反転する。
        this.speedX *= -1;
        this.speedY *= -1;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (EnemyShot);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collider_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screensize_js__ = __webpack_require__(0);
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
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} isOption - 発射元がオプションかどうか
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, isOption, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_8x8', 8, 8);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_8x8_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('player_shot');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = __WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */].type.PLAYER_SHOT;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new __WEBPACK_IMPORTED_MODULE_2__collider_js__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);

        /**
         * 攻撃力
         * @type {number}
         */
        this.power = 0;

        // 攻撃力を設定する。
        if (isOption) {
            this.power = OPTION_POWER;
        }
        else {
            this.power = PLAYER_POWER;
        }
    }

    /**
     * 更新処理。
     * 右方向に直進する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 右へ移動する。
        this.hitArea.x += 5;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */].type.ENEMY]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            // 敵キャラクターの衝突処理を実行する。
            hitCharacters[0].hit(this);

            // 敵キャラクターに接触した場合は自分自身は削除する。
            scene.removeCharacter(this);
            this.sprite.remove();

            // 敵キャラと衝突した場合は処理を終了する。
            return;
        }
        
        // ブロックとの当たり判定処理を行う。
        if (__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x > __WEBPACK_IMPORTED_MODULE_3__screensize_js__["a" /* default */].STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            this.sprite.remove();
            return;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayerShot);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mycolor_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controlsize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stage_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__player_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__life_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__chickengauge_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shieldbutton_js__ = __webpack_require__(21);
/** @module playingscene */












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

/**
 * ゲームの各ステージをプレイするメインのシーン。
 */
class PlayingScene {

    /**
     * コンストラクタ。
     * 各種データの初期化と生成を行う。
     * @param {MainScene} phinaScene - phina.js上のシーンインスタンス
     */
    constructor(phinaScene) {

        // デバッグ用にシーンをグローバル変数に入れる。
        DebugObject.scene = this;

        /**
         * phina.jsのシーンインスタンス
         * @type {MainScene}
         */
        this.phinaScene = phinaScene;

        /**
         * ゲームパッドマネージャー。
         * @type {phina.input.GamepadManager}
         */
        this.gamepadManager = phina.input.GamepadManager();

        /**
         * ゲームパッド。
         * @type {phina.input.Gamepad}
         */
        this.gamepad = this.gamepadManager.get(0);

        /**
         * 背景レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this.backgroundLayer = DisplayElement().addChildTo(this.phinaScene);

        // 背景レイヤーの位置、サイズを設定する。
        this.backgroundLayer.setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO,
                                         __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.y * __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO);
        this.backgroundLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.backgroundLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;

        /**
         * キャラクターレイヤー。
         * @type {phina.display.DisplayElement}
         */
        this.characterLayer = DisplayElement().addChildTo(this.phinaScene);

        // キャラクターレイヤーの位置、サイズを設定する。
        this.characterLayer.setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO,
                                        __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.y * __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO);
        this.characterLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.characterLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;

        /**
         * 枠レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this.frameLayer = DisplayElement().addChildTo(this.phinaScene);

        // 枠レイヤーの位置、サイズを設定する。
        this.frameLayer.scaleX = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.frameLayer.scaleY = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;

        /**
         * 情報レイヤー。
         * @type {phina.display.DisplayElement}
         */
        this.infoLayer = DisplayElement().addChildTo(this.phinaScene);

        // ステージの外枠を作成する。
        this._createFrame();

        /**
         * ステージ
         * @type {Stage}
         */
        this.stage = new __WEBPACK_IMPORTED_MODULE_5__stage_js__["a" /* default */]('stage1', this.backgroundLayer);

        /**
         * スコアラベルの背景部分。
         * @type {phina.display.RectangleShape}
         */
        this.scoreLabelBase = RectangleShape({
            height: 22,
            width: 148,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor_js__["a" /* default */].BACK_COLOR,
            strokeWidth: 0,
            x: Math.round(this.phinaScene.gridX.center()),
            y: SCORE_POS_Y,
        }).addChildTo(this.infoLayer);

        /**
         * スコアラベル。
         * @type {phina.display.Label}
         */
        this.scoreLabel = Label({
            text: 'SCORE: 000000',
            fontSize: 20,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor_js__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        }).addChildTo(this.scoreLabelBase);

        /**
         * スコア。
         * @type {number}
         */
        this.score = 0;

        /**
         * 残機表示
         * @type {Life}
         */
        this.lifeLabel = new __WEBPACK_IMPORTED_MODULE_7__life_js__["a" /* default */]();

        // 残機表示の位置を設定する。
        this.lifeLabel.getSprite().addChildTo(this.infoLayer);
        this.lifeLabel.getSprite().x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO + LIFE_POS_X;
        this.lifeLabel.getSprite().y = LIFE_POS_Y;

        // 残機を初期化する。
        this._setLife(INITIAL_LIFE);

        /**
         * シールドボタン。
         * @type {ShieldButton}
         */
        this.shieldButton = new __WEBPACK_IMPORTED_MODULE_9__shieldbutton_js__["a" /* default */]();

        // シールドボタンの位置を設定する。
        this.shieldButton.getSprite().addChildTo(this.infoLayer);
        this.shieldButton.getSprite().x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_WIDTH - SHIELD_BUTTON_POS_X; 
        this.shieldButton.getSprite().y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y; 

        /**
         * チキンゲージ。
         * @type {ChickenGauge}
         */
        this.chickenGauge = new __WEBPACK_IMPORTED_MODULE_8__chickengauge_js__["a" /* default */]();

        // チキンゲージの位置を設定する。
        this.chickenGauge.getSprite().addChildTo(this.infoLayer);
        this.chickenGauge.getSprite().x = Math.round(this.phinaScene.gridX.center());
        this.chickenGauge.getSprite().y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;

        /**
         * 復活待機フレーム数。
         * @type {number}
         */
        this.rebirthWait = 0;

        /**
         * キャラクター管理配列。
         * @type {Array}
         */
        this.characters = [];

        /**
         * 自機
         * @type {Player}
         */
        this.player = new __WEBPACK_IMPORTED_MODULE_6__player_js__["a" /* default */](Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width / 4),
                                 Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height / 2),
                                 this);

        /**
         * タッチ情報。
         * @type {Object}
         */
        this.touch = {id: -1, x:0, y:0};

        // BGMの音量を設定する。
        SoundManager.setVolumeMusic(0.2);

        // BGMを再生する。
        SoundManager.playMusic('stage1');
    }

    /**
     * 更新処理。
     * キー入力処理を行う。
     * ステージ、キャラクターの更新処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    update(app) {

        // ボタン入力状態を初期化する。
        this.inputShieldButton = false;

        // キーボード入力を行う。
        this._inputKeyboard(app);

        // タッチ入力を行う。
        this._inputTouch(app);

        // ゲームパッド入力を行う。
        this._inputGamepad();

        // シールドボタン入力状態に応じて自機の状態を変化させる。
        if (this.inputShieldButton) {
            this.player.setShield(true);
        }
        else {
            this.player.setShield(false);
        }

        // ステージの状態を更新する。
        this.stage.update(this);

        // プレイヤーの状態を更新する。
        this.player.update(this);

        // 各キャラクターの状態を更新する。
        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].update(this);
        }

        // 自機復活処理を行う。
        this._rebirthPlayer();

        // チキンゲージ表示を更新する。
        this.chickenGauge.setRate(this.player.getChickenGauge());

        // スコア表示を更新する。
        this.scoreLabel.text = 'SCORE: ' + ('000000' + this.score).slice(-6);
    }

    /**
     * キャラクターを追加する。
     * @param {Object} character - 追加するキャラクター
     */
    addCharacter(character) {
        this.characters.push(character);
    }

    /**
     * キャラクターのスプライトを追加する。
     * @param {phina.display.DisplayElement} sprite - 追加するスプライト
     */
    addCharacterSprite(sprite) {
        sprite.addChildTo(this.characterLayer);
    }

    /**
     * キャラクターを削除する。
     * @param {Object} character - 追加するキャラクター
     */
    removeCharacter(character) {
        const i = this.characters.indexOf(character);
        if (i >= 0) {
            this.characters.splice(i, 1);
        }
    }

    /**
     * スコアを追加する。
     * @param {number} score - 追加するスコア
     */
    addScore(score) {
        this.score += score;
    }

    /**
     * ブロックマップを取得する。
     * @return {Array} ブロックマップ
     */
    getBlockMap() {
        return this.stage.mapManager.objectMap.collision;
    }

    /**
     * ステージが左方向に何ドット移動しているかを取得する。
     * @return {number} ステージ位置
     */
    getStagePosition() {
        return -this.stage.x;
    }

    /**
     * ステージのスクロールスピード
     * @type {number}
     */
    get scrollSpeed() {
        return this.stage.speed;
    }

    /**
     * 自機の位置
     * @type {Object}
     */
    get playerPosition() {
        return {
            x: this.player.hitArea.x,
            y: this.player.hitArea.y,
        };
    }

    /**
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss() {

        // 残機が残っている場合
        if (this.life > 0) {

            // 残機を一つ減らす。
            this._setLife(this.life - 1);

            // 復活待機フレーム数を設定する。
            // この時間が経過したときに自機を復活する。
            this.rebirthWait = REBIRTH_WAIT;

            // 敵弾を削除する。
            this._removeEnemyShot();
        }
        // 残機が残っていない場合
        else {
        }
    }

    /**
     * 敵弾が無効化されているかどうかを取得する。
     * 自機が死亡して復活するまでの間は敵弾は発生させない。
     * @return {boolean} 敵弾が無効化されているかどうか
     */
    isDisableEnemyShot() {

        // 復活待機フレームが設定されている場合は敵弾は無効とする。
        if (this.rebirthWait > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * キーボードの入力処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    _inputKeyboard(app) {

        // キーボードを取得する。
        const key = app.keyboard;

        // カーソルキーの入力によって自機を移動する。
        if (key.getKey('left')) {
            this.player.moveKeyLeft(this);
        }
        if (key.getKey('right')) {
            this.player.moveKeyRight(this);
        }
        if (key.getKey('up')) {
            this.player.moveKeyUp(this);
        }
        if (key.getKey('down')) {
            this.player.moveKeyDown(this);
        }

        // zキーでシールドを使用する。
        if (key.getKey('z')) {
            this.inputShieldButton = true;
        }
    }

    /**
     * タッチの入力処理を行う。
     * @param {phina.game.GameApp} app - アプリケーション
     */
    _inputTouch(app) {

        const touches = app.pointers;
        let sliding = false;

        for (let i = 0; i < touches.length; i++) {

            // マウスが接続されていない場合はスライドの処理を行う。
            if (!__WEBPACK_IMPORTED_MODULE_0__pointdevice_js__["a" /* default */].isMouseUsed) {

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
                    this.player.moveTouch(touches[i].x - this.touch.x, touches[i].y - this.touch.y, this);
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

        // シールドボタンがタッチされている場合はシールドを使用する。
        if (this.shieldButton.isTouch()) {
            this.inputShieldButton = true;
        }
    }

    /**
     * ゲームパッドの入力処理を行う。
     */
    _inputGamepad() {

        // ゲームパッドの状態を更新する。
        this.gamepadManager.update();

        // ゲームパッドを取得する。
        const gamepad = this.gamepadManager.get();

        // アナログスティックの入力を取得する。
        const stick = this.gamepad.getStickDirection(0);

        if (stick.length() > 0.5) {
            this.player.moveGamepad(stick.x, stick.y, this);
        }

        // Aボタンでシールドを使用する。
        if (gamepad.getKey('a')) {
            this.inputShieldButton = true;
        }
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
            let width = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width) / 2);
            let height = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;

            // 右端揃えにするため、ブロックのはみ出している分だけ左にずらす
            if (width % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width > 0) {
                x -= __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width - width % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width;
                width += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width - width % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width;
            }

            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height > 0) {
                y -= __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height;
                height += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height;
            }

            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height) {
                    const back = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.addChildTo(this.frameLayer);
                }
            }
        }

        {
            // 右側の枠の座標を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width;
            let y = 0;
            const width = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width) / 2);
            let height = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO;

            // ステージの下端に揃えるため、ブロックのはみ出している分だけ上にずらす
            if (__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height > 0) {
                y -= __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height;
                height += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height % __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height;
            }

            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height) {
                    const back = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.addChildTo(this.frameLayer);
                }
            }
        }

        {
            // 下側の枠の座標を計算する。
            const x = Math.ceil((__WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_WIDTH / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width) / 2);
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;
            const width = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].SCREEN_HEIGHT / __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].ZOOM_RATIO - __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;

            // 背景を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width) {
                for (let j = 0; j < height; j += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height) {
                    const back = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBack.height);
                    back.setOrigin(0, 0);
                    back.setPosition(x + i, y + j);
                    back.addChildTo(this.frameLayer);
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
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x - __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;

            // 枠を並べる。
            for (let i = 0; i < height; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.height) {
                const bar = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameLeft.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this.frameLayer);
            }
        }

        {
            // 右側の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width;
            const height = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;

            // 枠を並べる。
            for (let i = 0; i < height; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.height) {
                const bar = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameRight.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x, i);
                bar.addChildTo(this.frameLayer);
            }
        }

        {
            // 下側の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;
            const width = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width;

            // 枠を並べる。
            for (let i = 0; i < width; i += __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.width) {
                const bar = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.height);
                bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.x, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.y, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottom.height);
                bar.setOrigin(0, 0);
                bar.setPosition(x + i, y);
                bar.addChildTo(this.frameLayer);
            }
        }

        {
            // 左下の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x - __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.width;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;

            // 枠を並べる。
            const bar = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.height);
            bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.x,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.y,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.width,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomLeft.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this.frameLayer);
        }

        {
            // 右下の枠の位置を計算する。
            const x = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.x + __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.width;
            const y = __WEBPACK_IMPORTED_MODULE_2__screensize_js__["a" /* default */].STAGE_RECT.height;

            // 枠を並べる。
            const bar = Sprite('control', __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.width, __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.height);
            bar.srcRect.set(__WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.x,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.y,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.width,
                __WEBPACK_IMPORTED_MODULE_3__controlsize_js__["a" /* default */].cs.frameBottomRight.height);
            bar.setOrigin(0, 0);
            bar.setPosition(x, y);
            bar.addChildTo(this.frameLayer);
        }
    }

    /**
     * 残機を変更し、残機ラベルを更新する。
     * @param {number} life - 残機
     */
    _setLife(life) {
        this.life = life;
        this.lifeLabel.setLife(this.life);
    }

    /**
     * 自機復活処理。
     * 復活待機フレーム数をカウントし、
     * 待機フレーム数を経過したタイミングで自機を復活する。
     */
    _rebirthPlayer() {

        // 復活待機フレーム数が設定されている場合はフレーム数をカウントする
        if (this.rebirthWait > 0) {
        
            this.rebirthWait--;
        
            // 復活までのフレーム数が経過している場合は自機を復活する
            if (this.rebirthWait <= 0) {

                // 自機を復活させる
                this.player.rebirth(this);
            }
        }
    }

    /**
     * 敵弾をすべて削除する。
     */
    _removeEnemyShot() {

        // キャラクターの中から敵弾を検索し、削除する。
        // 配列から要素を削除するとインデックスがずれるので後ろからループする。
        for (let i = this.characters.length - 1; i >= 0; i--) {
            if (this.characters[i].type == __WEBPACK_IMPORTED_MODULE_4__character_js__["a" /* default */].type.ENEMY_SHOT) {
                this.characters[i].sprite.remove();
                this.characters.splice(i, 1);
            }
        }

    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayingScene);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy_js__ = __webpack_require__(8);
/** @module ant */





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
    LEFT_MOVE: 1,   // 左移動
    RIGHT_MOVE: 2,  // 右移動
    FIRE: 3,        // 弾発射
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
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ant', scene);

        /**
         * 弾発射間隔
         * @type {number}
         */
        this.shotInterval = 0;

        /**
         * 状態。左移動、弾発射、右移動と遷移する。
         * @type {number}
         */
        this.state = STATE.LEFT_MOVE;

        /**
         * 状態変化間隔。
         * @type {number}
         */
        this.stateChangeInterval = 0;

        /**
         * 逆さまかどうか。
         * @type {boolean}
         */
        this.isUpsideDown = this.checkUpsideDown(scene);

        // 逆さまな場合は画像の上下を反転する。
        if (this.isUpsideDown) {
            this.sprite.scaleY = -1;
        }
    }
    
    /**
     * 更新処理。
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
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // スクロールに合わせて移動する。
        this.hitArea.x -= scene.scrollSpeed;

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {

            this.death(scene);

            return;
        }

        // 状態によって処理を分岐する
        switch (this.state) {
            case STATE.LEFT_MOVE:   // 左移動

                // 左へ移動する。
                this.hitArea.x -= MOVE_SPEED;

                // 左右反転はなしにする。
                this.sprite.scaleX = 1;

                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this.stateChangeInterval++;
                if (this.stateChangeInterval >= MOVE_FRAME) {

                    // 弾発射に遷移する。
                    this.state = STATE.FIRE;

                    // 次の状態遷移への間隔を初期化する。
                    this.stateChangeInterval = 0;
                    
                    // 弾発射間隔を初期化する。
                    this.shotInterval = 0;
                }

                break;

            case STATE.RIGHT_MOVE:  // 右移動

                // 右へ移動する。
                this.hitArea.x += MOVE_SPEED;

                // 左右反転はありにする。
                this.sprite.scaleX = -1;

                // 状態遷移間隔が経過したら弾発射状態に遷移する。
                this.stateChangeInterval++;
                if (this.stateChangeInterval >= MOVE_FRAME) {

                    // 弾発射に遷移する。
                    this.state = STATE.FIRE;

                    // 次の状態遷移への間隔を初期化する。
                    this.stateChangeInterval = 0;
                    
                    // 弾発射間隔を初期化する。
                    this.shotInterval = 0;
                }

                break;

            case STATE.FIRE:        // 弾発射

                // 自分より右側に自機がいれば左右反転する。
                if (this.hitArea.x < scene.playerPosition.x) {
                    this.sprite.scaleX = -1;
                }
                else {
                    this.sprite.scaleX = 1;
                }

                // 状態遷移間隔が経過したら右移動状態に遷移する。
                this.stateChangeInterval++;
                if (this.stateChangeInterval >= SHOT_FRAME ) {

                    // 右移動に遷移する。
                    this.state = STATE.RIGHT_MOVE;

                    // 次の状態遷移への間隔を初期化する。
                    this.stateChangeInterval = 0;
                }

                // 弾発射間隔が経過したら弾を発射する。
                this.shotInterval++;
                if (this.shotInterval >= SHOT_INTERVAL) {

                    // 敵弾が無効化されていない場合は敵弾を生成する。
                    if (!scene.isDisableEnemyShot()) {

                        // 自機へ向けて弾を発射する。
                        scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_1__enemyshot_js__["a" /* default */](this.hitArea.x,
                                                         this.hitArea.y,
                                                         __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].calcAngle(this.hitArea, scene.playerPosition),
                                                         SHOT_SPEED,
                                                         scene));
                    }
                    this.shotInterval = 0;
                }

                break;

            default:
                break;
        }

        // 障害物との衝突判定を行う。
        this.checkBlockHit(scene);

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    }

    /**
     * 逆さま判定。上下の障害物の距離を調べ、上の障害物の方が近い場合は上下反転しているものとする。
     * @param {PlayingScene} scene - シーン
     * @return {boolean} 逆さまかどうか
     */
    checkUpsideDown(scene) {

        // 上方向の障害物を検索する。
        const upsideBlock = this.hitArea.getBlockY(true, this.hitArea.x, scene.getStagePosition(), scene.getBlockMap());

        // 下方向の障害物を検索する。
        const downsideBlock = this.hitArea.getBlockY(false, this.hitArea.x, scene.getStagePosition(), scene.getBlockMap());

        // 上方向の障害物の方が近い場合は逆さまと判断する。
        if (this.hitArea.y - (upsideBlock.y + upsideBlock.height / 2) < (downsideBlock.y - downsideBlock.height / 2) - this.hitArea.y) {

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
     * @param {PlayingScene} scene - シーン
     */
    checkBlockHit(scene) {

        // 移動可能な段差
        const MOVABLE_STEP = 8;

        // 左側の足元の障害物を検索する。
        const leftBlock = this.hitArea.getBlockY(this.isUpsideDown,
                                                 this.hitArea.x - this.hitArea.width / 2,
                                                 scene.getStagePosition(),
                                                 scene.getBlockMap());

        // 右側の足元の障害物を検索する。
        const rightBlock = this.hitArea.getBlockY(this.isUpsideDown,
                                                  this.hitArea.x + this.hitArea.width / 2,
                                                  scene.getStagePosition(),
                                                  scene.getBlockMap());

        // 逆さまの場合は障害物の上端の値を使用し、通常の場合は下端の値を使用する。
        let leftBlockPos = 0;
        let rightBlockPos = 0;
        if (this.isUpsideDown) {
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
            if (this.state === STATE.LEFT_MOVE) {
                this.hitArea.x = rightBlock.x - rightBlock.width / 2 + this.hitArea.width / 2;

                if (this.isUpsideDown) {
                    this.hitArea.y = rightBlock.y + rightBlock.width / 2 + this.hitArea.height / 2;
                }
                else {
                    this.hitArea.y = rightBlock.y - rightBlock.width / 2 - this.hitArea.height / 2;
                }
            }
            else {
                this.hitArea.x = leftBlock.x - leftBlock.width / 2 + this.hitArea.width / 2;

                if (this.isUpsideDown) {
                    this.hitArea.y = leftBlock.y + leftBlock.width / 2 + this.hitArea.height / 2;
                }
                else {
                    this.hitArea.y = leftBlock.y - leftBlock.width / 2 - this.hitArea.height / 2;
                }
            }
        }
        else {

            // 逆さまの場合は下の方に合わせる。
            if (this.isUpsideDown) {

                this.hitArea.y = Math.max(leftBlockPos, rightBlockPos) + this.hitArea.height / 2;

            }
            // 通常の場合は上の方に合わせる。
            else {

                this.hitArea.y = Math.min(leftBlockPos, rightBlockPos) - this.hitArea.height / 2;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Ant);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize_js__ = __webpack_require__(4);
/** @module chickengauge */




/**
 * チキンゲージの画像を表示する。
 */
class ChickenGauge {

    /**
     * コンストラクタ、画像の読み込みを行う。
     */
    constructor() {

        // ベース部分を作成する。
        this.base = DisplayElement();

        // 空ゲージの画像を読み込む。
        this.emptyImage = Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.height);
        this.emptyImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.x,
                                    __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.y,
                                    __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.width,
                                    __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeEmpty.height);
        this.emptyImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.emptyImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.emptyImage.addChildTo(this.base);

        // 満ゲージの画像を読み込む。
        this.fullImage = Sprite('control', __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.width, __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.height);
        this.fullImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.x,
                                   __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.y,
                                   __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.width,
                                   __WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.height);
        this.fullImage.scaleX = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.fullImage.scaleY = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.fullImage.addChildTo(this.base);

        // 左端を基準にゲージを増減させるため、原点位置を左端に変更する。
        this.fullImage.setOrigin(0, 0.5);
        this.fullImage.x = -__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.width;

        // ゲージの初期値は0とする。
        this.fullImage.width = 0;
        this.fullImage.srcRect.width = 0;
    }

    /**
     * ゲージのたまっている比率に応じたスプライトを取得する。
     * @return {phina.display.DisplayElement} スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * ゲージが溜まっている比率を設定する。
     * @param {number} rate - ゲージが溜まっている比率(0～1)
     */
    setRate(rate) {

        // 画像の幅を指定された比率に設定する。
        this.fullImage.width = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.width * rate);
        this.fullImage.srcRect.width = Math.round(__WEBPACK_IMPORTED_MODULE_1__controlsize_js__["a" /* default */].cs.chickenGaugeFull.width * rate);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ChickenGauge);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemyshot_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(8);
/** @module dragonfly */




// 移動スピード
const MOVE_SPEED = -0.5;
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
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

        // 親クラスのコンストラクタを実行する。
        super(x, y, 'dragonfly', scene);

        /**
         * 弾発射間隔
         * @type {number}
         */
        this.shotInterval = 0;
    }
    
    /**
     * 更新処理。
     * 左方向に直進する。
     * 左方向に直進する弾を発射する。
     * 画面外に出ると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 左へ移動する。
        this.hitArea.x += MOVE_SPEED;

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));

        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        if (this.hp <= 0) {

            this.death(scene);

            return;
        }

        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= SHOT_INTERVAL) {
            // 敵弾が無効化されていない場合は敵弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_0__enemyshot_js__["a" /* default */](this.hitArea.x, this.hitArea.y, Math.PI, SHOT_SPEED, scene));
            }
            this.shotInterval = 0;
        }

        // 画面外に出た場合は自分自身を削除する。
        if (this.hitArea.x < -this.hitArea.width * 2) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Dragonfly);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module explosion */

/**
 * 爆発アニメーションを行う。
 */
class Explosion {

    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 爆発音を再生する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('explosion');

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(x), Math.floor(y));

        // 爆発音を再生する。
        SoundManager.play('bomb_min');
    }
    
    /**
     * アニメーションが終了すると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mycolor_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controlsize_js__ = __webpack_require__(4);
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

        /**
         * ベース部分
         * @type {phina.display.RectangleShape}
         */
        this.base = RectangleShape({
            height: 22,
            width: 52,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor_js__["a" /* default */].BACK_COLOR,
            strokeWidth: 0,
        });

        /**
         * 画像
         * @type {phina.display.Sprite}
         */
        this.image = Sprite('control', __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.width, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.height);

        // 画像のサイズと位置を設定する。
        this.image.srcRect.set(__WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.x, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.y, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.width, __WEBPACK_IMPORTED_MODULE_2__controlsize_js__["a" /* default */].cs.life.height);
        this.image.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.image.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.image.x = IMAGE_POS_X;
        this.image.addChildTo(this.base);

        /**
         * ラベル
         * @type {phina.display.Label}
         */
        this.label = Label({
            text: ':00',
            fontSize: 20,
            fill: __WEBPACK_IMPORTED_MODULE_0__mycolor_js__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
        });
        this.label.x = LABEL_POS_X;
        this.label.addChildTo(this.base);

        /**
         * 残機
         * @type {number}
         */
        this.life = 0;
    }

    /**
     * 残機画像、ラベルを合わせたスプライトを取得する。
     * @return {phina.display.RectangleShape} スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * 残機を設定し、ラベルの文字列を変更する。
     * @param {number} life - 残機
     */
    setLife(life) {

        // 残機を変更する。
        this.life = life;

        // 最大値を超えている場合は最大値に補正する。
        if (this.life > MAX_LIFE) {
            this.life = MAX_LIFE;
        }

        // ラベルの表示文字列を変更する。
        this.label.text = ':' + ('00' + this.life).slice(-2);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Life);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mycolor_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playingscene_js__ = __webpack_require__(11);
window.DebugObject = {};






// マウスが接続されているかどうかを調べる。
__WEBPACK_IMPORTED_MODULE_0__pointdevice_js__["a" /* default */].checkDeviceType();

// phina.js をグローバル領域に展開
phina.globalize();

/**
 * アセット
 * @type {object}
 */
const ASSETS = {
    image: {
        'back': './images/back.png',
        'control': './images/control.png',
        'image_8x8': './images/image_8x8.png',
        'image_16x16': './images/image_16x16.png',
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'bomb_min': './sound/bomb_min.mp3',
        'miss': './sound/miss.mp3',
    },
    font: {
        'noto': './fonts/NotoSansCJKjp-Regular-min.ttf',
    },
};

/**
 * メインシーン。
 * @class MainScene
 * @extend phina.display.DisplayScene
 */
phina.define('MainScene', {
    superClass: 'DisplayScene',

    /**
     * コンストラクタ。
     * @function init
     * @member MainScene#init
     */
    init: function() {
        this.superInit({
            width: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].SCREEN_WIDTH,
            height: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].SCREEN_HEIGHT,
        });

        // Canvasのスムージングを無効化する。
        this.canvas.imageSmoothingEnabled = false;

        // 背景色を指定する。
        this.backgroundColor = __WEBPACK_IMPORTED_MODULE_2__mycolor_js__["a" /* default */].BACK_COLOR;

        /**
         * 実行中のシーン
         * @type {object}
         * @member MainScene#scene
         */
        this.scene = new __WEBPACK_IMPORTED_MODULE_3__playingscene_js__["a" /* default */](this);
    },

    /**
     * 更新処理。内部のシーン処理の更新処理を実行する。
     * @function update
     * @param {phina.game.GameApp} app - アプリケーション
     * @member MainScene#update
     */
    update: function(app) {
        this.scene.update(app);
    }
});

// メイン処理
phina.main(function() {

    // 画面サイズの補正の有効無効を切り替える。
    let isFit = true;
    if (localStorage.disableFit === 'true') {
        isFit = false;
    }

    // アプリケーションを生成する。
    let app = GameApp({
        width: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].SCREEN_WIDTH,
        height: __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].SCREEN_HEIGHT,
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
        const s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // アプリケーションを実行する。
    app.run();
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__collider_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playershot_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__playerdeatheffect_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__playeroption_js__ = __webpack_require__(20);
/** @module player */









// キーボード入力による移動スピード
const SPEED_BY_KEY = 2;
// タッチ操作による移動スピード
const SPEED_BY_TOUCH = 1.8 / __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].ZOOM_RATIO;
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
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('player_normal');

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.PLAYER;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new __WEBPACK_IMPORTED_MODULE_3__collider_js__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);

        /**
         * かすり当たり判定
         * @type {Collider}
         */
        this.grazeArea = new __WEBPACK_IMPORTED_MODULE_3__collider_js__["a" /* default */](x, y, GRAZE_WIDTH, GRAZE_HEIGHT);

        /**
         * 弾発射間隔
         * @type {number}
         */
        this.shotInterval = 0;

        /**
         * 状態
         * @type {number}
         */
        this.status = STATUS.NORMAL;

        /**
         * 衝突したときの攻撃力
         * @type {number}
         */
        this.power = 1;

        /**
         * 無敵状態フレーム数
         * @tyep {number}
         */
        this.invincibleFrame = 0;

        /**
         * チキンゲージ
         * @type {number}
         */
        this.chickenGauge = 0;

        /**
         * オプション
         * @type {PlayerOption}
         */
        this.option = null;

        /**
         * シールド使用不使用
         * @type {boolean}
         */
        this.shield = false;

        /**
         * デバッグ用フラグ。死亡しないようにする。
         * @type {boolean}
         */
        this.noDeath = false;

        /**
         * デバッグ用フラグ。自機弾を発射しないようにする。
         * @type {boolean}
         */
        this.noShot = false;

        // デバッグ用: 死亡しないようにする。
        if (localStorage.noDeath === 'true') {
            this.noDeath = true;
        }

        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this.noShot = true;
        }
    }

    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * ブロックやキャラクターとの当たり判定処理を行う。
     * 自機弾を発射する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // ブロックと衝突している場合
        if (__WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {

            // ブロックによって押されて移動する。
            const dest = __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].pushCharacter(this.hitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this.hitArea.x = dest.x;
            this.hitArea.y = dest.y;
        }

        // 無敵状態の場合
        if (this.status === STATUS.INVINCIBLE) {

            // 無敵状態フレーム数をカウントする。
            this.invincibleFrame--;

            // 無敵状態フレーム数を経過した場合
            if (this.invincibleFrame <= 0) {

                // ステータスを通常状態に戻す。
                this.status = STATUS.NORMAL;

                // 点滅アニメーションを停止する。
                this.sprite.tweener.clear();

                // アニメーションが非表示で終了している可能性があるので、
                // 表示状態にする。
                this.sprite.alpha = 1;
            }
        } 

        // 通常状態、無敵状態の場合
        if (this.status === STATUS.NORMAL || this.status === STATUS.INVINCIBLE) {

            // 自機弾発射間隔が経過した場合は自機弾を発射する。
            this.shotInterval++;
            if (this.shotInterval >= SHOT_INTERVAL && !this.noShot) {
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_4__playershot_js__["a" /* default */](this.hitArea.x, this.hitArea.y, false, scene));
                this.shotInterval = 0;
            }

            // 敵弾とのかすり判定を行う。
            this._checkGraze(scene);

            // シールド使用時はチキンゲージを消費する。
            if (this.shield) {
                this.chickenGauge -= CONSUMPTION_GAUGE;
                if (this.chickenGauge < 0) {
                    this.chickenGauge = 0;
                }
            }
        }

        // 通常状態の場合
        if (this.status === STATUS.NORMAL) {

            // 敵キャラとの当たり判定処理を行う。
            this._checkHitChacater(scene);
        }

        // オプション個数を更新する。
        this._updateOptionCount(scene);

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));
    }

    /**
     * キーボードの左キー入力による移動処理を行う。
     * @param {PlayingScene} scene - シーン
     */
    moveKeyLeft(scene) {
        this._move(this.hitArea.x - SPEED_BY_KEY,
                   this.hitArea.y,
                   scene);
    }

    /**
     * キーボードの右キー入力による移動処理を行う。
     * @param {PlayingScene} scene - シーン
     */
    moveKeyRight(scene) {
        this._move(this.hitArea.x + SPEED_BY_KEY,
                   this.hitArea.y,
                   scene);
    }

    /**
     * キーボードの上キー入力による移動処理を行う。
     * @param {PlayingScene} scene - シーン
     */
    moveKeyUp(scene) {
        this._move(this.hitArea.x,
                   this.hitArea.y - SPEED_BY_KEY,
                   scene);
    }

    /**
     * キーボードの下キー入力による移動処理を行う。
     * @param {PlayingScene} scene - シーン
     */
    moveKeyDown(scene) {
        this._move(this.hitArea.x,
                   this.hitArea.y + SPEED_BY_KEY,
                   scene);
    }

    /**
     * タッチ入力による移動処理を行う。
     * @param {number} x - x座標方向のタッチ位置スライド量
     * @param {number} y - y座標方向のタッチ位置スライド量
     * @param {PlayingScene} scene - シーン
     */
    moveTouch(x, y, scene) {
        this._move(this.hitArea.x + x * SPEED_BY_TOUCH,
                   this.hitArea.y + y * SPEED_BY_TOUCH,
                   scene);
    }

    /**
     * ゲームパッド入力による移動処理を行う。
     * @param {number} x - x座標方向のスティック入力値
     * @param {number} y - y座標方向のスティック入力値
     * @param {PlayingScene} scene - シーン
     */
    moveGamepad(x, y, scene) {
        this._move(this.hitArea.x + x * SPEED_BY_GAMEPAD,
                   this.hitArea.y + y * SPEED_BY_GAMEPAD,
                   scene);
    }

    /**
     * 死亡後の復活処理を行う。
     * 一定時間無敵状態とし、画像を点滅表示する。
     * @param {PlayingScene} scene - シーン
     */
    rebirth(scene) {

        // ステータスを無敵状態にする。
        this.status = STATUS.INVINCIBLE;

        // チキンゲージを初期化する。
        this.chickenGauge = 0;

        // 無敵状態フレーム数を設定する。
        this.invincibleFrame = INVINCIBLE_FRAME;

        // 画像を表示する。
        this.sprite.alpha = 1;

        // 点滅アニメーションを実行する。
        // 100ms周期で表示、非表示を切り替える。
        this.sprite.tweener
            .wait(100)
            .set({ alpha: 0 })
            .wait(100)
            .set({ alpha: 1 })
            .setLoop(true)
            .play();
    }

    /**
     * チキンゲージの溜まっている比率を0～1の範囲で取得する。
     * @return {number} チキンゲージ
     */
    getChickenGauge() {
        return this.chickenGauge;
    }

    /**
     * シールド使用不使用を設定する。
     * オプションがあればオプションの設定も変更する。
     * @param {boolean} shield - シールド使用不使用
     */
    setShield(shield) {

        // シールド使用不使用を設定する。
        this.shield = shield;

        // オプションがある場合はオプションのシールド使用不使用を設定する。
        if (this.option !== null) {
            this.option.setShield(shield);
        }
    }

    /**
     * 座標を変更し、各種当たり判定処理を行う。
     * @param {number} x - 移動後のx座標
     * @param {number} y - 移動後のy座標
     * @param {PlayingScene} scene - シーン
     */
    _move(x, y, scene) {

        // 前回値を保存する。
        const prevX = this.hitArea.x;
        const prevY = this.hitArea.y;

        // 死亡中でない場合のみ移動を行う。
        if (this.status != STATUS.DEATH) {
            // 現在の座標を変更する。
            this.hitArea.x = x;
            this.hitArea.y = y;
        }

        // 衝突しているブロックがないか調べる。
        let block = __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap());

        // 衝突しているブロックがある場合は移動する。
        while (block != null) {

            // 移動位置を計算する。
            const newPosition = __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].moveByBlock(this.hitArea, prevX, prevY, block, scene.getStagePosition(), scene.getBlockMap());

            // 移動できない場合はループを抜ける。
            if (this.hitArea.x == newPosition.x && this.hitArea.y == newPosition.y) {
                break;
            }
            
            // 移動後の座標を反映する。
            this.hitArea.x = newPosition.x;
            this.hitArea.y = newPosition.y;

            // 移動後に再度衝突していないかチェックする。
            block = __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].checkCollidedBlock(this.hitArea, scene.getStagePosition(), scene.getBlockMap());
        }

        // 画面外に出ていないかチェックする。
        this._checkScreenArea();

        // オプションがある場合はオプションを移動前の座標へ移動する。
        if (this.option !== null) {
            this.option.move(prevX, prevY);
        }
    }

    /**
     * 画面外に出ていないかチェックする。
     * 画面外に出ていた場合は画面内に座標を補正する。
     */
    _checkScreenArea() {

        // 左側画面範囲外には移動させないようにする。
        if (this.hitArea.x < 0) {
            this.hitArea.x = 0;
        }

        // 右側画面範囲外には移動させないようにする。
        if (this.hitArea.x > __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.width - 1) {
            this.hitArea.x = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.width - 1;
        }

        // 上側画面範囲外には移動させないようにする。
        if (this.hitArea.y < 0) {
            this.hitArea.y = 0;
        }

        // 下側画面範囲外には移動させないようにする。
        if (this.hitArea.y > __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.height - 1) {
            this.hitArea.y = __WEBPACK_IMPORTED_MODULE_0__screensize_js__["a" /* default */].STAGE_RECT.height - 1;
        }
    }

    /**
     * 他のキャラクターとの当たり判定を処理する。
     * @param [in/out] scene シーン
     * @param {PlayingScene} scene - シーン
     */
    _checkHitChacater(scene) {

        // 衝突している敵キャラクターを検索する。
        const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY, __WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY_SHOT]);

        // 衝突している敵キャラクターがいる場合。
        if (hitCharacters.length > 0) {

            // 敵キャラクターの衝突処理を実行する。
            hitCharacters[0].hit(this, scene);

            // 敵キャラクターに接触した場合は死亡処理を行う。
            if (!this.noDeath) {

                // 死亡時エフェクトを作成する。
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_5__playerdeatheffect_js__["a" /* default */](this.hitArea.x, this.hitArea.y, scene));

                // ステータスを死亡に変更する。
                this.status = STATUS.DEATH;

                // 画像を非表示にする。
                this.sprite.alpha = 0;

                // シーンの死亡時処理を実行する。
                scene.miss();
            }
        }
    }

    /**
     * 敵弾とのかすり判定を処理する。
     * @param {PlayingScene} scene - シーン
     */
    _checkGraze(scene) {

        // かすり当たり判定位置を更新する。
        this.grazeArea.x = this.hitArea.x;
        this.grazeArea.y = this.hitArea.y;

        // かすっている敵弾を検索する。
        const hitCharacters = this.grazeArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_1__character_js__["a" /* default */].type.ENEMY_SHOT]);

        // かすっている敵弾とかすり処理を行う。
        for (let i = 0; i < hitCharacters.length; i++) {

            // チキンゲージを増加させる。
            this.chickenGauge += hitCharacters[i].graze();

            // 上限値を超えた場合は上限値に補正する。
            if (this.chickenGauge > 1) {
                this.chickenGauge = 1;
            }
        }
    }
    
    /**
     * チキンゲージに応じてオプション個数を更新する。
     * @param {PlayingScene} scene - シーン
     */
    _updateOptionCount(scene) {

        // チキンゲージからオプション個数を計算する
        const count = Math.floor(this.chickenGauge / (1 / (MAX_OPTION_COUNT + 1)));

        // オプション個数がある場合
        if (count > 0) {

            // オプションが作成されていなければ作成する。
            if (this.option === null) {
                this.option = new __WEBPACK_IMPORTED_MODULE_6__playeroption_js__["a" /* default */](this.hitArea.x, this.hitArea.y, this.shield, scene);
                scene.addCharacter(this.option);
            }

            // オプションにオプション個数を設定する。
            this.option.setCount(count, scene);
        }
        // オプション個数がない場合
        else {

            // オプションが作成されていれば削除する。
            if (this.option !== null) {

                // オプションにオプション個数を設定し、削除処理を行う。
                this.option.setCount(count, scene);

                // メンバ変数をクリアする。
                this.option = null;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module playerdeatheffect */

/**
 * 自機死亡時のエフェクトを表示する。
 */
class PlayerDeathEffect {

    /**
     * コンストラクタ。
     * 座標の設定とアニメーションの設定を行う。
     * 死亡時SEを再生する。
     *
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);
        this.animation.gotoAndPlay('player_death');

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(x), Math.floor(y));

        // 死亡音を再生する。
        SoundManager.play('miss');
    }

    /**
     * 更新処理。下に落ちる。
     * アニメーションが終了すると自分自身を削除する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 下に落ちる。
        this.sprite.y = Math.floor(this.sprite.y + 1);

        // アニメーションが終了すると自分自身を削除する。
        if (this.animation.finished) {
            scene.removeCharacter(this);
            this.sprite.remove();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayerDeathEffect);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collider_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playershot_js__ = __webpack_require__(10);
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
     *
     * @param {number} x - x座標
     * @param {number} y - y座標
     * @param {number} shield - シールド使用不使用
     * @param {PlayingScene} scene - シーン
     */
    constructor(x, y, shield , scene) {

        /** 
         * スプライト
         * @type {phina.display.Sprite}
         */
        this.sprite = Sprite('image_16x16', 16, 16);

        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this.sprite);

        /**
         * シールド使用不使用
         * @type {boolean}
         */
        this.shield = shield;

        /**
         * アニメーション
         * @type {phina.accessory.FrameAnimation}
         */
        this.animation = FrameAnimation('image_16x16_ss');

        // アニメーションの設定を行う。
        this.animation.attachTo(this.sprite);

        // シールド使用不使用によって画像を変更する。
        if (this.shield) {
            this.animation.gotoAndPlay('player_option_shield');
        }
        else {
            this.animation.gotoAndPlay('player_option_normal');
        }

        /**
         * キャラクタータイプ
         * @type {number}
         */
        this.type = __WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */].type.PLAYER_OPTION;

        /**
         * 当たり判定
         * @type {Collider}
         */
        this.hitArea = new __WEBPACK_IMPORTED_MODULE_2__collider_js__["a" /* default */](x, y, HIT_WIDTH, HIT_HEIGHT);

        /**
         * 移動位置。一定個数溜まったら、FIFOとして移動位置を適用していく。
         * @type {Array}
         */
        this.movePosition = [];

        /**
         * 次のオプション。
         * @type {PlayerOption}
         */
        this.nextOption = null;

        /**
         * 弾発射間隔。
         * @type {number}
         */
        this.shotInterval = 0;

        /**
         * デバッグ用フラグ。自機弾を発射しないようにする。
         * @type {boolean}
         */
        this.noShot = false;

        // デバッグ用: ショットを撃たないようにする。
        if (localStorage.noShot === 'true') {
            this.noShot = true;
        }
    }

    /**
     * 更新処理。
     * 座標をスプライトに適用する。
     * シールド使用時は敵弾との当たり判定処理を行う。
     * 自機弾を発射する。
     * @param {PlayingScene} scene - シーン
     */
    update(scene) {

        // 弾発射間隔経過しているときは自機弾を発射する
        this.shotInterval++;
        if (this.shotInterval >= SHOT_INTERVAL && !this.noShot) {

            // 敵弾が無効化されていない場合は自機弾を生成する。
            if (!scene.isDisableEnemyShot()) {
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_3__playershot_js__["a" /* default */](this.hitArea.x, this.hitArea.y, true, scene));
                this.shotInterval = 0;
            }
        }

        // シールド使用時は当たり判定処理を行う。
        if (this.shield) {
            this._checkHitChacater(scene);
        }

        // 座標をスプライトに適用する。
        this.sprite.setPosition(Math.floor(this.hitArea.x), Math.floor(this.hitArea.y));
    }

    /**
     * 指定された座標へ移動する。
     * ただし、すぐに移動するのではなく、OPTION_SPACEの間隔分遅れて移動する。
     * オプションが他に存在する場合は、移動前の座標に対して移動を指示する。
     * @param {number} x - x座標
     * @param {number} y - y座標
     */
    move(x, y) {

        // 次のオプションが存在する場合は自分の移動前の座標に移動するように指示する。
        if (this.nextOption !== null) {
            this.nextOption.move(this.hitArea.x, this.hitArea.y);
        }
    
        // 移動先座標が間隔分溜まっている場合は先頭の座標に移動する
        if (this.movePosition.length >= OPTION_SPACE) {

            // 先頭の要素を取り出す。
            const pos = this.movePosition.shift();

            // 移動する。
            this.hitArea.x = pos.x;
            this.hitArea.y = pos.y;
        }

        // 移動先座標の配列の末尾に追加する
        this.movePosition.push({x: x, y: y});
    }

    /**
     * オプションの個数を設定する。
     * 0以下が指定されると自分自身を削除する。
     * 2個以上が指定されると再帰的に次のオプションを作成する。
     * @param {number} count - オプション個数
     * @param {PlayingScene} scene - シーン
     */
    setCount(count, scene) {

        // 個数が2個以上の場合はオプションを作成する。
        if (count >= 2) {

            // 次のオプションが作成されていなければ作成する。
            if (this.nextOption === null) {
                this.nextOption = new PlayerOption(this.hitArea.x, this.hitArea.y, this.shield, scene);
                scene.addCharacter(this.nextOption);
            }

            // 次のオプションに自分の分を減らした個数を設定する。
            this.nextOption.setCount(count - 1, scene);
        }
        else {

            // 次のオプションが作成されていれば削除する。
            if (this.nextOption !== null) {

                // 次のオプションに自分の分を減らした個数を設定し、削除処理を行う。
                this.nextOption.setCount(count - 1, scene);

                // メンバ変数をクリアする。
                this.nextOption = null;
            }

            // 0以下が指定された場合は自分自身も削除する。
            if (count <= 0) {
                scene.removeCharacter(this);
                this.sprite.remove();
            }
        }
    }

    /**
     * シールド使用不使用を設定する。
     * 次のオプションがあればオプションの設定も変更する。
     * @param {boolean} shield - シールド使用不使用
     */
    setShield(shield) {

        // シールド使用不使用が変化した場合はアニメーションを変更する。
        if (!this.shield && shield) {
            this.animation.gotoAndPlay('player_option_shield');
        }
        else if (this.shield && !shield) {
            this.animation.gotoAndPlay('player_option_normal');
        }
        else {
            // 変化がない場合はアニメーションを継続する。
            // 毎回アニメーションを変更すると、都度最初のフレームに戻り、
            // アニメーションが行われなくなるため。
        }

        // シールド使用不使用を設定する。
        this.shield = shield;

        // 次のオプションがある場合は次のオプションのシールド使用不使用を設定する。
        if (this.nextOption !== null) {
            this.nextOption.setShield(this.shield);
        }
    }
    
    /**
     * 敵弾との当たり判定を処理する。衝突した敵弾の反射処理を行う。
     * @param {PlayingScene} scene - シーン
     */
    _checkHitChacater(scene) {

        // 衝突している敵弾を検索する。
        const hitCharacters = this.hitArea.getHitCharacter(scene.characters, [__WEBPACK_IMPORTED_MODULE_0__character_js__["a" /* default */].type.ENEMY_SHOT]);

        // 衝突している敵キャラクターがいる場合。
        for (let i = 0; i < hitCharacters.length; i++) {

            // 敵弾反射処理を実行する。
            hitCharacters[i].reflect();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayerOption);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize_js__ = __webpack_require__(4);
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

        /**
         * ベース部分を作成する。
         * @type {phina.display.DisplayElement}
         */
        this.base = DisplayElement();

        /**
         * タッチしていない状態の画像
         * @type {phina.display.Sprite}
         */
        this.offImage = Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.height);

        // タッチしていない状態のサイズを設定する。
        this.offImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.x,
                                  __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.y,
                                  __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.width,
                                  __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOff.height);
        this.offImage.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.offImage.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;

        // ベース部分に追加する。
        this.offImage.addChildTo(this.base);

        /**
         * タッチしている状態の画像
         * @type {phina.display.Sprite}
         */
        this.onImage = Sprite('control', __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.width, __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.height);

        // タッチしている状態のサイズを設定する。
        this.onImage.srcRect.set(__WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.x,
                                 __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.y,
                                 __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.width,
                                 __WEBPACK_IMPORTED_MODULE_0__controlsize_js__["a" /* default */].cs.shieldButtonOn.height);
        this.onImage.scaleX = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;
        this.onImage.scaleY = __WEBPACK_IMPORTED_MODULE_1__screensize_js__["a" /* default */].ZOOM_RATIO;

        // ベース部分に追加する。
        this.onImage.addChildTo(this.base);

        /**
         * ボタン部分。
         * タップをやりやすくするため、画像より大きめにサイズを取る。
         * @type {phina.display.RectangleShape}
         */ 
        this.button = RectangleShape({
            height: BUTTON_SIZE,
            width: BUTTON_SIZE,
        });

        // ボタン部分を非表示にする。
        this.button.alpha = 0;

        // タッチ操作を有効にする。
        this.button.setInteractive(true);

        // ベース部分に追加する。
        this.button.addChildTo(this.base);

        const self = this;

        // タッチ開始イベントのハンドラを作成する。
        this.button.onpointstart = function() {
            self.touch = true;
            self.offImage.alpha = 0;
            self.onImage.alpha = 1;
        };

        // タッチ終了イベントのハンドラを作成する。
        this.button.onpointend = function() {
            self.touch = false;
            self.offImage.alpha = 1;
            self.onImage.alpha = 0;
        };

        /**
         * タッチしているかどうか
         * @type {boolean}
         */
        this.touch = false;

        // 初期状態はタッチしていない状態とする。
        this.offImage.alpha = 1;
        this.onImage.alpha = 0;
    }

    /**
     * 画像、ボタンを合わせたスプライトを取得する。
     * @return {phina.display.DisplayElement} スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * タッチされているかどうかを取得する。
     * @return {boolean} タッチされているかどうか
     */
    isTouch() {
        return this.touch;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ShieldButton);


/***/ }),
/* 22 */
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

/* harmony default export */ __webpack_exports__["a"] = (TileMapManager);


/***/ })
/******/ ]);