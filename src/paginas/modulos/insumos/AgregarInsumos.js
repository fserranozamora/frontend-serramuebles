import React, { useState, useEffect } from "react";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import APIInvoke from "../../../configuracion/APIInvoke";
import SidebarContainer from "../../../componentes/SidebarContainer";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";

const AgregarInsumos = () => {
  const navigate = useNavigate();

  const [insumos, setInsumos] = useState({
    referencia: "",
    descripcion_insumo: "",
    unidades: "",
    disponible: "SI"
  });

  const { referencia, descripcion_insumo, unidades, disponible } = insumos;

  useEffect(() => {
    document.getElementById("referencia")?.focus();
  }, []);

  const onChange = (e) => {
    setInsumos({
      ...insumos,
      [e.target.name]: e.target.value
    });
  };

  const CrearInsumos = async () => {
    try {
      const data = {
        referencia: insumos.referencia,
        descripcion_insumo: insumos.descripcion_insumo,
        unidades: insumos.unidades,
        disponible: insumos.disponible
      };

      const response = await APIInvoke.invokePOST('/api/insumos', data);
      
      const esExitoso = response && (response._id || response.id || response.msg === "ok");

      if (esExitoso) {
        swal({
          title: 'Información',
          text: "El insumo fue agregado con éxito",
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

        setInsumos({
          referencia: "",
          descripcion_insumo: "",
          unidades: "",
          disponible: "SI"
        });

        navigate("/insumos");
      } else {
        const msg = response?.msg || "Hubo un error al agregar un insumo";
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
      console.error(error);
      swal({
        title: 'Error',
        text: "No se pudo conectar con el servidor",
        icon: 'error',
        buttons: { confirm: { text: 'OK', className: 'btn btn-danger' } }
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    CrearInsumos();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />

      <div className="content-wrapper">
        <ContentHeader
          titulo={"Agregar insumo"}
          breadCrumb1={"Listado de insumos para carpintería"}
          breadCrumb2={"Agregar"}
          ruta1={"/insumos/agregar"} 
        />

        <section className="content px-2 px-sm-3">
          <div className="container-fluid">
            <div className="card card-primary shadow-sm">
              <div className="card-header">
                <h3 className="card-title">Datos del Insumo</h3>
              </div>

              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="row">

                    {/* Código de referencia */}
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
                          placeholder="Ingrese el código (INSXXXX)"
                          value={referencia}
                          onChange={onChange}
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
                          placeholder="Ingrese la descripción"
                          value={descripcion_insumo}
                          onChange={onChange}
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
                          placeholder="Ingrese el número de unidades"
                          value={unidades}
                          onChange={onChange}
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
                            id="disponibleSiInsumo"
                            name="disponible"
                            value="SI"
                            className="custom-control-input"
                            checked={disponible === "SI"}
                            onChange={onChange}
                          />
                          <label className="custom-control-label font-weight-normal" htmlFor="disponibleSiInsumo">
                            SI
                          </label>
                        </div>

                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="disponibleNoInsumo"
                            name="disponible"
                            value="NO"
                            className="custom-control-input"
                            checked={disponible === "NO"}
                            onChange={onChange}
                          />
                          <label className="custom-control-label font-weight-normal" htmlFor="disponibleNoInsumo">
                            NO
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="card-footer d-flex flex-column flex-sm-row justify-content-end gap-2">
                  <button type="submit" className="btn btn-primary mb-2 mb-sm-0 mr-0 mr-sm-2">
                    Agregar insumo
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

export default AgregarInsumos;
