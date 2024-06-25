import HitRecord from "./HitRecord";
import Hittable from "./Hittable";
import Interval from "../Utils/Interval";
import Material from "../Materials/Material";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";

class Sphere implements Hittable {
    center: Vec3;
    radius: number;
    mat: Material;

    constructor(center: Vec3, radius: number, mat: Material) {
        this.center = center;
        this.radius = Math.max(radius, 0);
        this.mat = mat;
    }

    hit(ray: Ray, rayT: Interval, rec: HitRecord): boolean {
        let oc: Vec3 = this.center.substract(ray.origin);
        let a: number = ray.direction.lengthSquared();
        let h: number = ray.direction.dot(oc);
        let c: number = oc.lengthSquared() - this.radius * this.radius;
        let discirminant = h * h - a * c;

        if (discirminant < 0) {
            return false;
        }

        let sqrtd: number = Math.sqrt(discirminant);
        let root: number = (h - sqrtd) / a;

        if (!rayT.surrounds(root)) {
            root = h + sqrtd / a;
            if (!rayT.surrounds(root)) {
                return false;
            }
        }

        rec.t = root;
        rec.p = ray.at(rec.t);
        let outwardNormal: Vec3 = rec.p
            .substract(this.center)
            .divide(this.radius);
        rec.setFaceNormal(ray, outwardNormal);
        rec.mat = this.mat;

        return true;
    }
}

export default Sphere;
