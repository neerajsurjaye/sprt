import { useEffect, useState } from "react";

const Metal = (props) => {
    let [materialConfig, setMaterialConfig] = props.useMaterial;
    let [color, setColor] = useState({ r: 1, g: 1, b: 0 });
    let [fuzz, setFuzz] = useState(0);

    let updateColor = (event) => {
        let newColor = { ...color };
        newColor[event.target.name] = event.target.value;
        setColor(newColor);
    };

    useEffect(() => {
        console.log("metalFuzz", materialConfig, fuzz);
        setMaterialConfig({
            ...materialConfig,
            materialType: "metal",
            fuzz: fuzz,
            color: color,
        });
    }, [fuzz, color]);

    return (
        <div action="metal-form ">
            <label className="form-title">Color</label>

            <div className="color">
                <div className="form-input">
                    <label>R</label>
                    <input
                        type="number"
                        value={color.r}
                        name="r"
                        onChange={updateColor}
                    />
                </div>
                <div className="form-input">
                    <label>G</label>
                    <input
                        type="number"
                        value={color.g}
                        name="g"
                        onChange={updateColor}
                    />
                </div>
                <div className="form-input">
                    <label>B</label>
                    <input
                        type="number"
                        value={color.b}
                        name="b"
                        onChange={updateColor}
                    />
                </div>
            </div>

            <div className="form-input">
                <label>Fuzz</label>
                <input
                    type="number"
                    value={fuzz}
                    name="fuzz"
                    onChange={(event) => {
                        setFuzz(event.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default Metal;
