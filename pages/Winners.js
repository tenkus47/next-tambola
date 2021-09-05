import styles from '../styles/Winner.module.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { serverURL } from '../servers';
import TicketViewer from '../comps/TicketViewer';
const Winners=()=>{
    const [table, setTable] = useState();

    const [listofwinner, setlistofwinner] = useState(false);
    const [showElement, setShowElement] = useState({});
    useEffect(() => {
        var id = showElement.id ? parseInt(showElement.id) : 0;
        const fetcher = async () => {
          var res = await axios.get(serverURL + `/getlist/${id}`);
         setTable(res.data[0]);
        };
        fetcher();
      }, [showElement]);
    useEffect(() => {
        axios.get(serverURL + "/getwinnerlist").then((res) => {
          if (res.data[res.data.length - 1]?.thirdfullhouseWinner.length > 0) {
         
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
    const [winnerlist, setwinnerlist] = useState();

    return (
        <div className={styles.winner}>
            <center>
          <div className="board">
            
                        {winnerlist && (
              <div className={styles.winnerboard}>
                {showElement?.name&&showElement?.id ? (
              <div style={{marginBottom:40}}>
                <h3>
                  {" "}
                  {showElement.name} : {showElement.id}{" "}
                </h3>
                
                <TicketViewer
                  ticketdata={table?.ticket}
                  color={table?.color}
                />
              </div>
            ) : null}
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
          
        </center>
        </div>
    )
    }
    export default Winners;