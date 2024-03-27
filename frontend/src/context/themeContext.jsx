import {createContext,useContext,useState} from 'react'

export const UserContext = createContext();


export const useUserContext = ()=>{
  return useContext(UserContext);
}
const ThemeContext = ({children}) => {
  const [data,setdata] = useState({
    leftBg:'#d6d9db',
    rightTop:'#94a3b8',
    rightMessage:'#64748b',
    rightBottom:'#94a3b8'
  });
  return (
   <UserContext.Provider value={{data,setdata}}>
    {children}
   </UserContext.Provider>
  )
}

export default ThemeContext

