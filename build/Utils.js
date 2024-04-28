"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static get INFINITY() {
        return this._infinity;
    }
    static get PI() {
        return this._pi;
    }
    static degreesToRadians(degrees) {
        return degrees * this.PI / 180;
    }
}
Utils._infinity = Number.POSITIVE_INFINITY;
Utils._pi = 3.1415926535897932385;
exports.default = Utils;
