import React from 'react';
import '../cssFile/notification.css';
const Notification = () => {
  const g = Array(10).fill("l")
  return (
    <div className='notification-container'>
      <span style={{fontSize:20,marginLeft:5,color:'white'}}>Ask to join Game</span>
      <div className='notify-child-container'>
      {g.map(()=>(<div className='notify-child'>
            <div className='first-notify-child'>
                <div className='User-profile-container-name-last-message'>
                <img src='https://avatar.iran.liara.run/username?username=test+undefined'/>
                <span className='last-message' style={{fontSize:17,maxWidth:120,color:'black'}}>Nitesh kumar</span>
                </div>
            </div>
            <div className='button-container'>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>))}
      </div>
    </div>
  )
}

export default Notification
