import axios from "axios";
import { useEffect,useState } from "react";
import { serverURL } from "../../servers"
import TicketBuy from '../../comps/TicketBuy'

export const getStaticPaths =async()=>{
    const res = await axios.get(serverURL+'/agentList')
    const data=res.data;
    const paths=data.map(agent=>{
        return {
            params:{agent:agent._id}
        }
    })
    return {
        paths,
        fallback: false
    }
      
}


export const getStaticProps=async(context)=>{
     const id=context.params.agent;
    const res = await axios.get(serverURL+'/agentList/'+id)

    const price = await axios.get(serverURL+'/getprice')
    const data=res.data[0];

    return {props:{data,price:price.data[0]}}
}


const AgentPage=({data,price})=>{
    const [loading,setLoading]=useState(false);
    const [pass,setPass]=useState()
    const [loggedIn,setLoggedIn] =useState(false)
    const [ticketList,setTicketList]=useState([])

    useEffect(()=>{
        let pageloaded=true
        const fetcher=async()=>{
            setLoading(true)
            if(pageloaded){
            const res=await axios.get(serverURL+'/getList')
            setTicketList(res.data.sort((a,b)=>a.id-b.id));
            }
          }
          fetcher()
    if(ticketList.length>0){
        setLoading(false)
    }
    return ()=>pageloaded=false
    },[ticketList])


    useEffect(()=>{
   const key=localStorage.getItem('agentKey')
   if(key===data?.key){
       setLoggedIn(true);
   }
    },[])
    
   function submitHandle(){
       if(pass===data?.key){
       localStorage.setItem('agentKey',pass)
       setLoggedIn(true);
       }
   }

    if(loggedIn){
    return (
      <center>
        <div className="font-bold">
          Agent Name: <span className="uppercase">{data?.name}</span>
        </div>
        <div className="flex mx-4 bg-purple-300 px-2 gap-3 justify-around py-4 text-xs font-bold font-serif">
          <div className="flex-col flex-grow">
            <h5>Total ticket on sale</h5>
            <input type="button" disabled className="w-full" value={ticketList.length} />
          </div>
          <div className="flex-col flex-grow">
            {" "}
            <h5>Total ticket left</h5>
            <input type="button" disabled className="w-full" value={ticketList.filter(item=>item.username==='Available').length} />
          </div>
          <div className="flex-col flex-grow">
            {" "}
            <h5>ticket price</h5>
            <input
              type="button"
              disabled
              className="w-full"
              value={`${price?.game} INR`}
            />
          </div>
        </div>
        <hr />
        <div className="flex mx-4 bg-green-300 px-2 gap-3 justify-around py-4 text-xs font-bold font-serif">
          <div className="flex-col flex-grow">
            <h5>My total sold</h5>
            <input type="button" disabled className="w-full" value={ticketList.filter(item=>item.agentName===data?.name).length} />
          </div>
          <div className="flex-col flex-grow">
            {" "}
            <h5>Ticket Commision</h5>
            <input type="button" disabled className="w-full" value={`${price?.commision} INR`} />
          </div>
          <div className="flex-col flex-grow">
            {" "}
            <h5>Total Earning</h5>
            <input
              type="button"
              disabled
              className="w-full"
              value={`${ticketList.filter(item=>item.agentName===data?.name).length * price?.commision} INR`}
            />
          </div>
        </div>
        <hr />
        <TicketBuy setLoggedIn={setLoggedIn} agentData={data} ticketList={ticketList} loading={loading}/>
      </center>
    );
    }
    else{
        return <center>
            <h1 className='font-bold font-serif mb-10'>Login Page</h1>
                <form onSubmit={submitHandle} className='flex flex-col justify-center items-center'>
                    <input onChange={e=>setPass(e.target.value)} placeholder='password' className='text-center mb-2 bg-gray-300 border-2 text-black'/>
                    <button type='submit' className='bg-red-300 px-2 rounded'>Enter</button>
                </form>
            </center>
    }
}

export default AgentPage