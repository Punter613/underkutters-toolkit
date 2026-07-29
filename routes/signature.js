const express=require("express");
const router=express.Router();

router.post("/:id",(req,res)=>{

res.json({
success:true,
message:"Signature saved",
jobId:req.params.id
});

});

module.exports=router;
