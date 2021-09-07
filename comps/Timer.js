import axios from 'axios'
import {useState,useEffect} from 'react'
import { serverURL } from '../servers'
import { ClockIcon } from '@heroicons/react/solid'
function Timer() {

    const [timerDays,setTimerDays]=useState()
    const [timerHours,setTimerHours]=useState()
    const [timerMinutes,setTimerMinutes]=useState()
    const [timerSeconds,setTimerSeconds]=useState()
const [timeactual,setActualdate]=useState()

    let interval;
    const startTimer=async()=>{
      var res= await axios.get(serverURL+'/Timings')
      const countDownDate=new Date(res.data[0].startTime).getTime();
      setActualdate(new Date(res.data[0].startTime));
      interval=setInterval(()=>{
       const now=new Date().getTime();
       const distance=countDownDate-now;
       const days=Math.floor(distance/(24*60*60*1000))
       const hours=Math.floor((distance%(24*60*60*1000))/(1000*60*60))
       const minutes=Math.floor((distance%(60*60*1000))/(1000*60))
       const seconds=Math.floor((distance%(60*1000))/(1000))
  
        if(distance<0){
          clearInterval(interval.current)
        }else{
          setTimerDays(days)
          setTimerHours(hours)
          setTimerMinutes(minutes)
          setTimerSeconds(seconds)
        }
      },1000)
  
    }
  useEffect(()=>{
    startTimer();
      return ()=>clearInterval(interval)
  },[timerSeconds])

if(timerDays===0&&timerHours===0&&timerMinutes===0&&timerSeconds===0){
  return null
}
    return (
      
        <div  style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'white',borderRadius:10}}>
           <div  style={{display:'flex',color:'#06f1f6',borderRadius:10,
        fontSize:'10px',textShadow:'1px 1px 7px',margin:10,backgroundColor:'#051817',width:'max-content',padding:3}}
           > <span>{timerDays} Days </span>-
            <span>{timerHours} Hours </span>-
            <span>{timerMinutes} Minutes </span>-
            <span>{timerSeconds} Seconds </span></div>
            <div className='text-xs bg-black px-1 py-1/2 flex rounded-xl'>
           <div>
           <ClockIcon className='h-5 w-5 mr-3 '/>
             </div>   
<div>
{timeactual?.getDate()}:{

timeactual?.getMonth()<10 ?'0'+timeactual?.getMonth():timeactual?.getMonth()

}:{timeactual?.getFullYear()}
  </div>  
            </div>
        </div>
    )
}

export default Timer
