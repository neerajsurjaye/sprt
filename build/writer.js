"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function clearFile(fileName) {
    try {
        fs_1.default.writeFileSync(fileName, "");
    }
    catch (err) {
        console.error(err);
    }
}
function appendToFile(fileName, data) {
    try {
        fs_1.default.writeFileSync(fileName, data, { flag: 'a+' });
    }
    catch (err) {
        console.error(err);
    }
}
function testWriter(fileName) {
    try {
        fs_1.default.writeFileSync(fileName, "data writter");
    }
    catch (err) {
        console.error(err);
    }
}
exports.default = { testWriter, appendToFile, clearFile };
