import Utils from "./Utils";

class Vec3 {
    //* Not Tested *// 

    //defines xyz of vector
    vec: Array<number>;

    constructor(x: number, y: number, z: number) {
        this.vec = [x, y, z];
    }

    get x() {
        return this.vec[0];
    }

    get y() {
        return this.vec[1];
    }

    get z() {
        return this.vec[2];
    }

    set x(val: number) {
        this.vec[0] = val;
    }

    set y(val: number) {
        this.vec[1] = val;
    }

    set z(val: number) {
        this.vec[2] = val;
    }

    add(adder: Vec3): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);
        ret.x = this.x + adder.x;
        ret.y = this.y + adder.y;
        ret.z = this.z + adder.z;
        return ret;
    }

    substract(sub: Vec3): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);
        ret.x = this.x - sub.x;
        ret.y = this.y - sub.y;
        ret.z = this.z - sub.z;
        return ret;

        //this.add(sub.multiply(-1));
    }

    multiply(mul: number): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);

        ret.x = this.x * mul;
        ret.y = this.y * mul;
        ret.z = this.z * mul;
        return ret;

    }

    multiplyVec(mul: Vec3): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);

        ret.x = this.x * mul.x;
        ret.y = this.y * mul.y;
        ret.z = this.z * mul.z;
        return ret;

    }

    

    divide(div: number) : Vec3{
        return this.multiply(1 / div);
    }


    lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    dot(inp: Vec3): number {
        return this.x * inp.x + this.y * inp.y + this.z * inp.z;
    }

    cross(inp : Vec3) : Vec3{
        return new Vec3(
            this.y * inp.z - this.z * inp.y,
            this.z * inp.x - this.x * inp.z,
            this.x * inp.y - this.y * inp.x
        )
    }

    unitVector() : Vec3{
        return this.divide(this.length());
    }

    static random() : Vec3{
        return new Vec3(Utils.randomDouble() , Utils.randomDouble() , Utils.randomDouble());
    }

    static randomRange(min : number , max : number) : Vec3{
        return new Vec3(Utils.randomDoubleRange(min , max) , Utils.randomDoubleRange(min , max), Utils.randomDoubleRange(min , max));
    }

    static randomInUnitSphere() : Vec3{
        while(true){
            let p : Vec3 = Vec3.randomRange(-1 , 1);
            if(p.lengthSquared() < 1){
                return p;
            }
        }
    }

    static randomUnitVector() : Vec3{
        return this.randomInUnitSphere().unitVector();
    }

    static randomOnHemisphere(normal : Vec3) : Vec3{
        let onUnitSphere : Vec3 = this.randomUnitVector();
        if(onUnitSphere.dot(normal) > 0){
            return onUnitSphere;
        }
        return onUnitSphere.multiply(-1);
    }


}

export default Vec3;