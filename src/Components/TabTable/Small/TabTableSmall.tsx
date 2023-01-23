import TabDisplaySml from "./TabDisplaySml";
import './TabTableSmall.css';
const TabTableSmall = ()=>{
    return(
        <div className="tabTableSmall">
            <span className="material-symbols-outlined">cancel</span>
            <div className="mainContent">
                <div className="tableLeft">
                <div>
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                    <span className="material-symbols-outlined">arrow_right_alt</span>

                </div>
                <TabDisplaySml tabIn={[1,5,3,6,2,7]} instrument="bass"/>
                </div>
                <div className="tableRight">
                    <span className="material-symbols-outlined">cached</span>
                    <span className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined">arrow_downward</span>
                </div>
            </div>
        </div>
    )
}

export default TabTableSmall;