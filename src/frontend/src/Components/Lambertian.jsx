import { useEffect, useState } from "react";

const Lambertian = (props) => {
    let [materialConfig, setMaterialConfig] = props.useMaterial;
    let [color, setColor] = useState({ r: 1, g: 1, b: 0 });

    let updateColor = (event) => {
        let newColor = { ...color };
        newColor[event.target.name] = Number(event.target.value);
        setColor(newColor);
    };

    useEffect(() => {
        console.log("lambertian color", color);
        setMaterialConfig({
            ...materialConfig,
            materialType: "lambertian",
            color: color,
        });
    }, [color]);

    return (
        <div action="lambertian-form">
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
        </div>
    );
};

export default Lambertian;
