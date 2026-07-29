
async function addNote(id){

let note=prompt("Job note");

await fetch(
"/api/job-tools/"+id+"/notes",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
notes:note
})
});

alert("Saved");

}


window.addNote=addNote;

