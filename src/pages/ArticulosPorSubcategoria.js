import React from 'react'; 
import { useParams, Link } from 'react-router-dom';
import articulos from '../data/articulos';
import subcategorias from '../data/subcategoriaArticulos'; // Importar subcategorías
import { Button } from 'primereact/button';
import { FaArrowLeft } from 'react-icons/fa';
import imagenesArticulos from '../data/imagenesArticulos'; 
import './ArticulosPorSubcategoria.css';

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

const ArticulosPorSubcategoria = () => {
    const { subcategoriaId } = useParams();

    // Asegurarse de que subcategoriaId está definido
    if (!subcategoriaId) {
        return <p>Error: La subcategoría no es válida.</p>;
    }

    // Convertir ambos a cadenas para asegurarnos de que la comparación es correcta
    const subcategoriaIdString = subcategoriaId.toString();

    // Filtrar los artículos por id_subcategoria y disponibilidad
    const articulosFiltrados = articulos
        .filter(articulo => 
            articulo.id_subcategoria && // Validar que id_subcategoria exista
            articulo.id_subcategoria.toString() === subcategoriaIdString && 
            articulo.disponible === 'si'
        )
        // Ordenar alfabéticamente por nombre
        .sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));

    // Encontrar el nombre de la subcategoría usando el id_subcategoria
    const subcategoria = subcategorias?.find(subcategoria => subcategoria?.id_subcategoria.toString() === subcategoriaIdString);
    const nombreSubcategoria = subcategoria ? subcategoria.nombre : 'Subcategoría Desconocida';

    return (
        <div className="ac-articulos-categoria-container">
            <div className='boton-volver'>
                <Link to="/home" className='link-boton-volver'>
                    <Button className="p-button-secondary volver-btn">
                        <FaArrowLeft className="volver-icono" /> Bazar
                    </Button>
                </Link>
            </div>
            <h2 className="ac-articulos-categoria-title">{nombreSubcategoria}</h2>
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
                    <p>No hay artículos en esta subcategoría.</p>
                )}
            </div>
        </div>
    );
};

export default ArticulosPorSubcategoria;
