import React, { useState, useEffect } from 'react';
import logo from './imagenes/logo.png';
import axios from 'axios';
import './styles/modelos.css'; // Importar estilos CSS

const Modelos = () => {
    const loginData = JSON.parse(localStorage.getItem('login'));
    const userId = loginData.user._id;  
    const [criterios, setCriterios] = useState([]);

    useEffect(() => {
        const obtenerCriterios = async () => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/getCriteriaByUser`,
                data: {
                    criteria_user: userId,
                }
            }).then(function (response) {
                setCriterios(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        };

        if (userId) {
            obtenerCriterios();
        }
    }, [userId]);

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
                <h2>Listado de Criterios</h2>
                <div className="criterios-container">
                    {criterios.map(criterio => (
                        <div key={criterio._id} className="criterio-item">
                            {criterio.criteria_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modelos;
