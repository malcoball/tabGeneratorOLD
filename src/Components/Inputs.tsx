import OptionsBoxInfo from './SidePanel/OptionsBox/OptionsBoxInfo';
import {useEffect, useState} from 'react';
import {Slider} from '@mui/material';
import Images from '../Data/Images';
import './Inputs.css';

export const Button = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.buttons[type]);
    const changeText = (e:any)=>{
        let settingsNew = {...props.settings,smallTab:[2,5,2,6,5]}
        props.update(settingsNew);// Replace the root's value
    }
    return(
        <div className='inputWindow buttonInp'>
            <button className='widthSet heightSet inputValue' onClick={changeText}>{info.text}</button>
        </div>
    )
}

export const Dropdown = (props:any)=>{
    const {type} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.dropDown[type]);
    const [list,setList] = useState(info.list);
    const [showList,setShowList] = useState(false);
    const [selected,setSelected] = useState(props.settings[info.name]);
    const [arrowDir,setArrowDir] = useState('downArrow');

    const menuToggle = ()=>{
        setShowList(!showList);
        arrowDir === 'downArrow' ? setArrowDir('rightArrow') : setArrowDir('downArrow');
    }

    const changeText = (e:any)=>{
        let settingsNew = {...props.settings,[info.name]:e}
        props.update(settingsNew)// Replace the root's value
    }

    const dropList = list.map((elm:any)=>{return <DropDownItem key={Math.random()} text={elm} func={(e:any)=>{
        changeText(e)
    }}/>})
    return (
        <div className='inputWindow dropDown'>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className="dropDownControl widthSet inputBorder heightSet">
                <p className='inputValue'>{selected}</p>
                <span className={arrowDir} onClick={menuToggle}>
                    <img alt="nl" src={Images.ui.nav.down}/>
                </span>
            </div>
            {showList? <div className="dropDownList">
                <ul className='dropDownContainer' onClick={menuToggle} onMouseLeave={menuToggle}>
                    {dropList}
                </ul>
            </div> : <></>}
            
        </div>
    )
}
const DropDownItem = (props:any)=>{
    const [value,setValue] = useState(props.text);
    const sendValue = ()=>{props.func(value)};
    return(
        value.slice(0,1) !== "<" ? 
            <li className='dropDownItem' onClick={sendValue}>{value}</li> : 
            <li className='dropDownSplit'>{value.slice(7)}</li>
        
    )
}

export const SliderCustom = (props:any)=>{
    // Working with an array value so can setup range if need be, could be a seperate component but don't think it's needed.
    const {type,settings} = props;
    const [info,setInfo] = useState(OptionsBoxInfo.sliders[type]);
    const [value, setValue] = useState<number[]>([props.settings[info.name]]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    const handleClick = ()=>{
        let settingsNew = {...props.settings,[info.name]:value[0]}
        props.update(settingsNew);
    }
    const textChange = (inp:any)=>{
        let valueNew = [...value];
        valueNew[0] = inp.target.value;
        if (valueNew[0] < info.valueMin) valueNew[0] = info.valueMin;
        if (valueNew[0] > info.valueMax) valueNew[0] = info.valueMax;
        setValue(valueNew);
    }

    return (
        <div className='sliderCustom inputWindow'>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className='sliderCont widthSet inputBorder'>
                <div className="valueCont">
                    {/* <p className='inputValue'>{value}</p> */}
                    <input  className='inputValue' 
                            value={value[0]}
                            onChange={(e)=>{textChange(e)}}/>
                </div>
                <Slider
                    id="sliderId"
                    min={info.valueMin} max={info.valueMax}
                    value={value}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

