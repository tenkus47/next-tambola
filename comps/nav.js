import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
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
            <li ><Link href='/'><a className={selected==='PLAY'?styles.a:styles.a2} >PLAY</a></Link></li>
            <li><Link href='/Tickets'><a className={selected==='Tickets'?styles.a:styles.a2} >TICKETS</a></Link></li>
            <li><Link href='/Winners'><a className={selected==='Winners'?styles.a:styles.a2}>WINNERS</a></Link></li>
            <li><Link href='/About'><a className={selected==='Discuss'?styles.a:styles.a2}>DISCUSS</a></Link></li>

     </ul>
    </div>
    )
}

export default Nav;