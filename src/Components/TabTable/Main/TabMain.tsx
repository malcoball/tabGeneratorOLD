import { useState } from "react";
import {tabTable,lineToMulti} from '../../../Data/Music/TabGeneration/tabTable';
import instrument from '../../../Data/Music/Instruments';
import TabDisplay from "../TabDisplay/TabDisplay";
import playSound from "../../../Tone/playSound";
import './TabMain.css';

const TabMain = (props:any)=>{
    const list = props.tabIn.map((elm:any)=>{return <li>{elm}</li>})

    return(
        <div className="tabMain">
            <div className="titleDiv">
                <h2>{props.title}</h2>
                <span className="material-symbols-outlined" onClick={playSound}>play_circle</span>
            </div>
            <div className="mainTabContainer">
                {/* <TabDisplay tabIn={props.tabIn} instrument={props.instrument}/> */}
                {/* <ul>{list}</ul> */}
                <TabDisplay key={Math.random()} tabIn={props.tabIn} instrument="bass"/>
            </div>
        </div>
    )
}

export default TabMain;