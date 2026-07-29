const express=require("express");
const router=express.Router();

const upload=require("../services/photos");


router.post("/:jobId",
upload.array("photos",10),
(req,res)=>{


res.json({

success:true,

files:req.files.map(x=>x.filename)

});


});


module.exports=router;
