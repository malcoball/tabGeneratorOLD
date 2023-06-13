import { useEffect, useState, useContext } from 'react';
import TabTableSmall from '../../TabTable/Small/TabTableSmall';
import './TabPreview.css'
import { tabSettings } from '../../../@types/tabTypes';
import { SmallTabContext } from '../../../Data/Context/SmallTabContext';


const TabPreview = (props:{title:string})=>{
    const tables = useContext(SmallTabContext)
    const [swipes,setSwipes] = useState<boolean[]>([])
    const [timing] = useState(1000);
    const reduceSwipes = ()=>{
        let swipesNew = [...swipes];
        swipesNew.pop();
        setSwipes(swipesNew);
    }
    let show = "none";
    let tabs = null;
    if (tables !== null){
        tabs = tables.tabs.map((elm,ind)=>{
            if (elm.id !== -1){ // -1 is used for the mainTab
                if (ind >= swipes.length){ // when there's a new element
                    let swipesNew = [...swipes,true];
                    setSwipes(swipesNew);
                    setTimeout(()=>{
                        let swipesNew = [...swipes];
                        swipesNew[swipesNew.length] = false;
                        setSwipes(swipesNew);
                    },timing)
                }
                const settings = tables.updateSettings.data;
                return <TabTableSmall tableInt={ind-1} settings={{instrumentName: settings.tabType,bpm : settings.bpm, synth:settings.synth}} key={Math.random()} swipe={{active:swipes[ind],timing:timing,removeFunc:reduceSwipes}} id={elm.id} />
            }
        })
            show = tabs.length > 0 ? "block" : "none";
    }
    return(
        <div className="tabPreview" style={{display:show}}>
            <h2>{props.title}</h2>
            <div className="tabSmallCont">
                {tabs}
            </div>
        </div>
    )
}
export default TabPreview;