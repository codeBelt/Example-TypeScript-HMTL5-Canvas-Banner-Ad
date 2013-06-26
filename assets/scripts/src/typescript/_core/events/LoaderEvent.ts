///<reference path='BaseEvent.ts'/>

class LoaderEvent extends BaseEvent {

    static COMPLETE:string = "loaderEventComplete";
    static LOAD_COMPLETE:string = "loaderEventLoadComplete";

    constructor(type:string, target:any)
    {
        super(type, target);
    }

}