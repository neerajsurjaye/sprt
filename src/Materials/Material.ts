import HitRecord from "../Hittable/HitRecord";
import Color from "../Vectors/Color";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";

class Material{
    scatter (rin : Ray , rec : HitRecord , attenuation : Color , scattered : Ray) : boolean{
        return false;
    }
}

export default Material;