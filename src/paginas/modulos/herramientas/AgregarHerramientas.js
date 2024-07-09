import React, { useState, useEffect } from "react";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import APIInvoke from "../../../configuracion/APIInvoke";
import SidebarContainer from "../../../componentes/SidebarContainer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AgregarHerramientas = () => {
const navigate = useNavigate();

const [herramientas, setHerramientas] = useState ({
    referencia: "",
    descripcion_herramienta: "",
    unidades: "",
    disponible: ""
  
    
})

const {referencia,descripcion_herramienta,unidades,disponible} = herramientas
useEffect(()=>{
    document.getElementById("referencia").focus();
},[])

const onChange =(e) =>{
    setHerramientas({
        ...herramientas,
    [e.target.name]: e.target.value
    })

}

    const CrearHerramientas = async () => {

        const data = {
            referencia: herramientas.referencia,
            descripcion_herramienta: herramientas.descripcion_herramienta,
            unidades: herramientas.unidades,
            disponible: herramientas.disponible

        }

        const response = await APIInvoke.invokePOST('/api/herramientas', data);
        const idHerramienta = response._id;

        if (idHerramienta === ''){
            const msg = "Hubo un error al agregar una herramienta";
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

        } else {
            navigate("/herramientas");

            const msg = "La herramienta fue agregada con exito";
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

            setHerramientas({
                referencia: "",
                descripcion_herramienta: "",
                unidades: "",
                disponible: ""
            });

        }
    }

    const onSubmit =(e) => {
        e.preventDefault();
        CrearHerramientas();
    }

  return (

    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>

    <div className="content-wrapper">

        <ContentHeader
            titulo={"Agregar herramienta"}
            breadCrumb1={"Listado de herramientas pata carpintería"}
            breadCrumb2={"Agregar"}
            ruta1={"/herramientas/agregar"} 
        />
        

        <seccion className="content">
                    <div className="card">
                        <div className="card-header">
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
                            <form onSubmit={onSubmit}>
                            <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-asterisk"/>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="referencia">Código de referencia</label>
                                        <input type="text"
                                        className="form-control"
                                        id='referencia'
                                        name='referencia'
                                        placeholder="Ingrese el código de referencia (HERXXXX)"
                                        value={referencia}
                                        onChange={onChange}
                                        required                                        
                                        />                                  
                                    </div>
                                </div>

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-pen"/>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="descripcion_herramienta">Descripción de la herramienta</label>
                                        <input type="text"
                                        className="form-control"
                                        id='descripcion_herramienta'
                                        name='descripcion_herramienta'
                                        placeholder="Ingrese la descripción de la herramienta"
                                        value={descripcion_herramienta}
                                        onChange={onChange}
                                        required                                        
                                        />                                  
                                    </div>
                                </div>

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-hashtag"/>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="unidades">Unidades</label>
                                        <input type="number"
                                        className="form-control"
                                        id='unidades'
                                        name='unidades'
                                        placeholder="Ingrese el número de unidades"
                                        value={unidades}
                                        onChange={onChange}
                                        required                                        
                                        />                                  
                                    </div>
                                </div>

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-check"/>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="disponible">Disponible</label>
                                        <input type="binary"
                                        className="form-control"
                                        id='disponible'
                                        name='disponible'
                                        placeholder="Disponible (SI/NO)"
                                        value={disponible}
                                        onChange={onChange}
                                        required                                        
                                        />                                  
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Agregar herramienta</button>
                                    <b>&nbsp;</b>&nbsp;
                                    <a href="/herramientas">
                                        <button type="button" className="btn btn-danger">
                                            Cancelar
                                        </button>
                                    </a>
                                </div>

                            </form>
                        </div>
                    </div>
                </seccion>
            </div>
            <Footer></Footer>
        </div>
  )
}

export default AgregarHerramientas