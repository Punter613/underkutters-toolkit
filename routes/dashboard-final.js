const express=require("express");
const router=express.Router();

const fs=require("fs");

router.get("/",(req,res)=>{

let jobs=[];

try{
jobs=JSON.parse(fs.readFileSync("turnover_data.json"));
}catch(e){}

let revenue=0;
let materials=0;

jobs.forEach(j=>{
if(j.estimate && j.estimate.total)
revenue+=j.estimate.total;

if(j.materials)
j.materials.forEach(m=>{
materials+=Number(m.cost||0);
});

});

res.json({
success:true,
dashboard:{
activeJobs:jobs.length,
revenue,
materials,
profit:revenue-materials,
completion:0
}
});

});


module.exports=router;
