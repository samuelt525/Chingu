import { Avatar, TextField } from '@mui/material';
import React from 'react';
import ChatList from '../components/ChatList';
import TabScrollButton from '@mui/material/TabScrollButton';

import '../styles/Messages.css'
import '../styles/Chat.css'

function Topbar() {

    return (
        <div className='topbar'>
            <Avatar>
                {/* Profile Pic */}
            </Avatar>
            <p className='sender'>
                {/* Active user */}
                Sean Rhee
            </p>
        </div>
    )
}

const tempData = [

    {
        message: "Hello Sean this is a test to see if shit is workingHello Sean this is a test to see if shit is workingHello Sean this is a test to see if shit is workingHello Sean this is a test to see if shit is workingHello Sean this is a test to see if shit is workings",
        fromUser: "Samuel",
        toUser: "Sean"
    },
    {
        message: "Hi Sam this ia test to see if this shit is workingHi Sam this ia test to see if this shit is workingHi Sam this ia test to see if this shit is workingHi Sam this ia test to see if this shit is workingHi Sam this ia test to see if this shit is working",
        fromUser: "Sean",
        toUser: "Samuel"
    },
    {
        message: "Hello Sean",
        fromUser: "Samuel",
        toUser: "Sean"
    },
    {
        message: "Hi Sam",
        fromUser: "Sean",
        toUser: "Samuel"
    },
    {
        message: "Hello Sean",
        fromUser: "Samuel",
        toUser: "Sean"
    },
    {
        message: "Hi Sam",
        fromUser: "Sean",
        toUser: "Samuel"
    },
]

const user = "Samuel"

function getMessage() {
    
    return tempData.map(msg => {
        const sender = msg.fromUser === user;
        return (
            <div className={sender ? 'blue username' : 'green username'}>
                <p>{msg.message}</p>
            </div>
        )

    })
}

function Messages() {

    return (
        <>
            <div className='container'>
                <ChatList />
                <div className='chatContainer'>
                    <Topbar />
                    <div className='messages'>
                        {getMessage()}
                    </div>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>
            </div>



        </>
    )
}

export default Messages