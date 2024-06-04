import { useContext } from "react";
import SelectMaterial from "./SelectMaterial";
import ConfigContext from "../Context/ConfigContext";

let SphereForm = () => {
    let { config, setConfig } = useContext(ConfigContext);

    let getMaterialOptions = () => {
        let matOptions = [];
        let materials = config.materials;
        if (!materials) return;
        for (let idx in materials) {
            matOptions.push(<option>{materials[idx].name}</option>);
        }
        return matOptions;
    };

    return (
        <div className="object-params">
            <label>Location</label>

            <div className="location">
                <label>X</label>
                <input type="text" value={0} />
                <label>Y</label>
                <input type="text" value={0} />
                <label>Z</label>
                <input type="text" value={0} />
            </div>

            <label> Radius</label>
            <input type="text" value={1} />

            <label>Material</label>
            <select>{getMaterialOptions()}</select>
        </div>
    );
};

export default SphereForm;
