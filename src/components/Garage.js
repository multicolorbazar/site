import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link de React Router
import './Garage.css'; // Importa los estilos

// Importa la imagen para el fondo
const imagen1 = require('../images/articulos/garage/background_garage_sale.jpg');

const Garage = () => (
    <Link to="/subcategoria/1" className="garage-container"> {/* Envolvemos el div con un Link */}
        <div className="garage-banner">
            <img src={imagen1} alt="Imagen de venta de garage" className="fondogaragex1" />
            {/* Rectángulo "Nuevo!" */}
            <div className="nuevo-banner">¡Nuevo!</div>
            <div className="garage-message-titulo">Venta de garage y reciclados</div>
            <div className="garage-message">Es tu momento de llevarte algo único. ¡No dejes pasar esta oportunidad!</div>
        </div>
    </Link>
);

export default Garage;
