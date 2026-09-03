import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";

export const MostrarHerramientas = () => {

    const [herramientas, setHerramientas] = useState([]);

    const getHerramientas = async () => {
        const response = await APIInvoke.invokeGET('/api/herramientas');
        setHerramientas(response.herramientas);
    };

    useEffect(() => {
        getHerramientas();
    }, []);

    const eliminarHerramientas = async (e, idHerramienta) => {
        e.preventDefault();

        try {
            const response = await APIInvoke.invokeDELETE(`/api/herramientas/${idHerramienta}`);

            if (response && response.msg === 'La herramienta fue eliminada') {
                const msg = "La herramienta fue eliminada correctamente";
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'OK',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });

                getHerramientas();

            } else {
                const msg = response?.msg || "La herramienta no fue eliminada correctamente";
                swal({
                    title: 'Error',
                    text: msg,
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
        } catch (error) {
            console.error("Error en petición DELETE:", error);
            swal({
                title: 'Error de Red',
                text: "No se pudo conectar con el servidor.",
                icon: 'error',
                className: 'btn btn-danger'
            });
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />

            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de herramientas para carpintería"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Herramientas"}
                    ruta1={"/home"}
                />

                <section className="content px-2 px-sm-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/herramientas/agregar"} className="btn btn-block btn-success btn-sm">
                                    Agregar herramienta <i className="fa fa-plus-circle"> </i>
                                </Link>
                            </h3>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-success">
                                        <tr>
                                            <th style={{ width: '15%', minWidth: '110px' }}>Código ref.</th>
                                            <th style={{ width: '35%', minWidth: '220px' }}>Descripción de la herramienta</th>
                                            <th style={{ width: '13%', minWidth: '90px' }}>Unidades</th>
                                            <th style={{ width: '15%', minWidth: '100px' }}>Disponible</th>
                                            {/* Ajustado el minWidth a 180px para dar el espacio óptimo de los botones cuadrados */}
                                            <th style={{ width: '22%', minWidth: '180px' }} className="text-center">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table-info">
                                        {herramientas.map((herramienta, index) => (
                                            <tr key={index}>
                                                <td>{herramienta.referencia}</td>
                                                <td>{herramienta.descripcion_herramienta}</td>
                                                <td>{herramienta.unidades}</td>
                                                <td>{herramienta.disponible}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>

                                                    {/* Contenedor centralizado en fila horizontal */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center p-1">

                                                        {/* 
                                                          Botón Editar:
                                                          - mr-2 mr-md-3: 🌟 CLAVE para separar los botones físicamente.
                                                          - flex-column flex-md-row: Icono arriba y texto abajo en móvil (cuadrado). En PC todo lineal.
                                                        */}
                                                        <Link
                                                            to={`/herramientas/editar/${herramienta._id}`}
                                                            className="btn btn-sm btn-primary d-flex flex-column flex-md-row align-items-center justify-content-center p-2 lh-sm mr-2 mr-md-3 text-decoration-none"
                                                            style={{ width: '65px', height: '65px', minWidth: '100px', minHeight: '0px' }}
                                                        >
                                                            <i className="fa fa-pen mb-1 mb-md-0 mr-0 mr-md-2"></i> 
                                                            <span style={{ fontSize: '1rem' }} className="d-block text-center font-weight-normal">Editar</span>
                                                        </Link>

                                                        {/* Botón Eliminar: Mismo tamaño simétrico para cuadratura perfecta */}
                                                        <button
                                                            onClick={(e) => eliminarHerramientas(e, herramienta._id)}
                                                            className="btn btn-sm btn-danger d-flex flex-column flex-md-row align-items-center justify-content-center p-2 lh-sm"
                                                            style={{ width: '65px', height: '65px', minWidth: '100px', minHeight: '0px' }}
                                                        >
                                                            <i className="fa fa-trash mb-1 mb-md-0 mr-0 mr-md-2"></i> 
                                                            <span style={{ fontSize: '1rem' }} className="d-block text-center font-weight-normal">Eliminar</span>
                                                        </button>

                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> {/* Fin de table-responsive */}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default MostrarHerramientas;
