#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PRO V1 FINAL UPGRADE"

mkdir -p routes services public/uploads reports/pdf reports/csv backups/daily

#################################
# JOB TOOLS
#################################

cat > routes/job-tools.js <<'JS'
const express=require("express");
const fs=require("fs");
const path=require("path");

const router=express.Router();

const FILE=path.join(__dirname,"../turnover_data.json");

function read(){
 try{
  return JSON.parse(fs.readFileSync(FILE,"utf8"));
 }catch{
  return [];
 }
}

function write(data){
 fs.writeFileSync(FILE,JSON.stringify(data,null,2));
}


router.post("/:id/materials",(req,res)=>{

 let jobs=read();
 let job=jobs.find(j=>j.id==req.params.id);

 if(!job)return res.status(404).json({error:"not found"});

 job.materials=req.body.materials||[];

 write(jobs);

 res.json({success:true,job});

});


router.post("/:id/labor",(req,res)=>{

 let jobs=read();
 let job=jobs.find(j=>j.id==req.params.id);

 if(!job)return res.status(404).json({error:"not found"});

 job.labor=req.body.labor||[];

 write(jobs);

 res.json({success:true,job});

});


router.post("/:id/notes",(req,res)=>{

 let jobs=read();
 let job=jobs.find(j=>j.id==req.params.id);

 if(!job)return res.status(404).json({error:"not found"});

 job.notes=req.body.notes||"";

 write(jobs);

 res.json({success:true,job});

});


router.post("/:id/status",(req,res)=>{

 let jobs=read();
 let job=jobs.find(j=>j.id==req.params.id);

 if(!job)return res.status(404).json({error:"not found"});

 job.status=req.body.status||job.status;

 write(jobs);

 res.json({success:true,job});

});


module.exports=router;
JS


#################################
# INVOICE SERVICE
#################################

cat > services/invoice.js <<'JS'
function invoice(job){

let labor=(job.labor||[])
.reduce((a,b)=>a+(b.hours*b.rate),0);

let materials=(job.materials||[])
.reduce((a,b)=>a+(b.qty*b.cost),0);

let subtotal=labor+materials;

return {
labor,
materials,
subtotal,
tax:subtotal*.075,
total:subtotal*1.075
};

}

module.exports=invoice;
JS


#################################
# ESTIMATE ROUTE
#################################

cat > routes/estimate.js <<'JS'
const express=require("express");
const fs=require("fs");

const router=express.Router();

const invoice=require("../services/invoice");


router.get("/:id",(req,res)=>{

let jobs=JSON.parse(
fs.readFileSync("turnover_data.json")
);

let job=jobs.find(
j=>j.id==req.params.id
);

if(!job)
return res.status(404).json({
error:"not found"
});


res.json({
job,
estimate:invoice(job)
});


});


module.exports=router;
JS


#################################
# REPORT ROUTE
#################################

cat > routes/reports.js <<'JS'
const express=require("express");
const router=express.Router();

router.get("/:id",(req,res)=>{

res.json({
success:true,
message:"PDF report engine ready",
job:req.params.id
});

});


module.exports=router;
JS


#################################
# FRONTEND MODULES
#################################

cat > public/js/modules/tools.js <<'JS'

async function addNote(id){

let note=prompt("Job note");

await fetch(
"/api/job-tools/"+id+"/notes",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
notes:note
})
});

alert("Saved");

}


window.addNote=addNote;

JS


#################################
# PATCH SERVER
#################################

python3 <<'PY'

from pathlib import Path

p=Path("server.js")
s=p.read_text()

adds=[
'const jobTools=require("./routes/job-tools");',
'const estimate=require("./routes/estimate");',
'const reports=require("./routes/reports");'
]

for a in adds:
    if a not in s:
        s=s.replace(
            "const express=require",
            a+"\nconst express=require"
        )

mounts=[
'app.use("/api/job-tools",jobTools);',
'app.use("/api/estimate",estimate);',
'app.use("/api/reports",reports);'
]

for m in mounts:
    if m not in s:
        s += "\n"+m+"\n"

p.write_text(s)

PY


echo "🔥 Upgrade files installed"

