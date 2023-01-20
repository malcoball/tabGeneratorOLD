import OptionsBoxInfo from './SidePanel/OptionsBox/OptionsBoxInfo';
import {useState} from 'react';
import {Slider} from '@mui/material';
import Images from '../Data/Images';
import './Inputs.css';

export const Button = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.buttons[type]);
    // const [text,setText] = useState(OptionsBoxInfo.buttons[type].text)
    return(
        <div className='inputWindow buttonInp'>
            <button className='widthSet heightSet inputValue' onClick={()=>{OptionsBoxInfo.buttons[type].func()}}>{info.text}</button>
        </div>
    )
}
const DropDownItem = (props:any)=>{
    const [value,setValue] = useState(props.text);
    const sendValue = ()=>{props.func(value)};
    return(
        <li className='dropDownItem' onClick={sendValue}>{value}</li>
    )
}
export const Dropdown = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.dropDown[type]);
    const [list,setList] = useState(info.list);
    const [showList,setShowList] = useState(false);
    const [selected,setSelected] = useState(info.list[0]);
    const dropList = list.map((elm:any)=>{return <DropDownItem text={elm} func={setSelected}/>})
    return (
        <div className='inputWindow dropDown'>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className="dropDownControl widthSet inputBorder heightSet">
                <p className='inputValue'>{selected}</p>
                <span className="downArror" onClick={()=>{setShowList(!showList)}}>
                    <img alt="nl" src={Images.ui.nav.down}/>
                </span>
            </div>
            {showList? <div className="dropDownList">
                <ul className='dropDownContainer' onClick={()=>{setShowList(!showList)}}>
                    {dropList}
                </ul>
            </div> : <></>}
            
        </div>
    )
}
export const SliderCustom = (props:any)=>{
    // Working with an array value so can setup range if need be, could be a seperate component but don't think it's needed.
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.sliders[type]);
    const [value, setValue] = useState<number[]>([info.value]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    return (
        <div className='sliderCustom inputWindow'>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className='sliderCont widthSet inputBorder'>
                <div className="valueCont">
                    <p className='inputValue'>{value}</p>
                </div>
                <Slider
                    id="sliderId"
                    min={info.valueMin} max={info.valueMax}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

