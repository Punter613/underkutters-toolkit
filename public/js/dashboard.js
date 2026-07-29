
let jobs=[];


async function loadDashboard(){


try{


let res=await fetch('/api/jobs');


jobs=await res.json();


updateStats();

renderJobs();


}

catch(e){


document.getElementById("status").innerHTML="🔴 Server Error";


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



document.getElementById("active-jobs").innerHTML=jobs.length;


document.getElementById("revenue").innerHTML=
"$"+revenue.toFixed(2);



document.getElementById("materials").innerHTML=
"$"+materials.toFixed(2);



}



function renderJobs(){


let box=document.getElementById("job-list");


box.innerHTML="";


jobs.reverse().forEach(job=>{


box.innerHTML+=`

<div class="job-card">

<h3>🔥 ${job.number}</h3>

<p>👤 ${job.customer}</p>

<p>📍 ${job.address}</p>

<p>
Status:
<b>${job.status}</b>
</p>


</div>


`;


});


}




async function createJob(){


let customer=prompt("Customer name");


if(!customer)return;



await fetch('/api/jobs',{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

customer,

address:"New Job"

})


});


loadDashboard();


}




function generateReport(){

alert("Report engine coming online");

}



window.onload=loadDashboard;


function uploadPhotos(){

alert("📸 Photo uploader ready");

}


function signJob(){

alert("✍️ Signature capture ready");

}

