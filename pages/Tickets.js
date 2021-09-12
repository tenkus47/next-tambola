import styles from '../styles/Tickets.module.css'
import {useEffect,useState} from 'react'
import {serverURL} from '../servers'
import axios from 'axios';
import TicketViewer from '../comps/TicketViewer';
    import LoadingOverlay from 'react-loading-overlay';
    import ReactPaginate from 'react-paginate';

const Tickets=(list=[])=>{
    const [postPerPage]=useState(12)
    const [loading,setloading]=useState(false)
    const [lists,setlist]=useState([]);
    const [pageNumber,setPageNumber]=useState(0)
    const pagesVisited=pageNumber*postPerPage
    const pagecount=Math.ceil(lists.length/postPerPage)
  const currentPosts=lists.slice(pagesVisited,pagesVisited+postPerPage).sort((a,b)=>a.id-b.id);
    const changePage=({selected})=>{
      setPageNumber(selected);
    }
 useEffect(()=>{
 let pageloaded=true
  const getAllTicket=async()=>{
    setloading(true)

    if(pageloaded){
          const res=await  axios.get(serverURL+'/getlist')
          setlist(res.data)
 }

     } 
    getAllTicket();  
  if(lists.length>0){
    setloading(false)
  }
 return ()=>pageloaded=false
  },[lists])
return (
  <LoadingOverlay
  active={loading}
  spinner
  fadeSpeed={1000}
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
            
   {loading===false?     <TicketViewer ticketdata={item?.ticket} list={list} color={item?.color} />:null}
           </div>
   ))
   } 
  </div>
  </div>
  <ReactPaginate
  previousLabel={"previous"}
  nextLabel={"next"}
  pageCount={pagecount}
  onPageChange={changePage}
  containerClassName={styles.paginationBtns}
  previousLinkClassName={styles.previousBtns}
  nextClassName={styles.nextBtns}
  disabledClassName={styles.paginationDisablesBtn}
  activeClassName={'animate-bounce'}
  breakLabel={'...'}
  pageRangeDisplayed={3}
  marginPagesDisplayed={2}
  />
    </div>

    </LoadingOverlay>
)


   
}
export default Tickets;