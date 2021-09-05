import axios from 'axios';
import {useState} from 'react'
import { serverURL } from '../servers';
import TicketViewer from './TicketViewer';
const TicketEnter=()=>{
var [selected,setSelected]=useState('');
var numbers=['1','2','3','4','5','6','7','8','9','0']
var [users,setUser]=useState([]);


const handleClick=(item)=>{
        setSelected(prev=>prev+item)
   
}

const fetcher=async(id)=>{
 var res=await axios.get(serverURL+'/getList')
 var newres=  res.data?.find(item=>item.id===id);
 var phone=newres?.mobile;
 var newres2=  res.data?.filter(item=>item.mobile===phone);
 return newres2;
}

const handleEnter=()=>{
var ticketNumber=parseInt(selected);
var data= fetcher(ticketNumber);
data.then(res=>setUser(res));
}

return (
    <>
<div style={{background:'darkblue',padding:'20px 0'}}>
<h5 style={{color:'white'}}>Ticket number :{selected}</h5>
{numbers.map((item)=>{
   return (
       <button type='button' key={item}
       style={{background:'yellow',margin:'0 3px'}}
       onClick={()=>handleClick(item)}>{item}
           </button>
   )
})}
<button onClick={handleEnter}
       style={{background:'lightgreen',margin:'0 3px'}}
       >Enter</button>
<button onClick={()=>setSelected('')}
       style={{background:'red',margin:'0 3px'}}
       >Clear</button>

</div>
<center>
    {users.map(item=>(
        <div style={{display:'block'}} key={item.id}>
<TicketViewer ticketdata={item?.ticket} color={item?.color} user={item}/>
        </div>
    ))}
</center>
</>
    )
}

export default TicketEnter;