import axios from 'axios'
import Sheetgenerate from '../comps/SheetGenerator'
import {useState,useEffect} from 'react'
import ShowAvailable from '../comps/ShowAvailable';
import {socket} from '../socket'
import {serverURL} from '../servers'
import moment from 'moment'


const Admin=()=>{
  const [sheet, setSheet] = useState();
  const [option,setOption]=useState([])
  const [loading,setloading]=useState(false);
  const [selectlist,setSelectlist]=useState([]);
  const [time,setTime]=useState();
  useEffect(()=>{
    socket.on('number',(item,list)=>{
      // dispatch({type:'update',item,list})
  })
 
},[socket])
  const createKey=()=>{
    axios.post(serverURL+'/privatekey',{
      key:key
    }).then(r=>console.log('key logged'))
   }
  function mulgenerator(data){
    dispatch({
      type:'sheetgenerate',
      data
      
    })
    setTimeout(()=>{
      window.location='/adminpage'
    },1000)
  
 
}
const submitTime= ()=>{
  axios.post(serverURL+'/Timings',{
    time
  }).then(res=>console.log(res))
  .catch(e=>
    console.log(e)
  )
}
const OrderTicket=async()=>{
  console.log(option,username,mobile)
  await axios.patch(serverURL+'/changeusername',{
  id:option,
  username,
  mobile:mobile
   })
   alert('order placed')
   setOption([]);
   setuserName(null)
   setmobile(0)
}
const clickStart=()=>{
  socket.emit('starts',true) 
}
const clickStop=()=>{
  socket.emit('starts',false)
  console.log('stop')
}
const clickmessage=()=>{
  socket.emit("message",message);
}
const clickend=()=>{
  axios.get(serverURL+'/system/reboot').then(res=>{
    console.log(res)
  });
}
const clickreset=()=>{
  // eslint-disable-next-line no-restricted-globals
  var r = confirm("Press a button!");
  if(r===true){
    axios.get(serverURL+'/reset').then(res=>{
      console.log('reset')
    });
    alert('data is wiped and reset')
  }
  else{
    alert('nothing has changed')
  }
 
}

const clickplayerreset=()=>{
  // eslint-disable-next-line no-restricted-globals
  var r = confirm("Press a button!");
  if(r===true){
    axios.get(serverURL+'/playerremove').then(res=>{
      console.log('reset')
    });
    alert('playerdata is wiped and reset')
  }
  else{
    alert('nothing has changed')
  }
 
}
    return(
        <center>
        <div  className='TicketGenerate'
        style={{ display: "flex", 
                  justifyContent: "center",
                  alignItems:'center',
                  flexDirection:'column',
                  borderRadius:10,
                  backgroundColor:'lime',
                  maxWidth:500,
                  marginTop:150,
                  padding:25 }}>
     <h1 style={{textAlign:'center'}}>Lhasa Tambola</h1>
     <input type='text' placeholder='key' onChange={e=>setKey(e.target.value)}/>
     <button onClick={createKey}>createKey</button>
          <form style={{
            textAlign:'center'
          }}>
           
          
          <div style={{marginTop:20,display:"flex",marginBotton:10,alignItems:'center',flexDirection:'column' }}>
           
              <input
              min='1'
              max='6'
              style={{padding:7,borderRadius:3}}
              placeholder='no. of ticket in sheet' type='text' onChange={(e)=>setSheet(e.target.value)}/>
              <Sheetgenerate numberOfTicket={sheet} create={mulgenerator}/>
          
          </div>
         
            
          </form>
    
          <div className='buyerSection'>
            <h3>Buyer Section</h3>
    
       <h5>Option choose:</h5>{option.map((item,index)=>
       <input type='button' key={index}  onClick={e=>optionremove(e.target.value)} style={{marginRight:10,width:30,padding:0}} value={item}/>)}
       <br/>
           {loading?(<h3>Loading</h3>):(
             <select className='listOfTickets'
             defaultValue={0}
             onChange={(e)=>setOption(prev=>[...prev,e.target.value])}
             >{
           selectlist.map((item,index)=>(
             <option key={index} className='item-tickets' >
               {item.id}
               </option>
           ))}</select>
           )
            }
            <input type='text' placeholder='username' onChange={(e)=>setuserName(e.target.value)} />
            <input type='text' placeholder='mobile' onChange={(e)=>setmobile(e.target.value)} />
            <button type='button' onClick={OrderTicket}> placeOrder </button>
        </div>
    <div className='Timing'>
      <h3>Set Game Time</h3>
      <input type='datetime-local' onChange={(e)=>setTime(moment(e.target.value)._d)}/> 
      <button onClick={submitTime}>set GameTime</button> 
    
    
    </div>
          <br/>
          <h1>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       <div> <button onClick={clickStart} style={{backgroundColor:'green'}} id='start-btn' className='btn-control'>start</button>
          <button onClick={clickStop} id='stop-btn' style={{backgroundColor:'blue'}} className='btn-control'>stop</button>
          <button onClick={clickreset} id='stop-btn' style={{backgroundColor:'orange'}} className='btn-control'>winner reset</button>
          <button onClick={clickplayerreset} id='stop-btn' style={{backgroundColor:'orange'}} className='btn-control'>Playerlist reset</button>
    
         </div>  
         </div>  
          <div style={{ display:'flex',justifyContent:'center'}}>
          <textarea style={{margin:20}} onChange={e=>setmessage(e.target.value)} placeholder='message'/>
          <button onClick={clickmessage} id='stop-btn' className='btn-control'>send message</button>
          </div>
          <button onClick={clickend} style={{display:'block',backgroundColor:'red'}} id='stop-btn' className='btn-control'>end server</button>
          
            </h1>
        </div>
        
        <center>
         <label htmlFor='ticketsearch' className='searchlabel'>Enter your Group </label>
                     <input
                     id='ticketsearch' 
                     type='text' placeholder='search your Group'
                  style={{marginTop:30,padding:10,fontFamily:'sans-serif',color:'purple',borderRadius:10}} 
                  onChange={(e)=>{
                      myticket.current=e.target.value
                      setclicked(prev=>!prev)
                      }}/>
                <input type='button' style={{padding:7,marginLeft:10,borderRadius:10}} value='search' onClick={()=>setclicked(prev=>!prev)}/> 
                     </center>
    
    
                <center>
      <div style={{marginBottom:20}}>
     <ShowAvailable/>
      </div>
    
    </center>
        </center>
    )
}
export default Admin