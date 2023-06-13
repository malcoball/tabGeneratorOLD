import './TabDisplay.css';
import{useState} from 'react';
import instruments from "../../../Data/Music/Instruments";
import { tabTable, lineToMulti } from "../../../Data/Music/TabGeneration/tabTable";
import { useContext } from 'react';
import { SmallTabContext } from '../../../Data/Context/SmallTabContext';
import { tabType } from '../../../@types/tabTypes';

const TabDisplay = (props:{size:string,tabInfo:tabType})=>{
    // let data = props.tabIn.tab;
    const [tabInfo] = useState(props.tabInfo);
    const instrument = instruments(tabInfo.settings.tabType);
    const line = lineToMulti(tabInfo.tab,instrument.breakPoints);
    const row = tabTable(line,instrument.stringNames,tabInfo.id,props.size);
    return(
        <div className={`TabDisplay TabDisplay${props.size}`}>
            {row}
        </div>
    )
}
export default TabDisplay;