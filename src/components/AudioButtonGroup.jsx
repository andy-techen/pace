import React, { useState } from 'react';
import AudioButton from './AudioButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const AudioButtonGroup = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState('rain');

    const fetchSound = (query, duration, callback) => {
        const url = `https://freesound.org/apiv2/search/text/?query=${query}&filter=duration:%5B${duration}%20TO%20*%5D%20&fields=name,duration,url&sort=downloads_desc`
        const token = process.env.REACT_APP_FREESOUND_TOKEN;
        fetch(url, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `token ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    // const selectAudio = (event, query, duration) => {
    //     console.log(query);
    //     console.log(duration);
    //     fetchSound(query, duration, (res) => {
    //         console.log(res["results"][0]['url']);
    //         setAudio(new Audio(res["results"][0]['url']));
    //         console.log(audio);
    //     });
    // }
    const handleAudio = (newAudio) => {
        console.log(audio);
        setAudio(newAudio);
    }

    return (
        <ToggleButtonGroup
            value={audio}
            exclusive
            onChange={handleAudio}
            aria-label="select audio"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '1.5rem',
                marginTop: '2rem',
                width: '100%'
            }}
        >
            <AudioButton value='rain' duration="20" aria-label='select-rain' />
            <AudioButton value='campfire' duration="20" aria-label='select-campfire' />
            <AudioButton value='ocean' duration="20" aria-label='select-ocean' />
            <AudioButton value='random' duration="20" aria-label='select-random' />
        </ToggleButtonGroup>
    );
}

export default AudioButtonGroup;