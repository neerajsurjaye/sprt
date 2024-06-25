import HitRecord from "../Hittable/HitRecord";
import Utils from "../Utils/Utils";
import Color from "../Vectors/Color";
import Ray from "../Vectors/Ray";
import Vec3 from "../Vectors/Vec3";
import Material from "./Material";

class Dielectric extends Material {
    refractiveIndex: number;
    constructor(refractiveIndex: number) {
        super();
        this.refractiveIndex = refractiveIndex;
    }

    reflectance(cosine: number, refractionIndex: number): number {
        let r0 = (1 - refractionIndex) / (1 + refractionIndex);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    }

    scatter(
        rIn: Ray,
        rec: HitRecord,
        attenuation: Color,
        scattered: Ray
    ): boolean {
        attenuation.r = 1;
        attenuation.g = 1;
        attenuation.b = 1;

        let ri: number = rec.frontFace
            ? 1 / this.refractiveIndex
            : this.refractiveIndex;
        let unitDirection: Vec3 = rIn.direction.unitVector();

        let cosTheta: number = Math.min(
            unitDirection.multiply(-1).dot(rec.normal),
            1
        );
        let sniTheta: number = Math.sqrt(1 - cosTheta * cosTheta);

        let cannotRefract: boolean = ri * sniTheta > 1;
        let direction: Vec3 = new Vec3(0, 0, 0);

        if (
            cannotRefract ||
            this.reflectance(cosTheta, ri) > Utils.randomDouble()
        ) {
            direction = Vec3.reflect(unitDirection, rec.normal);
        } else {
            direction = Vec3.refract(unitDirection, rec.normal, ri);
        }

        scattered.origin = rec.p;
        scattered.direction = direction;

        return true;
    }
}

export default Dielectric;
