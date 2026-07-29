const express=require("express");
const router=express.Router();
const fs=require("fs");

const FILE="./turnover_data.json";


function jobs(){

    return JSON.parse(
        fs.readFileSync(FILE,"utf8")
    );

}


router.get("/:id",(req,res)=>{

    let list=jobs();

    let job=list.find(
        j=>j.id===req.params.id
    );


    if(!job)
        return res.status(404).json({
            error:"Job not found"
        });


    res.json(job);

});


module.exports=router;
