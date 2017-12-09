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
                if (prevY - character.height / 2 > block.y + block.height / 2) {
                    newPosition.y = prevY;
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

                    // x方向の移動で衝突する場合はy方向の移動を採用する。
                    newPosition.x = character.x;
                    newPosition.y = newYPosBackup;
                }
            }

            // 移動後の座標を戻り値として返す。
            return newPosition;
        },
    },
});
