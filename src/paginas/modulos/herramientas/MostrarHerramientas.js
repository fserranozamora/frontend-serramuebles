import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";


export const MostrarHerramientas = () => {

    const [herramientas, setHerramientas] = useState([])

    const getHerramientas = async () => {

        const response = await APIInvoke.invokeGET('/api/herramientas');
        setHerramientas(response.herramientas);

    }

    useEffect(() => {
        getHerramientas();

    }, [])

    const eliminarHerramientas = async (e, idHerramienta) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/herramientas/${idHerramienta}`);

        if (response.msg === 'La herramienta fue eliminada') {
            const msg = "La herramienta fue eliminada correctamente";
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

            getHerramientas();


        } else {

            const msg = "La herramienta no fue eliminada correctamente";
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
                    titulo={"Listado de herramientas para carpintería"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Herramientas"}
                    ruta1={"/home"}
                />

                <seccion className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/herramientas/agregar"}
                                className="btn btn-block btn-success btn-sm"> Agregar herramienta <i className="fa fa-user-plus"> </i></Link></h3>
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
                                        <th style={{ width: '25%' }}>Descripción de la herramienta</th>
                                        <th style={{ width: '15%' }}>Unidades</th>
                                        <th style={{ width: '10%' }}>Disponible</th>
                                        <th style={{ width: '5%' }}>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="table-info">
                                    {herramientas.map((herramienta, index) => (
                                        <tr key={index}>
                                            <td>{herramienta.referencia}</td>
                                            <td>{herramienta.descripcion_herramienta}</td>
                                            <td>{herramienta.unidades}</td>
                                            <td>{herramienta.disponible}</td>
                                            <td>
                                                <Link to={`/herramientas/editar/${herramienta._id}`} className='btn btn-sm btn btn-primary'> Editar <i className="fa fa-pen"> </i></Link>
                                                <p></p>
                                                <button onClick={(e) => eliminarHerramientas(e, herramienta._id)} className='btn btn-sm btn btn-danger'> Eliminar <i className="fa fa-trash"> </i></button>
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




export default MostrarHerramientas