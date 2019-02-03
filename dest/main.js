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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collider__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);



/**
 * 敵キャラクター。
 */
class Enemy {
    /**
     * コンストラクタ。
     * @param x x座標
     * @param y y座標
     * @param type 種別。
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, type, param, scene) {
        // サイズを取得する。
        const size = param.size;
        // サイズに応じて画像、スプライトシートのファイル名を変える。
        const imageFile = 'image_' + size + 'x' + size;
        const ssFile = 'image_' + size + 'x' + size + '_ss';
        // スプライト画像を読み込む。
        this._sprite = new phina.pixi.Sprite(imageFile, 16, 16);
        // 原点位置を設定する。
        this._sprite.setOrigin(param.originX, param.originY);
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation(ssFile);
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay(type);
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_0__collider__["a" /* default */](x, y, param.width, param.height);
        // HPを設定する。
        this._hp = param.hp;
        // 防御力を設定する。
        this._defense = param.defense;
        // 死亡エフェクトを初期化する。
        this._deathEffect = null;
        // キャラクター種別を設定する。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY;
    }
    /** キャラクター種別。 */
    get type() {
        return this._type;
    }
    /** キャラクター種別。 */
    set type(value) {
        this._type = value;
    }
    /** 位置とサイズ。 */
    get rect() {
        return this._hitArea;
    }
    /** 死亡エフェクト */
    set deathEffect(value) {
        this._deathEffect = value;
    }
    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene) {
        // HPが0になった場合は破壊処理を行い、自分自身を削除する。
        // また、破壊エフェクト中に衝突処理が走らないように種別をエフェクトに変更する。
        if (this._hp <= 0) {
            this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.EFFECT;
            if (this._deathEffect) {
                this._deathEffect.update(scene);
            }
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width + this._hitArea.width * 4) {
            scene.removeCharacter(this);
            return;
        }
        // キャラクター種別ごとの固有の処理を行う。
        this.action(scene);
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
}
/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__collider__ = __webpack_require__(7);




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
     * @param position 座標
     * @param angle 発射する方向
     * @param count 個数
     * @param interval 弾の間隔の角度
     * @param speed 弾のスピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    static fireNWay(position, angle, count, interval, speed, isScroll, scene) {
        // 敵弾が無効化されていない場合は処理をしない。。
        if (scene.isDisableEnemyShot()) {
            return;
        }
        // 指定された個数分、弾を生成する。
        for (let i = 0; i < count; i++) {
            // 中央の角度からどれだけずらすかを計算する。
            const angleDiff = (-1 * (count - 1 - 2 * i) / 2) * interval;
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(position, angle + angleDiff, speed, isScroll, scene));
        }
    }
    /**
     * 自機を狙う一塊のグループ弾を発射する。
     * 中心点から自機の角度を計算し、すべての弾をその角度で発射する。
     * @param position グループ弾の中心点の座標
     * @param distance 中心点からの距離
     * @param count 弾の数
     * @param speed 弾の速度
     * @param scene シーン
     */
    static fireGroupShot(position, distance, count, speed, scene) {
        // 自機へ向かう角度を計算する。
        const angle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(position, scene.playerPosition);
        // 各弾の位置に通常弾を生成する
        for (let i = 0; i < count; i++) {
            // 弾の座標を計算する。
            const p = {
                x: position.x + distance[i].x,
                y: position.y + distance[i].y,
            };
            // 弾を生成する。
            scene.addCharacter(new EnemyShot(p, angle, speed, false, scene));
        }
    }
    /**
     * 一定時間で破裂する弾を発射する。
     * @param position 発射する位置
     * @param count 破裂後の数
     * @param interval 破裂後の弾の間隔
     * @param speed 弾の速度
     * @param burstInterval 破裂までの間隔
     * @param burstSpeed 破裂後の速度
     * @param data ゲームデータ
     */
    static fireBurstShot(position, count, interval, speed, burstInterval, burstSpeed, scene) {
        // 中心点からの弾の距離
        const distance = 4.0;
        // 自機へ向かう角度を計算する。
        const angle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(position, scene.playerPosition);
        // 個別の弾の角度を計算する。
        const burstAngles = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcNWayAngle(Math.PI, count, interval);
        // 各弾を発射する。
        for (let burstAngle of burstAngles) {
            // 破裂弾を生成する。
            const p = {
                x: position.x + Math.cos(burstAngle) * distance,
                y: position.y - Math.sin(burstAngle) * distance,
            };
            // 弾を生成する。
            let enemyshot = new EnemyShot(p, angle, speed, false, scene)
                .setChangeSpeed(burstInterval, burstSpeed, burstAngle);
            scene.addCharacter(enemyshot);
        }
    }
    /**
     * コンストラクタ、座標の設定とスプライトシートの設定を行う。
     * @param position 座標
     * @param angle 進行方向
     * @param speed スピード
     * @param isScroll スクロールに合わせて移動するかどうか
     * @param scene シーン
     */
    constructor(position, angle, speed, isScroll, scene) {
        // テクスチャのキャッシュがある場合
        if (EnemyShot._textureCache) {
            // テクスチャキャッシュを使用してスプライトを作成する。
            this._sprite = new phina.pixi.Sprite('image_8x8', 8, 8, EnemyShot._textureCache);
        }
        else {
            // スプライト画像を読み込んで、テクスチャをキャッシュに保存する。
            this._sprite = new phina.pixi.Sprite('image_8x8', 8, 8);
            EnemyShot._textureCache = this._sprite.pixiObject.texture;
        }
        // スプライトをシーンに追加する。
        scene.addCharacterSprite(this._sprite);
        // アニメーションの設定を行う。
        this._animation = new phina.accessory.FrameAnimation('image_8x8_ss');
        this._animation.attachTo(this._sprite);
        this._animation.gotoAndPlay('enemy_shot');
        // キャラクター種別を敵弾とする。
        this._type = __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY_SHOT;
        // 当たり判定を作成する。
        this._hitArea = new __WEBPACK_IMPORTED_MODULE_3__collider__["a" /* default */](position.x, position.y, HIT_WIDTH, HIT_HEIGHT);
        // x方向のスピードを計算する。
        this._speedX = Math.cos(angle) * speed;
        // y方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._speedY = Math.sin(angle) * speed * -1;
        // スクロールに合わせて移動するかどうかを設定する。
        this._isScroll = isScroll;
        // かすり時のゲージ増加率を設定する。
        this._grazeRate = GRAZE_RATE;
        // デフォルトは速度変更なしとする。
        this._changeSpeed = false;
        this._changeInterval = 0;
        this._changeSpeedX = 0;
        this._changeSpeedY = 0;
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
        // スクロールに合わせて移動する場合
        if (this._isScroll) {
            this._hitArea.x -= scene.scrollSpeed;
        }
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
                    // ヒット音を再生するために自機弾衝突フラグを立てる。
                    // 1回のフレームで連続で音声が鳴らないようにシーン側で音声を鳴らす処理を行う。
                    scene.isHitPlayerShot = true;
                    // 敵キャラと衝突した場合は処理を終了する。
                    return;
                }
            }
        }
        // 反射されていない状態で速度変更を行う弾の場合
        if (this._type === __WEBPACK_IMPORTED_MODULE_1__character__["a" /* default */].type.ENEMY_SHOT && this._changeSpeed) {
            // 速度変更間隔が経過している場合は速度を変更する。
            this._changeInterval--;
            if (this._changeInterval < 0) {
                this._speedX = this._changeSpeedX;
                this._speedY = this._changeSpeedY;
                this._changeSpeed = false;
            }
        }
        // ブロックとの当たり判定処理を行う。
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックと衝突した場合は自分自身を削除する。
            scene.removeCharacter(this);
            return;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x < -this._hitArea.width * 2 ||
            this._hitArea.x > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.width + this._hitArea.width * 2 ||
            this._hitArea.y < -this._hitArea.height * 2 ||
            this._hitArea.y > __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].STAGE_RECT.height + this._hitArea.height * 2) {
            scene.removeCharacter(this);
            return;
        }
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
    /**
     * 途中で速度を変更する設定を行う。
     * @param interval 速度変更までの間隔
     * @param speed 変更後の速度
     * @param angle 変更後の角度
     */
    setChangeSpeed(interval, speed, angle) {
        // 速度変更までの間隔を設定する。
        this._changeInterval = interval;
        // 変更後のx方向のスピードを計算する。
        this._changeSpeedX = Math.cos(angle) * speed;
        // 変更後のy方向のスピードを計算する。
        // phina.jsの座標系は下方向が正なので逆向きにする。
        this._changeSpeedY = Math.sin(angle) * speed * -1;
        // 速度変更を有効にする。
        this._changeSpeed = true;
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (EnemyShot);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    /**
     * N-Way弾の各弾の進行角度を計算する。
     * @param center 中心角度
     * @param count 弾数
     * @param interval 弾の間の角度
     * @return 各弾の角度
     */
    static calcNWayAngle(center, count, interval) {
        // 戻り値を用意する。
        let angles = [];
        // 最小値の角度を計算する。
        const minAngle = center - (interval * (count - 1)) / 2.0;
        // 各弾の発射角度を計算する。
        for (let i = 0; i < count; i++) {
            // 弾の角度を計算する
            const angle = minAngle + i * interval;
            // 戻り値に追加する。
            angles.push(angle);
        }
        return angles;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stage_js__ = __webpack_require__(25);
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
     * 衝突しているブロックがないかを検索し、衝突している場合は自分の位置を移動する。
     * @param prevX 移動前x座標
     * @param prevY 移動前y座標
     * @param stagePosition ステージ位置
     * @param blockMap ブロックマップ
     */
    collideBlock(prevX, prevY, stagePosition, blockMap) {
        // 衝突しているブロックがないか調べる。
        let block = this.checkCollidedBlock(this, stagePosition, blockMap);
        // 衝突しているブロックがある場合は移動する。
        while (block != null) {
            // 移動位置を計算する。
            const newPosition = this.moveByBlock(this, prevX, prevY, block, stagePosition, blockMap);
            // 移動できない場合はループを抜ける。
            if (this.x === newPosition.x && this.y === newPosition.y) {
                break;
            }
            // 移動後の座標を反映する。
            this.x = newPosition.x;
            this.y = newPosition.y;
            // 移動後に再度衝突していないかチェックする。
            block = this.checkCollidedBlock(this, stagePosition, blockMap);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dragonfly__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ant__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__butterfly__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ladybug__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bagworm__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cicada__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__grasshopper__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__hornet__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__snail__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__stagbeetle__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cockroach__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__rhinocerosbeetle__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mantis__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__honeycomb__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__spider__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__centipede__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__centipedebody__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__centipedetail__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__maggot__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__fly__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__deathnormal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__deathboss__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__deathcentipede__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__deathnone__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__deathmaggot__ = __webpack_require__(40);

























// 敵撃破時のチキンゲージ増加量
const INCREMENT_CHICKEN_GAUGE = 0.005;
/**
 * 敵キャラパラメータ定義。
 */
const ENEMY_DEF = {
    // トンボ
    dragonfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // アリ
    ant: {
        size: 16,
        width: 16,
        height: 8,
        hp: 7,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // チョウ
    butterfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 10,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // テントウムシ
    ladybug: {
        size: 16,
        width: 16,
        height: 16,
        hp: 18,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // ミノムシ
    bagworm: {
        size: 16,
        width: 16,
        height: 16,
        hp: 30,
        defense: 0,
        score: 300,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // セミ
    cicada: {
        size: 16,
        width: 16,
        height: 16,
        hp: 20,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // バッタ
    grasshopper: {
        size: 16,
        width: 16,
        height: 16,
        hp: 9,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // ハチ
    hornet: {
        size: 16,
        width: 16,
        height: 16,
        hp: 12,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // カタツムリ
    snail: {
        size: 16,
        width: 16,
        height: 16,
        hp: 13,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // クワガタ
    stagbeetle: {
        size: 16,
        width: 16,
        height: 16,
        hp: 20,
        defense: 0,
        score: 300,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // ゴキブリ
    cockroach: {
        size: 16,
        width: 16,
        height: 16,
        hp: 15,
        defense: 0,
        score: 300,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // カブトムシ
    rhinocerosbeetle: {
        size: 64,
        width: 32,
        height: 20,
        hp: 2000,
        defense: 0,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // カマキリ
    mantis: {
        size: 64,
        width: 32,
        height: 32,
        hp: 2600,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // ハチの巣
    honeycomb: {
        size: 64,
        width: 32,
        height: 32,
        hp: 2400,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // クモ
    spider: {
        size: 64,
        width: 32,
        height: 32,
        hp: 3200,
        defense: 0,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // ムカデ
    centipede: {
        size: 32,
        width: 16,
        height: 16,
        hp: 19,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.25,
        originY: 0.5,
    },
    // ムカデ（胴体）
    centipede_body: {
        size: 32,
        width: 16,
        height: 8,
        hp: 1,
        defense: 99,
        score: 0,
        death: 'DeathNone',
        originX: 0.5,
        originY: 0.5,
    },
    // ムカデ（尻尾）
    centipede_tail: {
        size: 32,
        width: 24,
        height: 24,
        hp: 15,
        defense: 0,
        score: 0,
        death: 'DeathCentipede',
        originX: 0.75,
        originY: 0.5,
    },
    // ウジ
    maggot: {
        size: 16,
        width: 16,
        height: 16,
        hp: 150,
        defense: 0,
        score: 500,
        death: 'DeathMaggot',
        originX: 0.5,
        originY: 0.5,
    },
    // ハエ
    fly: {
        size: 32,
        width: 16,
        height: 16,
        hp: 1500,
        defense: 0,
        score: 8000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
};
class EnemyFactory {
    static create(x, y, type, scene) {
        // 敵キャラクターを作成する。
        let enemy = null;
        switch (type) {
            case 'dragonfly':
                enemy = new __WEBPACK_IMPORTED_MODULE_0__dragonfly__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'ant':
                enemy = new __WEBPACK_IMPORTED_MODULE_1__ant__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'butterfly':
                enemy = new __WEBPACK_IMPORTED_MODULE_2__butterfly__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'ladybug':
                enemy = new __WEBPACK_IMPORTED_MODULE_3__ladybug__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'bagworm':
                enemy = new __WEBPACK_IMPORTED_MODULE_4__bagworm__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'cicada':
                enemy = new __WEBPACK_IMPORTED_MODULE_5__cicada__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'grasshopper':
                enemy = new __WEBPACK_IMPORTED_MODULE_6__grasshopper__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'hornet':
                enemy = new __WEBPACK_IMPORTED_MODULE_7__hornet__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'snail':
                enemy = new __WEBPACK_IMPORTED_MODULE_8__snail__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'stagbeetle':
                enemy = new __WEBPACK_IMPORTED_MODULE_9__stagbeetle__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'cockroach':
                enemy = new __WEBPACK_IMPORTED_MODULE_10__cockroach__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'rhinocerosbeetle':
                enemy = new __WEBPACK_IMPORTED_MODULE_11__rhinocerosbeetle__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'mantis':
                enemy = new __WEBPACK_IMPORTED_MODULE_12__mantis__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'honeycomb':
                enemy = new __WEBPACK_IMPORTED_MODULE_13__honeycomb__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'spider':
                enemy = new __WEBPACK_IMPORTED_MODULE_14__spider__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede':
                enemy = new __WEBPACK_IMPORTED_MODULE_15__centipede__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede_body':
                enemy = new __WEBPACK_IMPORTED_MODULE_16__centipedebody__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede_tail':
                enemy = new __WEBPACK_IMPORTED_MODULE_17__centipedetail__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'maggot':
                enemy = new __WEBPACK_IMPORTED_MODULE_18__maggot__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            case 'fly':
                enemy = new __WEBPACK_IMPORTED_MODULE_19__fly__["a" /* default */](x, y, ENEMY_DEF[type], scene);
                break;
            default:
                console.log(`Error: Unknwon enemy type: ${type}`);
                break;
        }
        if (enemy) {
            // 死亡エフェクトを作成する。
            let death;
            switch (ENEMY_DEF[type].death) {
                case 'DeathNormal':
                    death = new __WEBPACK_IMPORTED_MODULE_20__deathnormal__["a" /* default */](enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                case 'DeathBoss':
                    death = new __WEBPACK_IMPORTED_MODULE_21__deathboss__["a" /* default */](enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                case 'DeathCentipede':
                    death = new __WEBPACK_IMPORTED_MODULE_22__deathcentipede__["a" /* default */](enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                case 'DeathMaggot':
                    death = new __WEBPACK_IMPORTED_MODULE_24__deathmaggot__["a" /* default */](enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                default:
                    death = new __WEBPACK_IMPORTED_MODULE_23__deathnone__["a" /* default */](enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
            }
            enemy.deathEffect = death;
        }
        return enemy;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (EnemyFactory);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(5);

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
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
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
        }
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__labelbutton__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playingscene__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__howtoplayscene__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__creditscene__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controlsize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cursor__ = __webpack_require__(18);







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
        // PIXI用レイヤーを作成する。
        this._pixiLayer = new phina.display.PixiLayer({
            width: __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_WIDTH,
            height: __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].SCREEN_HEIGHT
        }).addChildTo(this._rootNode);
        // タイトルロゴを作成する。
        const title = new phina.pixi.Sprite('control', __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.width, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.height)
            .addChildTo(this._pixiLayer)
            .setPosition(TITLE_POS_X, TITLE_POS_Y)
            .setScale(__WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].ZOOM_RATIO, __WEBPACK_IMPORTED_MODULE_5__screensize__["a" /* default */].ZOOM_RATIO);
        title.srcRect.set(__WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.x, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.y, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.width, __WEBPACK_IMPORTED_MODULE_4__controlsize__["a" /* default */].title.height);
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
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STATE; });
var STATE;
(function (STATE) {
    STATE[STATE["ENTRY"] = 0] = "ENTRY";
    STATE[STATE["N5WAY_SHOT"] = 1] = "N5WAY_SHOT";
    STATE[STATE["HIGH_SPEED_SHOT"] = 2] = "HIGH_SPEED_SHOT";
    STATE[STATE["BODY_SHOT"] = 3] = "BODY_SHOT";
    STATE[STATE["COUNT"] = 4] = "COUNT";
})(STATE || (STATE = {}));


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__centipedeif__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(3);




// 3-way弾の発射間隔
const N3WAY_SHOT_INTERVAL = 30;
// 3-way弾の弾数
const N3WAY_SHOT_COUNT = 3;
// 3-way弾の角度の間隔
const N3WAY_SHOT_ANGLE = Math.PI / 8;
// 3-way弾のスピード
const N3WAY_SHOT_SPEED = 0.75;
// 3-way弾発射までの間
const N3WAY_SHOT_WATI = 220;
/**
 * 敵キャラ、ムカデの尻尾。
 */
class CentipedeTail extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede_tail', param, scene);
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // ひとつ前の体を初期化する。。
        this._parent = null;
        // 後ろの体を初期化する。
        this._child = null;
    }
    /** ひとつ前の体 */
    get parent() {
        return this._parent;
    }
    /** ひとつ前の体 */
    set parent(value) {
        this._parent = value;
    }
    /** ひとつ後ろの体 */
    get child() {
        return this._child;
    }
    /** ひとつ後ろの体 */
    set child(value) {
        this._child = value;
    }
    /** ヒットポイント */
    get hp() {
        return this._hp;
    }
    /** ヒットポイント */
    set hp(value) {
        this._hp = value;
    }
    /**
     * 一番古い移動履歴を取得する。
     * @return 一番古い移動履歴
     */
    getFirstMoveHistory() {
        return this._moveHistory[0];
    }
    /**
     * 状態を設定する。
     * @param state 状態
     */
    setState(state) {
        // 自分の状態を設定する。
        this._state = state;
        // 子オブジェクトに現在の状態を通知する。
        if (this._child) {
            this._child.setState(this._state);
        }
        return this;
    }
    /**
     * アニメーションフレームを設定する。
     * @param frame アニメーションフレーム
     */
    setAnimationFrame(frame) {
        this._animation.currentFrameIndex = frame;
        return this;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    action(scene) {
        // 一つ前の体がメンバに設定されていない場合は処理しない。
        if (!this._parent) {
            return;
        }
        // 移動前の位置を記憶しておく。
        const prevPosition = { x: this._hitArea.x, y: this._hitArea.y };
        // 移動履歴の末尾を自分の座標に設定する。
        this._hitArea.x = this._parent.getFirstMoveHistory().x;
        this._hitArea.y = this._parent.getFirstMoveHistory().y;
        // 前回位置との差から体の向きを決める。
        const dx = this._hitArea.x - prevPosition.x;
        const dy = this._hitArea.y - prevPosition.y;
        const angle = Math.atan2(dy, dx);
        // 画像を回転させる。
        this._sprite.rotation = angle * 180 / Math.PI;
        // 定周期に3-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval > N3WAY_SHOT_WATI + N3WAY_SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), N3WAY_SHOT_COUNT, N3WAY_SHOT_ANGLE, N3WAY_SHOT_SPEED, false, scene);
            // 弾発射間隔を初期化する。
            this._shotInterval = N3WAY_SHOT_WATI;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (CentipedeTail);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__frame__ = __webpack_require__(20);




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
     * クリック時のイベントリスナーを設定する。
     * ユーザー操作からの処理でなければリンクを開く際に
     * ブラウザがブロックしてしまうことに対する対策。
     * @param func イベントリスナー
     * @return 自インスタンス
     */
    onClick(func) {
        this._base.onclick = func;
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);


// 状態
var STATE;
(function (STATE) {
    STATE[STATE["UP_MOVE"] = 0] = "UP_MOVE";
    STATE[STATE["DOWN_MOVE"] = 1] = "DOWN_MOVE";
})(STATE || (STATE = {}));
// 弾発射間隔
const SHOT_INTERVAL = [150, 170, 190, 210, 230, 250, 270, 290];
// 弾のスピード
const SHOT_SPEED = [0.5, 0.5, 0.6, 0.6, 0.7, 0.7, 0.8, 0.8];
// 弾の角度
const SHOT_ANGLE = Math.PI / 8;
// 種別数
const TYPE_COUNT = SHOT_INTERVAL.length;
// 弾発射までの間
const SHOT_WAIT = 230;
/**
 * 敵キャラ、ウジ。
 */
class Maggot extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'maggot', param, scene);
        // 弾発射間隔を初期化する。
        this._n3WayShotInterval = 0;
        this._n4WayShotInterval = 0;
        this._waitInterval = 0;
        // タイプを初期化する。
        this._shotType = 0;
        // 親オブジェクトを初期化する。
        this._parent = null;
    }
    /** 親オブジェクト */
    get parent() {
        return this._parent;
    }
    /** 親オブジェクト */
    set parent(value) {
        this._parent = value;
    }
    /** 種別。 */
    get shotType() {
        return this._shotType;
    }
    /** 種別。 */
    set shotType(value) {
        this._shotType = value % TYPE_COUNT;
        // 向きを変更する。
        this._sprite.rotation = (Math.PI / 4) * (this._shotType % TYPE_COUNT);
    }
    /**
     * アニメーションフレームを設定する。
     * @param frame アニメーションフレーム
     */
    setAnimationFrame(frame) {
        this._animation.currentFrameIndex = frame;
        return this;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 定周期に3-way弾を発射する。
     * 生成されたときに設定されたstateに応じて発射間隔と画像の向きを変える。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 画像を回転する。
        this._sprite.rotation = -45 * (this._shotType % 8);
        // 弾発射待機間隔をカウントする。
        this._waitInterval++;
        // 弾発射間隔経過しているときは3-way弾を発射する
        this._n3WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n3WayShotInterval >= SHOT_INTERVAL[this._shotType]) {
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 3, SHOT_ANGLE, SHOT_SPEED[this._shotType], false, scene);
            this._n3WayShotInterval = 0;
        }
        // 弾発射間隔経過しているときは4-way弾を発射する
        this._n4WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n4WayShotInterval >= SHOT_INTERVAL[(this._shotType + 3) % TYPE_COUNT]) {
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 4, SHOT_ANGLE, SHOT_SPEED[(this._shotType + 3) % TYPE_COUNT], false, scene);
            this._n4WayShotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Maggot);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 歩行キャラクターの共通処理。
 */
class WalkingCharacter {
    /**
     * コンストラクタ。
     */
    constructor() {
        // 移動後の位置を初期化する。
        this._movePosition = { x: 0, y: 0 };
    }
    /** 移動後の位置 */
    get movePosition() {
        return this._movePosition;
    }
    /**
     * 逆さま判定。上下の障害物の距離を調べ、上の障害物の方が近い場合は上下反転しているものとする。
     * @param character キャラクター
     * @param scene シーン
     * @return 逆さまかどうか
     */
    checkUpsideDown(character, scene) {
        // 上方向の障害物を検索する。
        const upsideBlock = character.getBlockY(true, character.x, scene.getStagePosition(), scene.getBlockMap());
        // 下方向の障害物を検索する。
        const downsideBlock = character.getBlockY(false, character.x, scene.getStagePosition(), scene.getBlockMap());
        // 上方向の障害物の方が近い場合は逆さまと判断する。
        if (character.y - (upsideBlock.y + upsideBlock.height / 2) < (downsideBlock.y - downsideBlock.height / 2) - character.y) {
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
     * @param character キャラクター
     * @param isUpsideDown 逆さまかどうか
     * @param scene シーン
     */
    checkBlockHit(character, isUpsideDown, scene) {
        // 移動可能な段差
        const MOVABLE_STEP = 8;
        // 移動後の位置を初期化する。
        this._movePosition.x = character.x;
        this._movePosition.y = character.y;
        // 左側の足元の障害物を検索する。
        const leftBlock = character.getBlockY(isUpsideDown, character.x - character.width / 2, scene.getStagePosition(), scene.getBlockMap());
        // 右側の足元の障害物を検索する。
        const rightBlock = character.getBlockY(isUpsideDown, character.x + character.width / 2, scene.getStagePosition(), scene.getBlockMap());
        // 逆さまの場合は障害物の上端の値を使用し、通常の場合は下端の値を使用する。
        let leftBlockPos = 0;
        let rightBlockPos = 0;
        if (isUpsideDown) {
            leftBlockPos = leftBlock.y + leftBlock.height / 2;
            rightBlockPos = rightBlock.y + rightBlock.height / 2;
        }
        else {
            leftBlockPos = leftBlock.y - leftBlock.height / 2;
            rightBlockPos = rightBlock.y - rightBlock.height / 2;
        }
        // 左右の段差が移動可能な段差を超えている場合
        if (Math.abs(leftBlockPos - rightBlockPos) > MOVABLE_STEP) {
            // 左右それぞれの移動後の位置を計算する。
            let moveLeftPosY = 0;
            let moveRightPosY = 0;
            if (isUpsideDown) {
                moveRightPosY = rightBlock.y + rightBlock.width / 2 + character.height / 2;
                moveLeftPosY = leftBlock.y + leftBlock.width / 2 + character.height / 2;
            }
            else {
                moveRightPosY = rightBlock.y - rightBlock.width / 2 - character.height / 2;
                moveLeftPosY = leftBlock.y - leftBlock.width / 2 - character.height / 2;
            }
            // 現在の位置からy方向に近いほうに合わせる。
            if (Math.abs(character.y - moveRightPosY) < Math.abs(character.y - moveLeftPosY)) {
                this._movePosition.x = rightBlock.x - rightBlock.width / 2 + character.width / 2;
                this._movePosition.y = moveRightPosY;
            }
            else {
                this._movePosition.x = leftBlock.x - leftBlock.width / 2 + character.width / 2;
                this._movePosition.y = moveLeftPosY;
            }
        }
        else {
            // 逆さまの場合は下の方に合わせる。
            if (isUpsideDown) {
                this._movePosition.y = Math.max(leftBlockPos, rightBlockPos) + character.height / 2;
            }
            else {
                this._movePosition.y = Math.min(leftBlockPos, rightBlockPos) - character.height / 2;
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (WalkingCharacter);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__centipedeif__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyshot__ = __webpack_require__(2);



// 弾発射間隔
const SHOT_INTERVAL = 90;
// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動履歴保存数
const MOVE_HISOTRY_COUNT = 11;
/**
 * 敵キャラ、ムカデの胴体。
 */
class CentipedeBody extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede_body', param, scene);
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY;
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 前の体を初期化する。
        this._parent = null;
        // 後ろの体を初期化する。
        this._child = null;
    }
    /** ひとつ前の体 */
    get parent() {
        return this._parent;
    }
    /** ひとつ前の体 */
    set parent(value) {
        this._parent = value;
    }
    /** ひとつ後ろの体 */
    get child() {
        return this._child;
    }
    /** ひとつ後ろの体 */
    set child(value) {
        this._child = value;
    }
    /** ヒットポイント */
    get hp() {
        return this._hp;
    }
    /** ヒットポイント */
    set hp(value) {
        this._hp = value;
    }
    /**
     * 一番古い移動履歴を取得する。
     * @return 一番古い移動履歴
     */
    getFirstMoveHistory() {
        return this._moveHistory[0];
    }
    /**
     * 状態を設定する。
     * @param state 状態
     */
    setState(state) {
        // 自分の状態を設定する。
        this._state = state;
        // 子オブジェクトに現在の状態を通知する。
        if (this._child) {
            this._child.setState(this._state);
        }
        return this;
    }
    /**
     * アニメーションフレームを設定する。
     * @param frame アニメーションフレーム
     */
    setAnimationFrame(frame) {
        this._animation.currentFrameIndex = frame;
        return this;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    action(scene) {
        // 一つ前の体がメンバに設定されていない場合は処理しない。
        if (!this._parent) {
            return;
        }
        // 移動前の位置を記憶しておく。
        const prevPosition = { x: this._hitArea.x, y: this._hitArea.y };
        // 移動履歴の末尾を自分の座標に設定する。
        this._hitArea.x = this._parent.getFirstMoveHistory().x;
        this._hitArea.y = this._parent.getFirstMoveHistory().y;
        // 前回位置との差から体の向きを決める。
        const dx = this._hitArea.x - prevPosition.x;
        const dy = this._hitArea.y - prevPosition.y;
        const angle = Math.atan2(dy, dx);
        // 画像を回転させる。
        this._sprite.rotation = angle * 180 / Math.PI;
        // 移動履歴を保存する。
        this._moveHistory.push({ x: this._hitArea.x, y: this._hitArea.y });
        // 移動履歴が保存数を超えた場合は先頭から削除していく。
        while (this._moveHistory.length > MOVE_HISOTRY_COUNT) {
            this._moveHistory.shift();
        }
        // 胴体部分からの発射の状態の時は弾を発射する。
        if (this._state === __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].BODY_SHOT) {
            // 弾発射間隔経過しているときは上下方向へ弾を発射する。
            this._shotInterval++;
            if (this._shotInterval > SHOT_INTERVAL) {
                // 上下へ弾を発射する。
                __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 2, Math.PI, SHOT_SPEED, false, scene);
                // 弾発射間隔を初期化する。
                this._shotInterval = 0;
            }
        }
        else {
            // 弾を発射する状態以外の場合は弾発射間隔を初期化する。
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (CentipedeBody);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dpad__ = __webpack_require__(19);



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
        // 方向キー管理クラスを作成する。
        this._dpad = new __WEBPACK_IMPORTED_MODULE_2__dpad__["a" /* default */]().onKeyDown((direction) => { this._move(direction); });
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
            this._dpad.input(gamepad);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 方向を表す文字列
const DIRECTIONS = ['left', 'right', 'up', 'down'];
/**
 * 方向キー入力を処理する。
 * アナログスティックが入力されたタイミングでonKeyDownに設定された関数を実行する。
 * 押しっぱなしの場合には処理はされない。
 */
class DPad {
    /**
     * コンストラクタ。
     */
    constructor() {
        // ゲームパッドの前回入力があったかどうかの情報を初期化する。
        this._prevInput = {};
        for (let direction of DIRECTIONS) {
            this._prevInput[direction] = false;
        }
        // コールバック関数を初期化する。
        this._onKeyDown = null;
    }
    /**
     * カーソルキー入力時のコールバック関数を設定する。
     * @param func コールバック関数
     */
    onKeyDown(func) {
        this._onKeyDown = func;
        return this;
    }
    /**
     * ゲームパッドの入力処理を行う。
     * @param gamepad ゲームパッド
     */
    input(gamepad) {
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
        if (stick.x < -0.5 || gamepad.getKey('left')) {
            input.left = true;
        }
        // 右方向に入力されている場合
        if (stick.x > 0.5 || gamepad.getKey('right')) {
            input.right = true;
        }
        // 上方向に入力されている場合
        if (stick.y < -0.5 || gamepad.getKey('up')) {
            input.up = true;
        }
        // 下方向に入力されている場合
        if (stick.y > 0.5 || gamepad.getKey('down')) {
            input.down = true;
        }
        // 各方向の処理を行う。
        for (let direction of DIRECTIONS) {
            // 方向キーが入力されている場合
            if (input[direction]) {
                // 前回入力されていなかった場合
                if (!this._prevInput[direction] && this._onKeyDown) {
                    // カーソルキー入力時のコールバック関数を呼び出す。
                    this._onKeyDown(direction);
                }
                // 前回入力をありにする。
                this._prevInput[direction] = true;
            }
            else {
                // 前回入力を無しにする。
                this._prevInput[direction] = false;
            }
        }
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DPad);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize__ = __webpack_require__(4);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlsize__ = __webpack_require__(4);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stringresource__ = __webpack_require__(65);

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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imagebutton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dpad__ = __webpack_require__(19);



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
        // 方向キー管理クラスを作成する。
        this._dpad = new __WEBPACK_IMPORTED_MODULE_2__dpad__["a" /* default */]().onKeyDown((direction) => { this._onCursorKey(direction); });
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
        else if (keyboard.getKeyDown('left')) {
            this._goToPrevPage();
        }
        else if (keyboard.getKeyDown('right')) {
            this._goToNextPage();
        }
        else {
            // その他のキー入力は処理しない。
        }
        // ゲームパッドのカーソルキーの入力処理を行う。
        this._dpad.input(gamepad);
    }
    /**
     * カーソルキー入力時の処理。
     * @param direction 方向
     */
    _onCursorKey(direction) {
        // 左キーが押された場合は前ページへ移動し、
        // 右キーが押された場合は次ページへ移動する。
        switch (direction) {
            case 'left':
                this._goToPrevPage();
                break;
            case 'right':
                this._goToNextPage();
                break;
            default:
                break;
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collider__ = __webpack_require__(7);
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
        // テクスチャのキャッシュがある場合
        if (PlayerShot._textureCache) {
            // テクスチャキャッシュを使用してスプライトを作成する。
            this._sprite = new phina.pixi.Sprite('image_8x8', 8, 8, PlayerShot._textureCache);
        }
        else {
            // スプライト画像を読み込んで、テクスチャをキャッシュに保存する。
            this._sprite = new phina.pixi.Sprite('image_8x8', 8, 8);
            PlayerShot._textureCache = this._sprite.pixiObject.texture;
        }
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
            return;
        }
        // 画面外の敵にダメージを与えないように画面端付近で攻撃力を0にする。
        if (this._hitArea.x > __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width - this._hitArea.width) {
            this._power = 0;
        }
        // 画面外に出た場合は自分自身を削除する。
        if (this._hitArea.x > __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width + 4) {
            scene.removeCharacter(this);
            return;
        }
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tilemapmanager__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyfactory__ = __webpack_require__(8);



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
     * @param manName マップ名
     * @param layer ステージ画像を配置するレイヤー
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
            this._background = new phina.display.Sprite(backgroundTexture)
                .setOrigin(0, 0)
                .setPosition(0, 0)
                .addChildTo(layer);
        }
        else {
            this._background = null;
        }
        // 前景画像を読み込む。
        const foregroundTexture = this._mapManager.getIamge('foreground');
        if (foregroundTexture != null) {
            this._foreground = new phina.display.Sprite(foregroundTexture)
                .setOrigin(0, 0)
                .setPosition(0, 0)
                .addChildTo(layer);
        }
        else {
            this._foreground = null;
        }
        // 障害物画像を読み込む。
        const blockTexture = this._mapManager.getIamge('block');
        if (blockTexture != null) {
            this._block = new phina.display.Sprite(blockTexture)
                .setOrigin(0, 0)
                .setPosition(0, 0)
                .addChildTo(layer);
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
     * レイヤーからステージの画像を取り除く。
     */
    remove() {
        // 背景画像を取り除く。
        if (this._background) {
            this._background.remove();
        }
        // 前景画像を取り除く。
        if (this._foreground) {
            this._foreground.remove();
        }
        // 障害物を取り除く。
        if (this._block) {
            this._block.remove();
        }
        return this;
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
                            for (let p of obj.properties) {
                                if (p.name == 'speed') {
                                    this._speed = p.value;
                                    break;
                                }
                            }
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
        // 敵キャラクターを作成する。
        const enemy = __WEBPACK_IMPORTED_MODULE_2__enemyfactory__["a" /* default */].create(x, y, type, scene);
        if (enemy) {
            // シーンに追加する。
            scene.addCharacter(enemy);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Stage);


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
phina.define('phina.display.PixiLayer', {
    superClass: 'phina.display.Layer',
    stage: null,
    renderer: null,
    /** 子供を 自分のCanvasRenderer で描画するか */
    renderChildBySelf: true,
    init: function (options) {
        this.superInit();
        options = (options || {}).$safe({
            width: 640,
            height: 640
        });
        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(options.width, options.height, { transparent: true });
    },
    draw: function (canvas) {
        this.renderer.render(this.stage);
        var domElement = this.renderer.view;
        canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
    },
    addChild: function (child) {
        if (child.pixiObject) {
            this.stage.addChild(child.pixiObject);
        }
        return phina.display.Layer.prototype.addChild.apply(this, arguments);
    },
    removeChild: function (child) {
        if (child.pixiObject) {
            this.stage.removeChild(child.pixiObject);
        }
        return phina.display.Layer.prototype.removeChild.apply(this, arguments);
    }
});
// exportするものがないのでダミー変数をexportする。
var PixiLayerDummy = 0;
/* harmony default export */ __webpack_exports__["a"] = (PixiLayerDummy);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
phina.define('phina.pixi.Sprite', {
    superClass: 'phina.display.Sprite',
    pixiObject: null,
    init: function (image, width, height, shareTexture) {
        this.superInit(image, width, height);
        if (shareTexture) {
            this.pixiObject = new PIXI.Sprite(shareTexture);
        }
        else {
            this.pixiObject = new PIXI.Sprite(PIXI.Texture.fromCanvas(this.image.domElement, PIXI.SCALE_MODES.NEAREST));
        }
        this.pixiObject.anchor.set(0.5, 0.5);
        this.pixiObject.texture.baseTexture.width = this.image.domElement.width;
        this.pixiObject.texture.baseTexture.height = this.image.domElement.height;
        this.on('enterframe', function (e) {
            // Elementと必要な情報を同期
            this.pixiObject.position.set(this.x, this.y);
            this.pixiObject.rotation = this.rotation * (Math.PI / 180);
            this.pixiObject.scale.set(this.scaleX, this.scaleY);
            this.pixiObject.anchor.set(this.originX, this.originY);
            this.pixiObject.alpha = this.alpha;
            this.pixiObject.texture.frame.x = this.srcRect.x;
            this.pixiObject.texture.frame.y = this.srcRect.y;
            this.pixiObject.texture.frame.width = this.srcRect.width;
            this.pixiObject.texture.frame.height = this.srcRect.height;
            this.pixiObject.texture._updateUvs();
        });
    },
    setFrameIndex: function (index, width, height) {
        phina.display.Sprite.prototype.setFrameIndex.apply(this, arguments);
        this.pixiObject.texture.frame = new PIXI.Rectangle(this.srcRect.x, this.srcRect.y, this.srcRect.width, this.srcRect.height);
        return this;
    },
    setImage: function (image, width, height) {
        let newImage;
        if (typeof image === 'string') {
            newImage = phina.asset.AssetManager.get('image', image);
        }
        else {
            newImage = image;
        }
        this._image = newImage;
        this.pixiObject = new PIXI.Sprite(new PIXI.Texture(PIXI.BaseTexture.fromCanvas(this.image.domElement, PIXI.SCALE_MODES.NEAREST)));
        this.pixiObject.texture.baseTexture.width = this.image.domElement.width;
        this.pixiObject.texture.baseTexture.height = this.image.domElement.height;
        this.width = this._image.domElement.width;
        this.height = this._image.domElement.height;
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        this.frameIndex = 0;
        this.pixiObject.texture.frame = new PIXI.Rectangle(this.srcRect.x, this.srcRect.y, this.srcRect.width, this.srcRect.height);
        return this;
    },
    setPosition: function (x, y) {
        this.pixiObject.position.set(x, y);
        return phina.display.Sprite.prototype.setPosition.apply(this, arguments);
    },
    setOrigin: function (x, y) {
        this.pixiObject.anchor.set(x, y);
        return phina.display.Sprite.prototype.setOrigin.apply(this, arguments);
    },
    setScale: function (x, y) {
        y = y || x;
        this.pixiObject.scale.set(x, y);
        return phina.display.Sprite.prototype.setScale.apply(this, arguments);
    },
});
// exportするものがないのでダミー変数をexportする。
var PixiSpriteDummy = 0;
/* harmony default export */ __webpack_exports__["a"] = (PixiSpriteDummy);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemy_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__walkingcharacter__ = __webpack_require__(16);




// 状態
var STATE;
(function (STATE) {
    STATE[STATE["LEFT_MOVE"] = 0] = "LEFT_MOVE";
    STATE[STATE["RIGHT_MOVE"] = 1] = "RIGHT_MOVE";
    STATE[STATE["FIRE"] = 2] = "FIRE";
})(STATE || (STATE = {}));
;
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
/**
 * 敵キャラクター、アリ。
 */
class Ant extends __WEBPACK_IMPORTED_MODULE_2__enemy_js__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ant', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 初期状態は左移動とする。
        this._state = STATE.LEFT_MOVE;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 上下の障害物との距離から逆さまかどうかを判定する。
        const walkingCharacter = new __WEBPACK_IMPORTED_MODULE_3__walkingcharacter__["a" /* default */]();
        this._isUpsideDown = walkingCharacter.checkUpsideDown(this._hitArea, scene);
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
        // 状態によって処理を分岐する。
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
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
                    this._shotInterval = 0;
                }
                break;
            default:
                break;
        }
        // 障害物との衝突判定を行う。
        const walkingCharacter = new __WEBPACK_IMPORTED_MODULE_3__walkingcharacter__["a" /* default */]();
        walkingCharacter.checkBlockHit(this._hitArea, this._isUpsideDown, scene);
        // 移動後の位置にキャラクターを移動する。
        this._hitArea.x = walkingCharacter.movePosition.x;
        this._hitArea.y = walkingCharacter.movePosition.y;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Ant);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);


// 弾のスピード
const SHOT_SPEED = 0.5;
// 弾発射間隔
const SHOT_INTERVAL = 60;
/**
 * 敵キャラクター。ミノムシ。
 */
class Bagworm extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'bagworm', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * スクロールスピードに合わせて移動する。一定時間で全方位に12-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 弾発射間隔経過しているときは全方位に弾を発射する。
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 全方位に 12-way弾を発射する。
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 12, Math.PI / 6, SHOT_SPEED, true, scene);
            this._shotInterval = 0;
        }
    }
}
;
/* harmony default export */ __webpack_exports__["a"] = (Bagworm);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize__ = __webpack_require__(4);


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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);


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
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'butterfly', param, scene);
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
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 3, Math.PI / 8.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Butterfly);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__centipedeif__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__centipedebody__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__centipedetail__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__enemyfactory__ = __webpack_require__(8);







// 状態遷移間隔
const STATE_INTERVAL = [170, 900, 900, 900];
// 移動方向変更の境界線x方向最小値
const MOVE_CHANGE_POINT_X_MIN = 8.0;
// 移動方向変更の境界線x方向最大値
const MOVE_CHANGE_POINT_X_MAX = 184.0;
// 移動方向変更の境界線y方向最小値
const MOVE_CHANGE_POINT_Y_MIN = 16.0;
// 移動方向変更の境界線y方向最大値
const MOVE_CHANGE_POINT_Y_MAX = 128.0;
// 移動スピード
const MOVE_SPEED = 0.5;
// 胴体の数
const BODY_COUNT = 18;
// 5-way弾発射間隔
const N5WAY_INTERVAL = 60;
// 5-way弾スピード
const N5WAY_SHOT_SPEED = 0.5;
// 1-way弾の待機時間
const N1WAY_WAIT_TIME = 10;
// 1-way弾の発射時間
const N1WAY_SHOT_TIME = 80;
// 1-way弾発射間隔
const N1WAY_INTERVAL = 20;
// 1-way弾スピード
const N1WAY_SHOT_SPEED = 0.75;
// 移動履歴保存数
const MOVE_HISOTRY_COUNT = 11;
/**
 * 敵キャラ、ムカデ。
 */
class Centipede extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'centipede', param, scene);
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // 移動履歴を初期化する。
        this._moveHistory = [{ x: x, y: y }];
        // 状態を初期化する。
        this._state = __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY;
        // 弾発射間隔、状態遷移間隔を初期化する。
        this._5wayInterval = 0;
        this._1wayWaitInterval = 0;
        this._1wayShotInterval = 0;
        this._stateInverval = 0;
        // 前後の体を初期化する。
        this._parent = null;
        this._child = null;
        // 胴体部分を作成する。
        let parent = this;
        let animationFrame = 0;
        for (let i = 0; i < BODY_COUNT; i++) {
            // 胴体を作成する。
            const body = __WEBPACK_IMPORTED_MODULE_6__enemyfactory__["a" /* default */].create(x, y, 'centipede_body', scene);
            if (body && body instanceof __WEBPACK_IMPORTED_MODULE_2__centipedebody__["a" /* default */]) {
                // シーンに追加する。
                scene.addCharacter(body);
                // 足の動きが交互になるようにアニメーションフレームを設定する。
                body.setAnimationFrame(animationFrame);
                animationFrame = 1 - animationFrame;
                // 1個前の体を設定する。
                body.parent = parent;
                // 前の部分の体の次の部分に今回作成した体を設定する。
                parent.child = body;
                // 今回作成した胴体を次の胴体の前の部分に使用する。
                parent = body;
            }
        }
        // 尻尾を作成する。
        const tail = __WEBPACK_IMPORTED_MODULE_6__enemyfactory__["a" /* default */].create(x, y, 'centipede_tail', scene);
        if (tail && tail instanceof __WEBPACK_IMPORTED_MODULE_3__centipedetail__["a" /* default */]) {
            // シーンに追加する。
            scene.addCharacter(tail);
            // 足の動きが交互になるようにアニメーションフレームを設定する。
            tail.setAnimationFrame(animationFrame);
            // 1個前の体を設定する。
            tail.parent = parent;
            // 前の部分の体の次の部分に今回作成した体を設定する。
            parent.child = tail;
        }
        // 初期移動方向は左下とする。
        this._moveDirectionX = -1;
        this._moveDirectionY = 1;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /** ひとつ前の体 */
    get parent() {
        return this._parent;
    }
    /** ひとつ前の体 */
    set parent(value) {
        this._parent = value;
    }
    /** ひとつ後ろの体 */
    get child() {
        return this._child;
    }
    /** ひとつ後ろの体 */
    set child(value) {
        this._child = value;
    }
    /** ヒットポイント */
    get hp() {
        return this._hp;
    }
    /** ヒットポイント */
    set hp(value) {
        this._hp = value;
    }
    /**
     * 一番古い移動履歴を取得する。
     * @return 一番古い移動履歴
     */
    getFirstMoveHistory() {
        return this._moveHistory[0];
    }
    /**
     * 状態を設定する。
     * @param state 状態
     */
    setState(state) {
        // 自分の状態を設定する。
        this._state = state;
        // 子オブジェクトに現在の状態を通知する。
        if (this._child) {
            this._child.setState(this._state);
        }
        return this;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY:// 登場
                // 左方向へ移動する。
                this._hitArea.x -= 0.5;
                // 画像を回転させる。
                this._sprite.rotation = 180;
                break;
            case __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].N5WAY_SHOT:// 5-way弾発射
                // 弾発射間隔時間経過したら弾を発射する。
                this._5wayInterval++;
                if (this._5wayInterval > N5WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_4__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_5__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, N5WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._5wayInterval = 0;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].HIGH_SPEED_SHOT:// 1-way弾による高速弾発射
                // 1-way弾グループの待機時間が経過している場合は1-way弾を発射し始める。
                this._1wayWaitInterval++;
                if (this._1wayWaitInterval > N1WAY_WAIT_TIME) {
                    // 弾発射間隔時間経過したら弾を発射する。
                    this._1wayShotInterval++;
                    if (this._1wayShotInterval > N1WAY_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        __WEBPACK_IMPORTED_MODULE_4__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_5__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, N1WAY_SHOT_SPEED, false, scene);
                        // 弾発射間隔を初期化する。
                        this._1wayShotInterval = 0;
                    }
                    // 1-way弾発射時間を経過した場合、待機時間を初期化する。
                    if (this._1wayWaitInterval > N1WAY_WAIT_TIME + N1WAY_SHOT_TIME) {
                        this._1wayWaitInterval = 0;
                        this._1wayShotInterval = 0;
                    }
                }
                break;
            default:
                break;
        }
        // 登場時以外は斜めに移動する。
        // 端まで行くと向きを反転する。
        if (this._state !== __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY) {
            // 下方向へ移動中に下端に達したら向きを変える。
            // 上方向へ移動中に上端に達したら向きを変える。
            if ((this._moveDirectionY > 0 && this._hitArea.y > MOVE_CHANGE_POINT_Y_MAX) ||
                (this._moveDirectionY < 0 && this._hitArea.y < MOVE_CHANGE_POINT_Y_MIN)) {
                this._moveDirectionY *= -1;
            }
            // 左方向へ移動中に左端に達したら向きを変える。
            // 右方向へ移動中に右端に達したら向きを変える。
            if ((this._moveDirectionX > 0 && this._hitArea.x > MOVE_CHANGE_POINT_X_MAX) ||
                (this._moveDirectionX < 0 && this._hitArea.x < MOVE_CHANGE_POINT_X_MIN)) {
                this._moveDirectionX *= -1;
            }
            // スピードを設定する。
            const speedX = MOVE_SPEED * this._moveDirectionX;
            const speedY = MOVE_SPEED * this._moveDirectionY;
            // 移動する。
            this._hitArea.x += speedX;
            this._hitArea.y += speedY;
            // 移動方向の角度を計算する。
            const angle = Math.atan2(speedY, speedX);
            // 画像を回転させる。
            this._sprite.rotation = angle * 180 / Math.PI;
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInverval++;
        if (this._stateInverval > STATE_INTERVAL[this._state]) {
            // 次の状態へ進める。
            if (this._state + 1 < __WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].COUNT) {
                this.setState(this._state + 1);
            }
            else {
                // 状態が最大を超える場合は最初の状態へループする。
                this.setState(__WEBPACK_IMPORTED_MODULE_1__centipedeif__["a" /* STATE */].ENTRY + 1);
            }
            // 弾発射間隔、状態遷移間隔を初期化する。
            this._5wayInterval = 0;
            this._1wayWaitInterval = 0;
            this._1wayShotInterval = 0;
            this._stateInverval = 0;
        }
        // 移動履歴を保存する。
        this._moveHistory.push({ x: this._hitArea.x, y: this._hitArea.y });
        // 移動履歴が保存数を超えた場合は先頭から削除していく。
        while (this._moveHistory.length > MOVE_HISOTRY_COUNT) {
            this._moveHistory.shift();
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
/* harmony default export */ __webpack_exports__["a"] = (Centipede);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controlsize_js__ = __webpack_require__(4);


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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyshot__ = __webpack_require__(2);



// 状態
const STATE = {
    INIT: 1,
    MOVE: 2,
    STOP: 3,
};
// 移動スピード
const MOVE_SPEED = 0.75;
// 移動間隔
const MOVE_INTERVAL = 60;
// 弾発射間隔
const SHOT_INTERVAL = 20;
// 待機間隔
const WAIT_INTERVAL = 70;
// 弾のスピード
const SHOT_SPEED = 0.5;
/**
 * 敵キャラクター。セミ。
 */
class Cicada extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'cicada', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 初期状態は停止とする。
        this._state = STATE.STOP;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 移動速度を初期化する。
        this._speedX = 0;
        this._speedY = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 自機に向かって一定時間飛ぶ。その後待機して自機に向かって3-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // 移動速度を計算する。
                this._calcMoveSpeed(scene);
                // 移動中アニメーションを設定する。
                this._animation.gotoAndPlay('cicada_fly');
                // 移動の状態へ遷移する。
                this._state = STATE.MOVE;
                break;
            case STATE.MOVE:// 移動状態
                // 移動間隔経過したら次の状態へ進める。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > MOVE_INTERVAL) {
                    // 停止状態へ遷移する。
                    this._state = STATE.STOP;
                    // 待機中アニメーションを設定する。
                    this._animation.gotoAndPlay('cicada');
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.STOP:// 停止状態
                // スクロールに合わせて移動する。
                this._speedX = -scene.scrollSpeed;
                this._speedY = 0;
                // 弾発射間隔経過で自機に向かって3-way弾を発射する。
                this._shotInterval++;
                if (this._shotInterval > SHOT_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 8, SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval = 0;
                }
                // 待機間隔経過で初期状態に戻る。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_INTERVAL) {
                    // 初期状態へ遷移する。
                    this._state = STATE.INIT;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            default:
                break;
        }
        // 速度に応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
    }
    /**
     * 自機の位置へ移動するように移動速度を計算する。
     * @param scene シーン
     */
    _calcMoveSpeed(scene) {
        // 自機との角度を計算する。
        const angle = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition);
        // 縦横の速度を決定する。
        this._speedX = MOVE_SPEED * Math.cos(angle);
        this._speedY = -MOVE_SPEED * Math.sin(angle);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Cicada);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);



// 移動スピード
const MOVE_SPEED = 0.75;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 弾発射間隔
const SHOT_INTERVAL = 40;
/**
 * 敵キャラクター、ゴキブリ。
 */
class Cockroach extends __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'cockroach', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 自機に向かって体当たりをしてくる。定周期で自機に向かって2-way弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        // 自機との角度を求める
        const angle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition);
        // 縦横の速度を決定する
        const speedX = MOVE_SPEED * Math.cos(angle);
        const speedY = -1.0 * MOVE_SPEED * Math.sin(angle);
        // x方向に移動する。
        this._hitArea.x += speedX;
        // ブロックと衝突しているかチェックする。
        const coollidedBlockX = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());
        // ブロックと衝突している場合はブロックの端まで移動する。
        if (coollidedBlockX) {
            if (speedX > 0) {
                this._hitArea.x = coollidedBlockX.x - coollidedBlockX.width / 2 - this._hitArea.width / 2;
            }
            else {
                this._hitArea.x = coollidedBlockX.x + coollidedBlockX.width / 2 + this._hitArea.width / 2;
            }
        }
        // y方向に移動する。
        this._hitArea.y += speedY;
        // ブロックと衝突しているかチェックする。
        const coollidedBlockY = this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap());
        // ブロックと衝突している場合はブロックの端まで移動する。
        if (coollidedBlockY) {
            if (speedY > 0) {
                this._hitArea.y = coollidedBlockY.y - coollidedBlockY.height / 2 - this._hitArea.height / 2;
            }
            else {
                this._hitArea.y = coollidedBlockY.y + coollidedBlockY.height / 2 + this._hitArea.height / 2;
            }
        }
        // 画像を回転させる。
        this._sprite.rotation = -1.0 * angle * 180 / Math.PI + 90;
        // ブロックと衝突している場合
        if (this._hitArea.checkCollidedBlock(this._hitArea, scene.getStagePosition(), scene.getBlockMap()) != null) {
            // ブロックによって押されて移動する。
            const dest = this._hitArea.pushCharacter(this._hitArea, scene.getStagePosition(), scene.getBlockMap(), false);
            this._hitArea.x = dest.x;
            this._hitArea.y = dest.y;
        }
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            __WEBPACK_IMPORTED_MODULE_0__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 2, Math.PI / 16.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Cockroach);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__titlescene__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagelayer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__localizer__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__labelbutton__ = __webpack_require__(14);






// テキストの幅
const TEXT_WIDTH = 200;
// テキストの高さ
const TEXT_HEIGHT = 80;
// テキストの位置x座標
const TEXT_POS_X = Math.round(__WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].SCREEN_WIDTH * 0.35);
// テキストの位置y座標
const TEXT_POS_Y = [
    Math.round(__WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].SCREEN_HEIGHT * 0.3),
    Math.round(__WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].SCREEN_HEIGHT * 0.55),
    Math.round(__WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].SCREEN_HEIGHT * 0.8),
];
// ボタンの位置、x座標
const BUTTON_POS_X = Math.round(__WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].SCREEN_WIDTH * 0.7);
// ボタンの位置、y座標
const BUTTON_POS_Y = [
    TEXT_POS_Y[0],
    TEXT_POS_Y[1],
    TEXT_POS_Y[2],
];
// ボタンの幅
const BUTTON_WIDTH = 112;
// ボタンの高さ
const BUTTON_HEIGHT = 32;
// 1ページの項目数
const PAGE_ITEM_NUM = 3;
// ページ数
const PAGE_NUM = 2;
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
        // 各ページを作成する。
        for (let i = 0; i < PAGE_NUM; i++) {
            // ページを作成する。
            const page = new phina.display.DisplayElement();
            // 各項目を作成する。
            for (let j = 0; j < PAGE_ITEM_NUM; j++) {
                // テキスト部分を作成する。
                const textBox = new phina.ui.LabelAreaEx({
                    text: '',
                    width: TEXT_WIDTH,
                    height: TEXT_HEIGHT,
                    fontSize: 24,
                    fill: __WEBPACK_IMPORTED_MODULE_2__mycolor__["a" /* default */].FORE_COLOR,
                    fontFamily: 'noto',
                    keepWord: false,
                })
                    .setPosition(TEXT_POS_X, TEXT_POS_Y[j])
                    .addChildTo(page);
                // リソーステキストを取得し、テキスト部分に設定する。
                const textKey = 'CreditName_' + (i * PAGE_ITEM_NUM + j + 1);
                const text = __WEBPACK_IMPORTED_MODULE_4__localizer__["a" /* default */].getString(textKey);
                textBox.text = text;
                // リンクボタンを作成する。
                const linkButton = new __WEBPACK_IMPORTED_MODULE_5__labelbutton__["a" /* default */](BUTTON_WIDTH, BUTTON_HEIGHT)
                    .setLabel('WEB SITE')
                    .onClick((event) => {
                    // リンクURLを取得し、リンク先を開く。
                    const urlKey = 'CreditLink_' + (i * PAGE_ITEM_NUM + j + 1);
                    const url = __WEBPACK_IMPORTED_MODULE_4__localizer__["a" /* default */].getString(urlKey);
                    window.open(url);
                })
                    .setEnable(false)
                    .setPosition(BUTTON_POS_X, BUTTON_POS_Y[j])
                    .addChildTo(page);
            }
            // ページを追加する。
            this._pageLayer.addPage(page);
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
/* harmony default export */ __webpack_exports__["a"] = (CreditScene);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explosion__ = __webpack_require__(9);

/**
 * ボスキャラクター破壊時処理。
 */
class DeathBoss {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
        // 死亡エフェクト間隔を初期化する。
        this._deathInterval = 0;
    }
    /**
     * 更新処理。
     * 一定時間爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 爆発の間隔
        const EXPLOSION_INTERVAL = 20;
        // 状態遷移間隔
        const STATE_INTERVAL = 300;
        // 爆発の間隔が経過している場合は爆発を発生させる。
        this._deathInterval++;
        if (this._deathInterval % EXPLOSION_INTERVAL == 0) {
            // 爆発発生位置を決める。
            const x = this._target.rect.x + (Math.random() - 0.5) * this._target.rect.width;
            const y = this._target.rect.y + (Math.random() - 0.5) * this._target.rect.height;
            // 爆発アニメーションを作成する。
            scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_0__explosion__["a" /* default */](x, y, scene));
        }
        // 状態遷移間隔が経過している場合は死亡処理を行う。
        if (this._deathInterval > STATE_INTERVAL) {
            // スコアを加算する。
            scene.addScore(this._score);
            // チキンゲージを増加させる。
            scene.addChickenGauge(this._gauge);
            // ステージクリア処理を行う。
            scene.stageClear();
            // キャラクターを削除する。
            scene.removeCharacter(this._target);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DeathBoss);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explosion__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__centipedetail__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyfactory__ = __webpack_require__(8);



/**
 * ムカデの尻尾破壊時処理。
 */
class DeathCentipede {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
    }
    /**
     * 更新処理。
     * 爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 対象のキャラクターがムカデの尻尾で、
        // 1個前の体が設定されている場合のみ処理を行う。
        if (this._target instanceof __WEBPACK_IMPORTED_MODULE_1__centipedetail__["a" /* default */] && this._target.parent) {
            // 2個前の体が存在する場合（1個前が胴体の場合）と
            // 1個前が頭の場合で処理を分岐する。
            if (this._target.parent.parent) {
                // 2個前の体が存在する場合（1個前が胴体の場合）
                // 爆発アニメーションを作成する。
                scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_0__explosion__["a" /* default */](this._target.rect.x, this._target.rect.y, scene));
                // 1個前の胴体の位置に尻尾を作成する。
                const tail = __WEBPACK_IMPORTED_MODULE_2__enemyfactory__["a" /* default */].create(this._target.parent.rect.x, this._target.parent.rect.y, 'centipede_tail', scene);
                if (tail && tail instanceof __WEBPACK_IMPORTED_MODULE_1__centipedetail__["a" /* default */]) {
                    // シーンに追加する。
                    scene.addCharacter(tail);
                    // 前の部分の体を尻尾の親ノードとして設定する。
                    tail.parent = this._target.parent.parent;
                    // 前の部分の体の次の部分に今回作成した体を設定する。
                    this._target.parent.parent.child = tail;
                }
                // 頭を検索する。
                let head = this._target.parent.parent;
                while (head.parent) {
                    head = head.parent;
                }
                // 頭のヒットポイントを減らす。
                head.hp = head.hp - 1;
                // 1個前の体を削除する。
                this._target.parent.hp = 0;
            }
            else {
                // 1個前が頭の場合は頭を破壊する。
                this._target.parent.hp = 0;
            }
        }
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DeathCentipede);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explosion__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maggot__ = __webpack_require__(15);


/**
 * 雑魚敵破壊時処理。
 */
class DeathMaggot {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
    }
    /**
     * 更新処理。
     * 爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 対象のキャラクターがウジで、
        // ハエが設定されている場合のみ処理を行う。
        if (this._target instanceof __WEBPACK_IMPORTED_MODULE_1__maggot__["a" /* default */] && this._target.parent) {
            // ウジの数を一つ減らす。
            this._target.parent.maggotCount--;
            // ハエの位置を自分の位置に移動する。
            this._target.parent.rect.x = this._target.rect.x;
            this._target.parent.rect.y = this._target.rect.y;
        }
        // 爆発アニメーションを作成する。
        scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_0__explosion__["a" /* default */](this._target.rect.x, this._target.rect.y, scene));
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DeathMaggot);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * エフェクトなし敵キャラ破壊時処理。
 */
class DeathNormal {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
    }
    /**
     * 更新処理。
     * エフェクトなしで自分を削除する。
     * @param scene シーン
     */
    update(scene) {
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DeathNormal);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explosion__ = __webpack_require__(9);

/**
 * 雑魚敵破壊時処理。
 */
class DeathNormal {
    /**
     * コンストラクタ。
     * @param character 対象のキャラクター
     * @param score 破壊時に加算するスコア
     * @param gauge 破壊時に加算するゲージ
     */
    constructor(character, score, gauge) {
        // 対象のキャラクターを設定する。
        this._target = character;
        // 破壊時に加算するスコアを設定する。
        this._score = score;
        // 破壊時に加算するゲージを設定する。
        this._gauge = gauge;
    }
    /**
     * 更新処理。
     * 爆発アニメーションを発生させ、スコアを加算し、キャラクターを削除する。
     * @param scene シーン
     */
    update(scene) {
        // 爆発アニメーションを作成する。
        scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_0__explosion__["a" /* default */](this._target.rect.x, this._target.rect.y, scene));
        // スコアを加算する。
        scene.addScore(this._score);
        // チキンゲージを増加させる。
        scene.addChickenGauge(this._gauge);
        // キャラクターを削除する。
        scene.removeCharacter(this._target);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DeathNormal);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__(1);


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
class Dragonfly extends __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'dragonfly', param, scene);
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
            __WEBPACK_IMPORTED_MODULE_0__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Dragonfly);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemyfactory__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maggot__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__explosion__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__screensize__ = __webpack_require__(0);








// 弾発射状態
var SHOT_STATE;
(function (SHOT_STATE) {
    SHOT_STATE[SHOT_STATE["WAIT"] = 0] = "WAIT";
    SHOT_STATE[SHOT_STATE["ENTRY1"] = 1] = "ENTRY1";
    SHOT_STATE[SHOT_STATE["ENTRY2"] = 2] = "ENTRY2";
    SHOT_STATE[SHOT_STATE["ENTRY3"] = 3] = "ENTRY3";
    SHOT_STATE[SHOT_STATE["NWAY"] = 4] = "NWAY";
    SHOT_STATE[SHOT_STATE["ALL_DIRECTION"] = 5] = "ALL_DIRECTION";
    SHOT_STATE[SHOT_STATE["ALL_RANGE"] = 6] = "ALL_RANGE";
    SHOT_STATE[SHOT_STATE["STATE_COUNT"] = 7] = "STATE_COUNT";
})(SHOT_STATE || (SHOT_STATE = {}));
;
// 状態遷移間隔
const STATE_INTERVAL = [999, 0, 300, 300, 900, 900, 900];
// ウジの数
const MAGGOT_COUNT = 16;
// ウジの生成位置
const MAGGOT_POSITION = [
    { x: 0, y: -12 },
    { x: 0, y: 0 },
    { x: 0, y: 12 },
    { x: 12, y: 0 },
    { x: 12, y: 12 },
    { x: 12, y: 24 },
    { x: 12, y: -12 },
    { x: 12, y: -24 },
    { x: -12, y: 0 },
    { x: -12, y: 12 },
    { x: -12, y: 24 },
    { x: -12, y: -12 },
    { x: -12, y: -24 },
    { x: -24, y: 0 },
    { x: 24, y: 12 },
    { x: 24, y: -12 },
];
// 爆発の間隔
const EXPLOSION_INTERVAL = 20;
// 移動速度
const MOVE_SPEED = 1;
// 移動角速度
const MOVE_ANGLE_VELOCITY = 0.05;
// 移動位置x座標
const MOVE_POSITION_X = [106, 168];
// 移動待機時間
const MOVE_INTERVAL = 60;
// 移動位置到達判定範囲
const MOVE_ARRIVAL_RANGE = 4;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 45;
// n-way弾の弾数
const NWAY_SHOT_COUNT = 13;
// n-way弾の角度の間隔
const NWAY_SHOT_ANGLE = Math.PI / 16;
// n-way弾のスピード
const NWAY_SHOT_SPEED = 0.5;
// 矢印弾の待機時間
const ARROW_SHOT_WAIT = 150;
// 矢印弾の発射時間
const ARROW_SHOT_TIME = 60;
// 矢印弾の発射間隔
const ARROW_SHOT_INTERVAL = 60;
// 矢印弾の数
const ARROW_SHOT_COUNT = 5;
// 矢印弾のスピード
const ARROW_SHOT_SPEED = [0.5, 0.6, 0.7, 0.8, 0.9];
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 20;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 8;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.5;
// 全方位弾の回転スピード
const ALL_DIRECTION_ROTATION_SPEED = 0.1;
// 全画面弾の発射間隔
const ALL_RANGE_INTERVAL = 60;
// 全画面弾の弾の位置の間隔
const ALL_RANGE_POSITION_INTERVAL = 25;
// 全画面弾のスピード
const ALL_RANGE_SPEED = 0.4;
// 全画面弾の発射位置移動スピード
const ALL_RANGE_POSITION_SPEED = 1.5;
// 3-way弾発射間隔
const N3WAY_INTERVAL = 90;
// 3-way弾スピード
const N3WAY_SHOT_SPEED = 0.5;
// 縦方向の移動範囲の画面端からの距離
const MAX_MOVE_RANGE_FROM_EDGE = 48;
/**
 * 敵キャラ、ハエ。
 */
class Fly extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'fly', param, scene);
        // 各変数を初期化する。
        this._shotInterval = [0, 0, 0];
        this._stateInterval = 0;
        this._explosionInterval = 0;
        this._nextPositionX = 0;
        this._nextPositionY = 0;
        this._allDirectionAngle = 0;
        this._allRangePosition = 0;
        this._moveWait = 0;
        this._speedX = 0;
        this._speedY = 0;
        // 初期弾発射状態は待機状態とする。
        this._shotState = SHOT_STATE.WAIT;
        // 画像を非表示にする。
        this._sprite.alpha = 0;
        // 初期状態では当たり判定処理が行われないようにキャラクター種別をエフェクトにしておく。
        this.type = __WEBPACK_IMPORTED_MODULE_6__character__["a" /* default */].type.EFFECT;
        // ウジを作成する。
        let animationFrame = 0;
        for (let i = 0; i < MAGGOT_COUNT; i++) {
            // ウジを作成する。
            const maggot = __WEBPACK_IMPORTED_MODULE_3__enemyfactory__["a" /* default */].create(x + MAGGOT_POSITION[i].x, y + MAGGOT_POSITION[i].y, 'maggot', scene);
            if (maggot && maggot instanceof __WEBPACK_IMPORTED_MODULE_4__maggot__["a" /* default */]) {
                // シーンに追加する。
                scene.addCharacter(maggot);
                // 動きがバラバラになるようにアニメーションフレームを設定する。
                maggot.setAnimationFrame(animationFrame);
                animationFrame += 3;
                animationFrame %= 30;
                // それぞれの動作を変える。
                maggot.shotType = i;
                // 親オブジェクトを設定する。
                maggot.parent = this;
            }
        }
        // ウジの数を初期化する。
        this._maggotCount = MAGGOT_COUNT;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /** ウジの数 */
    get maggotCount() {
        return this._maggotCount;
    }
    /** ウジの数 */
    set maggotCount(value) {
        this._maggotCount = value;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 初期状態:当たり判定をなくし、画像を非常時にして、ウジを生成する。
     * 待機状態:ウジがすべて倒されるまで待機する。(無処理)
     * @param scene シーン
     */
    action(scene) {
        // 弾発射状態に応じて、弾を発射する。
        switch (this._shotState) {
            case SHOT_STATE.WAIT:// 待機状態
                // 状態が状態変化間隔をリセットする。
                this._stateInterval = 0;
                // ウジの数が0になった場合は登場する。
                if (this._maggotCount <= 0) {
                    this._shotState = SHOT_STATE.ENTRY1;
                }
                break;
            case SHOT_STATE.ENTRY1:// 登場1
                // 無処理
                break;
            case SHOT_STATE.ENTRY2:// 登場2
                // 爆発の間隔が経過している場合は爆発を発生させる。
                this._explosionInterval++;
                if (this._explosionInterval > EXPLOSION_INTERVAL) {
                    // 爆発発生位置を決める
                    const w = this._hitArea.width;
                    const h = this._hitArea.height;
                    const x = this._hitArea.x + Math.floor(Math.random() * (w * 2 + 1)) - w;
                    const y = this._hitArea.y + Math.floor(Math.random() * (h * 2 + 1)) - h;
                    // 爆発アニメーションを作成する。
                    scene.addCharacter(new __WEBPACK_IMPORTED_MODULE_5__explosion__["a" /* default */](x, y, scene));
                    this._explosionInterval = 0;
                }
                break;
            case SHOT_STATE.ENTRY3:// 登場3
                // 画像を表示する。
                if (this._sprite.alpha === 0) {
                    this._sprite.alpha = 1;
                    // キャラクター種別を敵キャラクターに戻す。
                    this.type = __WEBPACK_IMPORTED_MODULE_6__character__["a" /* default */].type.ENEMY;
                    // 登場時にBGMを変更する。
                    phina.asset.SoundManager.playMusic('lastboss');
                }
                // 次の移動位置を設定する。
                this._nextPositionX = MOVE_POSITION_X[0];
                this._nextPositionY = scene.playerPosition.y;
                // 画面端まで移動すると、回転して方向を変えるときに画面外に出てしまうため上下限を決める。
                if (this._nextPositionY < MAX_MOVE_RANGE_FROM_EDGE) {
                    this._nextPositionY = MAX_MOVE_RANGE_FROM_EDGE;
                }
                else if (this._nextPositionY > __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE) {
                    this._nextPositionY = __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE;
                }
                else {
                    // Do nothing.
                }
                break;
            case SHOT_STATE.NWAY:// n-way弾発射
                // 定周期にn-way弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > NWAY_SHOT_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), NWAY_SHOT_COUNT, NWAY_SHOT_ANGLE, NWAY_SHOT_SPEED, false, scene);
                    this._shotInterval[0] = 0;
                }
                // 矢印弾グループの待機時間が経過している場合は矢印弾を発射し始める。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > ARROW_SHOT_WAIT) {
                    // 矢印弾の発射間隔が経過している場合は弾を発射する。
                    this._shotInterval[2]++;
                    if (this._shotInterval[2] > ARROW_SHOT_INTERVAL) {
                        // 矢印弾を発射する
                        for (let i = 0; i < ARROW_SHOT_COUNT; i++) {
                            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 32.0, ARROW_SHOT_SPEED[i], false, scene);
                        }
                        this._shotInterval[2] = 0;
                    }
                    // 矢印弾の発射時間が経過している場合は矢印弾グループの発射間隔分待機する。
                    if (this._shotInterval[1] > ARROW_SHOT_TIME + ARROW_SHOT_WAIT) {
                        this._shotInterval[1] = 0;
                    }
                }
                break;
            case SHOT_STATE.ALL_DIRECTION:// 全方位弾発射
                // 全方位弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_DIRECTION_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, this._allDirectionAngle, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, -this._allDirectionAngle, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    // 角度を進める。
                    this._allDirectionAngle += ALL_DIRECTION_ROTATION_SPEED;
                    this._shotInterval[0] = 0;
                }
                // 3-way弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > N3WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 16.0, N3WAY_SHOT_SPEED, false, scene);
                    this._shotInterval[1] = 0;
                }
                break;
            case SHOT_STATE.ALL_RANGE:// 全画面弾発射
                // 全画面弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_RANGE_INTERVAL) {
                    // 上方向から下方向への弾を発射する。
                    for (let i = -this._allRangePosition; i < __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.width; i += ALL_RANGE_POSITION_INTERVAL) {
                        // 画面外の座標は飛ばす
                        if (i < 0) {
                            continue;
                        }
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay({ x: i, y: __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height - 18 }, Math.PI / 2, 1, 0, ALL_RANGE_SPEED, true, scene);
                    }
                    // 右方向から左方向への弾を発射する
                    for (let i = -this._allRangePosition; i < __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height; i += ALL_RANGE_POSITION_INTERVAL) {
                        // 画面外の座標は飛ばす
                        if (i < 0) {
                            continue;
                        }
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay({ x: __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.width, y: i }, Math.PI, 1, 0, ALL_RANGE_SPEED, true, scene);
                    }
                    // 発射位置の座標を移動する。
                    this._allRangePosition += ALL_RANGE_POSITION_SPEED;
                    this._shotInterval[0] = 0;
                }
                // 3-way弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > N3WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 16.0, N3WAY_SHOT_SPEED, false, scene);
                    this._shotInterval[1] = 0;
                }
                break;
            default:
                break;
        }
        // 登場以降は移動を行う。
        if (this._shotState > SHOT_STATE.ENTRY3) {
            // 待機時間が残っている場合
            if (this._moveWait > 0) {
                // 待機時間をカウントする。
                this._moveWait--;
                // 待機時間がなくなった場合は次の位置を設定する。
                if (this._moveWait <= 0) {
                    // x座標は2箇所を交互に設定する。
                    if (this._nextPositionX === MOVE_POSITION_X[0]) {
                        this._nextPositionX = MOVE_POSITION_X[1];
                    }
                    else {
                        this._nextPositionX = MOVE_POSITION_X[0];
                    }
                    // y座標は自機の位置を設定する。
                    this._nextPositionY = scene.playerPosition.y;
                    // 画面端まで移動すると、回転して方向を変えるときに画面外に出てしまうため上下限を決める。
                    if (this._nextPositionY < MAX_MOVE_RANGE_FROM_EDGE) {
                        this._nextPositionY = MAX_MOVE_RANGE_FROM_EDGE;
                    }
                    else if (this._nextPositionY > __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE) {
                        this._nextPositionY = __WEBPACK_IMPORTED_MODULE_7__screensize__["a" /* default */].STAGE_RECT.height - MAX_MOVE_RANGE_FROM_EDGE;
                    }
                    else {
                        // Do nothing.
                    }
                }
                // 速度を0に設定する。
                this._speedX = 0;
                this._speedY = 0;
            }
            else if (Math.abs(this._hitArea.x - this._nextPositionX) < MOVE_ARRIVAL_RANGE &&
                Math.abs(this._hitArea.y - this._nextPositionY) < MOVE_ARRIVAL_RANGE) {
                // 待機時間を設定する。
                this._moveWait = MOVE_INTERVAL;
                // 速度を0に設定する。
                this._speedX = 0;
                this._speedY = 0;
            }
            else {
                // 目的地の角度を求める。
                const destAngle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, { x: this._nextPositionX, y: this._nextPositionY });
                // 現在の角度を求める。
                const currentAngle = this.normalizeAngle((-1 * this._sprite.rotation + 90) * Math.PI / 180);
                // 回転する方向を決める。
                const rotationDirection = this.calcRotationDirection(currentAngle, destAngle);
                // 回転する方向に角度を動かす。
                let nextAngle = currentAngle + rotationDirection * MOVE_ANGLE_VELOCITY;
                if (Math.abs(currentAngle - destAngle) < MOVE_ANGLE_VELOCITY) {
                    nextAngle = destAngle;
                }
                // 画像を回転する。
                this._sprite.rotation = -1 * nextAngle * 180 / Math.PI + 90;
                // 速度を向きから決定する。
                this._speedX = Math.cos(nextAngle) * MOVE_SPEED;
                this._speedY = -1 * Math.sin(nextAngle) * MOVE_SPEED;
            }
        }
        // 移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._shotState]) {
            // 次の状態へ進める。
            this._shotState++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._shotState >= SHOT_STATE.STATE_COUNT) {
                // 登場時の次の状態とする。
                this._shotState = SHOT_STATE.ENTRY3 + 1;
            }
            // 各変数を初期化する。
            this._stateInterval = 0;
            this._shotInterval[0] = 0;
            this._shotInterval[1] = 0;
            this._shotInterval[2] = 0;
            this._explosionInterval = 0;
            this._allDirectionAngle = 0;
            this._allRangePosition = 0;
        }
        // ボスHPゲージの表示を更新する。
        if (this._hp > 0) {
            scene.bossLife = this._hp / this._maxHP;
        }
        else {
            scene.bossLife = 0;
        }
    }
    /**
     * 角度を+πから-πの間に正規化する。
     * @param angle 角度
     */
    normalizeAngle(angle) {
        // -πより小さい間はプラス方向に回転させる。
        while (angle < -Math.PI) {
            angle += 2 * Math.PI;
        }
        // +πより大きい間はマイナス方向に回転させる。
        while (angle > Math.PI) {
            angle -= 2 * Math.PI;
        }
        return angle;
    }
    /**
     * 現在の角度から見て、対象の角度が時計回りの側にあるか反時計回りの側にあるかを計算する。
     * @param srcAngle 現在の角度
     * @param destAngle 計算対象の角度
     * @return 1:反時計回り、-1:時計回り、0:直進
     */
    calcRotationDirection(srcAngle, destAngle) {
        // 現在の角度から見て入力角度が時計回りの側か反時計回りの側か調べる。
        // sin(目的角度 - 現在の角度) > 0の場合は反時計回り
        // sin(目的角度 - 現在の角度) < 0の場合は時計回り
        const destsin = Math.sin(destAngle - srcAngle);
        // 回転方向を設定する
        let rotdirect = 0;
        if (destsin > 0.0) {
            rotdirect = 1;
        }
        else if (destsin < 0.0) {
            rotdirect = -1;
        }
        else {
            // 上記判定でこのelseに入るのは入力角度が同じ向きか反対向きのときだけ。
            // 同じ向きか反対向きか調べる。
            // cos(入力角度 - 現在角度) < 0の場合は反対向き。
            // 反対向きの場合は反時計回りとする
            const destcos = Math.cos(destAngle - srcAngle);
            if (destcos < 0.0) {
                rotdirect = 1;
            }
            else {
                rotdirect = 0;
            }
        }
        return rotdirect;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Fly);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walkingcharacter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemyshot__ = __webpack_require__(2);




// 状態
const STATE = {
    WAIT: 1,
    LEFT_MOVE: 2,
};
// 移動スピード
const MOVE_SPEED = -0.5;
// ジャンプのスピード
const JUMP_SPEED = 2.0;
// 重力加速度
const GRAVITATION_ACCELERATION = 0.075;
// 左移動間隔
const LEFT_MOVE_INTERVAL = 60;
// 待機間隔
const WAIT_INTERVAL = 60;
// 弾発射間隔
const SHOT_INTERVAL = 30;
// 弾のスピード
const SHOT_SPEED = 0.75;
/**
 * 敵キャラクター、バッタ。
 */
class Grasshopper extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'grasshopper', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 状態を初期化する。
        this._state = STATE.WAIT;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 速度を初期化する。
        this._speedX = 0;
        this._speedY = 0;
        this._accelerationY = 0;
        // 上下の障害物との距離から逆さまかどうかを判定する。
        const walkingCharacter = new __WEBPACK_IMPORTED_MODULE_1__walkingcharacter__["a" /* default */]();
        this._isUpsideDown = walkingCharacter.checkUpsideDown(this._hitArea, scene);
        // 逆さまな場合は画像の上下を反転する。
        if (this._isUpsideDown) {
            this._sprite.scaleY = -1;
        }
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 地面または天井を移動する。左方向へジャンプ、着地して弾発射を繰り返す。
     * @param scene シーン
     */
    action(scene) {
        // 移動前の位置を記憶しておく。
        const prevX = this._hitArea.x;
        const prevY = this._hitArea.y;
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 左移動中の場合
        switch (this._state) {
            case STATE.LEFT_MOVE:// 左移動
                // 加速度に応じて速度を変更する。
                this._speedY += this._accelerationY;
                // 一定時間経過したら次の状態へ進める。
                this._stateChangeInterval++;
                if (this._stateChangeInterval > LEFT_MOVE_INTERVAL) {
                    // 弾発射の状態へ遷移する。
                    this._state = STATE.WAIT;
                    // 停止する。
                    this._speedX = 0;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.WAIT:// 待機
                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_INTERVAL) {
                    // 左方向へのスピードを設定する。
                    this._speedX = MOVE_SPEED;
                    // ジャンプする方向へ加速する。
                    if (this._isUpsideDown) {
                        this._speedY = JUMP_SPEED;
                    }
                    else {
                        this._speedY = -JUMP_SPEED;
                    }
                    // 重力加速度を設定する。
                    if (this._isUpsideDown) {
                        this._accelerationY = -GRAVITATION_ACCELERATION;
                    }
                    else {
                        this._accelerationY = GRAVITATION_ACCELERATION;
                    }
                    // 左移動の状態へ遷移する。
                    this._state = STATE.LEFT_MOVE;
                    // ジャンプ時の画像に切替える。
                    this._animation.gotoAndPlay('grasshopper_jump');
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            default:
                break;
        }
        // 弾発射間隔経過で自機に向かって1-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval > SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            __WEBPACK_IMPORTED_MODULE_3__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
        // 速度に応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
        // 衝突しているブロックがある場合は移動する。
        this._hitArea.collideBlock(prevX, prevY, scene.getStagePosition(), scene.getBlockMap());
        // 落ちていく方向に移動しようとして、座標が変わっていない場合は障害物に着地したものとして停止する。
        if ((!this._isUpsideDown && this._speedY > 0 && this._hitArea.y <= prevY) ||
            (this._isUpsideDown && this._speedY < 0 && this._hitArea.y >= prevY)) {
            this._speedX = 0;
            this._speedY = 0;
            this._accelerationY = 0;
            // 着地時の画像に切替える。
            this._animation.gotoAndPlay('grasshopper');
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Grasshopper);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enemyfactory__ = __webpack_require__(8);





// 状態
var STATE;
(function (STATE) {
    STATE[STATE["INIT"] = 0] = "INIT";
    STATE[STATE["FIVE_WAY_SHOT"] = 1] = "FIVE_WAY_SHOT";
    STATE[STATE["ALL_DIRECTION_SHOT"] = 2] = "ALL_DIRECTION_SHOT";
    STATE[STATE["ALL_RANGE_SHOT"] = 3] = "ALL_RANGE_SHOT";
    STATE[STATE["STATE_COUNT"] = 4] = "STATE_COUNT";
})(STATE || (STATE = {}));
;
// 状態遷移間隔
const STATE_INTERVAL = [340, 900, 900, 900];
// ハチを呼び出す間隔
const CALL_HORNET_INTERVAL = 120;
// ハチの登場位置x座標
const HORNET_X_POSITION = 192;
// ハチの登場位置y座標
const HORNET_Y_POSITION = [100, 72, 44];
// 5-way弾発射間隔
const FIVE_WAY_INTERVAL = 40;
// 5-way弾スピード
const FIVE_WAY_SHOT_SPEED = 0.5;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 60;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 24;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;
// 画面全体弾発射間隔
const ALL_RANGE_INTERVAL = 60;
// 画面全体弾の弾数
const ALL_RANGE_COUNT = 7;
// 画面全体弾のスピード
const ALL_RANGE_SPEED = 0.25;
// 画面全体弾の発射位置y座標
const ALL_RANGE_Y_POSITION = 126;
// 1-way弾発射間隔
const ONE_WAY_INTERVAL = 40;
// 1-way弾スピード
const ONE_WAY_SHOT_SPEED = 0.75;
/**
 * 敵キャラクター、ハチの巣。
 */
class Hoenycomb extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'honeycomb', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 状態を初期化する。
        this._state = STATE.INIT;
        // 全方位弾の発射角度を初期化する。
        this._allDirectionAngle = Math.PI;
        // ハチを呼び出す位置を初期化する。
        this._hornetPosition = 0;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 定周期でハチを登場させる。
     * 攻撃パターン1:5-way弾を自機に向けて発射する
     * 攻撃パターン2:全方位弾を角度を変えながら発射する
     * 攻撃パターン3:地面から上方向に画面全体に弾を発射する
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // スクロールに合わせて移動する。
                this._hitArea.x -= scene.scrollSpeed;
                break;
            case STATE.FIVE_WAY_SHOT:// 5-way弾発射
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > FIVE_WAY_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, FIVE_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                break;
            case STATE.ALL_DIRECTION_SHOT:// 全方位弾発射
                // 全方位弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_DIRECTION_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, this._allDirectionAngle, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    // 1回毎に発射する角度を変える。
                    this._allDirectionAngle += ALL_DIRECTION_ANGLE / 2;
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                break;
            case STATE.ALL_RANGE_SHOT:// 地面からの画面全体の弾発射
                // 画面全体弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > ALL_RANGE_INTERVAL) {
                    // 左端の弾の座標を計算する。
                    const x = __WEBPACK_IMPORTED_MODULE_3__screensize__["a" /* default */].STAGE_RECT.width / (ALL_RANGE_COUNT + 1);
                    // 各弾を発射する。
                    for (let i = 0; i < ALL_RANGE_COUNT; i++) {
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay({ x: x * (i + 1), y: ALL_RANGE_Y_POSITION }, Math.PI / 2, 1, 0, ALL_RANGE_SPEED, false, scene);
                    }
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 1-way弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > ONE_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, ONE_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            default:
                break;
        }
        // 初期状態以外の場合は定周期にハチを呼ぶ。
        if (this._state !== STATE.INIT) {
            this._shotInterval[2]++;
            if (this._shotInterval[2] > CALL_HORNET_INTERVAL) {
                // ハチを呼ぶ。
                const hornet = __WEBPACK_IMPORTED_MODULE_4__enemyfactory__["a" /* default */].create(HORNET_X_POSITION, HORNET_Y_POSITION[this._hornetPosition], 'hornet', scene);
                if (hornet) {
                    scene.addCharacter(hornet);
                }
                // ハチのd位置を呼ぶたびに切り替える。
                this._hornetPosition++;
                if (this._hornetPosition >= HORNET_Y_POSITION.length) {
                    this._hornetPosition = 0;
                }
                // ハチを呼び出す間隔を初期化する。
                this._shotInterval[2] = 0;
            }
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._state]) {
            // 登場時は無敵状態なので状態遷移時に防御力を0にする。
            this._defense = 0;
            // 次の状態へ進める。
            this._state++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._state >= STATE.STATE_COUNT) {
                this._state = STATE.INIT + 1;
            }
            // 弾発射間隔を初期化する。
            for (let i = 0; i < this._shotInterval.length; i++) {
                this._shotInterval[i] = 0;
            }
            // 状態遷移間隔を初期化する。
            this._stateInterval = 0;
            // 全方位弾の発射角度を初期化する。
            this._allDirectionAngle = Math.PI;
            // ハチを呼び出す位置を初期化する。
            this._hornetPosition = 0;
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
/* harmony default export */ __webpack_exports__["a"] = (Hoenycomb);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);


// 状態
var STATE;
(function (STATE) {
    STATE[STATE["MOVE_IN"] = 0] = "MOVE_IN";
    STATE[STATE["FIRE"] = 1] = "FIRE";
    STATE[STATE["MOVE_OUT"] = 2] = "MOVE_OUT"; // 退場
})(STATE || (STATE = {}));
;
// 弾の数
const SHOT_COUNT = 5;
// 弾のスピード
const SHOT_SPEED = [0.75, 0.85, 0.95, 1.05, 1.15];
// 登場時のx方向の移動スピード
const MOVE_IN_SPEED_X = -1.0;
// 退場時のx方向の移動スピード
const MOVE_OUT_SPEED_X = -1.3;
// 退場時のy方向の移動スピード
const MOVE_OUT_SPEED_Y = -0.25;
// 登場時移動フレーム数
const MOVE_IN_INTERVAL = 30;
// 弾発射までの待機フレーム数
const WAIT_FOR_FIRE_INTERVAL = 6;
// 退場までの待機フレーム数
const WAIT_FOR_MOVE_OUT_INTERVAL = 12;
/**
 * 敵キャラクター、ハチ。
 */
class Hornet extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'hornet', param, scene);
        // 初期状態は左移動とする。
        this._state = STATE.MOVE_IN;
        // 状態変化間隔を初期化する。
        this._stateChangeInterval = 0;
        // 登場時のx方向の移動速度は固定とする。
        this._speedX = MOVE_IN_SPEED_X;
        // 登場時のy方向の移動速度は自機の位置に到達できるように設定する。
        this._speedY = (scene.playerPosition.y - this._hitArea.y) / MOVE_IN_INTERVAL;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 画面上半分から登場するときは左下に向かって一定時間進み、一時停止して弾を発射、その後左上に向かって飛んで行く。
     * 画面下半分から登城するときは左上に向かって一定時間進み、あとの処理は同じ。
     * 弾は5種類のスピードの弾を左方向に発射する。
     * @param scene シーン
     */
    action(scene) {
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.MOVE_IN:// 登場
                // 登場移動時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > MOVE_IN_INTERVAL) {
                    // 停止する。
                    this._speedX = 0;
                    this._speedY = 0;
                    // 弾発射の状態へ遷移する。
                    this._state = STATE.FIRE;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.FIRE:// 弾発射
                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_FOR_FIRE_INTERVAL) {
                    // 左へ5種類の弾を発射する。
                    for (let i = 0; i < SHOT_COUNT; i++) {
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 3, Math.PI / 32, SHOT_SPEED[i], false, scene);
                    }
                    // 退場の状態へ遷移する。
                    this._state = STATE.MOVE_OUT;
                    // 状態変化間隔を初期化する。
                    this._stateChangeInterval = 0;
                }
                break;
            case STATE.MOVE_OUT:// 退場
                // 待機時間が経過している場合
                this._stateChangeInterval++;
                if (this._stateChangeInterval > WAIT_FOR_MOVE_OUT_INTERVAL) {
                    // 左上へ移動する。
                    this._speedX = MOVE_OUT_SPEED_X;
                    this._speedY = MOVE_OUT_SPEED_Y;
                    this._stateChangeInterval = 0;
                }
                break;
            default:
                break;
        }
        // 速度に応じて移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Hornet);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localizer__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__frame__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pointdevice__ = __webpack_require__(11);





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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagelayer__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__titlescene__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__howtoplaypage__ = __webpack_require__(48);



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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);



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
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'ladybug', param, scene);
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
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Ladybug);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mycolor_js__ = __webpack_require__(6);
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
    /** 残機 */
    get life() {
        return this._life;
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__titlescene__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__labelareaex__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pixilayer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pixisprite__ = __webpack_require__(28);







window.debug = {};
// phina.defineしかないソースが取り込まれるようにダミー変数を使用する。
__WEBPACK_IMPORTED_MODULE_4__labelareaex__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_5__pixilayer__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_6__pixisprite__["a" /* default */];
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
        'image_32x32': './images/image_32x32.png',
        'image_64x64': './images/image_64x64.png',
        'howtoimage': './images/howtoimage.png',
    },
    spritesheet: {
        'image_8x8_ss': './images/image_8x8_ss.json',
        'image_16x16_ss': './images/image_16x16_ss.json',
        'image_32x32_ss': './images/image_32x32_ss.json',
        'image_64x64_ss': './images/image_64x64_ss.json',
    },
    sound: {
        'stage1': './sound/stage1.mp3',
        'stage2': './sound/stage2.mp3',
        'stage3': './sound/stage3.mp3',
        'stage4': './sound/stage4.mp3',
        'stage5': './sound/stage5.mp3',
        'stage6': './sound/stage6.mp3',
        'boss': './sound/boss.mp3',
        'lastboss': './sound/lastboss.mp3',
        'clear': './sound/clear.mp3',
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(3);




// 弾発射状態
var SHOT_STATE;
(function (SHOT_STATE) {
    SHOT_STATE[SHOT_STATE["NO_SHOT"] = 0] = "NO_SHOT";
    SHOT_STATE[SHOT_STATE["ARC_SHOT"] = 1] = "ARC_SHOT";
    SHOT_STATE[SHOT_STATE["BURST_SHOT"] = 2] = "BURST_SHOT";
    SHOT_STATE[SHOT_STATE["NWAY_SHOT"] = 3] = "NWAY_SHOT";
    SHOT_STATE[SHOT_STATE["STATE_COUNT"] = 4] = "STATE_COUNT";
})(SHOT_STATE || (SHOT_STATE = {}));
;
// Y座標位置、地面の高さ + キャラクター高さ / 2で地面の上に乗っているようにする。
const POS_Y = __WEBPACK_IMPORTED_MODULE_1__screensize__["a" /* default */].STAGE_RECT.height - 16 - 64 / 2;
// 状態遷移間隔
const STATE_INTERVAL = [340, 900, 900, 900];
// 手の位置、x座標
const HAND_POSITION_X = -24;
// 手の位置、y座標
const HAND_POSITION_Y = -24;
// 定周期弾の発射間隔
const CYCLE_SHOT_INTERVAL = 60;
// 定周期弾の弾数
const CYCLE_SHOT_COUNT = 3;
// 定周期弾の角度の間隔
const CYCLE_SHOT_ANGLE = Math.PI / 8;
// 定周期弾のスピード
const CYCLE_SHOT_SPEED = 1.0;
// 弧形段の弾数
const ARC_SHOT_COUNT = 9;
// 弧形弾の配置位置
const ARC_SHOT_POSITION = [
    { x: 0, y: 0 },
    { x: 3, y: 6 },
    { x: 7, y: 12 },
    { x: 12, y: 17 },
    { x: 18, y: 21 },
    { x: -1, y: -7 },
    { x: 0, y: -14 },
    { x: 2, y: -21 },
    { x: 6, y: -27 }
];
// 弧形弾の発射待機時間
const ARC_SHOT_WAIT_INTERVAL = 90;
// 弧形弾の発射間隔
const ARC_SHOT_INTERVAL = 60;
// 弧形弾のスピード
const ARC_SHOT_SPEED = 0.75;
// 破裂弾の発射待機時間
const BURST_SHOT_WAIT_INTERVAL = 90;
// 破裂弾の発射間隔
const BURST_SHOT_INTERVAL = 60;
// 破裂弾の破裂前のスピード
const BURST_SHOT_BEFORE_SPEED = 0.75;
// 破裂弾の破裂後のスピード
const BURST_SHOT_AFTER_SPEED = 1.25;
// 破裂弾の破裂までの間隔
const BURST_SHOT_BURST_INTERVAL = 80;
// 破裂弾の弾数
const BURST_SHOT_COUNT = 12;
// 破裂弾の各弾の間隔
const BURST_SHOT_ANGLE_INTERVAL = Math.PI / 6.0;
// n-way弾の待機間隔
const NWAY_SHOT_WAIT_INTERVAL = 90;
// n-way弾の発射間隔
const NWAY_SHOT_INTERVAL = 20;
// n-way弾のスピード
const NWAY_SHOT_SPEED = 0.75;
// n-way弾の弾数
const NWAY_COUNT = [9, 10];
// n-way弾の角度の間隔
const NWAY_ANGLE_INTERVAL = Math.PI / 10.0;
// 画像名称
const SPRITE_NAME = ["mantis", "mantis_uphand_1", "mantis_uphand_2"];
/**
 * 敵キャラ、カマキリ。
 */
class Mantis extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'mantis', param, scene);
        // y座標を設定する。
        this._hitArea.y = POS_Y;
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 初期弾発射状態は弾発射なしとする。
        this._shotState = SHOT_STATE.NO_SHOT;
        // 最初は腕を上げていない状態とする。
        this._upArmNum = 0;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * スクロールに応じて移動する。攻撃パターンの状態にかかわらず、常に3-way弾を発射する。
     * 攻撃の前に鎌を振り上げ、攻撃と同時に鎌を片方ずつ下ろすアニメーションを行う。
     * 攻撃パターン1:弧の形に並んだ弾を自機に向けて発射する。
     * 攻撃パターン2:塊弾を自機に向けて発射する。自機の位置に到達すると塊弾は12-way弾として弾ける。
     * 攻撃パターン3:9-way弾と10-way弾を短い間隔で連続で発射する。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 弾発射状態に応じて、弾を発射する。
        switch (this._shotState) {
            case SHOT_STATE.ARC_SHOT:// 弧形弾発射
                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {
                    // 弧形弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > ARC_SHOT_WAIT_INTERVAL) {
                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                else {
                    // 弧形弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > ARC_SHOT_INTERVAL) {
                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                        // 弧形弾を発射する。
                        __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireGroupShot(this._hitArea, ARC_SHOT_POSITION, ARC_SHOT_COUNT, ARC_SHOT_SPEED, scene);
                    }
                }
                break;
            case SHOT_STATE.BURST_SHOT:// 破裂弾発射
                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {
                    // 弧形弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > BURST_SHOT_WAIT_INTERVAL) {
                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                else {
                    // 弧形弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > BURST_SHOT_INTERVAL) {
                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                        // 破裂弾を発射する。
                        const position = {
                            x: this._hitArea.x + HAND_POSITION_X,
                            y: this._hitArea.y + HAND_POSITION_Y,
                        };
                        __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireBurstShot(position, BURST_SHOT_COUNT, BURST_SHOT_ANGLE_INTERVAL, BURST_SHOT_BEFORE_SPEED, BURST_SHOT_BURST_INTERVAL, BURST_SHOT_AFTER_SPEED, scene);
                    }
                }
                break;
            case SHOT_STATE.NWAY_SHOT:// n-way弾発射
                // まだ腕を上げていない場合
                if (this._upArmNum === 0) {
                    // n-way弾の待機時間が経過したら腕を振り上げる。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > NWAY_SHOT_WAIT_INTERVAL) {
                        // 振り上げている腕の数を2とする。
                        this._upArmNum = 2;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                }
                else {
                    // n-way弾の発射間隔が経過したら弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > NWAY_SHOT_INTERVAL) {
                        // 振り上げている腕の数を一つ減らす。
                        this._upArmNum--;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                        // 破裂弾を発射する。
                        const position = {
                            x: this._hitArea.x + HAND_POSITION_X,
                            y: this._hitArea.y + HAND_POSITION_Y,
                        };
                        __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(position, __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), NWAY_COUNT[1 - this._upArmNum], NWAY_ANGLE_INTERVAL, NWAY_SHOT_SPEED, false, scene);
                    }
                }
                break;
            default:
                break;
        }
        // 初期状態以外の場合は定周期に3-way弾を発射する。
        if (this._shotState !== SHOT_STATE.NO_SHOT) {
            this._shotInterval[1]++;
            if (this._shotInterval[1] > CYCLE_SHOT_INTERVAL) {
                __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), CYCLE_SHOT_COUNT, CYCLE_SHOT_ANGLE, CYCLE_SHOT_SPEED, false, scene);
                this._shotInterval[1] = 0;
            }
        }
        // 振り上げている腕の数に応じてグラフィックを変更する。
        this._animation.gotoAndPlay(SPRITE_NAME[this._upArmNum]);
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._shotState]) {
            // 登場時は無敵状態なので状態遷移時に防御力を0にする。
            this._defense = 0;
            // 次の状態へ進める。
            this._shotState++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._shotState >= SHOT_STATE.STATE_COUNT) {
                // 登場時の次の状態とする。
                this._shotState = 1;
            }
            // 状態遷移間隔、弾発射間隔を初期化する。
            this._stateInterval = 0;
            this._shotInterval[0] = 0;
            this._shotInterval[1] = 0;
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
/* harmony default export */ __webpack_exports__["a"] = (Mantis);


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__labelbutton__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursor__ = __webpack_require__(18);




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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collider__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playershot__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playerdeatheffect__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__playeroption__ = __webpack_require__(57);






// キーボード入力による移動スピード
const SPEED_BY_KEY = 2;
// タッチ操作による移動スピード
const SPEED_BY_TOUCH = 1.8 / __WEBPACK_IMPORTED_MODULE_0__screensize__["a" /* default */].ZOOM_RATIO;
// ゲームパッドによる移動スピード
const SPEED_BY_GAMEPAD = 3;
// 自機弾発射間隔
const SHOT_INTERVAL = 12;
// 当たり判定幅
const HIT_WIDTH = 2;
// 当たり判定高さ
const HIT_HEIGHT = 2;
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
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
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
        // シーンの状態がプレイ中の場合のみ、自機発射や当たり判定等の処理を行う。
        if (scene.isPlaying) {
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
                    this.addChickenGauge(-CONSUMPTION_GAUGE);
                }
            }
            // 通常状態の場合
            if (this._status === STATUS.NORMAL) {
                // 敵キャラとの当たり判定処理を行う。
                this._checkHitChacater(scene);
            }
        }
        // オプション個数を更新する。
        this._updateOptionCount(scene);
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
     * チキンゲージを増加する。
     * @param increase 増加量（マイナスの場合、減少）
     * @return 自インスタンス
     */
    addChickenGauge(increase) {
        this._chickenGauge += increase;
        // 下限値を下回った場合は下限値にする。
        if (this._chickenGauge < 0) {
            this._chickenGauge = 0;
        }
        // 上限値を超えた場合は上限値にする。
        if (this._chickenGauge > 1) {
            this._chickenGauge = 1;
        }
        return this;
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
        // 衝突しているブロックがある場合は移動する。
        this._hitArea.collideBlock(prevX, prevY, scene.getStagePosition(), scene.getBlockMap());
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
                scene.removeCharacter(topCharacter);
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
                this.addChickenGauge(character.graze());
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(5);
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
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
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
        }
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collider__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playershot__ = __webpack_require__(24);
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
        this._sprite = new phina.pixi.Sprite('image_16x16', 16, 16);
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
        // シーンの状態がプレイ中の場合のみ、自機発射や当たり判定等の処理を行う。
        if (scene.isPlaying) {
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
        }
        // 座標をスプライトに適用する。
        this._sprite.setPosition(Math.floor(this._hitArea.x), Math.floor(this._hitArea.y));
    }
    /**
     * シーンから取り除く。
     */
    remove() {
        this._sprite.remove();
        return this;
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pointdevice__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mycolor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screensize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controlsize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__character__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__life__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chickengauge__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bosslifegauge__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shieldbutton__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__titlescene__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__menulayer__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__imagebutton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__stagestatus__ = __webpack_require__(64);














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
// ゲームオーバーラベルの配置位置y座標
const GAMEOVER_LABEL_POS_Y = Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO / 2);
// 初期ステージ番号
const INITIAL_STAGE = 1;
// ステージ数
const STAGE_COUNT = 6;
// ステージクリア後の待機フレーム数
const STAGE_CLEAR_WAIT = 540;
// ステージクリアラベルの配置位置y座標
const STAGE_CLEAR_LABEL_POS_Y = Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO / 2);
// シーンの状態
var SCENE_STATE;
(function (SCENE_STATE) {
    SCENE_STATE[SCENE_STATE["PLAYING"] = 0] = "PLAYING";
    SCENE_STATE[SCENE_STATE["WAIT_GAMEOVER"] = 1] = "WAIT_GAMEOVER";
    SCENE_STATE[SCENE_STATE["GAMEOVER"] = 2] = "GAMEOVER";
    SCENE_STATE[SCENE_STATE["PAUSE"] = 3] = "PAUSE";
    SCENE_STATE[SCENE_STATE["QUIT_MENU"] = 4] = "QUIT_MENU";
    SCENE_STATE[SCENE_STATE["STAGE_CLEAR"] = 5] = "STAGE_CLEAR";
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
        this._characterLayer = new phina.display.PixiLayer({
            width: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH,
            height: __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT
        }).addChildTo(this._rootNode);
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
        this._lifeLabel = new __WEBPACK_IMPORTED_MODULE_6__life__["a" /* default */]();
        // 残機表示の位置を設定する。
        this._lifeLabel.sprite.addChildTo(this._infoLayer);
        this._lifeLabel.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO + LIFE_POS_X;
        this._lifeLabel.sprite.y = LIFE_POS_Y;
        // 残機を初期化する。
        this._lifeLabel.life = INITIAL_LIFE;
        // シールドボタンを作成する。
        this._shieldButton = new __WEBPACK_IMPORTED_MODULE_9__shieldbutton__["a" /* default */]();
        // シールドボタンの位置を設定する。
        this._shieldButton.sprite.addChildTo(this._infoLayer);
        this._shieldButton.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH - SHIELD_BUTTON_POS_X;
        this._shieldButton.sprite.y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT - SHIELD_BUTTON_POS_Y;
        // 一時停止ボタンを作成する。
        this._pauseButton = new __WEBPACK_IMPORTED_MODULE_12__imagebutton__["a" /* default */]('pauseButton')
            .setPosition(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_WIDTH - PUASE_BUTTON_POS_X, PAUSE_BUTTON_POS_Y)
            .onPush(() => { this._pause(); })
            .addChildTo(this._infoLayer);
        // チキンゲージを作成する。
        this._chickenGauge = new __WEBPACK_IMPORTED_MODULE_7__chickengauge__["a" /* default */]();
        // チキンゲージの位置を設定する。
        this._chickenGauge.sprite.addChildTo(this._infoLayer);
        this._chickenGauge.sprite.x = Math.round(this._phinaScene.gridX.center());
        this._chickenGauge.sprite.y = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].SCREEN_HEIGHT - CHICKEN_GAUGE_POS_Y;
        // ボスHPゲージを作成する。
        this._bossLifeGauge = new __WEBPACK_IMPORTED_MODULE_8__bosslifegauge__["a" /* default */]();
        // ボスHPゲージの位置を設定する。
        this._bossLifeGauge.sprite.addChildTo(this._infoLayer);
        this._bossLifeGauge.sprite.x = __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.x * __WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].ZOOM_RATIO + BOSS_LIFE_GAUGE_POS_X;
        this._bossLifeGauge.sprite.y = BOSS_LIFE_GAUGE_POS_Y;
        // ボスHPゲージは初期状態は非表示にする。
        this._bossLifeGauge.sprite.alpha = 0;
        // 復活待機フレーム数を初期化する。
        this._rebirthWait = 0;
        // キャラクター管理配列を作成する。
        this._characters = [];
        // 自機を作成する。
        this._player = new __WEBPACK_IMPORTED_MODULE_5__player__["a" /* default */](Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.width / 4), Math.round(__WEBPACK_IMPORTED_MODULE_2__screensize__["a" /* default */].STAGE_RECT.height / 2), this);
        // タッチ情報を初期化する。
        this._touch = { id: -1, x: 0, y: 0 };
        // 自機弾衝突フラグを初期化する。
        this._isHitPlayerShot = false;
        // 自機弾衝突音発生間隔を初期化する。
        this._hitPlayerShotInterval = HIT_PLAYER_SHOT_INTERVAL;
        // 一時停止レイヤーを作成する。
        this._pauseLayer = new __WEBPACK_IMPORTED_MODULE_11__menulayer__["a" /* default */]('PAUSE', 'RESUME', 'QUIT')
            .onLeftButton(() => { this._resume(); })
            .onRightButton(() => { this._viewQuitMenu(); });
        // 終了メニュー時のレイヤーを作成する。
        this._quitLayer = new __WEBPACK_IMPORTED_MODULE_11__menulayer__["a" /* default */]('QUIT GAME?', 'YES', 'NO')
            .onLeftButton(() => { this._replaceScene(); })
            .onRightButton(() => { this._viewPauseMenu(); });
        // ステージクリア時のラベルを作成する。
        this._stageClearLabel = new phina.display.Label({
            text: 'STAGE CLEAR',
            fontSize: 36,
            backgroundColor: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].BACK_COLOR,
            fill: __WEBPACK_IMPORTED_MODULE_1__mycolor__["a" /* default */].FORE_COLOR,
            fontFamily: 'noto',
            x: Math.round(this._phinaScene.gridX.center()),
            y: STAGE_CLEAR_LABEL_POS_Y,
            strokeWidth: 0,
            padding: 0,
        });
        // 初期ステージを読み込む。
        if (localStorage.initialStage) {
            this._stageStatus = new __WEBPACK_IMPORTED_MODULE_13__stagestatus__["a" /* default */](parseInt(localStorage.initialStage, 10), this._backgroundLayer);
        }
        else {
            this._stageStatus = new __WEBPACK_IMPORTED_MODULE_13__stagestatus__["a" /* default */](INITIAL_STAGE, this._backgroundLayer);
        }
        // 初期状態はプレイ中とする。
        this._state = SCENE_STATE.PLAYING;
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
        // プレイ中でステージクリアフラグがたっている場合は状態を遷移する。
        if (this._state === SCENE_STATE.PLAYING && this._stageStatus.isStageCleared) {
            // ステージクリアのジングルを再生する。
            phina.asset.SoundManager.playMusic('clear', 0, false);
            // 状態をステージクリアに遷移する。
            this._changeState(SCENE_STATE.STAGE_CLEAR);
        }
        // 入力処理を行う。
        this._input(app);
        // プレイ中、待機中、ステージクリアの場合
        if (this._state === SCENE_STATE.PLAYING ||
            this._state === SCENE_STATE.WAIT_GAMEOVER ||
            this._state === SCENE_STATE.STAGE_CLEAR) {
            // ステージやキャラクターの状態を更新する。
            this._updateStageData();
        }
        // チキンゲージ表示を更新する。
        this._chickenGauge.rate = this._player.chickenGauge;
        // スコア表示を更新する。
        this._scoreLabel.text = 'SCORE: ' + ('000000' + this._score).slice(-6);
        // ステージクリア状態の場合
        if (this._state === SCENE_STATE.STAGE_CLEAR) {
            // 自機が死んでいない場合
            if (this._rebirthWait <= 0) {
                // ステージクリア後待機時間を経過した場合は次のステージへ移行する。
                if (this._stageStatus.isOverStageClearWait) {
                    // 最終ステージでない場合
                    if (this._stageStatus.stageNumber < STAGE_COUNT) {
                        // ステージを一つ進める。
                        this._setStage(this._stageStatus.stageNumber + 1);
                    }
                    else {
                        // 1ステージに戻る。
                        this._setStage(1);
                    }
                    // プレイ中状態に遷移する。
                    this._changeState(SCENE_STATE.PLAYING);
                }
            }
        }
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
        // シーン中のキャラクター配列から削除する。
        const i = this._characters.indexOf(character);
        if (i >= 0) {
            this._characters.splice(i, 1);
        }
        // キャラクターの削除処理を行う。
        character.remove();
    }
    /**
     * スコアを追加する。
     * @param score 追加するスコア
     */
    addScore(score) {
        this._score += score;
    }
    /**
     *
     * @param increase
     */
    addChickenGauge(increase) {
        this._player.addChickenGauge(increase);
    }
    /**
     * ブロックマップを取得する。
     * @return ブロックマップ
     */
    getBlockMap() {
        return this._stageStatus.blockMap;
    }
    /**
     * ステージが左方向に何ドット移動しているかを取得する。
     * @return ステージ位置
     */
    getStagePosition() {
        return this._stageStatus.position;
    }
    /** ステージのスクロールスピード */
    get scrollSpeed() {
        return this._stageStatus.scrollSpeed;
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
    /** プレイ中状態かどうか。 */
    get isPlaying() {
        if (this._state === SCENE_STATE.PLAYING) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 自機が死亡したときの処理を行う。
     * 残機が残っていれば、残機を一つ減らし、自機を復活する。
     * 残機が残っていなければゲームオーバー処理を行う。
     */
    miss() {
        // 残機が残っている場合
        if (this._lifeLabel.life > 0) {
            // 残機を一つ減らす。
            this._lifeLabel.life = this._lifeLabel.life - 1;
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
     * ステージクリア時の処理を行う。
     */
    stageClear() {
        // ステージ状態をクリア状態にする。
        this._stageStatus.stageClear();
    }
    /**
     * 入力処理を行う。
     * @param app アプリケーション
     */
    _input(app) {
        // 状態に応じて入力処理を振り分ける。
        switch (this._state) {
            case SCENE_STATE.PLAYING:
            case SCENE_STATE.STAGE_CLEAR:
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
        // プレイ中の場合はシールドと一時停止の処理を行う。
        // その他の状態のときはキャラクターの移動のみ許可する。
        if (this._state === SCENE_STATE.PLAYING) {
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
        else {
            this._player.shield = false;
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
                this.removeCharacter(character);
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
            y: GAMEOVER_LABEL_POS_Y,
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
        this._stageStatus.update(this);
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
        this._phinaScene.scene = new __WEBPACK_IMPORTED_MODULE_10__titlescene__["a" /* default */](this._phinaScene, this._gamepadManager);
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
        // 状態に応じてキャラクターのアニメーションを行うかどうかを切り替える。
        if (state === SCENE_STATE.PLAYING ||
            state === SCENE_STATE.WAIT_GAMEOVER ||
            state === SCENE_STATE.STAGE_CLEAR) {
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
        // ステージクリアの場合はラベルを表示する。
        if (state === SCENE_STATE.STAGE_CLEAR) {
            this._stageClearLabel.addChildTo(this._infoLayer);
        }
        else {
            this._stageClearLabel.remove();
        }
        // メンバ変数を変更する。
        this._state = state;
    }
    /**
     * ステージ情報を読み込む。
     * @param stageNumber ステージ番号
     */
    _setStage(stageNumber) {
        // 現在のステージを画面から取り除く。
        this._stageStatus.remove();
        // ステージ情報を作成する。
        this._stageStatus = new __WEBPACK_IMPORTED_MODULE_13__stagestatus__["a" /* default */](stageNumber, this._backgroundLayer);
        // ボスHPゲージを非表示にする。
        this._bossLifeGauge.sprite.alpha = 0;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PlayingScene);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(3);



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
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'rhinocerosbeetle', param, scene);
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
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay({
                        x: this._hitArea.x,
                        y: this._hitArea.y - LEFT_SHOT_POSITION,
                    }, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay({
                        x: this._hitArea.x,
                        y: this._hitArea.y + LEFT_SHOT_POSITION,
                    }, Math.PI, 1, 0, LEFT_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 1-way弾の弾発射間隔が経過している場合は弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] >= LEFT_SHOT_1WAY_INTERVAL) {
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, LEFT_SHOT_1WAY_SPEED, false, scene);
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
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util_js__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), NWAY_COUNT, NWAY_ANGLE, NWAY_SPEED, false, scene);
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
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
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
/* 60 */
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
        // 初期値は有効とする。
        this._enable = true;
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walkingcharacter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(3);




// 弾のスピード
const SHOT_SPEED = 0.5;
// 移動スピード
const MOVE_SPEED = 0.1;
// 弾発射間隔
const SHOT_INTERVAL = 90;
/**
 * 敵キャラクター、カタツムリ。
 */
class Snail extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'snail', param, scene);
        // 弾発射間隔を初期化する。
        this._shotInterval = 0;
        // 上下の障害物との距離から逆さまかどうかを判定する。
        const walkingCharacter = new __WEBPACK_IMPORTED_MODULE_1__walkingcharacter__["a" /* default */]();
        this._isUpsideDown = walkingCharacter.checkUpsideDown(this._hitArea, scene);
        // 逆さまな場合は画像の上下を反転する。
        if (this._isUpsideDown) {
            this._sprite.scaleY = -1;
        }
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * @param scene シーン
     */
    action(scene) {
        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
        // 左へ移動する。
        this._hitArea.x -= MOVE_SPEED;
        // 弾発射間隔が経過したら自機へ向けて1-way弾を発射する。
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            __WEBPACK_IMPORTED_MODULE_2__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 8, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
        // 障害物との衝突判定を行う。
        const walkingCharacter = new __WEBPACK_IMPORTED_MODULE_1__walkingcharacter__["a" /* default */]();
        walkingCharacter.checkBlockHit(this._hitArea, this._isUpsideDown, scene);
        // 移動後の位置にキャラクターを移動する。
        this._hitArea.x = walkingCharacter.movePosition.x;
        this._hitArea.y = walkingCharacter.movePosition.y;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Snail);


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);



// 状態
var STATE;
(function (STATE) {
    STATE[STATE["INIT"] = 0] = "INIT";
    STATE[STATE["NWAY_SHOT"] = 1] = "NWAY_SHOT";
    STATE[STATE["NET_SHOT"] = 2] = "NET_SHOT";
    STATE[STATE["MOVE_TO_CENTER"] = 3] = "MOVE_TO_CENTER";
    STATE[STATE["SIEGE"] = 4] = "SIEGE";
    STATE[STATE["COUNT"] = 5] = "COUNT"; // 状態の種類の数
})(STATE || (STATE = {}));
;
// 状態遷移間隔
const STATE_INTERVAL = [999, 900, 900, 90, 900];
// 移動位置
const MOVE_POSITION = [
    { x: 152, y: 48 },
    { x: 106, y: 96 },
    { x: 106, y: 48 },
    { x: 152, y: 96 },
];
// 蜘蛛の巣弾発射時の位置
const MOVE_POSITION_OF_SIEGE = { x: 129, y: 72 };
// 移動スピード
const MOVE_SPEED = 1.0;
// 移動位置変更の間隔
const MOVE_INTERVAL = 10;
// 3-way弾発射間隔
const N3_WAY_INTERVAL = 40;
// 3-way弾スピード
const N3_WAY_SHOT_SPEED = 0.75;
// 5-way弾発射間隔
const N5_WAY_INTERVAL = 40;
// 5-way弾スピード
const N5_WAY_SHOT_SPEED = 0.5;
// 蜘蛛の巣弾の各弾の配置位置
const NET_SHOT_POSITION = [
    { x: 0, y: 3 }, { x: 0, y: 10 }, { x: 0, y: 17 }, { x: 0, y: 24 },
    { x: 0, y: -3 }, { x: 0, y: -10 }, { x: 0, y: -17 }, { x: 0, y: -24 },
    { x: 6, y: 5 }, { x: 6, y: 21 }, { x: 6, y: -5 }, { x: 6, y: -21 },
    { x: -6, y: 5 }, { x: -6, y: 21 }, { x: -6, y: -5 }, { x: -6, y: -21 },
    { x: 11, y: 9 }, { x: 11, y: 17 }, { x: 11, y: -9 }, { x: 11, y: -17 },
    { x: -11, y: 9 }, { x: -11, y: 17 }, { x: -11, y: -9 }, { x: -11, y: -17 },
    { x: 16, y: 13 }, { x: 19, y: 7 }, { x: 16, y: -13 }, { x: 19, y: -7 },
    { x: -16, y: 13 }, { x: -19, y: 7 }, { x: -16, y: -13 }, { x: -19, y: -7 },
    { x: 21, y: 0 }, { x: -21, y: 0 }
];
// 蜘蛛の巣弾発射間隔
const NET_SHOT_INTERVAL = 90;
// 蜘蛛の巣弾のスピード
const NET_SHOT_SPEED = 0.5;
// 全方位弾の発射間隔
const ALL_DIRECTION_INTERVAL = 30;
// 全方位弾の弾数
const ALL_DIRECTION_COUNT = 12;
// 全方位弾の角度の間隔
const ALL_DIRECTION_ANGLE = 2 * Math.PI / ALL_DIRECTION_COUNT;
// 全方位弾のスピード
const ALL_DIRECTION_SPEED = 0.75;
// 包囲弾の発射間隔
const SIEGE_SHOT_INTERVAL = 5;
// 包囲弾のスピード
const SIEGE_SHOT_SPEED = 1.25;
// 包囲弾の初期角度
const SIEGE_SHOT_START_ANGLE = Math.PI * 3.0 / 4.0;
// 包囲弾の最終角度
const SIEGE_SHOT_END_ANGLE = Math.PI / 8.0;
// 包囲弾の角度変更スピード
const SIEGE_SHOT_ANGLE_SPEED = 0.2;
// 包囲弾の1-way弾発射間隔
const N1_WAY_INTERVAL = 80;
// 包囲弾の1-way弾スピード
const N1_WAY_SHOT_SPEED = 0.4;
// 包囲弾内のグループ弾発射間隔
const GROUP_SHOT_INTERVAL = 40;
// 包囲弾内のグループ弾スピード
const GROUP_SHOT_SPEED = 1.0;
// 包囲弾内のグループ弾の弾数
const GROUP_SHOT_COUNT = 4;
// 包囲弾内のグループ弾の位置
const GROUP_SHOT_POSITION = [
    { x: 0, y: 4 }, { x: 0, y: -4 }, { x: 4, y: 0 }, { x: -4, y: 0 }
];
/**
 * 敵キャラクター、クモ。
 */
class Spider extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'spider', param, scene);
        // 状態を初期化する。
        this._state = STATE.INIT;
        // 移動先番号を初期化する。
        this._movePosIndex = 0;
        // 移動間隔を初期化する。
        this._moveInterval = 0;
        // 包囲弾の角度を初期化する。
        this._siegeAngle = 0;
        // 弾発射間隔を初期化する。
        this._shotInterval = [0, 0, 0];
        // 状態遷移間隔を初期化する。
        this._stateInterval = 0;
        // 初期HPを最大値として記憶しておく。
        this._maxHP = this._hp;
        // ボスHPゲージを満タンで表示する。
        scene.bossLife = 1;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 攻撃パターン1:
     *     右上、左下、左上、右下、右上と移動しながら弾を撃つ。
     *     高速な3-way弾と低速な13-way弾を発射する。
     * 攻撃パターン2:
     *     右上、左下、左上、右下、右上と移動しながら弾を撃つ。
     *     全方位弾と蜘蛛の巣状の弾を発射する。
     * 攻撃パターン3:
     *     自機に向けて2-way弾を隙間なく発射。その間に円形のグループ弾を発射する。
     * @param scene シーン
     */
    action(scene) {
        let nextPosition = { x: 0, y: 0 };
        // 状態によって処理を分岐する。
        switch (this._state) {
            case STATE.INIT:// 初期状態
                // 最初は右上に移動する。
                nextPosition = MOVE_POSITION[0];
                // 移動位置に到達した場合は次の状態に遷移する。
                if (Math.abs(this._hitArea.x - nextPosition.x) < 0.01 &&
                    Math.abs(this._hitArea.y - nextPosition.y) < 0.01) {
                    this._state++;
                }
                break;
            case STATE.NWAY_SHOT:// n-way弾発射
                // 次の移動位置を決める。
                nextPosition = MOVE_POSITION[this._movePosIndex];
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > N5_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 5, Math.PI / 8, N5_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 弾発射間隔時間経過したら弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > N3_WAY_INTERVAL) {
                    // 自機へ向けて弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 16, N3_WAY_SHOT_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            case STATE.NET_SHOT:// 蜘蛛の巣弾発射
                // 次の移動位置を決める。
                nextPosition = MOVE_POSITION[this._movePosIndex];
                // 蜘蛛の巣弾の発射間隔が経過したら弾を発射する。
                this._shotInterval[0]++;
                if (this._shotInterval[0] > NET_SHOT_INTERVAL) {
                    // 蜘蛛の巣弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireGroupShot(this._hitArea, NET_SHOT_POSITION, NET_SHOT_POSITION.length, NET_SHOT_SPEED, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[0] = 0;
                }
                // 全方位弾の発射間隔が経過している場合は弾を発射する。
                this._shotInterval[1]++;
                if (this._shotInterval[1] > ALL_DIRECTION_INTERVAL) {
                    // 全方位弾を発射する。
                    __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, ALL_DIRECTION_COUNT, ALL_DIRECTION_ANGLE, ALL_DIRECTION_SPEED, false, scene);
                    // 弾発射間隔を初期化する。
                    this._shotInterval[1] = 0;
                }
                break;
            case STATE.MOVE_TO_CENTER:// 中央へ移動
                // 包囲弾発射時は中央で固定とする。
                nextPosition = MOVE_POSITION_OF_SIEGE;
                // 移動時間はリセットする。
                this._moveInterval = 0;
                break;
            case STATE.SIEGE:// 2-way弾による包囲弾発射
                // 包囲弾発射時は中央で固定とする。
                nextPosition = MOVE_POSITION_OF_SIEGE;
                // 移動時間はリセットする。
                this._moveInterval = 0;
                // 中央位置に到達したら弾を発射し始める。
                if (Math.abs(this._hitArea.x - nextPosition.x) < 0.01 &&
                    Math.abs(this._hitArea.y - nextPosition.y) < 0.01) {
                    // 包囲弾を発射する。
                    this._shotInterval[0]++;
                    if (this._shotInterval[0] > SIEGE_SHOT_INTERVAL) {
                        // 包囲弾の角度を求める。
                        let angle = SIEGE_SHOT_START_ANGLE - this._siegeAngle * SIEGE_SHOT_ANGLE_SPEED;
                        // 最終角度に到達していれば最終角度を設定する。
                        if (angle <= SIEGE_SHOT_END_ANGLE) {
                            angle = SIEGE_SHOT_END_ANGLE;
                        }
                        // 弾を発射する。
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, Math.PI, 2, angle, SIEGE_SHOT_SPEED, false, scene);
                        // 包囲弾の角度を狭める。
                        this._siegeAngle++;
                        // 弾発射間隔を初期化する。
                        this._shotInterval[0] = 0;
                    }
                    // 1グループ弾発射間隔時間経過したらグループ弾を発射する。
                    this._shotInterval[1]++;
                    if (this._shotInterval[1] > GROUP_SHOT_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireGroupShot(this._hitArea, GROUP_SHOT_POSITION, GROUP_SHOT_COUNT, GROUP_SHOT_SPEED, scene);
                        // 弾発射間隔を初期化する。
                        this._shotInterval[1] = 0;
                    }
                    // 1-way弾発射間隔時間経過したら弾を発射する。
                    this._shotInterval[2]++;
                    if (this._shotInterval[2] > N1_WAY_INTERVAL) {
                        // 自機へ向けて弾を発射する。
                        __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 1, 0, N1_WAY_SHOT_SPEED, false, scene);
                        // 弾発射間隔を初期化する。
                        this._shotInterval[2] = 0;
                    }
                }
                break;
            default:
                break;
        }
        //        console.log(`nextPosition={${nextPosition.x}, ${nextPosition.y}}, state=${this._state}`);
        // 移動先と現在位置が異なる場合は速度の設定を行う。
        if (Math.abs(this._hitArea.x - nextPosition.x) > 0.01 || Math.abs(this._hitArea.y - nextPosition.y) > 0.01) {
            // 移動先の角度を計算する。
            const moveAngle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, nextPosition);
            // 移動スピードを設定する。
            let speedX = MOVE_SPEED * Math.cos(moveAngle);
            let speedY = MOVE_SPEED * Math.sin(moveAngle) * -1;
            // x方向の移動距離がスピードより小さい場合は通り過ぎないように移動先座標をセットする。
            if (Math.abs(this._hitArea.x - nextPosition.x) < speedX) {
                this._hitArea.x = nextPosition.x;
                speedX = 0;
            }
            // x方向の移動距離がスピードより小さい場合は通り過ぎないように移動先座標をセットする。
            if (Math.abs(this._hitArea.y - nextPosition.y) < speedY) {
                this._hitArea.y = nextPosition.y;
                speedY = 0;
            }
            // 移動する。
            this._hitArea.x += speedX;
            this._hitArea.y += speedY;
        }
        else {
            // 移動時間をカウントし、位置変更の間隔が経過した場合は移動位置を変更する。
            this._moveInterval++;
            if (this._moveInterval > MOVE_INTERVAL) {
                this._moveInterval = 0;
                this._movePosIndex = (this._movePosIndex + 1) % MOVE_POSITION.length;
            }
        }
        // 状態遷移間隔が経過している場合は次の状態へ進める。
        this._stateInterval++;
        if (this._stateInterval > STATE_INTERVAL[this._state]) {
            // 次の状態へ進める。
            this._state++;
            // 状態が最大を超える場合は最初の状態へループする。
            if (this._state >= STATE.COUNT) {
                this._state = STATE.INIT + 1;
            }
            // 状態遷移間隔、弾発射間隔を初期化する。
            this._stateInterval = 0;
            for (let i = 0; i < this._shotInterval.length; i++) {
                this._shotInterval[i] = 0;
            }
            // 包囲弾の角度を初期化する。
            this._siegeAngle = 0;
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
/* harmony default export */ __webpack_exports__["a"] = (Spider);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemyshot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);



// 弾発射間隔
const SHOT_INTERVAL = 60;
// 移動スピード
const MOVE_SPEED = 0.65;
// 弾のスピード
const SHOT_SPEED = 0.75;
// 方向転換を行うまでの間隔
const CHANGE_DIRECTION_INTERVAL = 120;
/**
 * 敵キャラ、クワガタ。
 */
class StagBeetle extends __WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* default */] {
    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x, y, param, scene) {
        // 親クラスのコンストラクタを実行する。
        super(x, y, 'stagbeetle', param, scene);
        // 自機との角度を計算する。
        const angle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition);
        // 縦横の速度を決定する
        // ただし、後ろには戻らないようにx方向は絶対値とする
        this._speedX = -1.0 * Math.abs(MOVE_SPEED * Math.cos(angle));
        this._speedY = -1.0 * MOVE_SPEED * Math.sin(angle);
        // 各変数を初期化する。
        this._shotInterval = 0;
        this._changeDirectionInterval = 0;
    }
    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 登場時に自機の方向へ進行方向を決めて真っ直ぐ飛ぶ。定周期で3-way弾を発射する。
     * 途中で方向転換を行い、自機の方向へ向き直す。ただし、後ろの方向には戻らないようにx方向は常に左にする。
     * @param scene シーン
     */
    action(scene) {
        // 移動する。
        this._hitArea.x += this._speedX;
        this._hitArea.y += this._speedY;
        // 弾発射間隔経過しているときは左方向へ1-way弾を発射する
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            // 自機へ向けて弾を発射する。
            __WEBPACK_IMPORTED_MODULE_1__enemyshot__["a" /* default */].fireNWay(this._hitArea, __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition), 3, Math.PI / 8.0, SHOT_SPEED, false, scene);
            this._shotInterval = 0;
        }
        // 方向転換間隔経過しているときは移動方向を変更する。
        this._changeDirectionInterval++;
        if (this._changeDirectionInterval >= CHANGE_DIRECTION_INTERVAL) {
            // 自機との角度を計算する。
            const angle = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].calcAngle(this._hitArea, scene.playerPosition);
            // 縦横の速度を決定する
            // ただし、後ろには戻らないようにx方向は絶対値とする
            this._speedX = -1.0 * Math.abs(MOVE_SPEED * Math.cos(angle));
            this._speedY = -1.0 * MOVE_SPEED * Math.sin(angle);
            this._changeDirectionInterval = 0;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StagBeetle);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stage__ = __webpack_require__(25);

// ステージクリア後の待機フレーム数
const STAGE_CLEAR_WAIT = 540;
/**
 * ステージの状態を管理する。
 */
class StageStatus {
    /**
     * コンストラクタ。
     * @param stage ステージ番号
     * @param backgroundLayer 背景レイヤー
     */
    constructor(stage, backgroundLayer) {
        // ステージ番号を変更する。
        this._stageNumber = stage;
        // 初期ステージを読み込む。
        this._stage = new __WEBPACK_IMPORTED_MODULE_0__stage__["a" /* default */]('stage' + this._stageNumber, backgroundLayer);
        // ステージクリアフラグを初期化する。
        this._isStageCleared = false;
        // ステージクリア後待機フレーム数を初期化する。
        this._stageClearWait = 0;
    }
    /** ステージ番号 */
    get stageNumber() {
        return this._stageNumber;
    }
    /** 障害物マップ */
    get blockMap() {
        return this._stage.blockMap;
    }
    /** ステージが左方向に何ドット移動しているか */
    get position() {
        return -this._stage.x;
    }
    /** ステージのスクロールスピード */
    get scrollSpeed() {
        return this._stage.speed;
    }
    /** ステージクリアしているかどうか */
    get isStageCleared() {
        return this._isStageCleared;
    }
    /** ステージクリア後待機時間が経過しているかどうか */
    get isOverStageClearWait() {
        if (this._stageClearWait > STAGE_CLEAR_WAIT) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * ステージを画面から取り除く。
     */
    remove() {
        this._stage.remove();
        return this;
    }
    /**
     * ステージ状態を更新する。
     * @param scene シーン
     */
    update(scene) {
        // ステージの更新する。
        this._stage.update(scene);
        // ステージクリア中は待機時間をカウントする。
        if (this._isStageCleared) {
            this._stageClearWait++;
        }
        return this;
    }
    /**
     * ステージクリア処理。
     * ステージクリアフラグを立て、待機時間を初期化する。
     */
    stageClear() {
        this._isStageCleared = true;
        this._stageClearWait = 0;
        return this;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (StageStatus);


/***/ }),
/* 65 */
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
        "CreditName_1": "Production\n    A.Kaneda",
        "CreditName_2": "BGM\n    Maou Damashii",
        "CreditName_3": "Jingle\n    YouFulca",
        "CreditName_4": "Sound Effect\n    Skipmore",
        "CreditName_5": "Game Engine\n    phina.js",
        "CreditName_6": "Font\n    Noto Fonts",
        "CreditLink_1": "http://www.monochromesoft.com/dokuwiki/start",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://phinajs.com/",
        "CreditLink_6": "https://www.google.com/get/noto/",
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
        "CreditName_1": "Production\n    A.Kaneda",
        "CreditName_2": "BGM\n    魔王魂",
        "CreditName_3": "Jingle\n    ユーフルカ",
        "CreditName_4": "Sound Effect\n    Skipmore",
        "CreditName_5": "Game Engine\n    phina.js",
        "CreditName_6": "Font\n    Notoフォント",
        "CreditLink_1": "http://www.monochromesoft.com/dokuwiki/start",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://phinajs.com/",
        "CreditLink_6": "https://www.google.com/get/noto/",
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
        "CreditName_1": "Production\n    A.Kaneda",
        "CreditName_2": "BGM\n    Maou Damashii",
        "CreditName_3": "Jingle\n    YouFulca",
        "CreditName_4": "Sound Effect\n    Skipmore",
        "CreditName_5": "Game Engine\n    phina.js",
        "CreditName_6": "Font\n    Noto Fonts",
        "CreditLink_1": "http://www.monochromesoft.com/dokuwiki/start",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://phinajs.com/",
        "CreditLink_6": "https://www.google.com/get/noto/",
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
        "CreditName_1": "Production\n    A.Kaneda",
        "CreditName_2": "BGM\n    Maou Damashii",
        "CreditName_3": "Jingle\n    YouFulca",
        "CreditName_4": "Sound Effect\n    Skipmore",
        "CreditName_5": "Game Engine\n    phina.js",
        "CreditName_6": "Font\n    Noto Fonts",
        "CreditLink_1": "http://www.monochromesoft.com/dokuwiki/start",
        "CreditLink_2": "http://maoudamashii.jokersounds.com/",
        "CreditLink_3": "http://wingless-seraph.net/",
        "CreditLink_4": "http://www.skipmore.com/app/",
        "CreditLink_5": "http://phinajs.com/",
        "CreditLink_6": "https://www.google.com/get/noto/",
    },
};
/* harmony default export */ __webpack_exports__["a"] = (StringResource);


/***/ }),
/* 66 */
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