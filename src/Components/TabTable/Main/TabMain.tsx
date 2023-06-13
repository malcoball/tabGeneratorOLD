import { useState, useContext, useEffect } from "react";
import {tabTable,lineToMulti} from '../../../Data/Music/TabGeneration/tabTable';
import instrument, { getInstrumentNames } from '../../../Data/Music/Instruments';
import TabDisplay from "../TabDisplay/TabDisplay";
import {playTab, pauseTab} from "../../../Tone/playSound";
import { tabSettings } from "../../../@types/tabTypes";
import { tabType } from "../../../@types/tabTypes";
import { DropDownInputNum, DropDownInputStr } from "../../Other/DropDownInputs";
import './TabMain.css';
import { SmallTabContext, defaultSettings } from "../../../Data/Context/SmallTabContext";
import { NotePromptAdd } from "../../Prompts/NoteClick/NoteClickPrompt";

const TabMain = (props:{title: string})=>{
    const smallTabContext = useContext(SmallTabContext);
    const [tab,setTab]= useState<tabType>(smallTabContext?.getTab(-1));
    const [octave,setOctave] = useState<number>(0);
    const [chosenTab,setChosenTab] = useState("bass");
    const [inst,setInst] = useState(instrument(chosenTab));
    const [play,setPlay] = useState(false);
    const [settings,setSettings] = useState(defaultSettings);
    const [showPrompt,setShowPrompt] = useState(false);
    const [tabTypes] = useState(getInstrumentNames());
    const [octaveRange] = useState([0,1,2,3,4,5,6,7,8,9]);
    useEffect(()=>{
        loadContext();
    },[])
    useEffect(()=>{
        
        const newTab = {...tab};
        newTab.settings.tabType = chosenTab;
        setTab(newTab);
    },[chosenTab])

    const loadContext = ()=>{
        const objNew = smallTabContext?.updateSettings.data;
        typeof(objNew) !== "undefined" ? afterContext(objNew) : alert("Context not loaded right");
    }

    const afterContext = (objNew : tabSettings)=>{
        setSettings(objNew);
        setInst(instrument(objNew.tabType));
    }

    const arrowLeft = ()=>{
        smallTabContext?.updateTab.note.remove(0);
    }
    const arrowRight = ()=>{
        // Displays a prompt that sorts all of it out.
        setShowPrompt(!showPrompt);
    }

    const playTabBtn = ()=>{
        play === false ? 
            playTabFunc():
            pauseTabFunc();
    }
    const playTabFunc = ()=>{
        const bpm = settings.bpm;
        const string = inst.stringNames[0];
        const synth = settings.synth;
        setPlay(true);
        // playTab(tab.tab,bpm,octave,string,synth,'.mainTabContainer',0)
    }
    const pauseTabFunc = ()=>{
        console.log("pause pls");
        setPlay(false);

    }


    return(
        <div className="tabMain" onMouseEnter={loadContext}>
            <div className="titleDiv">
                <DropDownInputNum title="octave" values={octaveRange} state={{value:octave,setValue:setOctave}}/>
                <h2>{props.title}</h2>
                <DropDownInputStr title="Tab Type" values={tabTypes} state={{value:chosenTab,setValue:setChosenTab}}/>


            </div>
            <div className="controlsContainer">
                    {/* <span className="hide"></span> */}
                    <span onClick={arrowLeft} className="material-symbols-outlined leftArrow">arrow_right_alt</span>
                    <span className="material-symbols-outlined" onClick={playTabBtn}>{play === false ? "play_circle" : "pause_circle"}</span>
                    <span onClick={arrowRight} className="material-symbols-outlined">arrow_right_alt</span>
                </div>
            <div className="mainTabContainer">
                <TabDisplay size="Lg"  tabInfo={tab}/>
            </div>
            {showPrompt? <NotePromptAdd tab={0} closeFunc={arrowRight} message="new note"/> : <></>}
        </div>
    )
}

export default TabMain;