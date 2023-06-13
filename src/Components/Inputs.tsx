import OptionsBoxInfo from './SidePanel/OptionsBox/OptionsBoxInfo';
import { SmallTabContext } from '../Data/Context/SmallTabContext';
import React, {ReactEventHandler, useContext, useEffect, useState} from 'react';
import {Slider} from '@mui/material';
import Images from '../Data/Images';
import './Inputs.css';

export const Button = (props:any)=>{
    const context = useContext(SmallTabContext);
    const {type} = props;
    const [info] = useState(OptionsBoxInfo.buttons[type]);
    const clickFunc = ()=>{
        context?.updateTab.add();
    }
    return(
        <div className='inputWindow buttonInp'>
            <button className='widthSet heightSet inputValue' onClick={clickFunc}>{info.text}</button>
        </div>
    )
}

export const Dropdown = (props:{type:number})=>{
    const {type} = props;
    const [info] = useState(OptionsBoxInfo.dropDown[type]);
    const [list] = useState(info.list);
    const [showList,setShowList] = useState(false);
    const [value,setValue] = useState(list[0]);
    useEffect(()=>{
        if (value.charAt(0) === "<"){
            setValue(list[1]);
        }
    },[])
    const context = useContext(SmallTabContext)


    const [arrowDir,setArrowDir] = useState('downArrow');

    const menuToggle = ()=>{
        setShowList(!showList);
        arrowDir === 'downArrow' ? setArrowDir('rightArrow') : setArrowDir('downArrow');
    }

    const changeText = (e:string)=>{
        setValue(e);
        context?.updateSettings.updateProperty.byString(info.name,e);
    }

    const dropList = list.map((elm:any)=>{return <DropDownItem key={Math.random()} text={elm} func={(e:any)=>{
        changeText(e)
    }}/>})
    return (
        <div className='inputWindow dropDown'>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className="dropDownControl widthSet inputBorder heightSet">
                <p className='inputValue'>{value}</p>
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

export const SliderCustom = (props:{type:number})=>{
    // Working with an array value so can setup range if need be, could be a seperate component but don't think it's needed.
    const {type} = props;
    const context = useContext(SmallTabContext);
    const [info] = useState(OptionsBoxInfo.sliders[type]);
    
    const [value,setValue] = useState<number[]>([0]);
    useEffect(()=>{
        let valueOut = [];
        typeof(info.value) === "number" ? valueOut.push(info.value) : valueOut.push(info.value[0]);
        setValue(valueOut);
    },[])

    const updateContext = ()=>{
        const valueOut = value[0];
        const test = context?.updateSettings.getProperty.byNumber(info.name);
        if (test !== valueOut){  
            context?.updateSettings.updateProperty.byNumber(info.name,value[0])
        }
    }


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    const textChange = (inp:React.ChangeEvent<HTMLInputElement>)=>{
        let valueNew = [...value];
        valueNew[0] = parseInt(inp.target.value);
        if (valueNew[0] < info.valueMin) valueNew[0] = info.valueMin;
        if (valueNew[0] > info.valueMax) valueNew[0] = info.valueMax;
        setValue(valueNew);
    }

    return (
        <div className='sliderCustom inputWindow' onMouseLeave={updateContext} onBlur={updateContext}>
            <h5 className='inputTitle'>{info.name}</h5>
            <div className='sliderCont widthSet inputBorder'>
                <div className="valueCont">
                    <input  className='inputValue' 
                            value={value[0]}
                            onChange={(e)=>{textChange(e)}}
                            />
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

const RadioInput = (props:{name : string|number})=>{
    const [active,setActive] = useState(false);
    const classActive = active === true ? "active" : "";
    return (
        <div className={"radioInputContainer "+classActive} >
            <span className='inputValue' onClick={()=>{setActive(!active)}}>{props.name}</span>
        </div>
    )
}

export const RadioSelector = (props:{type:number}) =>{
    const [info] = useState(OptionsBoxInfo.radio[props.type]);
    const options = info.values.map((elm) =>{return <RadioInput name={elm}/>})
    return (
        <div className="inputWindow radioSelector">
            <div className="titleDiv">
                <h5 className="inputTitle">{info.name}</h5>
            </div>
            <div className="infoDiv widthSet inputBorder">
                {options}
            </div>
        </div>
    )
}