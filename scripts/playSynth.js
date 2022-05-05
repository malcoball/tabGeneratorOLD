//create a synth and connect it to the main output (your speakers)
volume = 0;
let volSlider = document.querySelector("#volumeSlider");
volSlider.addEventListener("mousemove",()=>{
    volume = volSlider.value;
})
// function playNote(note){
//     synth.triggerAttackRelease(note,"8n");
// }




let play;
let counter = 0;
function playNotes(start,tab,id,synth){
    // Setup the correct instrument
    synth = instruments[sInstrument];

    // Attatch effects
    synth.connect(dist);
    synth.volume.value = volume;

    // playing the tab
    if (start == true){
        let tempo = tabBpmIn.value;
        let tabType = tabTypeIn.value;
        // console.log(tabType);
        let instPush = instrums[0].bString; // Instrument push
        let synthPush = synth.bString;      // Synth/sample push

        play = setInterval(()=>{
            synth.volume.value = volume;
            // console.log(synth.bString);


            if (counter < tab.length){
                // Highlight played note
                highlightNote(counter,id);

                

                // Play the note
                let note = tab[counter].note+instPush+synthPush;
                let length = tab[counter].length;
                setTimeout(()=>{
                    if (typeof(note) == "number"){
                        synth.triggerAttackRelease(note,length);
                        // console.log(note);

                    }
                    counter ++;
                },600/tempo);

            } else {
                highlightNote(counter-1,id,true); // Removes the highlight of the last note
                stopSynth()
            }
        },60000/(tempo*2));
    } else {
        stopSynth()
    }
}
function stopSynth(){
    clearInterval(play);
    play = null;
    counter = 0;
}

