import { Dropdown, SliderCustom, Button } from "../../Inputs";
import {useState} from 'react';

const getComponent = (input:string)=>{
    switch (input){
        // Buttons, can't see there being any others but ahwell
        case "pushBtn" : return <Button type={0}/>;

        // Sliders
        case "tabLength" : return <SliderCustom type={0}/>;
        case "rootNote" : return <SliderCustom type={1}/>;
        case "longestNote" : return <SliderCustom type={2}/>;
        case "bpm" : return <SliderCustom type={3}/>;
        case "distortion" : return <SliderCustom type={4}/>;
        
        // Dropdown
        case "tabType" : return <Dropdown type={0}/>;
        case "scale" : return <Dropdown type={1}/>;
        case "instrument" : return <Dropdown type={2}/>

        default : console.log(input," not recognised.");
    }
}
const OptionsBox = (props:any)=>{
    const [component,setType] = useState(getComponent(props.type))
    return (
        <div>
            <div>
                {component}
            </div>
        </div>
    )
}
export default OptionsBox;