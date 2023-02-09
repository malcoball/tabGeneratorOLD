import {getScaleByName} from "./scale";

const randomNote = (scale:number[],rootNote:number)=>{
    const int = Math.floor(Math.random()*scale.length);
    return scale[int]+rootNote;
}
const tabGenerate = (length:number,rootnote:boolean,scale:string,rootNote:number,longestNote:number)=>{
    // Just generates the array
    const tab:number[] = [];
    const chosenScale = getScaleByName(scale).scale;
    for (let i = 0; i < length; i++){
        if ((i == 0)&& (rootnote == true)){
            tab.push(rootNote);
        } else {
            let longNoteChose = longestNote;
            if (i + 7 > length) longNoteChose --;
            if (i + 3 > length) longNoteChose --;
            if (i + 1 > length) longNoteChose --;
            let roll = Math.round(Math.random()*longNoteChose);
            tab.push(randomNote(chosenScale,rootNote)); 
            switch (roll){
                case 0 :
                    // Single
                    // Keeping this here just so you're not like "where's the 0 ya silly get!?"
                    break;

                case 1 : 
                    // Double
                    tab.push(-2);   i++;
                    break;
                case 2 : 
                    // Quad
                    tab.push(-3);   i+=3;
                    break;
                case 3 : 
                    // Eigth
                    tab.push(-4);   i+=7;
                    break;
            }
            
        }
    }
    return tab;
}
export default tabGenerate;