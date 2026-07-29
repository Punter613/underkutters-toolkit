const express=require("express");
const router=express.Router();

const materials=require("../services/materials");


router.post("/:id/material", (req,res)=>{

try{

let job=materials.addMaterial(
req.params.id,
req.body
);

res.json({
success:true,
job
});

}catch(e){

res.status(400).json({
error:e.message
});

}

});


module.exports=router;
