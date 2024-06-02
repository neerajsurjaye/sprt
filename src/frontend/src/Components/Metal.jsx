let Metal = () => {
    return (
        <div action="metal-form">
            <label>Color</label>

            <div className="color">
                <label>R</label>
                <input type="text" value={1} />
                <label>G</label>
                <input type="text" value={0} />
                <label>B</label>
                <input type="text" value={0} />
            </div>

            <label>Fuzz</label>
            <input type="number" value={0} />
        </div>
    );
};

export default Metal;
