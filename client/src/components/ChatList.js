import React, { useState, useEffect, useRef } from 'react'
import '../styles/ChatList.css'
import '../styles/Messages.css'
import '../styles/Chat.css'
import { Avatar, Button, Modal, Box, Typography, TextField, getCardHeaderUtilityClass } from '@mui/material'
import { getFirestore, doc, getDoc, collection, setDoc, serverTimestamp, query, orderBy, limit, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import TopBar from './TopBar'
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
    const [createChatUser, setCreateChatUser] = useState("");
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
            console.log("did this get called")
            const chatsRef = await collection(db, "chats")
            await addDoc(chatsRef, {
                users: [props.uid, createChatUser],
                lastModified: serverTimestamp(),
            });
        }
        if (createChatUser != "")
            fetchData()
    }, [createChatUser])

    function ChatBox() {
        return (chats?.filter(chat => chat.users.includes(props.uid)).map(chat => {
            let friend = chat.users.filter(user => user != props.uid)
            let profile = getProfile(friend)
            return (
                <Box>
                    <button className={activeUser == profile?.userID ? "active chat" : "chat"} onClick={(e) => {
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
            let profile = getProfile(friend)
            if (!chatExists(profile.userID))
                return (
                    <Box>
                        <button className="chat" onClick={(e) => {
                            setCreateChatUser(profile.userID)
                            console.log("Jello")
                        }} >
                            <Avatar></Avatar>
                            <p className='chatText' id={profile.userID}> {profile.name} </p>
                        </button>
                    </Box>
                )
        })
    }
    const chatid = chats?.find(chat => (chat.users.includes(props.uid) && chat.users.includes(activeUser)))?.id
    useEffect(() => {
        const chatdb = query(collection(db, `chats/${chatid}/message`), orderBy("created", "desc"), limit(15))
        const snap = onSnapshot(chatdb, (message) => {
            console.log(message)
            setMessages(message.docs.map(doc => doc.data()).reverse())
        })
        console.log(activeUser)
    }, [activeUser])
    function getMessage() {
        return messages.map(msg => {
            const sender = msg.fromUser === props.uid;
            return (
                <div className={sender ? 'blue message' : 'green message'}>
                    <p className='black'>{msg.messages}</p>
                </div>
            )
        })

    }
    function SendMessage(text) {
        const messageDb = collection(db, `chats/${chatid}/message`)

        return addDoc(messageDb, {
            created: serverTimestamp(),
            messages: text,
            fromUser: props.uid,
            toUser: activeUser,
        });
    }
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);
    const bottomOfChat = useRef()



    useEffect(() => {
        setTimeout(
            bottomOfChat.current.scrollIntoView({
                behavior: "smooth",
                block: 'start',
            }), 100
        )
    }, [messages])



    //modal stuff
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className='container'>
            <div className='friendsListContainer' >
                <div className='friendsListHeader'>
                    <Avatar></Avatar>
                    <p style={{ fontSize: "24px" }}> {getProfile(props.uid)?.name} </p>
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
                        <NewChatBox uid={props.uid} />
                    </Box>
                </Modal>
                <div className="friendsListBodyContainer">
                    <div className="friendsBlock">
                        {ChatBox()}
                    </div>
                </div>
            </div>
            <div className='chatContainer'>
                <TopBar name={getProfile(activeUser)?.name} />
                <div className='messages'>
                    {getMessage()}
                </div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={currentMessage}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            SendMessage(e.target.value)
                            setCurrentMessage("")
                        } else {
                            setCurrentMessage(e.value)
                        }
                    }}
                />
                <div ref={bottomOfChat} />
            </div>
        </div>
    )
}
export default ChatList