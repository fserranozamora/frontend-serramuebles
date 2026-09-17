import React, { useState, useEffect } from 'react';
import logo from "../../img/logo_serramuebles.png";
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    useEffect(() => {
        document.getElementById("email")?.focus();
    }, []);

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    const IniciarSesion = async () => {
        // Validar longitud mínima de contraseña
        if (password.length < 8) {
            swal({
                title: 'Atención',
                text: 'La contraseña debe tener al menos 8 caracteres',
                icon: 'warning',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-warning',
                        closeModal: true
                    }
                }
            });
            return;
        }

        try {
            const data = {
                email: usuario.email,
                password: usuario.password
            };

            const response = await APIInvoke.invokePOST('/api/auth', data);

            // Validar si la respuesta trae un error o falta el token de acceso
            if (!response || response.msg || !response.token) {
                const mensajeError = response?.msg || "No fue posible iniciar sesión. Verifique su correo y contraseña.";

                swal({
                    title: 'Error de acceso',
                    text: mensajeError,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Intentar de nuevo',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                // Si el inicio de sesión es correcto, se almacena el token
                localStorage.setItem('token', response.token);
                
                // Redirección al panel principal
                navigate("/home");
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            swal({
                title: 'Error de conexión',
                text: 'No se pudo establecer comunicación con el servidor. Intente más tarde.',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        IniciarSesion();
    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <img src={logo} className="App-logo1" alt="logo" width={'200px'} />
                    <p></p>
                    <Link to="#">
                        <b>Serra-Muebles S.A.S.</b>
                        <p>Control de inventarios</p>
                    </Link>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Acceso a la plataforma</p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type="submit" className="btn btn-block btn-primary mb-2">
                                    Ingresar
                                </button>
                                <Link to="/registro" className="btn btn-block btn-danger">
                                    Registrar usuario
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
