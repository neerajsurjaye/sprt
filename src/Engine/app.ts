import Color from "./Vectors/Color";
import Vec3 from "./Vectors/Vec3";
import HittableList from "./Hittable/HittableList";
import Sphere from "./Hittable/Sphere";
import Camera from "./Utils/Camera";
import Material from "./Materials/Material";
import Lambertian from "./Materials/Lambertian";
import Metal from "./Materials/Metal";
import Dielectric from "./Materials/Dielectric";

function main() {
    //width / height = 16 / 9 ----> width * 9 = height * 16

    let materialMetal: Material = new Metal(new Color(1, 1, 1), 0);
    let materialMetalFuzz: Material = new Metal(new Color(1, 1, 1), 0.3);

    let materialDiffuse: Material = new Lambertian(new Color(0.5, 0.8, 0));
    let materialGround: Material = new Lambertian(new Color(0.8, 1, 0.8));
    let materialDiffuseRed: Material = new Lambertian(new Color(1, 0, 0));
    let materialGlass: Material = new Dielectric(1 / 1.33);

    //world
    let world: HittableList = new HittableList();
    world.add(new Sphere(new Vec3(0, -100.5, -1), 100, materialGround));
    world.add(new Sphere(new Vec3(-1, 0, -3), 0.5, materialMetal));
    world.add(new Sphere(new Vec3(0, 0, -2), 0.5, materialDiffuse));
    world.add(new Sphere(new Vec3(0.9, 0, -2), 0.5, materialMetalFuzz));
    world.add(new Sphere(new Vec3(0.2, -0.2, -1), 0.1, materialDiffuseRed));
    world.add(new Sphere(new Vec3(-1, 0.1, -1.5), 0.3, materialGlass));

    let camera: Camera = new Camera();
    camera.render_old(world);

    console.log("Done Rendering :)");
}

main();
