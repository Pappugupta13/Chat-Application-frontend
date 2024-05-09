import React, { useEffect, useState } from 'react';
import '../cssFile/notification.css';
import { Cross } from '../components/svg';
import { usesocketIoContext } from '../context/socketIo';
const Notification = () => {
  const [reqUser, setReqUser] = useState([])
  const { socket } = usesocketIoContext();
  const [show, setShow] = useState({
    parent: true,
    Children: false
  })
  const hideShow = ({ which }) => {
    if (which === "parent") {
      return setShow({ ...show, parent: !parent })
    }
  }
  const isAcceptORCancel = ({ isyes, id }) => {
    if (isyes === "yes") {
      const userName = JSON.parse(localStorage.getItem('demo-chat-user')).fullName;
      socket?.emit("isAccept", { istrue: "yes", id, Name: userName });

    }
  }

  useEffect(() => {
    socket?.on("isrequest", async ({ name, profilePic, id }) => {
      setReqUser((prevReqUser) => [...prevReqUser, { name, profilePic, id }]);
    })
    return () => {
      socket?.off("isAccept")
    }
  }, [socket])
  return (
    <>
      <div className='main-container-for-animation'>
        {show.parent && reqUser.length !== 0 && <div className='notification-container'>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <span style={{ fontSize: 20, marginLeft: 5, color: 'white' }}>Ask to join Game</span>
            <label style={{ display: 'flex' }} onClick={e => hideShow({ which: "parent" })}><Cross height={20} width={20} /></label>
          </div>
          <div className='notify-child-container'>
            {reqUser && reqUser.map((item, index) => (<div className='notify-child'>
              <div className='first-notify-child'>
                <div className='User-profile-container-name-last-message'>
                  <img src={item.profilePic} />
                  <span className='last-message' style={{ fontSize: 17, width: 110, color: 'black' }}>{item.name}</span>
                  <label onClick={3}><Cross height={15} width={15} /></label>
                </div>
              </div>
              <div className='button-container'>
                <button onClick={e => isAcceptORCancel({ isyes: "yes", id: item.id })}>Yes</button>
                <button onClick={e => isAcceptORCancel("No")}>No</button>
              </div>
            </div>))}
          </div>
        </div>}
      </div>
    </>
  )
}

export default Notification
