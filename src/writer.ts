import fs from 'fs';

function clearFile(fileName : string){
    try{
        fs.writeFileSync(fileName , "");
    }catch(err){
        console.error(err);
    }
}

function appendToFile(fileName : string, data : string){
    try{
        fs.writeFileSync(fileName , data , {flag : 'a+'});
    }catch(err){
        console.error(err);
    }
}

function testWriter(fileName : string){
    try{
        fs.writeFileSync(fileName, "data writter");
    }catch(err){
        console.error(err);
    }
}


export default {testWriter , appendToFile , clearFile};