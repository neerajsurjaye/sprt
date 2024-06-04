import { useContext, useEffect, useState } from "react";
import ConfigContext from "../Context/ConfigContext";

const CameraConfig = (props) => {
    // let [config, setConfig] = props.useConfig;
    const { config, setConfig } = useContext(ConfigContext);

    let [cameraConfig, setCameraConfig] = useState({
        aspectRatio: 16 / 9,
        imageWidth: 400,
        vfov: 45,
        defocusAngle: 0,
        samplePerPixel: 8,
        maxDepth: 4,
        lookFrom: { x: 5, y: 5, z: 5 },
        lookAt: { x: 0, y: 0, z: 0 },
    });

    const updateCameraConfig = (event) => {
        let name = event.target.name;
        let newCameraConfig = { ...cameraConfig };
        newCameraConfig[name] = Number(event.target.value);
        setCameraConfig(newCameraConfig);
    };

    const updateCameraConfigVectors = (event) => {
        let name = event.target.name;
        let configName = name.split("-")[0];
        let configCoordinateName = name.split("-")[1];
        let newCameraConfig = { ...cameraConfig };

        newCameraConfig[configName][configCoordinateName] = Number(
            event.target.value
        );
        setCameraConfig(newCameraConfig);
    };

    useEffect(() => {
        let newConfig = { ...config };
        newConfig["camera"] = cameraConfig;
        setConfig(newConfig);
    }, [cameraConfig]);

    return (
        <div className="camera-config">
            <label htmlFor="aspectRatio">
                Aspect Ratio{" "}
                <input
                    type="number"
                    name="aspectRatio"
                    value={cameraConfig.aspectRatio}
                    onChange={updateCameraConfig}
                />
            </label>

            <label htmlFor="imageWidth">
                Image Width{" "}
                <input
                    type="number"
                    name="imageWidth"
                    value={cameraConfig.imageWidth}
                    onChange={updateCameraConfig}
                />
            </label>

            <div>
                <label>lookFrom</label>

                <div className="color">
                    <label>x</label>
                    <input
                        type="number"
                        value={cameraConfig.lookFrom.x}
                        name="lookFrom-x"
                        onChange={updateCameraConfigVectors}
                    />
                    <label>y</label>
                    <input
                        type="number"
                        value={cameraConfig.lookFrom.y}
                        name="lookFrom-y"
                        onChange={updateCameraConfigVectors}
                    />
                    <label>z</label>
                    <input
                        type="number"
                        value={cameraConfig.lookFrom.z}
                        name="lookFrom-z"
                        onChange={updateCameraConfigVectors}
                    />
                </div>
            </div>

            <div>
                <label>lookat</label>

                <div className="color">
                    <label>x</label>
                    <input
                        type="number"
                        value={cameraConfig.lookAt.x}
                        name="lookAt-x"
                        onChange={updateCameraConfigVectors}
                    />
                    <label>y</label>
                    <input
                        type="number"
                        value={cameraConfig.lookAt.y}
                        name="lookAt-y"
                        onChange={updateCameraConfigVectors}
                    />
                    <label>z</label>
                    <input
                        type="number"
                        value={cameraConfig.lookAt.z}
                        name="lookAt-z"
                        onChange={updateCameraConfigVectors}
                    />
                </div>
            </div>

            <label htmlFor="vFOV">
                vFOV{" "}
                <input
                    type="number"
                    name="vfov"
                    value={cameraConfig.vfov}
                    onChange={updateCameraConfig}
                />
            </label>

            <label htmlFor="defocusAngle">
                Defocus Angle{" "}
                <input
                    type="text"
                    name="defocusAngle"
                    value={cameraConfig.defocusAngle}
                    onChange={updateCameraConfig}
                />
            </label>

            <label htmlFor="samplePerPixel">
                Sample Per pixel{" "}
                <input
                    type="text"
                    name="samplePerPixel"
                    value={cameraConfig.samplePerPixel}
                    onChange={updateCameraConfig}
                />
            </label>

            <label htmlFor="maxDepth">
                Max Depth{" "}
                <input
                    type="text"
                    name="maxDepth"
                    value={cameraConfig.maxDepth}
                    onChange={updateCameraConfig}
                />
            </label>
        </div>
    );
};

export default CameraConfig;
