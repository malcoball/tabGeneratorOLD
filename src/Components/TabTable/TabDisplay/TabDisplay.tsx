import { useEffect, useState } from "react"
import './TabDisplay.css';
import instruments from "../../../Data/Music/Instruments";
import { tabTable, lineToMulti } from "../../../Data/Music/TabGeneration/tabTable";

const TabDisplay = (props:any)=>{
    let data = props.tabIn;
    const [instrument,setInstrument] = useState(instruments(props.instrument));
    const [row,setRow] = useState(tabTable(lineToMulti(data,instrument.breakPoints),instrument.stringNames,props.tabCont,props.tabFunc,props.int));
    console.log("int : ",props.int)
    return(
        <div onClick={()=>{console.log("yee")}} className={`TabDisplay TabDisplay${props.size}`}>
            {row}
        </div>
    )
}
export default TabDisplay;