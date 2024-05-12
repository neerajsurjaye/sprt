import HitRecord from "../Hittable/HitRecord";
import Color from "../Vectors/Color";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";
import Material from "./Material";

class Metal extends Material{
    albedo: Color;
    fuzz : number;

    constructor(albedo : Color , fuzz : number){
        super();
        this.albedo = albedo;
        this.fuzz = fuzz;
    }

    scatter(rin : Ray , rec : HitRecord , attenuation : Color , scattered : Ray) : boolean{
        let reflected : Vec3 = Vec3.reflect(rin.direction , rec.normal);
        reflected = reflected.unitVector().add(Vec3.randomUnitVector().multiply(this.fuzz));
        scattered.origin = rec.p;
        scattered.direction = reflected;
        attenuation.r = this.albedo.r;
        attenuation.g = this.albedo.g;
        attenuation.b = this.albedo.b;

        return scattered.direction.dot(rec.normal) > 0;
    }

}

export default Metal;