import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import SidePanel from './Components/SidePanel/SidePanel';
import TabPreview from './Components/TabPreview/TabPreview';
import TabMain from './Components/TabTable/Main/TabMain';
import tabGenerate from './Data/Music/TabGeneration/tabGenerate';

function App() {

  const [settings,setSettings] = useState({
    tabLength : 6,
    tabType : 'bass',
    scale : 'blues',
    smallTab:null, // Is used to detect any change, done this way to prevent more prop drilling, also it allows more control over array creation
    rootNote:0,
    bpm:120,
    distortion:0,
    longestNote:2,
    handPosition: 0,
    synth : "synth1"
  })
  useEffect(()=>{
  },[settings])

  const [smallTabs,setSmallTabs] = useState([ // Holds the small tabs
  {tab : [9,3,11,-3],activeNote : -1, selected:2, name: "unset", settings:settings},
  ])
  const removeSmallTab = (int:number)=>{
    let out : any[] = [];
    for (let i = 0; i < smallTabs.length; i++){
      if (i !== int) out.push(smallTabs[i]);
    }
    setSmallTabs([...out]);
  }
  const smallTabToMain = (int:number)=>{
    // Take the calling tab's array and put it in the large tab
    const smallTab = smallTabs[int].tab;
    const out = mainTab.concat(smallTab);
    setMainTab(out);
  }
  useEffect(()=>{
    // When 'new tab' button is used.
    if (settings.smallTab !== null){
      let newTab = tabGenerate(settings.tabLength,true,settings.scale,settings.rootNote,settings.longestNote);
      let newTabs = [...smallTabs];   newTabs.push({tab : newTab, selected:0, activeNote:-1, name : 'listen', settings:settings});
      setSmallTabs(newTabs);
    }
  },[settings.smallTab])

  const [mainTab,setMainTab] = useState([
    0
  ])

  return (
    <>
      <Header title="Guitar Tab Generator"/>
      <SidePanel settings={settings} update={setSettings} options={['pushBtn','tabLength','scale','tabType','rootNote','handPosition','longestNote']} side='left'/>
      <SidePanel settings={settings} update={setSettings} options={['bpm','distortion','instrument']} side='right'/>
      <main>
        <article>
          <TabPreview push={smallTabToMain} smallTabs={smallTabs} tabFunc={setSmallTabs} remove={removeSmallTab}  title="Tab Preview" settings={settings}/>
        </article>
        <section>
          {/* <TabMain settings={settings} title="Main Display" tabIn={mainTab} instrument={settings.tabType}/> */}
        </section>
      </main>
    </>
  );
}

export default App;
