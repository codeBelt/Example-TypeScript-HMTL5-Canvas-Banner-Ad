///<reference path=''/>

class StringUtil {

    constructor() {}

    static stringToBoolean(str:string):bool
    {
        return (str.toLowerCase() == "true" || str.toLowerCase() == "1");
    }

    static getExtension(filename:string):string
    {
        return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
    }

}