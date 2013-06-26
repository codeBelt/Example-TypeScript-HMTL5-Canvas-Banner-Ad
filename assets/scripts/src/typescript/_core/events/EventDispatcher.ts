
class EventDispatcher {

    private _listeners:any[] = [];
    public parent:any = null;

    constructor() { }

    public addEventListener(type:string, callback:Function, scope:any, priority:number=0):any
    {
        var list = this._listeners[type];
        if (list == null) {
            this._listeners[type] = list = [];
        }

        var index:number = 0;
        var listener;
        var i:number = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.c === callback) {
                list.splice(i, 1);//If same callback is found remove it. It will be add back below.
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {c:callback, s:scope, pr:priority});

        return this;
    }

    public removeEventListener(type:string, callback:Function):any
    {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback) {
                    list.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    }

    public dispatchEvent(type:string, data:any=null):any
    {
        var evt = { type: type, target: this, data: data };

        var list = this._listeners[type];
        if (list) {
            var i:number = list.length;
            var listener:any;
            while (--i > -1) {
                listener = list[i];
                listener.c.call(listener.s, evt);
            }
        }

        //Dispatches up the chain of classes that have a parent.
        if (this.parent) {
            this.parent.dispatchEvent(type, data);
        }

        return this;
    }

}