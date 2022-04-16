import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const AudioButtonGroup = (props) => {
    const [audio, setAudio] = useState('rain');

    const AudioButton = styled(ToggleButton)({
        letterSpacing: '0.2rem',
        width: '40%',
        borderRadius: '0.4rem',
        border: '0px',
        outline: '1px solid rgba(0, 0, 0, 0.12)',
        "&&.MuiToggleButtonGroup-grouped": {
            borderRadius: '0.4rem'
        }
    });

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

    useEffect(() => {
        if (props.isRunning) {
            fetchSound(audio, props.duration, (res) => {
                console.log(res["results"][0]);
            });
        }
    }, [props]);

    return (
        <ToggleButtonGroup
            value={audio}
            exclusive
            onChange={(e, newAudio) => setAudio(newAudio)}
            aria-label="select audio"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '1.5rem',
                margin: '2rem 0',
                width: '100%'
            }}
        >
            <AudioButton value='rain' duration="20" aria-label='select-rain'>rain</AudioButton>
            <AudioButton value='campfire' duration="20" aria-label='select-campfire'>campfire</AudioButton>
            <AudioButton value='ocean' duration="20" aria-label='select-ocean'>ocean</AudioButton>
            <AudioButton value='random' duration="20" aria-label='select-random'>random</AudioButton>
        </ToggleButtonGroup>
    );
}

export default AudioButtonGroup;