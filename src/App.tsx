import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import SidePanel from './Components/SidePanel/SidePanel';
import TabPreview from './Components/Tabs/TabPreview/TabPreview';
import { tabSettings } from './@types/tabTypes';
import TabMain from './Components/TabTable/Main/TabMain';
import tabGenerate from './Data/Music/TabGeneration/tabGenerate';
import PlayAudioTest from './Components/Tests/PlayAudioTest';
import { tabType,} from './@types/tabTypes';
import SmallTabProvider from './Data/Context/SmallTabContext';
import {AsyncTest} from './Components/Other/AsyncTest';

function App() {
  const [panelLeft] = useState(['pushBtn','tabLength','scale','tabType','rootNote','noteLength'])
  const [panelRight] = useState(['bpm','distortion','instrument'])

  const closePanel = ()=>{
    
  }
  return (
    <>
      <SmallTabProvider>
      <Header title="Guitar Tab Generator"/>
        <SidePanel options={panelLeft} side='left'/>
        <SidePanel options={panelRight} side='right'/>
      <main>
        <article>
            <TabPreview title="Tab Preview" />
        </article>
        <section> 
          {/* <TabMain title="Main Display"/> */}
        </section>
      </main> 
      </SmallTabProvider>
    </>
  );
}

export default App;
