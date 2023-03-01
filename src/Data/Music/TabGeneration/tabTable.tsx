let noteCount = 0; let currentNotes: any[] = []; let pushCount = true;
const promptMsg = "New note : > -1 for normal note -1,-2,-3,-4 for length timing";
const Marker1 = -1; // What the tab reads to put a -, it's that low to free up room for marker 2, which markers the length of a note.
const Marker2 = -2; // Don't know if this needs to be defined up here but it feels useful currently.

const noteClick = (tabCont:any,tabFunc:any,event:any,tableInt:number,noteValue:string)=>{
    const settingsNew = [...tabCont];
    const oldNote = currentNotes[event.target.value]; // The note that got clicked really
    const behindNote = currentNotes[event.target.value-1]; // The note behind that, used for checking lengths
    console.log(behindNote);
    const inp = prompt(promptMsg,""+oldNote);
    if (inp !== null) {
        
        if (inp === ""){
            console.log("inp : ",inp);
            settingsNew[tableInt].tab[event.target.value] = "";
            let arr = [...settingsNew[tableInt].tab];
            arr = arr.filter((elm:string) =>{return elm !== ""});
            settingsNew[tableInt].tab = arr;
            
            tabFunc(settingsNew);
        } else {
            const newValue = parseInt(inp);
            settingsNew[tableInt].tab[event.target.value] = newValue;
            tabFunc(settingsNew);
        }
    }

}

const tabItem = (int:any,noteNumber:number,tabCont:any,tabFunc:any,tableInt:number)=>{
    const noteName = "note";
    // // Turns a single number into an li, anything below 0 becomes "-"
    // let data = int < 0 ? "-" : int
    // Turns a single number into an li, below 0 are special markers
    let value = -1;
    let data = "";
    let clas = noteName+" "+noteName+noteNumber
    if (int === Marker1) {
        // Marker 1
        data = "-"; clas = "marker1";
    } else 
    if (int < 0){
        // Marker 2
        value = noteCount;
        data = int.slice(2); clas = "marker2";
        if (pushCount === true){
            pushCount = false;
            noteCount++;
        }
    } else {
        pushCount = true;
        data = int;
        clas = "clickable"
        value = noteCount++;
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
    return  <>
                <div>{start}</div>
                <div className="tabMid">{mid}</div>
            </>;
}
const fillBlank = (length:number)=>{
    let out:number[] = [];
    let count = 0;
    while (count < length){
        out.push(Marker1);
        count ++;
    }
    return out;
}
const lineToMulti = (dataIn:{note:number,length:number}[],breakPoints:number[])=>{
    let out:number[][] = [];
    currentNotes = dataIn;
    let counter = 0;
    const len = breakPoints.length;
    const temp = fillBlank(len);
    dataIn.forEach(elm => {
        out.push(intToLine(elm.note,breakPoints,temp));
        counter ++;
        if (elm.length < 5){ // If it's longer than the shortest note
            let loops = 1;
            for (let j = 0; j < 4 - elm.length; j++){
                loops *= 2;
            }
            while (loops > 0){
                out.push(markToLine(out,counter-1))
                loops --;
            }
            counter++;
        }
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
const markToLine = (arrIn:number[][],arrInt:number)=>{
    // Takes a line and copies it, then replaces the value with marker
    let out :any[] = [...arrIn[arrInt]];
    let line = 0;
    let note = 0;
    // Finds where on a collum there's a note, copy the note and row
    for (let i = 0; i < arrIn[0].length; i++){
        if (out[i] >= 0) {
            line = i;
            note = out[i];
        }
    }
    out[line] = Marker2 + "" +note;
    return out;
}
export {tabTable,lineToMulti};