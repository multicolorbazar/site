import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; 
import { FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';
import articulos from '../data/articulos';
import imagenesArticulos from '../data/imagenesArticulos';
import skuArticulos from '../data/skuArticulos';
import './ArticuloPage.css';
import { useCarrito } from '../contexts/CarritoContext'; // Importar el hook

const obtenerImagenes = (idArticulo) => imagenesArticulos.filter(img => img.id_articulo === idArticulo);

const obtenerVariaciones = (idArticulo) => {
    return skuArticulos
        .filter(sku => sku.id_articulo === idArticulo.toString())
        .map(sku => ({
            id_sku: sku.id_sku,
            variacion: sku.variacion
        }));
};

// Función para formatear el precio en moneda chilena
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

const ArticuloPage = () => {
    const { id_articulo } = useParams();
    const idArticulo = parseInt(id_articulo, 10);
    const articulo = articulos.find(item => item.id_articulo === idArticulo);
    const imagenes = obtenerImagenes(idArticulo);
    const variaciones = obtenerVariaciones(idArticulo);

    const [unidades, setUnidades] = useState(1);
    const [selectedVariacion, setSelectedVariacion] = useState(variaciones.length > 0 ? variaciones[0].id_sku : '');
    const [showDialog, setShowDialog] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');

    const { carrito, actualizarCarrito } = useCarrito(); // Usar el hook del contexto

    useEffect(() => {
        if (articulo) {
            const visitaKey = `visitas_articulo_${articulo.id_articulo}`;
            const visitas = parseInt(localStorage.getItem(visitaKey), 10) || 0;
            localStorage.setItem(visitaKey, visitas + 1);
        }
    }, [articulo]);

    if (!articulo) return <div>Artículo no encontrado</div>;

    const incrementarUnidades = () => setUnidades(prev => prev + 1);
    const decrementarUnidades = () => unidades > 1 && setUnidades(prev => prev - 1);

    const mostrarConfirmacion = () => {
        setShowDialog(true);
        setConfirmMessage(`Se agregó ${unidades} unidad(es) de ${articulo.nombre} al carrito.`);
    };

    const handleAgregarAlCarrito = () => {
        // Obtener el carrito actual del contexto
        const nuevoCarrito = [...carrito];

        // Crear un nuevo objeto para el carrito
        const nuevoItem = {
            id_articulo,
            id_sku: selectedVariacion,
            unidades
        };

        // Verificar si el item ya existe en el carrito
        const index = nuevoCarrito.findIndex(item => item.id_sku === selectedVariacion && item.id_articulo === idArticulo);
        
        if (index > -1) {
            // Actualizar la cantidad si el artículo ya está en el carrito
            nuevoCarrito[index].unidades += unidades;
        } else {
            // Agregar el nuevo item al carrito
            nuevoCarrito.push(nuevoItem);
        }

        // Actualizar el carrito en el contexto
        actualizarCarrito(nuevoCarrito);

        mostrarConfirmacion();
    };

    // Mensaje predeterminado para la descripción larga
    const mensajePredeterminado = "En nuestro bazar, cada producto es seleccionado con cuidado para ofrecerte lo mejor en artículos útiles y de calidad. Nos comprometemos a brindarte una experiencia de compra eficiente y cercana, ayudándote a construir un hogar lleno de detalles que hagan la diferencia.";

    // Comprobación si la descripción larga es "" o "0"
    const descripcionLarga = (articulo.descripcion_larga === "" || articulo.descripcion_larga === "0") 
        ? mensajePredeterminado 
        : articulo.descripcion_larga;

    return (
        <div className="articulo-detalle">
            <div className='boton-volver'>
                <Link to="/home" className='link-boton-volver'>
                    <Button className="p-button-secondary volver-btn">
                        <FaArrowLeft className="volver-icono" /> Volver
                    </Button>
                </Link>
            </div>
            <Carousel dots={true} arrows={true} className="articulo-carousel">
                {imagenes.length > 0 ? (
                    imagenes.map(imagen => (
                        <div key={imagen.id_imagen} className="articulo-carousel-item">
                            <img src={imagen.url} alt={articulo.nombre} className="articulo-imagen" />
                        </div>
                    ))
                ) : (
                    <div className="articulo-carousel-item">
                        <img src="path/to/default-image.jpg" alt="Imagen no disponible" className="articulo-imagen" />
                    </div>
                )}
            </Carousel>
            <div className='articulo-informacion'>
                <h2 className="articulo-nombre">{articulo.nombre}</h2>
                <p className="p-articulo-descripcion">{articulo.descripcion}</p>
                <p className="articulo-precio">{formatearPrecio(articulo.precio)}</p>
                <div className="articulo-controles">
                    <div className="controles-unidades">
                        <div className="variacion-selector">
                            <label htmlFor="variaciones">Seleccione:</label>
                            <select
                                id="variaciones"
                                value={selectedVariacion}
                                onChange={(e) => setSelectedVariacion(e.target.value)}
                            >
                                {variaciones.map(variacion => (
                                    <option key={variacion.id_sku} value={variacion.id_sku}>
                                        {variacion.variacion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='controles'>
                            <Button icon="pi pi-minus" onClick={decrementarUnidades} className="p-button-icon-only" />
                            <span className="cantidad-unidades">{unidades}</span>
                            <Button icon="pi pi-plus" onClick={incrementarUnidades} className="p-button-icon-only" />
                            <Button className="p-button-success agregar-carrito-btn" onClick={handleAgregarAlCarrito}>
                                Añadir al carrito
                            </Button>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="articulo-descripcion-larga">{descripcionLarga}</p>
            </div>

            <Dialog visible={showDialog} onHide={() => setShowDialog(false)} header="Artículos añadidos!" modal>
                <div>{confirmMessage}</div>
                <div className="p-dialog-footer">
                    <Button label="Aceptar" onClick={() => setShowDialog(false)} />
                </div>
            </Dialog>
        </div>
    );
};

export default ArticuloPage;
