import { useEffect, useState } from "react";
import tabGenerate from "../../../Data/Music/TabGeneration/tabGenerate";
// import TabDisplay from "./TabDisplay";
import TabDisplay from "../TabDisplay/TabDisplay";
import './TabTableSmall.css';
import { noteHighlights } from "../../../functions";
import { playTab } from "../../../Tone/playSound";
import instrument from '../../../Data/Music/Instruments';
const TabTableSmall = (props:any)=>{
    const inst = instrument(props.settings.tabType);
    const [name,setName] = useState(props.tab.name);
    const handleChange = (event:any)=>{
        setName(event.target.value);
        nameChange(event.target.value);
    }
    const delet = ()=>{
        props.remove(props.int);
    }
    const nameChange = (nameIn:string)=>{
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
    const arrowLeft = ()=>{
        // Reduce the tab by 1, or reduce the size
        let newTab = props.tabCont[props.int].tab;
        let target = newTab[newTab.length-1];
        if (newTab[newTab.length-1] < -2){
            // Reduce the length of a 1 or 2 note
            newTab[newTab.length-1]++;
        } else {
            // Remove 
            newTab.pop();
        }
        let replace = [...props.tabCont];
        replace[props.int].tab = newTab;
        props.tabFunc(replace);
        
    }
    const arrowRight = ()=>{
        // Increase tab by 1
        let newTab = props.tabCont[props.int].tab;
        newTab.push(0);
        let replace = [...props.tabCont];
        replace[props.int].tab = newTab;
        props.tabFunc(replace);
    }
    const playBtn = ()=>{
        const tab = props.tabCont[props.int].tab;
        const bpm = props.settings.bpm;
        const octave = inst.octave;
        const string = inst.stringNames[0];
        const synth = props.settings.synth;
        playTab(tab,bpm,octave,string,synth,'.tabTableSmall',props.int);
    }

    return(
        <div className={'tabTableSmall'}>
            <div className="topDiv">
                {/* <h4>{name}  {props.int}</h4> */}
                <input type="text" onChange={(event)=>{handleChange(event)}} value={props.tab.name}/>
                <span className="material-symbols-outlined" onClick={delet}>cancel</span>
            </div>
            <div className="mainContent">
                <div className="tableLeft">
                <div>
                    <span onClick={()=>{arrowLeft()}} className="material-symbols-outlined">arrow_right_alt</span>
                    <span onClick={()=>{arrowRight()}} className="material-symbols-outlined">arrow_right_alt</span>

                </div>
                <TabDisplay tabCont={props.tabCont} tabFunc={props.tabFunc} int={props.int} tabIn={props.tab} instrument={props.settings.tabType} size="Sml"/>
                </div>
                <div className="tableRight">
                    <span className="material-symbols-outlined" onClick={()=>{refreshTab()}}>cached</span>
                    <span onClick={playBtn} className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined" onClick={()=>{props.push(props.int)}}>arrow_downward</span>
                </div>
            </div>
        </div>
    )
}

export default TabTableSmall;