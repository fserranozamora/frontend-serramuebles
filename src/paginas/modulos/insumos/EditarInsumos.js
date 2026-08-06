import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";
import swal from "sweetalert";

const EditarInsumos = () => {
    const [referencia, setReferencia] = useState("");
    const [descripcion_insumo, setDescrInsumo] = useState("");
    const [unidades, setUnidades] = useState("");
    const [disponible, setDisp] = useState("SI");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getInsumosID();
        // eslint-disable-next-line
    }, []);

    const getInsumosID = async () => {
        try {
            const resultado = await APIInvoke.invokeGET(`/api/insumos/${id}`);
            if (resultado) {
                setReferencia(resultado.referencia || "");
                setDescrInsumo(resultado.descripcion_insumo || "");
                setUnidades(resultado.unidades || "");
                setDisp(resultado.disponible || "SI");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarInsumos = async (e) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokePUT(`/api/insumos/${id}`, {
                referencia: referencia,
                descripcion_insumo: descripcion_insumo,
                unidades: unidades,
                disponible: disponible,
            });

            if (response) {
                swal({
                    title: 'Información',
                    text: 'El insumo se actualizó correctamente',
                    icon: 'success',
                    buttons: { confirm: { text: 'OK', className: 'btn btn-primary' } }
                });
                navigate("/insumos");
            }
        } catch (error) {
            console.error(error);
            swal({
                title: 'Error',
                text: 'Hubo un problema al actualizar el insumo',
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
                    titulo={"Editar insumo"}
                    breadCrumb1={"Listado de insumos para carpintería"}
                    breadCrumb2={"Editar"}
                    ruta1={"/insumos"}
                />
                <section className="content px-2 px-sm-3">
                    <div className="container-fluid">
                        <div className="card card-info shadow-sm">
                            <div className="card-header">
                                <h3 className="card-title">Editar Datos</h3>
                            </div>

                            <form onSubmit={actualizarInsumos}>
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
                                                    placeholder="Editar el código de referencia (INSXXXX)"
                                                    value={referencia}
                                                    onChange={(e) => setReferencia(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Descripción */}
                                        <div className="col-12 col-md-6 form-group">
                                            <label htmlFor="descripcion_insumo">Descripción del insumo</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-pen" /></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="descripcion_insumo"
                                                    name="descripcion_insumo"
                                                    placeholder="Editar la descripción del insumo"
                                                    value={descripcion_insumo}
                                                    onChange={(e) => setDescrInsumo(e.target.value)}
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
                                                        id="disponibleSiInsumoEdit"
                                                        name="disponible"
                                                        value="SI"
                                                        className="custom-control-input"
                                                        checked={disponible === "SI"}
                                                        onChange={(e) => setDisp(e.target.value)}
                                                    />
                                                    <label className="custom-control-label font-weight-normal" htmlFor="disponibleSiInsumoEdit">
                                                        SI
                                                    </label>
                                                </div>

                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input
                                                        type="radio"
                                                        id="disponibleNoInsumoEdit"
                                                        name="disponible"
                                                        value="NO"
                                                        className="custom-control-input"
                                                        checked={disponible === "NO"}
                                                        onChange={(e) => setDisp(e.target.value)}
                                                    />
                                                    <label className="custom-control-label font-weight-normal" htmlFor="disponibleNoInsumoEdit">
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
                                    <Link to="/insumos" className="btn btn-danger">
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

export default EditarInsumos;
