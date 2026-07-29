function createInvoice(job,estimate){

return {

invoiceNumber:
"INV-"+Date.now(),

customer:
job.customer,

job:
job.number,

subtotal:
estimate.subtotal,

tax:
estimate.tax,

total:
estimate.total,

paid:false,

balanceDue:
estimate.total

};

}


module.exports={createInvoice};
