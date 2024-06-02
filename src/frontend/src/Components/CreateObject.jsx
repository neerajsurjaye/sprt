import { useState } from "react";
import SphereForm from "./SphereForm";

const CreateObject = () => {
    let [objectForms, setObjectForms] = useState(null);

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
        let objectType = event?.target?.value;
        if (!objectType) return;

        if (objectType == "sphere") {
            setObjectForms(<SphereForm> </SphereForm>);
        } else if (objectType == "NONE") {
            setObjectForms(null);
        } else {
            setObjectForms(null);
        }
    };

    return (
        <div className="create-object">
            <select onChange={generateObjectForm}>{getObjectOptions()}</select>
            {objectForms}
        </div>
    );
};
export default CreateObject;
