import { useEffect, useState } from "react";

const Dielectric = (props) => {
    let materialConfig = props.materialConfig;
    let setMaterialConfig = props.setMaterialConfig;
    let [ir, setIr] = useState(1.4);

    useEffect(() => {
        setMaterialConfig({
            ...materialConfig,
            materialType: "dielectric",
            ir: ir,
        });
    }, [ir]);

    return (
        <div className="dielectric-form form-input">
            <label htmlFor="Refraction Index">Refraction Index</label>
            <input
                type="number"
                value={ir}
                onChange={(event) => {
                    setIr(Number(event.target.value));
                }}
            />
        </div>
    );
};

export default Dielectric;
