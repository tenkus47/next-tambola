import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import { PlayIcon,CreditCardIcon,ChatIcon,CashIcon } from '@heroicons/react/solid'
const Nav=()=>{
    const [selected,setSelected]=useState()
    const history=useRouter();
   useEffect(()=>{
    if(history.pathname==='/'){
        setSelected('PLAY');
    }
    if(history.pathname==='/Tickets'){
        setSelected('Tickets');
    }
    if(history.pathname==='/Winners'){
        setSelected('Winners');
    }
    if(history.pathname==='/About'){
        setSelected('Discuss');
    }
   },[history.pathname])
   
    return(
<div className={styles.nav}>
        <ul className={styles.navlinks}>
            <li className='group'>
                <Link href='/'>
                    <a className='text-black' style={selected==='PLAY'?{fontWeight:'bold'}:null} >
            <PlayIcon className="h-5 w-5 text-blue-500 inline group-hover:animate-spin" />
                PLAY</a></Link></li>
            <li className='group'><Link href='/Tickets'><a className='text-black' style={selected==='Tickets'?{fontWeight:'bold'}:null} >
                <CreditCardIcon className="h-5 w-5 text-blue-500 inline group-hover:animate-bounce" />
                TICKETS</a></Link></li>
            <li className='group'><Link href='/Winners'><a className='text-black' style={selected==='Winners'?{fontWeight:'bold'}:null} >
                <CashIcon className="h-5 w-5 text-blue-500 inline group-hover:animate-bounce" />
                WINNERS</a></Link></li>
            <li className='group'><Link href='/About'><a className='text-black' style={selected==='Discuss'?{fontWeight:'bold'}:null} >
                <ChatIcon className="h-5 w-5 text-blue-500 inline group-hover:animate-bounce" />
                DISCUSS</a></Link></li>
     </ul>
    </div>
    )
}

export default Nav;