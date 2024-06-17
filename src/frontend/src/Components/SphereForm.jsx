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
        newConfig[event.target.name] = event.target.value;
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
            <label className="form-title">Location</label>

            <div className="coordinates">
                <div className="form-input">
                    <label>x</label>
                    <input
                        type="number"
                        value={sphereConfig.locx}
                        name="locx"
                        onChange={updateConfig}
                    />
                </div>
                <div className="form-input">
                    <label>y</label>
                    <input
                        type="number"
                        value={sphereConfig.locy}
                        name="locy"
                        onChange={updateConfig}
                    />
                </div>
                <div className="form-input">
                    <label>z</label>
                    <input
                        type="number"
                        value={sphereConfig.locz}
                        name="locz"
                        onChange={updateConfig}
                    />
                </div>
            </div>

            <div className="form-input">
                <label> Radius</label>
                <input
                    type="number"
                    value={sphereConfig.radius}
                    name="radius"
                    onChange={updateConfig}
                />
            </div>

            <div className="form-input">
                <label>Material</label>
                <select onChange={updateMaterial} name="materialName">
                    {getMaterialOptions()}
                </select>
            </div>
        </div>
    );
};

export default SphereForm;
