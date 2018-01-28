/** @module shieldbutton */

import ControlSize from './controlsize.js'
import ScreenSize from './screensize.js'

// ボタンサイズ
const BUTTON_SIZE = 128;

/**
 * シールドボタンの画像表示とタッチ処理を行う。
 */
class ShieldButton {

    /** ベース部分 */
    private _base: phina.display.DisplayElement;
    /** タッチしていない状態の画像 */
    private _offImage: phina.display.Sprite;
    /** タッチしている状態の画像 */
    private _onImage: phina.display.Sprite;
    /** ボタン部分 */
    private _button: phina.display.RectangleShape;
    /** タッチしているかどうか */
    private _touch: boolean;
    /** 有効かどうか */
    private _enable: boolean;

    /**
     * コンストラクタ。
     * 画像の読み込みとボタン部分を作成する。
     */
    constructor() {

        // ベース部分を作成する。
        this._base = new phina.display.DisplayElement();

        // タッチしていない状態の画像を読み込む。
        this._offImage = new phina.display.Sprite('control', 
            ControlSize.shieldButtonOff.width, 
            ControlSize.shieldButtonOff.height);

        // タッチしていない状態のサイズを設定する。
        this._offImage.srcRect.set(ControlSize.shieldButtonOff.x,
            ControlSize.shieldButtonOff.y,
            ControlSize.shieldButtonOff.width,
            ControlSize.shieldButtonOff.height);
        this._offImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._offImage.scaleY = ScreenSize.ZOOM_RATIO;

        // ベース部分に追加する。
        this._offImage.addChildTo(this._base);

        // タッチしている状態の画像を読み込む。
        this._onImage = new phina.display.Sprite('control', 
            ControlSize.shieldButtonOn.width, 
            ControlSize.shieldButtonOn.height);

        // タッチしている状態のサイズを設定する。
        this._onImage.srcRect.set(ControlSize.shieldButtonOn.x,
            ControlSize.shieldButtonOn.y,
            ControlSize.shieldButtonOn.width,
            ControlSize.shieldButtonOn.height);
        this._onImage.scaleX = ScreenSize.ZOOM_RATIO;
        this._onImage.scaleY = ScreenSize.ZOOM_RATIO;

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
        this._button.on('pointstart', (event: Event) => {
            if (this._enable) {
                this._touch = true;
                this._offImage.alpha = 0;
                this._onImage.alpha = 1;
            }
        });

        // タッチ終了イベントのハンドラを作成する。
        this._button.on('pointend', (event: Event) => {
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
    public get sprite(): phina.display.DisplayElement {
        return this._base;
    }

    /** タッチされているかどうか。 */
    public get isTouch(): boolean {
        return this._touch;
    }

    /** 有効かどうか */
    public set enable(value: boolean) {
        this._enable = value;

        // 無効にした場合はタッチしていない状態にする。
        if (!this._enable) {
            this._touch = false;
            this._offImage.alpha = 1;
            this._onImage.alpha = 0;
        }
    }
}

export default ShieldButton;
