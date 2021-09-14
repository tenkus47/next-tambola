import styles from '../styles/Home.module.css'
import Nav from '../comps/nav'
import Image from 'next/image'
const Header=({open})=>{
    return(
        <header className={styles.header}>
          <div >
          </div>
            <div className={styles.logo}>
              <Image src='/img/yaklogo.png' height={50} width={50} alt='imagelogo'/>
              <h3 className='font-serif'> YAK ONLINE TAMBOLA </h3>
            </div>
                    
        {!open &&    <Nav/>}
        </header>

)
}

export default Header;