///<reference path='_declare/greensock.d.ts'/>
///<reference path='_core/display/Canvas.ts'/>
///<reference path='_core/display/Bitmap.ts'/>
///<reference path='_core/utils/BulkLoader.ts'/>
///<reference path='_core/utils/ImageLoader.ts'/>
///<reference path='_core/events/LoaderEvent.ts'/>

class BannerAd {

    static BASE_PATH:string = "assets/images/";

    private _canvas:Canvas = null;
    private _cherry:Bitmap = null;
    private _cherryDipped:Bitmap = null;
    private _logo:Bitmap = null;
    private _boxOfCandy:Bitmap = null;

    private _bulkLoader:BulkLoader = null;

    constructor()
    {
        this._bulkLoader = new BulkLoader();
        this._bulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry.png"), "cherry");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry-dipped.png"), "cherry-dipped");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "logo.png"), "logo");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "box.png"), "box");
        this._bulkLoader.load();
    }

    private init(event:LoaderEvent):void
    {
        this._bulkLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.init);

        this._canvas = new Canvas("stage");

        this._cherry = new Bitmap( this._bulkLoader.getImage("cherry") );
        this._cherry.x = 83;
        this._cherry.y = 3;
        this._canvas.addChild(this._cherry);

        this._cherryDipped = new Bitmap( this._bulkLoader.getImage("cherry-dipped") );
        this._cherryDipped.x = 83;
        this._cherryDipped.y = 37;
        this._cherryDipped.visible = false;
        this._canvas.addChild(this._cherryDipped);

        this._logo = new Bitmap( this._bulkLoader.getImage("logo") );
        this._logo.x = 222;
        this._logo.y = 27;
        this._canvas.addChild(this._logo);

        this._boxOfCandy = new Bitmap( this._bulkLoader.getImage("box") );
        this._boxOfCandy.x = 598;
        this._boxOfCandy.y = 2;
        this._boxOfCandy.alpha = 0;
        this._boxOfCandy.scaleX = 0;
        this._boxOfCandy.scaleY = 0;
        this._canvas.addChild(this._boxOfCandy);

        TweenLite.to(this._boxOfCandy, 1, {delay: 0.5, alpha:1, scaleX:1, scaleY:1, ease:Cubic.easeOut});
        TweenLite.to(this._cherry, 0.5, {delay: 1, y:37, ease:Cubic.easeOut, onComplete: this.onCherryComplete.bind(this)});
    }

    private onCherryComplete():void
    {
        this._cherryDipped.visible = true;
        this._canvas.removeChild(this._cherry);

        TweenLite.to(this._cherryDipped, 0.5, {y:3, ease:Cubic.easeInOut, onComplete: this.onCherryDippedComplete.bind(this)});
    }

    private onCherryDippedComplete():void
    {
        TweenLite.to(this._logo, 1, { rotation:720, scaleX:0.5, scaleY:0.5, ease:Bounce.easeOut});
    }

}