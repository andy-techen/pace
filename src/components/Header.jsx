import React, { useState } from 'react';
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
                }}
                sx={{
                    padding: 0,
                    color: 'white'
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><PersonIcon fontSize="small" sx={{ color: 'white' }} /></ListItemIcon>
                    PROFILE
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon><AnalyticsIcon fontSize="small" sx={{ color: 'white' }} /></ListItemIcon>
                    STATS
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Header;