import fs from 'fs';

// function clearFile(fileName : string){
//     try{
//         fs.writeFileSync(fileName , "");
//     }catch(err){
//         console.error(err);
//     }
// }

// function appendToFile(fileName : string, data : string){
//     try{
//         fs.writeFileSync(fileName , data , {flag : 'a+'});
//     }catch(err){
//         console.error(err);
//     }
// }

// function testWriter(fileName : string){
//     try{
//         fs.writeFileSync(fileName, "data writter");
//     }catch(err){
//         console.error(err);
//     }
// }


// export default {testWriter , appendToFile , clearFile};

class Writer{

    fileName : string;
    data : Array<string>;

    constructor(fileName : string){
        this.fileName = fileName;
        this.data = [];
    }

    clearFile() : void{
        try{
            fs.writeFileSync(this.fileName , "");
        }catch(err){
            console.error(err);
        }
    }

    append(str : string) : void{
        this.data.push(str);
    }

    write() : void{
        let output : string = this.data.join("");


        try{
            fs.writeFileSync(this.fileName, output);
        }catch(err){
            console.error(err);
        }
    }

}

export default Writer;