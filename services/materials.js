const fs=require("fs");

const FILE="./turnover_data.json";

function load(){
 return JSON.parse(fs.readFileSync(FILE,"utf8"));
}

function save(data){
 fs.writeFileSync(FILE,JSON.stringify(data,null,2));
}

function addMaterial(id,item){

 let jobs=load();

 let job=jobs.find(j=>j.id===id);

 if(!job) throw Error("Job not found");

 if(!job.materials)
 job.materials=[];

 job.materials.push(item);

 save(jobs);

 return job;
}


module.exports={addMaterial};
