import { useEffect, useState } from "react";
import tabGenerate from "../../../Data/Music/TabGeneration/tabGenerate";
// import TabDisplay from "./TabDisplay";
import TabDisplay from "../TabDisplay/TabDisplay";
import './TabTableSmall.css';
const TabTableSmall = (props:any)=>{
    const [name,setName] = useState(props.tab.name);
    const handleChange = (event:any)=>{
        setName(event.target.value);
        nameChange(event.target.value);
    }
    const delet = ()=>{
        props.remove(props.int);
    }
    const nameChange = (nameIn:string)=>{
        console.log("name : ",name);
        console.log(props.tabCont[props.int])
        let replace = [...props.tabCont];
        replace[props.int].name = nameIn;
    }
    const refreshTab = ()=>{
        // Replaces the tab with the same settings that created it.
        let settings = props.tab.settings;
        let newTab = tabGenerate(settings.tabLength,true,settings.scale,settings.rootNote,settings.longestNote);
        let replace = [...props.tabCont];
        replace[props.int].tab = newTab;
        props.tabFunc(replace);
    }
    return(
        <div className="tabTableSmall">
            <div className="topDiv">
                {/* <h4>{name}  {props.int}</h4> */}
                <input type="text" onChange={(event)=>{handleChange(event)}} value={props.tab.name}/>
                <span className="material-symbols-outlined" onClick={delet}>cancel</span>
            </div>
            <div className="mainContent">
                <div className="tableLeft">
                <div>
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                    <span className="material-symbols-outlined">arrow_right_alt</span>

                </div>
                <TabDisplay tabCont={props.tabCont} tabFunc={props.tabFunc} int={props.int} tabIn={props.tab.tab} instrument={props.instrument} size="Sml"/>
                </div>
                <div className="tableRight">
                    <span className="material-symbols-outlined" onClick={()=>{refreshTab()}}>cached</span>
                    <span className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined" onClick={()=>{props.push(props.int)}}>arrow_downward</span>
                </div>
            </div>
        </div>
    )
}

export default TabTableSmall;