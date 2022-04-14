import React, { useState } from 'react';
import '../styles/Timer.css';

const Timer = () => {
    const [currTime, setCurrTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const updateTime = () => {

    }

    return (
        <div className="timer-container">
            <div className='timer-eclipse'></div>
            <div className='timer-inner'></div>
        </div>
    );
}

export default Timer;