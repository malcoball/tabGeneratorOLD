import * as Tone from 'tone';
import { tabNumberToNote } from './noteConversion';
import { getSynth } from './synths';

//create a synth and connect it to the main output (your speakers)
let pause = true; // Stops the synth from playing
let synth = getSynth("synth1");


const playSound = (noteIn:number,octave:number,rootNote:string)=>{
    let note = tabNumberToNote(noteIn,octave,rootNote);
    synth.synth.triggerAttackRelease(note, "8n");
}

const highlightNote = (domTarget:any,int:number)=>{
    // console.log(domTarget);
    // console.log("current : ",int);
    console.log(domTarget[int]);
    domTarget[int].classList.add("active");
}

const playTab = (tabIn:number[],bpm:number,octave:number,rootNote:string,synthInp:string,currentNote:number = 0)=>{
    console.log("synth : ",synthInp);
    synth = getSynth(synthInp);
    const length = tabIn.length;
    const intervalTime = bpmToSec(bpm);
    const duration = intervalTime * (length+1); //How long the entire thing takes, pretty much
    if (currentNote == 0){ // Init part pretty much
        pause = false; // Actually lets it play, this logic might cause an issue though
    }
    setTimeout(()=>{
        if ((currentNote < length) && (pause == false)){
            // Playing
            playSound(tabIn[currentNote],octave,rootNote);
            // highlightNote(noteTarget,currentNote);
            currentNote++;
            playTab(tabIn,bpm,octave,rootNote,synthInp,currentNote);
        } else {
            // Finished
            pause = true;
        }
    },intervalTime);
    return duration; // How long it's going to take
}
const pauseTab = ()=>{
    pause = true;
}
const bpmToSec = (bpm:number)=>{
    // 60 => 1000, 120 => 500
    // 60 => 120 * 2, 1000 => 500 /2 
    let diff = bpm / 60; // 120 => 2
    return 1000 / diff;
}

export {playSound, playTab, pauseTab};