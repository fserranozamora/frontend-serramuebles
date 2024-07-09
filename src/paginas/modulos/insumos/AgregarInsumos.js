import React, { useState, useEffect } from "react";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import APIInvoke from "../../../configuracion/APIInvoke";
import SidebarContainer from "../../../componentes/SidebarContainer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AgregarInsumos = () => {
const navigate = useNavigate();

const [insumos, setInsumos] = useState ({
    referencia: "",
    descripcion_insumo:"",
    unidades:"",
    disponible:""
  
    
})

const {referencia,descripcion_insumo,unidades,disponible} = insumos
useEffect(()=>{
    document.getElementById("referencia").focus();
},[])

const onChange =(e) =>{
    setInsumos({
        ...insumos,
    [e.target.name]: e.target.value
    })

}

    const CrearInsumos= async () => {

        const data = {
            referencia: insumos.referencia,
            descripcion_insumo: insumos.descripcion_insumo,
            unidades: insumos.unidades,
            disponible: insumos.disponible

        }

        const response = await APIInvoke.invokePOST('/api/insumos', data);
        const idInsumo = response._id;

        if (idInsumo === ''){
            const msg = "Hubo un error al agregar un insumo";
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
            navigate("/insumos");

            const msg = "El insumo fue agregado con exito";
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

            setInsumos({
                referencia: "",
                descripcion_insumo: "",
                unidades: "",
                disponible: ""
            });

        }
    }

    const onSubmit =(e) => {
        e.preventDefault();
        CrearInsumos();
    }

  return (

    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>

    <div className="content-wrapper">

        <ContentHeader
            titulo={"Agregar insumo"}
            breadCrumb1={"Listado de insumos pata carpintería"}
            breadCrumb2={"Agregar"}
            ruta1={"/insumos/agregar"} 
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
                                        placeholder="Ingrese el código de referencia (INSXXXX)"
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
                                        <label htmlFor="descripcion_insumo">Descripción del insumo</label>
                                        <input type="text"
                                        className="form-control"
                                        id='descripcion_insumo'
                                        name='descripcion_insumo'
                                        placeholder="Ingrese la descripción del insumo"
                                        value={descripcion_insumo}
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
                                    <button type="submit" className="btn btn-primary">Agregar insumo</button>
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
                </seccion>
            </div>
            <Footer></Footer>
        </div>
  )
}

export default AgregarInsumos