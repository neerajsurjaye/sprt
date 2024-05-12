import Color from "../Vectors/Color";
import HitRecord from "../Hittable/HitRecord";
import Material from "./Material";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";

class Lambertian extends Material{

    albedo: Color;

    constructor(albedo : Color){
        super();
        this.albedo = albedo;
    }

    scatter(rIn : Ray , rec : HitRecord , attenuation : Color , scattered : Ray) : boolean{
        let scatterDirection : Vec3 = rec.normal.add(Vec3.randomUnitVector());

        if(scatterDirection.nearZero()){
            scatterDirection = rec.normal;
        }

        scattered.origin = rec.p;
        scattered.direction = scatterDirection;

        attenuation.r = this.albedo.r;
        attenuation.g = this.albedo.g;
        attenuation.b = this.albedo.b;

        return true;
    }
}

export default Lambertian;