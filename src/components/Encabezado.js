import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import './Encabezado.css';
import './fondo_gradiant_1.css';
import { ReactComponent as Logo } from '../images/logo_bm_2f.svg';
import { useCarrito } from '../contexts/CarritoContext'; // Importar el hook
import Buscador from './Buscador';

const Encabezado = () => {
    const { carrito, vaciarCarrito } = useCarrito();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showBuscador, setShowBuscador] = useState(false);

    useEffect(() => {
        const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (storedCarrito.length > 0) {
            setShowModal(true);
        }
    }, []);

    const handleContinuarComprando = () => {
        setShowModal(false);
    };

    const handleYaCompreEstosArticulos = () => {
        setShowModal(false);
        setShowConfirmModal(true);
    };

    const handleConfirmVaciarCarrito = () => {
        setShowConfirmModal(false);
        vaciarCarrito();
    };

    const handleCancelVaciarCarrito = () => {
        setShowConfirmModal(false);
    };

    const handleShowBuscador = () => {
        setShowBuscador(!showBuscador);
    };

    const whatsappUrl = "https://wa.me/56981605147?text=%C2%A1Hola%20Bazar%20Multicolor!%20tengo%20una%20consulta:";

    // Calcular el total de unidades en el carrito
    const totalUnidades = carrito.reduce((total, item) => total + item.unidades, 0);

    return (
        <div className='bg_gradiante_1 encabezado-container'>
            <div className='logo-container'>
                <Link to="/home">
                    <Logo className='encabezado-logo' />
                </Link>
                <p>Bazar <span>Multicolor</span></p>
            </div>
            <div className="encabezado-menu">
                <div className="encabezado-start">
                    <FaBars size={24} style={{ marginRight: '10px', display: 'none' }} />
                    <div className="p-input-icon-left" onClick={handleShowBuscador}>
                        <FaSearch className="search-icon" />
                        <span className="buscador-toggle">
                            Buscar productos
                        </span>
                    </div>
                </div>
                <div className="encabezado-icons">
                    <Link to="/carrito" className="encabezado-icon">
                        <FaShoppingCart size={24} />
                        {totalUnidades > 0 && (
                            <span className="carrito-items-count">{totalUnidades}</span>
                        )}
                    </Link>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="encabezado-icon">
                        <FaWhatsapp size={24} />
                    </a>
                </div>
            </div>

            {showBuscador && <Buscador onClose={() => setShowBuscador(false)} />}

            <Dialog header="Tienes artículos en tu carrito!" visible={showModal} onHide={handleContinuarComprando}>
                <p>¿Qué deseas hacer?</p>
                <div className="modal-buttons">
                    <Button label="Ya compré estos artículos" icon="pi pi-heart" onClick={handleYaCompreEstosArticulos} className="p-button-vaciar" />
                    <Button label="Continuar comprando" icon="pi pi-arrow-right" onClick={handleContinuarComprando} className="p-button-continuar"/>
                </div>
            </Dialog>

            <Dialog header="Vaciar carrito" visible={showConfirmModal} onHide={handleCancelVaciarCarrito}>
                <p>¿Deseas vaciar el carrito?</p>
                <div className="modal-buttons">
                    <Button label="Vaciar carrito" icon="pi pi-trash" onClick={handleConfirmVaciarCarrito} className="p-button-danger" />
                    <Button label="Cancelar" onClick={handleCancelVaciarCarrito} className="p-button-cancelar"/>
                </div>
            </Dialog>
        </div>
    );
};

export default Encabezado;
