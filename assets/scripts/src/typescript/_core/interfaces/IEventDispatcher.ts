
interface IEventDispatcher
{
    addEventListener(type:string, func:Function, scope:any, priority?:number);
    removeEventListener(type:string, func:Function);
    dispatchEvent(type:string, data?:any);
}
