import OptionsBoxInfo from './SidePanel/OptionsBox/OptionsBoxInfo';
import {useState} from 'react';
import {Slider} from '@mui/material';

export const Button = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.buttons[type]);
    // const [text,setText] = useState(OptionsBoxInfo.buttons[type].text)
    return(
        <>
        <h5>This button is : {info.name}</h5>
        <button onClick={()=>{OptionsBoxInfo.buttons[type].func()}}>{info.text}</button>
        </>
    )
}
export const Dropdown = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.dropDown[type]);
    const [list,setList] = useState(info.list);
    const dropList = list.map((elm:any)=>{return <li>{elm}</li>})
    return (
        <>
            <h5>This dropdown is : {info.name}</h5>
            <ul>
                <li>{dropList}</li>
            </ul>
        </>
    )
}
export const SliderCustom = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.sliders[type]);
    const [value, setValue] = useState<number[]>([20, 37]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    return (
        <div>
            <h5>This slider is : {info.name}</h5>
            <div>
                <p>Set to {value}</p>
                <Slider
                    value={value}
                    onChange={handleChange}
                />
            </div>
            {/* <p>Min : {info.valueMin}</p>
            <p>Value : {info.value}</p>
            <p>Max : {info.valueMax}</p> */}
        </div>
    )
}

