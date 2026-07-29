#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PRO PHASE 3 MONEY ENGINE"

mkdir -p routes services

cat > services/materials.js <<'JS'
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
JS


cat > routes/materials.js <<'JS'
const express=require("express");
const router=express.Router();

const materials=require("../services/materials");


router.post("/:id/material", (req,res)=>{

try{

let job=materials.addMaterial(
req.params.id,
req.body
);

res.json({
success:true,
job
});

}catch(e){

res.status(400).json({
error:e.message
});

}

});


module.exports=router;
JS


cat > services/invoice.js <<'JS'
function createInvoice(job,estimate){

return {

invoiceNumber:
"INV-"+Date.now(),

customer:
job.customer,

job:
job.number,

subtotal:
estimate.subtotal,

tax:
estimate.tax,

total:
estimate.total,

paid:false,

balanceDue:
estimate.total

};

}


module.exports={createInvoice};
JS


cat > routes/invoice.js <<'JS'
const express=require("express");
const router=express.Router();

const invoice=require("../services/invoice");


router.post("/:id",async(req,res)=>{

res.json({
success:true,
message:"Invoice engine online"
});

});


module.exports=router;
JS


echo "🔥 PHASE 3 FILES CREATED"

