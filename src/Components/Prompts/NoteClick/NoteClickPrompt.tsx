import React,{ useContext, useEffect, useState } from 'react';
import { SmallTabContext } from '../../../Data/Context/SmallTabContext';
import './NoteClickPromptStyle.css';
const RadioInput = (props:{data:RadioData,clickFunc:(valueIn:string)=>void})=>{
    const value = props.data.value;
    const classActive = props.data.checked === true? "activeBox" : "";
    const clickFunc = ()=>{
        props.clickFunc(value);
    }
    return (
        <div className={'checkBoxContainer '+classActive} onClick={clickFunc}>
            <span className="checkBox"></span>
            <span>{value}</span>
        </div>
    )
}
const NumberInput = (props:{input:{valueIn:string|number,onChange:(value:React.ChangeEvent<HTMLInputElement>|string)=>void}})=>{
    const iconPress = (increase:number = 1)=>{
        // let out = parseInt(props.input.valueIn) + increase;
        const input = props.input.valueIn;
        let numberOut = typeof(input) === "string" ? parseInt(input) : input;
        numberOut += increase;
        const stringOut =  numberOut + "";
        props.input.onChange(stringOut);
        console.log(props.input.valueIn);
    }
    return(
        <div className="numberInputContainer">
            <span className='minus' onClick={()=>{iconPress(-1)}}>-</span>
            <input className='input' defaultValue={0} type='text'
                    value={props.input.valueIn}
                    onChange={props.input.onChange} />
            <span className='plus' onClick={()=>{iconPress(1)}}>+</span>
        </div>
    )
}

interface RadioData {
    value:string;
    checked:boolean;
}
const PromptBody = (props:{value:{note:number,length:string},changeText:any,changeRadio:any,unmountFunc:any,closeFunc:any,message:string})=>{
    const [radioData,setRadioData] = useState([
        {value:"1",checked:false},
        {value:"2",checked:false},
        {value:"4",checked:false},
        {value:"8",checked:false},
        {value:"16",checked:false},
    ])
    const [loaded,setLoaded] = useState (false);
    useEffect(()=>{
        console.log("props : ",props.value.length)
        if ((loaded === false) &&(props.value.length !== "")){
            let arrNew = [...radioData];
            arrNew.forEach(elm =>{
                if (elm.value === props.value.length){
                    elm.checked = true;
                }
            })
            setRadioData(arrNew);
            // setLoaded(true);
        }
    },[props.value])
    const changeRadio = (valueIn:string)=>{
        let newArr = [...radioData];
        newArr.forEach(elm =>{
            elm.value === valueIn ? elm.checked = true : elm.checked = false;
        })
        setRadioData(newArr);
        props.changeRadio(valueIn);
    }
    const radioInputs = radioData.map( elm =>{
        return <RadioInput data={{value:elm.value, checked:elm.checked}} clickFunc={changeRadio}/>
    })
    const outsideClick = (e:any)=>{
        if (e.target.id === "noteClickPromptContainer"){
            props.closeFunc();
        }
    }
    return(
        <div id="noteClickPromptContainer" onClick={(e)=>{outsideClick(e)}}>
            <div id="noteClickPrompt">
            <h5 className='title'>{props.message}</h5>
                <div className="promptValue1 promptValue">
                <span className='inputTitle'>Note : </span> <br />
                    <NumberInput input={{valueIn:props.value.note,onChange:props.changeText}}/>
                </div>
                <div className="promptValue2 promptValue" onChange={props.changeRadio}>
                <span className='inputTitle'>Note Length :</span> <br />
                    <div className="radioContainer">
                        {radioInputs}
                    </div>
                </div>
                <div className="buttonContainer">
                    <button className='hide'>Cancel</button>
                    <button onClick={()=>{
                        props.unmountFunc();
                        props.closeFunc();
                    }}>Set</button>
                    <button onClick={props.closeFunc}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export const NotePromptChange = (props:{message:string,closeFunc:any,id:{note:number,id:number}})=>{
    const context = useContext(SmallTabContext);
    useEffect(()=>{
        if (context !== null){
            // Get the right tab
            let tabSelect = context.getTab(props.id.id);
            setValue(tabSelect.tab[props.id.note]);
        }
    },[]);

    const [value,setValue] = useState({note:0,length:"-1"})
    useEffect(()=>{
        console.log("value : ",value);
    },[value])
    const changeText = (e:React.ChangeEvent<HTMLInputElement> | string)=>{
        let valueIn = "";
        if (typeof(e) !== "string"){
            valueIn = e.currentTarget.value;
        } else {
            valueIn = e;
        }
        console.log("stank : ",valueIn);
        const valueInt = parseInt(valueIn);
        const valueOut = {note:valueInt,length:value.length}
        setValue(valueOut);        
    }
    const changeRadio = (valueIn:number)=>{
        let newValue = {...value};
        newValue.length = valueIn+"";
        setValue(newValue)
    }
    const closeFunc = ()=>{
        if ((context !== null) && (isNaN(value.note) === false)){
            let target = {note:props.id.note,tabId:props.id.id} // Selects the correct note basically.
            let objNew = {note : value.note, length: 0};
            objNew.length = parseInt(value.length);
            context.updateTab.note.change(target,objNew);
        }
    }
    return <PromptBody message={props.message} value={value} changeText={changeText} changeRadio={changeRadio} closeFunc={props.closeFunc} unmountFunc={closeFunc}  />
}


export const NotePromptAdd = (props:{message:string,closeFunc:any,tab:number})=>{
    const context = useContext(SmallTabContext);
    const [value,setValue] = useState({note:0,length:"4"})

    const changeText = (e:React.ChangeEvent<HTMLInputElement>)=>{

        const valueIn = e.currentTarget.value;
        const valueInt = parseInt(valueIn);
        const valueOut = {note:valueInt,length:value.length}
        setValue(valueOut);        
    }
    const changeRadio = (valueIn:number)=>{
        let newValue = {...value};
        newValue.length = valueIn+"";
        setValue(newValue)
    }
    const closeFunc = ()=>{
        if ((context !== null) && (isNaN(value.note) === false)){
            let objNew = {note : value.note, length: 0};
            objNew.length = parseInt(value.length);
            context.updateTab.note.add(props.tab,objNew);
        }
    }
    return <PromptBody message={props.message} value={value} changeText={changeText} changeRadio={changeRadio} closeFunc={props.closeFunc} unmountFunc={closeFunc} />
}