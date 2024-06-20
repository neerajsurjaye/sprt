import { useContext, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ConfigContext from "../Context/ConfigContext";
import CanvasOutput from "./CanvasOutput";
import Loading from "./Loading";

const Output = () => {
    const { config, setConfig, response, reRender, setResponse } =
        useContext(ConfigContext);
    const [loading, setLoading] = useState(true);
    const outputDisplay = [
        <Loading></Loading>,
        <CanvasOutput
            res={response}
            className="flex-2 canvas canvasMain"
        ></CanvasOutput>,
    ];

    let render = async () => {
        await reRender();
        setLoading(false);
    };

    useEffect(() => {
        render();
    }, []);

    return (
        <div className="App flex">
            {loading ? outputDisplay[0] : outputDisplay[1]}
        </div>
    );
};

export default Output;
