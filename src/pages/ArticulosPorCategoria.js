import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import articulos from '../data/articulos';
import categorias from '../data/categorias'; // Importar categorías
import { Button } from 'primereact/button';
import { FaArrowLeft } from 'react-icons/fa';
import imagenesArticulos from '../data/imagenesArticulos'; 
import './ArticulosPorCategoria.css';

// Función para obtener la URL de la imagen basada en el id del artículo
const obtenerImagen = (idArticulo) => {
    const imagen = imagenesArticulos.find(img => img.id_articulo === idArticulo);
    return imagen ? imagen.url : 'path/to/default-image.jpg'; // Ruta a una imagen predeterminada
};

// Función para formatear el precio en moneda chilena
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0 // Para mostrar los precios sin decimales, ajustar según sea necesario
    }).format(precio);
};

const ArticulosPorCategoria = () => {
    const { categoriaId } = useParams();
    const botonVolverRef = useRef(null); // Crear referencia para el botón

    // Convertir categoriaId a cadena para la comparación
    const categoriaIdString = categoriaId;

    // Filtrar los artículos por id_categoria y disponibilidad
    const articulosFiltrados = articulos
        .filter(articulo => articulo.id_categoria === categoriaIdString && articulo.disponible === 'si')
        // Ordenar alfabéticamente por nombre
        .sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));

    // Encontrar el nombre de la categoría usando el id
    const categoria = categorias.find(categoria => categoria.id.toString() === categoriaIdString);
    const nombreCategoria = categoria ? categoria.nombre : 'Categoría Desconocida';

    // Usar useEffect para hacer scroll al botón cuando el componente se monte
    useEffect(() => {
        if (botonVolverRef.current) {
            botonVolverRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <div className="ac-articulos-categoria-container">
            <div className='boton-volver' ref={botonVolverRef}> {/* Referencia aplicada aquí */}
                <Link to="/home" className='link-boton-volver'>
                    <Button className="p-button-secondary volver-btn">
                        <FaArrowLeft className="volver-icono" /> Bazar
                    </Button>
                </Link>
            </div>
            <h2 className="ac-articulos-categoria-title">{nombreCategoria}</h2>
            <div className="ac-articulos-categoria-grid">
                {articulosFiltrados.length > 0 ? (
                    articulosFiltrados.map((articulo) => (
                        <Link key={articulo.id_articulo} to={`/articulo/${articulo.id_articulo}`} className="ac-articulo-link">
                            <div className="ac-articulo-item">
                                <img 
                                    src={obtenerImagen(articulo.id_articulo)}
                                    alt={articulo.nombre} 
                                    className="ac-articulo-imagen" 
                                />
                                <div className="ac-articulo-info">
                                    <h5 className="ac-articulo-nombre">{articulo.nombre}</h5>
                                    <p className="ac-articulo-descripcion">{articulo.descripcion}</p>
                                    <span className="ac-articulo-precio">{formatearPrecio(articulo.precio)}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay artículos en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default ArticulosPorCategoria;
