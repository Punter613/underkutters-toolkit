const fs=require("fs");

const FILE="./turnover_data.json";

function load(){
 return JSON.parse(fs.readFileSync(FILE,"utf8"));
}

function save(x){
 fs.writeFileSync(FILE,JSON.stringify(x,null,2));
}


function createInvoice(id){

let jobs=load();

let job=jobs.find(j=>j.id===id);

if(!job) throw Error("Job not found");


let labor=0;
let materials=0;


(job.labor||[]).forEach(x=>{
 labor+=Number(x.hours||0)*Number(x.rate||0);
});


(job.materials||[]).forEach(x=>{
 materials+=Number(x.cost||0);
});


let subtotal=labor+materials;

let tax=subtotal*.075;

let invoice={

number:"INV-"+Date.now(),

job:id,

customer:job.customer,

subtotal,

tax,

total:subtotal+tax,

paid:false,

balance:subtotal+tax

};


job.invoice=invoice;

save(jobs);

return invoice;

}


module.exports={createInvoice};
