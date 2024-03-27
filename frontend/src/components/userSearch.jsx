import React, { useState } from 'react'
import '../cssFile/userProfile.css';
import {useAuth} from '../context/AuthUser';
import {useSelectUserId} from '../context/userInfoContext';
const UserSearch = ({chnage_show,Search_user}) => {
  const {setdata4} = useSelectUserId();
  const {authuser} = useAuth();
const chhange_value = ()=>{
  setdata4(authuser);
  chnage_show();
}
const [data,setData] = useState('')
  return (
    <div className='user-search-profile'>
      <img src={authuser?.profilePic} loading='lazy' onClick={chhange_value}/>
      <input onChange={e=>{Search_user(e.target.value);setData(e.target.value);}} type='text' placeholder='Search User...' value={data}/>
      <button onClick={e=>Search_user(data)}>
      </button>
    </div>
  )
}

export default UserSearch;
