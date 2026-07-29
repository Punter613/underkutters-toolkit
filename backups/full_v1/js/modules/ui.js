function toast(msg){

let box=document.createElement("div");

box.innerHTML=msg;

box.style.position="fixed";
box.style.bottom="90px";
box.style.left="20px";
box.style.right="20px";
box.style.padding="15px";
box.style.background="#f59e0b";
box.style.color="#000";
box.style.borderRadius="10px";
box.style.fontWeight="bold";
box.style.zIndex="9999";

document.body.appendChild(box);

setTimeout(()=>box.remove(),2500);

}

window.toast=toast;
