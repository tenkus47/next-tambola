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
        <div className='relative h-24'></div>
        {/* this is for spacing under header */}
        {open && (<div >
  <OpeningMessage/>
  <center><button
  className='px-3 mt-3 mb-40  py-2 rounded cursor-pointer bg-purple-300 text-sm text-black rounded-xl'
  
  onClick={()=>setopen(false)} type='button'>Enter</button></center>
        </div>)}
        {!open && children
        }
         
        <Footer/>
        </>
    )
}


export default Layout;

