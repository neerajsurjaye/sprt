class Vec3{


    //length and length squared functions are currently not used in this
    vec: Array<number>;

    constructor(x : number , y : number , z : number){
        this.vec = [x, y , z]
    }

    get x(){
        return this.vec[0];
    }

    get y(){
        return this.vec[1];
    }

    get z(){
        return this.vec[2];
    }


    set x(val: number){
        
        this.vec[0] = val;
        console.log(`Adding ${val} for x  ${this.vec[0]}`);

    }

    set y(val : number){
        this.vec[1] = val;
    }

    set z(val : number){
        this.vec[2] = val;
    }

    add(adder:Vec3){
        this.x = this.x + adder.x;
        this.y = this.y + adder.y;
        this.z = this.z + adder.z;
        return this;
    }

    substract(sub : Vec3){
        this.x = this.x - sub.x;
        this.y = this.y - sub.y;
        this.z = this.z - sub.z;
        return this;
    }

    multiply(mul: number){
        this.x = this.x * mul;
        this.y = this.y * mul;
        this.z = this.z * mul;
        return this;
    }

    divide(div: number){
        this.multiply(1/ div);
    }


}

export default Vec3;