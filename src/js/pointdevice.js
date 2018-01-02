/** @module pointdevice */
/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
class PointDevice {
    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     * @param {TouchEvent} event - イベント
     */
    static detectDeviceType(event) {
        if (event.type.indexOf('touch') === 0) {
            PointDevice._isMouseUsed = true;
        }
        else {
            PointDevice._isMouseUsed = false;
        }
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
     * マウスが接続されているかどうか。
     * @type {boolean}
     */
    static get isMouseUsed() {
        return this._isMouseUsed;
    }
}
export default PointDevice;
