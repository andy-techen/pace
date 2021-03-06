import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledMenuItem = styled(MenuItem)({
        backgroundColor: "#A1C6A0",
        color: 'white',
        padding: '0 0.5rem',
        fontSize: '0.9rem',
        minHeight: '2.5rem !important',
        "&&:not(:last-of-type)": {
            borderBottom: "0.1rem solid white"
        },
        "&&:hover": {
            backgroundColor: '#759374',
        }
    });

    const openPage = (e) => {
        console.log(e.target.textContent);
        switch (e.target.textContent) {
            case "TIMER": {
                window.location.pathname = "/pace";
                break;
            }
            case "PROFILE": {
                window.location.pathname = "/pace/profile";
                break;
            }
            default:
                window.location.pathname = "/pace";
        }
    }

    return (
        <div style={{ height: '15vh' }}>
            <IconButton
                id="menu-button"
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-label="menu-button"
                onClick={handleClick}
                sx={{ margin: '0.2rem' }}
            >
                <MenuIcon
                    fontSize="large"
                    style={{ color: 'white' }}
                />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu-button',
                    style: { padding: 0 }
                }}
                elevation={0}
            >
                <StyledMenuItem onClick={(e) => {
                    openPage(e);
                    handleClose();
                }} >
                    <ListItemIcon sx={{ minWidth: "1.6rem !important" }} >
                        <TimerIcon fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    TIMER
                </StyledMenuItem>
                <StyledMenuItem onClick={(e) => {
                    openPage(e);
                    handleClose();
                }} >
                    <ListItemIcon sx={{ minWidth: "1.6rem !important" }} >
                        <PersonIcon fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    PROFILE
                </StyledMenuItem>
            </Menu>
        </div>
    );
}

export default Header;