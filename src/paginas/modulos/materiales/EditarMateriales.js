import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";

const EditarMateriales = () => {
    const [referencia, setReferencia] = useState("");
    const [descripcion_material, setDescrMaterial] = useState("");
    const [unidades, setUnidades] = useState("");
    const [disponible, setDisp] = useState("SI");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getMaterialesID();
        // eslint-disable-next-line
    }, []);

    const getMaterialesID = async () => {
        try {
            const resultado = await APIInvoke.invokeGET(`/api/materiales/${id}`);
            if (resultado) {
                setReferencia(resultado.referencia || "");
                setDescrMaterial(resultado.descripcion_material || "");
                setUnidades(resultado.unidades || "");
                setDisp(resultado.disponible || "SI");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarMateriales = async (e) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokePUT(`/api/materiales/${id}`, {
                referencia: referencia,
                descripcion_material: descripcion_material,
                unidades: unidades,
                disponible: disponible,
            });

            if (response) {
                swal({
                    title: 'Información',
                    text: 'El material se actualizó correctamente',
                    icon: 'success',
                    buttons: { confirm: { text: 'OK', className: 'btn btn-primary' } }
                });
                navigate("/materiales");
            }
        } catch (error) {
            console.error(error);
            swal({
                title: 'Error',
                text: 'Hubo un problema al actualizar el material',
                icon: 'error',
                buttons: { confirm: { text: 'OK', className: 'btn btn-danger' } }
            });
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper pb-2">
                <ContentHeader
                    titulo={"Editar material"}
                    breadCrumb1={"Listado de materiales para carpintería"}
                    breadCrumb2={"Editar"}
                    ruta1={"/materiales"}
                />
                <section className="content px-2 px-sm-3">
                    <div className="container-fluid">
                        <div className="card card-info shadow-sm">
                            <div className="card-header">
                                <h3 className="card-title">Editar Datos</h3>
                            </div>

                            <form onSubmit={actualizarMateriales}>
                                <div className="card-body">
                                    <div className="row">

                                        {/* Código de Referencia */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="referencia">Código de referencia</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-asterisk" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="referencia"
                                                    name="referencia"
                                                    placeholder="Editar el código de referencia (MATXXXX)"
                                                    value={referencia}
                                                    onChange={(e) => setReferencia(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Descripción */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="descripcion_material">Descripción del material</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-pen" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="descripcion_material"
                                                    name="descripcion_material"
                                                    placeholder="Editar la descripción del material"
                                                    value={descripcion_material}
                                                    onChange={(e) => setDescrMaterial(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Unidades */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="unidades">Unidades</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-hashtag" /></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="unidades"
                                                    name="unidades"
                                                    placeholder="Editar el número de unidades"
                                                    value={unidades}
                                                    onChange={(e) => setUnidades(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Disponible - Radio Buttons */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label className="d-block">Disponible</label>
                                            <div className="d-flex align-items-center pt-2">
                                                <div className="custom-control custom-radio custom-control-inline mr-4">
                                                    <input
                                                        type="radio"
                                                        id="disponibleSiMatEdit"
                                                        name="disponible"
                                                        value="SI"
                                                        className="custom-control-input"
                                                        checked={disponible === "SI"}
                                                        onChange={(e) => setDisp(e.target.value)}
                                                    />
                                                    <label className="custom-control-label font-weight-normal" htmlFor="disponibleSiMatEdit">
                                                        SI
                                                    </label>
                                                </div>

                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input
                                                        type="radio"
                                                        id="disponibleNoMatEdit"
                                                        name="disponible"
                                                        value="NO"
                                                        className="custom-control-input"
                                                        checked={disponible === "NO"}
                                                        onChange={(e) => setDisp(e.target.value)}
                                                    />
                                                    <label className="custom-control-label font-weight-normal" htmlFor="disponibleNoMatEdit">
                                                        NO
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                                <div className="card-footer d-flex flex-column flex-sm-row justify-content-end gap-2">
                                    <button type="submit" className="btn btn-info mb-2 mb-sm-0 mr-0 mr-sm-2">
                                        Guardar
                                    </button>
                                    <Link to="/materiales" className="btn btn-danger">
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default EditarMateriales;
