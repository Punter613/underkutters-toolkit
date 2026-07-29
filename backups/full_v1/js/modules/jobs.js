async function createNewJob(){

const customer = prompt("Customer name?");
if(!customer) return;

const address = prompt("Property address?") || "";

let job = await API.createJob({
customer,
address
});

alert("Created "+job.number);

loadDashboard();

}

window.createNewJob=createNewJob;
