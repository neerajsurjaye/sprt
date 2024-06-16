// import { useEffect, useState } from "react";
import { useContext } from "react";
import Canvas from "./Canvas";
import ConfigForm from "./ConfigForm";
import ConfigContext from "../Context/ConfigContext";

function Editor() {
    // let canvas = document.   getElementById("image");

    //todo code should be blocking
    // window.api.on("image-rendered", (event, res) => {
    //     canvas.width = res.width;
    //     canvas.height = res.height;

    //     let ctx = canvas.getContext("2d");
    //     let palette = new ImageData(
    //         new Uint8ClampedArray(res.image),
    //         res.width,
    //         res.height
    //     );
    //     ctx.putImageData(palette, 0, 0);
    // });

    // window.sprt.render().then((res) => {
    //     canvas = document.getElementById("image");

    //     canvas.width = res.width;
    //     canvas.height = res.height;

    //     let ctx = canvas.getContext("2d");
    //     let palette = new ImageData(
    //         new Uint8ClampedArray(res.image),
    //         res.width,
    //         res.height
    //     );
    //     ctx.putImageData(palette, 0, 0);
    // });

    const { config, setConfig, response, reRenderNormals } =
        useContext(ConfigContext);

    return (
        <div className="App flex">
            <Canvas
                res={response}
                className="flex-2 canvas canvasMain"
            ></Canvas>
            <div className="configs flex-1">
                <ConfigForm useConfig={[config, setConfig]}></ConfigForm>
                <input
                    className="w-100"
                    type="button"
                    value="Render"
                    onClick={reRenderNormals}
                />
            </div>
        </div>
    );
}

export default Editor;
