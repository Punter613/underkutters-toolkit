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
