function invoice(job){

let labor=(job.labor||[])
.reduce((a,b)=>a+(b.hours*b.rate),0);

let materials=(job.materials||[])
.reduce((a,b)=>a+(b.qty*b.cost),0);

let subtotal=labor+materials;

return {
labor,
materials,
subtotal,
tax:subtotal*.075,
total:subtotal*1.075
};

}

module.exports=invoice;
