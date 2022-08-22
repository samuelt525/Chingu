import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Modal, Box, Typography, TextField, getCardHeaderUtilityClass } from '@mui/material'
import { getFirestore, doc, getDoc, collection, setDoc, serverTimestamp, query, orderBy, limit, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';
import TopBar from './TopBar'
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import '../styles/Messages.css'
import '../styles/Chat.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#fff4a4',
    p: 4,
};

export function ChatList(props) {
    const [createChatUser, setCreateChatUser] = useState("");
    const [activeUser, setActiveUser] = useState("");
    const [snapshot] = useCollection(query(collection(db, "chats"), orderBy("lastModified", "desc")))
    const chats = snapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log(chats)


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
                        <Avatar src={profile?.profilePic}></Avatar>
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
                        }} >
                            <Avatar src={profile?.profilePic}></Avatar>
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
            setMessages(message.docs.map(doc => doc.data()).reverse())
        })
    }, [activeUser])

    function getMessage() {
        return messages.map(msg => {
            const sender = msg.fromUser === props.uid;
            return (
                <div className="messageContainer" style={sender ? { alignSelf: 'flex-end', flexDirection: 'row-reverse' } : { alignSelf: 'flex-start' }}>
                    <Avatar src={sender ? getProfile(props.uid)?.profilePic
                        : getProfile(activeUser)?.profilePic} height={8} width={8} />
                    <div className={sender ? 'blue message' : 'green message'}>
                        <p className='black'>{msg.messages}</p>
                    </div>
                </div>
            )
        })

    }
    function SendMessage(text) {
        const messageDb = collection(db, `chats/${chatid}/message`)
        const chatDb = doc(db, "chats", chatid)
        setDoc(chatDb, {
            lastModified: serverTimestamp(),
        }, { merge: true })
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

    const classes = useStyles();
    return (
        <div className='container'>
            <div className='friendsListContainer' >

                <Link to='/profile' className='friendsListHeader' style={{ textDecoration: 'none' }}>
                    <Avatar src={getProfile(props.uid)?.profilePic} style={{ margin: '4px 12px' }}></Avatar>
                    <p style={{ fontSize: "24px", color: "white" }}> {getProfile(props.uid)?.name} </p>
                </Link>
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
                <TopBar name={getProfile(activeUser)?.name} profilePic={getProfile(activeUser)?.profilePic} />
                <div className='messages'>
                    {getMessage()}
                </div>
                <div ref={bottomOfChat} />
                <TextField
                    id="outlined-basic"
                    label="Message"
                    variant="outlined"
                    value={currentMessage}
                    inputProps={{ className: classes.input }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value !== "") {
                            SendMessage(e.target.value)
                            setCurrentMessage("")
                        } else {
                            setCurrentMessage(e.value)
                        }
                    }}
                />
            </div>
        </div>
    )
}
const useStyles = makeStyles({
    input: {
        display: "flex",
        color: "white",
        marginTop: "auto",
        alignSelf: "flex-end",
        width: "100%",
    }
  });
export default ChatList