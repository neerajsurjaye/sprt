import { useContext } from "react";
import Canvas from "./Canvas";
import ConfigForm from "./ConfigForm";
import ConfigContext from "../Context/ConfigContext";

function Editor() {
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
