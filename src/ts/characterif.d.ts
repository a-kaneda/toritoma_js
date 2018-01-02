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
}

export default CharacterIF;