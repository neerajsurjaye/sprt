import { log } from "console";
import Color from "./color";
import Ray from "./ray";
import Vec3 from "./vec3";
import writer from "./writer";



function rayColor (ray : Ray) : Vec3{
    let unitDirection : Vec3 = ray.direction.unitVector();
    let a : number  = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
    return new Vec3(1 , 1 , 1).multiply(1.0 - a).add(new Vec3(0 , 0 , 1).multiply(a)); //see this part
}

function main(){

    //width / height = 16 / 9 ----> width * 9 = height * 16

    let aspectRatio : number = 16 / 9;
    let imageWidth : number = 400;

    let imageHeight : number = Math.floor(imageWidth / aspectRatio);
    imageHeight = (imageHeight < 1) ? 1 : imageHeight;

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

            let pixelColor : Vec3 = rayColor(ray);

            writer.appendToFile(fileName , Color.writeColor(pixelColor));

        }
    }

    console.log("Done Rendering :)");

}

main();

