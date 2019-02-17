'use strict';

/**
 * プラットフォーム毎の違いを吸収するためのクラス。
 */
class Platform {

    // プラットフォームを取得する。
    static get name() {
        return 'web';
    }

    // 作業ディレクトリを取得する。
    static get workDir(){
        return './';
    }

    // 画面を閉じる。
    static close() {
        // 無処理
    }

    // スマホ、タブレットかどうか。
    static isMobile() {
        const ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}