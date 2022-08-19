import React, { useState, useEffect } from 'react'
import '../styles/ChatList.css'
import { Avatar, Button, Modal, Box, Typography, getCardHeaderUtilityClass } from '@mui/material'
import { getFirestore, doc, getDoc, collection, setDoc, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import { letterSpacing } from '@mui/system';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { map } from '@firebase/util';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function ChatList(props) {
    const [selectedUser, setSelectedUser] = useState("");
    const [activeUser, setActiveUser] = useState("");
    const [snapshot] = useCollection(collection(db, "chats"))
    const chats = snapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const [profileSnapshot] = useCollection(collection(db, "profile"))
    const profiles = profileSnapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const chatExists = userID => chats?.find(chat => (chat.users.includes(props.uid) && chat.users.includes(userID)))
    const getProfile = userID => profiles?.find(profile => (profile.userID == userID))

    //push data to db
    useEffect(() => {
        const fetchData = async () => {
            const chatsRef = await collection(db, "chats")
            await addDoc(chatsRef, {
                users: [props.uid, selectedUser],
                messages: [],
            });
        }
        if (selectedUser != "" && activeUser != "")
            fetchData()
    }, [selectedUser])

    function ChatBox() {
        if (profileSnapshot != null)
            return (chats?.filter(chat => chat.users.includes(props.uid)).map(chat => {
                let friend = chat.users.filter(user => user != props.uid)
                let profile = getProfile(friend)
                return (
                    <Box>
                        <button className="chat" onClick={(e) => {
                            setActiveUser(profile?.userID)
                        }} >
                            <Avatar></Avatar>
                            <p className='chatText' id={profile?.userID}> {profile?.name} </p>
                        </button>
                    </Box>
                )
            }))
    }
    function NewChatBox() {
        let UserProfile = getProfile(props.uid)
        return UserProfile?.friends.map((friend) => {
            console.log(friend)
            let profile = getProfile(friend)
            if (!chatExists(profile.userID))
                return (
                    <Box>
                        <button className="chat" onClick={(e) => {
                            setSelectedUser(profile.userID)
                        }} >
                            <Avatar></Avatar>
                            <p className='chatText' id={profile.userID}> {profile.name} </p>
                        </button>
                    </Box>
                )
        })
    }

    //modal stuff
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className='friendsListContainer' >
            <div className='friendsListHeader'>
                {/* Code to Grab User Profile Account*/}
                <Avatar></Avatar>
                <p style={{ fontSize: "24px" }}> { } </p>
            </div>
            <div className="newChatButtonContainer" >
                <Button variant="outlined" style={{
                    maxWidth: '120px',
                    maxHeight: '40px',
                    minWidth: '30px',
                    minHeight: '30px',
                    color: 'black',
                    borderColor: 'black',
                    margin: '8px',
                }} onClick={handleOpen}>New Chat</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select a friend
                    </Typography>
                    <NewChatBox uid={props.uid}/>
                </Box>
            </Modal>
            <div className="friendsListBodyContainer">
                <div className="friendsBlock">
                    {
                        ChatBox()
                    }
                </div>
            </div>
        </div>
    )
}
export default ChatList