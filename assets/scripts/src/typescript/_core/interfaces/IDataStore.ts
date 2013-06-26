///<reference path='IEventDispatcher.ts'/>

interface IDataStore extends IEventDispatcher
{
    data:any;
    src:string;
    complete:bool;
    load():void;
}