import React from 'react';
import './styles/Principal.css';
import './styles/Navbar.css'
import image from './imagenes/hero-img.png';
import logo from './imagenes/logo.png'
import { useLogin } from '../contexts/useLogin';

const Principal = () => {
  const {logOut} = useLogin()
  return (
    <main>
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="/"><img className="logo" alt='Logo-AgroAHP' src={logo}/></a>
            <div className="navbar-links">
              <a href="/perfil">Mi Perfil</a>
              <a onClick={()=>{logOut()}}  href="/">Cerrar Sesión</a>
            </div>
          </div>
        </nav>
      <div className="main">
          <div  className='principal'>
            <h1 className="h1-i">BIENVENIDO</h1>
            <a href="criterios"><button className="cta-buttonn">Crear nuevo modelo de toma de decision</button></a>
            <a href="/alternativas"><button className="cta-buttonn">Tomar una nueva decisión</button></a>
            <a href="/modelos"><button className="cta-buttonn">Editar modelo de toma de decisión</button></a>
            <a href="/historial"><button className="cta-buttonn">Historial de decisiones</button></a>
          </div>
          <div className='img col-lg-6 order-1 order-lg-2'>
            <img src={image}/>
          </div>
      </div>
    </main>
  );
};

export default Principal;