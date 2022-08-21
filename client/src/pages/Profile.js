import React, { useState, useEffect, useRef } from 'react'
import NewSideBar from '../components/NewSideBar'
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { getFirestore, doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Avatar, Button, Modal, Box, Typography, TextField, getCardHeaderUtilityClass } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase.js'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import InfoIcon from '@mui/icons-material/Info';
import '../styles/Profile.css'

export default function Profile(props) {
    const [profileSnapshot] = useCollection(collection(db, "profile"));
    const profile = profileSnapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    const getProfile = userID => profile?.find(profile => (profile.userID == userID));
    const userProfile = getProfile(props.uid);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        const updateRef = doc(db, 'profile', props.uid);

        if (name == 'bio') {
            await updateDoc(updateRef, {
                bio: value
            });
        }
        else if (name == 'name') {
            await updateDoc(updateRef, {
                name: value
            });
        }
    };
    const [value, setValue] = React.useState(null);
    function signOutAcc() {
        signOut(auth).then(() => {
            sessionStorage.removeItem('userSignedIn');
            sessionStorage.removeItem('profileSetUp');
            window.location.reload(true);

          }).catch((error) => {
            console.log('Failed to log out: ' + error);
          });
    }

    return (
        <>
            <NewSideBar />
            {/* Code to Grab User Profile Account*/}
            <div class="profileContainer">
                <Avatar className="profileAvatar"></Avatar>
                <h1 class="profileName">{userProfile?.name}</h1>
                <TextField
                    label="Name"
                    value={userProfile?.name}
                    name='name'
                    placeholder="Enter your name"
                    multiline
                    fullWidth
                    size='large'
                    margin='normal'
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleInputChange}
                />
                <TextField
                    id="bio-input"
                    label="Bio"
                    value={userProfile?.bio}
                    name='bio'
                    placeholder="Enter a bio"
                    multiline
                    fullWidth
                    size='large'
                    margin='normal'
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <InfoIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleInputChange}
                />
                <div class='birthdayPicker'>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            id="birthday-input"
                            label="Enter your birthday"
                            name="birthday"
                            fullWidth
                            margin='normal'
                            size='large'
                            value={userProfile?.birthday}
                            onChange={async (newValue) => {
                                const updateRef = doc(db, 'profile', props.uid);
                                await updateDoc(updateRef, {
                                    birthday: String(newValue._d).substring(4, 15)
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className='signOutButton'>
                    <Button variant='outlined' startIcon={<AccountCircle />} color='error' onClick={signOutAcc} >Sign Out</Button>
                </div>
            </div>
        </>

    )

}