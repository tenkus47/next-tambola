
import { ChatAlt2Icon } from '@heroicons/react/solid'
export default function Agentslist() {
    
    const list=[{
        name:'sonam',
        Whatsapp:'9882991002'
    },{
        name:'tashi',
        Whatsapp:'9882991002'
    }]

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
                {list.map((item,index)=>{
                       var  link=`https://wa.me/${item.Whatsapp}`;
                    return(
                        <tr className='border-2' key={index}>
                        <td>{item.name}</td>
                        <td className='cursor-pointer flex justify-center'><ChatAlt2Icon className='h-5 w-5 mr-3 '/><a href={link} >{item.Whatsapp}</a></td>
                    </tr>
                    )
                })}
            </tbody>
            </table>
        </center>
        </div>
    )
}
