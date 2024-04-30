import React from 'react';

const ComparacionToxicidad = ({ alternativas }) => {
    // Aquí implementa la lógica de comparación de toxicidad
    return (
        <div>
            <h2>Comparación de Toxicidad</h2>
            {/* Mostrar comparaciones de toxicidad utilizando las alternativas */}
            {alternativas.map((alt, index) => (
                <div key={index}>{/* Mostrar detalles de comparación de toxicidad */}</div>
            ))}
        </div>
    );
};

export default ComparacionToxicidad;
