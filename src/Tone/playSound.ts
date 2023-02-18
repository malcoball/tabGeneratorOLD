import * as Tone from 'tone';
import { tabNumberToNote } from './noteConversion';
import { getSynth } from './synths';
import { noteHighlights } from '../functions';

//create a synth and connect it to the main output (your speakers)
let pause = true; // Stops the synth from playing
let synth = getSynth("synth1");

const tabToTone = (arrIn : number[])=>{
    // arr [2,-3] => arr [{note: 2, length : 4n}]
    let out = [];
    for (let i = 0; i < arrIn.length; i++){
        let elm = arrIn[i]; let next = arrIn[i+1];
        // Skips the next int if it's  note length
        switch(next){
            default : out.push({note:elm,length: "8n"}); break;
            case -2 : out.push({note:elm,length: "4n"}); i++;break;
            case -3 : out.push({note:elm,length: "2n"}); i++;break;
            case -4 : out.push({note:elm,length: "1n"}); i++;break;
        }
    }
    return out;
}
const getToneLength = (toneArr : {note : number,length:string}[])=>{
    let length = 0;
    toneArr.forEach(elm =>{
        switch(elm.length){
            case "8n" : length ++; break;
            case "4n" : length +=2; break;
            case "2n" : length +=4; break;
            case "1n" : length +=8; break;
        }
    })
    return length;
}

const playSound = (noteIn:{note:number,length:string},octave:number,rootNote:string)=>{
    let note = tabNumberToNote(noteIn.note,octave,rootNote);
    synth.synth.triggerAttackRelease(note, noteIn.length);
}

const playTab = (tabIn:{note:number, length:string}[],bpm:number,octave:number,rootNote:string,synthInp:string,tableName:string,tableInt:number,currentNote:number = 0)=>{
    synth = getSynth(synthInp);
    const length = tabIn.length;
    const note = tabIn[currentNote];
    console.log("current Note : ",note);
    let intervalTime;
    note !== undefined ? intervalTime = noteLengthSec(bpmToSec(bpm),note.length) : pause = true;
    if (currentNote == 0){ // Init part pretty much
        pause = false; // Actually lets it play, this logic might cause an issue though
    }
    setTimeout(()=>{
        if ((currentNote < length) && (pause == false)){
            // Playing
            playSound(tabIn[currentNote],octave,rootNote);
            // Highlight it ye
            noteHighlights.single(tableName,'.clickable',tableInt,currentNote,'playing',false);
            noteHighlights.upto(tableName,'.clickable',tableInt,'played',currentNote)
            currentNote++;
            // intervalTime = noteLengthSec(bpmToSec(bpm),note.length);

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
const noteLengthSec = (sec:number,noteLength:string)=>{
    switch (noteLength){
        case "8n" : return sec;
        case "4n" : return sec *2;
        case "2n" : return sec *4;
        case "1n" : return sec *8;
    }
}

export {playSound, playTab, pauseTab, tabToTone};