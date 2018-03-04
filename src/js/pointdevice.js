/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
class PointDevice {
    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     * @param event イベント
     */
    static detectDeviceType(event) {
        // touchstartイベントの場合はマウス不使用とする。
        if (event.type === 'touchstart') {
            PointDevice._isMouseUsed = false;
            PointDevice._isTouchUsed = true;
        }
        else {
            PointDevice._isMouseUsed = true;
            PointDevice._isTouchUsed = false;
        }
        document.removeEventListener('touchstart', PointDevice.detectDeviceType, true);
        document.removeEventListener('mousemove', PointDevice.detectDeviceType, true);
    }
    /**
     * デバイスの種類を調べるため、タッチ開始、マウス移動の
     * イベントにチェック用関数を登録する。
     */
    static checkDeviceType() {
        PointDevice._isMouseUsed = false;
        PointDevice._isTouchUsed = false;
        document.addEventListener('touchstart', PointDevice.detectDeviceType, true);
        document.addEventListener('mousemove', PointDevice.detectDeviceType, true);
    }
    /** マウスが接続されているかどうか。 */
    static get isMouseUsed() {
        return PointDevice._isMouseUsed;
    }
    /** タッチデバイスがあるかどうか */
    static get isTouchUsed() {
        return PointDevice._isTouchUsed;
    }
}
export default PointDevice;
