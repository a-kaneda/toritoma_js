import Stage from './stage';
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
        this._stage = new Stage('stage' + this._stageNumber, backgroundLayer);
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
export default StageStatus;
