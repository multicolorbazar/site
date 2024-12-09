import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'antd';
import './WelcomePage.css';

const PromocionesNavidad = () => {
    const [visible, setVisible] = useState(false);

    const handleImageClick = () => {
        setVisible(true);
    };

    return (
        <div className="promociones-navidad">
            <h3 style={{ textAlign: 'left' }}>
                ¡Encuentra un detalle especial para esta Navidad! 🎄🎁 Descubre el regalo perfecto para tu ser querido o para tu amigo secreto 🌟🎅
            </h3>
            
            {/* Carrusel de imágenes con Ant Design */}
            <Carousel autoplay style={{ marginBottom: '20px', overflow: 'hidden' }}>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad1.jpg')}
                        alt="Navidad 1"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad2.jpg')}
                        alt="Navidad 2"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad3.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad4.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad5.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad6.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad7.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad8.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad9.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <img
                        src={require('../../images/articulos/promociones/navidad10.jpg')}
                        alt="Navidad 3"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            </Carousel>

            <Dialog
                header="Detalles de la Promoción"
                visible={visible}
                style={{ width: '90vw', overflow: 'hidden' }}  // Evita el scroll dentro del Dialog
                onHide={() => setVisible(false)}
            >
                <img
                    src={require('../../images/articulos/promociones/navidad1.jpg')}
                    alt="Detalle de Navidad"
                    style={{ width: '100%', height: 'auto' }}
                />
            </Dialog>
        </div>
    );
};

export default PromocionesNavidad;
