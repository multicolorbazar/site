import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PromocionesNavidad from '../components/WelcomePage/PromocionesNavidad';

const WelcomeModal = () => {
    const [visible, setVisible] = useState(true); // El modal siempre estará visible

    useEffect(() => {
        // Comentamos la lógica relacionada con 'firstVisit'
        // const firstVisit = localStorage.getItem('firstVisit');

        // if (!firstVisit) {
        //     setVisible(true);
        //     localStorage.setItem('firstVisit', 'true');
        // }
    }, []);

    return (
        <Dialog
            header="¡Bienvenido!"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => setVisible(false)}
            dismissableMask
        >
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <PromocionesNavidad />
                </div>
            </Carousel>
        </Dialog>
    );
};

export default WelcomeModal;
