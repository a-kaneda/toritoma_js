import PlayingScene from './playingscene'
import Collider from './collider'
import Point from './point'

/**
 * 歩行キャラクターの共通処理。
 */
class WalkingCharacter {

    /** 移動後の位置 */
    private _movePosition: Point;

    /**
     * コンストラクタ。
     */
    constructor() {

        // 移動後の位置を初期化する。
        this._movePosition = {x: 0, y: 0};
    }

    /** 移動後の位置 */
    public get movePosition(): Point {
        return this._movePosition;
    }

    /**
     * 逆さま判定。上下の障害物の距離を調べ、上の障害物の方が近い場合は上下反転しているものとする。
     * @param character キャラクター
     * @param scene シーン
     * @return 逆さまかどうか
     */
    public checkUpsideDown(character: Collider, scene: PlayingScene): boolean {

        // 上方向の障害物を検索する。
        const upsideBlock = character.getBlockY(true, character.x, scene.getStagePosition(), scene.getBlockMap());

        // 下方向の障害物を検索する。
        const downsideBlock = character.getBlockY(false, character.x, scene.getStagePosition(), scene.getBlockMap());

        // 上方向の障害物の方が近い場合は逆さまと判断する。
        if (character.y - (upsideBlock.y + upsideBlock.height / 2) < (downsideBlock.y - downsideBlock.height / 2) - character.y) {

            return true;
        }
        else {

            return false;
        }
    }

    /**
     * 障害物との衝突を処理する。
     * 通常は自分の足元の一番上の障害物の位置にy座標を合わせ、逆さまの場合は一番下の障害物に合わせる。
     * ブロック半分までの段差は超えられるものとし、それ以上の段差がある場合は手前の障害物の上で停止する。
     * @param character キャラクター
     * @param isUpsideDown 逆さまかどうか
     * @param scene シーン
     */
    public checkBlockHit(character: Collider, isUpsideDown: boolean, scene: PlayingScene): void {

        // 移動可能な段差
        const MOVABLE_STEP = 8;

        // 移動後の位置を初期化する。
        this._movePosition.x = character.x;
        this._movePosition.y = character.y;

        // 左側の足元の障害物を検索する。
        const leftBlock = character.getBlockY(isUpsideDown,
            character.x - character.width / 2,
            scene.getStagePosition(),
            scene.getBlockMap());

        // 右側の足元の障害物を検索する。
        const rightBlock = character.getBlockY(isUpsideDown,
            character.x + character.width / 2,
            scene.getStagePosition(),
            scene.getBlockMap());

        // 逆さまの場合は障害物の上端の値を使用し、通常の場合は下端の値を使用する。
        let leftBlockPos = 0;
        let rightBlockPos = 0;
        if (isUpsideDown) {
            leftBlockPos = leftBlock.y + leftBlock.height / 2;
            rightBlockPos = rightBlock.y + rightBlock.height / 2;
        }
        else {
            leftBlockPos = leftBlock.y - leftBlock.height / 2;
            rightBlockPos = rightBlock.y - rightBlock.height / 2;
        }

        // 左右の段差が移動可能な段差を超えている場合
        if (Math.abs(leftBlockPos - rightBlockPos) > MOVABLE_STEP) {

            // 左右それぞれの移動後の位置を計算する。
            let moveLeftPosY = 0;
            let moveRightPosY = 0;
            if (isUpsideDown) {
                moveRightPosY = rightBlock.y + rightBlock.width / 2 + character.height / 2;
                moveLeftPosY = leftBlock.y + leftBlock.width / 2 + character.height / 2;
            }
            else {
                moveRightPosY = rightBlock.y - rightBlock.width / 2 - character.height / 2
                moveLeftPosY = leftBlock.y - leftBlock.width / 2 - character.height / 2;
            }

            // 現在の位置からy方向に近いほうに合わせる。
            if (Math.abs(character.y - moveRightPosY) < Math.abs(character.y - moveLeftPosY)) {

                this._movePosition.x = rightBlock.x - rightBlock.width / 2 + character.width / 2;
                this._movePosition.y = moveRightPosY;
            }
            else {

                this._movePosition.x = leftBlock.x - leftBlock.width / 2 + character.width / 2;
                this._movePosition.y = moveLeftPosY;
            }
        }
        else {

            // 逆さまの場合は下の方に合わせる。
            if (isUpsideDown) {

                this._movePosition.y = Math.max(leftBlockPos, rightBlockPos) + character.height / 2;

            }
            // 通常の場合は上の方に合わせる。
            else {

                this._movePosition.y = Math.min(leftBlockPos, rightBlockPos) - character.height / 2;
            }
        }
    }    
}

export default WalkingCharacter;