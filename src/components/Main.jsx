import React, { useState } from 'react';
import Header from './Header';
import Timer from './Timer';
import TimeInput from './TimeInput';
import AudioButtonGroup from './AudioButtonGroup';
import Notification from './Notification';

const Main = () => {
    const [duration, setDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [complete, setComplete] = useState(false);
  
    return (
      <>
        <Notification complete={complete} />
        <Timer duration={duration} setIsRunning={setIsRunning} setComplete={setComplete} />
        <TimeInput setDuration={setDuration} />
        <AudioButtonGroup duration={duration} isRunning={isRunning} complete={complete} />
      </>
    );
  }
  
  export default Main;