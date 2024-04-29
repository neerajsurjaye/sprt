"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HitRecord_1 = __importDefault(require("./HitRecord"));
const Ray_1 = __importDefault(require("./Ray"));
const Utils_1 = __importDefault(require("./Utils"));
const Vec3_1 = __importDefault(require("./Vec3"));
const Color_1 = __importDefault(require("./Color"));
const writer_1 = __importDefault(require("./writer"));
const Interval_1 = __importDefault(require("./Interval"));
class Camera {
    constructor() {
        this.aspectRatio = 16 / 9;
        this.imageWidth = 400;
        this.imageHeight = Math.floor(this.imageWidth / this.aspectRatio);
        this.imageHeight = (this.imageHeight < 1) ? 1 : this.imageHeight;
        this.focalLength = 1.0;
        this.viewPortHeight = 2;
        this.viewPortWidth = this.viewPortHeight * (this.imageWidth / this.imageHeight);
        this.cameraCenter = new Vec3_1.default(0, 0, 0);
        console.log(`viewport w / h : ${this.viewPortWidth} , ${this.viewPortHeight}`);
        this.viewPortU = new Vec3_1.default(this.viewPortWidth, 0, 0);
        this.viewPortV = new Vec3_1.default(0, -this.viewPortHeight, 0);
        this.pixelDeltaU = this.viewPortU.divide(this.imageWidth);
        this.pixelDeltaV = this.viewPortV.divide(this.imageHeight);
        console.log(`PixelDetlas : ${this.pixelDeltaU.vec} , ${this.pixelDeltaV.vec}`);
        this.viewPortUpperLeft = this.cameraCenter.substract(new Vec3_1.default(0, 0, this.focalLength)).substract(this.viewPortU.divide(2)).substract(this.viewPortV.divide(2));
        console.log(`ViewPortUpperLeft : ${this.viewPortUpperLeft.vec} `);
        this.pixel00Loc = this.viewPortUpperLeft.add(this.pixelDeltaU.add(this.pixelDeltaV).multiply(0.5));
        console.log(`pixel00Loc : ${this.pixel00Loc.vec}`);
    }
    render(world) {
        const fileName = "out.ppm";
        writer_1.default.clearFile(fileName);
        writer_1.default.appendToFile(fileName, "P3\n");
        writer_1.default.appendToFile(fileName, `${this.imageWidth} ${this.imageHeight}\n`);
        writer_1.default.appendToFile(fileName, "255\n");
        for (let j = 0; j < this.imageHeight; j++) {
            console.log(`Lines remaining ${this.imageHeight - j} ----`);
            for (let i = 0; i < this.imageWidth; i++) {
                let pixelCenter = this.pixel00Loc.add(this.pixelDeltaU.multiply(i)).add(this.pixelDeltaV.multiply(j));
                //explore the substraction part
                let rayDirection = pixelCenter.substract(this.cameraCenter);
                let ray = new Ray_1.default(this.cameraCenter, rayDirection);
                let pixelColor = this.rayColor(ray, world);
                writer_1.default.appendToFile(fileName, Color_1.default.writeColor(pixelColor));
            }
        }
    }
    rayColor(ray, world) {
        // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
        // if(t > 0){
        //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
        //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
        // }
        let rec = new HitRecord_1.default();
        if (world.hit(ray, new Interval_1.default(0, Utils_1.default.INFINITY), rec)) {
            return rec.normal.add(new Vec3_1.default(1, 1, 1)).multiply(0.5);
        }
        //colors world background
        let unitDirection = ray.direction.unitVector();
        let a = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
        return new Vec3_1.default(1, 1, 1).multiply(1.0 - a).add(new Vec3_1.default(0, 0, 1).multiply(a)); //see this part
    }
}
exports.default = Camera;
