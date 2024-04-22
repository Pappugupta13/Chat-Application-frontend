import React from 'react'
import '../cssFile/rightMessage.css';
const VideoFile = ({link,show}) => {
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(30,41,59,1)',zIndex:'10',position:'absolute',left:'0',top:'0',display:'grid',placeItems:'center'}}>
        <div style={{position:'absolute',right:'10px',top:'0',fontSize:'50px',color:'white'}} onClick={e=>show()}>
        <svg aria-label="Close" class="x1lliihq x1n2onr6 x5n08af" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
        </div>
      <div className='video-container-watcher'><video   controls autoPlay  className='video'>
        <source src={link}/>
      </video>
      </div>
    </div>
  )
}

export default VideoFile
