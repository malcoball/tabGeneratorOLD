import { useState } from "react";
// import TabDisplay from "./TabDisplay";
import TabDisplay from "../TabDisplay/TabDisplay";
import './TabTableSmall.css';
const TabTableSmall = (props:any)=>{
    const delet = ()=>{
        props.remove(props.int);
    }
    return(
        <div className="tabTableSmall">
            <div className="topDiv">
                {/* <h4>{name}  {props.int}</h4> */}
                <input type="text" placeholder="test" />
                <span className="material-symbols-outlined" onClick={delet}>cancel</span>
            </div>
            <div className="mainContent">
                <div className="tableLeft">
                <div>
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                    <span className="material-symbols-outlined">arrow_right_alt</span>

                </div>
                <TabDisplay tabIn={props.tab} instrument={props.instrument}/>
                </div>
                <div className="tableRight">
                    <span className="material-symbols-outlined">cached</span>
                    <span className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined" onClick={()=>{props.push(props.int)}}>arrow_downward</span>
                </div>
            </div>
        </div>
    )
}

export default TabTableSmall;