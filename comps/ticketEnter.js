import axios from 'axios';
import {useState,useEffect,useRef} from 'react'
import { serverURL } from '../servers';
import TicketViewer from './TicketViewer';
import styles from '../styles/ticketEnter.module.css'
const TicketEnter=()=>{
var [selected,setSelected]=useState('');
var numbers=['1','2','3','4','5','6','7','8','9','0']
var [users,setUser]=useState([]);
var [loading,setLoading]=useState(false)
const idref=useRef(null);
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
setLoading(true)
var ticketNumber=parseInt(selected);
var data= fetcher(ticketNumber);
data.then(res=>{
 res.sort((a,b)=>a.id-b.id)   
setUser(res)
setLoading(false);
localStorage.setItem('ticketnumber',selected);
setSelected('')
idref.current.scrollIntoView({behavior:'smooth',block: "start", inline: "nearest"});

});
}

useEffect(()=>{
var ticketnumber=parseInt(localStorage.getItem('ticketnumber'))
if(ticketnumber){
    setLoading(true)
    var data= fetcher(ticketnumber);
    data.then(res=>{
        res.sort((a,b)=>a.id-b.id)   
        setUser(res)
        setLoading(false);
        setSelected('')
        
    idref.current.scrollIntoView({behavior:'smooth',block: "start", inline: "nearest"});
    });
}
},[])

return (
    <>
<div style={{background:'darkblue',padding:'20px 0',margin:'10px 0'}} className='flex-row justify-center items-center text-center'>
<h5 className='text-white uppercase'>Ticket number : {selected}</h5>
<div style={{display:'block'}}>

{numbers.map((item)=>{
   return (
       <button type='button' key={item}
       className='m-1 text-black bg-yellow-200 px-2 text-xs mb-3 '
       onClick={()=>handleClick(item)}>{item}
           </button>
   )
})}
</div>

<button onClick={handleEnter}
      className='px-2 mx-2 bg-green-300' 
       >Enter</button>
<button onClick={()=>setSelected('')}
className='px-2 mx-2 bg-red-300'
       >Clear</button>

</div>
{
    !loading ? (
<div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:10,marginBottom:90}} ref={idref}>
    {users.map(item=>(
        <div style={{display:'block'}} key={item.id}>
<TicketViewer ticketdata={item?.ticket} color={item?.color} user={item}/>
        </div>
    ))}
</div>
    ):(<center>
        <div className={styles.loader}></div>
        </center>)
}

</>
    )
}

export default TicketEnter;