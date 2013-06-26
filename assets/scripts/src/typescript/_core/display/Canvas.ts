///<reference path='CanvasElement.ts'/>

class Canvas extends CanvasElement {

    public element:any = null;

    constructor(canvasId:string)
    {
        super();

        this.stage = this;
        this.element = document.getElementById(canvasId);
        this.context = this.element.getContext("2d");

        this.width = this.element.width;
        this.height = this.element.height;
    }

    public enabled(value:bool):void
    {
        if (value == this.isEnabled) return;

        if (value) {

        } else {

        }

        super.enabled(value);
    }

    public addChild(displayObject:CanvasElement):void
    {
        displayObject.parent = this.stage;
        displayObject.stage = this.stage;
        displayObject.context = this.context;
        displayObject.createChildren();
    }

    public removeChild(displayObject:CanvasElement):void
    {
        displayObject.stage = null;
        displayObject.context = null;
    }

    public render():void
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }

}