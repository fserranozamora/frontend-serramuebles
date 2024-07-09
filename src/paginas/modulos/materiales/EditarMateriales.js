import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import SidebarContainer from "../../../componentes/SidebarContainer";
import APIInvoke from "../../../configuracion/APIInvoke";

const EditarMateriales = () => {
    const [referencia, setReferencia] = useState("");
    const [descripcion_material, setDescrMaterial] = useState("");
    const [unidades, setUnidades] = useState("");
    const [disponible, setDisp] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const actualizarMateriales= async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/materiales/${id}`, {
            referencia: referencia,
            descripcion_material: descripcion_material,
            unidades: unidades,
            disponible: disponible,
        });
        navigate("/materiales");
    };

    useEffect(() => {
        getMaterialesID();
        // eslint-disable-next-line
    }, []);

    const getMaterialesID = async () => {
        const resultado = await APIInvoke.invokeGET(`/api/materiales/${id}`);
        setReferencia(resultado.referencia);
        setDescrMaterial(resultado.descripcion_material);
        setUnidades(resultado.unidades);
        setDisp(resultado.disponible);
    };

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper pb-2">
                <ContentHeader
                    titulo={"Editar material"}
                    breadCrumb1={"Listado del material para carpintería"}
                    breadCrumb2={"Editar"}
                    ruta1={"/materiales/editar"}
                />
                <section className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-items"></i>
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            <form onSubmit={actualizarMateriales}>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fa fa-asterisk" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="referencia">Código de referencia</label>
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

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fa fa-pen" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="descripcion_material">Descripción del material</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="descripcion_material"
                                            name="descripcion_material"
                                            placeholder="Editar la descripción de la insumo"
                                            value={descripcion_material}
                                            onChange={(e) => setDescrMaterial(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fa fa-hashtag" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="unidades">Unidades</label>
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
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fa fa-check" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="disponible">Disponible</label>
                                        <input
                                            type="binary"
                                            className="form-control"
                                            id="disponible"
                                            name="disponible"
                                            placeholder="Editar disponiblidad (SI/NO)"
                                            value={disponible}
                                            onChange={(e) => setDisp(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="card-footer bg-white ">
                                    <button type="submit" className="btn btn-info">
                                        Guardar
                                    </button>
                                    <b>&nbsp;</b>&nbsp;
                                    <a href="/insumos">
                                        <button type="button" className="btn btn-danger">
                                            Cancelar
                                        </button>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default EditarMateriales;