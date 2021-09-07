import styles from '../styles/Tickets.module.css'
import {useEffect,useState} from 'react'
import {serverURL} from '../servers'
import axios from 'axios';
import TicketViewer from '../comps/TicketViewer';
    import {Pagination} from '../comps/Pagination';

const Tickets=(list=[])=>{
    const [currentPage,setCurrentPage]=useState(1)
    const [postPerPage]=useState(12)
    const [lists,setlist]=useState([]);

    const paginate=(number)=>{
        setCurrentPage(number)
    }
    const getAllTicket=async()=>{
            const res=await  axios.get(serverURL+'/getlist')
            setlist(res.data)
        
       } 

       const indexOfLastPost=currentPage*postPerPage;
       const indexOfFirstPost=indexOfLastPost-postPerPage;
       const currentPosts=lists.slice(indexOfFirstPost,indexOfLastPost).sort((a,b)=>a.id-b.id);
    
 useEffect(()=>{
    getAllTicket();

  },[])

return (
    <div className='pb-20'> 
<div style={{display:'flex',alignItems:'center',flexDirection:'column',flexWrap:'wrap'}}>
  <div style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>

  {currentPosts.map((item,index)=>
   
   (
       <div key={index} style={{margin:20}}>
              <div style={{color:'red',fontSize:15}}> {item?.username} </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{color:'black'}}>Ticket:{
              item.id<10? '00'+item?.id:item.id>9&&item.id<100?'0'+item.id:item.id
              }</div>
              {item.username==='Available' ?(<div>not sold</div>):(<div style={{color:'green'}}> sold</div>)} 
            </div>
            
        <TicketViewer ticketdata={item?.ticket} list={list} color={item?.color} />
           </div>
   ))
   } 
  </div>
  </div>
  <Pagination postsPerPage={postPerPage} TotalPosts={lists.length} paginate={paginate} currentpage={currentPage}/>
    </div>
)
}
export default Tickets;