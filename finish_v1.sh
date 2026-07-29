#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PRO V1 FINAL BUILD"

mkdir -p services routes public/uploads public/icons backups


############################
# INVOICE ENGINE
############################

cat > services/invoiceEngine.js <<'JS'
const fs=require("fs");

const FILE="./turnover_data.json";

function load(){
 return JSON.parse(fs.readFileSync(FILE,"utf8"));
}

function save(x){
 fs.writeFileSync(FILE,JSON.stringify(x,null,2));
}


function createInvoice(id){

let jobs=load();

let job=jobs.find(j=>j.id===id);

if(!job) throw Error("Job not found");


let labor=0;
let materials=0;


(job.labor||[]).forEach(x=>{
 labor+=Number(x.hours||0)*Number(x.rate||0);
});


(job.materials||[]).forEach(x=>{
 materials+=Number(x.cost||0);
});


let subtotal=labor+materials;

let tax=subtotal*.075;

let invoice={

number:"INV-"+Date.now(),

job:id,

customer:job.customer,

subtotal,

tax,

total:subtotal+tax,

paid:false,

balance:subtotal+tax

};


job.invoice=invoice;

save(jobs);

return invoice;

}


module.exports={createInvoice};
JS


cat > routes/invoice-final.js <<'JS'
const express=require("express");
const router=express.Router();

const engine=require("../services/invoiceEngine");


router.post("/:id",(req,res)=>{

try{

res.json({
success:true,
invoice:engine.createInvoice(req.params.id)
});

}catch(e){

res.status(400).json({
error:e.message
});

}

});


module.exports=router;
JS



############################
# SIGNATURE ENGINE
############################

cat > routes/signature.js <<'JS'
const express=require("express");
const router=express.Router();
const fs=require("fs");

router.post("/:id",(req,res)=>{

let jobs=JSON.parse(
fs.readFileSync("./turnover_data.json")
);

let job=jobs.find(
j=>j.id===req.params.id
);

if(!job)
return res.status(404).json({
error:"Job not found"
});


job.signature=req.body.signature || "";

fs.writeFileSync(
"./turnover_data.json",
JSON.stringify(jobs,null,2)
);


res.json({
success:true,
message:"Signature saved"
});


});


module.exports=router;
JS



############################
# PHOTO ENGINE
############################

cat > routes/photos-final.js <<'JS'
const express=require("express");
const router=express.Router();
const fs=require("fs");


router.post("/:id",(req,res)=>{

let jobs=JSON.parse(
fs.readFileSync("./turnover_data.json")
);

let job=jobs.find(
j=>j.id===req.params.id
);


if(!job)
return res.status(404).json({
error:"Job not found"
});


if(!job.photos)
job.photos=[];


job.photos.push(req.body);


fs.writeFileSync(
"./turnover_data.json",
JSON.stringify(jobs,null,2)
);


res.json({
success:true,
photos:job.photos
});


});


module.exports=router;
JS



############################
# PROFIT DASHBOARD
############################

cat > routes/dashboard-final.js <<'JS'
const express=require("express");
const router=express.Router();
const fs=require("fs");


router.get("/",(req,res)=>{


let jobs=JSON.parse(
fs.readFileSync("./turnover_data.json")
);


let sales=0;
let costs=0;


jobs.forEach(j=>{

if(j.invoice){

sales+=j.invoice.total;
}

(j.materials||[])
.forEach(m=>{
costs+=Number(m.cost||0);
});

});


res.json({

jobs:jobs.length,

sales,

costs,

profit:sales-costs

});


});


module.exports=router;
JS



############################
# BACKUP
############################

cat > routes/backup.js <<'JS'
const express=require("express");
const router=express.Router();
const fs=require("fs");


router.get("/",(req,res)=>{

let name="backups/backup_"+Date.now()+".json";

fs.copyFileSync(
"turnover_data.json",
name
);


res.json({
success:true,
backup:name
});


});


module.exports=router;
JS



############################
# PWA
############################

cat > public/manifest.json <<'JSON'
{
"name":"Underkutters Pro",
"short_name":"Underkutters",
"display":"standalone",
"start_url":"/",
"background_color":"#000000",
"theme_color":"#b91c1c"
}
JSON


echo "🔥 V1 FILES COMPLETE"

