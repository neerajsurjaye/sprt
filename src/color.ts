import Vec3 from "./Vec3";

class Color{
    static writeColor(col : Vec3) : string{

        //maps 0->1 to 0->255
        let r = col.x;
        let g = col.y;
        let b = col.z;

        return `${Math.floor(r * 255)} ${Math.floor(g * 255)} ${Math.floor(b * 255)}\n`
    }
}

export default Color;