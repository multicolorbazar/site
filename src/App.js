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
import ArticulosPorCategoria from './pages/ArticulosPorCategoria';
import ArticulosPorSubcategoria from './pages/ArticulosPorSubcategoria';
import Celebraciones from './components/celebraciones/Celebraciones';
import { CarritoProvider } from './contexts/CarritoContext';
import Footer from './components/Footer'; // Importa el componente Footer
//import WelcomePage from './pages/WelcomePage'; // Importa el modal
import ScrollToTopButton from './components/ScrollToTopButton.js';

function App() {
    return (
        <CarritoProvider>
            <Router>
                <div className="App">
                    <Encabezado />
                    <ScrollToTopButton />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<PrincipalPage />} />
                            <Route path="/articulo/:id_articulo" element={<ArticuloPage />} />
                            <Route path="/carrito" element={<CarritoPage />} />
                            <Route path="/confirmacompra" element={<ConfirmaCompraPage />} />
                            {/* Redirige de /categoria/7 a /celebraciones */}
                            <Route path="/categoria/7" element={<Navigate to="/celebraciones" />} />
                            <Route path="/categoria/:categoriaId" element={<ArticulosPorCategoria />} />
                            <Route path="/subcategoria/:subcategoriaId" element={<ArticulosPorSubcategoria />} />
                            <Route path="/celebraciones" element={<Celebraciones />} />
                        </Routes>
                    </div>
                    
                    <Footer />
                    
                </div>
            </Router>
        </CarritoProvider>
    );
}

export default App;
