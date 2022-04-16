import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';

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
        "&:not(:last-of-type)": {
            borderBottom: "0.1rem solid white"
        },
        "&:hover": {
            backgroundColor: '#759374',
        }
    });

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
            >
                <StyledMenuItem onClick={handleClose} >
                    <ListItemIcon sx={{ minWidth: "1.6rem !important" }} >
                        <PersonIcon fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    PROFILE
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon sx={{ minWidth: "1.6rem !important" }} >
                        <AnalyticsIcon fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    STATS
                </StyledMenuItem>
            </Menu>
        </div>
    );
}

export default Header;