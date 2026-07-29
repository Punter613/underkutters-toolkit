const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const JOB_FILE = path.join(__dirname,"../turnover_data.json");

function loadJobs(){
    if(!fs.existsSync(JOB_FILE)) return [];
    return JSON.parse(fs.readFileSync(JOB_FILE,"utf8"));
}

router.get("/:id",(req,res)=>{

    const jobs = loadJobs();

    const job = jobs.find(j=>j.id==req.params.id);

    if(!job){
        return res.status(404).json({
            error:"Job not found"
        });
    }


    let laborTotal = 0;
    let materialTotal = 0;


    (job.labor||[]).forEach(item=>{
        laborTotal += Number(item.hours||0) * Number(item.rate||0);
    });


    (job.materials||[]).forEach(item=>{
        materialTotal += Number(item.cost||0);
    });


    let subtotal = laborTotal + materialTotal;

    let tax = subtotal * 0.075;


    res.json({

        job,

        estimate:{
            laborTotal,
            materialTotal,
            subtotal,
            tax,
            total:subtotal+tax
        }

    });


});


module.exports=router;
