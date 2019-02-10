phina.define('phina.pixi.Sprite', {
    superClass: 'phina.display.Sprite',

    pixiObject: null,

    init: function (image: string | phina.asset.Texture, width?: number, height?: number, shareTexture?: PIXI.Texture): void {
        this.superInit(image, width, height);

        if (shareTexture) {
            this.pixiObject = new PIXI.Sprite(shareTexture);
        }
        else {
            this.pixiObject = new PIXI.Sprite(PIXI.Texture.fromCanvas(this.image.domElement, PIXI.SCALE_MODES.NEAREST));
        }
        this.pixiObject.anchor.set(0.5, 0.5);

        this.pixiObject.texture.baseTexture.width = this.image.domElement.width;
        this.pixiObject.texture.baseTexture.height = this.image.domElement.height;

        this.on('enterframe', function (this: phina.pixi.Sprite, e: any) {
            // Elementと必要な情報を同期
            this.pixiObject.position.set(this.x, this.y);
            this.pixiObject.rotation = this.rotation * (Math.PI / 180);
            this.pixiObject.scale.set(this.scaleX, this.scaleY);
            this.pixiObject.anchor.set(this.originX, this.originY);
            this.pixiObject.alpha = this.alpha;
            this.pixiObject.texture.frame.x = this.srcRect.x;
            this.pixiObject.texture.frame.y = this.srcRect.y;
            this.pixiObject.texture.frame.width = this.srcRect.width;
            this.pixiObject.texture.frame.height = this.srcRect.height;
            this.pixiObject.texture._updateUvs();
        });
    },

    setFrameIndex: function (index: number, width: number, height: number): void {
        phina.display.Sprite.prototype.setFrameIndex.call(this, index, width, height);
        this.pixiObject.texture.frame = new PIXI.Rectangle(this.srcRect.x, this.srcRect.y, this.srcRect.width, this.srcRect.height);
        return this;
    },

    setImage: function (image: string | phina.asset.Texture, width: number, height: number): phina.pixi.Sprite {
        let newImage: phina.asset.Texture;
        if (typeof image === 'string') {
            newImage = phina.asset.AssetManager.get('image', image);
        }
        else {
            newImage = image;
        }
            
        this._image = newImage;

        this.pixiObject = new PIXI.Sprite(new PIXI.Texture(PIXI.BaseTexture.fromCanvas(this.image.domElement, PIXI.SCALE_MODES.NEAREST)));
        this.pixiObject.texture.baseTexture.width = this.image.domElement.width;
        this.pixiObject.texture.baseTexture.height = this.image.domElement.height;

        this.width = this._image.domElement.width;
        this.height = this._image.domElement.height;
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        this.frameIndex = 0;

        this.pixiObject.texture.frame = new PIXI.Rectangle(this.srcRect.x, this.srcRect.y, this.srcRect.width, this.srcRect.height);
        return this;
    },

    setPosition: function (x: number, y: number): phina.app.Element {
        this.pixiObject.position.set(x, y);
        return phina.display.Sprite.prototype.setPosition.call(this, x, y);
    },

    setOrigin: function (x: number, y: number): phina.app.Element {
        this.pixiObject.anchor.set(x, y);
        return phina.display.Sprite.prototype.setOrigin.call(this, x, y);
    },

    setScale: function (x: number, y: number): phina.app.Element {
        y = y || x;
        this.pixiObject.scale.set(x, y);
        return phina.display.Sprite.prototype.setScale.call(this, x, y);
    },
});

// exportするものがないのでダミー変数をexportする。
var PixiSpriteDummy = 0;
export default PixiSpriteDummy;