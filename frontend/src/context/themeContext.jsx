import {createContext,useContext,useState} from 'react'

export const UserContext = createContext();


export const useUserContext = ()=>{
  return useContext(UserContext);
}
const ThemeContext = ({children}) => {
  const [data,setdata] = useState({
    leftBg:'#F9F7F3',
    rightTop:'#f0f2f5',
    rightMessage:'#e3d1b4',
    rightBottom:'#f0f2f5'
  });
  return (
   <UserContext.Provider value={{data,setdata}}>
    {children}
   </UserContext.Provider>
  )
}

export default ThemeContext

