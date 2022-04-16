import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import '../styles/Timer.css';

const Timer = (props) => {
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef();
    let timerPct = (1 - (currTime / duration)) * 100;

    useEffect(() => {
        if (props.duration > 0) {
            setDuration(props.duration);
            setCurrTime(props.duration);
            console.log(`Timer is set for ${props.duration}`);
        }
        setIsRunning(false);
        props.setIsRunning(false);
    }, [props.duration]);

    useEffect(() => {
        if (isRunning && currTime > 0) {
            props.setComplete(false);
            timerRef.current = setInterval(() => {
                console.log(currTime);
                setCurrTime(currTime - 1);
            }, 1000);
        } else if (isRunning && currTime === 0) {
            console.log("Time's Up!");
            setIsRunning(false);
            props.setIsRunning(false);
            props.setComplete(true);
            setCurrTime(duration);
        }
        return () => {
            clearInterval(timerRef.current);
        }
    }, [isRunning, currTime]);

    return (
        <div className="timer-container">
            <div className='timer-eclipse' style={{
                backgroundImage: `conic-gradient(#A1C6A0 0% ${timerPct}%, #E5E5E5 ${timerPct}% 100%)`,
                animationDuration: `${duration}s`
            }} >
            </div>
            <div className='timer-inner'>
                <IconButton onClick={() => {
                    setIsRunning(!isRunning);
                    props.setIsRunning(!isRunning);
                }} sx={{ gridArea: '3 / 2' }} >
                    {isRunning ? <PauseIcon className="icon" /> : <PlayArrowIcon className="icon" />}
                </IconButton>
                {isRunning ? "" :
                    <Button
                        variant="text"
                        sx={{
                            color: '#ADABAB',
                            padding: 0,
                            gridArea: '4 / 2'
                        }}
                        onClick={() => setCurrTime(duration)}
                    >
                        reset
                    </Button>}
            </div>
        </div >
    );
}

export default Timer;