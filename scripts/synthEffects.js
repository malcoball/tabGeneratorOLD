let dist = new Tone.Distortion(0).toDestination();
let distIn = getElmFromTitle("Distortion");
distIn.addEventListener("focusout",()=>{
    let num = distIn.childNodes[1].firstChild.value;
    dist = new Tone.Distortion(num/10).toDestination();
})

// Doesn't seem to work, not too fussed though honestly
// Distortion is enough but maybe add reverb when EVERYTHING else is done.
let chorus = new Tone.Chorus(4,2.5,0.5).toDestination().start();
// let chorusIn = getElmFromTitle("Chorus");s
// chorusIn.addEventListener("focusout",()=>{
//     let num = chorusIn.childNodes[1].firstChild.value;
//     chorus = new Tone.Chorus(num,2.5,0.5).toDestination().start();
// })