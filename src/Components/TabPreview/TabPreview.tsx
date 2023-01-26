import { useEffect, useState } from 'react';
import TabTableSmall from '../TabTable/Small/TabTableSmall';
import './TabPreview.css'

const TabPreview = (props:any)=>{
    const [tables,setTables] = useState(props.smallTabs)
    useEffect(()=>{
        // console.log("TabPreview : ",tables);
        setTables(props.smallTabs);
    },[props.smallTabs])
    let count = -1;
    let tabs = tables.map((elm:any)=>{
        count++;
        return <TabTableSmall push={props.push} key={Math.random()} remove={props.remove} int={count} tab={elm} instrument={props.instrument}/>})
    return(
        <div className="tabPreview">
            <h2>{props.title}</h2>
            <div className="tabSmallCont">
                {tabs}
            </div>
        </div>
    )
}
export default TabPreview;