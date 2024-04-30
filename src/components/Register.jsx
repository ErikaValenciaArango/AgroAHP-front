import React, { useEffect, useRef, useState } from "react";
import logo from './imagenes/logo.png'
import { Link } from 'react-router-dom';
import './styles/Navbar.css'
import './styles/Register.css'
import axios from "axios";


const Register = () => {

    const form = useRef(null);
    const [error, setError] = useState(" ");
    const [successR, setSuccessR] = useState(" ");

    const [formReg, setFormReg] = useState({
      nameReg: '',
      lnameReg: '',
      nicknameReg: '',
      passwordReg: '',
      cpasswordReg: '',
      emailReg: '',
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === "checkedreg") {
            setFormReg((prevState) => ({
                ...prevState,
                [name]: checked
            }));

        } else {
            //console.log(name);

            setFormReg((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleBlur = () => {
        const namereg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const lnamereg = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        const nicknamereg = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        const emailreg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (formReg.nameReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                nameRError: 'El nombre es obligatorio'
            }));
        }
        else if (!namereg.test(formReg.nameReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                nameRError: 'Por favor ingrese un nombre válido.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                nameRError: ''
            })));
        }
        if (formReg.lnameReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                lnameRError: 'El apellido es obligatorio'
            }));
        }
        else if (!lnamereg.test(formReg.lnameReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                lnameRError: 'Por favor ingrese un apellido válido.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                lnameRError: ''
            })));
        }
        if (formReg.nicknameReg === '') {
          setFormReg((prevState) => ({
              ...prevState,
              NicknameRError: 'El nickname es obligatorio'
          }));
      }
      else if (!nicknamereg.test(formReg.nicknameReg)) {
          setFormReg((prevState) => ({
              ...prevState,
              NicknameRError: 'Por favor ingrese un nickname válido.'
          }));
      } else {
          setFormReg((prevState => ({
              ...prevState,
              NicknameRError: ''
          })));
      }
        if (formReg.emailReg.trim() === '') {
            setFormReg((prevState) => ({
                ...prevState,
                emailRError: 'El correo es obligatorio'
            }));
        }
        else if (!emailreg.test(formReg.emailReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                emailRError: 'Por favor ingrese una dirección de correo electrónico válida.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                emailRError: ''
            })));
        }
        if (formReg.passwordReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                passRError: 'La contraseña es obligatoria'
            }));
        }
        else if (!passreg.test(formReg.passwordReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                passRError: 'Por favor ingrese una contraseña de 8 Caracteres, la menos un número y una letra.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                passRError: ''
            })));
        }
        if (formReg.cpasswordReg.trim() !== formReg.passwordReg) {
            setFormReg((prevState => ({
                ...prevState,
                cpasswordRegError: 'Las contraseñas no coinciden'
            })));
        }
        else {
            setFormReg((prevState => ({
                ...prevState,
                cpasswordRegError: ''
            })));
        }

    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formDatar = new FormData(form.current);
        const data = {
            nameReg: formDatar.get('nameReg'),
            lnameReg: formDatar.get('lnameReg'),
            emailReg: formDatar.get('emailReg'),
            passwordReg: formDatar.get('passwordReg'),
            nicknameReg: formDatar.get('nicknameReg'),
        }
        console.log(data);

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/createUser`,
            data: {
                user_name: data.nameReg,
                user_lastname: data.lnameReg,
                user_email: data.emailReg, //Quitar esto para un get
                user_password: data.passwordReg,
                user_nickname: data.nicknameReg,
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
        if (formReg.nameRError || formReg.lnameRError || formReg.NicknameRError|| formReg.emailRError || formReg.passRError || formReg.cpasswordRegError) return (true);
        else if (formReg.nameReg === "" || formReg.lnameReg === '' || formReg.emailReg === "" || formReg.passwordReg === "" || formReg.cpasswordReg === "" ) return (true);
        else return (false);
    }
    //console.log(formReg);
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
            <div>
                <form action="/"  id="formReg" ref={form} onSubmit={handleSubmit}>
                        <label htmlFor="name" >Nombres</label>
                        <input type="text" placeholder="Nombres" id="nameReg" name="nameReg"
                            value={formReg.nameReg}
                            onChange={handleChange}
                            onBlurh={handleBlur} />
                        {formReg.nameRError && (
                            <div className="error-message">{formReg.nameRError}</div>
                        )}
                        
                        <label htmlFor="apellidos" className="lname-lab" >Apellidos</label>
                        <input type="text" placeholder="Apellidos" name="lnameReg"
                            value={formReg.lnameReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {formReg.lnameRError && (
                            <div className="error-message">{formReg.lnameRError}</div>
                        )}

                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" placeholder="Nickname" name="nicknameReg"
                            value={formReg.nicknameReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {formReg.NicknameRError && (
                            <div className="error-message">{formReg.NicknameRError}</div>
                        )}

                        <label htmlFor="email" >Correo Electrónico</label>
                        <input type="email" placeholder="Correo Electrónico" className="inp-emailtxtreg" name="emailReg"
                            value={formReg.emailReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {formReg.emailRError && (
                            <div className="error-message">{formReg.emailRError}</div>
                        )}

                        <label htmlFor="password" className="labelcxreg">Contraseña</label>
                        <input type="password" placeholder="Contraseña" name="passwordReg"
                            value={formReg.passwordReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {formReg.passRError && (
                            <div className="error-message">{formReg.passRError}</div>
                        )}

                        <label htmlFor="password" className="clabelcxreg">Confirmar contraseña</label>
                        <input type="password" placeholder="Confirmar Contraseña" className="inp-cpasstxtreg" name="cpasswordReg"
                            value={formReg.cpasswordReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {formReg.cpasswordRegError && (
                            <div className="error-message">{formReg.cpasswordRegError}</div>
                        )}

                    <button type="submit"
                        className="btnregister"
                        disabled={btndisabled()}
                        onClick={handleSubmit}
                    >

                        Registrarse
                    </button>
                    <div className="error-message">{error}</div>
                    <div className="success-message">{successR}</div>

                </form>
            </div>
        </div >
    );
}

export default Register;
