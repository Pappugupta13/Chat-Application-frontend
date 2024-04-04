import React,{useEffect, useState} from 'react';
import '../cssFile/profileViewer.css';
import { useSelectUserId  } from '../context/userInfoContext';
import {usesocketIoContext} from '../context/socketIo' ;
import {useAuth} from '../context/AuthUser';
import {SeenStatus} from './svg';
const StatusTypes = ({content,AddSeenUser}) => {
    const {data4} = useSelectUserId();
    const {socket} = usesocketIoContext();
    const {authuser} = useAuth()
    useEffect(()=>{
        const callAtOnce = async ()=>{
        if(data4.id !== authuser.id){
            console.log("auth id  "+authuser.id);
            console.log("selected id  "+data4._id)
            console.log('two request has updated ')
            socket.emit("seenStatus", {Adder:data4._id,seen:authuser.id});
        }
        return () => {
            socket.off("seenStatus", {Adder:data4._id,seen:authuser.id});
          };
    }
    callAtOnce()
    },[data4.id])
    return (
        <div className='status-container'>
                {content.type === 'image' && <img src={content.url}/>}
                {content.type === 'video' && <video className='status-video' autoPlay  controls controlslist="nofullscreen nodownload  noplaybackrate"><source src={content.url} /></video>}
                {content.type == 'text' && <span style={{textAlign:'center'}}>{content.text}</span>}
                {data4?.admin&&<div onClick={AddSeenUser} style={{display:'flex',gap:'10px'}}><SeenStatus/>1</div>}
        </div>
    )
}

export default StatusTypes
