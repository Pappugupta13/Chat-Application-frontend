import React, { useState } from 'react';
import { Emoji } from './svg';
import '../cssFile/rightBottom.css';
import { useUserContext } from '../context/themeContext';
import EmojiPicker from "emoji-picker-react";
import getConversation from '../hooks/getConversation';
import convertSize from '../hooks/convertSize';
import {getURL} from '../firebase/firebase';
const RightBottom = () => {
  // all hooks are ...
  const { data } = useUserContext();
  const { conversation } = getConversation()
  const [datas, setDatas] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  
  
  //add emoji to input box
  const onEmojiClick = (event, emojiObject) => {
    setDatas((prevInput) => prevInput + event.emoji);
  };


  // set data of input box to null
  const send_data = () => {
    if(datas != ''){
      conversation({ datas });
      setDatas('');
      setShowPicker(false);
    }
  
  }


  // enter key for sending msg
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      send_data();
    }
  };


  // base 64 data
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const size = convertSize(file.size)
    const extension = file.name.split('.')[1]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result;
        let type = file.type.split("/");
        let types = (type[0] === 'application' || type[0] === 'text'||type[0] === '') ? 'document' : type[0];
        let url = file.size >20971520 ?await getURL({name:file.name,size:file.size,file}):imageBase64;
        conversation({ files: { url, type: types, name: file.name, extension, size}});
        
      };
      reader.readAsDataURL(file);
      event.target.files[0] = null
    }
  };


  return (
    <div className='bottom-right-container' style={{ backgroundColor: data.rightBottom }}>
      <span className='emoji' onClick={() => setShowPicker((val) => !val)}><Emoji/></span>
      <label for="file-input2" style={{ cursor: 'pointer',width:'35px' }}><svg viewBox="0 0 30 22" height="30px"  preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>attach-menu-plus</title><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z" fill="currentColor"></path></svg></label>
      <input type='file' id="file-input2" style={{display:"none"}}  onChange={handleImageUpload} onClick={(event)=> {event.target.value = null}} />
      <div className='pickerStyle-container'> {showPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
      )}
      </div>
      <input type='text' onChange={e => setDatas(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type Message..." value={datas} className='input-for-message' />
      <div className='send-msg-icon' onClick={send_data}>
      <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
      </div>
    </div>
  )
}


export default RightBottom;
