const { contextBridge  , ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('sprt', {
  render : async ()=>{
	try{
	  let image = await ipcRenderer.invoke('render');
	  return image;
	}catch(error){
	  console.error(error);   
	}
  }
})