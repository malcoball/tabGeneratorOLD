import * as Tone from 'tone';
import { tabNumberToNote } from './noteConversion';
import { noteHighlights } from '../functions';
import sampler from '././sampler/bassSampler1';
import {getInstrument} from './instrumentContainer';

//create a synth and connect it to the main output (your speakers)
let pause = true; // Stops the synth from playing
let synth = getInstrument("bass1");

const noteLengthValue = (int:number,intPush:number)=>{
    // console.log("intPush : ",intPush);
    let length = int < 0 ? int-intPush : -intPush;

    switch(length){
        case 0 : return '16n'; 
        case -1 : return '8n';  
        case -2 : return '4n';  
        case -3 : return '2n';  
        case -4 : return '1n';  
        default : return '1n'; // Pretty sure this is the longest note possible
    }
}

const tabToTone = (arrIn : number[],longestNote : number)=>{
    // arr [2,-3] => arr [{note: 2, length : 4n}]
    let out = [];
    for (let i = 0; i < arrIn.length; i++){
        // Asseses the value of the next note to get the needed length
        let elm = arrIn[i]; let next = arrIn[i+1];
        out.push({note:elm,length:noteLengthValue(next,longestNote)});
        if (next < 0){  // Skips the next int if it's  note length
            i++
        }
    }
    return out;
}
const getToneLength = (toneArr : {note : number,length:string}[])=>{
    let length = 0;
    toneArr.forEach(elm =>{
        switch(elm.length){
            case "16n" : length ++; break;
            case "8n" : length +=2; break;
            case "4n" : length +=4; break;
            case "2n" : length +=8; break;
            case "1n" : length +=16; break;
        }
    })
    return length;
}

const playSound = (noteIn:{note:number,length:string},octave:number,rootNote:string)=>{
    let note = tabNumberToNote(noteIn.note,octave,rootNote);
    synth.synth.triggerAttackRelease(note, noteIn.length);
    console.log("note : ",noteIn.note," noteLength : ",noteIn.length);
    // sampler.triggerAttackRelease(note, noteIn.length);
}

const playTab = (tabIn:{note:number, length:string}[],bpm:number,octave:number,rootNote:string,synthInp:string,tableName:string,tableInt:number,currentNote:number = 0)=>{
    synth = getInstrument(synthInp); // Overrides a global var
    const length = tabIn.length;
    const note = tabIn[currentNote];
    let intervalTime;
    note !== undefined ? intervalTime = noteLengthSec(bpmToSec(bpm),note.length) : pause = true;
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
const noteLengthSec = (sec:number,noteLength:string)=>{
    switch (noteLength){
        case "16n" : return sec/2;
        case "8n" : return sec;
        case "4n" : return sec *2;
        case "2n" : return sec *4;
        case "1n" : return sec *8;
    }
}

export {playSound, playTab, pauseTab, tabToTone};