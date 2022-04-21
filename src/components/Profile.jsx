import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db, storage } from '../firebase';
import Fab from '@mui/material/Fab';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SpaIcon from '@mui/icons-material/Spa';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tooltip from '@mui/material/Tooltip';
import Stats from './Stats';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({ name: "", img: "" });
    const [stats, setStats] = useState({ sessions: 0, lastSession: '', length: '00:00' });
    const [progressData, setProgressData] = useState([]);
    const [editable, setEditable] = useState(false);
    const nameRef = useRef();
    const userId = localStorage.getItem("userId");

    const uploadImg = async (file, type) => {
        await storage.ref()
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

    const calcStats = useCallback((objs) => {
        const targetObj = Object.values(objs);
        const sessions = targetObj.length;
        // convert to yyyy-MM-dd in local timezone
        const lastSession = targetObj.reduce((prev, curr) => (prev.a < curr.a) ? prev : curr, {});
        let lastSessionDate = new Date(lastSession['timestamp']);
        const offset = lastSessionDate.getTimezoneOffset();
        lastSessionDate = new Date(lastSessionDate.getTime() - (offset * 60 * 1000));
        lastSessionDate = lastSessionDate.toISOString().split('T')[0];
        // convert to 00:00
        const length = targetObj.reduce((sum, curr) => sum + curr.length, 0) / sessions;
        const lengthStr = `${String(Math.floor(length / 60)).padStart(2, '0')}:${String(Math.round(length % 60)).padStart(2, '0')}`;

        return { sessions: sessions, lastSession: lastSessionDate, length: lengthStr }
    }, []);

    const calcProgress = useCallback((objs) => {
        const targetObj = Object.values(objs).filter(obj => obj.timestamp >= Date.now() - (24*60*60*1000*5));
        const result = targetObj.reduce((res, obj) => {
            res[new Date(obj.timestamp).toLocaleDateString()] = res[new Date(obj.timestamp).toLocaleDateString()] || 0;
            res[new Date(obj.timestamp).toLocaleDateString()] += obj.length / 60;
            return res;
        }, {});

        return result;
    }, []);

    useEffect(() => {
        db.ref(`/users/${userId}/`)
            .once('value')
            .then((snap) => {
                if (snap.exists()) {
                    setProfile(snap.val());
                }
            });

        db.ref("/sessions")
            .orderByChild('user_id')
            .equalTo(userId)
            .once('value')
            .then((snap) => {
                setStats(calcStats(snap.val()));
                setProgressData(calcProgress(snap.val()));
            });
    }, [userId, calcStats, calcProgress]);

    useEffect(() => {
        nameRef.current.focus();
    }, [editable]);

    useEffect(() => {
        if (profile.name || profile.img) {
            let updates = {}
            updates[`/users/${userId}`] = profile;
            db.ref('/').update(updates);
        }
    }, [profile, userId]);

    return (
        <div className='container'>
            <div className='profile-container'>
                <div className='profile-img-container'>
                    <label htmlFor="upload-img">
                        <input
                            id="upload-img"
                            name="upload-img"
                            type="file"
                            accept="image/*"
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
                            alt="profile-img"
                            className='profile-img'
                            src={profile.img}
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
                                    name: e.target.textContent.toLowerCase()
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
                        <Tooltip title="Average Session Length" placement="top">
                            <AccessTimeIcon fontSize='large' sx={{ color: "#5C5C5C" }} />
                        </Tooltip>
                        <span className='stats'>{stats.sessions}</span>
                        <span className='stats'>{stats.lastSession}</span>
                        <span className='stats'>{stats.length}</span>
                    </div>
                </div>
            </div>
            <div className="chart-container">
                <h4>MY PROGRESS</h4>
                <Stats data={progressData} />
            </div>
        </div>
    );
}

export default Profile;