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
    longestNote:1
  })
  useEffect(()=>{
  },[settings])

  const [smallTabs,setSmallTabs] = useState([ // Holds the small tabs
    [0,5,2,6,8]
  ])
  const removeSmallTab = (int:number)=>{
    console.log("int : ",int);
    let out : any[] = [];
    for (let i = 0; i < smallTabs.length; i++){
      if (i !== int) out.push(smallTabs[i]);
    }
    setSmallTabs([...out]);
  }
  const smallTabToMain = (int:number)=>{
    // Take the calling tab's array and put it in the large tab
    console.log(smallTabs[int]);
    const smallTab = smallTabs[int];
    const out = mainTab.concat(smallTab);
    setMainTab(out);
  }
  useEffect(()=>{
    if (settings.smallTab !== null){
      let newTab = tabGenerate(settings.tabLength,true,settings.scale,settings.rootNote);
      let newTabs = [...smallTabs];   newTabs.push(newTab);
      setSmallTabs(newTabs);
    }
  },[settings.smallTab])

  const [mainTab,setMainTab] = useState([
    0,2,5,6,8,9
  ])

  return (
    <>
      <Header title="Guitar Tab Generator"/>
      {/* <SidePanel settings={settings} update={setSettings} options={['pushBtn','tabLength','scale','tabType','rootNote','longestNote'] } side='left'/> */}
      {/* <SidePanel settings={settings} update={setSettings} options={['bpm','distortion']} side='right'/> */}
      <SidePanel settings={settings} update={setSettings} options={['pushBtn','tabLength','scale','tabType','rootNote','longestNote']} side='left'/>
      <SidePanel settings={settings} update={setSettings} options={['bpm','distortion']} side='right'/>
      <main>
        <article>
          <TabPreview push={smallTabToMain} remove={removeSmallTab} smallTabs={smallTabs} title="Tab Preview" instrument={settings.tabType}/>
        </article>
        <section>
          <TabMain title="Main Display" tabIn={mainTab} instrument={settings.tabType}/>
        </section>
      </main>
    </>
  );
}

export default App;
