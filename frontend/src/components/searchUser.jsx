import React, { useState } from 'react';
import {searchUser} from '../hooks/convertSize'
import '../cssFile/profileViewer.css';
import UserProfile from './userProfile';
const SearchUser = ({ AddUser }) => {

  const [inputvalue, setInputValue] = useState(null)
  const getData = async ()=>{
    const x = await searchUser(inputvalue)
  }
  return (
    <div className='profile-viewer' style={{ position: 'absolute', height: '100vh', zIndex: '10' }}>
      <div className='user-search-profile' style={{ marginTop: '15px',background:'none',width:'97%',borderRadius:'0',borderBottom:'3px solid black'}}>
      <input type='text' id='main-search-input-tag' style={{width:'80%'}} placeholder='search the user...' onChange={e=>setInputValue(e.target.value)}/>
      <button onClick={getData}></button>
        <svg onClick={AddUser} aria-label="Close" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
      </div>
      <div style={{height:'100%',overflowY:'auto'}}>

      </div>
    </div>
  )
}

export default SearchUser;
