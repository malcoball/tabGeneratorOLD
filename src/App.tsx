import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import SidePanel from './Components/SidePanel/SidePanel';

function App() {
  return (
    <>
      <Header title="Guitar Tab Generator"/>
      <SidePanel options={['pushBtn','tabLength','tabType','scale','rootNote','longestNote'] } side='left'/>
      <SidePanel options={['bpm','instrument','distortion']} side='right'/>
    </>
  );
}

export default App;
