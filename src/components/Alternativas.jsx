import React, { useState, useEffect } from 'react';
import logo from './imagenes/logo.png';
import './styles/alternativas.css';
import axios from 'axios';


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Alternativas = () => {
    const [alternativa, setAlternativa] = useState('');
    const [alternativasList, setAlternativasList] = useState([]);
    const [mostrarComparacion1, setMostrarComparacion1] = useState(false);
    const [mostrarComparacion2, setMostrarComparacion2] = useState(false);
    const [mostrarComparacion3, setMostrarComparacion3] = useState(false);
    const [comparacion1, setComparacion1] = useState([]);
    const [comparacion2, setComparacion2] = useState([]);
    const [comparacion3, setComparacion3] = useState([]);
    const [alternativaSeleccionada1, setAlternativaSeleccionada1] = useState('');
    const [alternativaSeleccionada2, setAlternativaSeleccionada2] = useState('');
    const [alternativaSeleccionada3, setAlternativaSeleccionada3] = useState('');
    const [continuarPresionado, setContinuarPresionado] = useState(false);
    const [seleccionesComparacion, setSeleccionesComparacion] = useState([]);
    const [seleccionesComparacionI, setSeleccionesComparacionI] = useState([]);
    const [seleccionesComparacionT, setSeleccionesComparacionT] = useState([]);

    const [matrizAHPPrecio, setMatrizAHPPrecio] = useState([]);
    const [matrizAHPImpactoA, setMatrizAHPImpactoA] = useState([]);
    const [matrizAHPToxicidad, setMatrizAHPToxicidad] = useState([]);
    const [percentagesPrecio, setPercentagesPrecio] = useState([]);
    const [percentagesImpactoA, setPercentagesImpactoA] = useState([]);
    const [percentagesToxicidad, setPercentagesToxicidad] = useState([]);

    const [mostrarBotonImpactoAmbiental, setMostrarBotonImpactoAmbiental] = useState(false);
    const [MostrarBotonToxicidad, setMostrarBotonToxicidad] = useState(false);
    const [MostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [MostrarRanking, setMostrarRanking] = useState(false);

    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

    //obtener modelos de criterios 
    const loginData = JSON.parse(localStorage.getItem('login'));
    const userId = loginData ? loginData.user._id : null;
    const [criterios, setCriterios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successR, setSuccessR] = useState(" ");
    const [selectedCriterio, setSelectedCriterio] = useState(null);
    const [selectedPercentage, setSelectedPercentage] = useState(0); // Estado para el porcentaje seleccionado
    const [resultadoPrecio, setResultadoPrecio] = useState([]); 
    const [resultadoImpactoA, setResultadoImpactoA] = useState([]); 
    const [resultadoToxicidad, setResultadoToxicidad] = useState([]); 
    const [ranking, setRanking] = useState([]); 

    useEffect(() => {
        const obtenerCriterios = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getCriteriaByUser`, {
                    criteria_user: userId,
                });
                setCriterios(response.data);
            } catch (error) {
                setError('Error al obtener los criterios.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            obtenerCriterios();
        }
    }, [userId]);

    if (!loginData) {
        return <p>No estás autenticado.</p>;
    }

    //

    const handleInputChange = (event) => {
        setAlternativa(event.target.value);
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
            case 1:
                setComparacion2(nuevasComparaciones);
                setMostrarComparacion2(true);
                break;
            case 2:
                setComparacion3(nuevasComparaciones);
                setMostrarComparacion3(true);
                break;
            default:
                break;
        }

        // Crear matriz AHP inicial con valores por defecto de 1
        const nuevaMatrizPrecio = [];
        for (let i = 0; i < alternativasList.length; i++) {
            const fila = [];
            for (let j = 0; j < alternativasList.length; j++) {
                fila.push(1);
            }
            nuevaMatrizPrecio.push(fila);
        }
        setMatrizAHPPrecio(nuevaMatrizPrecio);
        
        const nuevaMatrizImpactoA = [];
        for (let i = 0; i < alternativasList.length; i++) {
            const filaI = [];
            for (let j = 0; j < alternativasList.length; j++) {
                filaI.push(1);
            }
            nuevaMatrizImpactoA.push(filaI);
        }
        setMatrizAHPImpactoA(nuevaMatrizImpactoA);

        const nuevaMatrizToxicidad = [];
        for (let i = 0; i < alternativasList.length; i++) {
            const filaT = [];
            for (let j = 0; j < alternativasList.length; j++) {
                filaT.push(1);
            }
            nuevaMatrizToxicidad.push(filaT);
        }
        setMatrizAHPToxicidad(nuevaMatrizToxicidad);
    };


    const handleRatingChange = (index, value, comparacionIndex) => {
        switch (index) {
            case 0:
                const fila = Math.floor(comparacionIndex / (alternativasList.length - 1));
                const columna = comparacionIndex % (alternativasList.length - 1) + 1 + fila;
                actualizarMatrizAHPPrecio(value, fila, columna, comparacionIndex);
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
            case 1:
                const filaI = Math.floor(comparacionIndex / (alternativasList.length - 1));
                const columnaI = comparacionIndex % (alternativasList.length - 1) + 1 + filaI;
                actualizarMatrizAHPImpactoA(value, filaI, columnaI, comparacionIndex);
                const newComparacion2 = [...comparacion2];
                newComparacion2[comparacionIndex].rating = value;
                setComparacion2(newComparacion2);
                const selectedValueI = seleccionesComparacionI[comparacionIndex];
                if(selectedValueI === comparacion2[comparacionIndex].alternativa1){
                    console.log(selectedValueI)
                }
                else{
                    console.log("no")
                }
                break; 
            case 2:
                const filaT = Math.floor(comparacionIndex / (alternativasList.length - 1));
                const columnaT = comparacionIndex % (alternativasList.length - 1) + 1 + filaT;
                actualizarMatrizAHPToxicidad(value, filaT, columnaT, comparacionIndex);
                const newComparacion3 = [...comparacion3];
                newComparacion3[comparacionIndex].rating = value;
                setComparacion3(newComparacion3);
                const selectedValueT = seleccionesComparacionT[comparacionIndex];
                if(selectedValueT === comparacion3[comparacionIndex].alternativa1){
                    console.log(selectedValueT)
                }
                else{
                    console.log("no")
                }
                break;
            default:
                break;
        }
    };
    
    const actualizarMatrizAHPPrecio = (valor, fila, columna, comparacionIndex) => {
        const selectedValue = seleccionesComparacion[comparacionIndex];
        const nuevaMatrizPrecio = matrizAHPPrecio.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if(selectedValue === comparacion1[comparacionIndex].alternativa1){
                    if (rowIndex === columna && colIndex === fila) {
                        return 1 / valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === fila && colIndex === columna) {
                        return valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHPPrecio[rowIndex][colIndex]; // Mantener otros valores de la matriz
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
                        return matrizAHPPrecio[rowIndex][colIndex]; // Mantener otros valores de la matriz
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
                            return matrizAHPPrecio[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                }
            });
        });
        console.log("Nueva matriz AHP Precio:", nuevaMatrizPrecio);
        setMatrizAHPPrecio(nuevaMatrizPrecio);
    
    };

    const actualizarMatrizAHPImpactoA = (valor, filaI, columnaI, comparacionIndex) => {
        const selectedValueI = seleccionesComparacionI[comparacionIndex];
        const nuevaMatrizImpactoA = matrizAHPImpactoA.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if(selectedValueI === comparacion2[comparacionIndex].alternativa1){
                    if (rowIndex === columnaI && colIndex === filaI) {
                        return 1 / valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === filaI && colIndex === columnaI) {
                        return valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHPImpactoA[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else if(selectedValueI === comparacion2[comparacionIndex].alternativa2){
                    if (rowIndex === columnaI && colIndex === filaI) {
                        return valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === filaI && colIndex === columnaI) {
                        return 1 / valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHPImpactoA[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else{
                        if (rowIndex === columnaI && colIndex === filaI) {
                            return 1 / valor; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === filaI && colIndex === columnaI) {
                            return valor; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHPImpactoA[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                }
            });
        });
        console.log("Nueva matriz AHP impacto:", nuevaMatrizImpactoA);
        setMatrizAHPImpactoA(nuevaMatrizImpactoA);
    
    };

    const actualizarMatrizAHPToxicidad = (valor, filaT, columnaT, comparacionIndex) => {
        const selectedValueT = seleccionesComparacionT[comparacionIndex];
        const nuevaMatrizToxicidad = matrizAHPToxicidad.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if(selectedValueT === comparacion3[comparacionIndex].alternativa1){
                    if (rowIndex === columnaT && colIndex === filaT) {
                        return 1 / valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === filaT && colIndex === columnaT) {
                        return valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHPToxicidad[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else if(selectedValueT === comparacion3[comparacionIndex].alternativa2){
                    if (rowIndex === columnaT && colIndex === filaT) {
                        return valor; // Asignar el inverso en la posición inversa
                    } else if (rowIndex === filaT && colIndex === columnaT) {
                        return 1 / valor; // Asignar el valor en la posición especificada
                    } else if (rowIndex === colIndex) {
                        return 1; // Asignar 1 a la diagonal
                    } else {
                        return matrizAHPToxicidad[rowIndex][colIndex]; // Mantener otros valores de la matriz
                    }
                }
                else{
                        if (rowIndex === columnaT && colIndex === filaT) {
                            return 1 / valor; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === filaT && colIndex === columnaT) {
                            return valor; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHPToxicidad[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                }
            });
        });
        console.log("Nueva matriz AHP toxicidad:", nuevaMatrizToxicidad);
        setMatrizAHPToxicidad(nuevaMatrizToxicidad);
    
    };

    const handleSelectChange = (event, index, comparacionIndex) => {
        switch (index) {
            case 0:
                const selectedValue = event.target.value;
                const newValue = parseInt(event.target.parentNode.nextElementSibling.firstChild.value); // Obtiene el nuevo valor del rango
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
            
                const nuevaMatrizPrecio = matrizAHPPrecio.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        if (rowIndex === columna && colIndex === fila) {
                            return 1 / newValue; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === fila && colIndex === columna) {
                            return newValue; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHPPrecio[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                    });
                });
                console.log(nuevaMatrizPrecio)

                // Actualizar el estado con la nueva matriz
                setMatrizAHPPrecio(nuevaMatrizPrecio);
                setAlternativaSeleccionada1(event.target.value);                
                break;
            case 1:
                const selectedValueI = event.target.value;
                const newValueI = parseInt(event.target.parentNode.nextElementSibling.firstChild.value); // Obtiene el nuevo valor del rango
                const newSeleccionesI = [...seleccionesComparacionI];
                newSeleccionesI[comparacionIndex] = selectedValueI;
                setSeleccionesComparacionI(newSeleccionesI);
        
                const newComparacionI = [...comparacion2];
                const alternativa1I = newComparacionI[comparacionIndex].alternativa1;
                const alternativa2I = newComparacionI[comparacionIndex].alternativa2;
            
                // Determinar cuál alternativa está cambiando
                const filaI = alternativasList.indexOf(selectedValueI);
                const columnaI = alternativasList.indexOf(selectedValueI === alternativa1I ? alternativa2I : alternativa1I);
                
                setComparacion2(newComparacionI);
            
                const nuevaMatrizImpactoA = matrizAHPImpactoA.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        if (rowIndex === columnaI && colIndex === filaI) {
                            return 1 / newValueI; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === filaI && colIndex === columnaI) {
                            return newValueI; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHPImpactoA[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                    });
                });
                console.log(nuevaMatrizImpactoA)
            
                // Actualizar el estado con la nueva matriz
                setMatrizAHPImpactoA(nuevaMatrizImpactoA);
                setAlternativaSeleccionada2(event.target.value);
                break;
            case 2:
                const selectedValueT = event.target.value;
                const newValueT = parseInt(event.target.parentNode.nextElementSibling.firstChild.value); // Obtiene el nuevo valor del rango
                const newSeleccionesT = [...seleccionesComparacionT];
                newSeleccionesT[comparacionIndex] = selectedValueT;
                setSeleccionesComparacionT(newSeleccionesT);
        
                const newComparacionT = [...comparacion3];
                const alternativa1T = newComparacionT[comparacionIndex].alternativa1;
                const alternativa2T = newComparacionT[comparacionIndex].alternativa2;
            
                // Determinar cuál alternativa está cambiando
                const filaT = alternativasList.indexOf(selectedValueT);
                const columnaT = alternativasList.indexOf(selectedValueT === alternativa1T ? alternativa2T : alternativa1T);
                
                setComparacion3(newComparacionT);
            
                const nuevaMatrizToxicidad = matrizAHPToxicidad.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        if (rowIndex === columnaT && colIndex === filaT) {
                            return 1 / newValueT; // Asignar el inverso en la posición inversa
                        } else if (rowIndex === filaT && colIndex === columnaT) {
                            return newValueT; // Asignar el valor en la posición especificada
                        } else if (rowIndex === colIndex) {
                            return 1; // Asignar 1 a la diagonal
                        } else {
                            return matrizAHPToxicidad[rowIndex][colIndex]; // Mantener otros valores de la matriz
                        }
                    });
                });
                console.log(nuevaMatrizToxicidad)
            
                // Actualizar el estado con la nueva matriz
                setMatrizAHPToxicidad(nuevaMatrizToxicidad);
                setAlternativaSeleccionada3(event.target.value);
                break;
            default:
                break;
        }
    };

    const crearMatrizNormalizadaPrecio = () => {
        // Crear una nueva matriz para almacenar la matriz normalizada
        const matrizNormalizadaPrecio = matrizAHPPrecio.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
                // Calcular la suma de la columna correspondiente
                const columnaSum = matrizAHPPrecio.reduce((acc, currRow) => acc + currRow[colIndex], 0);
                // Normalizar el valor dividiendo por la suma de la columna
                return value / columnaSum;
            });
        });
    
        // Puedes usar setState para actualizar una nueva variable de estado si es necesario
        // setMatrizNormalizada(matrizNormalizada);
        console.log("Matriz AHP normalizada:", matrizNormalizadaPrecio);
        crearVectorPromedioPrecio(matrizNormalizadaPrecio);

        setMostrarBotonImpactoAmbiental(true);

        return matrizNormalizadaPrecio;
    };

    const crearMatrizNormalizadaImpactoA = () => {
        // Crear una nueva matriz para almacenar la matriz normalizada
        const matrizNormalizadaImpactoA = matrizAHPImpactoA.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
                // Calcular la suma de la columna correspondiente
                const columnaSum = matrizAHPImpactoA.reduce((acc, currRow) => acc + currRow[colIndex], 0);
                // Normalizar el valor dividiendo por la suma de la columna
                return value / columnaSum;
            });
        });

        console.log("Matriz AHP normalizada Im:", matrizNormalizadaImpactoA);
        crearVectorPromedioImpactoA(matrizNormalizadaImpactoA);

        setMostrarBotonToxicidad(true);

        return matrizNormalizadaImpactoA;
    };

    const crearMatrizNormalizadaToxicidad = () => {
        // Crear una nueva matriz para almacenar la matriz normalizada
        const matrizNormalizadaToxicidad = matrizAHPToxicidad.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
                // Calcular la suma de la columna correspondiente
                const columnaSum = matrizAHPToxicidad.reduce((acc, currRow) => acc + currRow[colIndex], 0);
                // Normalizar el valor dividiendo por la suma de la columna
                return value / columnaSum;
            });
        });
    
        console.log("Matriz AHP normalizada T:", matrizNormalizadaToxicidad);
        crearVectorPromedioToxicidad(matrizNormalizadaToxicidad);

        setMostrarConfirmar(true);

        return matrizNormalizadaToxicidad;
    };
    
    const crearVectorPromedioPrecio = (matrizNormalizadaPrecio) => {
        const numeroElementos = matrizNormalizadaPrecio.length;
        const VectorPromedioPrecio = matrizNormalizadaPrecio.map(row => {
            const sumaFila = row.reduce((acc, val) => acc + val, 0);
            return ((sumaFila / numeroElementos)*100);
        });
    
        console.log("Vector promedio:", VectorPromedioPrecio);
        setPercentagesPrecio(VectorPromedioPrecio);
        return VectorPromedioPrecio;
    };

    const crearVectorPromedioImpactoA = (matrizNormalizadaImpactoA) => {
        const numeroElementos = matrizNormalizadaImpactoA.length;
        const VectorPromedioImpactoA = matrizNormalizadaImpactoA.map(row => {
            const sumaFila = row.reduce((acc, val) => acc + val, 0);
            return ((sumaFila / numeroElementos)*100);
        });
    
        console.log("Vector promedio:", VectorPromedioImpactoA);
        setPercentagesImpactoA(VectorPromedioImpactoA);
        return VectorPromedioImpactoA;
    };

    const crearVectorPromedioToxicidad = (matrizNormalizadaToxicidad) => {
        const numeroElementos = matrizNormalizadaToxicidad.length;
        const VectorPromedioToxicidad = matrizNormalizadaToxicidad.map(row => {
            const sumaFila = row.reduce((acc, val) => acc + val, 0);
            return ((sumaFila / numeroElementos)*100);
        });
    
        console.log("Vector promedio:", VectorPromedioToxicidad);
        setPercentagesToxicidad(VectorPromedioToxicidad);
        return VectorPromedioToxicidad;
    };

    const handleSelectChangeC = (event) =>{
        const selectedId = event.target.value;
        setSelectedCriterio(selectedId); // Actualiza el criterio seleccionado

        // Buscar el criterio seleccionado en el arreglo criterios
        const selectedCriterioObj = criterios.find(criterio => criterio._id === selectedId);

        // Si se encuentra el criterio, actualizar el estado del porcentaje
        if (selectedCriterioObj) {
            setSelectedPercentage([selectedCriterioObj.percentage]); // Inicializa como array con el valor
        } else {
            setSelectedPercentage([]); // O manejarlo según tu lógica de error
        }
    }

    const calcularRanking = (percentagesPrecio, percentagesImpactoA, percentagesToxicidad, selectedPercentage) =>{
        var rankingP = selectedPercentage[0][0];
        console.log("ranking" + rankingP)
        const multiplicarVectorP = (percentagesPrecio, rankingP) => {
            return(percentagesPrecio.map(elemento => ((elemento/100) * (rankingP/100))));
        };

        const resultadoP = multiplicarVectorP(percentagesPrecio, rankingP);
        setResultadoPrecio(resultadoP)
        console.log("precio" + resultadoPrecio)

        //Impacto Ambiental
        var rankingIA = selectedPercentage[0][1];
        console.log("ranking IA" + rankingIA)
        const multiplicarVectorIA = (percentagesImpactoA, rankingIA) => {
            return(percentagesImpactoA.map(elemento => ((elemento/100) * (rankingIA/100))));
        };

        const resultadoIA = multiplicarVectorIA(percentagesImpactoA, rankingIA);
        setResultadoImpactoA(resultadoIA)
        console.log("impacto" + resultadoImpactoA)

        //Toxicidad
        var rankingT = selectedPercentage[0][2];
        console.log("ranking T" + rankingT)
        const multiplicarVectorT = (percentagesToxicidad, rankingT) => {
            return(percentagesToxicidad.map(elemento => ((elemento/100) * (rankingT/100))));
        };

        const resultadoT = multiplicarVectorT(percentagesToxicidad, rankingT);
        setResultadoToxicidad(resultadoT)
        console.log("toxicidad" + resultadoToxicidad)

        if (resultadoP.length !== resultadoIA.length || resultadoIA.length !== resultadoT.length) {
            console.log("Los arreglos deben tener la misma longitud.");
        } else {
            const suma = resultadoP.map((num, index) => {
                const sumaElementos = num + resultadoIA[index] + resultadoT[index];
                return sumaElementos;
            });
            console.log("Suma total:", suma);
        }
        
        const sumaConIndices = resultadoPrecio.map((num, index) => {
            const suma = num + resultadoImpactoA[index] + resultadoToxicidad[index];
            return { suma, index };
        });

        // Ordenar el arreglo basado en las sumas en orden descendente
        sumaConIndices.sort((a, b) => b.suma - a.suma);
        console.log("Suma con indices:", sumaConIndices);

                // Extraer los índices de los objetos ordenados
        const indicesOrdenados = sumaConIndices.map(item => item.index);

        // Imprimir los índices ordenados
        console.log("Indices ordenados:", indicesOrdenados);
        setRanking(indicesOrdenados)
        setMostrarRanking(true)
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                <a className="navbar-brand" href="/">
                    <img className="logo" alt="Logo-AgroAHP" src={logo} />
                </a>
                <div className="navbar-links">
                    <a href="/principal">Menú Principal</a>
                    <a href="/perfil">Mi Perfil</a>
                    <a href="/">Cerrar Sesión</a>
                </div>
                </div>
            </nav>
            <div style={{ textAlign: 'center' }}>
                <h1>SELECCIÓN DE FITOSANITARIO O AGROQUIMICO</h1>
            </div>
            <div>
                <label><b>Nombre u objetivo de la decisión:</b></label>
                <input
                type="text"
                placeholder="Ingrese el nombre del modelo"
                />
            </div>
            <div className="criterios-container">
                <h3>Seleccione el modelo de criterios con el que deseas evaluar tus alternativas:</h3>
                <select onChange={handleSelectChangeC} value={selectedCriterio}>
                    <option value="">Selecciona un modelo de criterios</option>
                    {criterios.map(criterio => (
                        <option key={criterio._id} value={criterio._id}>
                            {criterio.criteria_name}
                        </option>
                    ))}
                </select>
            </div>
            <h3>Añadir alternativas</h3>
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
                        <h2>Comparación de alternativas por precio:</h2>
                        <table className="comparaciones-table">
                            <thead>
                                <tr>
                                    <th>¿Cuál alternativa tiene mejor precio?</th>
                                    <th>Seleccione</th>
                                    <th>¿Cuán favorable es el precio? (Calificación 1-9)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparacion1.map((comparacion, comparacionIndex) => (
                                    <tr key={comparacionIndex}>
                                        <td>
                                            {comparacion.alternativa1} o {comparacion.alternativa2}
                                        </td>
                                        <td>
                                            <select id="alternativas1"
                                                value={seleccionesComparacion[comparacionIndex]}
                                                onChange={(e) => handleSelectChange(e, 0, comparacionIndex)}
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
                        {!mostrarBotonImpactoAmbiental && (
                            <button onClick={() => crearMatrizNormalizadaPrecio()}>Confirmar comparación</button>
                        )}
                    </div>
                )}
            </div>
            <div>
                {!mostrarComparacion2 && mostrarBotonImpactoAmbiental && (
                    <button onClick={() => handleContinuar(1)}>Comparar por impacto ambiental</button>
                )}
                {mostrarComparacion2 && (
                    <div>
                        <h2>Comparación de alternativas por impacto ambiental:</h2>
                        <table className="comparaciones-table">
                            <thead>
                                <tr>
                                    <th>¿Cuál alternativa tiene menor impacto ambiental?</th>
                                    <th>Seleccione</th>
                                    <th>¿Cuánto más sostenible es esta alternativa? (Calificación 1-9)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparacion2.map((comparacion, comparacionIndex) => (
                                    <tr key={comparacionIndex}>
                                        <td>
                                            {comparacion.alternativa1} o {comparacion.alternativa2}
                                        </td>
                                        <td>
                                            <select
                                                value={seleccionesComparacionI[comparacionIndex]}
                                                onChange={(e) => handleSelectChange(e, 1, comparacionIndex)}
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
                                                onChange={(e) => handleRatingChange(1, parseInt(e.target.value), comparacionIndex)}
                                            />
                                            <span>{comparacion.rating}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!MostrarBotonToxicidad && (
                            <button onClick={() => crearMatrizNormalizadaImpactoA()}>Confirmar comparación</button>
                        )}
                    </div>
                )}
            </div>
            <div>
                {!mostrarComparacion3 && MostrarBotonToxicidad && (
                    <button onClick={() => handleContinuar(2)}>Comparar por toxicidad</button>
                )}
                {mostrarComparacion3 && (
                    <div>
                        <h2>Comparación de alternativas por toxicidad:</h2>
                        <table className="comparaciones-table">
                            <thead>
                                <tr>
                                    <th>¿Qué alternativa tiene la menor toxicidad?</th>
                                    <th>Seleccione</th>
                                    <th>¿Cuánto menos perjudicial es esta alternativa? (Calificación 1-9)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparacion3.map((comparacion, comparacionIndex) => (
                                    <tr key={comparacionIndex}>
                                        <td>
                                            {comparacion.alternativa1} o {comparacion.alternativa2}
                                        </td>
                                        <td>
                                            <select 
                                                value={seleccionesComparacionT[comparacionIndex]}
                                                onChange={(e) => handleSelectChange(e, 2, comparacionIndex)}
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
                                                onChange={(e) => handleRatingChange(2, parseInt(e.target.value), comparacionIndex)}
                                            />
                                            <span>{comparacion.rating}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!MostrarConfirmar &&(
                            <button onClick={() => crearMatrizNormalizadaToxicidad()}>Confirmar comparación</button>
                        )}
                    </div>
                )}
            </div>
            <div>
            {percentagesPrecio.length > 0 && percentagesImpactoA.length > 0 && percentagesToxicidad.length > 0 && (
                <>
                <h2 className="tituloGraficos">Gráficos de porcentajes</h2>
                <div className='graficosBarras'>
                    <div className='graficoBarra'>
                        <Bar
                            data={{
                                labels: alternativasList,
                                datasets: [{
                                    label: 'Precio',
                                    data: percentagesPrecio,
                                    backgroundColor: '#98FB98',
                                    borderColor: '#AEF359',
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
                    <div className='graficoBarra'>
                        <Bar
                            data={{
                                labels: alternativasList,
                                datasets: [{
                                    label: 'Impacto ambiental',
                                    data: percentagesImpactoA,
                                    backgroundColor: '#98FB98',
                                    borderColor: '#AEF359',
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
                    <div className='graficoBarra'>
                        <Bar
                            data={{
                                labels: alternativasList,
                                datasets: [{
                                    label: 'Toxicidad',
                                    data: percentagesToxicidad,
                                    backgroundColor: '#98FB98',
                                    borderColor: '#AEF359',
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
                </div>
                </>
            )}
            </div>
            <div>
            {percentagesToxicidad.length > 0 && MostrarBotonToxicidad && (
                    <button onClick={() => calcularRanking(percentagesPrecio, percentagesImpactoA, percentagesToxicidad, selectedPercentage)}>Calcular ranking de las alternativas</button>
                )}
                {MostrarRanking &&(
                    <div className="ranking-container">
                        <h3>Ranking de Alternativas</h3>
                        <ol className="ranking-list">
                            {ranking.map(index => (
                                <li key={index} className="ranking-item">
                                    <div className="ranking-card">
                                        <span className="ranking-position">{ranking.indexOf(index) + 1}</span>
                                        <div className="ranking-content">
                                            <h4>{alternativasList[index]}</h4>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Alternativas;