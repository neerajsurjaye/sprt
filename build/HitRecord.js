"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_1 = __importDefault(require("./Vec3"));
class HitRecord {
    constructor() {
        this.p = new Vec3_1.default(0, 0, 0);
        this.normal = new Vec3_1.default(0, 0, 0);
        this.t = 0;
        this.frontFace = false;
    }
    setFaceNormal(r, outwardNormal) {
        this.frontFace = r.direction.dot(outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : outwardNormal.multiply(-1);
    }
}
exports.default = HitRecord;
