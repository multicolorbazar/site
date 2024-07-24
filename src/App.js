import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import Encabezado from './components/Encabezado';
import PrincipalPage from './pages/PrincipalPage';
import ArticuloPage from './pages/ArticuloPage';
import CarritoPage from './pages/CarritoPage';
import ConfirmaCompraPage from './pages/ConfirmaCompraPage';
import ArticulosPorCategoria from './pages/ArticulosPorCategoria'; // Importa el nuevo componente
import { CarritoProvider } from './contexts/CarritoContext';

function App() {
    return (
        <CarritoProvider>
            <Router>
                <div className="App">
                    <Encabezado /> 
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<PrincipalPage />} />
                        <Route path="/articulo/:id_articulo" element={<ArticuloPage />} />
                        <Route path="/carrito" element={<CarritoPage />} />
                        <Route path="/confirmacompra" element={<ConfirmaCompraPage />} />
                        <Route path="/categoria/:categoriaId" element={<ArticulosPorCategoria />} /> {/* Añadir esta línea */}
                    </Routes>
                    <footer style={{ textAlign: 'center', padding: '10px', fontSize: '14px' }}>
                        Bazar Multicolor - Contacto: 
                        <i className="pi pi-phone" style={{ marginLeft: '8px', marginRight: '4px' }}></i>
                        <a 
                            href="tel:+56981605147"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            +569 816 051 47
                        </a>
                    </footer>
                </div>
            </Router>
        </CarritoProvider>
    );
}

export default App;
