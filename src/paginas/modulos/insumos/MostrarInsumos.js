import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";

export const MostrarInsumos = () => {

    const [insumos, setInsumos] = useState([]);

    const getInsumos = async () => {
        const response = await APIInvoke.invokeGET('/api/insumos');
        setInsumos(response.insumos);
    };

    useEffect(() => {
        getInsumos();
    }, []);

    const eliminarInsumos = async (e, idInsumo) => {
        e.preventDefault();

        try {
            const response = await APIInvoke.invokeDELETE(`/api/insumos/${idInsumo}`);

            if (response && response.msg === 'El insumo fue eliminado') {
                const msg = "El insumo fue eliminado correctamente";
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

                getInsumos();

            } else {
                const msg = response?.msg || "El insumo no fue eliminado correctamente";
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
                    titulo={"Listado de insumos para carpintería"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Insumos"}
                    ruta1={"/home"}
                />

                <section className="content px-2 px-sm-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/insumos/agregar"} className="btn btn-block btn-success btn-sm">
                                    Agregar insumo <i className="fa fa-plus-circle"> </i>
                                </Link>
                            </h3>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover align-middle">
                                    <thead className="table-success">
                                        <tr>
                                            <th style={{ width: '15%', minWidth: '110px' }}>Código ref.</th>
                                            <th style={{ width: '35%', minWidth: '220px' }}>Descripción del insumo</th>
                                            <th style={{ width: '13%', minWidth: '90px' }}>Unidades</th>
                                            <th style={{ width: '15%', minWidth: '100px' }}>Disponible</th>
                                            {/* 🌟 Ajustado el minWidth a 240px para dar espacio físico suficiente a los textos y la separación */}
                                            <th style={{ width: '22%', minWidth: '240px' }} className="text-center">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table-info">
                                        {insumos.map((insumo, index) => (
                                            <tr key={index}>
                                                <td>{insumo.referencia}</td>
                                                <td>{insumo.descripcion_insumo}</td>
                                                <td>{insumo.unidades}</td>
                                                <td>{insumo.disponible}</td>
                                                <td className="text-center" style={{ verticalAlign: 'middle' }}>

                                                    {/* 
                                                      🌟 ESTRUCTURA UNIFICADA Y SEGURA:
                                                      - flex-row fija el orden horizontal constante (móvil y PC).
                                                      - gap-4 crea la separación visual exacta de 24px entre los dos botones.
                                                      - px-3 actúa como colchón para que no queden pegados a los bordes de la celda.
                                                    */}
                                                    <div className="d-flex flex-row justify-content-center align-items-center gap-4 px-3">

                                                        {/* Botón Editar */}
                                                        <Link
                                                            to={`/insumos/editar/${insumo._id}`}
                                                            className='btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center py-1'
                                                            style={{ minWidth: '95px' }}
                                                        >
                                                            <i className="fa fa-pen mr-2"></i> Editar
                                                        </Link>

                                                        <p className="d-flex flex-column flex-sm-row justify-content-center gap- gap-sm-0 px-2 px-sm-2"></p>


                                                        {/* Botón Eliminar */}
                                                        <button
                                                            onClick={(e) => eliminarInsumos(e, insumo._id)}
                                                            className='btn btn-sm btn-danger w-100 d-flex align-items-center justify-content-center py-1'
                                                            style={{ minWidth: '100px' }}
                                                        >
                                                            <i className="fa fa-trash mr-2"></i> Eliminar
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

export default MostrarInsumos;
