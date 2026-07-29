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
