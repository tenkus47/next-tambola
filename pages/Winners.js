import styles from '../styles/Winner.module.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { serverURL } from '../servers';
import LoadingOverlay from 'react-loading-overlay';
import { socket } from "../socket";
import TicketViewer from '../comps/TicketViewer';



const Winners=()=>{
    const [table, setTable] = useState();
    const [loading,setloading]=useState(false)
    const [winnerlist, setwinnerlist] = useState([]);
    const [showElement, setShowElement] = useState({});
    useEffect(() => {
        var mounted=true
        var id = showElement.id ? parseInt(showElement.id) : 0;
        if(mounted){ const fetcher = async () => {
          
          var res = await axios.get(serverURL + `/getlist/${id}`);
          setTable(res.data[0]);
          }
        fetcher();
        
      };
        return ()=>mounted=false
      }, [showElement]);
    useEffect(() => {
      var mounted2=true
      setloading(true)
      
      if(mounted2){
      const fetchwinner=async()=>{
         var res= await axios.get(serverURL + "/getwinnerlist");
         if (res.data.length>0) {
          setwinnerlist(res.data[0].winnerlist);
        setloading(false)
        }
      }
     fetchwinner();
    }
      socket.connect();
      socket.on('winnerlist',data=>{
        setwinnerlist(data);
        setloading(false)
      })

      return ()=>mounted2=false

      }, []);
      function mapped(item, index) {
        return (
          <button
            key={index}
            type="button"
            onClick={() => setShowElement({ name: item[0], id: item[1] })}
          >
            <span style={{ display: "block" }}>
              {item[0]} Ticket:{item[1]}
            </span>
          </button>
        );
      }

    return (
<LoadingOverlay
  active={loading}
  spinner
  text='Loading Winnerlist...'
  >
        <div className={styles.winner}>
            <center>
          <div className="board mt-7">
            <h1 className='font-mono text-xl font-bold'>Winners</h1>
                        {winnerlist && (
              <div className={styles.winnerboard}>
                {showElement?.name&&showElement?.id ? (
              <div style={{marginBottom:40}}>
                <h3 className='font-serif font-bold'>
                  {" "}
                  {showElement.name} : {showElement.id}{" "}
                </h3>
                
                <TicketViewer
                  ticketdata={table?.ticket}
                  color={table?.color}
                />
              </div>
            ) : null}
                 {
                 winnerlist.map((winner,index)=>(
                  <div className={styles.listElement} key={index}>
                  {winner?.list.length>0 && winner?.name} {winner?.list.map(mapped)}{" "}
                </div>
                        ))
                 }
              </div>
            )}
          </div>
          
        </center>
        </div>
    
        </LoadingOverlay>
    )
    }
    export default Winners;