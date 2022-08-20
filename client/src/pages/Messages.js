import React from 'react';
import ChatList from '../components/ChatList';
import NewSideBar from '../components/NewSideBar'

function Messages(props) {

    return (
        <>
            <NewSideBar />
            <ChatList uid={props.uid}/>
        </>
    )
}

export default Messages