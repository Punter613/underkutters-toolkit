const fs=require("fs");
const FILE="./data/jobs.json";

function read(){
    try{
        return JSON.parse(fs.readFileSync(FILE));
    }catch(e){
        return [];
    }
}

function save(data){
    fs.writeFileSync(FILE,JSON.stringify(data,null,2));
}

function update(id,changes){

    let jobs=read();

    let job=jobs.find(j=>j.id==id);

    if(!job) return null;

    Object.assign(job,changes);

    save(jobs);

    return job;
}

module.exports={update};
