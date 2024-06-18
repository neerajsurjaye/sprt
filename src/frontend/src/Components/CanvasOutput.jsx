import { useEffect, useRef } from "react";

const CanvasOutput = (props) => {
    const canvasRef = useRef(null);
    const res = props.res;

    useEffect(() => {
        //todo props should set the data of canvas

        if (!canvasRef?.current || !res) return;

        const canvas = canvasRef.current;
        let ctx = canvas.getContext("2d");

        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );

        canvas.width = res.width;
        canvas.height = res.height;

        ctx.putImageData(palette, 0, 0);
    }, [props.res]);

    return (
        <div className={props.className + " canvas-container"}>
            <canvas ref={canvasRef} {...props}></canvas>
        </div>
    );
};

export default CanvasOutput;
