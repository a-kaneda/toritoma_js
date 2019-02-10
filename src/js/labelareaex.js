var phina = require('phina.js');
/**
 * LabelArea拡張クラス。
 * 単語の途中で改行を行わないようにするオプションkeepWordを追加。
 */
phina.define('phina.ui.LabelAreaEx', {
    superClass: 'phina.ui.LabelArea',
    // 単語の途中で改行を行わないようにするかどうか
    _keepWord: false,
    /**
     * コンストラクタ。
     * @param options オプション
     */
    init: function (options) {
        this.superInit(options);
        // オプションにkeepWordが指定されている場合はメンバ変数に設定する。
        // デフォルトは無効とする。
        if (typeof (options) === 'object' && options.keepWord !== undefined) {
            this._keepWord = options.keepWord;
        }
        else {
            this._keepWord = false;
        }
    },
    /**
     * 描画エリアから文字列がはみ出る場合に強制的に改行する。
     * @param lines 元々の文字列
     * @return 改行した文字列
     */
    spliceLines: function (lines) {
        const rowWidth = this.width;
        const context = this.canvas.context;
        context.font = this.font;
        let cache = this.getTextWidthCache();
        // update cache
        const textChars = this._text.split('');
        textChars.forEach(function (ch) {
            if (!cache[ch]) {
                cache[ch] = context.measureText(ch).width;
            }
        });
        const keepWord = this._keepWord;
        let localLines = [];
        lines.forEach(function (line) {
            let str = '';
            let totalWidth = 0;
            let word = '';
            let wordWidth = 0;
            // はみ出ていたら強制的に改行する
            let lineChars = line.split('');
            lineChars.forEach(function (ch) {
                let w = cache[ch];
                // はみ出す場合
                if ((totalWidth + w) > rowWidth) {
                    localLines.push(str);
                    str = '';
                    // 次の行の長さを今までの単語の長さから開始する。
                    totalWidth = wordWidth;
                }
                // 単語の途中での改行が禁止されている場合
                if (keepWord) {
                    // ブランク以外の場合は単語が続いているものとして単語に追加する。
                    if (ch !== ' ') {
                        word += ch;
                        wordWidth += w;
                    }
                    else {
                        str += word;
                        str += ch;
                        word = '';
                        wordWidth = 0;
                    }
                    // はみ出すかどうかの判定のためにトータルの長さは常に計算する。
                    totalWidth += w;
                }
                else {
                    str += ch;
                    totalWidth += w;
                }
            });
            // 残りを push する
            localLines.push(str + word);
        });
        return localLines;
    },
});
// exportするものがないのでダミー変数をexportする。
var LabelAreaExDummy = 0;
export default LabelAreaExDummy;
