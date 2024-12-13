import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Monitorea el evento de scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            console.log("scrollTop:", scrollTop); // Log para verificar el scroll
            setIsVisible(scrollTop > 200); // Cambia a true si es mayor a 200
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    // Función para llevar el scroll hacia el inicio
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Animación suave
        });
    };

    return (
        isVisible && (
            <button
                className="scroll-to-top-button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                ↑ {/* Flecha apuntando hacia arriba */}
            </button>
        )
    );
};

export default ScrollToTopButton;