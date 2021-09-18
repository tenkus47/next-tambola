import SellTicket from '../comps/SellTicket'
import Modal from 'react-modal'
import Link from 'next/link'
import  {useState} from 'react'

import styles from '../styles/TicketBuy.module.css'
import { customStyles2 } from './customModalStyle'
export default function TicketBuy(props) {
    const {setLoggedIn,agentData,ticketList,loading}= props
    const [selected,setSelected]=useState([]);
    const [openSell,setOpenSell]=useState(false);

    const handleSelect=(e)=>{
        var r=parseInt(e.target.value)
       if(selected.includes(r)){
             var d=selected.filter(item=>item!==r);
             setSelected(d);
       }
      if(!selected.includes(r)){
        setSelected(prev=>[...prev,r])
      }
    } 

    const handleLogout=()=>{
        localStorage.removeItem('agentKey');
        setLoggedIn(false);
    }

    var sd={width:'14%',backgroundColor:'lightgreen',border:'1px solid black'}
    var ns={width:'14%',backgroundColor:'red'}

    Modal.setAppElement('#__next')
    return (
        <div className='bg-blue-200'>
    <div className='flex justify-around'>
        <button  type='button' className='rounded bg-yellow-300 flex-1 mx-2' onClick={handleLogout}>LogOut</button>
       <Link  href={'/list/'+agentData._id}><a className='flex-1 rounded bg-yellow-300  mx-2'>  <button type='button'>Show my Tickets</button></a></Link>
        </div>
 
 <section className='w-full flex flex-wrap mt-5 mb-20 justify-center'>
{!loading &&
ticketList.map((ticket,index)=>(
<button className={styles.btn} style={!selected.includes(ticket.id)?sd:ns} key={index} disabled={ticket.username!=='Available'}  onClick={handleSelect} value={ticket.id}>{ticket.id}</button>
))
}
 </section>

 <Modal isOpen={openSell} style={customStyles2}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={true}
     onRequestClose={()=>setOpenSell(false)}
     >
      <SellTicket agentData={agentData} ticketlist={ticketList} selected={selected} setOpen={setOpenSell}/>
       </Modal>



<button style={{
    position:'fixed',
    bottom:'40px',
    right:'10px',
    zIndex:20,
    borderRadius:'50%',
    height:60,
    width:60,
    backgroundColor:'blue',
    color:'white'
}}
onClick={()=>setOpenSell(prev=>!prev)}
>
    SELL
</button>
        </div>
    )
}
