import axios from "axios";
import { useState, useEffect } from "react";
import ShowAvailable from "../comps/ShowAvailable";
import { socket } from "../socket";
import { serverURL } from "../servers";
import styles from "../../styles/admin.module.css";
import { useDispatch,useSelector } from "react-redux";
import {updateBingoSerie} from '../comps/sheetGenerator'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Arrayremove from '../comps/Arrayremove'
import { getUnique } from "../comps/getUnique";
const Admin = () => {
 
  const [sheet, setSheet] = useState();
  const [option, setOption] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectlist, setSelectlist] = useState([]);
  const [time, setTime] = useState();
  const [message, setmessage] = useState();
  const dispatch=useDispatch();
  const [username,setuserName]=useState('');
  const [mobile,setmobile]=useState('');

  const [creating,setCreating]=useState(false);
  const [percentage,setpercentage]=useState(0);
  const [status,setStatus]=useState('');

  useEffect(()=>{
   
    let pageloaded=true
    const fetcher=async()=>{
      setloading(true)
      if(pageloaded){
      const res=await axios.get(serverURL+'/getList')
      var ar=res.data.sort((a,b)=>a.id-b.id)
      var filtered=ar.filter(item=>item.username==='Available')
      setSelectlist(filtered)
    }
    }
    fetcher()

    if(selectlist.length!==0){
      setloading(false)
  }
    return ()=>pageloaded=false
  },[selectlist])

  useEffect(() => {
    socket.on("number", (item, list) => {
      dispatch({type:'update',item,list})
    });
  }, [socket]);

  
var timeout = null;
  let sleep = (ms) =>
  new Promise((resolve) => (  timeout = setTimeout(resolve, ms)));
  const  mulgenerator=async()=> {
    setCreating(true);
    setStatus('active')

    for(var r=0;r<101;r+=100/sheet){
      setpercentage(Math.floor(r));
      if(r!==0){
      var res= updateBingoSerie();
         dispatch({
           type: "sheetgenerate",
            data:res,
         });
     
       await sleep(1000)
      }
    }
    setStatus('success')
    setCreating(false)
  }


  const submitTime = () => {
    axios
      .post(serverURL + "/Timings", {
        time,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  const OrderTicket =async () => {
  await axios.patch(serverURL + "/changeusername", {
      id: option,
      username,
      mobile: mobile,
    })
    
  };
  const clickSave=async()=>{
  const res= await axios.get(serverURL+'/start',{params:{
  condition:true,listing:checkedlist
  }});
  console.log(res);
  }
  const clickStart = () => {
    socket.emit("starts", {condition:true,listing:checkedlist},);
  };
  const clickStop = () => {
    socket.emit("starts", false);
    console.log("stop");
  };
  const clickmessage = () => {
    socket.emit("message", message);
  };
  const clickend = () => {
    axios.get(serverURL + "/system/reboot").then((res) => {
      console.log(res);
    });
  };
  const clickreset = () => {
    // eslint-disable-next-line no-restricted-globals
    var r = confirm("Press a button!");
    if (r === true) {
      axios.get(serverURL + "/reset").then((res) => {
        console.log("reset");
      });
      alert("data is wiped and reset");
    } else {
      alert("nothing has changed");
    }
  };

  const clickplayerreset = () => {
    // eslint-disable-next-line no-restricted-globals
    var r = confirm("Press a button!");
    if (r === true) {
      axios.get(serverURL + "/playerremove").then((res) => {
        console.log("reset");
      });
      alert("playerdata is wiped and reset");
    } else {
      alert("nothing has changed");
    }
  };
const winnerlistoption=[{name:'Quick Five'},
{name:'Temperature'},
{name:'Four Corners'},
{name:'Top Line'},
{name:'Middle Line'},
{name:'Bottom Line'},
{name:'Fullhouse'},
{name:'Second Fullhouse'},
{name:'Third Fullhouse'},
{name:'Half Sheet'},
{name:'Full Sheet'}

];
const [checkedlist,setCheckedlist]=useState([]);
const handlecheckbox=(e)=>{
   if(e.target.checked){
           setCheckedlist([...checkedlist,e.target.value])
        }
        else{
          const arrays=checkedlist
          const index = arrays.indexOf(e.target.value);
          if (index > -1) {
                 arrays.splice(index, 1);
                          }
          setCheckedlist(arrays)
        }
}
const removeFromList=(e)=>{
  var prev=option;
   var newa=Arrayremove(prev,e.target.value);
  setOption([...newa])
}
const reset=()=>{
  setmobile('')
  setuserName('')
  setOption([])
}
return (
    <center>
      <div
        className={styles.TicketGenerate}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: 10,
          backgroundColor: "lime",
          maxWidth: 500,
          padding: 25,
        }}
      >
        <h1 className="font-bold">Main Admin Tambola</h1>

        <form
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: 20,
              display: "flex",
              marginBotton: 10,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              min="1"
              max="6"
              style={{ padding: 7, borderRadius: 3 }}
              placeholder="no. of sheet"
              type="text"
              onChange={(e) => setSheet(e.target.value)}
            />
         
         {creating?(<Progress percent={percentage} status={status}  theme={
    {
      error: {
        symbol: percentage + '%',
        trailColor: 'pink',
        color: 'red'
      },
      default: {
        symbol: percentage+ '%',
        trailColor: 'lightblue',
        color: 'blue'
      },
      active: {
        symbol: percentage+ '%',
        trailColor: 'yellow',
        color: 'orange'
      },
      success: {
        symbol: percentage + '%',
        trailColor: 'lime',
        color: 'green'
      }
    } }
/>  ):
         ( <center><button type='button' className='bg-blue-500 rounded p-1 font-bold mt-1' onClick={mulgenerator}>create</button></center>)
         }  
         
         
         
          </div>
        </form>
        <h3 className="font-bold my-3">Buyer Section</h3>
        <div className={styles.buyerSection}>
    <div>{
      option.map(o=><button 
        key={o}
        type='button'
        className='m-2'
        value={o}
        onClick={removeFromList}>{o}</button>)
      }</div>
          {loading ? (
            <h3>Loading</h3>
          ) : (
            <select
              className={styles.listOfTickets}
              defaultValue={0}
              onChange={(e) => setOption((prev) => getUnique([...prev, e.target.value]))}
            >
              {selectlist.map((item, index) => (
                <option key={index} className={styles.item}>
                  {item.id}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="username"
            className='text-center'
            value={username}
            onChange={(e) => setuserName(e.target.value)}
          />
          <input
            type="text"
            value={mobile}
            placeholder="mobile"
            className='text-center'
            onChange={(e) => setmobile(e.target.value)}
          />
          <button type="button" onClick={()=>{
            OrderTicket();
            reset();
      }} className={styles.btn}>
            placeOrder
          </button>
        </div>
        <div className={styles.Timing}>
          <h3 className='font-bold my-2'>Set Game Time</h3>
          <input
            type="datetime-local"
            onChange={(e) => setTime(new Date( e.target.value ))}
          />
          <button onClick={submitTime} className={styles.btn}>set GameTime</button>
        </div>
        <br />
        <div>
          {winnerlistoption.map(({name},index)=>(
           <div key={index} className='options'>
                 <input type='checkbox' value={name} onChange={handlecheckbox}/>
                <label>{name}</label> 
           </div>
          ))}
        </div>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              {" "}
              <button
                onClick={clickSave}
                id="start-btn"
                className={styles.btncontrol}
              >
                save and start
              </button>
              <button
                onClick={clickStart}
                className={styles.btncontrol}
              >
                start
              </button>
              <button
                onClick={clickStop}
                className={styles.btncontrol}
              >
                stop
              </button>
              <button
                onClick={clickreset}
                id="stop-btn"
                className={styles.btncontrol}
              >
                winner reset
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" ,margin:'10px',gap:5}}>
            <textarea
              onChange={(e) => setmessage(e.target.value)}
              placeholder="message"
              className='rounded p-1'
            />
            <button
              onClick={clickmessage}
              id="stop-btn"
              className={styles.btncontrol}
            >
              send message
            </button>
          </div>
          <button
            onClick={clickend}
            style={{ display: "block", backgroundColor: "red" }}
            id="stop-btn"
            className={styles.btncontrol}
          >
            end server
          </button>
          <button
                onClick={clickplayerreset}
                className={styles.btncontrol}
              >
                Playerlist delete
              </button>
      </div>

      <center>
        <div style={{ marginBottom: 20 }}>
          <ShowAvailable />
        </div>
      </center>
    </center>
  );
};
export default Admin;
