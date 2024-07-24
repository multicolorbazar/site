import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import articulos from '../data/articulos'; // Importa tus datos de artículos
import imagenesArticulos from '../data/imagenesArticulos'; // Importa tus datos de imágenes
import './Buscador.css'; // Asegúrate de crear este archivo CSS para los estilos

// Función para obtener la URL de la imagen basada en el id del artículo
const obtenerImagen = (idArticulo) => {
    const imagen = imagenesArticulos.find(img => img.id_articulo === idArticulo);
    return imagen ? imagen.url : 'path/to/default-image.jpg'; // Ruta a una imagen predeterminada
};

const Buscador = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const buscadorRef = useRef(null);
    const navigate = useNavigate(); // Usa el hook useNavigate

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        if (searchQuery.trim() === '') {
            setResultados([]);
            return;
        }

        const resultadosFiltrados = articulos.filter(articulo =>
            articulo.nombre.toLowerCase().includes(searchQuery) ||
            articulo.descripcion.toLowerCase().includes(searchQuery) ||
            articulo.descripcion_larga.toLowerCase().includes(searchQuery) ||
            articulo.id_categoria.toLowerCase().includes(searchQuery) ||
            articulo.id_subcategoria.toLowerCase().includes(searchQuery) ||
            articulo.precio.toString().includes(searchQuery)
        );

        setResultados(resultadosFiltrados);
    };

    const handleArticuloClick = (idArticulo) => {
        navigate(`/articulo/${idArticulo}`);
        onClose(); // Cierra el buscador después de la navegación
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buscadorRef.current && !buscadorRef.current.contains(event.target)) {
                onClose(); // Cierra el buscador al hacer clic fuera
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="b-buscador-container" ref={buscadorRef}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Buscar productos..."
                className="b-buscador-input"
            />
            <div className="b-buscador-resultados">
                {resultados.length > 0 ? (
                    <div className="b-resultados-scrollable">
                        {resultados.map((articulo) => (
                            <div
                                key={articulo.id_articulo}
                                className="b-articulo-item"
                                onClick={() => handleArticuloClick(articulo.id_articulo)}
                            >
                                <div
                                    className="b-articulo-imagen"
                                    style={{ backgroundImage: `url(${obtenerImagen(articulo.id_articulo)})` }}
                                />
                                <div className="b-articulo-info">
                                    <h5 className="b-articulo-nombre">{articulo.nombre}</h5>
                                    <span className="b-articulo-precio">${articulo.precio}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};

export default Buscador;
