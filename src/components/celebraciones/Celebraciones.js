import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import articulos from '../../data/articulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import imagenesArticulos from '../../data/imagenesArticulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import './Celebraciones.css'; // Actualiza la hoja de estilos al nuevo nombre

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

// Componente para renderizar secciones individuales
const SeccionCelebracion = ({ titulo, estilo, articulos }) => (
    <div className={`celebraciones-seccion ${estilo}`}>
        <h3 className="celebraciones-titulo">{titulo}</h3>
        <div className="celebraciones-grid">
            {articulos.map(articulo => (
                <Link key={articulo.id_articulo} to={`/articulo/${articulo.id_articulo}`} className={`celebraciones-item ${estilo}`}>
                    <img 
                        src={obtenerImagen(articulo.id_articulo)} 
                        alt={articulo.nombre} 
                        className="celebraciones-imagen" 
                    />
                    <div className="celebraciones-info">
                        <h5 className="celebraciones-nombre">{articulo.nombre}</h5>
                        <p className="celebraciones-descripcion">{articulo.descripcion}</p>
                        <span className="celebraciones-precio">{formatearPrecio(articulo.precio)}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const Celebraciones = () => {
    // Filtrar los artículos según las subcategorías
    const fiestasPatrias = articulos.filter(articulo => articulo.disponible === 'si' && Number(articulo.id_subcategoria) === 35);
    const halloween = articulos.filter(articulo => articulo.disponible === 'si' && Number(articulo.id_subcategoria) === 36);
    const navidad = articulos.filter(articulo => articulo.disponible === 'si' && Number(articulo.id_subcategoria) === 37);

    return (
        <div className="celebraciones-container">
            <div className='boton-volver-container'>
                <Link to="/" className="volver-btn"><FaArrowLeft /> Volver al Inicio</Link>
            </div>
            <SeccionCelebracion titulo="Fiestas Patrias" estilo="fiestas-patrias" articulos={fiestasPatrias} />
            <SeccionCelebracion titulo="Halloween" estilo="halloween" articulos={halloween} />
            <SeccionCelebracion titulo="Navidad" estilo="navidad" articulos={navidad} />
        </div>
    );
};

export default Celebraciones;
