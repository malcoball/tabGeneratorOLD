import {getScaleByName} from "./scale";

const randomNote = (scale:number[],rootNote:number)=>{
    const int = Math.floor(Math.random()*scale.length);
    return scale[int]+rootNote;
}
const tabGenerate = (length:number,rootnote:boolean,scale:string,rootNote:number,lengthRange:number[])=>{
    // Just generates the array
    const tab: {note: number, length: number}[]  = [];
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
            let longNoteChose = lengthRange[1];
            // Makes sure the note doesn't extend the tab length
            // if ((i + 7 > length) && (longNoteChose >    2)) longNoteChose --;
            // if ((i + 3 > length) && (longNoteChose >    1)) longNoteChose --;
            // if ((i + 1 > length) && (longNoteChose >    0)) longNoteChose --;

            let roll = Math.round(Math.random()*longNoteChose);
            let iPush = 1;
            for (let j = 0; j < roll; j ++){
                length --;
                i *= 2;
            }
            i += iPush;

            tab.push({note : note,length: length});
        }
    }
    return tab;
}
export default tabGenerate;