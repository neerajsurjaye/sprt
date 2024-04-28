import { log } from "console";
import HitRecord from "./HitRecord";
import Hittable from "./Hittable";
import Ray from "./Ray";
import Vec3 from "./Vec3";

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

    hit(r: Ray, ray_tmin: number, ray_tmax: number, rec: HitRecord): boolean {
        let hitAnyThing : boolean = false;
        let closestSoFar : number = ray_tmax;

        for(let object  of this.objects){
            if(object.hit(r , ray_tmin , closestSoFar,rec)){
                hitAnyThing = true;
                closestSoFar = rec.t;

            }
        }      


        return hitAnyThing;

    }
    
}

export default HittableList;