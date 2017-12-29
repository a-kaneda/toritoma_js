/** @module shieldbutton */

import ControlSize from './controlsize.js'
import ScreenSize from './screensize.js'

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
        this.offImage = Sprite('control', ControlSize.cs.shieldButtonOff.width, ControlSize.cs.shieldButtonOff.height);

        // タッチしていない状態のサイズを設定する。
        this.offImage.srcRect.set(ControlSize.cs.shieldButtonOff.x,
                                  ControlSize.cs.shieldButtonOff.y,
                                  ControlSize.cs.shieldButtonOff.width,
                                  ControlSize.cs.shieldButtonOff.height);
        this.offImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.offImage.scaleY = ScreenSize.ZOOM_RATIO;

        // ベース部分に追加する。
        this.offImage.addChildTo(this.base);

        /**
         * タッチしている状態の画像
         * @type {phina.display.Sprite}
         */
        this.onImage = Sprite('control', ControlSize.cs.shieldButtonOn.width, ControlSize.cs.shieldButtonOn.height);

        // タッチしている状態のサイズを設定する。
        this.onImage.srcRect.set(ControlSize.cs.shieldButtonOn.x,
                                 ControlSize.cs.shieldButtonOn.y,
                                 ControlSize.cs.shieldButtonOn.width,
                                 ControlSize.cs.shieldButtonOn.height);
        this.onImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.onImage.scaleY = ScreenSize.ZOOM_RATIO;

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

export default ShieldButton;
