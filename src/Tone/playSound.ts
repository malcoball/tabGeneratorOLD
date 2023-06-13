import * as Tone from 'tone';
import { tabNumberToNote, lengthToNoteLength, LengthToInput} from './noteConversion';
import { noteHighlights } from '../functions';
import {getInstrument} from './instrumentContainer';
import { noteLengthSec,bpmToSec } from './noteConversion';
import { tabType } from '../@types/tabTypes';

//create a synth and connect it to the main output (your speakers)
let pause = true; // Stops the synth from playing
let synth = getInstrument("bass1");


const playSound = (noteIn:{note:number,length:number},octave:number,rootNote:string)=>{

    let note = tabNumberToNote(noteIn.note,octave,rootNote);
    let length = lengthToNoteLength(noteIn.length)+"n";
    synth.synth.triggerAttackRelease(note,length);
}
const playTab = (tabIn:tabType,currentNote:number,octave:number,synth:string,rootNote:string):Promise<{finished:boolean,currentNote:number}>=>{
    // Work out any info here,
    synth = getInstrument(synth);
    // Play the sound
    return new Promise (res =>{
        const note = tabIn.tab[currentNote];
        playSound(note,octave,rootNote);
        window.setTimeout(()=>{
            if (currentNote === tabIn.tab.length-1){
                // Finished
                console.log("donezo");
                return res({currentNote:currentNote,finished:true})
            } else {
                // Recurse, if that's a word
                playTab(tabIn,currentNote + 1,octave,synth,rootNote);
            }
        },1000)
    })
}
// const playTabSingle = (tabIn:tabType,currentNote:number,octave:number,rootNote:string,synth:string):Promise<boolean>=>{
//     // Probably doesn't need to be 
//     synth = getInstrument(synth); // Overrides a global var
//     const note = tabIn.tab[currentNote];
//     const noteInNew = {note : note.note,length: note.length};
//     playSound(noteInNew,octave,rootNote);
// }
// const playTab = async(tabIn:{note:number, length:number}[],bpm:number,octave:number,rootNote:string,synthInp:string,tableName:string,tableInt:number,currentNote:number = 0) =>  {

//     synth = getInstrument(synthInp); // Overrides a global var
//     const length = tabIn.length;
//     const note = tabIn[currentNote];
//     const HighlightTarget = `.marker2_${currentNote}`;
//     let intervalTime : number | undefined;
//     note !== undefined ? intervalTime = noteLengthSec(bpmToSec(bpm),note.length) : pause = true;
//     // Playing
//     playSound(tabIn[currentNote],octave,rootNote);
//     // Highlight the main note
//     noteHighlights.single(tableName,'.clickable',tableInt,currentNote,'playing',false);
//     // Highlight the note lengths
//     noteHighlights.allInterval(tableName,HighlightTarget,tableInt,'playing',150);
//     // Remove the highlights before
//     noteHighlights.upto(tableName,'.clickable',tableInt,'played',currentNote);
//     if (currentNote == 0){ // Init part pretty much
//         pause = false; // Actually lets it play, this logic might cause an issue though
//     }
//     currentNote++;
//         return new Promise(res =>{
//         setTimeout(()=>{
//             if (currentNote < length){
//                 // Recursion
//                 playTab(tabIn,bpm,octave,rootNote,synthInp,tableName,tableInt,currentNote);
//                 return res("go again");
//             } else {
//                 // Finished
//                 noteHighlights.all(tableName,'.clickable',tableInt,'playing',true)
//                 for (let i = 0 ; i < tabIn.length; i++){
//                     const highlight = `.marker2_${i}`;
//                     noteHighlights.all(tableName,highlight,tableInt,'playing',true)
//                 }
//                 noteHighlights.all(tableName,'.clickable',tableInt,'played',true)
//                 // noteHighlights.all(tableName,HighlightTarget,tableInt,'played',true)
//                 return res("done!");

//             }
//         },intervalTime);
//     })
// }
const pauseTab = ()=>{
    pause = true;
}



export {playSound, playTab, pauseTab};