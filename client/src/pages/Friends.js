import NewSideBar from '../components/NewSideBar'
import React, { useState, useEffect, useRef } from 'react'
import { getFirestore, doc, getDoc, collection, setDoc, serverTimestamp, query, orderBy, limit, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Avatar, Button, Modal, Box, Typography, TextField, getCardHeaderUtilityClass } from '@mui/material'
import '../styles/Friends.css'

export default function Friends(props) {

    const [profileSnapshot] = useCollection(collection(db, "profile"))
    const [activeUser, setActiveUser] = useState("");
    const profiles = profileSnapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const getProfile = userID => profiles?.find(profile => (profile?.userID == userID))

    function FriendsBox() {
        return (profiles?.filter(profile => !profile.id.includes(props.uid)).map(profile => {
            //let friend = profile?.filter(user => user != props.uid)
            const userProfile = getProfile(props?.uid)
            if(userProfile.friends.includes(profile.userID)) {
                return (
                    <Box>
                        <button className={activeUser == profile?.userID ? "active chat" : "chat"} onClick={(e) => {
                            setActiveUser(profile?.userID)
                        }} >
                            <Avatar className="friendsListAvatar"></Avatar>
                            <p className='friendName' id={profile?.userID}> {profile?.name} </p>
                            <p className='friendBio' id={profile?.userID}> {profile?.bio} </p>
                        </button>
                    </Box>
                )
            }
            // let friendProfile = getProfile(profile)
            // console.log(profile)
            
        }))
    }

    return (
        <>
            <NewSideBar />
            <h1>Friends</h1>
            <div className="friendsListBodyContainer">
                <div className="friendsListBlock">
                    {FriendsBox()}
                </div>
            </div>
        </>


    )

}