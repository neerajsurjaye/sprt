import HitRecord from "./HitRecord";
import Hittable from "./Hittable";
import Ray from "./Ray";
import Utils from "./Utils";
import Vec3 from "./Vec3";
import Color from "./Color";
import writer from "./writer";
import Interval from "./Interval";

class Camera{

    aspectRatio : number;
    imageWidth : number;
    imageHeight : number;    
    focalLength : number;
    viewPortHeight : number;
    viewPortWidth : number;
    cameraCenter : Vec3;
    viewPortV: Vec3;
    viewPortU: Vec3;
    pixel00Loc: Vec3;
    pixelDeltaU: Vec3;
    pixelDeltaV: Vec3;
    viewPortUpperLeft: Vec3;
    

    constructor(){

        this.aspectRatio = 16 / 9;
        this.imageWidth = 400;

        this.imageHeight = Math.floor(this.imageWidth / this.aspectRatio);
        this.imageHeight = (this.imageHeight < 1) ? 1 : this.imageHeight;

        this.focalLength  = 1.0;
        this.viewPortHeight  = 2;
        this.viewPortWidth = this.viewPortHeight * (this.imageWidth / this.imageHeight); 
        this.cameraCenter = new Vec3(0 , 0 , 0);

        console.log(`viewport w / h : ${this.viewPortWidth} , ${this.viewPortHeight}`);

        this.viewPortU = new Vec3(this.viewPortWidth , 0 , 0);
        this.viewPortV  = new Vec3(0 , -this.viewPortHeight , 0);

        this.pixelDeltaU   = this.viewPortU.divide(this.imageWidth);
        this.pixelDeltaV   = this.viewPortV.divide(this.imageHeight);

        console.log(`PixelDetlas : ${this.pixelDeltaU.vec} , ${this.pixelDeltaV.vec}`);

        this.viewPortUpperLeft = this.cameraCenter.substract(new Vec3(0 , 0 , this.focalLength)).substract(this.viewPortU.divide(2)).substract(this.viewPortV.divide(2));

        console.log(`ViewPortUpperLeft : ${this.viewPortUpperLeft.vec} `);

        this.pixel00Loc = this.viewPortUpperLeft.add(this.pixelDeltaU.add(this.pixelDeltaV).multiply(0.5));
        
        console.log(`pixel00Loc : ${this.pixel00Loc.vec}`);
    }


    render(world : Hittable) : void{
        
    
        const fileName = "out.ppm";
        writer.clearFile(fileName)
    


        writer.appendToFile(fileName , "P3\n");
        writer.appendToFile(fileName , `${this.imageWidth} ${this.imageHeight}\n`);
        writer.appendToFile(fileName , "255\n");

        for(let j = 0 ; j < this.imageHeight ; j++){
            console.log(`Lines remaining ${this.imageHeight - j} ----`);
            for(let i = 0 ; i < this.imageWidth ; i++){
                let pixelCenter = this.pixel00Loc.add(this.pixelDeltaU.multiply(i)).add(this.pixelDeltaV.multiply(j));

                //explore the substraction part
                let rayDirection = pixelCenter.substract(this.cameraCenter);
                let ray : Ray = new Ray(this.cameraCenter , rayDirection);

                let pixelColor : Vec3 = this.rayColor(ray , world);

                writer.appendToFile(fileName , Color.writeColor(pixelColor));

            }
        }


    }

    rayColor (ray : Ray , world : Hittable) : Vec3{

        // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
        // if(t > 0){
        //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
        //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
        // }
    
        let rec : HitRecord = new HitRecord();
        if(world.hit(ray , new Interval(0, Utils.INFINITY) , rec)){        
            return rec.normal.add(new Vec3(1 , 1 ,1)).multiply(0.5);
        }
    
        //colors world background
        let unitDirection : Vec3 = ray.direction.unitVector();
        let a : number  = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
        return new Vec3(1 , 1 , 1).multiply(1.0 - a).add(new Vec3(0 , 0 , 1).multiply(a)); //see this part
    }

}

export default Camera;