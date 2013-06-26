///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

class BulkLoader extends EventDispatcher {

    private _dataStores:IDataStore[] = [];

    constructor()
    {
        super();

        this.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
    }

    public addFile(dataStore:IDataStore, key:string):void
    {
        this._dataStores[key] = dataStore;
    }

    public getFile(key:string):IDataStore
    {
        return this._dataStores[key];
    }

    public getImage(key:string):HTMLImageElement
    {
        return this._dataStores[key].data;
    }

    public load():void
    {
        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }
    }

    private onLoadComplete(event:LoaderEvent):void
    {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete);

        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            if(!dataStore.complete) {
                return;
            }
        }

        this.dispatchEvent(LoaderEvent.LOAD_COMPLETE);
    }

}