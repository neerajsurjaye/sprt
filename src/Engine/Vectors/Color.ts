import Interval from "../Utils/Interval";
import Vec3 from "./Vec3";

class Color extends Vec3{

    constructor(r : number , g : number , b : number){
        super(r , g , b);
    }

    get r(){
        return this.x;
    }

    get g(){
        return this.y;
    }

    get b(){
        return this.z;
    }

    set r(r : number){
        this.x = r;
    }

    set g(g : number){
        this.y = g;
    }

    set b(b : number){
        this.z = b;
    }

    //confusion about gamma
    static linearToGamma(linearComponent : number) : number{
        if(linearComponent > 0){
            return Math.sqrt(linearComponent);
        }
        return 0;
    }

    static writeColor(col : Vec3) : string{

        //maps 0->1 to 0->255
        let r = col.x;
        let g = col.y;
        let b = col.z;

        r = this.linearToGamma(r);
        g = this.linearToGamma(g);
        b = this.linearToGamma(b);

        let intensity : Interval = new Interval(0, 0.999);
        let rbyte : number = Math.round(256 * intensity.clamp(r));
        let gbyte : number = Math.round(256 * intensity.clamp(g));
        let bbyte : number = Math.round(256 * intensity.clamp(b));

        return `${Math.floor(rbyte)} ${Math.floor(gbyte)} ${Math.floor(bbyte)}\n`
    }
}

export default Color;