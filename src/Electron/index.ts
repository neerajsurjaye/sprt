import Core from "../Engine/Core";

import { BrowserWindow, app, ipcMain, screen } from "electron";
const path = require("node:path");
let win: BrowserWindow;

const createWindow = (): void => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    const startURL = "http://localhost:3000/";
    // const startURL =`file://${path.join(__dirname, "../../frontend/build/index.html")}`;

    win.webContents.openDevTools();
    win.loadURL(startURL);
};

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
});

app.whenReady().then(() => {
    createWindow();

    let renderImage = (operation: string, message: any) => {
        win.webContents.send(operation, {
            image: message.image,
            width: message.width,
            height: message.height,
        });
    };

    let sprt: Core = new Core(renderImage);
    ipcMain.handle("render", (event: any, config: any) => {
        return sprt.renderNormal("channelx", config);
    });
    ipcMain.handle("refresh", (config: any) => {
        sprt.updateConfig(config);
    });
});
