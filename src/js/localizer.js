import StringResource from './stringresource';
/**
 * ローカライズを行うクラス。
 */
class Localizer {
    /**
     * 文字列が言語設定に対応したものかどうかを調べる。
     * @param obj 文字列
     */
    static isLaungageType(obj) {
        switch (obj) {
            case 'en':
            case 'jp':
            case 'zh':
            case 'ko':
                return true;
            default:
                return false;
        }
    }
    /**
     * 言語設定
     */
    static get langauge() {
        // デフォルトは英語とする。
        let language = 'en';
        // localStorageに言語設定が保存されている場合はlocalStorageの値を使用する。
        if (localStorage.language && Localizer.isLaungageType(localStorage.language)) {
            language = localStorage.language;
        }
        else {
            // TODO: localStorageに言語設定が保存されていない場合は
            // ブラウザ設定、端末設定から言語設定を取得する。
        }
        // 言語設定を返す。
        return language;
    }
    /**
     * StringResourceに登録された文字列を取得する。
     * @param key 文字列のキー
     */
    static getString(key) {
        return StringResource[Localizer.langauge][key];
    }
}
export default Localizer;
