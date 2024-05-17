import Hittable from "./Hittable/Hittable";
import HittableList from "./Hittable/HittableList";
import Sphere from "./Hittable/Sphere";
import Dielectric from "./Materials/Dielectric";
import Lambertian from "./Materials/Lambertian";
import Material from "./Materials/Material";
import Metal from "./Materials/Metal";
import Camera from "./Utils/Camera";
import Color from "./Vectors/Color";
import Vec3 from "./Vectors/Vec3";

class Core{

    camera : Camera;
    world : HittableList;
    window : any;

    constructor(win : any){
        this.camera = new Camera();
        this.world = new HittableList();
        this.camera.window = win;

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

        this.camera.samplePerPixel = 50;
        this.camera.initialize();


    }

    add(object : Hittable){
        this.world.add(object);
    }

    render() : Object{
        return this.camera.render(this.world);
    }

    renderImage() : void {
        return this.camera.render_old(this.world);
    }
}

export default Core;