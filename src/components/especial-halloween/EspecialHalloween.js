import React from 'react';
import { Link } from 'react-router-dom';
import articulos from '../../data/articulos';
import imagenesArticulos from '../../data/imagenesArticulos';
import './EspecialHalloween.css';

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

const EspecialHalloween = () => {
    // Definir manualmente los id_subcategoria que quieres mostrar
    const subcategoriasHalloween = [29, 30, 31, 32]; // Aquí defines los id_subcategoria que desees incluir

    // Filtrar los artículos disponibles que pertenecen a las subcategorías especificadas
    const articulosDisponibles = articulos
        .filter(articulo => articulo.disponible === 'si' && subcategoriasHalloween.includes(parseInt(articulo.id_subcategoria)))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente

    return (
        <div className="especial-container">
            <h3 className="especial-title">Especial de Halloween</h3>
            <div className="especial-grid">
                {articulosDisponibles.map(articulo => (
                    <Link key={articulo.id_articulo} to={`/articulo/${articulo.id_articulo}`} className="especial-item">
                        <img 
                            src={obtenerImagen(articulo.id_articulo)} 
                            alt={articulo.nombre} 
                            className="especial-imagen" 
                        />
                        <div className='especial-info'>
                            <h5 className="especial-nombre">{articulo.nombre}</h5>
                            <p className="especial-descripcion">{articulo.descripcion}</p>
                            <span className="especial-precio">{formatearPrecio(articulo.precio)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EspecialHalloween;
