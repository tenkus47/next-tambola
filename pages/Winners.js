import styles from '../styles/Winner.module.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { serverURL } from '../servers';
import LoadingOverlay from 'react-loading-overlay';
import { socket } from "../socket";
import TicketViewer from '../comps/TicketViewer';
import { useDispatch,useSelector } from 'react-redux';
import { Howl } from "howler";
import Modal from 'react-modal'
import {customStyles} from '../comps/customModalStyle'

const Winners=()=>{
  
Modal.setAppElement('#__next')
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const dispatch =useDispatch();
    const [table, setTable] = useState();
    const [loading,setloading]=useState(false)
    const [winnerlist, setwinnerlist] = useState([]);
    const [showElement, setShowElement] = useState({});
    const [modalOpen,setModalOpen]=useState(false);
 
    useEffect(()=>{
      if(random){
        setModalOpen(true);
      }
      setTimeout(()=>{
        setModalOpen(false);
       },3000)
    },[random])
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
      
      socket.connect();
      socket.on("number", (item, list) => {
        dispatch({ type: "update", item, list });
      });
     
      socket.on('gamefinished',()=>{
        setTimeout(() => {
          var sound = new Howl({
            src: ['audio/gamefinished.mp3'],
          });
          sound.play();
        }, 3000);
      })
      socket.on("winnerListChanged",(data)=>{
        if(winnerlist!==data?.winnerlist){
          setwinnerlist(data?.winnerlist)
        }
      })

      return ()=>socket.disconnect()

      }, []);

useEffect(()=>{
  let pageloaded=true
 
  const fetchwinner=async()=>{
  setloading(true)
  if(pageloaded){
     var res= await axios.get(serverURL + "/getwinnerlist"); 
      setwinnerlist(res?.data[0]?.winnerlist);
      setloading(false)
  }
    }
  
 fetchwinner();

return ()=>pageloaded=false
},[])



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
    <Modal isOpen={modalOpen} style={customStyles}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={false}
     onRequestClose={()=>setModalOpen(false)}
     >
       <h1>{random}</h1> 
       </Modal>
        <div className={styles.winner}>
            <center>
          <div className="board mt-7">
            <h1 className='font-mono text-xl font-bold'>Winners</h1>
                        {winnerlist && (
              <div className={styles.winnerboard}>
                {showElement?.name&&showElement?.id ? (
              <div style={{marginBottom:40}}>
                <h3 className='font-serif font-bold capitalize'>
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
                 winnerlist?.map((winner,index)=>(
                  <div className={styles.listElement} key={index}>
                  {winner?.list?.length>0 && winner?.name} {winner?.list?.map(mapped)}{" "}
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