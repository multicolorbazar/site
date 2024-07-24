import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import articulos from '../data/articulos';
import imagenesArticulos from '../data/imagenesArticulos';
import skuArticulos from '../data/skuArticulos';
import { useCarrito } from '../contexts/CarritoContext';
import './CarritoPage.css';

const obtenerImagen = (idArticulo) => {
    const imagen = imagenesArticulos.find(img => img.id_articulo === parseInt(idArticulo, 10));
    return imagen ? imagen.url : '';
};

const CarritoPage = () => {
    const navigate = useNavigate();
    const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
    const [carritoItems, setCarritoItems] = useState(carrito);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showVaciarConfirmDialog, setShowVaciarConfirmDialog] = useState(false);
    const [articuloIdToDelete, setArticuloIdToDelete] = useState(null);
    const [skuIdToDelete, setSkuIdToDelete] = useState(null);

    useEffect(() => {
        setCarritoItems(carrito);
    }, [carrito]);

    const handleIncrement = (idArticulo, idSku) => {
        agregarAlCarrito(idArticulo, idSku, 1);
    };

    const handleDecrement = (idArticulo, idSku) => {
        const item = carrito.find(item => item.id_articulo === idArticulo && item.id_sku === idSku);
        if (item && item.unidades > 1) {
            agregarAlCarrito(idArticulo, idSku, -1);
        }
    };

    const handleEliminar = (idArticulo, idSku) => {
        setArticuloIdToDelete(idArticulo);
        setSkuIdToDelete(idSku);
        setShowConfirmDialog(true);
    };

    const confirmarEliminar = () => {
        if (articuloIdToDelete && skuIdToDelete) {
            eliminarDelCarrito(articuloIdToDelete, skuIdToDelete);
            setArticuloIdToDelete(null);
            setSkuIdToDelete(null);
        }
        setShowConfirmDialog(false);
    };

    const cancelarEliminar = () => {
        setArticuloIdToDelete(null);
        setSkuIdToDelete(null);
        setShowConfirmDialog(false);
    };

    const handleVaciarCarrito = () => {
        setShowVaciarConfirmDialog(true);
    };

    const confirmarVaciarCarrito = () => {
        vaciarCarrito();
        setCarritoItems([]);
        setShowVaciarConfirmDialog(false);
    };

    const cancelarVaciarCarrito = () => {
        setShowVaciarConfirmDialog(false);
    };

    const getArticuloDetails = (id) => {
        const articulo = articulos.find(articulo => articulo.id_articulo === parseInt(id, 10));
        return articulo || {};
    };

    const getSkuDetails = (idSku) => {
        const sku = skuArticulos.find(sku => sku.id_sku === idSku);
        return sku || {};
    };

    const calcularValorAPagar = (articulo, unidades) => {
        if (articulo && articulo.id_articulo) {
            const valorTotal = unidades * articulo.precio;
            return (
                <p className='valor-total'>
                    Valor: ${valorTotal.toFixed(0)}. ({articulo.precio} x {unidades})
                </p>
            );
        }
        return null;
    };

    const actualizarLocalStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const handleContinuarCompra = () => {
        actualizarLocalStorage();
        navigate("/confirmacompra");
    };

    return (
        <div className="carrito-page">
            <div className='boton-volver-container'>
                <Link to="/" className="volver-btn"><FaArrowLeft /> Volver al Inicio</Link>
            </div>
            <h2>Carrito de Compras</h2>
            {carritoItems.length === 0 ? (
                <p>No hay elementos en el carrito.</p>
            ) : (
                <div className="carrito-items">
                    {carritoItems.map((item, index) => {
                        const articulo = getArticuloDetails(item.id_articulo);
                        const sku = getSkuDetails(item.id_sku);
                        const valorAPagar = calcularValorAPagar(articulo, item.unidades);

                        if (!articulo || !articulo.id_articulo) {
                            return null;
                        }

                        return (
                            <div key={index} className="carrito-item">
                                <div className='carrito-articulo-img'>
                                    <Link to={`/articulo/${articulo.id_articulo}`} className="articulo-rlink">
                                        <img 
                                            src={obtenerImagen(articulo.id_articulo)} 
                                            alt={articulo.nombre} 
                                            className="carrito-item-imagen" 
                                        />
                                    </Link>
                                </div>
                                <div className="carrito-item-detalles">
                                    <h3>{articulo.nombre}</h3>
                                    <h4>{sku.variacion}</h4>
                                    <h5>{valorAPagar}</h5>
                                    <div className='carrito-item-controles'>
                                        <div className="cantidad-control">
                                            <button onClick={() => handleDecrement(item.id_articulo, item.id_sku)}>-</button>
                                            <span>{item.unidades}</span>
                                            <button onClick={() => handleIncrement(item.id_articulo, item.id_sku)}>+</button>
                                        </div>
                                        <button onClick={() => handleEliminar(item.id_articulo, item.id_sku)} className="eliminar-btn">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {carritoItems.length > 0 && (
                <div className="continuar-compra">
                    <Button label="Continuar compra" onClick={handleContinuarCompra} className="boton-primary-carrito" />
                    <Button label="Vaciar carrito" onClick={handleVaciarCarrito} className="boton-primary-carrito boton-gris" />
                </div>
            )}

            <Dialog visible={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} header="Confirmar Eliminación" modal>
                <div className="confirmation-content">
                    <p>¿Está seguro que desea eliminar este artículo del carrito?</p>
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text-cancelar" onClick={cancelarEliminar} />
                    <Button label="Eliminar" icon="pi pi-check" className="p-button-text-eliminar" onClick={confirmarEliminar} />
                </div>
            </Dialog>

            <Dialog visible={showVaciarConfirmDialog} onHide={() => setShowVaciarConfirmDialog(false)} header="Confirmar Vacío del Carrito" modal>
                <div className="confirmation-content">
                    <p>¿Está seguro que desea vaciar todo el carrito?</p>
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-text-cancelar" onClick={cancelarVaciarCarrito} />
                    <Button label="Vaciar" icon="pi pi-check" className="p-button-text-eliminar" onClick={confirmarVaciarCarrito} />
                </div>
            </Dialog>
        </div>
    );
};

export default CarritoPage;
