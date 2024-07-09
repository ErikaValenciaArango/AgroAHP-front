import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const GraficoBarras = ({ vectorPromedio }) => {
    const [chart, setChart] = useState(null);
    const chartContainer = React.createRef();

    useEffect(() => {
        if (chart) {
            chart.destroy(); // Limpiar el gráfico existente antes de actualizar
        }

        const ctx = chartContainer.current.getContext('2d');
        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: vectorPromedio.map((_, index) => `Alternativa ${index + 1}`),
                datasets: [{
                    label: 'Valor del vector promedio',
                    data: vectorPromedio,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de fondo de las barras
                    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Empezar el eje Y desde cero
                    }
                }
            }
        });

        setChart(newChart);

        // Limpiar el gráfico al desmontar el componente
        return () => newChart.destroy();
    }, [vectorPromedio]);

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default GraficoBarras;
