import styles from '../styles/Tickets.module.css'
import {useEffect,useState} from 'react'
import {serverURL} from '../servers'
import axios from 'axios';
import TicketViewer from '../comps/TicketViewer';
    import {Pagination} from '../comps/Pagination';
    import LoadingOverlay from 'react-loading-overlay';

const Tickets=(list=[])=>{
    const [currentPage,setCurrentPage]=useState(1)
    const [postPerPage]=useState(12)
    const [loading,setloading]=useState(false)
    const [lists,setlist]=useState([]);

    const paginate=(number)=>{
        setCurrentPage(number)
    }
    const getAllTicket=async()=>{
      setloading(true)
            const res=await  axios.get(serverURL+'/getlist')
            setlist(res.data)
        
       } 

       const indexOfLastPost=currentPage*postPerPage;
       const indexOfFirstPost=indexOfLastPost-postPerPage;
       const currentPosts=lists.slice(indexOfFirstPost,indexOfLastPost).sort((a,b)=>a.id-b.id);
    
 useEffect(()=>{
    getAllTicket();
    if(lists.length>0){
      setloading(false)
    }
  },[lists])
return (
  <LoadingOverlay
  active={loading}
  spinner
  text='Loading your content...'
  >
    <div className='pb-20'> 
      <div style={{display:'flex',alignItems:'center',flexDirection:'column',flexWrap:'wrap',marginBottom:20}}>
  <div style={{color:'red',display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>

  {currentPosts.map((item,index)=>
   
   (
       <div key={index} style={{marginTop:10,marginLeft:5,marginRight:5}}>

        <div
         style={{backgroundColor:'#eee',display:'flex',justifyContent:'space-between' ,borderTop:'2px solid black',borderLeft:'2px solid black',borderRight:'2px solid black'}}>
              <div style={{color:'black'}}>Ticket:{
              item.id<10? '00'+item?.id:item.id>9&&item.id<100?'0'+item.id:item.id
            }</div>
              <div className={item?.username==='Available'?'font-bold text-red-600':'text-green-700'} > {item?.username} </div>

              {item.username==='Available' ?(<div>not sold</div>):(<div style={{color:'green'}}> sold</div>)} 
            </div>
            
        <TicketViewer ticketdata={item?.ticket} list={list} color={item?.color} />
           </div>
   ))
   } 
  </div>
  </div>
  <Pagination postsPerPage={postPerPage} TotalPosts={lists.length} paginate={paginate} currentpage={currentPage}/>
  <center><h5 className='text-black uppercase animate-bounce text-xs ' >swipe for more pages</h5></center>
    </div>

    </LoadingOverlay>
)


   
}
export default Tickets;