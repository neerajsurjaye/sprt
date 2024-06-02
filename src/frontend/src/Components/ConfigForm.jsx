import { useState } from "react";
import CreateObject from "./CreateObject";
import CreateMaterial from "./CrerateMaterial";

const ConfigForm = () => {
    let [objectConfigs, setObjectConfigs] = useState([]);
    let [materialConfigs, setMaterialConfigs] = useState([]);

    const appendCreateObject = () => {
        setObjectConfigs([...objectConfigs, <CreateObject></CreateObject>]);
    };

    const appendCreateMaterial = () => {
        setMaterialConfigs([
            ...materialConfigs,
            <CreateMaterial></CreateMaterial>,
        ]);
    };

    return (
        <form className="config-form">
            <div className="camera-config">
                {/* caemra config */}
                camera config
            </div>

            <div className="config-create">
                <input
                    type="button"
                    value={"Create Object"}
                    onClick={() => appendCreateObject()}
                />
                <input
                    type="button"
                    value={"Create Material"}
                    onClick={() => appendCreateMaterial()}
                />
            </div>

            <div className="config-objects">{objectConfigs}</div>
            <div className="config-materials">{materialConfigs}</div>
        </form>
    );
};
export default ConfigForm;
