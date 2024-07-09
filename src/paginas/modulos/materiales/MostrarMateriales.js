import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";


export const MostrarMateriales = () => {

    const [materiales, setMateriales] = useState([])

    const getMateriales = async () => {

        const response = await APIInvoke.invokeGET('/api/materiales');
        setMateriales(response.materiales);

    }

    useEffect(() => {
        getMateriales();

    }, [])

    const eliminarMateriales = async (e, idMaterial) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/materiales/${idMaterial}`);

        if (response.msg === 'El material fue eliminado') {
            const msg = "El material fue eliminado correctamente";
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

            getMateriales();


        } else {

            const msg = "El material no fue eliminado correctamente";
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
                    titulo={"Listado de materiales para carpintería"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Materiales"}
                    ruta1={"/home"}
                />

                <seccion className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/materiales/agregar"}
                                className="btn btn-block btn-success btn-sm"> Agregar material <i className="fa fa-user-plus"> </i></Link></h3>
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
                                        <th style={{ width: '25%' }}>Descripción del material</th>
                                        <th style={{ width: '15%' }}>Unidades</th>
                                        <th style={{ width: '10%' }}>Disponible</th>
                                        <th style={{ width: '5%' }}>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="table-info">
                                    {materiales.map((material, index) => (
                                        <tr key={index}>
                                            <td>{material.referencia}</td>
                                            <td>{material.descripcion_material}</td>
                                            <td>{material.unidades}</td>
                                            <td>{material.disponible}</td>
                                            <td>
                                                <Link to={`/materiales/editar/${material._id}`} className='btn btn-sm btn btn-primary'> Editar <i className="fa fa-pen"> </i></Link>
                                                <p></p>
                                                <button onClick={(e) => eliminarMateriales(e, material._id)} className='btn btn-sm btn btn-danger'> Eliminar <i className="fa fa-trash"> </i></button>
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




export default MostrarMateriales