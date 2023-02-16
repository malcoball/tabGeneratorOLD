let noteCount = 0; let currentNotes: any[] = [];

const noteClick = (tabCont:any,tabFunc:any,event:any,tableInt:number,noteValue:string)=>{
    const settingsNew = [...tabCont];
    const oldNote = currentNotes[event.target.value];
    settingsNew[tableInt].tab[event.target.value] = prompt("New note",""+oldNote);
    tabFunc(settingsNew);
}

const tabItem = (int:any,noteNumber:number,tabCont:any,tabFunc:any,tableInt:number)=>{
    const noteName = "note";
    // // Turns a single number into an li, anything below 0 becomes "-"
    // let data = int < 0 ? "-" : int
    // Turns a single number into an li, below 0 are special markers
    let value = -1;
    let data = "";
    let clas = noteName+" "+noteName+noteNumber
    if (int == -1) {
        // Marker 1
        data = "-"; clas = "marker1";
    } else 
    if (int < -1){
        // Marker 2
        data = int.slice(2); clas = "marker2";
    } else {
        data = int;
        value = noteCount++;
        clas = "clickable"
    }

    // let clas = noteName+" "+noteName+noteNumber; if (data == "-") clas = "marker1";
    return <li value={value} onClick={(e)=>{noteClick(tabCont,tabFunc,e,tableInt,data)}} className={`${clas} tabItem`}>{data}</li>
}
const tabRow = (row :number[],counter:number,tabCont:any,tabFunc:any,int:number) =>{
    // Turns a single array into an array of li
    let out = row.map((row)=>{
        return tabItem(row,counter,tabCont,tabFunc,int);
    });
    return <ul className="tabRow">{out}</ul>;
}
const tabRowStart = (breakPoints:string[])=>{
    // Turns the breakpoints into a ul
    let out = breakPoints.map((point)=>{return <li className="start">{point + " ["}</li>})
    return <div><ul className="tabRow">{out}</ul></div>
}
const tabTable = (dataIn:number [][],breakPoints:string[],tabCont:any,tabFunc:any,int:number)=>{
    // Reset the counter for the notes
    noteCount = 0; 
    // Turns a 2d array into uls
    let start:any = [];
    let mid:any = [];
    // Start of tab/root notes
    start.push(tabRowStart(breakPoints));
    // Tab info => the actual frets to play
    let counter = 0;
    dataIn.forEach(element => {
        counter++;
        mid.push(tabRow(element,counter,tabCont,tabFunc,int));
    });
    return <><div>{start}</div><div className="tabMid">{mid}</div></>;
}
const fillBlank = (length:number)=>{
    let out:number[] = [];
    let count = 0;
    while (count < length){
        out.push(-1);
        count ++;
    }
    return out;
}
const lineToMulti = (dataIn:number[],breakPoints:number[])=>{
    let out:number[][] = [];
    currentNotes = dataIn;
    let counter = 0;
    const len = breakPoints.length;
    const temp = fillBlank(len);
    dataIn.forEach(elm => {
        let loops = 0; let int = counter -1;
        switch(elm){
            // case -2 : out.push(markToLine(out,counter-1,-2)); break;
            case -2 : loops = 1; break;
            case -3 : loops = 3; break;
            case -4 : loops = 7; break;

            case -2: ; break; 
            default :loops = -1; out.push(intToLine(elm,breakPoints,temp)); break;
        }
        for (let i = 0; i < loops; i++){
            out.push(markToLine(out,int,elm)); 
            if (i != 0) counter ++;
        }
        counter ++;
    });

    return out;
}
const intToLine = (int:number,breakPoints:number[],line:number[])=>{
    let temp = [...line];
    for (let i = breakPoints.length; i > -1; i--){
        if (int >= breakPoints[i]){
            temp[i]= int - breakPoints[i];
            i = -1;
        }
    }
    return temp;
}
const markToLine = (arrIn:number[][],arrInt:number,marker:number)=>{
    // Takes a line and copies it, then replaces the value with marker
    let out :any[] = [...arrIn[arrInt]];
    let line = 0;
    let note = 0;
    for (let i = 0; i < arrIn[0].length; i++){
        if (out[i] >= 0) {
            line = i;
            note = out[i];
        }
    }
    out[line] = marker +""+ note;
    return out;
}
export {tabTable,lineToMulti};