import HitRecord from "../Hittable/HitRecord";
import Hittable from "../Hittable/Hittable";
import Ray from "../Vectors/Ray";
import Utils from "./Utils";
import Vec3 from "../Vectors/Vec3";
import Color from "../Vectors/Color";
import Interval from "./Interval";
import Writer from "./Writer";

class Camera {
    aspectRatio: number;
    imageWidth: number;
    imageHeight: number;
    // focalLength : number;
    viewPortHeight: number;
    viewPortWidth: number;
    cameraCenter: Vec3;
    viewPortV: Vec3;
    viewPortU: Vec3;
    pixel00Loc: Vec3;
    pixelDeltaU: Vec3;
    pixelDeltaV: Vec3;
    viewPortUpperLeft: Vec3;
    samplePerPixel: number;
    pixelSampleScale: number;
    maxDepth: number;
    vfov: number;
    lookFrom: Vec3;
    lookAt: Vec3;
    vup: Vec3;
    u: Vec3;
    v: Vec3;
    w: Vec3;
    defocusAngle: number;
    focalDist: number;
    defocusDistU: Vec3;
    defocusDiscV: Vec3;
    window: any;
    cb: Function | null | undefined;

    constructor() {
        this.aspectRatio = 16 / 9;
        this.imageWidth = 400;

        this.lookFrom = new Vec3(-1, 0.5, 1);
        this.lookAt = new Vec3(0, 0, -2);
        this.vup = new Vec3(0, 1, 0);

        this.vfov = 45;
        this.defocusAngle = 0.5;
        this.samplePerPixel = 100;
        this.maxDepth = 8;

        //initalize()
        let theta: number = Utils.degreesToRadians(this.vfov);
        let h: number = Math.tan(theta / 2);
        this.focalDist = this.lookFrom.substract(this.lookAt).length();

        this.imageHeight = Math.floor(this.imageWidth / this.aspectRatio);
        this.imageHeight = this.imageHeight < 1 ? 1 : this.imageHeight;

        this.cameraCenter = this.lookFrom;
        // this.focalLength  = (this.lookFrom.substract(this.lookat)).length();
        this.viewPortHeight = 2 * h * this.focalDist;
        this.viewPortWidth =
            this.viewPortHeight * (this.imageWidth / this.imageHeight);

        this.w = this.lookFrom.substract(this.lookAt).unitVector();
        this.u = this.vup.cross(this.w).unitVector();
        this.v = this.w.cross(this.u);

        this.viewPortU = this.u.multiply(this.viewPortWidth);
        this.viewPortV = this.v.multiply(-1).multiply(this.viewPortHeight);

        this.pixelDeltaU = this.viewPortU.divide(this.imageWidth);
        this.pixelDeltaV = this.viewPortV.divide(this.imageHeight);

        //why multiply focallength with this.w
        this.viewPortUpperLeft = this.cameraCenter
            .substract(this.w.multiply(this.focalDist))
            .substract(this.viewPortU.divide(2))
            .substract(this.viewPortV.divide(2));

        this.pixel00Loc = this.viewPortUpperLeft.add(
            this.pixelDeltaU.add(this.pixelDeltaV).multiply(0.5)
        );

        this.pixelSampleScale = 1 / this.samplePerPixel;

        let defocusRadius =
            this.focalDist *
            Math.tan(Utils.degreesToRadians(this.defocusAngle / 2));
        this.defocusDistU = this.u.multiply(defocusRadius);
        this.defocusDiscV = this.v.multiply(defocusRadius);
        this.window = null;
        this.cb = null;
    }

    //recalculates the values
    initialize() {
        let theta: number = Utils.degreesToRadians(this.vfov);
        let h: number = Math.tan(theta / 2);
        this.focalDist = this.lookFrom.substract(this.lookAt).length();

        this.imageHeight = Math.floor(this.imageWidth / this.aspectRatio);
        this.imageHeight = this.imageHeight < 1 ? 1 : this.imageHeight;

        this.cameraCenter = this.lookFrom;
        // this.focalLength  = (this.lookFrom.substract(this.lookat)).length();
        this.viewPortHeight = 2 * h * this.focalDist;
        this.viewPortWidth =
            this.viewPortHeight * (this.imageWidth / this.imageHeight);

        this.w = this.lookFrom.substract(this.lookAt).unitVector();
        this.u = this.vup.cross(this.w).unitVector();
        this.v = this.w.cross(this.u);

        this.viewPortU = this.u.multiply(this.viewPortWidth);
        this.viewPortV = this.v.multiply(-1).multiply(this.viewPortHeight);

        this.pixelDeltaU = this.viewPortU.divide(this.imageWidth);
        this.pixelDeltaV = this.viewPortV.divide(this.imageHeight);

        //why multiply focallength with this.w
        this.viewPortUpperLeft = this.cameraCenter
            .substract(this.w.multiply(this.focalDist))
            .substract(this.viewPortU.divide(2))
            .substract(this.viewPortV.divide(2));

        this.pixel00Loc = this.viewPortUpperLeft.add(
            this.pixelDeltaU.add(this.pixelDeltaV).multiply(0.5)
        );

        this.pixelSampleScale = 1 / this.samplePerPixel;

        let defocusRadius =
            this.focalDist *
            Math.tan(Utils.degreesToRadians(this.defocusAngle / 2));
        this.defocusDistU = this.u.multiply(defocusRadius);
        this.defocusDiscV = this.v.multiply(defocusRadius);
    }

    render_old(world: Hittable): void {
        const fileName = "out.ppm";
        // writer.clearFile(fileName)
        let writer: Writer = new Writer(fileName);

        // writer.appendToFile(fileName , "P3\n");
        // writer.appendToFile(fileName , `${this.imageWidth} ${this.imageHeight}\n`);
        // writer.appendToFile(fileName , "255\n");

        writer.append("P3\n");
        writer.append(`${this.imageWidth} ${this.imageHeight}\n`);
        writer.append("255\n");

        for (let j = 0; j < this.imageHeight; j++) {
            console.log(`Lines remaining ${this.imageHeight - j} ----`);
            for (let i = 0; i < this.imageWidth; i++) {
                let pixelColor: Vec3 = new Vec3(0, 0, 0);
                let pixelCenter = this.pixel00Loc
                    .add(this.pixelDeltaU.multiply(i))
                    .add(this.pixelDeltaV.multiply(j));

                //explore the substraction part
                let rayDirection = pixelCenter.substract(this.cameraCenter);
                // let ray : Ray = new Ray(this.cameraCenter , rayDirection);

                for (let sample = 0; sample < this.samplePerPixel; sample++) {
                    let ray: Ray = this.getRay(i, j);
                    pixelColor = pixelColor.add(
                        this.rayColor(ray, this.maxDepth, world)
                    );
                }
                // let pixelColor : this.rayColor(ray , world);

                writer.append(
                    Color.writeColor(pixelColor.multiply(this.pixelSampleScale))
                );
            }
        }

        writer.write();
    }

    render(world: Hittable): Object {
        let image: Array<number> = [];

        for (let j = 0; j < this.imageHeight; j++) {
            console.log(`Lines remaining ${this.imageHeight - j} ----`);
            for (let i = 0; i < this.imageWidth; i++) {
                let pixelColor: Vec3 = new Vec3(0, 0, 0);
                let pixelCenter = this.pixel00Loc
                    .add(this.pixelDeltaU.multiply(i))
                    .add(this.pixelDeltaV.multiply(j));

                //explore the substraction part
                let rayDirection = pixelCenter.substract(this.cameraCenter);
                for (let sample = 0; sample < this.samplePerPixel; sample++) {
                    let ray: Ray = this.getRay(i, j);
                    pixelColor = pixelColor.add(
                        this.rayColor(ray, this.maxDepth, world)
                    );
                }

                image.push(
                    ...Color.writeColorVec(
                        pixelColor.multiply(this.pixelSampleScale)
                    )
                );
            }

            if (this.cb) {
                this.cb("image-rendered", {
                    image: image,
                    width: this.imageWidth,
                    height: j + 1,
                });
            }
        }

        return {
            image: image,
            width: this.imageWidth,
            height: this.imageHeight,
        };
    }

    renderNormal(world: Hittable): Object {
        let image: Array<number> = [];

        for (let j = 0; j < this.imageHeight; j++) {
            console.log(`Lines remaining ${this.imageHeight - j} ---- Normal`);
            for (let i = 0; i < this.imageWidth; i++) {
                let pixelColor: Vec3 = new Vec3(0, 0, 0);

                //explore the substraction part
                let ray: Ray = this.getRay(i, j);
                pixelColor = pixelColor.add(
                    this.rayColorNormal(ray, this.maxDepth, world)
                );

                image.push(
                    ...Color.writeColorVec(
                        pixelColor.multiply(this.pixelSampleScale)
                    )
                );
            }

            if (this.cb) {
                this.cb("image-rendered", {
                    image: image,
                    width: this.imageWidth,
                    height: j + 1,
                });
            }
        }

        return {
            image: image,
            width: this.imageWidth,
            height: this.imageHeight,
        };
    }

    //genereates a random vector for antialiasing
    sampleSquare(): Vec3 {
        return new Vec3(
            Utils.randomDouble() - 0.5,
            Utils.randomDouble() - 0.5,
            0
        );
    }

    //gets a ray for pixel at i , j with some randomization
    getRay(i: number, j: number): Ray {
        let offSet: Vec3 = this.sampleSquare();
        let pixelSample: Vec3 = this.pixel00Loc
            .add(this.pixelDeltaU.multiply(offSet.x + i))
            .add(this.pixelDeltaV.multiply(offSet.y + j));
        let rayOrigin: Vec3 =
            this.defocusAngle <= 0
                ? this.cameraCenter
                : this.defocusDiscSample();
        let rayDirection: Vec3 = pixelSample.substract(rayOrigin);

        return new Ray(rayOrigin, rayDirection);
    }

    defocusDiscSample(): Vec3 {
        let p: Vec3 = Vec3.randomInUnitDisc();
        return this.cameraCenter
            .add(this.defocusDistU.multiply(p.x))
            .add(this.defocusDiscV.multiply(p.y));
    }

    rayColor(ray: Ray, depth: number, world: Hittable): Vec3 {
        if (depth <= 0) return new Vec3(0, 0, 0);

        // let t = hitSphere(new Vec3(0 , 0 , -1) , 0.5 , ray);
        // if(t > 0){
        //     let N : Vec3 = ray.at(t).substract(new Vec3(0 ,0 , -1)).unitVector();
        //     return new Vec3(N.x + 1 , N.y + 1 , N.z + 1).multiply(0.5);
        // }

        let rec: HitRecord = new HitRecord();
        if (world.hit(ray, new Interval(0.001, Utils.INFINITY), rec)) {
            // return rec.normal.add(new Vec3(1 , 1 ,1)).multiply(0.5);
            // let direction : Vec3 = Vec3.randomOnHemisphere(rec.normal);
            // let direction : Vec3 = rec.normal.add(Vec3.randomUnitVector()); //todo see again
            // return this.rayColor(new Ray(rec.p , direction), depth - 1 , world).multiply(0.5); //seef

            let scattered: Ray = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
            let attenuation: Color = new Color(0, 0, 0);

            if (rec.mat.scatter(ray, rec, attenuation, scattered)) {
                return attenuation.multiplyVec(
                    this.rayColor(scattered, depth - 1, world)
                );
            }
            return new Color(0, 0, 0);
        }

        //colors world background
        let unitDirection: Vec3 = ray.direction.unitVector();
        let a: number = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
        return new Vec3(1, 1, 1)
            .multiply(1.0 - a)
            .add(new Vec3(0.5, 0.75, 1).multiply(a)); //see this part
    }

    rayColorNormal(ray: Ray, depth: number, world: Hittable): Vec3 {
        if (depth <= 0) return new Vec3(0, 0, 0);

        let rec: HitRecord = new HitRecord();
        if (world.hit(ray, new Interval(0.001, Utils.INFINITY), rec)) {
            return rec.normal;
        }

        //colors world background
        let unitDirection: Vec3 = ray.direction.unitVector();
        let a: number = 0.5 * (unitDirection.y + 1); //transfrms -1 to 1 into 0 -> 1
        return new Vec3(1, 1, 1)
            .multiply(1.0 - a)
            .add(new Vec3(0.5, 0.75, 1).multiply(a)); //see this part
    }
}

export default Camera;
