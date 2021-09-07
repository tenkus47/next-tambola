import styles from '../styles/Home.module.css'
import Nav from '../comps/nav'
const Header=({open})=>{
    return(
        <header className={styles.header}>
          <div >
          </div>
            <div className={styles.logo}>
              <img src='/img/yaklogo.png' style={{height:50,width:50}} alt='imagelogo'/>
              <h3 className='font-serif'> YAK ONLINE TAMBOLA </h3>
            </div>
                    
        {!open &&    <Nav/>}
        </header>

)
}

export default Header;