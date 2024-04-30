class Utils{
    static _infinity : number = Number.POSITIVE_INFINITY;
    static _pi : number = 3.1415926535897932385;

    static get INFINITY(){
        return this._infinity; 
    }

    static get PI(){
        return this._pi;
    }

    static degreesToRadians(degrees : number) : number{
        return degrees * this.PI / 180;
    }

    static randomDouble() : number{
        return Math.random();
    }

    static randomDoubleRange(min : number , max : number){
        return min + (max - min) * this.randomDouble();
    }

    
    
}

export default Utils;