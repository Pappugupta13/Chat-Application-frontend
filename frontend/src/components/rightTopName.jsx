import React,{useState} from 'react';
import '../cssFile/rightTopName.css';
import { selectedChat  } from '../context/selectedChat';
import { useUserContext } from '../context/themeContext';
const RightTopName = () => {
  const {data,setdata} = useUserContext();
  const {data2} = selectedChat();
  const [datas,setdatas] = useState({image:'https://cdn-icons-png.freepik.com/512/6714/6714978.png',change:true});
  const change_theme = (e)=>{
    if(datas.change){
      setdatas({...datas,image:'https://png.pngtree.com/png-clipart/20190517/original/pngtree-vector-sun-icon-png-image_4224147.jpg',change:false});
      setdata({...data,leftBg:'#6B7280',
      rightTop:'#374151',
      rightMessage:'#4C5563',
      rightBottom:'#374151'
    });
    }
    else{
      setdata({...data,  
        leftBg:'#F9F7F3',
        rightTop:'#f0f2f5',
        rightMessage:'#e3d1b4',
        rightBottom:'#f0f2f5'
    });
      setdatas({...datas,image:'https://cdn-icons-png.freepik.com/512/6714/6714978.png',change:true})

    }
  }
  return (
    <div className='right-top-container' style={{backgroundColor:data.rightTop}}>
      <div style={{display:'flex',alignItems:'center',marginLeft:'20px',gap:'10px'}}>
        <img src={data2.profilePic} className='profile-pic-for-right' alt="Profile Picture" />
        <span className="name" style={{color:data.rightTop==='#374151'&&'white'}}>{data2.fullName}</span>

      </div>
      <div style={{marginRight:'15px'}}>
        <img onClick={change_theme} src={datas.image} className='dark-light-mood' />
      </div>
    </div>
  )
}

export default RightTopName