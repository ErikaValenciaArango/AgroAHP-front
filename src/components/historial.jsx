import React, { useState, useEffect } from 'react';
import logo from './imagenes/logo.png';
import axios from 'axios';
import './styles/modelos.css'; // Importar estilos CSS

const Modelos = () => {
    const loginData = JSON.parse(localStorage.getItem('login'));
    const userId = loginData ? loginData.user._id : null;
    const [decisiones, setDecisiones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successR, setSuccessR] = useState(" ");
    

    useEffect(() => {
        const obtenerDecisiones = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getAlternativesByUser`, {
                    alternative_user: userId,
                });
                setDecisiones(response.data);
            } catch (error) {
                setError('Error al obtener las decisiones.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            obtenerDecisiones();
        }
    }, [userId]);

    if (!loginData) {
        return <p>No estás autenticado.</p>;
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

            <div className="criterios-list">
                <h2>Listado de Decisiones</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="criterios-container">
                    {decisiones.map(decision => (
                        <div key={decision._id} className="criterio-item">
                        <h3>Nombre u objetivo de la decisión:</h3>
                        <p>{decision.alternative_name}</p>
                        <h3>Ranking:</h3>
                        <ul>
                            {decision.alternative.map((alt, index) => (
                            <li key={index}>{alt}</li>
                            ))}
                        </ul>
                        </div>
                    ))}
                    </div>

                )}
            </div>
        </div>
    );
};

export default Modelos;