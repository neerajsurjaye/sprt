"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HittableList {
    constructor() {
        this.objects = [];
    }
    add(object) {
        this.objects.push(object);
    }
    clear() {
        this.objects = [];
    }
    hit(r, ray_tmin, ray_tmax, rec) {
        let hitAnyThing = false;
        let closestSoFar = ray_tmax;
        for (let object of this.objects) {
            if (object.hit(r, ray_tmin, closestSoFar, rec)) {
                hitAnyThing = true;
                closestSoFar = rec.t;
            }
        }
        return hitAnyThing;
    }
}
exports.default = HittableList;
