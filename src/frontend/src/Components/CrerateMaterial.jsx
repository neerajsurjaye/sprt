import { useContext, useEffect, useState } from "react";
import SphereForm from "./SphereForm";
import Dielectric from "./Dielectric";
import Lambertian from "./Lambertian";
import Metal from "./Metal";
import ConfigContext from "../Context/ConfigContext";

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
        <form className="create-material">
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
            <select
                onChange={(event) => {
                    setMaterialName(event.target.value);
                }}
            >
                {getMaterialOptions()}
            </select>

            {components[materialName]}
        </form>
    );
};
export default CreateMaterial;
