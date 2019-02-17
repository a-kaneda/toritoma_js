'use strict';

const remote = require('electron').remote;

/**
 * プラットフォーム毎の違いを吸収するためのクラス。
 */
class Platform {

    // プラットフォームを取得する。
    static get name() {
        return 'electron';
    }

    // 作業ディレクトリを取得する。
    static get workDir() {
        return '../../dest/';
    }

    // 画面を閉じる。
    static close() {
        const window = remote.getCurrentWindow();
        window.close();
    }

    // スマホ、タブレットかどうか。
    static isMobile() {
        return false;
    }
}