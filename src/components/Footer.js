import React from 'react';
import './Footer.css'; // Importa el archivo CSS para el footer
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'; // Importa los íconos necesarios

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-box">
                <h3 className="footer-title">Bazar Multicolor</h3>
                <div className="footer-contact footer-link">
                    <FaWhatsapp className="footer-icon" />
                    <a 
                        href="https://wa.me/56981605147"
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        +569 816 051 47
                    </a>
                </div>
                <div className="footer-social footer-link">
                    <FaInstagram className="footer-icon" />
                    <a 
                        href="https://www.instagram.com/bazarmulticoloor"
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        bazarmulticoloor
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
