import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import OpcionEnvioDelivery from './OpcionEnvioDelivery';
import OpcionEnvioEncomienda from './OpcionEnvioEncomienda';

const WelcomeModal = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const firstVisit = localStorage.getItem('firstVisit');

        if (!firstVisit) {
            setVisible(true);
            localStorage.setItem('firstVisit', 'true');
        }
    }, []);

    return (
        <Dialog
            header="Bienvenido"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => setVisible(false)}
            dismissableMask
        >
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <OpcionEnvioDelivery />
                </div>
                <div>
                    <OpcionEnvioEncomienda />
                </div>
            </Carousel>
        </Dialog>
    );
};

export default WelcomeModal;
