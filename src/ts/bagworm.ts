import Enemy from './enemy';
import PlayingScene from './playingscene';
import EnemyShot from './enemyshot';
import EnemyParam from './enemyparam';

// 弾のスピード
const SHOT_SPEED = 0.5;
// 弾発射間隔
const SHOT_INTERVAL = 60;

/**
 * 敵キャラクター。ミノムシ。
 */
class Bagworm extends Enemy {

    /** 弾発射間隔。 */
    private _shotInterval: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x: number, y: number, param: EnemyParam, scene: PlayingScene) {

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
    protected action(scene: PlayingScene): void {

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;

        // 弾発射間隔経過しているときは全方位に弾を発射する。
        this._shotInterval++;
        if (this._shotInterval >= SHOT_INTERVAL) {
            
            // 全方位に 12-way弾を発射する。
            EnemyShot.fireNWay(this._hitArea, 
                Math.PI, 
                12, 
                Math.PI / 6, 
                SHOT_SPEED, 
                true, 
                scene);
            
            this._shotInterval = 0;
        }
    }

};

export default Bagworm;