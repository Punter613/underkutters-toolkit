const express=require("express");
const router=express.Router();

const invoice=require("../services/invoice");


router.post("/:id",async(req,res)=>{

res.json({
success:true,
message:"Invoice engine online"
});

});


module.exports=router;
