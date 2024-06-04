const Lambertian = () => {
    return (
        <div action="lambertian-form">
            <label>Color</label>

            <div className="color">
                <label>R</label>
                <input type="text" value={1} />
                <label>G</label>
                <input type="text" value={0} />
                <label>B</label>
                <input type="text" value={0} />
            </div>
        </div>
    );
};

export default Lambertian;
