import {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import {serverURL} from '../servers'
export default function sellTicket({
agentData,ticketlist,selected,
setOpen
}) {
    const [username,setuserName]=useState('');
    const [mobile,setmobile]=useState('');
    var randomNumber=useRef([]);
    var fullsheetNumber=useRef([]);
    var halfsheetNumber=useRef([]);
    var fullsheetList=[1,2,3,4,5,6]
    var halfsheetList=[1,2,3]
 
    useEffect(()=>{
       var fullsheet=fullsheetList, halfsheet=halfsheetList;
   for(var i=0;i<ticketlist.length;i++){

    var fh=selected.filter(item=>fullsheet.includes(item))
   
  if(fh.length>0){
    if(fh.length===fullsheet.length){
        // 
        if(fh.length!==0){
            fullsheetNumber.current=[...fullsheetNumber?.current,...fh]
        }
    } 
    
    else if(fh.length===3){
        if(fh.length!==0){
            halfsheetNumber.current=[...halfsheetNumber?.current,...fh]
        }
    } 

    else{
        if(fh.length!==0){
      randomNumber.current=[...randomNumber?.current,...fh]
        }
    }
  }

          for(var o=0;o<6;o++){
        fullsheet[o]=fullsheet[5]+(o+1);
        }
        for(var p=0;p<3;p++){
            halfsheet[p]=halfsheet[2]+(p+1)
        }
    }
    
    },[selected])

  const OrderTicket=async()=>{
        await axios.patch(serverURL+'/changeusername',{
        id:selected,
        username,
        agentName:agentData?.name,
        mobile:mobile
         })
         setuserName(null)
         setmobile(0)
         setOpen(false)
  }



    return (
        <div className='flex flex-col gap-3 '>
        <div> Fullsheet {fullsheetNumber?.current?.map(item=><span key={item} className='bg-red-400 mr-2 p-1'>{item}</span>)} </div>
        <div> Halfsheet {halfsheetNumber?.current?.map(item=><span key={item} className='bg-red-400 mr-2 p-1'>{item}</span>)} </div>
        <div> Random Tickets {randomNumber?.current?.map(item=><span key={item} className='bg-red-400 mr-2 p-1'>{item}</span>)} </div>
      
        <input type='text' className='text-black' placeholder='username' onChange={(e)=>setuserName(e.target.value)} value={username}/>
        <input type='text' placeholder='mobile' className='text-black' onChange={(e)=>setmobile(e.target.value)} value={mobile}/>
        <button type='button' onClick={OrderTicket}> placeOrder </button>
       
        </div>
    )
}
