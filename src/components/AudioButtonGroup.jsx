import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const AudioButtonGroup = (props) => {
    const [audio, setAudio] = useState('rain');
    const audioRef = useRef(new Audio());

    const AudioButton = styled(ToggleButton)({
        letterSpacing: '0.2rem',
        width: '40%',
        borderRadius: '0.4rem',
        "&&.MuiToggleButtonGroup-grouped": {
            borderRadius: '0.4rem'
        },
        "&&:not(:first-of-type)": {
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)"
        },
    });

    const fetchSound = (query, duration, callback) => {
        const url = `https://freesound.org/apiv2/search/text/?query=${query}&filter=duration:[${duration} TO *]&fields=previews&sort=downloads_desc`
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
        fetchSound(audio, props.duration, (res) => {
            audioRef.current.src = res["results"][0]["previews"]["preview-hq-mp3"];
            console.log(`Audio set to ${audioRef.current.src}`);
        });
    }, [audio, props.duration]);

    useEffect(() => {
        if (props.isRunning && props.duration > 0) {
            audioRef.current.play();
        } else if (audioRef.current.src !== "") {
            if (props.complete) audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
    }, [props.isRunning]);

    return (
        <ToggleButtonGroup
            value={audio}
            exclusive
            onChange={(e, newAudio) => {
                if (newAudio != null) setAudio(newAudio);
            }}
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
            <AudioButton value='forest' duration="20" aria-label='select-forest'>forest</AudioButton>
            <AudioButton value='ocean' duration="20" aria-label='select-ocean'>ocean</AudioButton>
            <AudioButton value='fire' duration="20" aria-label='select-fire'>fire</AudioButton>
        </ToggleButtonGroup>
    );
}

export default AudioButtonGroup;