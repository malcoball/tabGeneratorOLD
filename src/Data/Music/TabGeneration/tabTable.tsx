const noteClick = (input:any)=>{
    console.log("Note clicked ye");
}

const tabItem = (int:any,noteNumber:number)=>{
    const noteName = "note";
    // // Turns a single number into an li, anything below 0 becomes "-"
    // let data = int < 0 ? "-" : int
    // Turns a single number into an li, below 0 are special markers
    let data;
    let clas = noteName+" "+noteName+noteNumber
    if (int == -1) {
        // Marker 1
        data = "-"; clas = "marker1";
    } else 
    if (int < -1){
        // Marker 2
        data = int.slice(2); clas = "marker2";
    } else 
    data = int;

    // let clas = noteName+" "+noteName+noteNumber; if (data == "-") clas = "marker1";
    return <li onClick={(e)=>{noteClick(e)}} className={`${clas} tabItem`}>{data}</li>
}
const tabRow = (row :number[],counter:number) =>{
    // Turns a single array into an array of li
    let out = row.map((row)=>{
        return tabItem(row,counter);
    });
    return <ul className="tabRow">{out}</ul>;
}
const tabRowStart = (breakPoints:string[])=>{
    // Turns the breakpoints into a ul
    let out = breakPoints.map((point)=>{return <li className="start">{point + " ["}</li>})
    return <ul className="tabRow">{out}</ul>
}
const tabTable = (dataIn:number [][],breakPoints:string[])=>{
    // Turns a 2d array into uls
    let out:any = [];
    // Start of tab/root notes
    out.push(tabRowStart(breakPoints));
    // Tab info => the actual frets to play
    let counter = 0;
    dataIn.forEach(element => {
        counter++;
        out.push(tabRow(element,counter))
    });
    return out;
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