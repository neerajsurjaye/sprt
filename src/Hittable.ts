import HitRecord from "./HitRecord";
import Ray from "./Ray";

interface Hittable{
    hit(r : Ray , ray_tmin : number, ray_tmax : number , rec : HitRecord) : boolean;
}

export default Hittable;