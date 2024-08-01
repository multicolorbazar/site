import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import articulos from '../data/articulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import imagenesArticulos from '../data/imagenesArticulos'; // Asegúrate de que la ruta del archivo de datos sea correcta
import './ArticulosRecientes.css'; // Estilos

const getRandomArticles = (num) => {
    // Crear una copia de los artículos y mezclar el array
    const shuffledArticles = [...articulos].sort(() => 0.5 - Math.random());
    // Filtrar artículos que están disponibles y devolver los primeros `num` artículos del array mezclado
    return shuffledArticles.filter(articulo => articulo.disponible === 'si').slice(0, num);
};

const obtenerImagen = (idArticulo) => {
    const imagen = imagenesArticulos.find(img => img.id_articulo === idArticulo);
    return imagen ? imagen.url : 'path/to/default-image.jpg'; // Ruta a una imagen predeterminada
};

// Función para formatear el precio en moneda chilena
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
};

const ArticulosRecientes = () => {
    const [items, setItems] = useState([]);
    const [showRandom, setShowRandom] = useState(false);

    useEffect(() => {
        const visitedArticles = [];

        // Recorrer todas las entradas en el localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            // Verificar si la clave es un contador de visitas de un artículo
            if (key && key.startsWith('visitas_articulo_')) {
                const articleId = parseInt(key.replace('visitas_articulo_', ''), 10);
                const visitCount = parseInt(localStorage.getItem(key), 10);

                // Buscar el artículo correspondiente en los datos
                const articulo = articulos.find(item => item.id_articulo === articleId && item.disponible === 'si');
                
                if (articulo) {
                    // Agregar el artículo con su contador de visitas
                    visitedArticles.push({ ...articulo, visitCount });
                }
            }
        }

        // Ordenar los artículos por la cantidad de visitas en orden descendente
        visitedArticles.sort((a, b) => b.visitCount - a.visitCount);

        // Establecer los artículos vistos recientemente en el estado
        if (visitedArticles.length >= 4) {
            setItems(visitedArticles.slice(0, 4));
        } else {
            setItems(getRandomArticles(4));
            setShowRandom(true);
        }
    }, []);

    return (
        <div className="articulos-recientes-container">
            <h2 className="articulosrecientes-title">
                {showRandom ? "Aquí encontrarás" : "Artículos vistos recientemente."}
            </h2>
            <div className="articulos-carousel">
                {items.length > 0 ? (
                    items.map((articulo) => (
                        <div key={articulo.id_articulo} className="articulo-ritem">
                            <Link to={`/articulo/${articulo.id_articulo}`} className="articulo-rlink">
                                <img 
                                    src={obtenerImagen(articulo.id_articulo)} 
                                    alt={articulo.nombre} 
                                    className="articulo-rimagen"
                                />
                                <div className="articulo-rinfo">
                                    <p className="articulo-rnombre">{articulo.nombre}</p>
                                    <p className="articulo-rdescripcion">{articulo.descripcion}</p>
                                    <p className="articulo-rprecio">{formatPrice(articulo.precio)}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No hay artículos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ArticulosRecientes;
