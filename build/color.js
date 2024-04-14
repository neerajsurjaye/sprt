"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    static writeColor(col) {
        let r = col.x;
        let g = col.y;
        let b = col.z;
        return `${Math.floor(r * 255)} ${Math.floor(g * 255)} ${Math.floor(b * 255)}\n`;
    }
}
exports.default = Color;
