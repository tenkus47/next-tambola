import styles from '../styles/Home.module.css'
import Marquee from "react-fast-marquee";
const Footer=()=>{
    return(
        <footer className={styles.footer}>
           Programmed by T.K
           <Marquee>
               In case of server failure, we will reschedule the game . refund request would not be appreciated .
               Winner list wont be considered incase of incomplete game.
           </Marquee>
        </footer>

)
}

export default Footer;