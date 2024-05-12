import HitRecord from "./HitRecord";
import Interval from "../Utils/Interval";
import Ray from "../Vectors/Ray";

interface Hittable{
    hit(r : Ray , rayT : Interval , rec : HitRecord) : boolean;
}

export default Hittable;