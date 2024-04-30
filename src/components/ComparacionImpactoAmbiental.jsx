import React from 'react';

const ComparacionImpactoAmbiental = ({ alternativas }) => {
    // Aquí implementa la lógica de comparación de impacto ambiental
    return (
        <div>
            <h2>Comparación de Impacto Ambiental</h2>
            {/* Mostrar comparaciones de impacto ambiental utilizando las alternativas */}
            {alternativas.map((alt, index) => (
                <div key={index}>{/* Mostrar detalles de comparación de impacto ambiental */}</div>
            ))}
        </div>
    );
};

export default ComparacionImpactoAmbiental;
