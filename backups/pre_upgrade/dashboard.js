let jobs = [];

async function loadDashboard(){

    try {

        const res = await fetch('/api/jobs');
        jobs = await res.json();

        updateStats();
        renderJobs();

    } catch(err){

        console.error(err);

        document.getElementById("job-list").innerHTML =
        "⚠️ Unable to load jobs";

    }

}


function updateStats(){

    let revenue = 0;
    let materials = 0;

    jobs.forEach(job=>{

        if(job.scope){

            job.scope.forEach(item=>{
                revenue += Number(item.price || 0);
            });

        }

        if(job.materials){

            job.materials.forEach(item=>{
                materials += Number(item.cost || 0);
            });

        }

    });


    document.getElementById("active-jobs").innerText =
    jobs.length;


    document.getElementById("revenue").innerText =
    "$" + revenue.toFixed(2);


    document.getElementById("materials").innerText =
    "$" + materials.toFixed(2);

let complete = 0;

jobs.forEach(job=>{
    if(job.status === "Complete"){
        complete++;
    }
});

let percent = jobs.length 
? Math.round((complete/jobs.length)*100)
:0;


document.getElementById("completion").innerText =
percent+"%";
}


function renderJobs(){

    let box=document.getElementById("job-list");

    if(!jobs.length){

        box.innerHTML="No jobs yet";
        return;

    }


    box.innerHTML="";


    jobs.slice().reverse().forEach(job=>{


        box.innerHTML += `

        <div class="job-card">

        <h3>${job.number}</h3>

        <p>
        👤 ${job.customer}
        </p>

        <p>
        📍 ${job.address}
        </p>

        <span>
        ${job.status}
        </span>

        </div>

        `;


    });


}


window.onload=loadDashboard;
