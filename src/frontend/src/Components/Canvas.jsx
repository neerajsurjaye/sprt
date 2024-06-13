import { useEffect, useRef } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const res = props.res;

    useEffect(() => {
        //todo props should set the data of canvas

        if (!canvasRef?.current || !res) return;

        const canvas = canvasRef.current;
        let ctx = canvas.getContext("2d");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const tempCanvas = document.createElement("canvas");
        let tempCtx = tempCanvas.getContext("2d");
        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );
        tempCanvas.width = res.width;
        tempCanvas.height = res.height;
        tempCtx.putImageData(palette, 0, 0);

        ctx.drawImage(
            tempCanvas,
            0,
            0,
            res.width,
            res.height,
            0,
            0,
            canvasWidth,
            canvasHeight
        );
    }, [props.res]);

    return (
        <div className={props.className + " canvas-container"}>
            <canvas ref={canvasRef} {...props}></canvas>
        </div>
    );
};

export default Canvas;
