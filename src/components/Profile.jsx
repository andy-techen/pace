import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase';
import Fab from '@mui/material/Fab';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SpaIcon from '@mui/icons-material/Spa';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tooltip from '@mui/material/Tooltip';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({ name: "", img: "" });
    const [stats, setStats] = useState({ sessions: 0, lastSession: '', length: '00:00' });
    const [editable, setEditable] = useState(false);
    const nameRef = useRef();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        db.ref(`/users/${userId}/`)
            .once('value')
            .then((snap) => {
                if (snap.exists()) {
                    setProfile(snap.val());
                }
            });
        
        db.ref("sessions")
            .once('value')
            .then((snap) => {
                setStats(calcStats(snap.val()));
            });
    }, []);

    useEffect(() => {
        nameRef.current.focus();
    }, [editable]);

    useEffect(() => {
        if (profile.name || profile.img) {
            console.log(profile);
            let updates = {}
            updates[`/users/${userId}`] = profile;
            db.ref('/').update(updates);
        }
    }, [profile]);

    const uploadImg = async (file, type) => {
        storage.ref()
            .child(`${userId}.${type}`)
            .put(file);

        await storage.ref()
            .child(`${userId}.${type}`)
            .getDownloadURL()
            .then((url) => {
                setProfile((prev) => ({
                    ...prev,
                    img: url
                }));
            });
    }

    const calcStats = (objs) => {
        const targetObj = Object.values(objs).filter(obj => obj.user_id === userId);
        const sessions = targetObj.length;
        // convert to yyyy-MM-dd in local timezone
        const lastSession = targetObj.reduce((prev, curr) => (prev.a < curr.a) ? prev : curr);
        let lastSessionDate = new Date(lastSession['timestamp']);
        const offset = lastSessionDate.getTimezoneOffset();
        lastSessionDate = new Date(lastSessionDate.getTime() - (offset * 60 * 1000));
        lastSessionDate = lastSessionDate.toISOString().split('T')[0];
        // convert to 00:00
        const length = targetObj.reduce((sum, curr) => sum + curr.length, 0) / sessions;
        const lengthStr = `${String(Math.floor(length / 60)).padStart(2, '0')}:${String(Math.round(length % 60)).padStart(2, '0')}`;

        return {sessions: sessions, lastSession: lastSessionDate, length: lengthStr}
    };

    return (
        <div>
            <div className='profile-container'>
                <div className='profile-img-container'>
                    <label htmlFor="upload-img">
                        <input
                            id="upload-img"
                            name="upload-img"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const img = e.target.files[0];
                                uploadImg(img, img.name.split('.').pop());
                            }}
                        />
                        <Fab
                            size="small"
                            component="span"
                            aria-label="upload-img"
                            sx={{ position: 'absolute' }}
                        >
                            <UploadIcon sx={{ color: "#5C5C5C" }} />
                        </Fab>
                    </label>
                    {profile.img && (
                        <img
                            src={profile.img}
                            style={{ width: '100%' }}
                        />
                    )}
                </div>
                <div className='profile-info'>
                    <div className='profile-name'>
                        <span
                            className="name"
                            contentEditable={editable}
                            ref={nameRef}
                            onBlur={(e) => {
                                setEditable(false);
                                setProfile((prev) => ({
                                    ...prev,
                                    name: e.target.textContent
                                }));
                            }}
                            suppressContentEditableWarning={true}
                        >
                            {profile.name}
                        </span>
                        <IconButton
                            sx={{ padding: '0rem 0.2rem' }}
                            onClick={() => setEditable(true)}
                        >
                            <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </div>
                    <div className='stats-container'>
                        <Tooltip title="Sessions" placement="top">
                            <SpaIcon fontSize='large' sx={{ color: "#5C5C5C" }} />
                        </Tooltip>
                        <Tooltip title="Last Session" placement="top">
                            <CalendarMonthIcon fontSize='large' sx={{ color: "#5C5C5C" }} />
                        </Tooltip>
                        <Tooltip title="Session Length" placement="top">
                            <AccessTimeIcon fontSize='large' sx={{ color: "#5C5C5C" }} />
                        </Tooltip>
                        <span className='stats'>{stats.sessions}</span>
                        <span className='stats'>{stats.lastSession}</span>
                        <span className='stats'>{stats.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;