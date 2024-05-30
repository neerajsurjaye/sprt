import "./App.css";

function App() {
    let canvas = document.getElementById("image");

    //todo code should be blocking
    window.api.on("image-rendered", (event, res) => {
        canvas.width = res.width;
        canvas.height = res.height;

        let ctx = canvas.getContext("2d");
        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );
        ctx.putImageData(palette, 0, 0);
    });

    window.sprt.render().then((res) => {
        canvas = document.getElementById("image");

        canvas.width = res.width;
        canvas.height = res.height;

        let ctx = canvas.getContext("2d");
        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );
        ctx.putImageData(palette, 0, 0);
    });

    return (
        <div className="App">
            <canvas id="image"></canvas>
        </div>
    );
}

export default App;
