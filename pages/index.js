import styles from '../styles/Play.module.css'

import {arrayInitial} from '../comps/Variables'
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";
import { useSpeechSynthesis } from "react-speech-kit";
import { soundfile } from "../soundtext/soundtext";
import axios from 'axios'
import {serverURL} from '../servers'
import { Howl } from "howler";
import { useEffect,useState } from 'react';
import TicketViewer from '../comps/TicketViewer'
import TicketEnter from '../comps/ticketEnter';

export default function Play() {
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const { speak } = useSpeechSynthesis(); 
   const [showcel,setshowcel]=useState();
 const [showornot,setShowornot]=useState('show');
   var [anouncedN,setanouncedN] = useState();
   const [showRandom ,setShowRandom]=useState(false);
   const dispatch = useDispatch();

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
      }, 4000);
    });
    socket.on("winnerlist", (data) => {
      setwinnerlist(data);
    });
    socket.on("gotoend", (data) => {
      alert(data);
    });
 
    socket.on("q5taken",()=>{
      setshowcel(true)
      setTimeout(() => {
        setshowcel(false);
        var sound = new Howl({
          src: [quickFiveC],
        });
        id1 = sound.play();
      }, 3000);
  
    })
    socket.on("fourcornertaken",()=>{
      
      setshowcel(true)
      
      setTimeout(() => {
       
        setshowcel(false)
      
      }, 3500);
     
    })
    socket.on("firstlinetaken",()=>{
      setshowcel(true)
      
      setTimeout(() => {
     
        setshowcel(false)
       
      }, 3500);
      
        
    })
    socket.on("secondlinetaken",()=>{
      setshowcel(true)
    
      setTimeout(() => {
      
        setshowcel(false)
   
      },3500);
     
    })
    socket.on("thirdlinetaken",()=>{
     setshowcel(true)
 
      setTimeout(() => {
      
        setshowcel(false)
       
      }, 3500);
     
    })
    socket.on("fullhousetaken",()=>{
      setshowcel(true)
     
      setTimeout(() => {

        
        setshowcel(false)
       
      },3500);
    
    })
    socket.on("secondfullhousetaken",()=>{
      setshowcel(true)
  
      setTimeout(() => {
     
      setshowcel(false)
     
      }, 3500);
       
    })
    socket.on("thirdfullhousetaken",()=>{
      setshowcel(true)
    
      setTimeout(() => {
      
        setshowcel(false)
 
      },3500);
    })
    
  }, []);
  useEffect(() => {
    if(random){
      setShowRandom(true);
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
     setShowRandom(false);
    },2000)
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



  return (
    <div className=''>
     <div className={styles.anouncedlist}>
         <h3 className='text-xl font-bold font-mono'>GAME BOARD</h3>
            {arrayInitial.map((item, index) => (
              <button
                style={
                  list.includes(item)
                    ? {
                        border:'1px solid black',
                        borderRadius: 20,
                        fontWeight:'900',
                        backgroundColor:
                          item === list[list.length - 1] ? "red" : "green",
                        color:
                          item === list[list.length - 1] ? "black" : "white",
                        fontSize:
                          item === list[list.length - 1] ? 18 : "inherit"
                      }
                    : {
                        backgroundColor: "white",
                        fontWeight:'900',
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
        { showRandom &&
            <div className={styles.random}>
                         {random}
                              </div>
        }


<TicketEnter/>
    </div>
  )
}
