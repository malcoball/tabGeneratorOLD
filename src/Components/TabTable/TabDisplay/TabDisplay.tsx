import './TabDisplay.css';
import instruments from "../../../Data/Music/Instruments";
import { tabTable, lineToMulti } from "../../../Data/Music/TabGeneration/tabTable";

const TabDisplay = (props:any)=>{
    let data = props.tabIn.tab;
    const instrument = instruments(props.instrument);
    const line = lineToMulti(data,instrument.breakPoints);
    const row = tabTable(line,instrument.stringNames,props.tabCont,props.tabFunc,props.int);
    return(
        <div onClick={()=>{console.log("yee")}} className={`TabDisplay TabDisplay${props.size}`}>
            {row}
        </div>
    )
}
export default TabDisplay;