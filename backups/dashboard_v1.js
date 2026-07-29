async function loadDashboard(){

    try {

        const res = await fetch('/api/jobs');
        const jobs = await res.json();


        let active = jobs.filter(j =>
            j.status !== "Completed"
        );


        let revenue = jobs.reduce((sum,j)=>{

            return sum + 
            Number(j.total || 0);

        },0);


        let materials = jobs.reduce((sum,j)=>{

            return sum +
            Number(j.materialCost || 0);

        },0);



        document.getElementById(
            "activeJobs"
        ).innerText = active.length;


        document.getElementById(
            "revenue"
        ).innerText =
        "$" + revenue.toFixed(2);


        document.getElementById(
            "materials"
        ).innerText =
        "$" + materials.toFixed(2);



        renderJobs(jobs);


    }catch(err){

        console.log(
        "Dashboard error",
        err);

    }

}



function renderJobs(jobs){

const box =
document.getElementById(
"recentJobs"
);


box.innerHTML="";


jobs.slice(0,5)
.forEach(job=>{


box.innerHTML += `

<div class="job-card">

<h3>${job.number}</h3>

<p>
👤 ${job.customer}
</p>


<p>
📍 ${job.address}
</p>


<div class="status">
${job.status}
</div>


<button onclick="
openJob('${job.id}')
">
OPEN JOB
</button>


</div>

`;

});


}



function openJob(id){

alert(
"Opening job: "+id
);

}



window.onload =
loadDashboard;
