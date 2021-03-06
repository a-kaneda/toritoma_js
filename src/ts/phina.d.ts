declare module phina {

    function globalize(): void;
    function define(path: string, params: any): void;
    function main(func: () => void): void;

    type ProgressEvent = {
        key: string,
        asset: any,
        progress: number;
    };

    module app {

        class Element extends phina.util.EventDispatcher {
            tweener: phina.accessory.Tweener;
            addChild(child: phina.app.Element): phina.app.Element;
            addChildTo(parent: phina.app.Element): this;
            remove(): this;
            removeChild(child: phina.app.Element): this;
        }

        class Object2D extends phina.app.Element {
            rotation: number;
            children: phina.app.Element[];
            x: number;
            y: number;
            width: number;
            height: number;
            scaleX: number;
            scaleY: number;
            originX: number;
            originY: number;
            setPosition(x: number, y: number): this;
            setOrigin(x: number, y: number): this;
            setInteractive(flag: boolean, type?: string): this;
            setScale(x: number, y?: number): this;
        }

        class Scene extends phina.app.Element {

        }

        class BaseApp extends phina.util.EventDispatcher {
            fps: number;
            enableStats(): this;
            run(): this;
        }
    }

    module display {

        class DisplayElement extends phina.app.Object2D {
            alpha: number;
            constructor(options?: any);
        }

        class PlainElement extends phina.display.DisplayElement {
            canvas: phina.graphics.Canvas;
        }

        class Shape extends phina.display.PlainElement {

        }

        class RectangleShape extends phina.display.Shape {

        }
        
        class Sprite extends phina.display.DisplayElement {
            image: phina.asset.Texture;
            srcRect: phina.geom.Rect;
            constructor(image: string | phina.asset.Texture, width?: number, height?: number);
            setFrameIndex(index: number, width: number, height: number): this;
        }

        class Label extends phina.display.Shape {
            text: string;
            font: string;
        }

        class DisplayScene extends phina.app.Scene {
            gridX: phina.util.Grid;
            gridY: phina.util.Grid;
        }

        class DomApp extends phina.app.BaseApp {
            domElement: HTMLImageElement;
            keyboard: phina.input.Keyboard;
            pointers: phina.input.Touch[];
        }

        class CanvasApp extends phina.display.DomApp {

        }

        class Layer extends phina.display.DisplayElement {

        }

        class PixiLayer extends phina.display.Layer {

        }
    }

    module accessory {

        class Accessory {
            attachTo(element: phina.app.Element): this;
        }

        class FrameAnimation extends phina.accessory.Accessory {
            paused: boolean;
            finished: boolean;
            currentFrameIndex: number;
            constructor(ss: string);
            gotoAndPlay(name: string): this;
        }
        
        class Tweener extends phina.accessory.Accessory {
            clear(): this;
            wait(time: number): this;
            set(value: any): this;
            setLoop(flag: boolean): this;
            play(): this;
        }
    }

    module graphics {

        class Canvas {
            domElement: HTMLImageElement;
            context: CanvasRenderingContext2D;
            constructor(canvas?: string);
            setSize(width: number, height: number): this;
        }
        
    }

    module asset {

        class Asset extends phina.util.EventDispatcher {
            src: string;
        }

        class AssetLoader extends phina.util.EventDispatcher {
            constructor(params?: any);
            load(params?: any): this;
        }

        class Texture extends Asset {
            domElement: HTMLImageElement;
            constructor();
        }

        class Sound extends phina.asset.Asset {
            loadFromBuffer(buffer?: AudioContext): this;
            play(when?: number, offset?: number, duration?: number): this;
            stop(): this;
        }

        class AssetManager {
            static get(type: string, key: string): any;
        }

        class SoundManager {
            static setVolume(volume: number): void;
            static playMusic(name: string, fadeTime?: number, loop?: boolean, when?: number, offset?: number, duration?: number): phina.asset.Sound | boolean;
            static stopMusic(fadeTime?: number): void;
            static pauseMusic(): void;
            static resumeMusic(): void;
            static setVolumeMusic(volume: number): SoundManager;
            static play(name: string, when?: number, offset?: number, duration?: number): phina.asset.Sound;
        }
    }

    module geom {

        class Rect {
            x: number;
            y: number;
            width: number;
            height: number;
            set(x: number, y: number, width: number, height: number): this;
        }
        
        class Vector2 {
            x: number;
            y: number;
            length(): number;
        }
    }

    module input {

        class Input {
            x: number;
            y: number;
        }

        class Keyboard extends Input {
            getKey(key: string | number): boolean;
            getKeyDown(key: string | number): boolean;
        }

        class Touch extends Input {
            id: number;
        }

        class Gamepad {
            getStickDirection(stickId: number): phina.geom.Vector2;
            getKey(button: number | string): boolean;
            getKeyDown(button: number | string): boolean;
        }

        class GamepadManager {
            constructor();
            gamepads: {[key: number]: phina.input.Gamepad[]};
            isConnected(index: number): boolean;
            get(index?: number): phina.input.Gamepad;
            update(): void; 
        }
    }

    module util {

        class EventDispatcher {
            onclick: (event: any) => void;
            on(type: string, listener: (event: any) => void): this;
        }

        class Grid {
            center(offset?: number): number;
        }
    }

    module game {

        class GameApp extends phina.display.CanvasApp {
            constructor(params?: any);
        }
    }

    module ui {

        class LabelArea extends phina.display.Label {
            constructor(options?: any);
            init(options?: any): void;
            getTextWidthCache(): {[key: string]: number};
            text: string;
            _text: string;
        }

        class LabelAreaEx extends phina.ui.LabelArea {
            
        }
    }

    module pixi {

        class Sprite extends phina.display.Sprite {
            constructor(image: string | phina.asset.Texture, width?: number, height?: number, sharedTexture?: PIXI.Texture);
            pixiObject: PIXI.Sprite;
        }
    }
}