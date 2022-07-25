import React from 'react'
import * as FAIcons from 'react-icons/fa'
import * as AIIcons from 'react-icons/ai'
import * as FIIcons from 'react-icons/fi'
import * as CGIcons from 'react-icons/cg'
import * as MDIcons from 'react-icons/md'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icons: <AIIcons.AiFillHome />,
    },
    {
        title: 'Messages',
        path: '/pages/Messages.js',
        icons: <FIIcons.FiMessageSquare />,
    },
    {
        title: 'Profile',
        path: './pages/Profile.js',
        icons: <CGIcons.CgProfile />,
    },
    {
        title: 'Explore',
        path: './pages/Explore.js',
        icons: <MDIcons.MdOutlineExplore />,
    },
]