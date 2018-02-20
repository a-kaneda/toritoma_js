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
            case 'ja':
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
            // localStorageに言語設定が保存されていない場合は
            // ブラウザ設定から言語設定を取得する。
            if (window.navigator.language) {
                let languageSetting = window.navigator.language.slice(0, 2);
                if (Localizer.isLaungageType(languageSetting)) {
                    language = languageSetting;
                }
            }
        }
        // 言語設定を返す。
        return language;
    }
    /**
     * 単語の途中で改行をしないようにするかどうか。
     */
    static get isKeepWord() {
        // 英語の場合は単語を保持する。
        if (Localizer.langauge === 'en') {
            return true;
        }
        else {
            return false;
        }
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
