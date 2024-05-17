let canvas = document.getElementById("image");

window.api.on('image-rendered' , (event , res)=>{
    canvas.width = res.width;
    canvas.height = res.height;

    let ctx = canvas.getContext("2d");
    let palette = new ImageData(new Uint8ClampedArray(res.image) , res.width , res.height);
    ctx.putImageData(palette , 0 ,0);
})

window.sprt.render().then((res)=>{

    canvas.width = res.width;
    canvas.height = res.height;

    let ctx = canvas.getContext("2d");
    let palette = new ImageData(new Uint8ClampedArray(res.image) , res.width , res.height);
    ctx.putImageData(palette , 0 ,0);
    
})