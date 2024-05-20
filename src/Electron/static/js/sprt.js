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
    let lastChild = null;
    let objectForm = document.createElement("form");
    objectForm.classList.add('objectForm');

    let objectTypes = document.createElement('select');
    objectTypes.classList.add('objectTypes');

    let objectNone = new Option('none' , 'none');
    objectTypes.add(objectNone);

    let objectSphere = new Option('sphere' , 'sphere');
    objectTypes.add(objectSphere);

    objectTypes.addEventListener('change' , (event)=>{

        console.log({lastChild});
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

        let objectParams = document.createElement('div');

        let labelLoc = document.createElement('label');
        labelLoc.textContent = 'Location';

        let labelX = document.createElement('label');
        labelX.textContent = 'x';
        let inputX = document.createElement('input');
        inputX.type = 'number';
        inputX.value = 0;

        let labelY = document.createElement('label');
        labelY.textContent = 'y';
        let inputY = document.createElement('input');
        inputY.type = 'number';
        inputY.value = 0;

        let labelZ = document.createElement('label');
        labelZ.textContent = 'z';
        let inputZ = document.createElement('input');
        inputZ.type = 'number';
        inputZ.value = 0;


        let labelRadius = document.createElement('label');
        labelRadius.textContent = 'Radius';

        let inputRadius = document.createElement('input');
        inputRadius.value = 1;

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