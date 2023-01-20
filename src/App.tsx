import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import SidePanel from './Components/SidePanel/SidePanel';
import TabPreview from './Components/TabPreview/TabPreview';

function App() {
  return (
    <>
      <Header title="Guitar Tab Generator"/>
      <SidePanel options={['pushBtn','tabLength','tabType','scale','rootNote','longestNote'] } side='left'/>
      <SidePanel options={['bpm','instrument','distortion']} side='right'/>
      <main>
        <article>
          <TabPreview></TabPreview>
        </article>
      </main>
    </>
  );
}

export default App;
