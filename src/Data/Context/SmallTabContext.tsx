import React,{ useState, createContext, useEffect } from "react"
import { tabType, tabContextType, tabSettings } from "../../@types/tabTypes";
import { inputToLength } from "../../Tone/noteConversion";
import tabGenerate from "../Music/TabGeneration/tabGenerate";


interface Props {
    children: React.ReactNode;
}
export const defaultSettings : tabSettings = {
    tabLength:0, tabType:"bass",scale:"blues",smallTab:null,rootNote:0,bpm:0,distortion:0,
    noteLengths : [16,8],handPosition:0,synth:"synth1"
}
export const SmallTabContext = createContext<tabContextType | null >(null);

const defaultTab : tabType = 
    {id:0 ,tab : [{note : 1, length : 5},{note: 7, length: 4}],activeNote : -1, selected:2, name: "unset", settings:defaultSettings}

const SmallTabProvider: React.FC<Props> = ({children}) => {

    const [tabId,setTabId] = useState(2);
    const [settings,setSettings] = useState<tabSettings>({
        tabLength : 6,
        tabType : 'bass',
        scale : 'blues',
        smallTab:null, // Is used to detect any change, done this way to prevent more prop drilling, also it allows more control over array creation
        rootNote:0,
        bpm:120,
        distortion:0,
        handPosition: 0,
        synth : "synth1",
        noteLengths : [4,8]
    })
    const [tabs,setTabs] = useState<tabType[]>([
        // The -1 id is the large tab, "SmallTabContext" could be renamed to help with confusion. Confusion you ask? Dunno lulz
        {id:-1 ,tab : [{note : 1, length : 5},{note: 7, length: 4},{note : 1, length : 3},{note: 7, length: 2},{note : 1, length : 1},],
        activeNote : -1, selected:2, name: "Main Tab", settings:settings},
        {id:1 ,tab : [{note : 7, length : 4},{note: 10, length: 3},{note:5,length:3}],activeNote : -1, selected:2, name: "sik", settings:settings},
        // {id:2 ,tab : [{note : 3, length : 5},{note: 5, length: 4}],activeNote : -1, selected:2, name: "gay", settings:settings},
        // {id:3 ,tab : [{note : 3, length : 5},{note: 5, length: 4}],activeNote : -1, selected:2, name: "head", settings:settings},
    ])

    useEffect(()=>{
        let settingsSave = JSON.stringify(settings);
        let tabsSave = JSON.stringify(tabs);
        localStorage.setItem("settings",settingsSave);
        localStorage.setItem("tabs",tabsSave);

    },[settings,tabs])
    useEffect(()=>{
    },[tabs]);
    const newId = ()=>{
        setTabId(tabId + 1);
        return tabId;
    }
    const updateTab = {
        // Holds all methods for adding,changing and removing tabs and notes.
        add : ()=>{
            let newTab:tabType = {
                id:newId(), 
                tab:tabGenerate(settings.tabLength,true,settings.scale,settings.rootNote,settings.noteLengths),
                selected: 0,
                activeNote: -1,
                name: 'listen',
                settings:settings
            }
            setTabs([...tabs,newTab]);
        },
        remove : (id:number)=>{
            let out = tabs.filter((tab:tabType) =>{
                if (tab.id !== id) return tab;
            })
            setTabs(out);
        },
        length : ()=>{
            console.log("length pls");
        },
        note :{
            change : (target:{note:number,tabId:number},value:{note:number,length:number})=>{
                let tabsNew = [...tabs];
                let tabTarget = getTabLocation(target.tabId);
                let objNew = {...value};
                objNew.length = inputToLength(objNew.length);
                tabsNew[tabTarget].tab[target.note] = objNew;
                setTabs(tabsNew);
            },
            add :(target:number,value:{note:number,length:number})=>{
                let tabsNew = [...tabs];
                const valueNew = {...value};
                valueNew.length = inputToLength(valueNew.length);
                tabsNew[target].tab.push(valueNew);
                setTabs(tabsNew);
            },
            remove:(target:number)=>{
                let tabsNew = [...tabs];
                tabsNew[target].tab.pop();
                setTabs(tabsNew);
            }
        }
    }
    const mainTab = {
        addSmall : (id:number)=>{
            const smallTabTarget = getTab(id);
            const largeTabTarget = getTab(-1);
            const smallTab = smallTabTarget.tab;
            const largeTabCopy = {...largeTabTarget};
            smallTab.forEach(elm =>{
                largeTabCopy.tab.push(elm);
            })
            const stateCopy = [...tabs];
            stateCopy[0] = largeTabCopy;
            setTabs(stateCopy);
        }
    }
    const getTab = (id:number):tabType=>{
        let out:tabType = defaultTab;
        tabs.forEach( tab =>{
            if (id === tab.id) out = tab;
        })
        return out;
    }
    const getTabLocation = (id:number):number=>{
        let out = -1;
        for (let i = 0; i < tabs.length; i++){
            if (tabs[i].id === id) return i;
        }
        return out;
    }

    const updateSettings = {
        data : settings,
        updateProperty : {
            byString : (propsName : string , value : string  )=>{
                //  Ignore the dirty switch, couldn't dynamically access the property name for some reason
                const settingsNew = {...settings};
                    switch (propsName){
                        case "tabType"  : settingsNew.tabType = value; break;
                        case "scale"    : settingsNew.scale =   value; break;
                        case "synth"    : settingsNew.synth =   value; break;
                        default : console.log(propsName," : not recognised");
                    }
                setSettings(settingsNew);
            },
            byNumber :(propsName : string, value : number) =>{
                const settingsNew = {...settings};
                switch (propsName){
                    case "tabLength"    : settingsNew.tabLength     = value; break;
                    case "rootNote"     : settingsNew.rootNote      = value; break;
                    case "bpm"          : settingsNew.bpm           = value; break;
                    case "distortion"   : settingsNew.distortion    = value; break;
                    case "handPosition" : settingsNew.handPosition  = value; break;
                    default : console.log(propsName," : not recognised");

                }
                setSettings(settingsNew);
            },
            byArr : (propsName : string, value: [number,number])=>{
                const settingsNew = {...settings};
                switch (propsName){
                    case "noteLengths"  : settingsNew.noteLengths   = value; break;
                    default : console.log(propsName," : not recognised");

                }
                setSettings(settingsNew);
            }
        },
        getProperty :{ // I didn't copy the previous method, no sir.
            byString : (propsName : string) : string=>{
                //  Ignore the dirty switch, couldn't dynamically access the property name for some reason
                    switch (propsName){
                        case "tabType"  :return settings.tabType; 
                        case "scale"    :return settings.scale;   
                        case "synth"    :return settings.synth;   
                        default : console.log(propsName, " not recognised");return "";

                    }
            },
            byNumber :(propsName : string) : number =>{
                switch (propsName){
                    case "tabLength"    : return settings.tabLength;
                    case "rootNote"     : return settings.rootNote;
                    case "bpm"          : return settings.bpm;
                    case "distortion"   : return settings.distortion;
                    case "handPosition" : return settings.handPosition;
                    default : console.log(propsName, " not recognised");return 0;

                }
            },
            byArr : (propsName : string)=>{
                switch (propsName){
                    case "lengthRange"  : return settings.noteLengths;
                    default : console.log(propsName," : not recognised");

                }
            }
        },

        
    }
    return (
        <SmallTabContext.Provider value={{tabs,updateTab,getTab,mainTab,updateSettings}}>
            {children}
        </SmallTabContext.Provider>
    )
}

export default SmallTabProvider;