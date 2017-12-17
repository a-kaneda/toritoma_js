/**
 * @class Util
 * @brief ユーティリティ
 * アプリ全体で使用する関数群を定義する。
 */
phina.define('Util', {
    _static: {
        /**
         * @function isHitCharacter
         * @brief キャラクター同士の当たり判定
         * キャラクター同士が衝突しているかどうかを判定する。
         *
         * @param a キャラクター1
         * @param b キャラクター2
         * @retval true 衝突している
         * @retval false 衝突していない
         */
        isHitCharacter: function(a, b) {
            if (a.x - a.width / 2 < b.x + b.width / 2 &&
                a.x + a.width / 2 > b.x - b.width / 2 &&
                a.y - a.height < b.y + b.height / 2 &&
                a.y + a.height > b.y - b.height / 2) {

                return true;
            }
            else {
                return false;
            }
        },
        /**
         * @function checkCollidedBlock
         * @brief 衝突しているブロックを調べる
         * キャラクターの周囲にあるマップを探し、衝突しているブロックがあれば
         * そのブロックの座標とサイズを返す。衝突していなければnullを返す。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 衝突しているブロック、見つからなければnull。
         */
        checkCollidedBlock: function(character, stagePosition, blockMap) {

            // ブロックマップの検索範囲を計算する。
            var xmin = Math.floor((character.x - character.width / 2 + stagePosition) / Stage.TILE_SIZE);
            var xmax = Math.ceil((character.x + character.width / 2 + stagePosition) / Stage.TILE_SIZE);
            var ymin = Math.floor((character.y - character.height / 2) / Stage.TILE_SIZE);
            var ymax = Math.ceil((character.y + character.height / 2) / Stage.TILE_SIZE);

            // x、yの上下限値をチェックする。
            if (xmin < 0) { 
                xmin = 0;
            }
            if (xmax >= blockMap[0].length) {
                xmax = blockMap[0].length - 1;
            }
            if (ymin < 0) { 
                ymin = 0;
            }
            if (ymax >= blockMap.length) {
                ymax = blockMap.length - 1;
            }

            // 周囲のタイルから衝突しているブロックを探す。
            for (var y = ymin; y <= ymax; y++) {
                for (var x = xmin; x <= xmax; x++) {

                    // 衝突しているブロックが見つかった場合
                    if (blockMap[y][x] &&
                        character.x - character.width / 2 < x * Stage.TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width &&
                        character.x + character.width / 2 > x * Stage.TILE_SIZE - stagePosition + blockMap[y][x].x &&
                        character.y - character.height / 2 < y * Stage.TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height &&
                        character.y + character.height / 2 > y * Stage.TILE_SIZE + blockMap[y][x].y) {

                        // ブロックの中心座標とサイズを戻り値とする。
                        // 変数名や値はキャラクターに合わせる。
                        var ret = {
                            x: x * Stage.TILE_SIZE - stagePosition + blockMap[y][x].x + blockMap[y][x].width / 2,
                            y: y * Stage.TILE_SIZE + blockMap[y][x].y + blockMap[y][x].height / 2,
                            width: blockMap[y][x].width,
                            height: blockMap[y][x].height,
                        };

                        return ret;
                    }
                }
            }

            return null;
        },
        /**
         * @function moveByBlock
         * @brief ブロック衝突による移動
         * ブロック衝突による移動を行う。
         * 右方向移動中に衝突した場合はブロックの左端に移動する。他の方向も同様。
         * 移動前から衝突している場合はその方向には移動しない。このケースは
         * ブロック移動による押出処理で対応する。
         * 縦横どちらにも移動する場合には横方向だけ移動して再度衝突をチェックし、
         * 衝突しなければ横方向だけ移動し、衝突すれば縦方向だけ移動する。
         *
         * @param [in] character キャラクター
         * @param [in] prevX 移動前x座標
         * @param [in] prevY 移動前y座標
         * @param [in] block 衝突したブロックの位置とサイズ
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 移動後の座標
         */
        moveByBlock: function(character, prevX, prevY, block, stagePosition, blockMap) {
            
            // 衝突による移動先の座標を現在の座標で初期化する
            var newPosition = {
                x: character.x,
                y: character.y,
                width: character.width,
                height: character.height,
            };

            // 障害物の横方向の端に合わせて移動した場合は
            // 縦方向の移動は不要になるため、フラグを立てて後で使用する。
            var isXMoved = false;

            // x方向右に進んでいる時に衝突した場合
            if (character.x > prevX &&
                character.x + character.width / 2 > block.x - block.width / 2) {

                // 前回の右端が障害物の前回の左端よりも右側ならば
                // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
                // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
                // 脱出を試みる。
                if (prevX + character.width / 2 > block.x - block.width / 2) {
                    newPosition.x = prevX;

                    // 横方向移動のフラグは立てない。
                    // 縦方向移動のフラグがたった場合はここでの変更は元に戻すため。
                }
                else {
                    // そうでない場合は右端を障害物の左端に合わせる
                    newPosition.x = block.x - block.width / 2 - character.width / 2 ;

                    // 横方向移動のフラグを立てる
                    isXMoved = true;
                }
            }
            // x方向左に進んでいる時に衝突した場合
            else if (character.x < prevX &&
                character.x - character.width / 2 < block.x + block.width / 2) {

                // 前回の左端が障害物の前回の右端よりも左側ならば
                // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
                // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
                // 脱出を試みる。
                if (prevX - character.width / 2 < block.x + block.width / 2) {
                    newPosition.x = prevX;

                    // 横方向移動のフラグは立てない。
                    // 縦方向移動のフラグがたった場合はここでの変更は元に戻すため。
                }
                else {
                    // そうでない場合は左端を障害物の右端に合わせる
                    newPosition.x = block.x + block.width / 2 + character.width / 2;

                    // 横方向移動のフラグを立てる
                    isXMoved = true;
                }
            }
            else {
                // x方向に進んでいない、または衝突していない場合は無処理
            }
    
            // 障害物の縦方向の端に合わせて移動した場合は
            // 横方向の移動は不要になるため、フラグを立てて後で使用する。
            var isYMoved = false;
    
            // y方向上に進んでいる時に衝突した場合
            if (character.y < prevY &&
                character.y - character.height / 2 < block.y + block.height / 2) {

                // 前回の上端が障害物の前回の下端よりも上側ならば
                // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
                // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
                // 脱出を試みる。
                if (prevY - character.height / 2 < block.y + block.height / 2) {
                    newPosition.y = prevY;

                    // 縦方向移動のフラグは立てない。
                    // 横方向移動のフラグがたった場合はここでの変更は元に戻すため。
                }
                else {
                    // そうでない場合は上端を障害物の下端に合わせる
                    newPosition.y = block.y + block.height / 2 + character.height / 2;

                    // 縦方向移動のフラグを立てる
                    isYMoved = true;
                }
            }
            // y方向下に進んでいる時に衝突した場合
            else if (character.y > prevY &&
                character.y + character.height / 2 > block.y - block.height / 2) {

                // 前回の下端が障害物の前回の上端よりも下側ならば
                // 障害物内部に入り込んでいるものとみなし、前回値に戻す。
                // 障害物内部に入り込んでいるものは画面スクロール時のブロックがキャラクターを押し出す処理で
                // 脱出を試みる。
                if (prevY + character.height / 2 > block.y - block.height / 2) {
                    newPosition.y = prevY;

                    // 縦方向移動のフラグは立てない。
                    // 横方向移動のフラグがたった場合はここでの変更は元に戻すため。
                }
                else {
                    // そうでない場合は下端を障害物の上端に合わせる
                    newPosition.y = block.y - block.height / 2 - character.height / 2;
            
                    // 縦方向移動のフラグを立てる
                    isYMoved = true;
                }
            }
            else {
                // y方向に進んでいない、または衝突していない場合は無処理
            }

            // xy方向両方へ移動した場合
            if (isXMoved && isYMoved) {

                // y座標だけ元に戻して衝突するか調べる。
                var newYPosBackup = newPosition.y;
                newPosition.y = character.y;
                if (Util.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {

                    // x座標だけ元に戻して衝突するか調べる。
                    var newXPosBackupt = newPosition.x;
                    newPosition.x = character.x;
                    newPosition.y = newYPosBackup;
                    if (Util.checkCollidedBlock(newPosition, stagePosition, blockMap) != null) {

                        // 片方だけでは衝突する場合は両方の値を採用する。
                        newPosition.x = newXPosBackupt;
                    }
                }
            }
            // x方向だけ移動した場合
            else if (isXMoved) {
                // y方向は元に戻す。
                newPosition.y = character.y;
            }
            // y方向だけ移動した場合
            else if (isYMoved) {
                // x方向は元に戻す。
                newPosition.x = character.x;
            }
            else {
                // 変更後の値を採用する。
                // 障害物に入り込んでいる方向については移動前のものに戻される。
            }

            // 移動後の座標を戻り値として返す。
            return newPosition;
        },
        /**
         * @function dodgeBlockUp
         * @brief ブロックを避けて上に移動する
         * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 移動後の位置
         */
        dodgeBlockUp: function(character, stagePosition, blockMap) {

            // 上方向に移動してブロックを回避する。
            var dest = Util._dodgeBlock(character,
                                        stagePosition,
                                        blockMap,
                                        function(dest, block) { dest.y = block.y - block.height / 2 - dest.height / 2; });

            // 移動先の座標を返す。
            return dest;
        },
        /**
         * @function dodgeBlockDown
         * @brief ブロックを避けて下に移動する
         * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 移動後の位置
         */
        dodgeBlockDown: function(character, stagePosition, blockMap) {

            // 下方向に移動してブロックを回避する。
            var dest = Util._dodgeBlock(character,
                                        stagePosition,
                                        blockMap,
                                        function(dest, block) { dest.y = block.y + block.height / 2 + dest.height / 2; });

            // 移動先の座標を返す。
            return dest;
        },
        /**
         * @function dodgeBlockLeft
         * @brief ブロックを避けて左に移動する
         * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 移動後の位置
         */
        dodgeBlockLeft: function(character, stagePosition, blockMap) {

            // 左方向に移動してブロックを回避する。
            var dest = Util._dodgeBlock(character,
                                        stagePosition,
                                        blockMap,
                                        function(dest, block) { dest.x = block.x - block.width / 2 - dest.width / 2; });

            // 移動先の座標を返す。
            return dest;
        },
        /**
         * @function dodgeBlockRight
         * @brief ブロックを避けて右に移動する
         * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @return 移動後の位置
         */
        dodgeBlockRight: function(character, stagePosition, blockMap) {

            // 右方向に移動してブロックを回避する。
            var dest = Util._dodgeBlock(character,
                                        stagePosition,
                                        blockMap,
                                        function(dest, block) { dest.x = block.x + block.width / 2 + dest.width / 2; });

            // 移動先の座標を返す。
            return dest;
        },
        /**
         * @function _dodgeBlock
         * @brief ブロックを避けて移動する
         * ブロックと衝突しないようにするにはどこまで移動すればよいかを調べる。
         * 衝突していない場合、画面外まで出る場合は移動前の位置を返す。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @param [in] move 移動する方法
         * @return 移動後の位置
         */
        _dodgeBlock: function(character, stagePosition, blockMap, move) {

             // 移動先座標の情報を現在位置で初期化する。
            var dest = {
                x: character.x,
                y: character.y,
                width: character.width,
                height: character.height,
            };

            // 衝突するブロックがなくなるまでループする。
            while (true) {

                // 衝突しているブロックを取得する。
                var block = Util.checkCollidedBlock(dest, stagePosition, blockMap); 
                if (block == null) {
                    break;
                }

                // 回避するように移動する。
                move(dest, block);
            }

            // 移動先の座標を返す。
            return dest;
        },
        /**
         * @function pushCharacter
         * @brief ブロックによるキャラクター押出
         * ブロックとぶつかったキャラクターを押し動かす。
         *
         * @param [in] character キャラクター
         * @param [in] stagePosition ステージ位置
         * @param [in] blockMap ブロックマップ
         * @param [in] canMoveOut 画面外へ移動できるかどうか
         * @return 移動先座標
         */
        pushCharacter: function(character, stagePosition, blockMap, canMoveOut) {

            // 各方向への回避した場合の移動先座標を求める。
            var left = Util.dodgeBlockLeft(character, stagePosition, blockMap);
            
            // 画面外への移動を許可する場合は常に左へ移動する。
            if (canMoveOut) {
                return left;
            }

            // 各方向への回避した場合の移動先座標を求める。
            var right = Util.dodgeBlockRight(character, stagePosition, blockMap);
            var up = Util.dodgeBlockUp(character, stagePosition, blockMap);
            var down = Util.dodgeBlockDown(character, stagePosition, blockMap);

            // 移動先候補を設定する。
            // 移動の優先度は
            //   1.スクロール方向
            //   2.スクロールと垂直方向の近い方
            //   3.スクロールと垂直方向の遠い方
            //   4.スクロールと反対方向
            var movePos = new Array(4);

            // 1番目はスクロール方向（左方向）とする。
            movePos[0] = left;

            // 上への移動量の方が小さい場合
            if (character.y - up.y < down.y - character.y) {
                // 2番目を上、3番目を下とする。
                movePos[1] = up;
                movePos[2] = down;
            }
            else {
                // 2番目を下、3番目を上とする。
                movePos[1] = down;
                movePos[2] = up;
            }

            // 4番目はスクロールと反対方向（右方向）とする。
            movePos[3] = right;

            // 4方向へ移動を試みる。
            for (var i = 0; i < 4; i++) {

                // 画面範囲外に出ているかをチェックする。
                if (movePos[i].x >= 0 &&
                    movePos[i].x < ScreenSize.STAGE_RECT.width &&
                    movePos[i].y >= 0 &&
                    movePos[i].y < ScreenSize.STAGE_RECT.height) {

                    // 範囲内の場合はそこへ移動する。
                    return movePos[i];
                }
            }

            // どちらにも移動できない場合は移動前の位置を返す。
            return character;
        },
    },
});
