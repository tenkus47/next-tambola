import axios from "axios";
import { serverURL } from "../../servers";
import Router from 'next/router'
export default function ListOfSale({data,filtered}) {
   


    return (
        <div><center><h2 className='capitalize font-bold font-sans'>name: {data.name}</h2></center>
             <center><h2>mobile: {data.mobile}</h2></center>
        
        <table width='100%' className='text-center' style={{border:'1px solid black'}}>
            <thead>
                <tr>
                    <th>Sr. </th>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Ticketlist</th>
                </tr>
            </thead>
            <tbody>
                {
                    filtered?.map((item,index)=>{

                        return (
                        <tr key={index} style={{backgroundColor:item.color}}>
                            <td>{index+1}</td>
                            <td>{item.username}</td>
                            <td>{item.mobile}</td>
                            <td>{item._id}</td>
                            </tr>
                    )})
                }
            </tbody>
        </table>
        <div onClick={() => Router.back()}
        className='bg-yellow-400 text-center mt-4 uppercase'
        >Go Back</div>
          

            
        </div>
    )
}


export const getStaticPaths =async()=>{
    const res = await axios.get(serverURL+'/agentList')
    const data=res.data;
    const paths=data.map(agent=>{
        return {
            params:{list:agent._id}
        }
    })
    return {
        paths,
        fallback: false
    }
      
}

export const getStaticProps=async(context)=>{
    const id=context.params.list;
   const res = await axios.get(serverURL+'/agentList/'+id)
   const res2= await axios.get(serverURL+'/getList')
   const data2=res2.data;
   
   const data=res.data[0];
   var filtered=data2.filter(item=>item.agentName===data.name)

   return {props:{data,
                  filtered}}
}
