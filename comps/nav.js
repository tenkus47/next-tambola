import styles from '../styles/Home.module.css'
import Link from 'next/link'
const Nav=()=>{
    return(
<div className={styles.nav}>
        <ul className={styles.navlinks}>
            <li ><Link href='/'><a className={styles.a}>PLAY</a></Link></li>
            <li><Link href='/Tickets'><a  className={styles.a}>TICKETS</a></Link></li>
            <li><Link href='/Winners'><a className={styles.a}>WINNERS</a></Link></li>
            <li><Link href='/About'><a className={styles.a}>DISCUSS</a></Link></li>

     </ul>
    </div>
    )
}

export default Nav;