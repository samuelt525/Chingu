import React from "react"
import { Avatar } from "@mui/material"
export default function TopBar(props){
    return (
            <div className='topbar'>
                <Avatar src={props.profilePic}>
                </Avatar>
                <p className='ToUserName'>
                    {props.name}
                </p>
            </div>
    )
}