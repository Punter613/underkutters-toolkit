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
