let canvas = document.getElementById("image");

// window.api.on('image-rendered' , (event , res)=>{
//     canvas.width = res.width;
//     canvas.height = res.height;

//     let ctx = canvas.getContext("2d");
//     let palette = new ImageData(new Uint8ClampedArray(res.image) , res.width , res.height);
//     ctx.putImageData(palette , 0 ,0);
// })

// window.sprt.render().then((res)=>{

//     canvas.width = res.width;
//     canvas.height = res.height;

//     let ctx = canvas.getContext("2d");
//     let palette = new ImageData(new Uint8ClampedArray(res.image) , res.width , res.height);
//     ctx.putImageData(palette , 0 ,0);
    
// })

let addObject = document.getElementById('add-object');
let configBody = document.getElementById('config-body');

addObject.addEventListener('click' , ()=>{

    //todo use local create element
    let lastChild = null;
    let objectForm = document.createElement("form");
    objectForm.classList.add('objectForm');

    let objectTypes = document.createElement('select');
    objectTypes.classList.add('objectTypes');
    objectTypes.setAttribute('name' , 'objectType');

    let objectNone = new Option('none' , 'none');
    objectTypes.add(objectNone);

    let objectSphere = new Option('sphere' , 'sphere');
    objectTypes.add(objectSphere);

    objectTypes.addEventListener('change' , (event)=>{

        if(lastChild != null) objectForm.removeChild(lastChild);

        let objectParamsForm = generateObjectParams(event.target.value);
        lastChild = objectParamsForm;
        if(objectParamsForm == null) return;

        objectForm.appendChild(objectParamsForm);
        
    })

    objectForm.appendChild(objectTypes);

    configBody.appendChild(objectForm);
})



let generateObjectParams = (objectType)=>{

    if(objectType == 'sphere'){

        let objectParams = createElement('div' , {class : 'objectParams'});

        let labelLoc = createElement('label' , {textContent : 'Location'});

        let labelX = createElement('label' , {textContent : 'x'})
        let inputX = createElement('input' , {type : 'number' , value : 0 , class : 'x' , name : 'locx'});

        let labelY = createElement('label' , {textContent : 'y'})
        let inputY = createElement('input' , {type : 'number' , value : 0 , class : 'y' , name : 'locy'});

        let labelZ = createElement('label' , {textContent : 'z'})
        let inputZ = createElement('input' , {type : 'number' , value : 0 , class : 'z' , name : 'locz'});

        let labelRadius = createElement('label' , {textContent : 'Radius'});
        let inputRadius = createElement('input' , {value : 1 , name : 'radius'});


        objectParams.appendChild(labelLoc);
        objectParams.appendChild(labelX);
        objectParams.appendChild(inputX);   
        
        objectParams.appendChild(labelY);
        objectParams.appendChild(inputY);

        objectParams.appendChild(labelZ);
        objectParams.appendChild(inputZ);

        objectParams.appendChild(labelRadius);
        objectParams.appendChild(inputRadius); 

        return objectParams;
    }

    return null;
}

let generateConfigJson = ()=>{
    let configBody = document.getElementById('config-body');

    let childs = [...configBody.children];
    let world = [];
    let config = {};

    for(let objIndex in childs){

        let objInput = childs[objIndex];
        let objParamsInput = objInput.querySelector('.objectParams');

        let objConfig = {};
        let objectName = document.querySelector('.objectTypes');
        objConfig[objectName.getAttribute('name')] = objectName.value;

        for(let elementIndex in objParamsInput.children){

            let element = objParamsInput.children[elementIndex];

            console.log(element.tagName);
            if(element.tagName === "INPUT"){
                objConfig[element.getAttribute('name')] = element.value;
            }
            
        }        

        world.push(objConfig);

    }

    config['world'] = world;
    return config;

}


function createElement(tag, option = {}){

    let element = document.createElement(tag);

    for(const [key , value] of Object.entries(option)){
        if(key === 'textContent'){
            element.textContent = value;
        }else if(key === 'value'){
            element.value = value
        }else{
            element.setAttribute(key , value);
        }
    }

    if(tag === 'input') element.addEventListener('change' , ()=>{
        let config = generateConfigJson();

        window.sprt.render(config).then((res)=>{

        canvas.width = res.width;
        canvas.height = res.height;

        let ctx = canvas.getContext("2d");
        let palette = new ImageData(new Uint8ClampedArray(res.image) , res.width , res.height);
        ctx.putImageData(palette , 0 ,0);
        
    })

    })

    return element;

}