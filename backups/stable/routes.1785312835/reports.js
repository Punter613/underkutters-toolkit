const express=require("express");

const router=express.Router();

const createReport=require("../services/report");


router.post("/:id",(req,res)=>{


let job=req.body;


let file=createReport(job);


res.json({

success:true,

file

});


});


module.exports=router;
