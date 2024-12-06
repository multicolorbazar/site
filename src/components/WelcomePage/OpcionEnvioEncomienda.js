// OpcionEnvioEncomienda.js
import React from 'react';

const OpcionEnvioEncomienda = () => (
    <div className="opcion-envio-encomienda">
        <h3 style={{ textAlign: 'left'}}>Opción 2: Envío como encomienda</h3>
        <table className="envios-table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Horario</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Correos de Chile</td>
                    <td>
                        Lunes a Viernes: 09:00 - 18:00 hrs<br />
                        Sábado: 09:30 - 13:00 hrs<br />
                        Domingo: CERRADO
                    </td>
                </tr>
                <tr>
                    <td>Chilexpress</td>
                    <td>Lunes a Viernes: 09:00 - 18:00 hrs</td>
                </tr>
                <tr>
                    <td>Starken</td>
                    <td>
                        Lunes a Viernes: 09:00 - 18:30 hrs<br />
                        Sábados: 09:00 - 13:00 hrs
                    </td>
                </tr>
                <tr>
                    <td>Blue Express</td>
                    <td>Abierto 24/7</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default OpcionEnvioEncomienda;
