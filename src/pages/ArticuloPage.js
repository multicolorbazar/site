import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Carousel } from 'antd';
import ReactPlayer from 'react-player'; // Importamos el componente ReactPlayer
import 'antd/dist/reset.css';
import articulos from '../data/articulos';
import imagenesArticulos from '../data/imagenesArticulos';
import skuArticulos from '../data/skuArticulos';
import categorias from '../data/categorias';
import subcategoriaArticulos from '../data/subcategoriaArticulos'; 
import './ArticuloPage.css';
import { useCarrito } from '../contexts/CarritoContext'; 

const obtenerImagenes = (idArticulo) => imagenesArticulos.filter(img => img.id_articulo === idArticulo);
const obtenerVariaciones = (idArticulo) => {
    return skuArticulos
        .filter(sku => sku.id_articulo === idArticulo.toString())
        .map(sku => ({
            id_sku: sku.id_sku,
            variacion: sku.variacion
        }));
};

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
    const { carrito, actualizarCarrito } = useCarrito();

    // Estado para controlar el modal de la imagen ampliada
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const volverBtnRef = useRef(null);

    useEffect(() => {
        if (articulo) {
            const visitaKey = `visitas_articulo_${articulo.id_articulo}`;
            const visitas = parseInt(localStorage.getItem(visitaKey), 10) || 0;
            localStorage.setItem(visitaKey, visitas + 1);
        }

        if (volverBtnRef.current) {
            volverBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        const nuevoCarrito = [...carrito];
        const nuevoItem = {
            id_articulo,
            id_sku: selectedVariacion,
            unidades
        };

        const index = nuevoCarrito.findIndex(item => item.id_sku === selectedVariacion && item.id_articulo === idArticulo);
        
        if (index > -1) {
            nuevoCarrito[index].unidades += unidades;
        } else {
            nuevoCarrito.push(nuevoItem);
        }

        actualizarCarrito(nuevoCarrito);
        mostrarConfirmacion();
    };

    const descripcionLarga = (articulo.descripcion_larga === "" || articulo.descripcion_larga === "0") 
        ? "En nuestro bazar, cada producto es seleccionado con cuidado para ofrecerte lo mejor en artículos útiles y de calidad. Nos comprometemos a brindarte una experiencia de compra eficiente y cercana, ayudándote a construir un hogar lleno de detalles que hagan la diferencia." 
        : articulo.descripcion_larga;

    // Obtener el nombre de la categoría
    const idCategoria = parseInt(articulo.id_categoria, 10);
    const categoria = categorias.find(cat => cat.id === idCategoria);
    const nombreCategoria = categoria ? categoria.nombre : 'Categoría Desconocida';

    // Obtener el nombre de la subcategoría
    const idSubcategoria = parseInt(articulo.id_subcategoria, 10);
    const subcategoria = subcategoriaArticulos.find(sub => sub.id_subcategoria === idSubcategoria);
    const nombreSubcategoria = subcategoria ? subcategoria.nombre : 'Subcategoría Desconocida';

    const enlaceCategoria = `/categoria/${articulo.id_categoria}`;
    const enlaceSubcategoria = `/subcategoria/${articulo.id_subcategoria}`;

    // Función para abrir el modal con la imagen seleccionada
    const handleImageClick = (url) => {
        setSelectedImage(url);
        setShowImageDialog(true);
    };

    return (
        <div className="articulo-detalle">
            <div className='boton-volver'>
                
                <div className='botones-navegacion'>
                    <Link to={enlaceCategoria} className='link-boton-volver boton-categoria'>
                        <Button ref={volverBtnRef} className="p-button-secondary volver-btn">
                            <FaArrowLeft className="volver-icono" /> {nombreCategoria}
                        </Button>
                    </Link>
                    <Link to={enlaceSubcategoria} className='link-boton-volver boton-subcategoria'>
                        <Button className="p-button-secondary volver-btn">
                            {nombreSubcategoria} <FaArrowRight className="volver-icono" />
                        </Button>
                    </Link>
                </div>
            </div>


            <Carousel dots={true} arrows={true} className="articulo-carousel">
                {/* Verifica si el video existe antes de intentar renderizarlo */}
                {articulo.video && articulo.video.trim() !== '' && (
                    <div className="articulo-carousel-item video-container">
                        <ReactPlayer 
                            url={articulo.video} 
                            controls 
                            width="100%" 
                            height="100%" 
                            className="articulo-video" 
                        />
                    </div>
                )}
                {imagenes.length > 0 ? (
                    imagenes.map(imagen => (
                        <div key={imagen.id_imagen} className="articulo-carousel-item">
                            <img 
                                src={imagen.url} 
                                alt={articulo.nombre} 
                                className="articulo-imagen" 
                                onClick={() => handleImageClick(imagen.url)}
                            />
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

            <Dialog 
                visible={showImageDialog} 
                onHide={() => setShowImageDialog(false)} 
                header="Vista previa de la imagen"
                style={{ width: '80vw', maxWidth: '1000px' }} 
                modal
            >
                {selectedImage && (
                    <img src={selectedImage} alt="Imagen ampliada" style={{ width: '100%', height: 'auto' }} />
                )}
            </Dialog>
        </div>
    );
};

export default ArticuloPage;
