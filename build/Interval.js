"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("./Utils"));
class Interval {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    static get UNIVERSE() {
        return this._universe;
    }
    static get EMPTY() {
        return this._empty;
    }
    size() {
        return this.max - this.min;
    }
    contains(x) {
        return x >= this.min && x <= this.max;
    }
    surrounds(x) {
        return x > this.min && x < this.max;
    }
}
Interval._universe = new Interval(-Utils_1.default.INFINITY, Utils_1.default.INFINITY);
Interval._empty = new Interval(Utils_1.default.INFINITY, -Utils_1.default.INFINITY);
exports.default = Interval;
