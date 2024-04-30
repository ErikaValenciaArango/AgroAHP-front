import React, { useState } from 'react';
import logo from './imagenes/logo.png'
import { Link } from 'react-router-dom';
import './styles/Navbar.css'
import './styles/Register.css'

const Register = () => {
  const form = useRef(null);
  const [error, setError] = useState(" ");
  const [successR, setSuccessR] = useState(" ");

  const [formReg, setFormReg] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    nickname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o hacer lo que sea necesario con ellos
    console.log('Datos del usuario:', usuario);
  };

  return (
    
    <div className="mainRegister">
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="/"><img className="logo" alt='Logo-AgroAHP' src={logo}/></a>
            <div className="navbar-links">
              <a href="/">Inicio</a>
              <a href="/sobre-agroahp">Sobre AgroAHP</a>
              <Link to="/login"><button className="button-inicioSesion">Iniciar Sesión</button></Link>
            </div>
          </div>
        </nav>
      <h1 className='h1-register'>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={usuario.contraseña}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={usuario.nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
