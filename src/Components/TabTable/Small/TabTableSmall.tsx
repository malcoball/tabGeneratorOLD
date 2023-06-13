import { useEffect, useState, useContext } from "react";
import { SmallTabContext } from "../../../Data/Context/SmallTabContext";
// import TabDisplay from "./TabDisplay";
import TabDisplay from "../TabDisplay/TabDisplay";
import './TabTableSmall.css';
import { noteHighlights } from "../../../functions";
import { playTab } from "../../../Tone/playSound";
import instrument from '../../../Data/Music/Instruments';
import { tabType } from "../../../@types/tabTypes";
import { NotePromptAdd } from "../../Prompts/NoteClick/NoteClickPrompt";


const SwipeInComponent = (props:{id:number,swipeTime:number})=>{

    const smallTabContext = useContext(SmallTabContext);
    const [id] = useState(props.id);
    const tab : tabType = smallTabContext?.getTab(id);


    return(
        <div className={'tabTableSmallInner swipeIn'} style={{animationDuration:props.swipeTime/1000+"s"}}>
            <div className="topDiv">
                <span className="material-symbols-outlined">cancel</span>
            </div>
            <div className="mainContent">
                <div className="tableLeft">
                <div>
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                    <span className="material-symbols-outlined">arrow_right_alt</span>

                </div>
                <TabDisplay size="Sml" tabInfo={tab}/>
                </div>
                <div className="tableRight">
                    <span className="material-symbols-outlined">cached</span>
                    <span className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined" >arrow_downward</span>
                </div>
            </div>
        </div>
    )
}
type tabTableSmallProps = {
    tableInt : number,
    id : number,
    swipe : {
        active:boolean, timing:number, removeFunc : ()=>void
    },
    settings :{
        instrumentName : string,
        bpm : number,
        synth : string
    }
}
const TabTableSmall = (props:tabTableSmallProps)=>{

    const smallTabContext = useContext(SmallTabContext);
    // const inst = instrument(props.settings.tabType);
    let inst = instrument(props.settings.instrumentName);
    const [currentNote,setCurrentNote] = useState(-1); // Controls which is currently played
    const [timing,setTiming] = useState(1000); // How long inbetween notes, this should be overridden when at somepoint
    const [play,setPlay] = useState(false);
    const [id] = useState(props.id);
    const [showPrompt,setShowPrompt] = useState(false);
    const [remove,setRemove] = useState("");

    const tab : tabType = smallTabContext?.getTab(id);
    const visible = props.swipe.active ? "hidden" : "visible";
    const delet = ()=>{
        setRemove("swipeRight");
        window.setTimeout(()=>{
            smallTabContext?.updateTab.remove(id);
            props.swipe.removeFunc();
        },props.swipe.timing)
    }
    const refreshTab = ()=>{
    }
    const arrowLeft = ()=>{
        smallTabContext?.updateTab.note.remove(id);
    }
    const arrowRight = ()=>{
        // Displays a prompt that sorts all of it out.
        setShowPrompt(!showPrompt);
    }
    const arrowDown = ()=>{
        smallTabContext?.mainTab.addSmall(id);
    }
    const playBtn = ()=>{
        play !== true ? playTabFunc() : console.log("");
        setPlay(!play);
    }
    const playTabFunc = async ()=>{
        // play should go back to pause if tab is finished
        const octave = inst.octave;
        const string = inst.stringNames[0];
        const synth = props.settings.synth;
        const bpm = smallTabContext?.updateSettings.data.bpm
        const tabPlay = await playTab(tab,0,octave,synth,string)
        console.log(tabPlay);
    }

    
    return(
        <div className={"tabTableSmall tabTableContainer "+remove}>
            <div className={'tabTableSmallInner'} style={{visibility:visible}}>
                <div className="topDiv">
                    <input type="text" value={tab.name} onChange={refreshTab}/>
                    <span className="material-symbols-outlined" onClick={delet}>cancel</span>
                </div>
                <div className="mainContent">
                    <div className="tableLeft">
                    <div>
                        <span onClick={arrowLeft} className="material-symbols-outlined">arrow_right_alt</span>
                        <span onClick={arrowRight} className="material-symbols-outlined">arrow_right_alt</span>

                    </div>
                    <TabDisplay size="Sml" tabInfo={tab}/>
                    </div>
                    <div className="tableRight">
                        <span className="material-symbols-outlined" onClick={()=>{refreshTab()}}>cached</span>
                        <span onClick={playBtn} className="material-symbols-outlined">{play === false ? "play_circle" : "pause_circle"}</span>
                        <span onClick={arrowDown} className="material-symbols-outlined" >arrow_downward</span>
                    </div>
                </div>

            </div>
        {showPrompt? <NotePromptAdd tab={id} closeFunc={arrowRight} message="new note"/> : <></>}
        {props.swipe.active? <SwipeInComponent swipeTime={props.swipe.timing} id={props.id}/> : <></>}
    </div>
    )
}

export default TabTableSmall;