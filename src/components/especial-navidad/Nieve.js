import React, { useEffect } from 'react';
import './Nieve.css';

const Nieve = () => {
    const MAX_SNOWFLAKES = 20; // Número máximo de copos de nieve visibles
    const CREATION_INTERVAL = 500; // Aumenta el intervalo de creación de copos

    const createSnowflake = () => {
        const snowflakeContainer = document.createElement('div');
        const fallingTime = Math.floor(Math.random() * 10) + 5;
        const flakePos = Math.floor(Math.random() * 90) + 5; // Limita la posición a 5-95%
        const flakeSize = (Math.floor(Math.random() * 80) + 20) / 100; // Tamaño entre 0.2 y 1

        snowflakeContainer.classList.add('flake-wrapper');
        snowflakeContainer.style.width = '40px';
        snowflakeContainer.style.height = '40px';
        snowflakeContainer.style.left = `${flakePos}%`;
        snowflakeContainer.style.transform = `scale(${flakeSize})`;
        snowflakeContainer.style.animation = `falling ${fallingTime}s linear infinite`;

        // Añade el SVG del copo
        snowflakeContainer.innerHTML = `
            <svg width="129px" height="140px" viewBox="0 0 129.108 140.597" class="flake">
                <path fill="#FFFFFF" d="M106.491,83.706l17.706,10.222l-4.067,7.046l-17.88-10.324l4.693,17.494l-7.814,2.096l-6.121-22.916l-0.604-2.402L71,72.519v25.01l1.569,1.627l16.848,16.906l-5.688,5.727L71,108.984V129h-8v-20.221l-12.917,12.807l-5.837-5.727l16.849-16.775L63,97.325V72.519L41.371,84.922l-0.79,2.402l-6.14,22.916l-7.823-2.096l4.688-17.494l-17.882,10.324l-4.068-7.046l17.705-10.222L9.566,79.018l2.096-7.823l23.095,6.188l2.223,0.596l21.66-12.505L37.157,53.071l-2.402,0.644l-22.916,6.14l-2.096-7.823l17.495-4.688L9.358,37.019l4.07-7.046l17.71,10.222l-4.678-17.494l7.842-2.096L40.525,43.7l0.669,2.223L63,58.428V33.622l-1.868-1.758L44.247,15.088l5.8-5.727L63,22.168V2h8v19.963L83.748,9.156l5.668,5.727L72.549,31.79L71,33.418v25.01l21.581-12.505l0.517-2.223l6.188-23.095l7.823,2.096l-4.688,17.494l17.705-10.222l4.068,7.046l-17.882,10.324l17.494,4.688l-2.096,7.823l-22.916-6.14l-2.402-0.644L74.911,65.473L96.57,77.979l2.223-0.596l23.095-6.188l2.096,7.823L106.491,83.706z"/>
            </svg>`;

        document.querySelector('.background').appendChild(snowflakeContainer);
    };

    const removeSnowflake = () => {
        const snowflakes = document.querySelectorAll('.flake-wrapper');
        
        // Elimina copos fuera de pantalla
        snowflakes.forEach(flake => {
            if (flake.getBoundingClientRect().top > window.innerHeight) {
                flake.remove();
            }
        });
        
        // Si el número de copos excede el límite, elimina los más antiguos
        if (snowflakes.length > MAX_SNOWFLAKES) {
            for (let i = 0; i < snowflakes.length - MAX_SNOWFLAKES; i++) {
                snowflakes[i].remove();
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            createSnowflake();
            removeSnowflake();
        }, CREATION_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return <div className="background"></div>;
};

export default Nieve;
