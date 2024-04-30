import React, { useState } from 'react';
import Alternativas from './Alternativas';
import ComparacionPrecio from './ComparacionPrecio';
import ComparacionImpactoAmbiental from './ComparacionImpactoAmbiental';
import ComparacionToxicidad from './ComparacionToxicidad';
import './styles/AlternativeRating.css'; // Ajusta la importación del archivo de estilos CSS si es necesario

const AlternativeRating = () => {
    const [alternativas, setAlternativas] = useState([]);
    const [showComparaciones, setShowComparaciones] = useState(false);

    const handleContinue = () => {
        setShowComparaciones(true); // Mostrar las comparaciones
    };

    return (
        <div>
            {!showComparaciones ? (
                <Alternativas onContinue={handleContinue} /> // Componente para agregar alternativas
            ) : (
                <div>
                    {/* Componentes de comparación que muestran las comparaciones */}
                    <ComparacionPrecio alternativas={alternativas} />
                    <ComparacionImpactoAmbiental alternativas={alternativas} />
                    <ComparacionToxicidad alternativas={alternativas} />
                </div>
            )}
        </div>
    );
};

export default AlternativeRating;
