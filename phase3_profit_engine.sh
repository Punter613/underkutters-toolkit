#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PROFIT ENGINE"

cat > routes/estimate.js <<'JS'
const express=require("express");
const router=express.Router();
const fs=require("fs");

const FILE="./turnover_data.json";


router.get("/:id",(req,res)=>{

let jobs=JSON.parse(fs.readFileSync(FILE,"utf8"));

let job=jobs.find(
j=>j.id===req.params.id
);


if(!job)
return res.status(404).json({
error:"Job not found"
});


let laborTotal=0;
let materialTotal=0;


(job.labor||[]).forEach(x=>{
laborTotal += Number(x.hours||0) *
Number(x.rate||0);
});


(job.materials||[]).forEach(x=>{
materialTotal += Number(x.cost||0);
});


let subtotal=
laborTotal+materialTotal;


let tax=
subtotal*0.075;


let total=
subtotal+tax;


let profit =
subtotal-materialTotal;


res.json({

job,

estimate:{

laborTotal,
materialTotal,
subtotal,
tax,
total,
profit

}

});


});


module.exports=router;
JS


echo "🔥 PROFIT ENGINE INSTALLED"

