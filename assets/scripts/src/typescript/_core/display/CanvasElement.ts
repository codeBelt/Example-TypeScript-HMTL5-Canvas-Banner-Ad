///<reference path='DisplayObject.ts'/>
///<reference path='Canvas.ts'/>

class CanvasElement extends DisplayObject {

    public stage:Canvas = null;
    public context:CanvasRenderingContext2D = null;
    public x:number = 0;
    public y:number = 0;
    public width:number = 0;
    public height:number = 0;
    public scaleX:number = 1;
    public scaleY:number = 1;
    public rotation:number = 0;
    public alpha:number = 1;
    public visible:bool = true;

    constructor()
    {
        super();
        TweenLite.ticker.addEventListener("tick", this.layoutChildren.bind(this), this);
    }

    public createChildren():void
    {
        //Meant to be overridden.
    }

    public render():void
    {
        //Meant to be overridden.
    }

    public enabled(value:bool):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

    private readerStart():void
    {
        this.context.save();
    }

    public layoutChildren():void
    {
        if (!this.context || this.alpha <= 0 || !this.visible) return;

        this.readerStart();
        this.context.globalAlpha = this.alpha;
        this.render();
        this.renderEnd();
    }

    private renderEnd():void
    {
        this.context.restore();
    }

    public addChild(displayObject:CanvasElement):void
    {
        displayObject.parent = this;
        displayObject.stage = this.stage;
        displayObject.context = this.context;
        displayObject.createChildren();
    }

    public removeChild(displayObject:CanvasElement):void
    {
        displayObject.stage = null;
        displayObject.context = null;
    }

}