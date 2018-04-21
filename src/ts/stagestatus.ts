import Stage from './stage'
import PlayingScene from './playingscene';

// ステージクリア後の待機フレーム数
const STAGE_CLEAR_WAIT = 540;

/**
 * ステージの状態を管理する。
 */
class StageStatus {
    /** ステージ */
    private _stage: Stage;
    /** ステージ番号 */
    private _stageNumber: number;
    /** ステージクリアしているかどうか */
    private _isStageCleared: boolean;
    /** ステージクリア待機フレーム数 */
    private _stageClearWait: number;

    /**
     * コンストラクタ。
     * @param stage ステージ番号
     * @param backgroundLayer 背景レイヤー
     */
    constructor(stage: number, backgroundLayer: phina.display.DisplayElement) {

        // ステージ番号を変更する。
        this._stageNumber = stage;

        // 初期ステージを読み込む。
        this._stage = new Stage('stage' + this._stageNumber, backgroundLayer);

        // ステージクリアフラグを初期化する。
        this._isStageCleared = false;

        // ステージクリア後待機フレーム数を初期化する。
        this._stageClearWait = 0;
    }

    /** ステージ番号 */
    public get stageNumber(): number {
        return this._stageNumber;
    }

    /** 障害物マップ */
    public get blockMap(): TileMapObject[][] {
        return this._stage.blockMap;
    }

    /** ステージが左方向に何ドット移動しているか */
    public get position(): number {
        return -this._stage.x;
    }

    /** ステージのスクロールスピード */
    public get scrollSpeed(): number {
        return this._stage.speed;
    }

    /** ステージクリアしているかどうか */
    public get isStageCleared(): boolean {
        return this._isStageCleared;
    }

    /** ステージクリア後待機時間が経過しているかどうか */
    public get isOverStageClearWait(): boolean {

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
    public remove(): this {

        this._stage.remove();
        return this;
    }

    /**
     * ステージ状態を更新する。
     * @param scene シーン
     */
    public update(scene: PlayingScene): this {

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
    public stageClear(): this {

        this._isStageCleared = true;
        this._stageClearWait = 0;

        return this;
    }
}

export default StageStatus;