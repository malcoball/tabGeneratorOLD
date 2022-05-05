// User clicks on note and gets to change what it is.
// Get note when user clicks on it
// Change to set number
let clickTarget = document.querySelector("body");// change this to a more specific target when it all works
clickTarget.addEventListener("click",(e)=>{
    let target = e.target.id.slice(0,4);
    if (target == "note"){ // If user has clicked on a note.
        e.target.innerHTML = 6;
    } 
})