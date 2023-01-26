import { useEffect, useState } from "react"
import './TabDisplay.css';
import instruments from "../../../Data/Music/Instruments";
import { tabTable, lineToMulti } from "../../../Data/Music/TabGeneration/tabTable";

const TabDisplay = (props:any)=>{
    const test = props.tabIn.map((elm:any)=>{return<li>{elm}</li>})
    const [data,setData] = useState(props.tabIn)
    const [instrument,setInstrument] = useState(instruments(props.instrument));
    const [row,setRow] = useState(tabTable(lineToMulti(data,instrument.breakPoints),instrument.stringNames));

    return(
        <div className="TabDisplaySml">
            {row}
        </div>
    )
}
export default TabDisplay;