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

let addObject = document.getElementById("add-object");
let configWorld = document.getElementById("config-world");
let configCamera = document.getElementById("config-camera");

addObject.addEventListener("click", () => {
    //todo put in a seprate function
    let lastChild = null;

    let objectForm = createElement("form", {
        class: "objectForm",
    });

    let objectTypes = createElement("select", {
        class: "objectTypes",
        name: "objectType",
    });

    let objectNone = new Option("none", "none");
    objectTypes.add(objectNone);

    let objectSphere = new Option("sphere", "sphere");
    objectTypes.add(objectSphere);

    //removes the form below
    //todo seprate function
    objectTypes.addEventListener("change", (event) => {
        if (lastChild != null) objectForm.removeChild(lastChild);

        let objectParamsForm = generateObjectParams(event.target.value);
        lastChild = objectParamsForm;
        if (objectParamsForm == null) return;

        objectForm.appendChild(objectParamsForm);
    });

    objectForm.appendChild(objectTypes);

    configWorld.appendChild(objectForm);
});

let generateObjectParams = (objectType) => {
    if (objectType == "sphere") {
        let objectParams = createElement("div", { class: "objectParams" });

        let labelLoc = createElement("label", { textContent: "Location" });

        let labelX = createElement("label", { textContent: "x" });
        let inputX = createElement("input", {
            type: "number",
            value: 0,
            class: "x",
            name: "locx",
        });

        let labelY = createElement("label", { textContent: "y" });
        let inputY = createElement("input", {
            type: "number",
            value: 0,
            class: "y",
            name: "locy",
        });

        let labelZ = createElement("label", { textContent: "z" });
        let inputZ = createElement("input", {
            type: "number",
            value: 0,
            class: "z",
            name: "locz",
        });

        let labelRadius = createElement("label", { textContent: "Radius" });
        let inputRadius = createElement("input", { value: 1, name: "radius" });

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
};

let generateConfigJson = () => {
    let config = {};

    config["world"] = getWorldConfig();
    config["camera"] = getCameraConfig();
    return config;
};

function getWorldConfig() {
    let configBody = document.getElementById("config-world");

    let childs = [...configBody.children];
    let world = [];

    for (let objIndex in childs) {
        let objInput = childs[objIndex];
        let objParamsInput = objInput.querySelector(".objectParams");

        let objConfig = {};
        let objectName = document.querySelector(".objectTypes");
        objConfig[objectName.getAttribute("name")] = objectName.value;

        for (let element of objParamsInput.children) {
            if (element.tagName === "INPUT") {
                objConfig[element.getAttribute("name")] = element.value;
            }
        }

        world.push(objConfig);
    }
    return world;
}

function getCameraConfig() {
    let cameraForm = document.getElementById("config-camera-form");
    let configInputs = cameraForm.querySelectorAll(".config-camera-data");
    let camera = {};

    for (let element of configInputs) {
        if (element.getAttribute("name")) {
            camera[element.getAttribute("name")] = Number(element.value);
        }
    }

    camera["lookFrom"] = getXYZ("lookFrom");
    camera["lookAt"] = getXYZ("lookAt");

    return camera;
}

function getXYZ(elementId) {
    let parent = document.getElementById(elementId);
    let elements = parent.querySelectorAll("label input");

    let output = {};
    console.log(elements);
    for (let element of elements) {
        // let element = parent.children[idx]/;

        if (element.tagName == "INPUT") {
            output[element.getAttribute("name")] = Number(element.value);
        }
    }

    return output;
}

function createElement(tag, option = {}) {
    let element = document.createElement(tag);

    for (const [key, value] of Object.entries(option)) {
        if (key === "textContent") {
            element.textContent = value;
        } else if (key === "value") {
            element.value = value;
        } else {
            element.setAttribute(key, value);
        }
    }

    if (tag === "input") {
        element.addEventListener("change", reRender);
    }
    return element;
}

function reRender() {
    let config = generateConfigJson();

    window.sprt.render(config).then((res) => {
        canvas.width = res.width;
        canvas.height = res.height;

        let ctx = canvas.getContext("2d");
        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );
        ctx.putImageData(palette, 0, 0);
    });
}

function initializeCameraConfig() {
    let cameraForm = document.getElementById("config-camera-form");
    let inputs = cameraForm.querySelectorAll("input");
    console.log({ inputs });

    for (let idx in inputs) {
        let element = inputs[idx];

        console.log({ element });

        if (element.tagName == "INPUT") {
            element.addEventListener("change", reRender);
        }
    }
}

function main() {
    initializeCameraConfig();
}
main();
