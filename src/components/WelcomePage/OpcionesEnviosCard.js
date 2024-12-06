// OpcionesEnviosCard.js
import React from 'react';
import { FaMotorcycle } from "react-icons/fa";
import OpcionEnvioDelivery from '../OpcionEnvioDelivery';
import OpcionEnvioEncomienda from './OpcionEnvioEncomienda';

const OpcionesEnviosCard = () => (
    <div className="opciones-envios-card">
        <div className="envios-header">
            <FaMotorcycle className="datosbanco-icon" />
            <h2>Opciones de Envíos</h2>
        </div>
        <div className="detalle-envios">
            <OpcionEnvioDelivery />
            <OpcionEnvioEncomienda />
        </div>
    </div>
);

export default OpcionesEnviosCard;
