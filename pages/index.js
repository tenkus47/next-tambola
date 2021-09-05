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
import Timer from '../comps/Timer';
import TicketViewer from '../comps/TicketViewer'
import TicketEnter from '../comps/ticketEnter';

export default function Play() {
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const { speak } = useSpeechSynthesis();
  var showRand = ""; 
  const [table, setTable] = useState();
   const [winnerlist, setwinnerlist] = useState();
   const [listofwinner, setlistofwinner] = useState(false);
   const [showcel,setshowcel]=useState();
 const [showornot,setShowornot]=useState('show');
   var [anouncedN,setanouncedN] = useState();
   const [showElement, setShowElement] = useState({});
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

    showRand = random;
    setInterval(() => {
      showRand = "";
    }, 3000);
  }, [random]);
  useEffect(() => {
    var id = showElement.id ? parseInt(showElement.id) : 0;
    const fetcher = async () => {
      var res = await axios.get(serverURL + `/getlist/${id}`);
     setTable(res.data[0]);
    };
    fetcher();
  }, [showElement]);
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

  useEffect(() => {
    axios.get(serverURL + "/getwinnerlist").then((res) => {
      if (res.data[res.data.length - 1]?.thirdfullhouseWinner.length > 0) {
        // var newDate = res.data[res.data.length - 1].date;
        // var daten = new Date(
        //   newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000
        // );
        // var writedate = `${daten.getDate()}-${daten.getMonth()}-${daten.getFullYear()}`;
        // setDate(writedate);
        setwinnerlist({
          firstlineWinner: res.data[res.data.length - 1].firstlineWinner,
          secondlineWinner: res.data[res.data.length - 1].secondlineWinner,
          thirdlineWinner: res.data[res.data.length - 1].thirdlineWinner,
          fourcornerWinner: res.data[res.data.length - 1].fourcornerWinner,
          tempwinner: res.data[res.data.length - 1].temperatureWinner,
          q5winner: res.data[res.data.length - 1].quickfiveWinner,
          fullhouseWinner: res.data[res.data.length - 1].fullhouseWinner,
          secondfullhouseWinner:
            res.data[res.data.length - 1].secondfullhouseWinner,
          thirdfullhouseWinner:
            res.data[res.data.length - 1].thirdfullhouseWinner,
        });
        setlistofwinner(true);
      }
    });
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
    <div className={styles.playroom}>

{!random&& <div style={{paddingTop:30,fontFamily:'sans-serif',fontWeight:900}}>
  The Game is Starting soon,We Hope you Enjoy the game!
  <br/>
  </div>}

  <TicketEnter/>

      {random && <div className={styles.anouncedlist}>
         <h3>GAME BOARD</h3>
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
          </div>}
        { random &&
            <div className={styles.random}>
                         {random}
                              </div>
        }

<center>
          <div className="board">
            
                        {winnerlist && (
              <div className={styles.winnerboard}>
                <h1 className="winnertitle">winnerlist</h1>
                <div className={styles.listElement}>
                  quick five : {winnerlist?.q5winner.map(mapped)}{" "}
                </div>
                {/* <div className='listElement '>temperature  :  {winnerlist?.tempwinner.map(mapped)}  </div> */}
                <div className={styles.listElement}>
                  Four corner : {winnerlist?.fourcornerWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  First line : {winnerlist?.firstlineWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  Second line : {winnerlist?.secondlineWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  Third line : {winnerlist?.thirdlineWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  First fullhouse : {winnerlist?.fullhouseWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  Second fullhouse :{" "}
                  {winnerlist?.secondfullhouseWinner.map(mapped)}{" "}
                </div>
                <div className={styles.listElement}>
                  Third fullhouse :{" "}
                  {winnerlist?.thirdfullhouseWinner.map(mapped)}{" "}
                </div>
              </div>
            )}
          </div>
          {showElement?.name&&showElement?.id ? (
              <div style={{marginBottom:40}}>
                <h3>
                  {" "}
                  {showElement.name} : {showElement.id}{" "}
                </h3>
                
                <TicketViewer
                  ticketdata={table?.ticket}
                  color={"hsl(134,49%,70%)"}
                />
              </div>
            ) : null}
        </center>
    </div>
  )
}
