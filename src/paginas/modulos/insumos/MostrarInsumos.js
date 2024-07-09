import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";


export const MostrarInsumos = () => {

    const [insumos, setInsumos] = useState([])

    const getInsumos = async () => {

        const response = await APIInvoke.invokeGET('/api/insumos');
        setInsumos(response.insumos);

    }

    useEffect(() => {
        getInsumos();

    }, [])

    const eliminarInsumos = async (e, idInsumo) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/herramientas/${idInsumo}`);

        if (response.msg === 'El insumo fue eliminado') {
            const msg = "El insumo fue eliminado correctamente";
            swal({
                title: 'Informacion',
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

            const msg = "El insumo no fue eliminado correctamente";
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
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de insumos para carpintería"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Insumos"}
                    ruta1={"/home"}
                />

                <seccion className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/insumos/agregar"}
                                className="btn btn-block btn-success btn-sm"> Agregar insumo <i className="fa fa-user-plus"> </i></Link></h3>
                            <div className="card-tools">

                                <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                    title="collapse">
                                    <i className="fas fa-item" />
                                </button>


                                <button type="button" className="btn btn-tool" data-card-widget="remove"
                                    title="Remove">
                                    <i className="fas fa-item" />
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="table-success">
                                    <tr>
                                        <th style={{ width: '15%' }}>Código de referencia</th>
                                        <th style={{ width: '25%' }}>Descripción del insumo</th>
                                        <th style={{ width: '15%' }}>Unidades</th>
                                        <th style={{ width: '10%' }}>Disponible</th>
                                        <th style={{ width: '5%' }}>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="table-info">
                                    {insumos.map((insumo, index) => (
                                        <tr key={index}>
                                            <td>{insumo.referencia}</td>
                                            <td>{insumo.descripcion_insumo}</td>
                                            <td>{insumo.unidades}</td>
                                            <td>{insumo.disponible}</td>
                                            <td>
                                                <Link to={`/insumos/editar/${insumo._id}`} className='btn btn-sm btn btn-primary'> Editar <i className="fa fa-pen"> </i></Link>
                                                <p></p>
                                                <button onClick={(e) => eliminarInsumos(e, insumo._id)} className='btn btn-sm btn btn-danger'> Eliminar <i className="fa fa-trash"> </i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </seccion>
            </div>
            <Footer></Footer>
        </div>
    )
}




export default MostrarInsumos