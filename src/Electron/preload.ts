const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("api", {
    on: (channel: any, func: any) => {
        ipcRenderer.on(channel, func);
    },
});

contextBridge.exposeInMainWorld("sprt", {
    render: async (config: any) => {
        try {
            let image = await ipcRenderer.invoke("render", config);
            return image;
        } catch (error) {
            console.error(error);
        }
    },
    renderNormal: async (config: any) => {
        try {
            let image = await ipcRenderer.invoke("renderNormal", config);
            return image;
        } catch (error) {
            console.error(error);
        }
    },
});
