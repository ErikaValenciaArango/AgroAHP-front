import React from 'react';

const ComparacionPrecio = ({ alternativas }) => {
    // Lógica para comparar las alternativas por precio
    return (
        <div>
            <h3>Comparación de Precio</h3>
            <ul>
                {alternativas.map((alternativa, index) => (
                    <li key={index}>{alternativa} - Precio</li>
                    // Aquí podrías mostrar información de precios específicos
                ))}
            </ul>
        </div>
    );
};

export default ComparacionPrecio;
