import Vec3 from "./vec3";

class Color{
    static writeColor(col : Vec3) : string{
        let r = col.x;
        let g = col.y;
        let b = col.z;

        return `${Math.floor(r * 255)} ${Math.floor(g * 255)} ${Math.floor(b * 255)}\n`
    }
}

export default Color;