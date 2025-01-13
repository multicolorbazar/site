import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';     
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Informacion from '../components/Informacion';
import ArticulosRecientes from '../components/ArticulosRecientes';
import Categorias from '../components/Categorias';
import Articulos from '../components/Articulos';
import Garage from '../components/Garage';
//import EspecialHalloween from '../components/especial-halloween/EspecialHalloween';
//import EspecialNavidad from '../components/especial-navidad/EspecialNavidad';

function PrincipalPage() {
    return (
        <div className="App">
            <Informacion />
            <ArticulosRecientes />
            <Garage />
            <Categorias />
            <Articulos />
        </div>
    );
}

export default PrincipalPage;
