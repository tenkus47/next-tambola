import {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import {serverURL} from '../servers'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

export default function sellTicket({
agentData,ticketlist,selected,
setOpen,setSelected
}) {const usernameref=useRef(null)
    const [username,setuserName]=useState('');
    const [mobile,setmobile]=useState('');
    var randomNumber=useRef([]);
    var fullsheetNumber=useRef([]);
    var halfsheetNumber=useRef([]);
    var fullsheetList=[1,2,3,4,5,6]
    var halfsheetList=[1,2,3]
   var fullsheetStart=[]
   var halfsheetStart=[]
   var [percentage,setPercentage]=useState(0);
   var [status,setStatus]=useState('');


    const selectedIn=selected.sort((a,b)=>a-b)
    useEffect(()=>{
     usernameref.current.focus();
        for(var u=1;u<ticketlist.length;u=u+6){
            fullsheetStart.push(u)
        }
    
        for(var s=1;s<ticketlist.length;s=s+3){
            halfsheetStart.push(s)
        }
   for(var i=0;i<ticketlist.length;i++){
    var fullsheet=fullsheetList, halfsheet=halfsheetList;
    var fh=selectedIn.filter(item=>fullsheet.includes(item))
   
    if(fh.length===fullsheet.length && fullsheetStart.includes(fh[0])){
        // 
        if(fh.length!==0){
            fullsheetNumber.current=[...fullsheetNumber?.current,...fh]
        }
    } 
    else if(fh.length>3){
        var perChunk = 3
        var result = fh.reduce((resultArray, item, index) => { 
            const chunkIndex = Math.floor(index/perChunk)
          
            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
          }, [])

          result.map(item=>{
              if(halfsheetStart.includes(item[0]) &&item.length===3){
            halfsheetNumber.current=[...halfsheetNumber?.current,...item]          
              }
              if(halfsheetStart.includes(item[0]) &&item.length!==3){
                randomNumber.current=[...randomNumber?.current,...item]
              }
              var istrue=halfsheetStart.includes(item[0])
              if(istrue){
                  console.log(istrue)
                randomNumber.current=[...randomNumber?.current,...item]
              }
          })
          console.log(selectedIn)
    } 

    else if(fh.length===3&&halfsheetStart.includes(fh[0])){
        if(halfsheetStart.includes(fh[0])){
            halfsheetNumber.current=[...halfsheetNumber?.current,...fh]          
        }   
    }
    else{
        if(fh.length!==0){
            randomNumber.current=[...randomNumber?.current,...fh]
             
        }
    }
  

          for(var o=0;o<6;o++){
        fullsheet[o]=fullsheet[5]+(o+1);
        }
        for(var p=0;p<3;p++){
            halfsheet[p]=halfsheet[2]+(p+1)
        }
    }
    fullsheetStart=[]
    halfsheetStart=[]
    return ()=>{
        randomNumber.current=[]
         fullsheetNumber.current=[]
         halfsheetNumber.current=[]
    }
    },[selected])

  const OrderTicket=()=>{
  if(username===''||mobile===''){
alert("input can't be empty")
  }
else{
     async function create(){  
        await axios.patch(serverURL+'/changeusername',{
        id:selected,
        username,
        agentName:agentData?.name,
        mobile:mobile
         })
        }
create();
setStatus('active')
var count=0;
var counter=5;
var timer=setInterval(()=>{
setPercentage(count)
count=count+counter;
if(count>50 && count<80){
setStatus('default')
}
if(count>100){
setStatus('success');
clearInterval(timer);
setOpen(false)
}
 },200)
          
         setuserName('')
         setmobile(0)
         setSelected([])
    }
  }

const flexstyler='flex-wrap flex items-center justify-end'
const btn='mx-1 bg-blue-400 px-1 rounded-full mb-1'
    return (
        <div className='flex flex-col gap-3 flex-wrap'>
            <div className='absolute right-3 top-1 rounded-full bg-red-500 w-7 h-7 flex items-center justify-center ' onClick={()=>setOpen(false)}>x</div>
       <h6 className='font-serif'>Fullsheet</h6> <div className={flexstyler}> {fullsheetNumber?.current?.map(item=><span key={item}  className={btn}>{item}</span>)} </div>
       Halfsheet  <div className={flexstyler}>{halfsheetNumber?.current?.map(item=><span key={item} className={btn} >{item}</span>)} </div>
       Random Tickets <div className={flexstyler}>  {randomNumber?.current?.map(item=><span key={item} className={btn} >{item}</span>)} </div>
      
        <input type='text' className='text-black text-center rounded' placeholder='username' onChange={(e)=>setuserName(e.target.value)} value={username} ref={usernameref}/>
        <input type='text' placeholder='mobile' className='text-black  text-center rounded' onChange={(e)=>setmobile(e.target.value)} value={mobile}/>
        <button type='button' onClick={OrderTicket} className='rounded bg-green-300 text-black'> placeOrder </button>
        <div className='flex justify-center w-full text-white bg-gray-400 rounded-xl'>
      {percentage!==0 &&  <Progress percent={percentage} status={status} width={50} 
  strokeWidth={3} theme={
    {
      error: {
        symbol: percentage + '%',
        trailColor: 'pink',
        color: 'red'
      },
      default: {
        symbol: percentage + '%',
        trailColor: 'lightblue',
        color: 'blue'
      },
      active: {
        symbol: percentage + '%',
        trailColor: 'yellow',
        color: 'orange'
      },
      success: {
        symbol: percentage + '%',
        trailColor: 'lime',
        color: 'green'
      }
    }
  }/>}</div>
        </div>
    )
}
