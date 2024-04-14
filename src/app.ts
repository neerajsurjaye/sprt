import Color from "./color";
import Vec3 from "./vec3";
import writer from "./writer";

function main(){

    const fileName = "out.ppm";
    writer.clearFile(fileName)
    let width = 256;
    let height = 256;



    writer.appendToFile(fileName , "P3\n");
    writer.appendToFile(fileName , `${width} ${height}\n`);
    writer.appendToFile(fileName , "255\n");

    for(let i = 0 ; i < height ; i++){
        console.log(`Lines remaining ${height - i} ----`);
        for(let j = 0 ; j < width ; j++){
            let pixelColor : Vec3 = new Vec3(i / (width - 1) , j /(height - 1) , 0);
            writer.appendToFile(fileName , Color.writeColor(pixelColor));
        }
    }

    console.log("Done Rendering :)");

}

main();

