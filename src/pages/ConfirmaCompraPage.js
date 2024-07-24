import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBankFill } from "react-icons/pi";
import { FaFileAlt, FaWhatsapp } from 'react-icons/fa'; // Importamos el icono de boleta y de Whatsapp desde react-icons/fa
import articulos from '../data/articulos'; // Importamos los datos de los artículos
import './ConfirmaCompraPage.css';

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
                                <td>{item.nombre} ({item.unidades})</td>
                                <td>${(item.precio * item.unidades).toFixed(0)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total:</td>
                            <td>${getTotalGeneral().toFixed(0)}</td>
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

const ConfirmarCompraPage = () => {
    const [carritoDetalles, setCarritoDetalles] = useState([]);

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const detalles = carrito.map(item => ({
            ...item,
            ...articulos.find(articulo => articulo.id === item.id)
        }));
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
            mensaje += `${index + 1}. ${item.nombre} (${item.unidades} unidades)\n`;
        });
        mensaje += `\nTotal: $${getTotalGeneral().toFixed(0)}`;

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
            </div>
        </div>
    );
};

export default ConfirmarCompraPage;
