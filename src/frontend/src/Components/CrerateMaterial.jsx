import { useState } from "react";
import SphereForm from "./SphereForm";
import Dielectric from "./Dielectric";
import Lambertian from "./Lambertian";
import Metal from "./Metal";

const CreateMaterial = () => {
    let [materialForm, setMaterialForm] = useState(null);

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

    let generateMaterialForm = (event) => {
        let materialType = event?.target?.value;
        if (!materialType) return;

        if (materialType == "dielectric") {
            setMaterialForm(<Dielectric> </Dielectric>);
        } else if (materialType == "lambertian") {
            setMaterialForm(<Lambertian></Lambertian>);
        } else if (materialType == "metal") {
            setMaterialForm(<Metal></Metal>);
        } else {
            setMaterialForm(null);
        }
    };

    return (
        <form className="create-material">
            <label htmlFor="materialName">MaterialName</label>
            <input type="text" name="materaialName" id="materialName" />
            <select onChange={generateMaterialForm}>
                {getMaterialOptions()}
            </select>
            {materialForm}
        </form>
    );
};
export default CreateMaterial;
