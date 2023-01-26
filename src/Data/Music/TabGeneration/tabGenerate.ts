import {getScaleByName} from "./scale";


const randomNote = (scale:number[],rootNote:number)=>{
    const int = Math.floor(Math.random()*scale.length);
    return scale[int]+rootNote;
}
const tabGenerate = (length:number,rootnote:boolean,scale:string,rootNote:number)=>{
    const tab:number[] = [];
    const chosenScale = getScaleByName(scale).scale;
    for (let i = 0; i < length; i++){
        if ((i == 0)&& (rootnote == true)){
            tab.push(rootNote);
        } else {
            tab.push(randomNote(chosenScale,rootNote));
        }
    }
    return tab;
}
export default tabGenerate;