import React from 'react';
import './styles/Main.css';
import './styles/Navbar.css'
import image from './imagenes/hero-img.png';
import logo from './imagenes/logo.png'
import { Link } from 'react-router-dom';

const Decision = () => {
  return (
    <main>
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
      <div className="main row">
          <div className='col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1' data-aos="fade-up" data-aos-delay="200">
            <h1 className="h1-inicio">Cultiva Decisiones <br /> Inteligentes, Cosecha<br />  Éxito</h1>
            <h2 className='h2-inicio'>La importancia de tomar decisiones informadas <br />en la agricultura para lograr el éxito en las cosechas.</h2>
            <a href="/video-tutorial"><button className="cta-button boton">Video tutorial</button></a>
          </div>
          <div className='img col-lg-6 order-1 order-lg-2'>
            <img src={image}/>
          </div>
      </div>
    </main>
  );
};

export default Decision;