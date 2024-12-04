import React from 'react';
import { Link } from 'react-router-dom';
import articulos from '../../data/articulos';
import imagenesArticulos from '../../data/imagenesArticulos';
import './EspecialNavidad.css';
import Nieve from './Nieve';

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

const EspecialNavidad = () => {
    // Definir manualmente los id_subcategoria que quieres mostrar
    const subcategoriasNavidad = [37]; // Aquí defines los id_subcategoria que desees incluir

    // Filtrar los artículos disponibles que pertenecen a las subcategorías especificadas
    const articulosDisponibles = articulos
        .filter(articulo => articulo.disponible === 'si' && subcategoriasNavidad.includes(parseInt(articulo.id_subcategoria)))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente

    return (
        <div className="especial-navidad-container">
            <h3 className="especial-navidad-title">Especial de Navidad</h3>
            <Nieve />
            <div className="especial-navidad-grid">
                {articulosDisponibles.map(articulo => (
                    <Link key={articulo.id_articulo} to={`/articulo/${articulo.id_articulo}`} className="especial-navidad-item">
                        <img 
                            src={obtenerImagen(articulo.id_articulo)} 
                            alt={articulo.nombre} 
                            className="especial-navidad-imagen" 
                        />
                        <div className='especial-navidad-info'>
                            <h5 className="especial-navidad-nombre">{articulo.nombre}</h5>
                            <p className="especial-navidad-descripcion">{articulo.descripcion}</p>
                            <span className="especial-navidad-precio">{formatearPrecio(articulo.precio)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EspecialNavidad;
