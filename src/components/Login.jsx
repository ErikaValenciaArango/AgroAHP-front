// LoginScreen.js
import React, { useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import './styles/Login.css';
import './styles/Navbar.css'
import logo from './imagenes/logo.png'
import { useLogin } from "../contexts/useLogin";

const Login = () => {
    const {login} = useLogin();
    const form = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(" ");

    const [formLogin, setFormLogin] = useState({
        usename: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormLogin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBlur = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (formLogin.usename === '') {
            setFormLogin((prevState) => ({
                ...prevState,
                emailError: 'El correo electrónico es obligatorio'
            }));
        }
        else if (!emailRegex.test(formLogin.usename)) {
            setFormLogin((prevState) => ({
                ...prevState,
                emailError: 'Por favor ingrese una dirección de correo electrónico válida.'
            }));
        }
        else {
            setFormLogin((prevState => ({
                ...prevState,
                emailError: ''
            })));
        }
        if (formLogin.password === '') {
            setFormLogin((prevState) => ({
                ...prevState,
                passError: 'La contraseña es obligatoria'
            }));
        }
        else if (!passRegex.test(formLogin.password)) {
            setFormLogin((prevState) => ({
                ...prevState,
                passError: 'Por favor ingrese una contraseña de 8 Caracteres, al menos un número y una letra.'
            }));
        } else {
            setFormLogin((prevState => ({
                ...prevState,
                passError: ''
            })));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        login(formData).then(function (response) {
            navigate("/principal")
        }).catch(function (error) {
            setError(error.response.data.message);
            console.log(error);
        })
    };
    const btnlogindisabled = () =>{
        if(formLogin.emailError || formLogin.passError) return(true);
        else if(formLogin.usename === "" || formLogin.password === "") return(true);
        else return(false);     
    }

  return (
    <main className="mainLogin">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/"><img alt='Logo-AgroAHP' className="logo" src={logo}/></a>
          <div className="navbar-links">
            <a href="/">Inicio</a>
            <a href="/sobre-agroahp">Sobre AgroAHP</a>
          </div>
        </div>
      </nav>
      <form ref={form} id="formLogin" name="formLogin" className="form-login" onSubmit={handleSubmit} >
          <div className="inp-email">
              <label htmlFor="email" className="labele" >Correo Electrónico</label>
              <input type="email" id="usename" name="usename" value={formLogin.usename} onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Correo Electrónico" className="inp-emailtxt" />
              {formLogin.emailError && (
                  <div className="error-message">{formLogin.emailError}</div>
              )}
          </div>
          <div className="inp-passw">
              <label htmlFor="password" className="labelcx">Contraseña</label>
              <input type="password" id="password" name="password" value={formLogin.password} onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Contraseña" className="inp-passtxt" />
              {formLogin.passError && (
                  <div className="error-message">{formLogin.passError}</div>
              )}
          </div>
          <button type="submit"
              className="btnlogin"
              disabled={btnlogindisabled()}
              onClick={handleSubmit}
              >
              Iniciar sesión
          </button>
      </form>
      <div className="txtcuenta">
                    ¿No tienes cuenta? <a name="linkRegister" className="txtreg" href="/register">Regístrate</a>
      </div>
    </main>        
  );
};

export default Login;
