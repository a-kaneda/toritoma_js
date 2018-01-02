/**
 * ポイントデバイスがマウスかタッチパネルかを調べる。
 */
class PointDevice {

    /** マウスが接続されているかどうか */
    private static _isMouseUsed: boolean;

    /**
     * マウス移動とタッチ操作の際に呼ばれ、
     * タッチ操作でない場合はマウス接続されていると判断する。
     * @param event イベント
     */
    static detectDeviceType(event: Event): void {

        // touchstartイベントの場合はマウス不使用とする。
        if (event.type === 'touchstart') {
            PointDevice._isMouseUsed = false;
        }
        else {
            PointDevice._isMouseUsed = true;
        }
	    document.removeEventListener('touchstart', PointDevice.detectDeviceType);
        document.removeEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /**
     * デバイスの種類を調べるため、タッチ開始、マウス移動の
     * イベントにチェック用関数を登録する。
     */
    static checkDeviceType(): void {
        PointDevice._isMouseUsed = false;
        document.addEventListener('touchstart', PointDevice.detectDeviceType);
        document.addEventListener('mousemove', PointDevice.detectDeviceType);
    }

    /** マウスが接続されているかどうか。 */
    static get isMouseUsed() {
        return this._isMouseUsed;
    }
}

export default PointDevice;
