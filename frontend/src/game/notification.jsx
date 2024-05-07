import React from 'react';
import '../cssFile/notification.css';
import { Cross } from '../components/svg';
const Notification = () => {
  const g = Array(2).fill("l")
  return (
    <div className='notification-container'>
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <span style={{fontSize:20,marginLeft:5,color:'white'}}>Ask to join Game</span>
      <Cross height={20} width={20}/>
      </div>
      <div className='notify-child-container'>
      {g.map(()=>(<div className='notify-child'>
            <div className='first-notify-child'>
                <div className='User-profile-container-name-last-message'>
                <img src='https://avatar.iran.liara.run/username?username=test+undefined'/>
                <span className='last-message' style={{fontSize:17,width:110,color:'black'}}>Nitesh kumar</span>
                <Cross height={15} width={15}/>
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
