import axios from "axios";
import { serverURL } from "../servers";

export const createProfile=async(Ticket=[],color)=>{
    
const res=await axios.post(serverURL+'/createProfile',{
        Ticket,
        color
     })

     console.log(res.data)
}


export const removeUser=(id)=>{
    axios.delete(serverURL+`/removeTicket`,{
       params:{id}
    }).then(res=>console.log(res)).catch(
        err=>console.log(err)
    )
} 