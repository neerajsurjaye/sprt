"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sphere {
    constructor(center, radius) {
        this.center = center;
        this.radius = Math.max(radius, 0);
    }
    hit(ray, ray_tmin, ray_tmax, rec) {
        let oc = this.center.substract(ray.origin);
        let a = ray.direction.lengthSquared();
        let h = ray.direction.dot(oc);
        let c = oc.lengthSquared() - this.radius * this.radius;
        let discirminant = h * h - a * c;
        if (discirminant < 0) {
            return false;
        }
        let sqrtd = Math.sqrt(discirminant);
        let root = (h - sqrtd) / a;
        if (root <= ray_tmin || root >= ray_tmax) {
            root = h + sqrtd / a;
            if (root <= ray_tmin || root >= ray_tmax) {
                return false;
            }
        }
        rec.t = root;
        rec.p = ray.at(rec.t);
        let outwardNormal = rec.p.substract(this.center).divide(this.radius);
        rec.setFaceNormal(ray, outwardNormal);
        return true;
    }
}
exports.default = Sphere;
