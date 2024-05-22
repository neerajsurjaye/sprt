import Hittable from "./Hittable/Hittable";
import HittableList from "./Hittable/HittableList";
import Sphere from "./Hittable/Sphere";
import Dielectric from "./Materials/Dielectric";
import Lambertian from "./Materials/Lambertian";
import Material from "./Materials/Material";
import Metal from "./Materials/Metal";
import Camera from "./Utils/Camera";
import Utils from "./Utils/Utils";
import Color from "./Vectors/Color";
import Vec3 from "./Vectors/Vec3";

class Core{

    camera : Camera;
    world : HittableList;

    constructor(cb? : Function | null){
        this.camera = new Camera();
        this.world = new HittableList();
        this.camera.cb = cb;

        //sample world
        let materialMetal : Material = new Metal(new Color(1 , 1 , 1) , 0);
        let materialMetalFuzz : Material = new Metal(new Color(1 , 1 , 1) , 0.3);
        let materialDiffuse : Material = new Lambertian(new Color(.5 , .8 , 0));
        let materialGround : Material = new Lambertian(new Color(0.8 , 1 , 0.8));
        let materialDiffuseRed : Material = new Lambertian(new Color(1 , 0 , 0));
        let materialGlass : Material = new Dielectric(1 / 1.33);

        //world
        this.world.add(new Sphere(new Vec3(0 , -100.5, -1) , 100 , materialGround));
        this.world.add(new Sphere(new Vec3(-1 , 0 , -3) , 0.5 , materialMetal));
        this.world.add(new Sphere(new Vec3(0 , 0 , -2) , 0.5 , materialDiffuse));
        this.world.add(new Sphere(new Vec3(0.9 , 0 , -2) , 0.5 , materialMetalFuzz));
        this.world.add(new Sphere(new Vec3(.2 , -0.2 , -1) , 0.1 , materialDiffuseRed));
        this.world.add(new Sphere(new Vec3(-1 , 0.1 , -1.5) , 0.3 , materialGlass));


        this.camera.samplePerPixel = 20;
        this.camera.initialize();


    }

    add(object : Hittable){
        this.world.add(object);
    }

    render(channel : any , config : any) : Object{

        
        config.camera = {
            aspectRatio : 16 / 9,
            imageWidth : 400,
            lookFrom : {x : 5 , y : .5 , z : 0},
            lookAt : {x : 0 , y : 1 , z : 0},
            vfov : 45,
            samplePerPixel : 5,
            defocusAngle : 0,
            maxDepth : 8
        }
        console.log('render' , config.world);
        

        this.updateConfig(config);

        // this.updateConfig({world : [
        //     {
        //         objectType : 'sphere',
        //         locx : -2,
        //         locy : 1,
        //         locz : -2,
        //         radius : 1,
        //         material : {
        //             materialType : 'lambertian',
        //             color : {r : 0.2 , g : 0.9 , b : .2}
        //         }
        //     },
        //     {
        //         objectType : 'sphere',
        //         locx : -1,
        //         locy : 1,
        //         locz : 1,
        //         radius : 1,
        //         material : {
        //             materialType : 'dielectric',
        //             ir : 1.33
        //         }
        //     },
        //     {
        //         objectType : 'sphere',
        //         locx : -6,
        //         locy : 4,
        //         locz : 0,
        //         radius : 4,
        //         material : {
        //             materialType : 'metal',
        //             color : {r : 0.2 , g : .3 , b : 1},
        //             fuzz : 0
        //         }

        //     },
        //     {
        //         objectType : 'sphere',
        //         // location : {x : 0 , y : -10000 , z : 0},
        //         locx : 0,
        //         locy : -10000,
        //         locz : 0,
        //         radius : 10000,
        //         material : {
        //             materialType : 'lambertian',
        //             color : {r : 1 , g : 0.2 , b : .2}
        //         }
        //     },
        // ] , camera : {
        //     aspectRatio : 16 / 9,
        //     imageWidth : 400,
        //     lookFrom : {x : 5 , y : .5 , z : 0},
        //     lookAt : {x : 0 , y : 1 , z : 0},
        //     vfov : 45,
        //     samplePerPixel : 20,
        //     defocusAngle : 0,
        //     maxDepth : 8
        // }});

        
        return this.camera.render(this.world);
    }

    renderImage() : void {
        return this.camera.render_old(this.world);
    }

    updateConfig(config : any) : void{
        

        Utils.configWorld(config.world , this.world);
        Utils.configCamera(config.camera , this.camera);
    }   
}

export default Core;