import { useState } from "react";

let SelectMaterial = () => {
    let [materials, setMaterials] = useState(["NONE", "temporaryMaterial"]);

    let geneateMaterialOptions = () => {
        let options = [];

        for (let material of materials) {
            options.push(
                <option value={material} key={material}>
                    {material}
                </option>
            );
        }
        return options;
    };

    return (
        <select className="select-material">{geneateMaterialOptions()}</select>
    );
};

export default SelectMaterial;
