import React, { useState, useEffect } from 'react'
import '../styles/ChatList.css'
import { Avatar, Button, Modal, Box, Typography, getCardHeaderUtilityClass } from '@mui/material'
import { getFirestore, doc, getDoc, collection, setDoc, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import { letterSpacing } from '@mui/system';

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
    const [friendsList, setFriendsList] = useState([]);

    const [snapshot, loading, error] = useCollection(collection(db, "chats"))

    const chats = snapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    const chatExists = userID => chats?.find(chat => (chat.users.includes(props.userData.userID) && chat.users.includes(userID)))
    const [profileSnapshot] = useCollection(collection(db, "profile"))
    

    useEffect(() => {
        const fetchData = async () => {
            props.userData.friends.map(async data => {
                const docSnap = await getDoc(doc(db, "profile", data))
                setFriendsList(friendsList => [...friendsList, docSnap.data()])
            })
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const chatsRef = await collection(db, "chats")
            await addDoc(chatsRef, {
                users: [props.userData.userID, selectedUser],
                messages: [],
            });
        }
        if (selectedUser != "")
            fetchData()
    }, [selectedUser])

    function ChatBox() {
        return chats?.filter(chat => chat.users.includes(props.userData.userID)).map(chat => {
            let friend = chat.users.filter(user => user != props.userData.userID)
            console.log(friendsList.filter(friends => friends.userID == friend ))
            return (
                <Box>
                    <button className="chat" onClick={(e) => {
                        setSelectedUser(friend.userID)
                    }} >
                        <Avatar></Avatar>
                        <p className='chatText' id={friend.userID}> {friend.name} </p>
                    </button>
                </Box>
            )
        })    
    }

    function NewChatBox() {
        return friendsList.map((friend) => {
            if (!chatExists(friend.userID))
                return (
                    <Box>
                        <button className="chat" onClick={(e) => {
                            setSelectedUser(friend.userID)
                        }} >
                            <Avatar></Avatar>
                            <p className='chatText' id={friend.userID}> {friend.name} </p>
                        </button>
                    </Box>
                )
        })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (

        <div className='friendsListContainer' >
            <div className='friendsListHeader'>
                {/* Code to Grab User Profile Account*/}
                <Avatar></Avatar>
                <p style={{ fontSize: "24px" }}> Samuel Tsui</p>
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
                    {NewChatBox()}
                </Box>
            </Modal>
            <div className="friendsListBodyContainer">
                <div className="friendsBlock">
                    {ChatBox()}
                </div>
            </div>
        </div>
    )
}
export default ChatList