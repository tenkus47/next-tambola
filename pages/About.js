import styles from "../styles/About.module.css";
import GoogleLogin,{GoogleLogout} from 'react-google-login';
import {useState,useEffect,useRef} from 'react'
import { socket2 } from "../socket";
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
    socket2.on("usertyping",(data)=>{
      settypelist(prev=>{ if(!prev.includes(data)){
      var listarray=[...prev,data].slice(0,4);
      return listarray
      }                     
        return [...prev]                     
      })
    })
    socket2.on("usernottyping",data=>{
      var typer=typelist;
      const index = typer.indexOf(data);
      if (index > -1) {
        typer.splice(index, 1);
      }
     settypelist(typer);
    })

}, [])
 const [message,setMessage]=useState("")
 const [messages,setMessages]=useState([])
 const [loggedIn,setLoggedIn]=useState(false)
 const [user,setUser]=useState({});
 const chatref=useRef();
 const [typelist,settypelist]=useState([]);
const inputref=useRef();
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
       
  inputref.current?.addEventListener('focus', (event) => {
    socket2.emit("typing",user?.username);

    inputref.current?.scrollIntoView(true);

  });

  inputref.current?.addEventListener('blur', (event) => {
    socket2.emit("nottyping",user?.username);
  });

  return ()=>{inputref.current?.removeEventListener('focus',()=>console.log('removed'));
  inputref.current?.removeEventListener('blur',()=>console.log('removed'));
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
<div className='profile flex ml-3 items-center mb-2 justify-around mr-3 mt-2'  >   
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

      <div className=' text-white border-2 max-h-64 lg:max-h-96 lg:max-w-xl' style={{fontSize:10,width:'90%',margin:'0 auto',overflowY:'hidden'}} >
               <div className='font-bold bg-gray-600'>Game Discussion <span className='text-red-200 text-xs'>(please dont misuse the platform)</span>
                   </div>
                   <div
                   ref={chatref}
                    className='bg-white text-black h-64' style={{width:'100%',overflowY:'scroll',paddingBottom:30}}>
          {
              messages.map((msg,index)=>(
                  <div key={index} className={user.username===msg.username?(styles.self):(styles.other)}>
                      <div><img className='rounded-3xl' src={msg.photoUrl} height='25px' width='25px'/></div>
                      <div className='flex-row justify-center px-3'>
                          <div className='font-bold'>{msg.username}</div>
                          <div className='w-40'>{msg.message}</div>
                      </div>
                  </div>
              )
              )
          }
          {typelist.length>0?<div className='px-3'>{typelist.map((t,i)=><span key={i} className='font-bold'>
              {t} {i!==typelist.length-1?',':null} </span>)}
          <span> typing </span>
          <span className={styles.dot1}>.</span>
          <span className={styles.dot2}>.</span>
          <span className={styles.dot3}>.</span>
  </div>:null}
                   </div>
                   <div>
                </div>    
          </div>
          <form onSubmit={handlePost} className='flex justify-center w-3/4 mb-24 lg:max-w-xl items-center ' style={{margin:'0 auto'}}>
                        <input type='text' ref={inputref} value={message} style={{width:'80%'}} onChange={e=>setMessage(e.target.value)} 
                        className='rounded border-4 text-black w-full' />
                        <button className='bg-green-600 rounded text-white px-3'  type='submit' style={{width:'20%'}}>Send</button>
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
