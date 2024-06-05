import { useEffect, useState } from "react";

const Metal = (props) => {
    let [materialConfig, setMaterialConfig] = props.useMaterial;
    let [color, setColor] = useState({ r: 1, g: 1, b: 0 });
    let [fuzz, setFuzz] = useState(0);

    let updateColor = (event) => {
        let newColor = { ...color };
        newColor[event.target.name] = Number(event.target.value);
        setColor(newColor);
    };

    // useEffect(() => {
    //     console.log("metalColor", materialConfig, color);
    //     setMaterialConfig({ ...materialConfig, color: color });
    // }, [color]);

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
        <div action="metal-form">
            <label>Color</label>

            <div className="color">
                <label>R</label>
                <input
                    type="number"
                    value={color.r}
                    name="r"
                    onChange={updateColor}
                />
                <label>G</label>
                <input
                    type="number"
                    value={color.g}
                    name="g"
                    onChange={updateColor}
                />
                <label>B</label>
                <input
                    type="number"
                    value={color.b}
                    name="b"
                    onChange={updateColor}
                />
            </div>

            <label>Fuzz</label>
            <input
                type="number"
                value={fuzz}
                name="fuzz"
                onChange={(event) => {
                    setFuzz(Number(event.target.value));
                }}
            />
        </div>
    );
};

export default Metal;
