import { Dropdown, SliderCustom, Button } from "../../Inputs";
import {useState} from 'react';

const getComponent = (input:string,update:any,settings:any)=>{
    switch (input){
        // Buttons, can't see there being any others but ahwell
        case "pushBtn" : return <Button type={0} update={update} settings={settings}/>;

        // Sliders
        case "tabLength" : return <SliderCustom     type={0} update={update} settings={settings}/>;
        case "rootNote" : return <SliderCustom      type={1} update={update} settings={settings}/>;
        case "longestNote" : return <SliderCustom   type={2} update={update} settings={settings}/>;
        case "bpm" : return <SliderCustom           type={3} update={update} settings={settings}/>;
        case "distortion" : return <SliderCustom    type={4} update={update} settings={settings}/>;
        
        // Dropdown
        case "tabType" : return <Dropdown type={0} update={update} settings={settings}/>;
        case "scale" : return <Dropdown type={1} update={update} settings={settings}/>;
        case "instrument" : return <Dropdown type={2} update={update} settings={settings}/>

        default : console.log(input," not recognised.");
    }
}
const OptionsBox = (props:any)=>{
    const [component,setType] = useState(getComponent(props.type,props.update,props.settings))
    return (
        <div>
            <div>
                {component}
            </div>
        </div>
    )
}
export default OptionsBox;