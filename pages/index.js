import styles from '../styles/Play.module.css'
import Timer from '../comps/Timer'
import Link from 'next/link'
import {arrayInitial} from '../comps/Variables'
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";
import { useSpeechSynthesis } from "react-speech-kit";
import { soundfile } from "../soundtext/soundtext";
import { useRouter } from 'next/router'
import { Howl } from "howler";
import { useEffect,useState } from 'react';
import TicketEnter from '../comps/ticketEnter';
import Modal from 'react-modal'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Fireworks } from 'fireworks-js/dist/react'
import {customStyles} from '../comps/customModalStyle'

export default function Play() {
  
Modal.setAppElement('#__next')
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const { speak } = useSpeechSynthesis(); 
   const [showcel,setshowcel]=useState();
   var [anouncedN,setanouncedN] = useState(false);
   const [gamedone,Setgamefinished]=useState();
   const dispatch = useDispatch();
   const [modalOpen,setModalOpen]=useState(false);
   const [winnerlist,setwinnerlist]=useState([]);
   const router = useRouter()
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("number", (item, list) => {
      dispatch({ type: "update", item, list });
    });
    socket.on("winnerListChanged",(data)=>{
      if(winnerlist!==data?.winnerlist){
        setwinnerlist(data?.winnerlist)
      }
    })
    socket.on("gamefinished", (data) => {
      setTimeout(() => {
        var sound = new Howl({
          src: ['audio/gamefinished.mp3'],
        });
        Setgamefinished(true);  
        sound.play();
        router.push('/Winners')
      }, 4000);
    });
    socket.on("gotoend", (data) => {
      alert(data);
    });
 
    socket.on("q5taken",()=>{
      setshowcel(true)
      setTimeout(() => {
        setshowcel(false);
        var sound = new Howl({
          src: ['audio/quick five.mp3'],
        });
        sound.play();
      }, 3000);
  
    })
    socket.on("temptaken",()=>{
      setshowcel(true)
      setTimeout(() => {
        setshowcel(false);
        var sound = new Howl({
          src: ['audio/temperature.mp3'],
        });
        sound.play();
      }, 3000);
  
    })
    socket.on("fourcornertaken",()=>{
      
      setshowcel(true)
      
      setTimeout(() => {
       
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/fourcorner.mp3'],
        });
      sound.play();
      
      }, 3500);
     
    })
    socket.on("firstlinetaken",()=>{
      setshowcel(true)
      
      setTimeout(() => {
     
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/firstline.mp3'],
        });
        sound.play();
      }, 3500);
      
        
    })
    socket.on("secondlinetaken",()=>{
      setshowcel(true)
    
      setTimeout(() => {
      
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/secondline.mp3'],
        });
       sound.play();
      },3500);
     
    })
    socket.on("thirdlinetaken",()=>{
     setshowcel(true)
 
      setTimeout(() => {
      
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/thirdline.mp3'],
        });
       sound.play();
      }, 3500);
     
    })
    socket.on("fullhousetaken",()=>{
      setshowcel(true)
     
      setTimeout(() => {

        
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/firstfh.mp3'],
        });
        sound.play();
      },3500);
    
    })
    socket.on("secondfullhousetaken",()=>{
      setshowcel(true)
  
      setTimeout(() => {
     
      setshowcel(false)
      var sound = new Howl({
        src: ['audio/secondfh.mp3'],
      });
      sound.play();
      }, 3500);
       
    })
    socket.on("thirdfullhousetaken",()=>{
      setshowcel(true)
    
      setTimeout(() => {
      
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/thirdfh.mp3'],
        });
       sound.play();
      },3500);
    })
    socket.on("halfSheetTaken",()=>{
      setshowcel(true)
      setTimeout(() => {
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/halfSheet.mp3'],
        });
       sound.play();
      },3500);
    })
    socket.on("fullsheetTaken",()=>{
      setshowcel(true)
      setTimeout(() => {
        setshowcel(false)
        var sound = new Howl({
          src: ['audio/sheetcorner.mp3'],
        });
       sound.play();
      },3500);
    })
    return ()=>socket.disconnect()
  }, []);
  useEffect(() => {
    if(random){
      setModalOpen(true);
    }
    var single = "";
    if (random > 0 && random < 10) {
      single = "single number ";
    }
    speak({
      text: soundfile[random - 1],
    });
    setTimeout(() => {
      speak({
        text: `${single} ${random}`,
      });
    }, 1500);


    setTimeout(()=>{
     setModalOpen(false);
    },3000)
  }, [random]);
  

  const { width, height } = useWindowSize()
  const style = {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transparent'
  }
  const options = {
    speed: 3,
    sound:{enable:true,files:['audio/cheer.mp3']},
    
  }
  return (
    <div>
      {showcel &&  <Confetti
      width={width}
      height={height}
    />}
    {showcel&& <Fireworks options={options} style={style}
     />}
      <div className='flex flex-col justify-center items-center gap-2 mb-2 '>
               <button className='bg-red-800 text-white px-2 rounded py-1'> <Link href='/Agentslist'><a>Agents</a></Link></button>
               <button className='bg-blue-800 text-white px-2 rounded py-1' onClick={()=>setanouncedN(prev=>!prev)}>{!anouncedN? ('Show') :('Hide')} Anouced with Order</button>
               <div className='flex justify-center items-center p-2 flex-wrap text-xs '>{anouncedN&& list.map(item=>(
                 <div key={item} className='mr-2 p-1 rounded-full bg-yellow-500 h-6 w-6 mt-1 flex items-center justify-center'>{item}</div>))}</div>
    </div>
     <div className={styles.anouncedlist}>
     {!random && <Timer/>} 
     <Modal isOpen={modalOpen} style={customStyles}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={false}
     onRequestClose={()=>setModalOpen(false)}
     >
       <h1>{random}</h1> 
       </Modal>
        {winnerlist.length>0 && <h3 className='text-xl font-bold font-mono'>Completed</h3>}
         <div className='flex flex-wrap'> {winnerlist.map((item,index)=>{
          if( item?.list.length!==0){
            return (<div key={index} className='mr-2 mt-1 bg-red-700 text-white block rounded px-1'>{item.name}</div>)
          }  
         }
         )}
         </div>
         <h3 className='text-xl font-bold font-mono'>GAME BOARD</h3>
         <div>
            {arrayInitial.map((item, index) => (
              <button
                style={
                  list.includes(item)
                    ? {
                        border:'1px solid black',
                        borderRadius: 20,
                        fontSize:'10px',
                        backgroundColor:
                          item === list[list.length - 1] ? "red" : "green",
                        color:'white'
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight:'900',
                        fontSize:'10px',
                        padding:3,
                        color: "black",
                        border:'1px solid black',
                        borderRadius: "50%"
                      }
                }
                type="text"
                key={index}
                className="btn-board"
              >
                {item}
              </button>
            ))}
            </div>
          </div>
    


<TicketEnter/>
    </div>
  )
}
