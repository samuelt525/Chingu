import React, { useState } from 'react'
import '../styles/ChatList.css'
import { Avatar, Button } from '@mui/material'


export function Chat() {
    
    return (
        <button className="chat" >
            <Avatar></Avatar>
            <p className='chatText'> Samuel Tsui</p>
        </button>
    )
}

export function ChatList() {

    const [checked, setChecked] = useState(false);

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
                }}>New Chat</Button>
            </div>
            <div className="friendsListBodyContainer">
                <div className="friendsBlock">
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                </div>
            </div>
        </div>
    )
}
export default ChatList