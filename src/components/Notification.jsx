import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const Notification = (props) => {
    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50vw",
        bgcolor: '#759374',
        color: 'white',
        boxShadow: 24,
        borderRadius: '0.4rem',
        padding: 4,
        textAlign: 'center'
    };

    useEffect(() => {
        if (props.complete) {
            setOpen(true);
            console.log("Congrats on completing a session!");
        }
    }, [props.complete]);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                    Congrats on completing a session!
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default Notification;