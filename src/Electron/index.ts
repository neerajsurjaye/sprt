import { join } from "path";
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
    // const startURL = join(__dirname, "/static/test.html");
    // const startURL = "D:/Coding/sprt/build/Electron/test.html";

    win.webContents.openDevTools();
    win.loadURL(startURL);
    // win.loadFile(startURL);
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
        return sprt.render("channelx", config);
    });

    ipcMain.handle("renderNormal", (event: any, config: any) => {
        return sprt.renderNormal("channelx", config);
    });

    ipcMain.handle("refresh", (config: any) => {
        sprt.updateConfig(config);
    });
});
