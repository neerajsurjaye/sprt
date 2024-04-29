import HitRecord from "./HitRecord";
import Interval from "./Interval";
import Ray from "./Ray";

interface Hittable{
    hit(r : Ray , rayT : Interval , rec : HitRecord) : boolean;
}

export default Hittable;