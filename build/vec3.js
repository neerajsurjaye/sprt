"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vec3 {
    constructor(x, y, z) {
        this.vec = [x, y, z];
    }
    get x() {
        return this.vec[0];
    }
    get y() {
        return this.vec[1];
    }
    get z() {
        return this.vec[2];
    }
    set x(val) {
        this.vec[0] = val;
    }
    set y(val) {
        this.vec[1] = val;
    }
    set z(val) {
        this.vec[2] = val;
    }
    add(adder) {
        let ret = new Vec3(0, 0, 0);
        ret.x = this.x + adder.x;
        ret.y = this.y + adder.y;
        ret.z = this.z + adder.z;
        return this;
    }
    substract(sub) {
        let ret = new Vec3(0, 0, 0);
        ret.x = this.x - sub.x;
        ret.y = this.y - sub.y;
        ret.z = this.z - sub.z;
        return this;
        //this.add(sub.multiply(-1));
    }
    multiply(mul) {
        let ret = new Vec3(0, 0, 0);
        ret.x = this.x * mul;
        ret.y = this.y * mul;
        ret.z = this.z * mul;
        return this;
    }
    multiplyVec(mul) {
        let ret = new Vec3(0, 0, 0);
        ret.x = this.x * mul.x;
        ret.y = this.y * mul.y;
        ret.z = this.z * mul.z;
        return this;
    }
    divide(div) {
        return this.multiply(1 / div);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    dot(inp) {
        return this.x * inp.x + this.y * inp.y + this.z * inp.z;
    }
    cross(inp) {
        return new Vec3(this.y * inp.z - this.z * inp.y, this.z * inp.x - this.x * inp.z, this.x * inp.y - this.y * inp.x);
    }
    unitVector() {
        return this.divide(this.length());
    }
}
exports.default = Vec3;
