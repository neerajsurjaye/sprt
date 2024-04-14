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
        return this;
    }

    substract(sub: Vec3): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);
        ret.x = this.x - sub.x;
        ret.y = this.y - sub.y;
        ret.z = this.z - sub.z;
        return this;

        //this.add(sub.multiply(-1));
    }

    multiply(mul: number): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);

        ret.x = this.x * mul;
        ret.y = this.y * mul;
        ret.z = this.z * mul;
        return this;

    }

    multiplyVec(mul: Vec3): Vec3 {
        let ret : Vec3 = new Vec3(0 , 0 , 0);

        ret.x = this.x * mul.x;
        ret.y = this.y * mul.y;
        ret.z = this.z * mul.z;
        return this;

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
}

export default Vec3;
