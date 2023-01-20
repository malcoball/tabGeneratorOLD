import { useState } from "react"
import './TabDisplaySml.css';
const tabItem = (int:number)=>{
    // Turns a single number into an li, anything below 0 becomes "-"
    let data = int < 0 ? "-" : int
    return <li className="tabItem">{data}</li>
}
const tabRow = (row :number[]) =>{
    // Turns a single array into an array of li
    let out = row.map((row)=>{return tabItem(row)});
    return <ul className="tabRow">{out}</ul>;
}
const tabTable = (dataIn:number [][])=>{
    // Turns a 2d array into uls
    let out:any = [];
    dataIn.forEach(element => {
        out.push(tabRow(element))
    });
    return out;

}
const lineToMulti = (dataIn:number[])=>{
    // [1,2,6,7] => [[1,2,-,-],[-,-,6,7]]
    let out:number[][] = [[],[]];
    const breakPoint = [5];
    const temp:number[] = []; 
    for (let i = 0; i < breakPoint.length+1; i++){
        temp.push(-1);
    }
    let target :number[] = [];
    dataIn.forEach(element => {
        target = temp; // [-1,-1,-1,-1]
        if (element < 5){
            // out[0].push(element);
            target[0] = element;
        } else {
            target[1] = element;
        }
        for (let i = 0; i < target.length; i++){
            out[i].push(target[i]);
        }
        target = temp;
        console.log("temp : ",temp);
    });
    return out;
}
const TabDisplaySml = ()=>{
    const [data,setData] = useState([
        1,2,4,5,7,2,7
    ])
    const row = tabTable(lineToMulti(data));
    console.log(row);
    return(
        <div className="TabDisplaySml">
            {row}
        </div>
    )
}
export default TabDisplaySml;