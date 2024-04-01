import React, { useEffect, useState, lazy, Suspense } from 'react'
const UserSearch = lazy(() => import('../components/userSearch'));
const UserProfile = lazy(() => import('../components/userProfile'));
import '../cssFile/leftUserContainer.css';
const ProfileViewer = lazy(() => import('../components/profileViewer'));
import { useUserContext } from '../context/themeContext';
import { usesocketIoContext } from '../context/socketIo';
import { useAuth } from '../context/AuthUser'
const url = import.meta.env.VITE_APP_API_URL;
const LeftUserContainer = () => {
  const { authuser } = useAuth()
  const { socket } = usesocketIoContext()
  // all hooks
  const [show, setShow] = useState(false)
  const [allUser, setAllUser] = useState([]);
  const { data } = useUserContext();
  const [search, setSearch] = useState('');
  const [updateData, setUpdateData] = useState()
  // updating the user info
  socket?.on('updateData', (da) => {
    setUpdateData(da)
  })
  // call the function at once
  useEffect(() => {
    const fetch_data = async () => {
      const res = await fetch(`${url}/users/chatData`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const resData = await res.json();
        console.log(resData)
        setAllUser(resData);
      } else {
        alert("internal server error ");
      }
    }
    fetch_data()
  }, [authuser, updateData]);


  // search the user
  const Search_user = (user_search) => {
    setSearch(user_search);
  };

  // slide up user profile
  const change = () => {
    setShow(!show)
  }
  return (
    <div className='left-user-container' style={{ backgroundColor: data.leftBg }}>
      <Suspense>
        {show ? (<ProfileViewer chnage_show={change} />) : (<div><div className='user-search-container'>
          <UserSearch chnage_show={change} Search_user={Search_user} />
        </div>
          <div className='user-scroll'>
            {allUser.map((item, index) =>  (

              <div key={index}>
                {item?.participants?.filter((item) => {
                  console.log(item)
                  return search.toLowerCase() == '' ? item : item.fullName.toLowerCase().includes(search.toLowerCase())
                }).map((data, index) => {
                  if (data._id === authuser.id) return;
                  return (
                    <UserProfile key={index} index={index + 1} userData={data} lastMessage={item?.latestMessage?.message} chnage_show={change} />
                  )
                })
                }
              </div>))
            
            }
          </div></div>)}
      </Suspense>
    </div>
  )
}

export default LeftUserContainer;
