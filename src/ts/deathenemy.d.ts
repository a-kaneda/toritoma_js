import PlayingScene from './playingscene';

/**
 * 敵キャラクター死亡時処理。
 */
interface DeathEnemy {

    /**
     * 更新処理。
     * @param scene シーン
     */
    update(scene: PlayingScene): void;
}

export default DeathEnemy;