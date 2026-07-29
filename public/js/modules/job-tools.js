
async function addLabor(id){

let item=prompt("Labor description");

if(!item)return;

await fetch(`/api/job-tools/${id}/labor`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
labor:[
{
description:item,
hours:1
}
]
})

});

alert("Labor added");

}


async function addNote(id){

let note=prompt("Job note");

await fetch(`/api/job-tools/${id}/notes`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
notes:note
})

});

}


window.addLabor=addLabor;
window.addNote=addNote;

