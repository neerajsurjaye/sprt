import HitRecord from "../Hittable/HitRecord";
import Color from "../Vectors/Color";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";
import Material from "./Material";

class Metal extends Material{
    albedo: Color;
    constructor(albedo : Color){
        super();
        this.albedo = albedo;
    }

    scatter(rin : Ray , rec : HitRecord , attenuation : Color , scattered : Ray) : boolean{
        let reflected : Vec3 = Vec3.reflect(rin.direction , rec.normal);
        scattered.origin = rec.p;
        scattered.direction = reflected;
        attenuation.r = this.albedo.r;
        attenuation.g = this.albedo.g;
        attenuation.b = this.albedo.b;

        return true;
    }

}

export default Metal;