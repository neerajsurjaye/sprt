import { useContext, useEffect, useState } from "react";
import ConfigContext from "../Context/ConfigContext";
import Dielectric from "./Dielectric";
import Lambertian from "./Lambertian";
import Metal from "./Metal";

const CreateMaterial = (props) => {
    let idx = props.idx;
    let { config, setConfig } = useContext(ConfigContext);
    let [materialName, setMaterialName] = useState("NONE");
    let [materialConfig, setMaterialConfig] = useState({ name: "" });

    useEffect(() => {
        if (config.materials) {
            let materials = config.materials;
            materials = {
                ...materials,
            };
            materials[idx] = materialConfig;
            setConfig({ ...config, materials });
        } else {
            let materials = {};
            materials[idx] = materialConfig;

            setConfig({ ...config, materials });
        }
    }, [materialConfig]);

    let getMaterialOptions = () => {
        let materialNames = ["NONE", "dielectric", "lambertian", "metal"];
        let materialOptions = [];
        for (let materialName of materialNames) {
            materialOptions.push(
                <option key={materialName} value={materialName}>
                    {materialName}
                </option>
            );
        }
        return materialOptions;
    };

    let components = {
        NONE: <div></div>,
        dielectric: (
            <Dielectric
                materialConfig={materialConfig}
                setMaterialConfig={setMaterialConfig}
                key={"dielectric"}
            ></Dielectric>
        ),
        lambertian: (
            <Lambertian
                useMaterial={[materialConfig, setMaterialConfig]}
                key={"lambertian"}
            ></Lambertian>
        ),
        metal: (
            <Metal
                useMaterial={[materialConfig, setMaterialConfig]}
                key={"metal"}
            ></Metal>
        ),
    };

    useEffect(() => {
        console.log("useEffect MatConfig", materialConfig);
    }, [materialConfig]);

    return (
        <form className="create-material flex center column child-width-100 material-form">
            <div className="form-input">
                <label htmlFor="materialName">MaterialName</label>
                <input
                    type="text"
                    name="materaialName"
                    id="materialName"
                    value={materialConfig.name}
                    onChange={(event) => {
                        setMaterialConfig({
                            ...materialConfig,
                            name: event.target.value,
                        });
                    }}
                />
            </div>

            <div className="form-input">
                <label htmlFor="material-options">MaterialType</label>
                <select
                    id="material-options"
                    onChange={(event) => {
                        setMaterialName(event.target.value);
                    }}
                >
                    {getMaterialOptions()}
                </select>
            </div>
            {components[materialName]}
        </form>
    );
};
export default CreateMaterial;
