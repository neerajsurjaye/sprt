import { createContext, useEffect, useState } from "react";
import "./App.css";
import Canvas from "./Components/Canvas";
import ConfigForm from "./Components/ConfigForm";
import ConfigContext from "./Context/ConfigContext";

function App() {
    let canvas = document.getElementById("image");

    //todo code should be blocking
    // window.api.on("image-rendered", (event, res) => {
    //     canvas.width = res.width;
    //     canvas.height = res.height;

    //     let ctx = canvas.getContext("2d");
    //     let palette = new ImageData(
    //         new Uint8ClampedArray(res.image),
    //         res.width,
    //         res.height
    //     );
    //     ctx.putImageData(palette, 0, 0);
    // });

    // window.sprt.render().then((res) => {
    //     canvas = document.getElementById("image");

    //     canvas.width = res.width;
    //     canvas.height = res.height;

    //     let ctx = canvas.getContext("2d");
    //     let palette = new ImageData(
    //         new Uint8ClampedArray(res.image),
    //         res.width,
    //         res.height
    //     );
    //     ctx.putImageData(palette, 0, 0);
    // });

    let [response, setResponse] = useState(null);
    let [config, setConfig] = useState({});

    const createFinalConfig = () => {
        let finalConfig = {};
        finalConfig.camera = config.camera;

        let world = [];

        for (let key in config.objects) {
            let object = config.objects[key];
            let objMaterialName = object.materialName;

            let materials = config.materials;
            let materialsArray = Object.values(materials);
            let selectedMaterial = materialsArray.filter(
                (mat) => mat.name == objMaterialName
            );

            if (selectedMaterial.length > 0)
                object.material = selectedMaterial[0];

            world.push(object);
        }

        finalConfig.world = world;
        return finalConfig;
    };

    //todo rerender should create the final config from config
    let reRender = () => {
        let requestConfig = {
            world: [
                {
                    objectType: "sphere",
                    locx: -2,
                    locy: 1,
                    locz: -2,
                    radius: 1,
                    material: {
                        materialType: "lambertian",
                        color: { r: 0.2, g: 0.9, b: 0.2 },
                    },
                },
                {
                    objectType: "sphere",
                    locx: -1,
                    locy: 1,
                    locz: 1,
                    radius: 1,
                    material: {
                        materialType: "dielectric",
                        ir: 1.33,
                    },
                },
                {
                    objectType: "sphere",
                    locx: -6,
                    locy: 4,
                    locz: 0,
                    radius: 4,
                    material: {
                        materialType: "metal",
                        color: { r: 0.2, g: 0.3, b: 1 },
                        fuzz: 0,
                    },
                },
                {
                    objectType: "sphere",
                    locx: 0,
                    locy: -10000,
                    locz: 0,
                    radius: 10000,
                    material: {
                        materialType: "lambertian",
                        color: { r: 1, g: 0.2, b: 0.2 },
                    },
                },
            ],
            camera: {
                aspectRatio: 16 / 9,
                imageWidth: 400,
                lookFrom: { x: 5, y: 0.5, z: 0 },
                lookAt: { x: 0, y: 1, z: 0 },
                vfov: 45,
                samplePerPixel: 20,
                defocusAngle: 0,
                maxDepth: 8,
            },
        };

        const finalConfig = createFinalConfig();

        if (finalConfig.camera) requestConfig.camera = finalConfig.camera;
        if (finalConfig.world) requestConfig.world = finalConfig.world;

        console.log({ requestConfig });
        window.sprt.render(requestConfig).then((res) => {
            console.log("app.jsx rerender", res);
            setResponse(res);
        });
    };

    useEffect(() => {
        console.log(config);
    }, [config]);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            <div className="App">
                <Canvas res={response}></Canvas>
                <ConfigForm useConfig={[config, setConfig]}></ConfigForm>
                <button onClick={reRender}>Click</button>
            </div>
        </ConfigContext.Provider>
    );
}

export default App;
