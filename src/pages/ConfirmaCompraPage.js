import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBankFill } from "react-icons/pi";
import { FaFileAlt, FaWhatsapp } from 'react-icons/fa';
import { FaMotorcycle } from "react-icons/fa";
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';  // Importa el tema
import 'primereact/resources/primereact.min.css';          // Importa los estilos de PrimeReact
import 'primeicons/primeicons.css';                        // Importa los iconos de PrimeReact
import './ConfirmaCompraPage.css';
import skuArticulos from '../data/skuArticulos'; // Asegúrate de que la ruta sea correcta
import articulos from '../data/articulos'; // Asegúrate de que la ruta sea correcta

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

const ResumenCompraCard = ({ carritoDetalles, getTotalGeneral }) => (
    <div className="resumen-compra-card">
        <div className="boleta-header">
            <FaFileAlt className="boleta-icon" />
            <h2>Resumen de la compra</h2>
        </div>
        {carritoDetalles.length === 0 ? (
            <p>No hay elementos en el carrito.</p>
        ) : (
            <div className="detalle-compra">
                <table className="detalle-table">
                    <thead>
                        <tr>
                            <th>Productos</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carritoDetalles.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.nombre}<br />
                                    {item.variacion}<br />{formatearPrecio(item.precio)} x {item.unidades}
                                </td>
                                <td>{formatearPrecio(item.precio * item.unidades)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total:</td>
                            <td>{formatearPrecio(getTotalGeneral())}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}
    </div>
);

const DatosBancariosCard = () => (
    <div className="datos-bancarios-card">
        <div className="datosbanco-header">
            <PiBankFill className="datosbanco-icon" />
            <h2>Datos de Transferencia Bancaria</h2>
        </div>
        <table className="datos-bancarios-table">
            <tbody>
                <tr>
                    <td>Banco:</td>
                    <td>Santander</td>
                </tr>
                <tr>
                    <td>Tipo de cuenta:</td>
                    <td>Cuenta Corriente</td>
                </tr>
                <tr>
                    <td>N° cuenta:</td>
                    <td>66898717</td>
                </tr>
                <tr>
                    <td>email:</td>
                    <td>k.garabito@gmail.com</td>
                </tr>
                <tr>
                    <td>A nombre de:</td>
                    <td>Karin Garabito M</td>
                </tr>
            </tbody>
        </table>
    </div>
);

const OpcionesEnviosCard = () => {
    const [visible, setVisible] = useState(false);

    const handleImageClick = () => {
        setVisible(true);
    };

    return (
        <div className="opciones-envios-card">
            <div className="envios-header">
                <FaMotorcycle className="datosbanco-icon" />
                <h2>Opciones de Envíos</h2>
            </div>
            <div className="detalle-envios">
                <h3>Opción 1: Delivery gratis</h3>
                <p>Tenemos delivery gratis entre Vicuña Mackena, Irarrazaval, Guillermo Man, Marathon.</p>
                <img src={require('../images/secciones/envios.png')} alt="Delivery" onClick={handleImageClick} style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
                <Dialog header="Opciones de Envíos" visible={visible} style={{ width: '90vw',  }} onHide={() => setVisible(false)}>
                    <img src={require('../images/secciones/envios.png')} alt="Delivery" style={{ width: '100%', height: 'auto' }} />
                </Dialog>
                <h3>Opción 2: Envío como encomienda</h3>
                <table className="envios-table">
                    <thead>
                        <tr>
                            <th>Servicio</th>
                            <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Correos de Chile</td>
                            <td>
                                Lunes a Viernes: 09:00 - 18:00 hrs<br />
                                Sábado: 09:30 - 13:00 hrs<br />
                                Domingo: CERRADO
                            </td>
                        </tr>
                        <tr>
                            <td>Chilexpress</td>
                            <td>Lunes a Viernes: 09:00 - 18:00 hrs</td>
                        </tr>
                        <tr>
                            <td>Starken</td>
                            <td>
                                Lunes a Viernes: 09:00 - 18:30 hrs<br />
                                Sábados: 09:00 - 13:00 hrs
                            </td>
                        </tr>
                        <tr>
                            <td>Blue Express</td>
                            <td>Abierto 24/7</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ConfirmarCompraPage = () => {
    const [carritoDetalles, setCarritoDetalles] = useState([]);

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        const detalles = carrito.map(item => {
            const sku = skuArticulos.find(sku => sku.id_sku === item.id_sku) || {};
            const articulo = articulos.find(articulo => articulo.id_articulo === parseInt(item.id_articulo, 10)) || {};
            return {
                ...item,
                variacion: sku.variacion || 'No disponible',
                nombre: articulo.nombre || 'Nombre no disponible',
                precio: articulo.precio || 0
            };
        });
    
        setCarritoDetalles(detalles);
    }, []);
    

    const calcularPrecioTotal = (item) => {
        return item.precio * item.unidades;
    };

    const getTotalGeneral = () => {
        return carritoDetalles.reduce((total, item) => total + calcularPrecioTotal(item), 0);
    };

    const enviarMensajeWhatsapp = () => {
        let mensaje = "¡Hola Bazar Multicolor! necesito comprobar el stock de los siguientes artículos:\n\n";
        carritoDetalles.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.nombre} (${item.variacion}) - ${item.unidades} unidad(es)\n`;
        });
        mensaje += `\nTotal: ${formatearPrecio(getTotalGeneral())}`;
    
        const numero = "56981605147";
        const whatsappLink = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
        window.open(whatsappLink, "_blank");
    };
    

    return (
        <div className="confirmar-compra-page">
            <div className="boton-volver-container">
                <Link to="/carrito" className="volver-btn">Volver al carrito</Link>
            </div>

            <h2 className='page-interior-titulo'>
                Confirmar compra
            </h2>

            <div className='confirmar-compra-info'>
                <ResumenCompraCard carritoDetalles={carritoDetalles} getTotalGeneral={getTotalGeneral} />

                <div className="confirmar-stock">
                    <button onClick={enviarMensajeWhatsapp}>
                        <FaWhatsapp /> Confirma stock
                    </button>
                </div>

                <DatosBancariosCard />

                <OpcionesEnviosCard />
            </div>
        </div>
    );
};

export default ConfirmarCompraPage;
