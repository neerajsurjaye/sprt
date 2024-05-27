import Hittable from "../Hittable/Hittable";
import HittableList from "../Hittable/HittableList";
import Sphere from "../Hittable/Sphere";
import Dielectric from "../Materials/Dielectric";
import Lambertian from "../Materials/Lambertian";
import Material from "../Materials/Material";
import Metal from "../Materials/Metal";
import Color from "../Vectors/Color";
import Vec3 from "../Vectors/Vec3";
import Camera from "./Camera";

class Utils {
    static readonly _infinity: number = Number.POSITIVE_INFINITY;
    static readonly _pi: number = 3.1415926535897932385;

    static get INFINITY() {
        return this._infinity;
    }

    static get PI() {
        return this._pi;
    }

    static degreesToRadians(degrees: number): number {
        return (degrees * this.PI) / 180;
    }

    static randomDouble(): number {
        return Math.random();
    }

    static randomDoubleRange(min: number, max: number) {
        return min + (max - min) * this.randomDouble();
    }

    static configWorld(config: Array<any>, world: HittableList) {
        world.clear();
        console.log(config);

        if (!config) return;

        for (const element of config) {
            let objectConfig: any = element;

            world.add(this.createObject(objectConfig));
        }
    }

    static createObject(objectConfig: any): Hittable {
        if (objectConfig.objectType == "sphere") {
            // let objLoc = objectConfig.location;
            return new Sphere(
                new Vec3(
                    objectConfig.locx,
                    objectConfig.locy,
                    objectConfig.locz
                ),
                objectConfig.radius,
                this.createMaterial(objectConfig.material)
            );
        }

        return new Sphere(
            new Vec3(0, 0, 0),
            1,
            new Lambertian(new Color(1, 0, 0))
        );
    }

    static createMaterial(materialConfig: any): Material {
        if (!materialConfig) {
            return new Lambertian(new Color(1, 0, 0));
        }

        if (materialConfig.materialType == "lambertian") {
            let matColor = materialConfig.color;
            return new Lambertian(
                new Color(matColor.r, matColor.g, matColor.b)
            );
        }

        if (materialConfig.materialType == "dielectric") {
            return new Dielectric(materialConfig.ir);
        }

        if (materialConfig.materialType == "metal") {
            let matColor = materialConfig.color;
            return new Metal(
                new Color(matColor.r, matColor.g, matColor.b),
                materialConfig.fuzz
            );
        }

        return new Lambertian(new Color(1, 0, 0));
    }

    static configCamera(cameraConfig: any, camera: Camera): void {
        camera.aspectRatio = cameraConfig.aspectRatio
            ? cameraConfig.aspectRatio
            : 16 / 9;
        camera.imageWidth = cameraConfig.imageWidth
            ? cameraConfig.imageWidth
            : 400;
        let lookFrom = cameraConfig.lookFrom
            ? cameraConfig.lookFrom
            : { x: 0, y: 0, z: 0 };
        let lookAt = cameraConfig.lookAt
            ? cameraConfig.lookAt
            : { x: 1, y: 0, z: 0 };

        camera.lookFrom = new Vec3(lookFrom.x, lookFrom.y, lookFrom.z);
        camera.lookAt = new Vec3(lookAt.x, lookAt.y, lookAt.z);

        camera.vfov = cameraConfig.vfov ? cameraConfig.vfov : 45;
        camera.defocusAngle =
            cameraConfig.defocusAngle >= 0 ? cameraConfig.defocusAngle : 2;
        camera.samplePerPixel = cameraConfig.samplePerPixel
            ? cameraConfig.samplePerPixel
            : 20;
        camera.maxDepth = cameraConfig.maxDepth ? cameraConfig.maxDepth : 4;
        camera.initialize();
    }
}

export default Utils;
