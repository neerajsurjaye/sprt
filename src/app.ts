import { log } from "console";
import Color from "./color";
import Ray from "./Ray";
import Vec3 from "./Vec3";
import writer from "./writer";
import Hittable from "./Hittable";
import HitRecord from "./HitRecord";
import Utils from "./Utils";
import HittableList from "./HittableList";
import Sphere from "./Sphere";



function rayColor (ray : Ray , world : Hittable) : Vec3{

    // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
    // if(t > 0){
    //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
    //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
    // }

    let rec : HitRecord = new HitRecord();
    if(world.hit(ray , 0 , Utils.INFINITY , rec)){        
        return rec.normal.add(new Vec3(1 , 1 ,1)).multiply(0.5);
    }

    let unitDirection : Vec3 = ray.direction.unitVector();
    let a : number  = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
    return new Vec3(1 , 1 , 1).multiply(1.0 - a).add(new Vec3(0 , 0 , 1).multiply(a)); //see this part
}

function hitSphere(center : Vec3 , radius : number , ray : Ray) :number{

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

    
    
    let oc : Vec3 = center.substract(ray.origin);
    let a : number = ray.direction.lengthSquared();
    let h : number = ray.direction.dot(oc);
    let c : number = oc.lengthSquared() - radius * radius;
    let discirminant = h * h -  a * c;

    if(discirminant < 0){
        return -1;
    }else{
        return (h - Math.sqrt(discirminant)) / (a);
    }
    
}

function main(){

    //width / height = 16 / 9 ----> width * 9 = height * 16

    let aspectRatio : number = 16 / 9;
    let imageWidth : number = 400;

    let imageHeight : number = Math.floor(imageWidth / aspectRatio);
    imageHeight = (imageHeight < 1) ? 1 : imageHeight;

    //world
    let world : HittableList = new HittableList();
    world.add(new Sphere(new Vec3(-0.2 , 0 , -2) , 0.5));
    world.add(new Sphere(new Vec3(0.8 , 0 , -2) , 0.5));
    world.add(new Sphere(new Vec3(-1 , 0 , -2) , 0.5));
    world.add(new Sphere(new Vec3(0 , -100.5, -1) , 100));

    let focalLength = 1.0;
    let viewPortHeight : number = 2;
    let viewPortWidth : number = viewPortHeight * (imageWidth / imageHeight); 
    let cameraCenter : Vec3  = new Vec3(0 , 0 , 0);

    log(`viewport w / h : ${viewPortWidth} , ${viewPortHeight}`);

    let viewPortU : Vec3 = new Vec3(viewPortWidth , 0 , 0);
    let viewPortV : Vec3 = new Vec3(0 , -viewPortHeight , 0);

    let pixelDeltaU  : Vec3 = viewPortU.divide(imageWidth);
    let pixelDeltaV  : Vec3  = viewPortV.divide(imageHeight);

    console.log(`PixelDetlas : ${pixelDeltaU.vec} , ${pixelDeltaV.vec}`);

    let viewPortUpperLeft = cameraCenter.substract(new Vec3(0 , 0 , focalLength)).substract(viewPortU.divide(2)).substract(viewPortV.divide(2));

    console.log(`ViewPortUpperLeft : ${viewPortUpperLeft.vec} `);

    let pixel00Loc = viewPortUpperLeft.add(pixelDeltaU.add(pixelDeltaV).multiply(0.5));
    
    console.log(`pixel00Loc : ${pixel00Loc.vec}`);






    const fileName = "out.ppm";
    writer.clearFile(fileName)
  


    writer.appendToFile(fileName , "P3\n");
    writer.appendToFile(fileName , `${imageWidth} ${imageHeight}\n`);
    writer.appendToFile(fileName , "255\n");

    for(let j = 0 ; j < imageHeight ; j++){
        console.log(`Lines remaining ${imageHeight - j} ----`);
        for(let i = 0 ; i < imageWidth ; i++){
            let pixelCenter = pixel00Loc.add(pixelDeltaU.multiply(i)).add(pixelDeltaV.multiply(j));

            //explore the substraction part
            let rayDirection = pixelCenter.substract(cameraCenter);
            let ray : Ray = new Ray(cameraCenter , rayDirection);

            let pixelColor : Vec3 = rayColor(ray , world);

            writer.appendToFile(fileName , Color.writeColor(pixelColor));

        }
    }

    console.log("Done Rendering :)");

}

main();

