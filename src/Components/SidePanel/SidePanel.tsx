import OptionsBox from "./OptionsBox/OptionsBox";
import {useState} from 'react';
import './SidePanel.css'

const SidePanel = (props:{options:string[],side:string})=>{
    const {side} = props;
    const [options] = useState(props.options);
    let Boxes = options.map((elm:string)=>{return <OptionsBox type = {elm} key = {Math.random()}/>})
    return (
        <aside className={`sidepanel ${side}`}>
            {Boxes}
        </aside>
    )
}
export default SidePanel;