import Rect from './rect'
import PlayingScene from './playingscene'

/**
 * 各キャラクターを共通的に扱うためのインターフェース。
 */
interface CharacterIF {
    
    /** キャラクター種別 */
    type: number;
    /** キャラクターの位置とサイズ */
    rect: Rect;

    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene: PlayingScene): void;

    /**
     * シーンから取り除く。
     */
    remove(): this;

    /**
     * アニメーションを停止する。
     * @return 自インスタンス
     */
    pauseAnimation(): this;

    /**
     * アニメーションを開始する。
     * @return 自インスタンス
     */
    startAnimation(): this;
}

export default CharacterIF;