import React from 'react';
import { Link } from 'react-router-dom';
import categorias from '../data/categorias';
import './Categorias.css';

const Categorias = () => {
    return (
        <div className="categorias-container">
            <h2 className="categorias-title">Categorías</h2>
            <div className="categorias-grid">
                {categorias.map((categoria) => (
                    <Link 
                        key={categoria.id} 
                        to={`/categoria/${categoria.id}`} 
                        className="categoria-item"
                    >
                        <img src={categoria.imagen} alt={categoria.nombre} className="categoria-imagen" />
                        <p>{categoria.nombre}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categorias;
