import { useState } from "react"
import './TabDisplaySml.css';
import instruments from "../../../Data/Music/Instruments";
const tabItem = (int:number)=>{
    // Turns a single number into an li, anything below 0 becomes "-"
    let data = int < 0 ? "-" : int
    let clas = ""; if (data == "-") clas = "marker1";
    return <li className={`${clas} tabItem`}>{data}</li>
}
const tabRow = (row :number[]) =>{
    // Turns a single array into an array of li
    let out = row.map((row)=>{return tabItem(row)});
    return <ul className="tabRow">{out}</ul>;
}
const tabRowStart = (breakPoints:string[])=>{
    // Turns the breakpoints into a ul
    let out = breakPoints.map((point)=>{return <li>{point}</li>})
    return <ul className="tabRow">{out}</ul>
}
const tabTable = (dataIn:number [][],breakPoints:string[])=>{
    // Turns a 2d array into uls
    let out:any = [];
    // Start of tab/root notes
    out.push(tabRowStart(breakPoints));
    // Tab info => the actual frets to play
    dataIn.forEach(element => {
        // console.log("element : ",element);
        out.push(tabRow(element))
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
    const len = breakPoints.length;
    const temp = fillBlank(len);
    dataIn.forEach(elm => {
        let line = [...temp];
        for (let i = len; i > -1; i--){
            if (elm >= breakPoints[i]){ 
                line[i]= elm - breakPoints[i];
                i = -1;
            }
        }
        out.push(line);
    });
    return out;
}
const TabDisplaySml = (props:any)=>{
    const [data,setData] = useState(props.tabIn)
    const [instrument,setInstrument] = useState(instruments(props.instrument));
    const row = tabTable(lineToMulti(data,instrument.breakPoints),instrument.stringNames);
    return(
        <div className="TabDisplaySml">
            {row}
        </div>
    )
}
export default TabDisplaySml;