import React from 'react';
import './styles/Main.css';
import './styles/Navbar.css'
import image from './imagenes/hero-img.png';
import logo from './imagenes/logo.png'
import { Link } from 'react-router-dom';
import { useLogin } from '../contexts/useLogin';

const Sobre = () => {
  const {isLogged, logOut} = useLogin()
  return (
    <main>
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="/"><img className="logo" alt='Logo-AgroAHP' src={logo}/></a>
            <div className="navbar-links">
              <a href="/">Inicio</a>
              <a href="/sobre-agroahp">Sobre AgroAHP</a>
              {
                isLogged ?
                <button onClick={()=>{
                  logOut()
                }}>Cerrar Sesión</button>:
                <Link to="/login"><button className="button-inicioSesion">Iniciar Sesión</button></Link>
              }
            </div>
          </div>
        </nav>
      <div className="main row">
          <div className='col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1' data-aos="fade-up" data-aos-delay="200">
            <h1 className="h1-inicio">AgroAHP</h1>
            <h2 className='h2-inicio'>AgroAHP es una innovadora aplicación web diseñada
                <br />para ayudar a agricultores, ingenieros agrónomos y 
                <br /> expertos en la toma de decisiones sobre el uso de 
                <br /> insumos agrícolas. Utilizando la metodología del 
                <br />Proceso Analítico Jerárquico (AHP), AgroAHP permite 
                <br />a los usuarios evaluar y comparar diferentes insumos 
                <br />basándose en criterios clave como precio, impacto 
                <br />ambiental y toxicidad. La aplicación facilita este 
                <br />proceso a través de una interfaz intuitiva y fácil 
                <br />de usar, que incluye herramientas visuales como 
                <br />deslizadores para calificaciones, matrices de decisión,
                <br /> gráficos de pastel y gráficos de barras. AgroAHP no solo
                <br /> ayuda a seleccionar la mejor opción, sino que también 
                <br />sensibiliza a los usuarios sobre las implicaciones ambientales
                <br /> y de salud de sus decisiones, promoviendo prácticas 
                <br />agrícolas más sostenibles.</h2>
            <a href="/video-tutorial"><button className="cta-button boton">Video tutorial</button></a>
          </div>
          <div className='img col-lg-6 order-1 order-lg-2'>
            <img src={image}/>
          </div>
      </div>
    </main>
  );
};

export default Sobre;