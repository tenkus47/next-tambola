import Footer from "./footer"
import OpeningMessage from './OpeningMessage'
import Header from "./header";
import {useState} from 'react'
import Head from 'next/head'

const Layout=({children})=>{

const [open,setopen]=useState(true);
    return(
        <>
        <Head>
            <title>Yak Online Tambola</title>
            <link rel="icon" type="image/png" href="img/yaklogo.png"/>
            <meta name="theme-color" content="#ddfd3a"></meta>
        </Head>
        <Header open={open}/>
        {open && (<>
  <OpeningMessage/>
  <center><button
  style={{marginBottom:30,borderRadius:10,background:'yellow',color:'red'}}
  onClick={()=>setopen(false)} type='button'>Enter</button></center>
        </>)}
        {!open && children
        }
         
        <Footer/>
        </>
    )
}


export default Layout;

