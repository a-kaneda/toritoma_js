import * as PIXI from 'pixi.js';

phina.define('phina.display.PixiLayer', {
    superClass: 'phina.display.Layer',

    stage: null,
    renderer: null,

    /** 子供を 自分のCanvasRenderer で描画するか */
    renderChildBySelf: true,

    init: function (options?: any) {
        this.superInit();
        options = (options || {}).$safe({
            width: 640,
            height: 640
        });

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(options.width, options.height, { transparent: true });
    },

    draw: function (canvas: phina.graphics.Canvas) {
        this.renderer.render(this.stage);
        var domElement = this.renderer.view;
        canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
    },

    addChild: function (child: phina.pixi.Sprite) {
        if (child.pixiObject) {
            this.stage.addChild(child.pixiObject);
        }
        return phina.display.Layer.prototype.addChild.call(this, child);
    },

    removeChild: function (child: phina.pixi.Sprite) {
        if (child.pixiObject) {
            this.stage.removeChild(child.pixiObject);
        }
        return phina.display.Layer.prototype.removeChild.call(this, child);
    }
});

// exportするものがないのでダミー変数をexportする。
var PixiLayerDummy = 0;
export default PixiLayerDummy;
