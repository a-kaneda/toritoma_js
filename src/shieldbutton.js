import ControlSize from './controlsize.js'
import ScreenSize from './screensize.js'

// ボタンサイズ
const BUTTON_SIZE = 128;

/**
 * @class ShieldButton
 * @brief シールドボタン
 * シールドボタンの画像表示とタッチ処理を行う。
 */
export default class ShieldButton {

    /**
     * @function init
     * @brief コンストラクタ
     * 画像の読み込みとボタン部分を作成する。
     */
    constructor() {

        // ベース部分を作成する。
        this.base = DisplayElement();

        // タッチしていない状態の画像を読み込む。
        this.offImage = Sprite('control', ControlSize.cs.shieldButtonOff.width, ControlSize.cs.shieldButtonOff.height);
        this.offImage.srcRect.set(ControlSize.cs.shieldButtonOff.x,
                                  ControlSize.cs.shieldButtonOff.y,
                                  ControlSize.cs.shieldButtonOff.width,
                                  ControlSize.cs.shieldButtonOff.height);
        this.offImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.offImage.scaleY = ScreenSize.ZOOM_RATIO;
        this.offImage.addChildTo(this.base);

        // タッチしている状態の画像を読み込む。
        this.onImage = Sprite('control', ControlSize.cs.shieldButtonOn.width, ControlSize.cs.shieldButtonOn.height);
        this.onImage.srcRect.set(ControlSize.cs.shieldButtonOn.x,
                                 ControlSize.cs.shieldButtonOn.y,
                                 ControlSize.cs.shieldButtonOn.width,
                                 ControlSize.cs.shieldButtonOn.height);
        this.onImage.scaleX = ScreenSize.ZOOM_RATIO;
        this.onImage.scaleY = ScreenSize.ZOOM_RATIO;
        this.onImage.addChildTo(this.base);

        // ボタン部分を作成する。
        // タップをやりやすくするため、画像より大きめにサイズを取る。
        this.button = RectangleShape({
            height: BUTTON_SIZE,
            width: BUTTON_SIZE,
        });
        this.button.alpha = 0;
        this.button.setInteractive(true);
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

        // 初期状態はタッチしていない状態とする。
        this.touch = false;
        this.offImage.alpha = 1;
        this.onImage.alpha = 0;
    }

    /**
     * @function getSprite
     * @brief スプライト取得
     * 画像、ボタンを合わせたスプライトを取得する。
     *
     * @return スプライト
     */
    getSprite() {
        return this.base;
    }

    /**
     * @function isTouch
     * @brief タッチ状態取得
     * タッチされているかどうかを取得する。
     *
     * @return タッチされているかどうか
     */
    isTouch() {
        return this.touch;
    }
}
