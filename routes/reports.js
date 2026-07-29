const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

router.get("/:id",(req,res)=>{

    res.json({
        success:true,
        report:{
            jobId:req.params.id,
            generated:new Date().toISOString(),
            status:"Ready"
        }
    });

});


module.exports=router;
