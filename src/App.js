import React from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import TimeInput from './components/TimeInput';
import AudioButtonGroup from './components/AudioButtonGroup';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <Timer />
      <TimeInput />
      <AudioButtonGroup />
    </>
  );
}

export default App;
