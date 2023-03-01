import * as Tone from 'tone';
import { tabNumberToNote, lengthToNoteLength} from './noteConversion';
import { noteHighlights } from '../functions';
import {getInstrument} from './instrumentContainer';

//create a synth and connect it to the main output (your speakers)
let pause = true; // Stops the synth from playing
let synth = getInstrument("bass1");


const playSound = (noteIn:{note:number,length:number},octave:number,rootNote:string)=>{

    let note = tabNumberToNote(noteIn.note,octave,rootNote);
    let length = lengthToNoteLength(noteIn.length)+"n";
    console.log("length : ",length);
    synth.synth.triggerAttackRelease(note,length);
}

const playTab = (tabIn:{note:number, length:number}[],bpm:number,octave:number,rootNote:string,synthInp:string,tableName:string,tableInt:number,currentNote:number = 0)=>{
    synth = getInstrument(synthInp); // Overrides a global var
    const length = tabIn.length;
    const note = tabIn[currentNote];
    let intervalTime;
    note !== undefined ? intervalTime = noteLengthSec(bpmToSec(bpm),note.length) : pause = true;
    // console.log("current Note : ",currentNote);
    // console.log("note : ",note);
    console.log("interval : ",intervalTime);
    // Playing
    playSound(tabIn[currentNote],octave,rootNote);
    // Highlight it ye
    noteHighlights.single(tableName,'.clickable',tableInt,currentNote,'playing',false);
    noteHighlights.upto(tableName,'.clickable',tableInt,'played',currentNote)
    if (currentNote == 0){ // Init part pretty much
        pause = false; // Actually lets it play, this logic might cause an issue though
    }
    currentNote++;

    setTimeout(()=>{
        if ((currentNote < length) && (pause == false)){
            // Recursion
            playTab(tabIn,bpm,octave,rootNote,synthInp,tableName,tableInt,currentNote);
        } else {
            // Finished
            noteHighlights.all(tableName,'.clickable',tableInt,'playing',true)
            noteHighlights.all(tableName,'.clickable',tableInt,'played',true)
            pause = true;
        }
    },intervalTime);
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
const noteLengthSec = (sec:number,noteLength:number)=>{
    switch (noteLength){
        case 5 : return sec/2;
        case 4 : return sec;
        case 3 : return sec *2;
        case 2 : return sec *4;
        case 1 : return sec *8;
        default: console.log("note length bruh : ",noteLength)
    }
}

export {playSound, playTab, pauseTab};