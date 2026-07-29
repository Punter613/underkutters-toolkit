let canvas=
document.createElement("canvas");


canvas.width=400;

canvas.height=150;


canvas.style.border="2px solid white";


document.body.appendChild(canvas);


let ctx=canvas.getContext("2d");


let drawing=false;


canvas.onmousedown=()=>drawing=true;

canvas.onmouseup=()=>drawing=false;


canvas.onmousemove=e=>{


if(!drawing)return;


ctx.lineTo(
e.offsetX,
e.offsetY
);


ctx.stroke();


};



function saveSignature(){


return canvas.toDataURL();


}
