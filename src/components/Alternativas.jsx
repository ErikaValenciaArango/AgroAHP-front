import React, { useState } from 'react';
import logo from './imagenes/logo.png';
import './styles/alternativas.css';

const Alternativas = () => {
    const [alternativa, setAlternativa] = useState('');
    const [alternativasList, setAlternativasList] = useState([]);
    const [comparacionesList, setComparacionesList] = useState([]);
    const [mostrarComparaciones, setMostrarComparaciones] = useState(false);

    const handleInputChange = (event) => {
        setAlternativa(event.target.value);
    };

    const agregarAlternativa = () => {
        if (alternativa.trim() !== '') {
            setAlternativasList([...alternativasList, alternativa.trim()]);
            setAlternativa('');
        }
    };

    const handleContinuar = () => {
        if (alternativasList.length < 2) {
            alert('Debe agregar al menos dos alternativas para continuar.');
            return;
        }

        const nuevasComparaciones = [];
        for (let i = 0; i < alternativasList.length; i++) {
            for (let j = i + 1; j < alternativasList.length; j++) {
                nuevasComparaciones.push({
                    alternativa1: alternativasList[i],
                    alternativa2: alternativasList[j],
                    rating: 1 // Valor inicial del rating
                });
            }
        }
        setComparacionesList(nuevasComparaciones);
        setMostrarComparaciones(true);
    };

    const handleRatingChange = (index, value) => {
        const nuevasComparaciones = [...comparacionesList];
        nuevasComparaciones[index].rating = value;
        setComparacionesList(nuevasComparaciones);
    };

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
            <h2>Añadir Alternativas</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ingrese una alternativa"
                    value={alternativa}
                    onChange={handleInputChange}
                />
                <button onClick={agregarAlternativa}>Agregar</button>
            </div>
            <div className="alternativas-list">
                {alternativasList.map((item, index) => (
                    <div key={index} className="alternativa-item">
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            {!mostrarComparaciones && (
                <button onClick={handleContinuar}>Continuar</button>
            )}

            {mostrarComparaciones && (
                <div>
                    <h2>Comparaciones:</h2>
                    <table className="comparaciones-table">
                        <thead>
                            <tr>
                                <th>Alternativa 1</th>
                                <th>Alternativa 2</th>
                                <th>Calificación (1-9)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparacionesList.map((comparacion, index) => (
                                <tr key={index}>
                                    <td>{comparacion.alternativa1}</td>
                                    <td>{comparacion.alternativa2}</td>
                                    <td>
                                        <input
                                            type="range"
                                            min="1"
                                            max="9"
                                            value={comparacion.rating}
                                            onChange={(e) => handleRatingChange(index, parseInt(e.target.value))}
                                        />
                                        <span>{comparacion.rating}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Alternativas;


