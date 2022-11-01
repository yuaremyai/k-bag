import React from "react";
import '../../styles/Footer.scss';
import { useSelector } from 'react-redux'

function Footer() {

    const theme = useSelector(state => state.theme.theme)

    return (
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