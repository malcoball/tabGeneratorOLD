import { useState } from "react";
import {tabTable,lineToMulti} from '../../../Data/Music/TabGeneration/tabTable';
import instrument from '../../../Data/Music/Instruments';
import TabDisplay from "../TabDisplay/TabDisplay";
import {playTab, pauseTab} from "../../../Tone/playSound";
import './TabMain.css';

const TabMain = (props:any)=>{
    const list = props.tabIn.map((elm:any)=>{return <li>{elm}</li>})
    const inst = instrument(props.instrument);
    const octave = inst.octave;
    const [play,setPlay] = useState(false);
    const [pauseTimer,setPauseTimer] = useState(null);
    const playTabBtn = ()=>{
        play == false ? 
            playTabFunc():
            pauseTabFunc();
    }
    const playTabFunc = ()=>{
        // let target = document.querySelectorAll('.tabMain .mainTabContainer .note');
        // // let timing = playTab(props.tabIn,props.settings.bpm,octave,inst.stringNames[0],"synth2");
        // // let timing = playTab(props.tabIn,props.settings.bpm,octave,inst.stringNames[0],props.settings.synth);
        // setPlay(true);
        // setTimeout(()=>{
        //     pauseTabFunc();
        // },timing);
    }
    const pauseTabFunc = ()=>{
        setPlay(false);
        pauseTab();
    }


    return(
        <div className="tabMain">
            <div className="titleDiv">
                <h2>{props.title}</h2>
                <span className="material-symbols-outlined" onClick={playTabBtn}>{play === false ? "play_circle" : "pause_circle"}</span>
            </div>
            <div className="mainTabContainer">
                {/* <TabDisplay tabIn={props.tabIn} instrument={props.instrument}/> */}
                {/* <ul>{list}</ul> */}
                <TabDisplay key={Math.random()} tabIn={props.tabIn} instrument={props.instrument} size="Lg"/>
            </div>
        </div>
    )
}

export default TabMain;