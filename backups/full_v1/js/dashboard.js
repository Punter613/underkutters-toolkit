let jobs=[];


async function loadDashboard(){

try{

jobs=await API.jobs();

updateStats();
renderJobs();

document.getElementById("sync-status").innerHTML="🟢 Online";

}

catch(e){

console.error(e);

document.getElementById("sync-status").innerHTML="🔴 Offline";

}

}



function updateStats(){

let revenue=0;
let materials=0;

jobs.forEach(job=>{

(job.scope||[]).forEach(x=>{
revenue+=Number(x.price||0);
});

(job.materials||[]).forEach(x=>{
materials+=Number(x.cost||0);
});

});


document.getElementById("active-jobs").innerText=jobs.length;

document.getElementById("revenue").innerText=
"$"+revenue.toFixed(2);

document.getElementById("materials").innerText=
"$"+materials.toFixed(2);


}



function renderJobs(){

let box=document.getElementById("job-list");

if(!box)return;


if(!jobs.length){

box.innerHTML="No active jobs";

return;

}


box.innerHTML="";


jobs.slice(-5).reverse().forEach(job=>{

box.innerHTML+=`

<div class="job-card">

<h3>🔥 ${job.number}</h3>

<p>👤 ${job.customer}</p>

<p>📍 ${job.address}</p>

<strong>${job.status}</strong>

</div>

`;

});

}



window.onload=()=>{

loadDashboard();

};
