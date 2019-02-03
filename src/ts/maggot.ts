import Enemy from './enemy';
import PlayingScene from './playingscene';
import EnemyShot from './enemyshot';
import EnemyParam from './enemyparam';
import FlyIF from './flyif';

// 状態
enum STATE {
    UP_MOVE,        // 上方向に移動
    DOWN_MOVE,      // 下方向に移動
}

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
class Maggot extends Enemy {

    /** 3-Way弾発射間隔。 */
    private _n3WayShotInterval: number;
    /** 4-Way弾発射間隔。 */
    private _n4WayShotInterval: number;
    /** 弾発射待機間隔。 */
    private _waitInterval: number;
    /** 種別。 */
    private _shotType: number;
    /** 親オブジェクト */
    private _parent: FlyIF | null;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     * @param param 敵キャラクターパラメータ
     * @param scene シーン
     */
    constructor(x: number, y: number, param: EnemyParam, scene: PlayingScene) {
        
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
    public get parent(): FlyIF | null {
        return this._parent;
    }

    /** 親オブジェクト */
    public set parent(value: FlyIF | null) {
        this._parent = value;
    }

    /** 種別。 */
    public get shotType(): number {
        return this._shotType;
    }

    /** 種別。 */
    public set shotType(value: number) {
        this._shotType = value % TYPE_COUNT;

        // 向きを変更する。
        this._sprite.rotation = (Math.PI / 4) * (this._shotType % TYPE_COUNT);
    }

    /**
     * アニメーションフレームを設定する。
     * @param frame アニメーションフレーム
     */
    public setAnimationFrame(frame: number): this {
        this._animation.currentFrameIndex = frame;
        return this;
    }

    /**
     * 敵キャラクター種別ごとの固有の処理。
     * 定周期に3-way弾を発射する。
     * 生成されたときに設定されたstateに応じて発射間隔と画像の向きを変える。
     * @param scene シーン
     */
    protected action(scene: PlayingScene): void {

        // スクロールに合わせて移動する。
        this._hitArea.x -= scene.scrollSpeed;
                
        // 画像を回転する。
        this._sprite.rotation = -45 * (this._shotType % 8);

        // 弾発射待機間隔をカウントする。
        this._waitInterval++;

        // 弾発射間隔経過しているときは3-way弾を発射する
        this._n3WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n3WayShotInterval >= SHOT_INTERVAL[this._shotType]) {
            EnemyShot.fireNWay(this._hitArea, 
                Math.PI, 
                3, 
                SHOT_ANGLE, 
                SHOT_SPEED[this._shotType], 
                false, 
                scene);
            this._n3WayShotInterval = 0;
        }

        // 弾発射間隔経過しているときは4-way弾を発射する
        this._n4WayShotInterval++;
        if (this._waitInterval > SHOT_WAIT && this._n4WayShotInterval >= SHOT_INTERVAL[(this._shotType + 3) % TYPE_COUNT]) {
            EnemyShot.fireNWay(this._hitArea, 
                Math.PI, 
                4, 
                SHOT_ANGLE, 
                SHOT_SPEED[(this._shotType + 3) % TYPE_COUNT], 
                false, 
                scene);
            this._n4WayShotInterval = 0;
        }
    }
}

export default Maggot;