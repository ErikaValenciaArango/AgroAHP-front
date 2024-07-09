import React, { useState } from 'react';
import './styles/Navbar.css';
import './styles/Perfil.css';
import image from './imagenes/hero-img.png';
import logo from './imagenes/logo.png';
import { useLogin } from 'C:/Users/Usuario/ahp-software/src/contexts/useLogin';
import axios from 'axios';

const Perfil = () => {
    const { user, isLogged } = useLogin();
    const [editing, setEditing] = useState(false); // Estado para controlar la edición
    const [formReg, setFormReg] = useState({
        nameReg: user.user_name,
        lnameReg: user.user_lastname,
        nicknameReg: user.user_nickname,
        passwordReg: '',
        newPasswordReg: '', // Nuevo campo para la nueva contraseña
        emailReg: user.user_email,
    });
    const [error, setError] = useState('');
    const [successR, setSuccessR] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormReg((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            user_name: formReg.nameReg,
            user_lastname: formReg.lnameReg,
            user_email: formReg.emailReg,
            user_nickname: formReg.nicknameReg,
        };

        if (formReg.newPasswordReg) {
            userData.user_password = formReg.newPasswordReg; // Incluir la nueva contraseña solo si se proporciona
        }

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_BACKEND_URL}/updateUser/${user.user_id}`,
            data: userData
        }).then(function (response) {
            setSuccessR("Perfil actualizado correctamente");
            setEditing(false); // Desactivar modo edición después de enviar
        }).catch(function (error) {
            setError(error.response.data.error);
            console.log(error)
        });
    };

    const handleEdit = () => {
        setEditing(true); // Activar modo edición
    };

    if (!isLogged || !user) {
        return <div>Cargando...</div>;
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
                        <a href="/">Cerrar Sesión</a>
                    </div>
                </div>
            </nav>

            <div className="perfil-container">
                <h1>MI PERFIL</h1>
                <img className="perfil-imagen" alt="Perfil" src={user.profileImage || image} />
                {editing ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nameReg">Nombre completo:</label>
                        <input
                            type="text"
                            id="nameReg"
                            name="nameReg"
                            value={formReg.nameReg}
                            onChange={handleChange}
                        />
                        <label htmlFor="lnameReg">Apellido:</label>
                        <input
                            type="text"
                            id="lnameReg"
                            name="lnameReg"
                            value={formReg.lnameReg}
                            onChange={handleChange}
                        />
                        <label htmlFor="nicknameReg">Nickname:</label>
                        <input
                            type="text"
                            id="nicknameReg"
                            name="nicknameReg"
                            value={formReg.nicknameReg}
                            onChange={handleChange}
                        />
                        <label htmlFor="emailReg">Correo electrónico:</label>
                        <input
                            type="email"
                            id="emailReg"
                            name="emailReg"
                            value={formReg.emailReg}
                            onChange={handleChange}
                        />
                        <label htmlFor="passwordReg">Contraseña actual:</label>
                        <input
                            type="password"
                            id="passwordReg"
                            name="passwordReg"
                            value={formReg.passwordReg}
                            onChange={handleChange}
                        />
                        <label htmlFor="newPasswordReg">Nueva contraseña:</label>
                        <input
                            type="password"
                            id="newPasswordReg"
                            name="newPasswordReg"
                            value={formReg.newPasswordReg}
                            onChange={handleChange}
                        />
                        <button type="submit">Guardar Cambios</button>
                        <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
                        {error && <div className="error-message">{error}</div>}
                        {successR && <div className="success-message">{successR}</div>}
                    </form>
                ) : (
                    <div>
                        <p><b>Nombre completo:</b> {user.user_name + " " + user.user_lastname}</p>
                        <p><b>Correo electrónico:</b> {user.user_email}</p>
                        <p><b>Nickname:</b> {user.user_nickname}</p>
                        <button onClick={handleEdit}>Editar Perfil</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;




