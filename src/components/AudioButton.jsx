import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

const AudioButton = (props) => {
    return (
        <>
            <ToggleButton
                value={props.value}
                sx={{
                    letterSpacing: '0.2rem',
                    width: '40%'
                }}
            >
                {props.value}
            </ToggleButton>
        </>
    );
}

export default AudioButton;