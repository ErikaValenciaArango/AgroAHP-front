import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importar Chart.js
import './styles/pruebas.css';

const AHPCalculator = () => {
  const [criteriaRatings, setCriteriaRatings] = useState({
    precio: { selected: '', rating: 1 },
    impactoAmbiental: { selected: '', rating: 1 },
    toxicidad: { selected: '', rating: 1 }
  });

  const chartRef = useRef(null);

  // Función para calcular los pesos normalizados
  const calculateNormalizedWeights = () => {
    // Implementa la lógica para calcular los pesos normalizados
  };

  // Función para calcular la matriz de comparación
  const calculateComparisonMatrix = () => {
    // Implementa la lógica para calcular la matriz de comparación
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destruir el gráfico anterior si existe
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Datos para el gráfico de pastel
      const data = {
        labels: Object.keys(criteriaRatings),
        datasets: [{
          data: Object.values(criteriaRatings).map(criterion => criterion.rating),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          hoverOffset: 4
        }]
      };

      // Opciones para el gráfico de pastel
      const options = {
        plugins: {
          title: {
            display: true,
            text: 'Porcentaje de Criterios'
          }
        }
      };

      // Renderiza el gráfico de pastel
      chartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
      });
    }
  }, [criteriaRatings]);

  const handleSelectChange = (criterion, selectedCriterion) => {
    setCriteriaRatings(prevState => ({
      ...prevState,
      [criterion]: { ...prevState[criterion], selected: selectedCriterion }
    }));
  };

  const handleRatingChange = (criterion, value) => {
    // Comprobar si el valor es un número antes de actualizar el estado
    if (!isNaN(value)) {
      setCriteriaRatings(prevState => ({
        ...prevState,
        [criterion]: { ...prevState[criterion], rating: value }
      }));
    } else {
      // Si no es un número, puedes manejar el error aquí
      console.error('El valor no es un número');
    }
  };

  return (
    <div className="ahp-calculator-box">
      <h2>Calculadora AHP</h2>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
      <table>
        <thead>
          <tr>
            <th>Criterio</th>
            <th>Seleccione</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(criteriaRatings).map((criterion, index) => {
            let options = Object.keys(criteriaRatings).filter(option => option !== criterion);
            return (
              <tr key={criterion}>
                <td>{criterion}</td>
                <td>
                  <select
                    value={criteriaRatings[criterion].selected}
                    onChange={e => handleSelectChange(criterion, e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    {options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={criteriaRatings[criterion].rating}
                    onChange={e => handleRatingChange(criterion, parseInt(e.target.value))}
                  />
                  <span>{criteriaRatings[criterion].rating}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={calculateNormalizedWeights}>Calcular Pesos Normalizados</button>
      <button onClick={calculateComparisonMatrix}>Calcular Matriz de Comparación</button>
      {/* Agrega más botones y componentes para mostrar los resultados */}
    </div>
  );
};

export default AHPCalculator;
