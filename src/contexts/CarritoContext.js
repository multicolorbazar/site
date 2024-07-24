import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(storedCarrito);
    }, []);

    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    };

    const agregarAlCarrito = (idArticulo, idSku, cantidad) => {
        const nuevoCarrito = [...carrito];
        const itemIndex = nuevoCarrito.findIndex(item => item.id_articulo === idArticulo && item.id_sku === idSku);
        
        if (itemIndex >= 0) {
            nuevoCarrito[itemIndex].unidades += cantidad;
            if (nuevoCarrito[itemIndex].unidades <= 0) {
                nuevoCarrito.splice(itemIndex, 1); // Remove item if quantity is 0 or less
            }
        } else if (cantidad > 0) {
            nuevoCarrito.push({ id_articulo: idArticulo, id_sku: idSku, unidades: cantidad });
        }

        actualizarCarrito(nuevoCarrito);
    };

    const eliminarDelCarrito = (idArticulo, idSku) => {
        const nuevoCarrito = carrito.filter(item => !(item.id_articulo === idArticulo && item.id_sku === idSku));
        actualizarCarrito(nuevoCarrito);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        localStorage.setItem('carrito', JSON.stringify([]));
    };

    return (
        <CarritoContext.Provider value={{ carrito, actualizarCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => useContext(CarritoContext);
