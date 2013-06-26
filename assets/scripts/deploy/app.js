var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = [];
        this.parent = null;
    }
    EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
        if (typeof priority === "undefined") { priority = 0; }
        var list = this._listeners[type];
        if(list == null) {
            this._listeners[type] = list = [];
        }
        var index = 0;
        var listener;
        var i = list.length;
        while(--i > -1) {
            listener = list[i];
            if(listener.c === callback) {
                list.splice(i, 1);
            } else {
                if(index === 0 && listener.pr < priority) {
                    index = i + 1;
                }
            }
        }
        list.splice(index, 0, {
            c: callback,
            s: scope,
            pr: priority
        });
        return this;
    };
    EventDispatcher.prototype.removeEventListener = function (type, callback) {
        var list = this._listeners[type];
        if(list) {
            var i = list.length;
            while(--i > -1) {
                if(list[i].c === callback) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    };
    EventDispatcher.prototype.dispatchEvent = function (type, data) {
        if (typeof data === "undefined") { data = null; }
        var evt = {
            type: type,
            target: this,
            data: data
        };
        var list = this._listeners[type];
        if(list) {
            var i = list.length;
            var listener;
            while(--i > -1) {
                listener = list[i];
                listener.c.call(listener.s, evt);
            }
        }
        if(this.parent) {
            this.parent.dispatchEvent(type, data);
        }
        return this;
    };
    return EventDispatcher;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        this.name = null;
        this.element = null;
        this.isEnabled = false;
    }
    DisplayObject.prototype.createChildren = function () {
    };
    DisplayObject.prototype.addChild = function (displayObject) {
    };
    DisplayObject.prototype.removeChild = function (displayObject) {
    };
    DisplayObject.prototype.enabled = function (value) {
        if(value == this.isEnabled) {
            return;
        }
        if(value) {
        } else {
        }
        this.isEnabled = value;
    };
    DisplayObject.prototype.invalidateLayout = function () {
        this.layoutChildren();
    };
    DisplayObject.prototype.layoutChildren = function () {
    };
    return DisplayObject;
})(EventDispatcher);
var CanvasElement = (function (_super) {
    __extends(CanvasElement, _super);
    function CanvasElement() {
        _super.call(this);
        this.stage = null;
        this.context = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        TweenLite.ticker.addEventListener("tick", this.layoutChildren.bind(this), this);
    }
    CanvasElement.prototype.createChildren = function () {
    };
    CanvasElement.prototype.render = function () {
    };
    CanvasElement.prototype.enabled = function (value) {
        if(value == this.isEnabled) {
            return;
        }
        if(value) {
        } else {
        }
        this.isEnabled = value;
    };
    CanvasElement.prototype.readerStart = function () {
        this.context.save();
    };
    CanvasElement.prototype.layoutChildren = function () {
        if(!this.context || this.alpha <= 0 || !this.visible) {
            return;
        }
        this.readerStart();
        this.context.globalAlpha = this.alpha;
        this.render();
        this.renderEnd();
    };
    CanvasElement.prototype.renderEnd = function () {
        this.context.restore();
    };
    CanvasElement.prototype.addChild = function (displayObject) {
        displayObject.parent = this;
        displayObject.stage = this.stage;
        displayObject.context = this.context;
        displayObject.createChildren();
    };
    CanvasElement.prototype.removeChild = function (displayObject) {
        displayObject.stage = null;
        displayObject.context = null;
    };
    return CanvasElement;
})(DisplayObject);
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(canvasId) {
        _super.call(this);
        this.element = null;
        this.stage = this;
        this.element = document.getElementById(canvasId);
        this.context = this.element.getContext("2d");
        this.width = this.element.width;
        this.height = this.element.height;
    }
    Canvas.prototype.enabled = function (value) {
        if(value == this.isEnabled) {
            return;
        }
        if(value) {
        } else {
        }
        _super.prototype.enabled.call(this, value);
    };
    Canvas.prototype.addChild = function (displayObject) {
        displayObject.parent = this.stage;
        displayObject.stage = this.stage;
        displayObject.context = this.context;
        displayObject.createChildren();
    };
    Canvas.prototype.removeChild = function (displayObject) {
        displayObject.stage = null;
        displayObject.context = null;
    };
    Canvas.prototype.render = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Canvas;
})(CanvasElement);
var NumberUtil = (function () {
    function NumberUtil() {
    }
    NumberUtil.degreesToRadians = function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    NumberUtil.radiansToDegrees = function radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    NumberUtil.bytesToMegabytes = function bytesToMegabytes(bytes) {
        return bytes / 1048576;
    }
    return NumberUtil;
})();
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(image) {
        _super.call(this);
        this._image = null;
        this.ready = false;
        this._image = image;
        this.width = this._image.width;
        this.height = this._image.height;
    }
    Bitmap.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Bitmap.prototype.render = function () {
        this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        this.context.scale(this.scaleX, this.scaleY);
        this.context.rotate(NumberUtil.degreesToRadians(this.rotation));
        this.context.translate(-this.width * 0.5, -this.height * 0.5);
        this.context.drawImage(this._image, 0, 0);
    };
    return Bitmap;
})(CanvasElement);
var BaseEvent = (function () {
    function BaseEvent(type, target, data) {
        if (typeof data === "undefined") { data = null; }
        this.type = null;
        this.target = null;
        this.data = null;
        this.type = type;
        this.target = target;
        this.data = data;
    }
    BaseEvent.CHANGE = "baseEventChange";
    BaseEvent.COMPLETE = "baseEventComplete";
    BaseEvent.ENTER_FRAME = "baseEventEnterFrame";
    return BaseEvent;
})();
var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    function LoaderEvent(type, target) {
        _super.call(this, type, target);
    }
    LoaderEvent.COMPLETE = "loaderEventComplete";
    LoaderEvent.LOAD_COMPLETE = "loaderEventLoadComplete";
    return LoaderEvent;
})(BaseEvent);
var BulkLoader = (function (_super) {
    __extends(BulkLoader, _super);
    function BulkLoader() {
        _super.call(this);
        this._dataStores = [];
        this.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
    }
    BulkLoader.prototype.addFile = function (dataStore, key) {
        this._dataStores[key] = dataStore;
    };
    BulkLoader.prototype.getFile = function (key) {
        return this._dataStores[key];
    };
    BulkLoader.prototype.getImage = function (key) {
        return this._dataStores[key].data;
    };
    BulkLoader.prototype.load = function () {
        for(var key in this._dataStores) {
            var dataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }
    };
    BulkLoader.prototype.onLoadComplete = function (event) {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete);
        for(var key in this._dataStores) {
            var dataStore = this._dataStores[key];
            if(!dataStore.complete) {
                return;
            }
        }
        this.dispatchEvent(LoaderEvent.LOAD_COMPLETE);
    };
    return BulkLoader;
})(EventDispatcher);
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(path) {
        _super.call(this);
        this._image = null;
        this.complete = false;
        this.src = path;
        var self = this;
        this._image = new Image();
        this._image.onload = function () {
            self.onImageLoad();
        };
    }
    ImageLoader.prototype.load = function () {
        if(this.complete) {
            return;
        }
        this._image.src = this.src;
    };
    ImageLoader.prototype.onImageLoad = function () {
        this.complete = true;
        this.data = this._image;
        this.dispatchEvent(LoaderEvent.COMPLETE);
    };
    return ImageLoader;
})(EventDispatcher);
var BannerAd = (function () {
    function BannerAd() {
        this._canvas = null;
        this._cherry = null;
        this._cherryDipped = null;
        this._logo = null;
        this._boxOfCandy = null;
        this._bulkLoader = null;
        this._bulkLoader = new BulkLoader();
        this._bulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry.png"), "cherry");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry-dipped.png"), "cherry-dipped");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "logo.png"), "logo");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "box.png"), "box");
        this._bulkLoader.load();
    }
    BannerAd.BASE_PATH = "assets/images/";
    BannerAd.prototype.init = function (event) {
        this._bulkLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.init);
        this._canvas = new Canvas("stage");
        this._cherry = new Bitmap(this._bulkLoader.getImage("cherry"));
        this._cherry.x = 83;
        this._cherry.y = 3;
        this._canvas.addChild(this._cherry);
        this._cherryDipped = new Bitmap(this._bulkLoader.getImage("cherry-dipped"));
        this._cherryDipped.x = 83;
        this._cherryDipped.y = 37;
        this._cherryDipped.visible = false;
        this._canvas.addChild(this._cherryDipped);
        this._logo = new Bitmap(this._bulkLoader.getImage("logo"));
        this._logo.x = 222;
        this._logo.y = 27;
        this._canvas.addChild(this._logo);
        this._boxOfCandy = new Bitmap(this._bulkLoader.getImage("box"));
        this._boxOfCandy.x = 598;
        this._boxOfCandy.y = 2;
        this._boxOfCandy.alpha = 0;
        this._boxOfCandy.scaleX = 0;
        this._boxOfCandy.scaleY = 0;
        this._canvas.addChild(this._boxOfCandy);
        TweenLite.to(this._boxOfCandy, 1, {
            delay: 0.5,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            ease: Cubic.easeOut
        });
        TweenLite.to(this._cherry, 0.5, {
            delay: 1,
            y: 37,
            ease: Cubic.easeOut,
            onComplete: this.onCherryComplete.bind(this)
        });
    };
    BannerAd.prototype.onCherryComplete = function () {
        this._cherryDipped.visible = true;
        this._canvas.removeChild(this._cherry);
        TweenLite.to(this._cherryDipped, 0.5, {
            y: 3,
            ease: Cubic.easeInOut,
            onComplete: this.onCherryDippedComplete.bind(this)
        });
    };
    BannerAd.prototype.onCherryDippedComplete = function () {
        TweenLite.to(this._logo, 1, {
            rotation: 720,
            scaleX: 0.5,
            scaleY: 0.5,
            ease: Bounce.easeOut
        });
    };
    return BannerAd;
})();
