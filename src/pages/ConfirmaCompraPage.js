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

const DatosBancariosCard = () => {
    const imagenBanco = require('../images/secciones/bcimach.png'); // Asegúrate de que la ruta sea correcta

    return (
        <div id="datos-bancarios" className="datos-bancarios-card">
            <div className="datosbanco-header">
                <PiBankFill className="datosbanco-icon" />
                <h2>Datos de Transferencia Bancaria</h2>
            </div>
            <table className="datos-bancarios-table">
                <tbody>
                    <tr>
                        <td>Banco:</td>
                        <td>
                            BCI/MACH
                            <img src={imagenBanco} alt="Logo BCI/MACH" style={{ marginLeft: '10px', maxHeight: '20px' }} />
                        </td>
                    </tr>
                    <tr>
                        <td>Tipo de cuenta:</td>
                        <td>Cuenta Corriente</td>
                    </tr>
                    <tr>
                        <td>N° cuenta:</td>
                        <td>7 770 15 41859 0</td>
                    </tr>
                    <tr>
                        <td>RUT:</td>
                        <td>15.418.590-9</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>multicolorbazar@gmail.com</td>
                    </tr>
                    <tr>
                        <td>A nombre de:</td>
                        <td>Karin Garabito M</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const OpcionesEnviosCard = () => {
    const [visible, setVisible] = useState(false);

    const handleImageClick = () => {
        setVisible(true);
    };

    return (
        <div id="opciones-envios" className="opciones-envios-card">
            <div className="envios-header">
                <FaMotorcycle className="datosbanco-icon" />
                <h2>Opciones de Envíos</h2>
            </div>
            <div className="detalle-envios">
                <h3>Opción 1: Delivery gratis</h3>
                <p>Tenemos <span style={{color: 'var(--tono-warning2)'}}>delivery gratis</span> entre Vicuña Mackena, Irarrazaval, Guillermo Man y Marathon, <span style={{color: 'var(--tono-warning2)'}}>por compras superiores a $3.990</span>.</p>
                <img src={require('../images/secciones/envios.png')} alt="Delivery" onClick={handleImageClick} style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
                <Dialog header="Opciones de Envíos" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)}>
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

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
                    <button className="compra_confirmar" onClick={enviarMensajeWhatsapp}>
                        <FaWhatsapp /> Confirma stock
                    </button>
                    <button className="compra_pagar" onClick={() => scrollToSection('datos-bancarios')}>
                        <PiBankFill /> Pago/Transferencia
                    </button>
                    <button className="compra_envio" onClick={() => scrollToSection('opciones-envios')}>
                        <FaMotorcycle /> Envío o entrega
                    </button>
                </div>

                <DatosBancariosCard />

                <OpcionesEnviosCard />
            </div>
        </div>
    );
};

export default ConfirmarCompraPage;
