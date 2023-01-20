import OptionsBox from "./OptionsBox/OptionsBox";
import {useState,useEffect} from 'react';
import './SidePanel.css'

const SidePanel = (props:any)=>{
    const {side} = props;
    const [options,setOptions] = useState(props.options);
    let Boxes = options.map((elm:string)=>{return <OptionsBox type = {elm} key = {Math.random()}/>})
    // console.log("Boxes : ",Boxes);
    return (
        <aside className={`sidepanel ${side}`}>
            {Boxes}
        </aside>
    )
}
export default SidePanel;