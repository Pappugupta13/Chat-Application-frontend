const apiUrl = import.meta.env.VITE_APP_API_URL;
const convertTime = ({time}) => {
    const dateObject = new Date(time);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;;
}
const convertDate = ({time})=> {
    const dateObj = new Date(time);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${day}/${month<9?'0'+month:month}/${year}`;
  }
const addStatus = async({type,url,text})=>{
    try{
       
        const response = await fetch(`${apiUrl}/change/addStatus`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({type,url,text})
        })
        const  data = await response.json();
        if (data.error) throw new Error(data.error);
        console.log(data)
        localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
        location.reload();
    }
    catch (e){
        alert('Something went wrong');
        console.log(e.message);
    }
}
const deleteStatus = async({type,url,text})=>{
    try{
       
        const response = await fetch(`${apiUrl}/change/deleteStatus`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const  data = await response.json();
        if (data.error) throw new Error(data.error);
        localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
        location.reload();
    }
    catch (e){
        alert('Something went wrong');
        console.log(e.message);
    }
}
export {convertTime,addStatus,deleteStatus,convertDate} ;
