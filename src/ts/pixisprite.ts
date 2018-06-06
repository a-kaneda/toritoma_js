phina.define('phina.pixi.Sprite', {
    superClass: 'phina.display.Sprite',

    pixiObject: null,

    init: function (image: string | phina.asset.Texture, width?: number, height?: number): void {
        this.superInit(image, width, height);

        this.pixiObject = PIXI.Sprite.fromImage(this.image.src, false, PIXI.SCALE_MODES.NEAREST);
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
        });
    },

    setFrameIndex: function (index: number, width: number, height: number): void {
        phina.display.Sprite.prototype.setFrameIndex.apply(this, arguments);
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

        this.pixiObject = PIXI.Sprite.fromImage(newImage.src, false, PIXI.SCALE_MODES.NEAREST);
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
        return phina.display.Sprite.prototype.setPosition.apply(this, arguments);
    },

    setOrigin: function (x: number, y: number): phina.app.Element {
        this.pixiObject.anchor.set(x, y);
        return phina.display.Sprite.prototype.setOrigin.apply(this, arguments);
    },

    setScale: function (x: number, y: number): phina.app.Element {
        y = y || x;
        this.pixiObject.scale.set(x, y);
        return phina.display.Sprite.prototype.setScale.apply(this, arguments);
    },

    setSrcRect: function(x: number, y: number, w: number, h: number): phina.pixi.Sprite {
        this.srcRect.set(x, y, w, h);
        this.pixiObject.texture.frame = new PIXI.Rectangle(this.srcRect.x, this.srcRect.y, this.srcRect.width, this.srcRect.height);
        return this;
    },
});

// exportするものがないのでダミー変数をexportする。
var PixiSpriteDummy = 0;
export default PixiSpriteDummy;