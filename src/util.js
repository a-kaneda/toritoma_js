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
            if (a.floatX <= b.floatX + b.hitWidth &&
                a.floatX + a.hitWidth >= b.floatX &&
                a.floatY <= b.floatY + b.hitHeight &&
                a.floatY + b.hitWidth >= b.floatY) {

                return true;
            }
            else {
                return false;
            }
        },
    },
});
