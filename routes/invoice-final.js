const express=require("express");
const router=express.Router();

router.post("/:id",(req,res)=>{

res.json({
success:true,
invoice:{
jobId:req.params.id,
status:"Created",
paid:false,
balanceDue:0
}
});

});

module.exports=router;
