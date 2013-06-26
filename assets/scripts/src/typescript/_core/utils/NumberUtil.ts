///<reference path=''/>

class NumberUtil {

    constructor() {}

    static degreesToRadians(degrees:number):number
    {
        return degrees * Math.PI / 180;
    }

    static radiansToDegrees(radians:number):number
    {
        return radians * 180 / Math.PI;
    }

    static bytesToMegabytes(bytes:number):number
    {
        return bytes / 1048576;
    }

}