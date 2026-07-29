#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 Upgrading Underkutters Pro..."

mkdir -p public/js/modules
mkdir -p backups

cp public/index.html backups/index_$(date +%s).html

cat > public/js/modules/api.js <<'JS'
const API = {

async jobs(){
    const r = await fetch('/api/jobs');
    return await r.json();
},

async createJob(data){
    const r = await fetch('/api/jobs',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });

    return await r.json();
}

};

window.API = API;
JS


cat > public/js/modules/jobs.js <<'JS'
async function createNewJob(){

const customer = prompt("Customer name?");
if(!customer) return;

const address = prompt("Property address?") || "";

let job = await API.createJob({
customer,
address
});

alert("Created "+job.number);

loadDashboard();

}

window.createNewJob=createNewJob;
JS


cat > public/js/modules/ui.js <<'JS'
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
JS


cat > public/js/dashboard.js <<'JS'
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
JS


echo "✅ Upgrade complete"
