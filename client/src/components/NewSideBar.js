import React, { useState } from "react";
import {
    Drawer,
    IconButton
} from '@mui/material'
import { Link } from 'react-router-dom'
import * as FAIcons from 'react-icons/fa'
import * as AIIcons from 'react-icons/ai'
import * as FIIcons from 'react-icons/fi'
import * as CGIcons from 'react-icons/cg'
import '../styles/Sidebar.css'
import ChingLogo from '../Ching-logos/Ching-logos_transparent.png'

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
                <div className='logoContainer'>
                    <Link to="/" className='link' height={100}>
                        <img className='logo' src={ChingLogo} />
                    </Link>
                </div>
            </div>
            <Drawer open={sidebar} onClose={showSidebar} anchor="left">
                <div className='list'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={item.title.toString()} className='nav-text'>
                                <Link className="sideBarLink" to={item.path} style={{ textDecoration: 'none' }}>
                                    {item.icons}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </div>
            </Drawer>
        </>
    );
};

export default NewSideBar;
