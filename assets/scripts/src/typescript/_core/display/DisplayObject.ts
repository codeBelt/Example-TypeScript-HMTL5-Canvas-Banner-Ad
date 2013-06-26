///<reference path='../events/EventDispatcher.ts'/>

class DisplayObject extends EventDispatcher {

    public name:string = null;
    public element:any = null;
    public isEnabled:bool = false;

    constructor()
    {
        super();
    }

    public createChildren():void
    {
        //Meant to be overridden.
    }

    public addChild(displayObject:DisplayObject):void
    {
        //Meant to be overridden.
    }

    public removeChild(displayObject:DisplayObject):void
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

    public invalidateLayout():void
    {
        this.layoutChildren();
    }

    public layoutChildren():void
    {
    }

}