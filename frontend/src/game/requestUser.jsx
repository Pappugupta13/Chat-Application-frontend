import React,{useRef} from 'react'
import '../cssFile/userProfile.css';
import { usesocketIoContext } from '../context/socketIo';
import sent from '../image/invite.png';
const RequestUser = ({userData,updateSent,sentinvite}) => {
  const { socket } = usesocketIoContext();
  const isSame = useRef(null)
   const isTrue = sentinvite.includes(userData._id)
   if(isTrue && isSame.current !== userData._id){
    isSame.current = userData._id
    const {fullName,profilePic} = JSON.parse(localStorage.getItem('demo-chat-user'));
    socket?.emit("request",{id:userData._id,reqName:fullName,profilePic});
   
   }
  return (
    <div className='User-profile-container' style={{width:'235px',height:'30px'}} onClick={e=>updateSent({_id:userData._id})}>
        <img loading='lazy' style={{maxHeight:'35px',minHeight:'auto',maxWidth:'35px',minWidth:'auto'}} src={userData.profilePic}/>
        <div className='User-profile-container-name-last-message' style={{width:'180px'}}>
            <span className='last-message' style={{fontSize:20}}>{userData.fullName}</span>
      </div>
      {isTrue&&<img src={sent} style={{height:20,width:20}}/>}
    </div>
  )
}

export default RequestUser;
