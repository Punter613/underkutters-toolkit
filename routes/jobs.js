const express = require("express");
const router = express.Router();
const fs = require("fs");

const JOB_FILE="./turnover_data.json";


function readJobs(){

    if(!fs.existsSync(JOB_FILE)){
        return [];
    }

    let data=fs.readFileSync(JOB_FILE,"utf8");

    if(!data.trim()){
        return [];
    }

    try{
        return JSON.parse(data);
    }
    catch(e){
        return [];
    }

}


function saveJobs(jobs){

    fs.writeFileSync(
        JOB_FILE,
        JSON.stringify(jobs,null,2)
    );

}


router.get("/",(req,res)=>{

    res.json(readJobs());

});


router.post("/",(req,res)=>{

    let jobs=readJobs();

    let job={

        id:Date.now().toString(),

        number:
        "UK-"+new Date()
        .toISOString()
        .slice(0,10)
        .replace(/-/g,"")+"-"+Math.floor(Math.random()*999),

        created:new Date().toISOString(),

        status:"New",

        customer:req.body.customer || "",

        address:req.body.address || "",

        phone:"",

        scope:[],

        materials:[],

        labor:[],

        photos:[],

        notes:""

    };


    jobs.push(job);

    saveJobs(jobs);

    res.json(job);

});


module.exports=router;
