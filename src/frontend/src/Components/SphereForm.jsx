import SelectMaterial from "./SelectMaterial";

let SphereForm = () => {
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
            <SelectMaterial></SelectMaterial>
        </div>
    );
};

export default SphereForm;
