import React from 'react';
import './Informacion.css'; // Importa los estilos
import { Carousel } from 'react-responsive-carousel'; // Importa el carrusel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Estilos del carrusel
import { ReactComponent as Logo2 } from '../images/logo_bm_3f.svg'; // Importa el logo SVG como componente

// Importa las imágenes para el carrusel usando require
const imagen1 = require('../images/carrousel/carrousel2.png');
const imagen2 = require('../images/carrousel/carrousel3.png');
const imagen3 = require('../images/carrousel/carrousel4.png');

const Informacion = () => (
    <div className="informacion-container">
        <Logo2 className="informacion-logo" />
        <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={5000} showThumbs={false}>
            <div className="carousel-slide">
                <img src={imagen1} alt="Imagen 1" />
                <div className="carousel-message">Mensaje particular para la imagen 1</div>
            </div>
            <div className="carousel-slide">
                <img src={imagen2} alt="Imagen 2" />
                <div className="carousel-message">Mensaje particular para la imagen 2</div>
            </div>
            <div className="carousel-slide">
                <img src={imagen3} alt="Imagen 3" />
                <div className="carousel-message">Mensaje particular para la imagen 3</div>
            </div>
        </Carousel>
    </div>
);

export default Informacion;
