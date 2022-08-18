import React, { useState } from "react";
import {
    Drawer,
    List,
    IconButton
} from '@mui/material'
import { Link } from 'react-router-dom'
import * as FAIcons from 'react-icons/fa'
import * as AIIcons from 'react-icons/ai'
import * as FIIcons from 'react-icons/fi'
import * as CGIcons from 'react-icons/cg'
import '../styles/Sidebar.css'

const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icons: <AIIcons.AiFillHome />,
    },
    {
        title: 'Profile',
        path: '../profile',
        icons: <CGIcons.CgProfile />,
    },
    {
        title: 'Messages',
        path: '../messages',
        icons: <FIIcons.FiMessageSquare />,
    },
    {
        title: 'Friends',
        path: '../friends',
        icons: <FAIcons.FaUserFriends />,
    },

]

function NewSideBar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="sidebar">
                <IconButton  onClick={showSidebar} size='large' edge='start' color='inherit' aria-label='logo'>
                    <FAIcons.FaBars/>
                </IconButton>
            </div>
            <Drawer open={sidebar} onClose={showSidebar} anchor="left">
                <List className='list'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className='nav-text'>
                                <Link to={item.path}>
                                    {item.icons}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
};

export default NewSideBar;
