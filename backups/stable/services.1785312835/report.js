const PDFDocument=require("pdfkit");
const fs=require("fs");


function createReport(job){


let file=
`reports/pdf/${job.number}.pdf`;


let doc=new PDFDocument();


doc.pipe(fs.createWriteStream(file));


doc.fontSize(20)
.text("UNDERKUTTERS PRO");


doc.moveDown();


doc.fontSize(14)
.text(
`Job: ${job.number}`
);


doc.text(
`Customer: ${job.customer}`
);


doc.text(
`Address: ${job.address}`
);


doc.moveDown();


doc.text("Scope Of Work");


(job.scope||[]).forEach(x=>{

doc.text("- "+x.name);

});


doc.end();


return file;


}


module.exports=createReport;
