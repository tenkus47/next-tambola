import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Timer from '../comps/Timer'
import Nav from '../comps/nav'
const Header=({open})=>{
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
              <Image src='/img/yaklogo.png' height={100} width={100}/>
              <h3> YAK ONLINE TAMBOLA </h3>
            </div>
           <center><Timer/>
             
             </center> 
        {!open &&    <Nav/>}
        </header>

)
}

export default Header;