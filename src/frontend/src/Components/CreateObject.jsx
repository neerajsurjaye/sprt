import { useContext, useEffect, useState } from "react";
import SphereForm from "./SphereForm";
import ConfigContext from "../Context/ConfigContext";

const CreateObject = (props) => {
    let [objectType, setObjectType] = useState("NONE");
    let [objectConfig, setObjectConfig] = useState({});
    let { config, setConfig } = useContext(ConfigContext);

    let idx = props.idx;

    let objectsComponents = {
        sphere: (
            <SphereForm
                useConfig={[objectConfig, setObjectConfig]}
            ></SphereForm>
        ),
        NONE: null,
    };

    useEffect(() => {
        if (config.objects) {
            let objects = config.objects;
            objects = {
                ...objects,
            };
            objects[idx] = objectConfig;
            setConfig({ ...config, objects: objects });
        } else {
            let objects = {};
            objects[idx] = objectConfig;

            setConfig({ ...config, objects });
        }
    }, [objectConfig]);

    let getObjectOptions = () => {
        let objectNames = ["NONE", "sphere"];
        let objectOption = [];
        for (let objectName of objectNames) {
            objectOption.push(
                <option key={objectName} value={objectName}>
                    {objectName}
                </option>
            );
        }
        return objectOption;
    };

    let generateObjectForm = (event) => {
        setObjectType(event.target.value);
    };

    return (
        <div className="create-object create flex center column child-width-100">
            <div className="form-input">
                <label>ObjectType</label>
                <select onChange={generateObjectForm}>
                    {getObjectOptions()}
                </select>
            </div>
            {objectsComponents[objectType]}
        </div>
    );
};
export default CreateObject;
