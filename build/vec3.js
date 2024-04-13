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
        console.log(`Adding ${val} for x  ${this.vec[0]}`);
    }
    set y(val) {
        this.vec[1] = val;
    }
    set z(val) {
        this.vec[2] = val;
    }
    add(adder) {
        this.x = this.x + adder.x;
        this.y = this.y + adder.y;
        this.z = this.z + adder.z;
        return this;
    }
    substract(sub) {
        this.x = this.x - sub.x;
        this.y = this.y - sub.y;
        this.z = this.z - sub.z;
        return this;
    }
    multiply(mul) {
        this.x = this.x * mul;
        this.y = this.y * mul;
        this.z = this.z * mul;
        return this;
    }
    divide(div) {
        this.multiply(1 / div);
    }
}
exports.default = Vec3;
