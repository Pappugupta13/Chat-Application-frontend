import React from 'react';
import '../cssFile/profileViewer.css';
const StatusTypes = ({content}) => {
    return (
        <div className='status-container'>
                {content.type === 'image' && <img src={content.url}/>}
                {content.type === 'video' && <video className='status-video' autoPlay  controls controlslist="nofullscreen nodownload  noplaybackrate"><source src={content.url} /></video>}
                {content.type == 'text' && <span style={{textAlign:'center'}}>{content.text}</span>}
        </div>
    )
}

export default StatusTypes
