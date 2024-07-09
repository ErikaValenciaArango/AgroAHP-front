import React, { useState, useEffect } from 'react';
import './styles/pruebas.css';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Pruebas = () => {

    const [alternativa, setAlternativa] = useState('');
    const [alternativasList, setAlternativasList] = useState([]);
    const [mostrarComparacion1, setMostrarComparacion1] = useState(false);
    const [comparacion1, setComparacion1] = useState([]);
    const [alternativaSeleccionada1, setAlternativaSeleccionada1] = useState('');
    const [continuarPresionado, setContinuarPresionado] = useState(false);
    const [seleccionesComparacion, setSeleccionesComparacion] = useState([]);
    const [matrizNormalizada, setMatrizNormalizada] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [percentagesPrecio, setPercentagesPrecio] = useState([]);


    const [matrizAHP, setMatrizAHP] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setAlternativa(value);
    };

    const handleSugerenciasClick = () => {
        setMostrarSugerencias(!mostrarSugerencias);
    };

    const agregarSugerencia = (sugerencia) => {
        setAlternativa(sugerencia);
        setMostrarSugerencias(false);
    };

    const sugerenciasSimuladas = ['Opción A', 'Opción B', 'Opción C'];

    const agregarAlternativa = () => {
        if (!continuarPresionado && alternativa.trim() !== '') {
            const existingIndex = alternativasList.findIndex((item) => item === alternativa.trim());
            if (existingIndex !== -1) {
                const nuevasAlternativas = [...alternativasList];
                nuevasAlternativas[existingIndex] = alternativa.trim();
                setAlternativasList(nuevasAlternativas);
            } else {
                setAlternativasList([...alternativasList, alternativa.trim()]);
            }
            setAlternativa('');
        }
    };

    const eliminarAlternativa = (index) => {
        if (!continuarPresionado) {
            const nuevasAlternativas = [...alternativasList];
            nuevasAlternativas.splice(index, 1);
            setAlternativasList(nuevasAlternativas);
        }
    };

    const editarAlternativa = (index) => {
        if (!continuarPresionado) {
            const alternativaEditada = prompt('Ingrese el nuevo nombre de la alternativa:', alternativasList[index]);
            if (alternativaEditada !== null) {
                const nuevasAlternativas = [...alternativasList];
                nuevasAlternativas[index] = alternativaEditada.trim();
                setAlternativasList(nuevasAlternativas);
            }
        }
    };

    const generarCombinaciones = (alternativas) => {
        const combinaciones = [];
        for (let i = 0; i < alternativas.length; i++) {
            for (let j = i + 1; j < alternativas.length; j++) {
                combinaciones.push({
                    alternativa1: alternativas[i],
                    alternativa2: alternativas[j],
                    rating: 1
                });
            }
        }
        return combinaciones;
    };

    const handleContinuar = (index) => {
        if (alternativasList.length < 2) {
            alert('Debe agregar al menos dos alternativas para continuar.');
            return;
        }
    
        setContinuarPresionado(true);
    
        const nuevasComparaciones = generarCombinaciones(alternativasList);
        switch (index) {
            case 0:
                setComparacion1(nuevasComparaciones);
                setMostrarComparacion1(true);
                break;
            default:
                break;
        }
    
        // Inicializar el estado de seleccionesComparacion con un array vacío
        setSeleccionesComparacion(Array(nuevasComparaciones.length).fill(""));
        // Resto del código...
    

        // Crear matriz AHP inicial con valores por defecto de 1
        const nuevaMatriz = [];
        for (let i = 0; i < alternativasList.length; i++) {
            const fila = [];
            for (let j = 0; j < alternativasList.length; j++) {
                fila.push(1);
            }
            nuevaMatriz.push(fila);
        }
        setMatrizAHP(nuevaMatriz);
    };

    const handleRatingChange = (index, value, comparacionIndex) => {
        switch (index) {
            case 0:
                const fila = Math.floor(comparacionIndex / (alternativasList.length - 1));
                const columna = comparacionIndex % (alternativasList.length - 1) + 1 + fila;
                actualizarMatrizAHP(value, fila, columna, comparacionIndex);
                const newComparacion1 = [...comparacion1];
                newComparacion1[comparacionIndex].rating = value;
                setComparacion1(newComparacion1);  
                const selectedValue = seleccionesComparacion[comparacionIndex];
                if(selectedValue === comparacion1[comparacionIndex].alternativa1){
                    console.log(selectedValue)
                }
                else{
                    console.log("no")
                }
                break;               
            default:
                break;
        }
    };
    
    const actualizarMatrizAHP = (valor, fila, columna, comparacionIndex) => {
        const selectedValue = seleccionesComparacion[comparacionIndex];
        const nuevaMatriz = matrizAHP.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if(selectedValue === comparacion1[comparacionIndex].alternativa1){
                    if (rowIndex === columna && colIndex === fila) {
                        return 1 / valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === fila && colIndex === columna) {
                        return valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHP[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else if(selectedValue === comparacion1[comparacionIndex].alternativa2){
                    if (rowIndex === columna && colIndex === fila) {
                        return valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === fila && colIndex === columna) {
                        return 1 / valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHP[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else{
                        if (rowIndex === columna && colIndex === fila) {
                            return 1 / valor; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === fila && colIndex === columna) {
                            return valor; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHP[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                }
            });
        });
    
        setMatrizAHP(nuevaMatriz);
    
        console.log("Nueva matriz AHP:", nuevaMatriz);
    };

    const handleSelectChange = (event, comparacionIndex) => {
        const selectedValue = event.target.value;
        const newValue = parseInt(event.target.parentNode.nextElementSibling.firstChild.value); // Obtiene el nuevo valor del rango
        console.log(newValue)
        const newSelecciones = [...seleccionesComparacion];
        newSelecciones[comparacionIndex] = selectedValue;
        setSeleccionesComparacion(newSelecciones);

        const newComparacion = [...comparacion1];
        const alternativa1 = newComparacion[comparacionIndex].alternativa1;
        const alternativa2 = newComparacion[comparacionIndex].alternativa2;
    
        // Determinar cuál alternativa está cambiando
        const fila = alternativasList.indexOf(selectedValue);
        const columna = alternativasList.indexOf(selectedValue === alternativa1 ? alternativa2 : alternativa1);
        
        setComparacion1(newComparacion);
    
        const nuevaMatriz = matrizAHP.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if (rowIndex === columna && colIndex === fila) {
                    return 1 / newValue; // Asignar el inverso en la posición inversa
                } else if (rowIndex === fila && colIndex === columna) {
                    return newValue; // Asignar el valor en la posición especificada
                } else if (rowIndex === colIndex) {
                    return 1; // Asignar 1 a la diagonal
                } else {
                    return matrizAHP[rowIndex][colIndex]; // Mantener otros valores de la matriz
                }
            });
        });
    
        // Actualizar el estado con la nueva matriz
        setMatrizAHP(nuevaMatriz);
    
        console.log("Nueva matriz AHP:", nuevaMatriz);
        setAlternativaSeleccionada1(event.target.value);
    };

    const crearMatrizNormalizada = () => {
        // Crear una nueva matriz para almacenar la matriz normalizada
        const matrizNormalizada = matrizAHP.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
                // Calcular la suma de la columna correspondiente
                const columnaSum = matrizAHP.reduce((acc, currRow) => acc + currRow[colIndex], 0);
                // Normalizar el valor dividiendo por la suma de la columna
                return value / columnaSum;
            });
        });
    
        // Puedes usar setState para actualizar una nueva variable de estado si es necesario
        // setMatrizNormalizada(matrizNormalizada);
        console.log("Matriz AHP normalizada:", matrizNormalizada);
        crearVectorPromedio(matrizNormalizada);
        return matrizNormalizada;
    };
    
    const crearVectorPromedio = (matrizNormalizada) => {
        const numeroElementos = matrizNormalizada.length;
        const vectorPromedio = matrizNormalizada.map(row => {
            const sumaFila = row.reduce((acc, val) => acc + val, 0);
            return (sumaFila / numeroElementos)*100;
        });

        console.log("Vector promedio:", vectorPromedio);
        setPercentagesPrecio(vectorPromedio);
        return vectorPromedio;
    };

    return (
        <div>
            <h2>Añadir Alternativas</h2>
            <div className="input-container">
                <div className='input-wrapper'>
                    <input
                        type="text"
                        placeholder="Ingrese una alternativa"
                        value={alternativa}
                        onChange={handleInputChange}
                        disabled={continuarPresionado}
                    />
                    <div className="sugerencias-container">
                        <button onClick={handleSugerenciasClick}>Sugerencias</button>
                        {mostrarSugerencias && (
                            <ul className="sugerencias-list">
                                {sugerenciasSimuladas.map((sugerencia, index) => (
                                    <li key={index} onClick={() => agregarSugerencia(sugerencia)}>
                                        {sugerencia}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <button onClick={agregarAlternativa} disabled={continuarPresionado}>Agregar</button>
            </div>
            <div className="alternativas-list">
                {alternativasList.map((item, index) => (
                    <div key={index} className="alternativa-item">
                        <span>{item}</span>
                        <div className="botones">
                            <button onClick={() => eliminarAlternativa(index)} disabled={continuarPresionado}>Eliminar</button>
                            <button onClick={() => editarAlternativa(index)} disabled={continuarPresionado}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {!mostrarComparacion1 && (
                    <button onClick={() => handleContinuar(0)}>Comparar por precio</button>
                )}
                {mostrarComparacion1 && (
                    <div>
                        <h2>Comparaciones por precio:</h2>
                        <table className="comparaciones-table">
                            <thead>
                                <tr>
                                    <th>Alternativas</th>
                                    <th>Calificación (1-9)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparacion1.map((comparacion, comparacionIndex) => (
                                    <tr key={comparacionIndex}>
                                        <td>
                                            <select id="alternativas1"
                                                value={seleccionesComparacion[comparacionIndex]}
                                                onChange={(e) => handleSelectChange(e, comparacionIndex)}
                                            >
                                                <option value={comparacion.alternativa1}>{comparacion.alternativa1}</option>
                                                <option value={comparacion.alternativa2}>{comparacion.alternativa2}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="range"
                                                min="1"
                                                max="9"
                                                value={comparacion.rating}
                                                onChange={(e) => handleRatingChange(0, parseInt(e.target.value), comparacionIndex)}
                                            />
                                            <span>{comparacion.rating}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => crearMatrizNormalizada()}>Confirmar</button>
                    </div>
                )}
            </div>
                {percentagesPrecio.length > 0 && (
                <div>
                    <h2>Vector Promedio</h2>
                    <Bar
                        data={{
                            labels: alternativasList,
                            datasets: [{
                                label: 'Vector Promedio',
                                data: percentagesPrecio,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>

    );
};

export default Pruebas;





