#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PRO PHASE 2 ENGINE"

mkdir -p routes
mkdir -p services
mkdir -p public/js/modules

cat > services/job-update.js <<'JS'
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
JS


cat > routes/job-tools.js <<'JS'
const express=require("express");
const router=express.Router();

const updater=require("../services/job-update");


router.post("/:id/labor",(req,res)=>{

let job=updater.update(
req.params.id,
{
labor:req.body.labor || []
});

res.json(job);

});


router.post("/:id/materials",(req,res)=>{

let job=updater.update(
req.params.id,
{
materials:req.body.materials || []
});

res.json(job);

});


router.post("/:id/notes",(req,res)=>{

let job=updater.update(
req.params.id,
{
notes:req.body.notes || ""
});

res.json(job);

});


module.exports=router;
JS


cat > public/js/modules/job-tools.js <<'JS'

async function addLabor(id){

let item=prompt("Labor description");

if(!item)return;

await fetch(`/api/job-tools/${id}/labor`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
labor:[
{
description:item,
hours:1
}
]
})

});

alert("Labor added");

}


async function addNote(id){

let note=prompt("Job note");

await fetch(`/api/job-tools/${id}/notes`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
notes:note
})

});

}


window.addLabor=addLabor;
window.addNote=addNote;

JS


echo "✅ Phase 2 files created"

