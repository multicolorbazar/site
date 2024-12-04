import React from 'react';
import { Link } from 'react-router-dom';
import articulos from '../data/articulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import imagenesArticulos from '../data/imagenesArticulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import './Articulos.css';

// Función para obtener la URL de la imagen basada en el id del artículo
const obtenerImagen = (idArticulo) => {
    const imagen = imagenesArticulos.find(img => img.id_articulo === idArticulo);
    return imagen ? imagen.url : 'path/to/default-image.jpg'; // Ruta a una imagen predeterminada
};

// Función para formatear el precio como moneda chilena
const formatearPrecio = (precio) => {
    const formato = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });
    return formato.format(precio);
};

const Articulos = () => {
    // Lista de categorías que deben ser excluidas
    const categoriasExcluidas = [7, 8]; // 7: Celebraciones, 8: Venta de Garage

    // Filtrar los artículos para mostrar solo aquellos disponibles y que no estén en las categorías excluidas
    const articulosDisponibles = articulos
        .filter(articulo => {
            const isDisponible = articulo.disponible === 'si';
            const isCategoriaExcluida = categoriasExcluidas.includes(Number(articulo.id_categoria)); // Convertimos id_categoria a número por si acaso
            return isDisponible && !isCategoriaExcluida;
        })
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente por el campo nombre

    return (
        <div className="articulos-container">
            <h3 className="articulos-title">Artículos</h3>
            <div className="articulos-grid">
                {articulosDisponibles.map(articulo => (
                    <Link key={articulo.id_articulo} to={`/articulo/${articulo.id_articulo}`} className="articulo-item">
                        <img 
                            src={obtenerImagen(articulo.id_articulo)} 
                            alt={articulo.nombre} 
                            className="articulo-imagen" 
                        />
                        <div className='articulo-info'>
                            <h5 className="articulo-nombre">{articulo.nombre}</h5>
                            <p className="articulo-descripcion">{articulo.descripcion}</p>
                            <span className="articulo-precio">{formatearPrecio(articulo.precio)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Articulos;
