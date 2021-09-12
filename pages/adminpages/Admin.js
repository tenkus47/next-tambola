import axios from "axios";
import Sheetgenerate from "../../comps/SheetGenerator";
import { useState, useEffect } from "react";
import ShowAvailable from "../../comps/ShowAvailable";
import { socket } from "../../socket";
import { serverURL } from "../../servers";
import moment from "moment";
import styles from "../../styles/admin.module.css";

const Admin = () => {
  const [sheet, setSheet] = useState();
  const [option, setOption] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectlist, setSelectlist] = useState([]);
  const [time, setTime] = useState();
  useEffect(() => {
    socket.on("number", (item, list) => {
      // dispatch({type:'update',item,list})
    });
  }, [socket]);

  function mulgenerator(data) {
    dispatch({
      type: "sheetgenerate",
      data,
    });
    setTimeout(() => {
      window.location = "/adminpage";
    }, 1000);
  }
  const submitTime = () => {
    axios
      .post(serverURL + "/Timings", {
        time,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  const OrderTicket = async () => {
    console.log(option, username, mobile);
    await axios.patch(serverURL + "/changeusername", {
      id: option,
      username,
      mobile: mobile,
    });
    alert("order placed");
    setOption([]);
    setuserName(null);
    setmobile(0);
  };
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
{name:'Third Fullhouse'}
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
              placeholder="no. of ticket in sheet"
              type="text"
              onChange={(e) => setSheet(e.target.value)}
            />
            <Sheetgenerate numberOfTicket={sheet} create={mulgenerator} />
          </div>
        </form>
        <h3 className="font-bold my-3">Buyer Section</h3>
        <div className={styles.buyerSection}>
          {loading ? (
            <h3>Loading</h3>
          ) : (
            <select
              className={styles.listOfTickets}
              defaultValue={0}
              onChange={(e) => setOption((prev) => [...prev, e.target.value])}
            >
              {selectlist.map((item, index) => (
                <option key={index} className={styles.item - tickets}>
                  {item.id}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="username"
            className='text-center'
            onChange={(e) => setuserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="mobile"
            className='text-center'
            onChange={(e) => setmobile(e.target.value)}
          />
          <button type="button" onClick={OrderTicket} className={styles.btn}>
            placeOrder
          </button>
        </div>
        <div className={styles.Timing}>
          <h3 className='font-bold my-2'>Set Game Time</h3>
          <input
            type="datetime-local"
            onChange={(e) => console.log(moment(e.target.value._d))}
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
                onClick={clickStart}
                id="start-btn"
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
