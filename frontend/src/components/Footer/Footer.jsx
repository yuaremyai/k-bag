import React, {useContext} from "react";
import '../../styles/Footer.scss';
import { ThemeContext } from "../../contexts";

function Footer () {
    const {theme} = useContext(ThemeContext)

    return(
        <footer>
            <div className={`footer ${theme}`}>
                <ul className="footer-info">
                    <li><a href="#" className={`inst-link ${theme}`}>Instagram</a></li>
                    <li>Phone: +1234567890</li>
                    <li>Email: k.bags@email.com</li>
                </ul>
                &copy; yuaremyai
            </div>
        </footer>
    )
}

export default Footer;