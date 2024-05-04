import { log } from "console";
import HitRecord from "./HitRecord";
import Hittable from "./Hittable";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";
import Interval from "../Utils/Interval";
import { close } from "fs";

class HittableList implements Hittable{

    objects : Array<Hittable>;

    constructor(){
        this.objects = [];
    }

    add (object : Hittable) : void {
        this.objects.push(object);
    }

    clear() : void{
        this.objects = [];
    }

    hit(r: Ray, rayT : Interval,  rec: HitRecord): boolean {
        let hitAnyThing : boolean = false;
        let closestSoFar : number = rayT.max;

        for(let object  of this.objects){
            if(object.hit(r , new Interval(rayT.min , closestSoFar) , rec)){
                hitAnyThing = true;
                closestSoFar = rec.t;

            }
        }      


        return hitAnyThing;

    }
    
}

export default HittableList;