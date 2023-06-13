import { useContext, useEffect, useState } from "react";
import { SmallTabContext } from "../../Context/SmallTabContext";
import { NotePromptChange } from "../../../Components/Prompts/NoteClick/NoteClickPrompt";
const TabTableNote = (props:{id:{note:number,id:number},noteNumber:string,className:string})=>{
    // used to identify where it is in the smallTabs state

    const [showPrompt,setShowPrompt] = useState(false);
    const noteClick = ()=>{
            setShowPrompt(!showPrompt);
    }
    const closePrompt = ()=>{
        setShowPrompt(false);
    }
    return (
        <>
            <li className={`${props.className} tabItem`} onClick={noteClick}>{props.noteNumber}</li>
            {showPrompt? <NotePromptChange id={props.id}  closeFunc={closePrompt} message="Replace note"/> : <></>}
        </>
    )
}
export default TabTableNote;