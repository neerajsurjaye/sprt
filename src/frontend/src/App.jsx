import Editor from "./Components/Editor";
import "./style.css";
import ConfigContext from "./Context/ConfigContext";
import { useEffect, useState } from "react";
import Output from "./Components/Output";
import Header from "./Components/Header";

const App = () => {
    let [response, setResponse] = useState(null);
    let [config, setConfig] = useState({
        camera: {},
        materials: {},
        objects: {},
    });

    let [displayState, setDisplayState] = useState("editor");

    let display = {
        editor: (
            <div
                style={{ display: displayState == "editor" ? "block" : "none" }}
            >
                <Editor></Editor>
            </div>
        ),
        render: <Output></Output>,
    };

    const createFinalConfig = (requestConfig) => {
        let finalConfig = {};
        finalConfig.camera = { ...config.camera };

        if (finalConfig?.camera?.lookAt) {
            let lookAt = finalConfig.camera.lookAt;
            lookAt = { ...lookAt };
            lookAt.x = Number(lookAt.x);
            lookAt.y = Number(lookAt.y);
            lookAt.z = Number(lookAt.z);
            finalConfig.camera.lookAt = lookAt;
        }
        if (finalConfig?.camera?.lookFrom) {
            let lookFrom = finalConfig.camera.lookFrom;
            lookFrom = { ...lookFrom };
            lookFrom.x = Number(lookFrom.x);
            lookFrom.y = Number(lookFrom.y);
            lookFrom.z = Number(lookFrom.z);
            finalConfig.camera.lookFrom = lookFrom;
        }

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
    let reRenderNormals = () => {
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

        const finalConfig = createFinalConfig(requestConfig);

        if (finalConfig.camera) {
            requestConfig.camera = { ...finalConfig.camera };
            requestConfig.camera.imageWidth = 300;
        }
        if (finalConfig.world) requestConfig.world = finalConfig.world;

        console.log({ requestConfig });
        window.sprt.renderNormal(requestConfig).then((res) => {
            console.log("app.jsx rerender", res);
            setResponse(res);
        });
    };

    let reRender = async () => {
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

        const finalConfig = createFinalConfig(requestConfig);

        if (finalConfig.camera) requestConfig.camera = finalConfig.camera;
        if (finalConfig.world) requestConfig.world = finalConfig.world;

        console.log({ requestConfig });
        // window.sprt.render(requestConfig).then((res) => {
        //     console.log("app.jsx rerender", res);
        //     setResponse(res);
        // });

        const res = await window.sprt.render(requestConfig);
        setResponse(res);
    };

    let currentDisplay = () => {
        if (displayState == "render") return display[displayState];
    };

    useEffect(() => {
        console.log(config);
        reRenderNormals();
    }, [config]);

    return (
        <ConfigContext.Provider
            value={{
                config,
                setConfig,
                response,
                reRenderNormals,
                reRender,
                setResponse,
            }}
        >
            <div>
                <Header></Header>
                <div className="tabs">
                    <input
                        type="button"
                        value="Editor"
                        className="tab-button"
                        name="editor"
                        onClick={() => {
                            setDisplayState("editor");
                            setConfig({ ...config });
                        }}
                    />
                    <input
                        type="button"
                        value="Render"
                        className="tab-button"
                        name="render"
                        onClick={() => {
                            setDisplayState("render");
                        }}
                    />
                </div>
                {currentDisplay()}
                {display["editor"]}
            </div>
        </ConfigContext.Provider>
    );
};

export default App;
