"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const writer_js_1 = __importDefault(require("./writer.js"));
function main() {
    const fileName = "out.ppm";
    writer_js_1.default.clearFile(fileName);
    let width = 256;
    let height = 256;
    writer_js_1.default.appendToFile(fileName, "P3\n");
    writer_js_1.default.appendToFile(fileName, `${width} ${height}\n`);
    writer_js_1.default.appendToFile(fileName, "255\n");
    for (let i = 0; i < height; i++) {
        console.log(`Lines remaining ${height - i} ----`);
        for (let j = 0; j < width; j++) {
            writer_js_1.default.appendToFile(fileName, `${i} ${j} ${(255 - Math.min(i, j))}\n`);
        }
    }
    console.log("Done Rendering :)");
}
main();
