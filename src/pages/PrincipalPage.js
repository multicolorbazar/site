import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';     
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Informacion from '../components/Informacion';
import ArticulosRecientes from '../components/ArticulosRecientes';
import Categorias from '../components/Categorias';
import Articulos from '../components/Articulos';

function PrincipalPage() {
    return (
        <div className="App">
            <Informacion />
            <ArticulosRecientes />
            <Categorias />
            <Articulos />
        </div>
    );
}

export default PrincipalPage;