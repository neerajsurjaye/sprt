import { useContext, useState } from "react";
import Canvas from "./Canvas";
import ConfigContext from "../Context/ConfigContext";

const Output = () => {
    const { config, setConfig, response, reRender, setResponse } =
        useContext(ConfigContext);
    const [loading, setLoading] = useState(0);
    const outputDisplay = [
        <div>Loading</div>,
        <Canvas res={response} className="flex-2 canvas canvasMain"></Canvas>,
    ];

    let isLoading = () => {
        return response == null;
    };

    useState(() => {
        reRender();
    });

    return <div className="App flex">{outputDisplay[1]}</div>;
};

export default Output;
