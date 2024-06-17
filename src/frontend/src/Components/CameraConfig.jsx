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
        newCameraConfig[name] = event.target.value;
        setCameraConfig(newCameraConfig);
    };

    const updateCameraConfigVectors = (event) => {
        let name = event.target.name;
        let configName = name.split("-")[0];
        let configCoordinateName = name.split("-")[1];
        let newCameraConfig = { ...cameraConfig };

        newCameraConfig[configName][configCoordinateName] = event.target.value;
        setCameraConfig(newCameraConfig);
    };

    useEffect(() => {
        let newConfig = { ...config };
        newConfig["camera"] = cameraConfig;
        setConfig(newConfig);
    }, [cameraConfig]);

    return (
        <div className="camera-config config-container">
            <h2 className="heading">Camera</h2>
            <div className="config-form">
                <div className="form-input">
                    <label htmlFor="aspectRatio">Aspect Ratio </label>
                    <input
                        type="number"
                        name="aspectRatio"
                        value={cameraConfig.aspectRatio}
                        onChange={updateCameraConfig}
                    />
                </div>

                <div className="form-input">
                    <label htmlFor="imageWidth">Image Width </label>
                    <input
                        type="number"
                        name="imageWidth"
                        value={cameraConfig.imageWidth}
                        onChange={updateCameraConfig}
                    />
                </div>

                <div>
                    <div className="coordinates">
                        <label className="form-title">lookFrom</label>
                        <div className="form-input">
                            <label>x</label>
                            <input
                                type="number"
                                value={cameraConfig.lookFrom.x}
                                name="lookFrom-x"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>
                        <div className="form-input">
                            <label>y</label>
                            <input
                                type="number"
                                value={cameraConfig.lookFrom.y}
                                name="lookFrom-y"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>
                        <div className="form-input">
                            <label>z</label>
                            <input
                                type="number"
                                value={cameraConfig.lookFrom.z}
                                name="lookFrom-z"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="coordinates">
                        <label className="form-title">look-at</label>

                        <div className="form-input">
                            <label>x</label>
                            <input
                                type="number"
                                value={cameraConfig.lookAt.x}
                                name="lookAt-x"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>

                        <div className="form-input">
                            <label>y</label>
                            <input
                                type="number"
                                value={cameraConfig.lookAt.y}
                                name="lookAt-y"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>
                        <div className="form-input">
                            <label>z</label>
                            <input
                                type="number"
                                value={cameraConfig.lookAt.z}
                                name="lookAt-z"
                                onChange={updateCameraConfigVectors}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-input">
                    <label htmlFor="vFOV">vFOV </label>
                    <input
                        type="number"
                        name="vfov"
                        value={cameraConfig.vfov}
                        onChange={updateCameraConfig}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="defocusAngle">Defocus Angle </label>
                    <input
                        type="number"
                        name="defocusAngle"
                        value={cameraConfig.defocusAngle}
                        onChange={updateCameraConfig}
                    />
                </div>

                <div className="form-input">
                    <label htmlFor="samplePerPixel">Sample Per pixel </label>
                    <input
                        type="number"
                        name="samplePerPixel"
                        value={cameraConfig.samplePerPixel}
                        onChange={updateCameraConfig}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="maxDepth">Max Depth </label>
                    <input
                        type="number"
                        name="maxDepth"
                        value={cameraConfig.maxDepth}
                        onChange={updateCameraConfig}
                    />
                </div>
            </div>
        </div>
    );
};

export default CameraConfig;
