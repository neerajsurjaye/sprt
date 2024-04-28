"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const color_1 = __importDefault(require("./color"));
const Ray_1 = __importDefault(require("./Ray"));
const Vec3_1 = __importDefault(require("./Vec3"));
const writer_1 = __importDefault(require("./writer"));
const HitRecord_1 = __importDefault(require("./HitRecord"));
const Utils_1 = __importDefault(require("./Utils"));
const HittableList_1 = __importDefault(require("./HittableList"));
const Sphere_1 = __importDefault(require("./Sphere"));
function rayColor(ray, world) {
    // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
    // if(t > 0){
    //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
    //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
    // }
    let rec = new HitRecord_1.default();
    if (world.hit(ray, 0, Utils_1.default.INFINITY, rec)) {
        console.log("rec.normal ", rec.normal);
        return rec.normal.add(new Vec3_1.default(1, 1, 1)).multiply(0.5);
    }
    let unitDirection = ray.direction.unitVector();
    let a = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
    return new Vec3_1.default(1, 1, 1).multiply(1.0 - a).add(new Vec3_1.default(0, 0, 1).multiply(a)); //see this part
}
function hitSphere(center, radius, ray) {
    // Old code 
    // let  oc : Vec3 = center.substract(ray.origin);
    // let a : number = ray.direction.dot(ray.direction);
    // let b : number = -2 * ray.direction.dot(oc);
    // let c : number = oc.dot(oc) - radius * radius;
    // let discirminant = b * b - 4 * a * c;
    // if(discirminant < 0){
    //     return -1;
    // }else{
    //     return (-b - Math.sqrt(discirminant)) / (2.0 * a);
    // }
    let oc = center.substract(ray.origin);
    let a = ray.direction.lengthSquared();
    let h = ray.direction.dot(oc);
    let c = oc.lengthSquared() - radius * radius;
    let discirminant = h * h - a * c;
    if (discirminant < 0) {
        return -1;
    }
    else {
        return (h - Math.sqrt(discirminant)) / (a);
    }
}
function main() {
    //width / height = 16 / 9 ----> width * 9 = height * 16
    let aspectRatio = 16 / 9;
    let imageWidth = 400;
    let imageHeight = Math.floor(imageWidth / aspectRatio);
    imageHeight = (imageHeight < 1) ? 1 : imageHeight;
    //world
    let world = new HittableList_1.default();
    world.add(new Sphere_1.default(new Vec3_1.default(0, 0, -1), 0.5));
    world.add(new Sphere_1.default(new Vec3_1.default(0, -100.5, -1), 100));
    let focalLength = 1.0;
    let viewPortHeight = 2;
    let viewPortWidth = viewPortHeight * (imageWidth / imageHeight);
    let cameraCenter = new Vec3_1.default(0, 0, 0);
    (0, console_1.log)(`viewport w / h : ${viewPortWidth} , ${viewPortHeight}`);
    let viewPortU = new Vec3_1.default(viewPortWidth, 0, 0);
    let viewPortV = new Vec3_1.default(0, -viewPortHeight, 0);
    let pixelDeltaU = viewPortU.divide(imageWidth);
    let pixelDeltaV = viewPortV.divide(imageHeight);
    console.log(`PixelDetlas : ${pixelDeltaU.vec} , ${pixelDeltaV.vec}`);
    let viewPortUpperLeft = cameraCenter.substract(new Vec3_1.default(0, 0, focalLength)).substract(viewPortU.divide(2)).substract(viewPortV.divide(2));
    console.log(`ViewPortUpperLeft : ${viewPortUpperLeft.vec} `);
    let pixel00Loc = viewPortUpperLeft.add(pixelDeltaU.add(pixelDeltaV).multiply(0.5));
    console.log(`pixel00Loc : ${pixel00Loc.vec}`);
    const fileName = "out.ppm";
    writer_1.default.clearFile(fileName);
    writer_1.default.appendToFile(fileName, "P3\n");
    writer_1.default.appendToFile(fileName, `${imageWidth} ${imageHeight}\n`);
    writer_1.default.appendToFile(fileName, "255\n");
    for (let j = 0; j < imageHeight; j++) {
        console.log(`Lines remaining ${imageHeight - j} ----`);
        for (let i = 0; i < imageWidth; i++) {
            let pixelCenter = pixel00Loc.add(pixelDeltaU.multiply(i)).add(pixelDeltaV.multiply(j));
            //explore the substraction part
            let rayDirection = pixelCenter.substract(cameraCenter);
            let ray = new Ray_1.default(cameraCenter, rayDirection);
            let pixelColor = rayColor(ray, world);
            writer_1.default.appendToFile(fileName, color_1.default.writeColor(pixelColor));
        }
    }
    console.log("Done Rendering :)");
}
main();
