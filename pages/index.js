import styles from '../styles/Play.module.css'
import Timer from '../comps/Timer'
import Link from 'next/link'
import {arrayInitial} from '../comps/Variables'
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";
import { useSpeechSynthesis } from "react-speech-kit";
import { soundfile } from "../soundtext/soundtext";
import axios from 'axios'
import { useRouter } from 'next/router'
import {serverURL} from '../servers'
import { Howl } from "howler";
import { useEffect,useState } from 'react';
import TicketEnter from '../comps/ticketEnter';
import Modal from 'react-modal'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Fireworks } from 'fireworks-js/dist/react'
export default function Play() {
  
Modal.setAppElement('#__next')
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const { speak } = useSpeechSynthesis(); 
   const [showcel,setshowcel]=useState();
   var [anouncedN,setanouncedN] = useState();
   const [gamedone,Setgamefinished]=useState();
   const dispatch = useDispatch();
   const [modalOpen,setModalOpen]=useState(false);
   const router = useRouter()
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("number", (item, list) => {
      dispatch({ type: "update", item, list });
    });
    socket.on("gamefinished", (data) => {
      setTimeout(() => {
        Setgamefinished(true);
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
  
  useEffect(() => {
    const fetcher = async () => {
      var { data } = await axios.get(serverURL + "/anounced");
      var res = data[data.length - 1];
      setTimeout(()=>{
        setanouncedN({
          list: res?.list,
          random: res?.random,
        });
      },500) 
 
    };
    fetcher();

    
  }, [random]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height:'80px',
      width:'80px',
      boxShadow:'0 0 10px 10px black',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor:'black',
      color:'white',
      fontSize:'30px',
      fontFamily:'serif',
      overflow:'hidden',
    }
    
  };
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
      <div className='flex justify-center mb-2'>
               <button className='bg-red-800 text-white px-2 rounded py-1'> <Link href='/Agentslist'><a>Agents</a></Link></button>
    </div>
     <div className={styles.anouncedlist}>
     <Timer/> 
     <Modal isOpen={modalOpen} style={customStyles}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={false}
     onRequestClose={()=>setModalOpen(false)}
     >
       <h1>{random}</h1> 
       </Modal>
         <h3 className='text-xl font-bold font-mono'>GAME BOARD</h3>
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
    


<TicketEnter/>
    </div>
  )
}
