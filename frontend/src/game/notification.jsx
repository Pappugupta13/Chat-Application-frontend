import React,{useEffect, useState,useRef} from 'react';
import '../cssFile/notification.css';
import { Cross } from '../components/svg';
import { usesocketIoContext } from '../context/socketIo';
const Notification = () => {
  const isSame = useRef(null)
const [reqUser,setReqUser] = useState([])
  const { socket } = usesocketIoContext();
  const [show,setShow]  = useState({
    parent:true,
    Children:false
  })
  const hideShow = ({which})=>{
   if(which === "parent"){
    return setShow({...show,parent:!parent})
   }
  }
  useEffect(()=>{
    socket?.on("isAccept",async ({name,profilePic,id})=>{
      setReqUser((prevReqUser) => [...prevReqUser, { name, profilePic,id }]);
    })
    return ()=>{
      socket?.off("isAccept")
    }
  },[socket])
 


  return (
    <>
    <div className='main-container-for-animation'>
   {show.parent&&<div  className='notification-container'>
      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
      <span style={{fontSize:20,marginLeft:5,color:'white'}}>Ask to join Game</span>
      <label style={{display:'flex'}} onClick={e=> hideShow({which:"parent"})}><Cross height={20} width={20}/></label>
      </div>
      <div className='notify-child-container'>
      {reqUser&&reqUser.map((item,index)=>(<div className='notify-child'>
            <div className='first-notify-child'>
                <div className='User-profile-container-name-last-message'>
                <img src={item.profilePic}/>
                <span className='last-message' style={{fontSize:17,width:110,color:'black'}}>{item.name}</span>
                <label onClick={3}><Cross height={15} width={15}/></label>
                </div>
            </div>
            <div className='button-container'>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>))}
      </div>
    </div>}
    </div>
    </>
  )
}

export default Notification
