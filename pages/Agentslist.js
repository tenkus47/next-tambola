
import { ChatAlt2Icon } from '@heroicons/react/solid'
import Link from 'next/link'
import axios from 'axios';
import {useState,useEffect} from 'react'
import { serverURL } from '../servers';
export default function Agentslist() {

    const [agentlist,setagentlist]=useState([]);

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


    return (
        <div className='mt-12 flex-row items-center justify-center uppercase'>

         <center><h1 className='mb-3 font-serif animate-bounce'>Agent list</h1></center>
         <center>

            <table className='w-full text-center max-w-xl bg-red-300 rounded-xl'>
                <thead >
                    <tr>
                    <th>Name</th>
                    <th>Whatsapp</th>
                    </tr>
                </thead>
                <tbody>
                {agentlist.map((item,index)=>{
                       var  link=`https://wa.me/${item.mobile}`;
                    return(
                        <tr className='border-2' key={index}>
                        <td><Link href={'/agents/'+item._id}><a>{item.name}</a></Link></td>
                        <td className='cursor-pointer flex justify-center'><ChatAlt2Icon className='h-5 w-5 mr-3 '/><a href={link} >{item.mobile}</a></td>
                    </tr>
                    )
                })}
            </tbody>
            </table>
        </center>
        </div>
    )
}
