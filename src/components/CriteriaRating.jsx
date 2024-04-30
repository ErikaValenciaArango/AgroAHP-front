import React, { useState, useRef, useEffect } from 'react';
import logo from './imagenes/logo.png';
import Chart from 'chart.js/auto';
import './styles/CriteriaRating.css';
import axios from "axios";

const CriteriaRating = () => {
  const [error, setError] = useState(" ");
  const [successR, setSuccessR] = useState(" ");

  const loginData = JSON.parse(localStorage.getItem('login'));
  const [modelName, setModelName] = useState('');
  const [criterion1, setCriterion1] = useState({ selected: '', rating: 1 });
  const [criterion2, setCriterion2] = useState({ selected: '', rating: 1 });
  const [criterion3, setCriterion3] = useState({ selected: '', rating: 1 });
  const [pairwiseMatrix, setPairwiseMatrix] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [percentages, setPercentages] = useState([]);

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const handleSelectChange = (criterion, selectedCriterion) => {
    switch (criterion) {
      case 'criterion1':
        setCriterion1({ selected: selectedCriterion, rating: 1 });
        break;
      case 'criterion2':
        setCriterion2({ selected: selectedCriterion, rating: 1 });
        break;
      case 'criterion3':
        setCriterion3({ selected: selectedCriterion, rating: 1 });
        break;
      default:
        break;
    }
  };

  const handleRatingChange = (criterion, value) => {
    switch (criterion) {
      case 'criterion1':
        setCriterion1({ ...criterion1, rating: value });
        break;
      case 'criterion2':
        setCriterion2({ ...criterion2, rating: value });
        break;
      case 'criterion3':
        setCriterion3({ ...criterion3, rating: value });
        break;
      default:
        break;
    }
  };

  const calculateMatrixAHP = () => {
    if (modelName.trim() === '') {
      alert('Por favor ingrese un nombre para el modelo de criterios.');
      return; // Detener el cálculo si el nombre está vacío
    }

    if (!criterion1.selected || !criterion2.selected || !criterion3.selected) {
      alert('Por favor seleccione un criterio para cada pregunta.');
      return; // Detener el cálculo si falta alguna selección de criterio
    }

    let a12;
    let a13;
    let a23;
  
    if (criterion1.selected === 'Precio') {
      a12 = criterion1.rating;
    } else {
      a12 = 1 / criterion1.rating;
    }
  
    if (criterion2.selected === 'Precio') {
      a13 = criterion2.rating;
    } else {
      a13 = 1 / criterion2.rating;
    }
  
    if (criterion3.selected === 'Impacto ambiental') {
      a23 = criterion3.rating;
    } else {
      a23 = 1 / criterion3.rating;
    }
  
    const matrix = [
      [1, a12, a13],
      [1 / a12, 1, a23],
      [1 / a13, 1 / a23, 1],
    ];
  
    setPairwiseMatrix(matrix);
  
    // Normaliza la matriz
    const normalizedMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      const row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        let columnSum = 0;
        for (let k = 0; k < matrix.length; k++) {
          columnSum += matrix[k][j]; // Suma los elementos de la columna
        }
        row.push(matrix[i][j] / columnSum); // Divide cada elemento por la suma de su columna
      }
      normalizedMatrix.push(row);
    }
    
    const newPercentages = [];
    for (let i = 0; i < normalizedMatrix.length; i++) {
      let rowSum = 0;
      for (let j = 0; j < normalizedMatrix[i].length; j++) {
        rowSum += normalizedMatrix[i][j]; // Suma los valores de la fila normalizada
      }
      const percentage = (rowSum / 3) * 100; // Divide la suma entre 3
      newPercentages.push(percentage);
    }
  
    // Aquí tienes los porcentajes de cada criterio
    console.log('Porcentaje de cada criterio:', percentages);
    console.log(normalizedMatrix);
    
    setPercentages(newPercentages);
    // Crea o actualiza el gráfico circular
    createOrUpdatePieChart(newPercentages);
  };  

  const createOrUpdatePieChart = (newPercentages) => {
    if (!myChart) {
      const ctx = document.getElementById('myChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Precio', 'Impacto ambiental', 'Toxicidad'],
          datasets: [{
            label: 'Porcentajes de Criterios',
            data: newPercentages,
            backgroundColor: [
              'rgba(255, 206, 86, 0.5)',
              'rgba(34, 139, 34, 0.5)',
              'rgba(30, 144, 255, 0.5)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(34, 139, 34, 1)',
              'rgba(30, 144, 255, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Porcentajes de Criterios',
            },
          },
        },
      });
      setMyChart(newChart);
    } else {
      myChart.data.datasets[0].data = newPercentages;
      myChart.update();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = loginData.user._id;  
    const criterio1 = criterion1.selected;
    const criterio2 = criterion2.selected;
    const criterio3 = criterion3.selected;
    const valuecriterio1 = criterion1.rating;
    const valuecriterio2 = criterion2.rating;
    const valuecriterio3 = criterion3.rating;
    const data = {
      modelName,
      userId,
      criterio1,
      criterio2,
      criterio3,
      valuecriterio1,
      valuecriterio2,
      valuecriterio3,
      percentages
    }

    axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_URL}/createCriteria`,
        data: {
          criteria_name: data.modelName,
          criteria_user: data.userId,
          criteria_important1: data.criterio1,
          criteria_important2: data.criterio2,
          criteria_important3: data.criterio3,
          value1: data.valuecriterio1,
          value2: data.valuecriterio2,
          value3: data.valuecriterio3,
          percentage: data.percentages,
        }
    }).then(function (response) {
        /*localStorage.setItem("register", JSON.stringify(response.data))//guarda en el local storege
        window.location.reload()*/
        setSuccessR("Registro exitoso, ahora puedes iniciar sesion");
        //console.log('Registro exitoso');
    }).catch(function (error) {
        setError(error.response.data.error);
        console.log(error)
    })
  };

  const btndisabled = () => {
    if (modelName.trim() === '' || !criterion1.selected || !criterion2.selected || !criterion3.selected) return (true);
    else return (false);
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
      <h2>Calificación de Criterios</h2>
      <div>
        <label htmlFor={modelName}>Nombre del Modelo de Criterios: </label>
        <input
          type="text"
          id="modelName"
          value={modelName}
          onChange={handleModelNameChange}
          placeholder="Ingrese el nombre del modelo"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>¿Cuál criterio es más importante?</th>
            <th>¿Cuánto más importante es el criterio?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                value={criterion1.selected}
                onChange={(e) => handleSelectChange('criterion1', e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="Precio">Precio</option>
                <option value="Impacto ambiental">Impacto ambiental</option>
              </select>
            </td>
            <td>
              <input
                type="range"
                min="1"
                max="9"
                value={criterion1.rating}
                onChange={(e) => handleRatingChange('criterion1', parseInt(e.target.value))}
              />
              <span>{criterion1.rating}</span>
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={criterion2.selected}
                onChange={(e) => handleSelectChange('criterion2', e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="Precio">Precio</option>
                <option value="Toxicidad">Toxicidad</option>
              </select>
            </td>
            <td>
              <input
                type="range"
                min="1"
                max="9"
                value={criterion2.rating}
                onChange={(e) => handleRatingChange('criterion2', parseInt(e.target.value))}
              />
              <span>{criterion2.rating}</span>
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={criterion3.selected}
                onChange={(e) => handleSelectChange('criterion3', e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="Impacto ambiental">Impacto ambiental</option>
                <option value="Toxicidad">Toxicidad</option>
              </select>
            </td>
            <td>
              <input
                type="range"
                min="1"
                max="9"
                value={criterion3.rating}
                onChange={(e) => handleRatingChange('criterion3', parseInt(e.target.value))}
              />
              <span>{criterion3.rating}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={calculateMatrixAHP}>Calcular Matriz AHP</button>
      <div className="criteria-rating-container">
        <div className="matrix-container">
          <h3>Matriz AHP</h3>
          <table>
            <tbody>
              {pairwiseMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-container">
          <h3>Gráfico de Porcentajes</h3>
          <canvas id="myChart" width="100" height="100"></canvas>
        </div>
      </div>
      <button type="submit" className="btnregister" disabled={btndisabled()} onClick={handleSubmit}>Guardar modelo</button>
    </div>
  );
};

export default CriteriaRating;






