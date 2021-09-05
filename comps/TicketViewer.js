import styles from '../styles/Ticketviewer.module.css'


const TicketViewer=({ticketdata=[],color='rgba(23,32,43,0.4)',user={}})=>{
   if(ticketdata.length>0) return (
        <div className={styles.ticketContainer} style={{backgroundColor:color}}>
           {user?.username&&(
<div style={{display:'flex',justifyContent:'space-between'}}>
<div>Ticket ID:{user.id}</div>
<div>{user.username}</div>
</div>
           )
           }
         
                <div className={styles.Row}>
                    {ticketdata[0].map((item,index)=>(
                      <div className={styles.element} key={index+10} >
                          {item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className={styles.Row}>
                {ticketdata[1].map((item,index)=>(
                      <div className={styles.element}  key={index+20}>{item===0?(''):(item)}</div>
                    ))}
                </div>
                <div className={styles.Row}>
                {ticketdata[2].map((item,index)=>(
                      <div className={styles.element} key={index+30}>{item===0?(''):(item)}</div>
                    ))}
                </div>
            </div>
    )
    return null
}
export default TicketViewer