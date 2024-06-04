import { useEffect, useState } from "react";

let Dielectric = (props) => {
    let materialConfig = props.materialConfig;
    let setMaterialConfig = props.setMaterialConfig;
    let [ir, setIr] = useState(1.4);

    useEffect(() => {
        setMaterialConfig({ ...materialConfig, ir: ir });
    }, [ir]);

    return (
        <div action="dielectric-form">
            <label htmlFor="Refraction Index"></label>
            <input
                type="number"
                value={ir}
                onChange={(event) => {
                    setIr(Number(event.target.value));
                }}
            />

            <h5>matConf : {JSON.stringify(materialConfig)}</h5>
            <h5>{JSON.stringify(props.matConf)}</h5>
        </div>
    );
};

export default Dielectric;
