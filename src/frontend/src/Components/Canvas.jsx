import { useEffect, useRef } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const res = props.res;

    useEffect(() => {
        //todo props should set the data of canvas

        if (!canvasRef?.current || !res) return;

        const canvas = canvasRef.current;
        canvas.width = res.width;
        canvas.height = res.height;
        let ctx = canvas.getContext("2d");
        let palette = new ImageData(
            new Uint8ClampedArray(res.image),
            res.width,
            res.height
        );
        ctx.putImageData(palette, 0, 0);
    }, [props.res]);

    return (
        <canvas className={props.className} ref={canvasRef} {...props}></canvas>
    );
};

export default Canvas;
