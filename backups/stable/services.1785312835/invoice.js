function calculateInvoice(job){


let labor=0;
let materials=0;


(job.labor||[]).forEach(x=>{

labor+=Number(x.cost||0);

});


(job.materials||[]).forEach(x=>{

materials+=Number(x.cost||0);

});


let subtotal=labor+materials;


return {

labor,

materials,

subtotal,

tax:
subtotal*.075,

total:
subtotal*1.075

};


}


module.exports=calculateInvoice;
