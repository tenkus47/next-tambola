import styles from '../styles/Ticketviewer.module.css'
import { useSelector } from 'react-redux'

const TicketViewer=({ticketdata=[],color='rgba(23,32,43,0.4)',user={},donelist=[]})=>{

    const { random, list } = useSelector((state) => state.NumberGenerate);

   if(ticketdata.length>0) return (
        <div className={styles.ticketContainer} style={{backgroundColor:color}}>
           {user?.username&&(
<div style={{display:'flex',justifyContent:'space-between'}}>
<div className='text-sm'>Ticket ID:
{user.id<10? '00'+user?.id:user.id>9&&user.id<100?'0'+user.id:user.id}</div>
<div className='text-sm font-bold font-mono'>{user.username}</div>
</div>
           )
           }
         
                <div className={styles.Row} >
                    {ticketdata[0].map((item,index)=>(
                      <div className={styles.element} key={index+10}
                      style={list.includes(item) ?{backgroundColor:'#11324D',color:'white'}:null} 
                      >
                          {item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className={styles.Row}>
                {ticketdata[1].map((item,index)=>(
                      <div className={styles.element}  key={index+20} 
                      style={list.includes(item) ?{backgroundColor:'#11324D',color:'white'}:null} 
                      >{item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className={styles.Row}>
                {ticketdata[2].map((item,index)=>(
                      <div className={styles.element} key={index+30}  style={list.includes(item) ?{backgroundColor:'#11324D',color:'white'}:null} 
                      >{item===0?(''):(item)}</div>
                    ))}
                </div>
            </div>
    )
    return null
}
export default TicketViewer