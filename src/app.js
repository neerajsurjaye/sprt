import writer from "./writer.js";

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
            writer.appendToFile(fileName , `${i} ${j} ${(255 - Math.min(i , j))}\n`);
        }
    }

    console.log("Done Rendering :)");

}

main();

