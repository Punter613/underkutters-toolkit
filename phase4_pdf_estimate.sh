#!/data/data/com.termux/files/usr/bin/bash

echo "🔥 UNDERKUTTERS PDF ESTIMATE ENGINE"

mkdir -p services
mkdir -p routes
mkdir -p reports/pdf


cat > services/pdfEstimate.js <<'JS'
const PDFDocument=require("pdfkit");
const fs=require("fs");


function createEstimatePDF(job,estimate){

const file=
`reports/pdf/estimate_${job.number}.pdf`;


const doc=new PDFDocument();

doc.pipe(
fs.createWriteStream(file)
);


doc.fontSize(20)
.text("UNDERKUTTERS PRO",{
align:"center"
});


doc.moveDown();

doc.fontSize(14)
.text("ESTIMATE");


doc.moveDown();


doc.fontSize(12)
.text(`Job: ${job.number}`)
.text(`Customer: ${job.customer}`)
.text(`Address: ${job.address}`);


doc.moveDown();


doc.text("LABOR");

(job.labor||[]).forEach(item=>{

doc.text(
`${item.description} - ${item.hours} hrs @ $${item.rate}/hr`
);

});


doc.moveDown();

doc.text("MATERIALS");


(job.materials||[]).forEach(item=>{

doc.text(
`${item.name} - $${item.cost}`
);

});


doc.moveDown();


doc.text(
`Subtotal: $${estimate.subtotal.toFixed(2)}`
);

doc.text(
`Tax: $${estimate.tax.toFixed(2)}`
);

doc.text(
`TOTAL: $${estimate.total.toFixed(2)}`
);


doc.moveDown();

doc.text(
"Customer Approval Signature:"
);


doc.text(
"____________________________"
);


doc.end();


return file;

}


module.exports={
createEstimatePDF
};
JS



cat > routes/pdf-estimate.js <<'JS'
const express=require("express");
const router=express.Router();

const fs=require("fs");

const pdf=require("../services/pdfEstimate");


router.post("/:id", (req,res)=>{


let jobs=
JSON.parse(
fs.readFileSync("./turnover_data.json")
);


let job=
jobs.find(
j=>j.id===req.params.id
);


if(!job)
return res.status(404).json({
error:"Job not found"
});


let laborTotal=0;
let materialTotal=0;


(job.labor||[])
.forEach(x=>{
laborTotal+=x.hours*x.rate;
});


(job.materials||[])
.forEach(x=>{
materialTotal+=x.cost;
});


let subtotal=laborTotal+materialTotal;


let estimate={
subtotal,
tax:subtotal*.075,
total:subtotal*1.075
};


let file=
pdf.createEstimatePDF(job,estimate);


res.json({

success:true,

file

});


});


module.exports=router;
JS



echo "🔥 PDF ENGINE CREATED"

