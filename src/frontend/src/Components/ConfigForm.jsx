import { useContext, useEffect, useState } from "react";
import CreateObject from "./CreateObject";
import CreateMaterial from "./CrerateMaterial";
import CameraConfig from "./CameraConfig";
import ConfigContext from "../Context/ConfigContext";

const ConfigForm = (props) => {
    let [objectConfigs, setObjectConfigs] = useState([]);
    let [materialConfigs, setMaterialConfigs] = useState([]);
    let [materialCount, setMaterialCount] = useState(0);

    const appendCreateObject = () => {
        setObjectConfigs([...objectConfigs, <CreateObject></CreateObject>]);
    };

    const appendCreateMaterial = () => {
        setMaterialCount(materialCount + 1);
        let newMaterial = (
            <CreateMaterial
                key={materialCount}
                idx={materialCount}
            ></CreateMaterial>
        );
        setMaterialConfigs([...materialConfigs, newMaterial]);
    };

    return (
        <form className="config-form">
            <div className="camera-config">
                <CameraConfig></CameraConfig>
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
