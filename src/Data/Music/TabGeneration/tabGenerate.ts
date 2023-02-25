import {getScaleByName} from "./scale";

const randomNote = (scale:number[],rootNote:number)=>{
    const int = Math.floor(Math.random()*scale.length);
    return scale[int]+rootNote;
}
const tabGenerate = (length:number,rootnote:boolean,scale:string,rootNote:number,longestNote:number[])=>{
    // Just generates the array
    const tab:number[] = [];
    const chosenScale = getScaleByName(scale).scale;
    for (let i = 0; i < length; i++){
        if ((i == 0)&& (rootnote == true)){
            tab.push(rootNote);
        } else {
            let longNoteChose = longestNote[1];
            // Makes sure the note doesn't extend the tab length
            if ((i + 7 > length) && (longNoteChose >    2)) longNoteChose --;
            if ((i + 3 > length) && (longNoteChose >    1)) longNoteChose --;
            if ((i + 1 > length) && (longNoteChose >    0)) longNoteChose --;
            // if (i + 3 > length) longNoteChose --;
            // if (i + 1 > length) longNoteChose --;

            let roll = Math.round(Math.random()*longNoteChose);
            tab.push(randomNote(chosenScale,rootNote)); 
            console.log("roll : ",roll);
            switch (roll){
                case 0 :
                    // Lowest Note
                    // Keeping this here just so you're not like "where's the 0 ya silly get!?"
                    break;

                case 1 : 
                    // 8th
                    tab.push(-roll);   i++;
                    break;
                case 2 : 
                    // 4th
                    tab.push(-roll);   i+=3; 
                    break;
                case 3 : 
                    // 2nd
                    tab.push(-roll);   i+=7;
                    break;
                case 4 : 
                    // Longest note
                    tab.push(-roll);   i+=15;
                    break;
            }
            
        }
    }
    return tab;
}
export default tabGenerate;