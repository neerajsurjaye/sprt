import HitRecord from "./HitRecord";
import Hittable from "./Hittable";
import Ray from "./Ray";
import Vec3 from "./Vec3";

class Sphere implements Hittable{
    center: Vec3;
    radius : number;

    constructor(center : Vec3, radius : number){
        this.center = center;
        this.radius = Math.max(radius , 0);
    }

    hit(ray: Ray, ray_tmin: number, ray_tmax: number, rec: HitRecord): boolean {
        let oc : Vec3 = this.center.substract(ray.origin);
        let a : number = ray.direction.lengthSquared();
        let h : number = ray.direction.dot(oc);
        let c : number = oc.lengthSquared() - this.radius * this.radius;
        let discirminant = h * h -  a * c;

        if(discirminant < 0){
            return false;
        }

        let sqrtd : number = Math.sqrt(discirminant);
        let root : number = h - sqrtd / a;
        
        if(root <= ray_tmin || root >=  ray_tmax){
            root = h + sqrtd / a;
            if(root <= ray_tmin || root >=  ray_tmax){
                return false;
            }
        }

        rec.t = root;
        rec.p = ray.at(rec.t);
        let outwardNormal : Vec3 = rec.p.substract(this.center).divide(this.radius);        
        rec.setFaceNormal(ray , outwardNormal);

        return true;

    }
    
}

export default Sphere;