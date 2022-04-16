import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

const TimeInput = (props) => {
    const minInput = useRef();
    const secInput = useRef();

    const inputStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        width: '2.5rem',
        color: '#5C5C5C',
        "&:focusVisible": {
            outline: "none !important"
        }
    }

    const handleChange = (e) => {
        const input = parseInt(e.target.value, 10);
        let value;

        if (input > 60) {
            value = 60;
        } else if (input < 0 || isNaN(input)) {
            value = 0;
        } else {
            value = input;
        }

        e.target.value = value;

        props.setDuration(parseInt(minInput.current.value, 10) * 60 + parseInt(secInput.current.value, 10));
    }

    return (
        <>
            <div style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextField
                    id="min"
                    type="tel"
                    variant="standard"
                    inputRef={minInput}
                    defaultValue="00"
                    onChange={(e) => handleChange(e)}
                    inputProps={{
                        style: inputStyle,
                        placeholder: "00",
                        maxLength: 2
                    }} />
                <span style={{ fontWeight: 'bold', color: '#5C5C5C' }}>:</span>
                <TextField
                    id="sec"
                    type="tel"
                    variant="standard"
                    inputRef={secInput}
                    defaultValue="00"
                    onChange={(e) => handleChange(e)}
                    inputProps={{
                        style: inputStyle,
                        placeholder: "00",
                        maxLength: 2
                    }} />
            </div>
        </>
    );
}

export default TimeInput;