// OpcionEnvioDelivery.js
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';


const OpcionEnvioDelivery = () => {
    const [visible, setVisible] = useState(false);

    const handleImageClick = () => {
        setVisible(true);
    };

    return (
        <div className="opcion-envio-delivery">
            <h3 style={{ textAlign: 'left'}}>Opción 1: Delivery gratis</h3>
            <p style={{ textAlign: 'justify'}}>Tenemos <span style={{color: 'var(--tono-warning2)'}}>delivery gratis</span> entre Vicuña Mackena, Irarrazaval, Guillermo Man y Marathon, <span style={{color: 'var(--tono-warning2)'}}>por compras superiores a $3.990</span>.</p>
            <img src={require('../../images/secciones/envios.png')} alt="Delivery" onClick={handleImageClick} style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
            <Dialog header="Opciones de Envíos" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)}>
                <img src={require('../../images/secciones/envios.png')} alt="Delivery" style={{ width: '100%', height: 'auto' }} />
            </Dialog>
        </div>
    );
};

export default OpcionEnvioDelivery;
