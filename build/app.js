"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_1 = __importDefault(require("./Vec3"));
const HittableList_1 = __importDefault(require("./HittableList"));
const Sphere_1 = __importDefault(require("./Sphere"));
const Camera_1 = __importDefault(require("./Camera"));
// function rayColor (ray : Ray , world : Hittable) : Vec3{
//     // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
//     // if(t > 0){
//     //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
//     //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
//     // }
//     let rec : HitRecord = new HitRecord();
//     if(world.hit(ray , 0 , Utils.INFINITY , rec)){        
//         return rec.normal.add(new Vec3(1 , 1 ,1)).multiply(0.5);
//     }
//     let unitDirection : Vec3 = ray.direction.unitVector();
//     let a : number  = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
//     return new Vec3(1 , 1 , 1).multiply(1.0 - a).add(new Vec3(0 , 0 , 1).multiply(a)); //see this part
// }
// function hitSphere(center : Vec3 , radius : number , ray : Ray) :number{
//     // Old code 
//     // let  oc : Vec3 = center.substract(ray.origin);
//     // let a : number = ray.direction.dot(ray.direction);
//     // let b : number = -2 * ray.direction.dot(oc);
//     // let c : number = oc.dot(oc) - radius * radius;
//     // let discirminant = b * b - 4 * a * c;
//     // if(discirminant < 0){
//     //     return -1;
//     // }else{
//     //     return (-b - Math.sqrt(discirminant)) / (2.0 * a);
//     // }
//     let oc : Vec3 = center.substract(ray.origin);
//     let a : number = ray.direction.lengthSquared();
//     let h : number = ray.direction.dot(oc);
//     let c : number = oc.lengthSquared() - radius * radius;
//     let discirminant = h * h -  a * c;
//     if(discirminant < 0){
//         return -1;
//     }else{
//         return (h - Math.sqrt(discirminant)) / (a);
//     }
// }
function main() {
    //width / height = 16 / 9 ----> width * 9 = height * 16
    //world
    let world = new HittableList_1.default();
    world.add(new Sphere_1.default(new Vec3_1.default(-0.2, 0, -2), 0.5));
    world.add(new Sphere_1.default(new Vec3_1.default(0.8, 0, -2), 0.5));
    world.add(new Sphere_1.default(new Vec3_1.default(-1, 0, -2), 0.5));
    world.add(new Sphere_1.default(new Vec3_1.default(0, -100.5, -1), 100));
    let camera = new Camera_1.default();
    camera.render(world);
    console.log("Done Rendering :)");
}
main();
