import { inputToLength } from "../../../Tone/noteConversion";
import {getScaleByName} from "./scale";

const randomNote = (scale:number[],rootNote:number)=>{
    const int = Math.floor(Math.random()*scale.length);
    return scale[int]+rootNote;
}
const tabGenerate = (length:number,rootnote:boolean,scale:string,rootNote:number,noteLengths:number[])=>{
    // Just generates the array
    const tab: {note: number, length: number}[]  = [];
    const lengths = noteLengths.map(elm =>{return inputToLength(elm)});
    console.log("lengths : ",lengths);
    const chosenScale = getScaleByName(scale).scale;
    for (let i = 0; i < length; ){
        let length = 5; // Could be changed longest note
        if ((i == 0)&& (rootnote == true)){
            // Currently only matches the length Range
            // tab.push(rootNote);
            tab.push({note : rootNote,length: length})
            i++;
        } else {
            // Get the note
            let note = randomNote(chosenScale,rootNote);
            // Get the length
            let length = lengths[Math.round(Math.random()*lengths.length-1)];
            console.log("length : ",length);
            switch(length){
                // The numbers are currently random
                case 5: i++; break;
                case 4: i+=2; break;
                case 3: i+=4; break;
                case 2: i+=6; break;
                case 1: i+=8; break;
                case 0: i+=10; break;
                default: i++;
            }
            // i should increase by the length => 16 i++, 8 i+= 3, etc

            tab.push({note : note,length: length});
        }
    }
    return tab;
}
export default tabGenerate;