"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_1 = __importDefault(require("./Vec3"));
const vec = new Vec3_1.default(1, 2, 34);
const vec2 = new Vec3_1.default(1, 2, 3);
vec.add(vec);
console.log(vec.vec);
