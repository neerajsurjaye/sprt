import Core from "../Engine/Core";

const { BrowserWindow, app, ipcMain } = require("electron")
const path = require('node:path')
let win : any;

const createWindow  = () : void =>{
    win = new BrowserWindow({
        width: 800,
        height : 600,
        webPreferences : {
            preload : path.join(__dirname , 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname , "/static/index.html"));
}

app.on("window-all-closed" , ()=>{
    if(process.platform != 'darwin') app.quit()
})

app.whenReady().then(()=>{

    createWindow();

    let sprt : Core = new Core(win);
    ipcMain.handle('render' , ()=>{return sprt.render()})

})

