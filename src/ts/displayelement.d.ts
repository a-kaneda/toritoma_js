/**
 * 画面に配置する要素。
 */
interface DisplayElement {

    /**
     * phina.jsのエレメントにノードを追加する。
     * @param parent 親ノード
     * @return 自インスタンス
     */
    addChildTo(parent: DisplayElement | phina.app.Element): this;

    /**
     * 親ノードから取り除く。
     * @return 自インスタンス
     */
    remove(): this;
}