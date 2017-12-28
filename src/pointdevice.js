/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
export default class PointDevice {

    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     *
     * @param event イベント
     */
    static detectDeviceType(event) {
        PointDevice._isMouseUsed = !event.changedTouches;
	    document.removeEventListener('touchstart', PointDevice.detectDeviceType);
        document.removeEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /**
     * デバイスの種類を調べるため、タッチ開始、マウス移動の
     * イベントにチェック用関数を登録する。
     */
    static checkDeviceType() {
        PointDevice._isMouseUsed = false;
        document.addEventListener('touchstart', PointDevice.detectDeviceType);
        document.addEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /**
     * マウスが接続されているかどうかを取得する。
     *
     * @return マウスが接続されているかどうか
     */
    static get isMouseUsed() {
        return this._isMouseUsed;
    }
}
