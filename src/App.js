import React, { useState } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import TimeInput from './components/TimeInput';
import AudioButtonGroup from './components/AudioButtonGroup';
import Notification from './components/Notification';
import './styles/App.css';

function App() {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [complete, setComplete] = useState(false);

  return (
    <>
      <Header />
      <Notification complete={complete} />
      <Timer duration={duration} setIsRunning={setIsRunning} setComplete={setComplete} />
      <TimeInput setDuration={setDuration} />
      <AudioButtonGroup duration={duration} isRunning={isRunning} />
    </>
  );
}

export default App;
