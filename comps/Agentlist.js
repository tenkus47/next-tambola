import axios from 'axios';
import {useState,useEffect} from 'react'
import { serverURL } from '../servers';
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      boxShadow:'0 0 10px 10px black',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      fontFamily:'serif',
      overflow:'hidden',
      backgroundColor:'black',
      color:'white'
    }
    
}  



const Agentlist=()=>{


    Modal.setAppElement('#__next')
    const [agentname,setagentname]=useState('')
    const [agentmobile,setagentmobile]=useState('');
    const [agentkey,setagentkey]=useState('');
const [id,setid]=useState('');
    const [agentlist,setagentlist]=useState([]);
    const [modalOpen,setModalOpen]=useState(false);
    const [modalOpen2,setModalOpen2]=useState(false);
    const [predata,setPredata]=useState()

useEffect(()=>{
var mounted=true
const fetcher=async()=>{
    if(mounted){
    var res= await axios.get(serverURL+'/agentList');
    return setagentlist(res.data)
    }
    else{return null}
}
fetcher();

return ()=>mounted=false;

},[agentlist])

const addHandler=async()=>{
var res=await axios.post(serverURL+'/addAgent',{data:{
    name:agentname,
    mobile:agentmobile,
    key:agentkey
}})

}
const removeHandler=async(id)=>{
    var r = confirm("DO you want to delete the Agent!");
    if (r === true) {
await axios.delete(serverURL+`/agentList/${id}`);
    } else {
     var txt = "You pressed Cancel!";
      alert(txt)
    }


}
const editHandler=async(id)=>{
    var res=await axios.patch(serverURL+'/addAgent',{data:{
        name:agentname,
        mobile:agentmobile,
        key:agentkey,
        id:id
    }})

}

 return(
<center>
  <div className='bg-black text-gray-300'>
    <table width='100%' className='text-center'>
         <thead><tr>
           <th>Name</th>
           <th>Mobile</th>
           <th>Option</th>
           </tr>
         </thead>
         <tbody>
             {agentlist.map((m,i)=>
             <tr key={i}>
                 <td>{m?.name}</td>
                 <td>{m?.mobile}</td>
                 <td className='flex justify-evenly'><button className='bg-red-400 px-1 rounded text-black' value={m._id} onClick={(e)=>removeHandler(e.target.value)}>Remove</button>
                 <button className='bg-blue-400 px-1 rounded text-black'  value={m._id} onClick={()=>{setagentname(m?.name);setagentmobile(m?.mobile);setagentkey(m?.key); setPredata(m); setModalOpen2(true);}}>Edit</button></td>
             </tr>)}
         </tbody>
    </table>
    <center><button className='p-1 bg-green-600 text-black font-bold mt-5 font-sans rounded' onClick={()=>{setModalOpen(true); setagentname('');setagentmobile('');setagentkey('');}}>ADD AGENT</button></center>
    <Modal isOpen={modalOpen} style={customStyles}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={true}
     onRequestClose={()=>setModalOpen(false)}
     >
         <div className='flex flex-col'>
             <label>Agent Name:</label>
             <input value={agentname} onChange={e=>setagentname(e.target.value)} style={{color:'black'}}/>
             <label>Agent Mobile:</label> <input value={agentmobile} onChange={e=>setagentmobile(e.target.value)} style={{color:'black'}}/>
             <label>Agent key:</label>  <input value={agentkey} onChange={e=>setagentkey(e.target.value)} style={{color:'black'}}/>
            <button onClick={()=>{addHandler(); setModalOpen(false) }} className='mt-3'>Add</button>
            <button onClick={()=>setModalOpen(false)} className='mt-3'>Cancel</button>
         </div>
       </Modal>
       <Modal isOpen={modalOpen2} style={customStyles}
     shouldCloseOnEsc={true}
     shouldCloseOnOverlayClick={true}
     onRequestClose={()=>setModalOpen2(false)}
     >
         <div className='flex flex-col'>
             <label>Agent Name:</label>
             <input value={agentname} onChange={e=>setagentname(e.target.value)} style={{color:'black'}}/>
             <label>Agent Mobile:</label> <input value={agentmobile} onChange={e=>setagentmobile(e.target.value)} style={{color:'black'}}/>
             <label>Agent key:</label>  <input value={agentkey} onChange={e=>setagentkey(e.target.value)} style={{color:'black'}}/>
            <button onClick={()=>{editHandler(predata?._id); setModalOpen2(false) }} className='mt-3'>Change</button>
            <button onClick={()=>setModalOpen2(false)} className='mt-3'>Cancel</button>
         </div>
       </Modal>
  </div>
</center>
 )}

 export default Agentlist;