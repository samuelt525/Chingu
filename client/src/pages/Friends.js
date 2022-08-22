import NewSideBar from '../components/NewSideBar'
import React, { useState, useEffect, useRef } from 'react'
import { getFirestore, doc, getDoc, collection, setDoc, serverTimestamp, query, orderBy, limit, onSnapshot, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Avatar, Button, Modal, Box, Typography, TextField, getCardHeaderUtilityClass } from '@mui/material'
import Profile from './Profile'
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles/Friends.css'

export default function Friends(props) {

    const [profileSnapshot] = useCollection(collection(db, "profile"))
    const [activeUser, setActiveUser] = useState("");
    const profiles = profileSnapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const getProfile = userID => profiles?.find(profile => (profile?.userID == userID))

    const userProfile = getProfile(props?.uid)

    function FriendsBox() {
        return (profiles?.filter(profile => !profile.id.includes(props.uid)).map(profile => {
            if (userProfile.friends.includes(profile.userID)) {
                return (
                    <Box className='friendBlock'>
                        <button className={activeUser == profile?.userID ? "hovered profile" : "profile"}>
                            <Avatar className="friendsAvatar" src={profile?.profilePic}></Avatar>
                            <span className='friendName' id={profile?.userID}> {profile?.name} </span>
                            <div className="friendInfo">
                                <p className='friendBio' id={profile?.userID}>Bio: {profile?.bio} </p>
                                <p className='friendBday' id={profile?.userID}>Birthday: {profile?.birthday}</p>
                            </div>
                        </button>
                    </Box>
                )
            }
        }))
    }
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    };
    const addFriend = async (event) => {
        event.preventDefault();
        for (const profile of profiles) {
            if (profile?.email == searchValue) {
                if (userProfile?.friends.includes(profile?.userID)) {
                    console.log('already added')
                }
                else {
                    const userProfileRef = doc(db, "profile", props?.uid);
                    const friendProfileRef = doc(db, 'profile', profile?.userID);
                    await updateDoc(userProfileRef, {
                        friends: arrayUnion(profile?.userID)
                    });
                    await updateDoc(friendProfileRef, {
                        friends: arrayUnion(userProfile?.userID)
                    });
                }
            }
        }
    }

    return (
        <>
            <div className='friendsContainer'>
                <NewSideBar />
                <div className='addFriend'>
                    <form onSubmit={addFriend}>
                        <TextField
                            name="friendSearch"
                            label="Add a Friend"
                            placeholder="Enter Email Address"
                            type="text"
                            margin='normal'
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        <Button variant='outlined' startIcon={<AccountCircle />} type='submit' className='addFriendButton'>Add a friend</Button>
                    </form>
                </div>
                <h1 className='pageTitle'>Friends</h1>
                <div className="friendsListBodyContainer">
                    <div className="friendsListBlock">
                        {FriendsBox()}
                    </div>
                </div>
            </div>
        </>


    )

}