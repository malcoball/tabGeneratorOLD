import { Dropdown, SliderCustom, Button } from "../../Inputs";
import {useState} from 'react';
import { text } from "stream/consumers";

const getComponent = (input:string)=>{
    switch (input){
        case "pushBtn" : return <Button type={0}/>;

        case "tabLength" : return <SliderCustom type={0}/>;
        case "rootNote" : return <SliderCustom type={1}/>;
        case "longestNote" : return <SliderCustom type={2}/>;
        case "bpm" : return <SliderCustom type={3}/>;
        case "distortio" : return <SliderCustom type={4}/>;
        
        case "tabType" : return <Dropdown type={0}/>;
        case "scale" : return <Dropdown type={1}/>;
        case "instrument" : return <Dropdown type={2}/>
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