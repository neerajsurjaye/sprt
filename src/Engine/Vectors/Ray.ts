import Vec3 from "./Vec3";

class Ray {
    //a + t * b where a is a point b is a vector and t is a scaler multiplying the length of b
    //see vector addition for refrence

    origin: Vec3;
    direction: Vec3;

    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin;
        this.direction = direction;
    }

    at(t: number): Vec3 {
        return this.origin.add(this.direction.multiply(t));
    }
}

export default Ray;
