import React, { useState,useRef } from 'react';
import '../cssFile/profileViewer.css';
import {logout} from '../hooks/authHook'
import myImage from '../image/logout.png';
import {changeItem} from '../hooks/changeItem';
import { useSelectUserId  } from '../context/userInfoContext';
import Status from './status';
const ProfileViewer = ({chnage_show}) => {
  const profileViewer = useRef(null)
  const {data4} = useSelectUserId();
  const [change,setChange] = useState(false);
  const[status,setStatus] = useState(false)
  const [dp,chnageDp] = useState(data4?.admin&&data4?.profilePic)
  const [name,setName] = useState(data4?.fullName);
  const userOriginalName = data4?.admin&&data4?.fullName;
  const userOriginalPic = data4?.admin&&data4?.profilePic
  const chnage_name = ()=>{
    setChange(!change)
  }
  const showStatus = ()=>{
    setStatus(!status)
    if (status === false){
      if(data4?.status.type!=null){
        profileViewer.current.style.display='none'
      }
      else if(data4?.status.type===null &&data4?.admin ===true){
        profileViewer.current.style.display='none'
      }
       
    }
    else{
      profileViewer.current.style.display='flex'
    }
    
  }

  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        chnageDp(imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const dpWill = ()=>{
    if(userOriginalName != name || userOriginalPic != dp){
      return changeItem({fullName:name,dp})
    }
    alert("everything is same");
    
  }
  return (
    <>
    {(data4?.status?.type!=null||data4?.admin)&&status&&<Status admin={data4?.admin} status={data4?.status} showAndHide={showStatus}/>}
    <div className='profile-viewer' ref={profileViewer}>
      <div className='cross-icon-for-profile-viewer' style={{marginTop:'5px'}} onClick={chnage_show}>
      <svg aria-label="Close" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
      </div>
     <div className='top-for-profile-viewer'>
        <img onClick={showStatus} src={data4?.admin?dp:data4?.profilePic}/>
        <div className='name-email-profile-viewer'>
            <span style={{paddingLeft:'15px'}}>Type</span>
            <span style={{paddingLeft:'15px'}}>• {data4?.admin?'Admin':'User'}</span>
        </div>
        <div className='name-email-profile-viewer'>
            <span style={{paddingLeft:'15px'}}>Name</span>
            <span style={{paddingLeft:'15px'}}>• {data4?.admin?(<><input type="text" value={name} onChange={e=>change&&setName(e.target.value)}  className='change-name-profile-viewer'/><button onClick={chnage_name} style={{padding:'5px'}}>ch</button></>):name}</span>
        </div>
        <div className='name-email-profile-viewer'>
            <span style={{paddingLeft:'15px'}}>Email</span>
            <span style={{paddingLeft:'15px'}}>• {data4?.email}</span>
        </div>
        {data4?.admin&&<div className='name-email-profile-viewer' style={{display:'flex',justifyContent:'space-between'}}>
          <label for='file-input' style={{paddingLeft:'15px',cursor:'pointer'}}>• change Picture</label>
          <input type='file' id="file-input" style={{display:'none'}} accept="image/*" onChange={ handleImageUpload }/>
          <button onClick={dpWill}>submit</button>
        </div>}
     </div>
    {data4?.admin&&<div className='bottom-for-profile-viewer'>
        <span>logout</span>
        <img onClick={logout} src={myImage} className='logout-image'/>
     </div>}
    </div>
    </>
  )
}

export default ProfileViewer;
