"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("./color"));
const vec3_1 = __importDefault(require("./vec3"));
const writer_1 = __importDefault(require("./writer"));
function main() {
    const fileName = "out.ppm";
    writer_1.default.clearFile(fileName);
    let width = 256;
    let height = 256;
    writer_1.default.appendToFile(fileName, "P3\n");
    writer_1.default.appendToFile(fileName, `${width} ${height}\n`);
    writer_1.default.appendToFile(fileName, "255\n");
    for (let i = 0; i < height; i++) {
        console.log(`Lines remaining ${height - i} ----`);
        for (let j = 0; j < width; j++) {
            let pixelColor = new vec3_1.default(i / (width - 1), j / (height - 1), 0);
            writer_1.default.appendToFile(fileName, color_1.default.writeColor(pixelColor));
        }
    }
    console.log("Done Rendering :)");
}
main();
