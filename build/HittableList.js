"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interval_1 = __importDefault(require("./Interval"));
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
    hit(r, rayT, rec) {
        let hitAnyThing = false;
        let closestSoFar = rayT.max;
        for (let object of this.objects) {
            if (object.hit(r, new Interval_1.default(rayT.min, closestSoFar), rec)) {
                hitAnyThing = true;
                closestSoFar = rec.t;
            }
        }
        return hitAnyThing;
    }
}
exports.default = HittableList;
