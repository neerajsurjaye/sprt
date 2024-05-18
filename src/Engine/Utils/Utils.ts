import Hittable from "../Hittable/Hittable";
import HittableList from "../Hittable/HittableList";
import Sphere from "../Hittable/Sphere";
import Dielectric from "../Materials/Dielectric";
import Lambertian from "../Materials/Lambertian";
import Material from "../Materials/Material";
import Metal from "../Materials/Metal";
import Color from "../Vectors/Color";
import Vec3 from "../Vectors/Vec3";

class Utils{
    static _infinity : number = Number.POSITIVE_INFINITY;
    static _pi : number = 3.1415926535897932385;

    static get INFINITY(){
        return this._infinity; 
    }

    static get PI(){
        return this._pi;
    }

    static degreesToRadians(degrees : number) : number{
        return degrees * this.PI / 180;
    }

    static randomDouble() : number{
        return Math.random();
    }

    static randomDoubleRange(min : number , max : number){
        return min + (max - min) * this.randomDouble();
    }

    static updateWorld(config : Array<any> , world : HittableList){
        world.clear();


        for(let i : number = 0 ; i < config.length ; i++){
            let objectConfig : any = config[i];

            world.add(this.createObject(objectConfig));

        }

    }

    static createObject(objectConfig : any) : Hittable{

        if(objectConfig.objectType == 'sphere'){
            let objLoc = objectConfig.location;
            return new Sphere(new Vec3(objLoc.x , objLoc.y , objLoc.z) , objectConfig.radius , this.createMaterial(objectConfig.material));
        }

        
        return new Sphere(new Vec3(0 , 0 , 0) , 1 , new Lambertian(new Color(1 , 0 , 0)));

    }

    static createMaterial(materialConfig : any) : Material{

        if(materialConfig.materialType == 'lambertian'){
            let matColor = materialConfig.color;
            return new Lambertian(new Color(matColor.r , matColor.g, matColor.b));
        }

        if(materialConfig.materialType == 'dielectric'){
            return new Dielectric(materialConfig.ir);
        }

        if(materialConfig.materialType == 'metal'){
            let matColor = materialConfig.color;
            return new Metal(new Color(matColor.r , matColor.g, matColor.b), materialConfig.fuzz);
        } 

        return new Lambertian(new Color(1 , 0 , 0));

    }

    
    
}

export default Utils;