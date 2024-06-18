import { useContext, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ConfigContext from "../Context/ConfigContext";
import CanvasOutput from "./CanvasOutput";

const Output = () => {
    const { config, setConfig, response, reRender, setResponse } =
        useContext(ConfigContext);
    const [loading, setLoading] = useState(0);
    const outputDisplay = [
        <div>Loading</div>,
        <CanvasOutput
            res={response}
            className="flex-2 canvas canvasMain"
        ></CanvasOutput>,
    ];

    let isLoading = () => {
        return response == null;
    };

    useEffect(() => {
        reRender();
    }, []);

    return <div className="App flex">{outputDisplay[1]}</div>;
};

export default Output;
