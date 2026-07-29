const express=require("express");
const router=express.Router();

const fs=require("fs");

const pdf=require("../services/pdfEstimate");


router.post("/:id", (req,res)=>{


let jobs=
JSON.parse(
fs.readFileSync("./turnover_data.json")
);


let job=
jobs.find(
j=>j.id===req.params.id
);


if(!job)
return res.status(404).json({
error:"Job not found"
});


let laborTotal=0;
let materialTotal=0;


(job.labor||[])
.forEach(x=>{
laborTotal+=x.hours*x.rate;
});


(job.materials||[])
.forEach(x=>{
materialTotal+=x.cost;
});


let subtotal=laborTotal+materialTotal;


let estimate={
subtotal,
tax:subtotal*.075,
total:subtotal*1.075
};


let file=
pdf.createEstimatePDF(job,estimate);


res.json({

success:true,

file

});


});


module.exports=router;
