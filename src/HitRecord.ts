import Ray from "./Ray";
import Vec3 from "./Vec3";

class HitRecord{
    p : Vec3;
    normal : Vec3;

    //the value t in quadrati equation
    t : number ;
    frontFace : boolean;

    constructor(){
        this.p = new Vec3(0 , 0 ,0);
        this.normal = new Vec3(0 , 0 ,0);
        this.t = 0;
        this.frontFace = false;
    }

    setFaceNormal (r : Ray , outwardNormal : Vec3) : void{
        this.frontFace = r.direction.dot(outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : outwardNormal.multiply(-1);
    }

    
}

export default HitRecord;