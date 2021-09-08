import styles from "../styles/About.module.css";
import GoogleLogin,{GoogleLogout} from 'react-google-login';
import {useState,useEffect,useRef} from 'react'
import {socket2 } from "../socket";

import axios from "axios";
import { serverURL2 } from "../servers";
const Discuss = () => {

    
useEffect(() => {
    socket2.connect();
    socket2.on("connect", () => {
      });
    socket2.on("getMessage",data=>
             setMessages(data)
    )
}, [])
 const [message,setMessage]=useState("")
 const [messages,setMessages]=useState([])
 const [loggedIn,setLoggedIn]=useState(false)
 const [user,setUser]=useState({});
 const chatref=useRef();

useEffect(()=>{
 const fetcher=async()=>{
   var res=  await axios.get(serverURL2+'/chatdata')
   setMessages(res.data) 
   setTimeout(()=>{
       
     if(chatref.current){
    chatref.current.scrollTop=chatref.current?.scrollHeight
     }
   },500)         
 }
 fetcher();
},[loggedIn])

 useEffect(() => { 
    if(chatref.current){
        chatref.current.scrollTop=chatref.current?.scrollHeight

     }
    }, [messages])
 const handlePost=(e)=>{
    e.preventDefault();
    var currentTime=Date.now();
    socket2.emit('sendMessage',{message,user,currentTime})
     setMessage('')
     chatref.current.scrollTop=chatref.current.scrollHeight
 }

 const responseGoogle = (response) => {
  setUser({
      username:response.profileObj.name,
      photo:response.profileObj.imageUrl
  })
    setLoggedIn(true)
  }

 if(loggedIn){
    return (
    <>
<div className='profile flex ml-3 items-center mb-2 justify-between mr-3 mt-4'  >   
<img src={user.photo} alt='photo' className='rounded-3xl mr-3' height='25px' width='35px'/>
  <div className='font-bold'>{user.username}</div>
 <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={()=>{console.log('logout}')
       setLoggedIn(false)
    }}
    >
    </GoogleLogout>
</div>

      <div className=' text-white border-2 ' style={{fontSize:10,width:'90%',margin:'0 auto',maxHeight:'350px',height:'450px',overflowY:'hidden'}} >
               <div className='font-bold bg-gray-600'>Game Discussion <span className='text-red-200 text-xs'>(please dont misuse the platform)</span>
                   </div>
                   <div
                   ref={chatref}
                    className='bg-white text-black' style={{maxHeight:'100%',width:'100%',height:'100%',overflowY:'scroll',paddingBottom:40}}>
          {
              messages.map((msg,index)=>(
                  <div key={index} className='flex items-center m-2 rounded px-3 py-1' style={user.username!==msg.username?{background:'lightgray',flexDirection:'row-reverse',textAlign:'right'}:{background:'lightgreen'}}>
                      <div><img className='rounded-3xl' src={msg.photoUrl} height='25px' width='25px'/></div>
                      <div className='flex-row justify-center px-3'>
                          <div className='font-bold'>{msg.username}</div>
                          <div className='w-40'>{msg.message}</div>
                      </div>
                  </div>
              )
              )
          }
                   </div>
              
                   <div>
                </div>
          </div>
          <form onSubmit={handlePost} style={{maxWidth:'80%',margin:'0 auto' ,marginTop:10}}>
                        <input type='text' value={message} onChange={e=>setMessage(e.target.value)} className='rounded border-4 text-black ' style={{width:'80%'}}/>
                        <button className='bg-green-600 rounded text-white'  type='submit' style={{width:'20%'}}>Send</button>
                       </form>
    </>
  );
        }

        else{
            return(

                <div className='rounded  flex justify-center mt-20'>
                  <GoogleLogin
    clientId="233797134413-j37sqcrsutqp63hjnd03f0pp6k6gj4b9.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={()=>console.log('failed')}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  />
                </div>
            )
        }
};

export default Discuss;
