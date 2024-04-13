import fs from 'fs';

function clearFile(fileName){
    try{
        fs.writeFileSync(fileName , "");
    }catch(err){
        console.error(err);
    }
}

function appendToFile(fileName , data){
    try{
        fs.writeFileSync(fileName , data , {flag : 'a+'});
    }catch(err){
        console.error(err);
    }
}

function testWriter(){
    try{
        fs.writeFileSync(fileName, "data writter");
    }catch(err){
        console.error(err);
    }
}


export default {testWriter , appendToFile , clearFile};