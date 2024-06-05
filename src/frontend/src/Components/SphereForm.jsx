import { useContext, useEffect, useState } from "react";
import SelectMaterial from "./SelectMaterial";
import ConfigContext from "../Context/ConfigContext";

const SphereForm = (props) => {
    let { config, setConfig } = useContext(ConfigContext);
    let [objectConfig, setObjectConfig] = props.useConfig;
    let [sphereConfig, setSphereConfig] = useState({
        objectType: "sphere",
        locx: 0,
        locy: 0,
        locz: 0,
        radius: 1,
        material: null,
        materialName: "",
    });

    let getMaterialOptions = () => {
        let matOptions = [
            <option value={"NONE"} name={"materialName"}>
                NONE
            </option>,
        ];
        let materials = config.materials;
        if (!materials) return;
        for (let idx in materials) {
            matOptions.push(
                <option name={"materialName"} value={materials[idx].name}>
                    {materials[idx].name}
                </option>
            );
        }
        return matOptions;
    };

    let updateConfig = (event) => {
        let newConfig = { ...sphereConfig };
        newConfig[event.target.name] = Number(event.target.value);
        setSphereConfig(newConfig);
    };

    let updateMaterial = (event) => {
        let newConfig = { ...sphereConfig };
        newConfig[event.target.name] = event.target.value;
        setSphereConfig(newConfig);
    };

    useEffect(() => {
        setObjectConfig(sphereConfig);
    }, [sphereConfig]);

    // useEffect(() => {
    //     if (config.objects) {
    //         let objects = config.objects;
    //         objects = {
    //             ...objects,
    //         };
    //         objects[idx] = sphereConfig;
    //         setConfig({ ...config, objects: objects });
    //     } else {
    //         let objects = {};
    //         objects[idx] = sphereConfig;

    //         setConfig({ ...config, objects });
    //     }
    // }, [sphereConfig]);

    return (
        <div className="object-params">
            <label>Location</label>

            <div className="location">
                <label>X</label>
                <input
                    type="number"
                    value={sphereConfig.locx}
                    name="locx"
                    onChange={updateConfig}
                />
                <label>Y</label>
                <input
                    type="number"
                    value={sphereConfig.locy}
                    name="locy"
                    onChange={updateConfig}
                />
                <label>Z</label>
                <input
                    type="number"
                    value={sphereConfig.locz}
                    name="locz"
                    onChange={updateConfig}
                />
            </div>

            <label> Radius</label>
            <input
                type="number"
                value={sphereConfig.radius}
                name="radius"
                onChange={updateConfig}
            />

            <label>Material</label>
            <select onChange={updateMaterial} name="materialName">
                {getMaterialOptions()}
            </select>
        </div>
    );
};

export default SphereForm;
