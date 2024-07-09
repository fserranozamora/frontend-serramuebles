import React, { useState, useEffect } from "react";
import ContentHeader from "../../../componentes/ContentHeader";
import Footer from "../../../componentes/Footer";
import Navbar from "../../../componentes/Navbar";
import APIInvoke from "../../../configuracion/APIInvoke";
import SidebarContainer from "../../../componentes/SidebarContainer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AgregarMateriales = () => {
const navigate = useNavigate();

const [materiales, setMateriales] = useState ({
    referencia: "",
    descripcion_material: "",
    unidades: "",
    disponible: ""
  
    
})

const {referencia,descripcion_material,unidades,disponible} = materiales
useEffect(()=>{
    document.getElementById("referencia").focus();
},[])

const onChange =(e) =>{
    setMateriales({
        ...materiales,
    [e.target.name]: e.target.value
    })

}

    const CrearMateriales= async () => {

        const data = {
            referencia: materiales.referencia,
            descripcion_material: materiales.descripcion_material,
            unidades: materiales.unidades,
            disponible: materiales.disponible

        }

        const response = await APIInvoke.invokePOST('/api/materiales', data);
        const idMaterial = response._id;

        if (idMaterial === ''){
            const msg = "Hubo un error al agregar un material";
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
            navigate("/materiales");

            const msg = "El material fue agregado con exito";
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

            setMateriales({
                referencia: "",
                descripcion_material: "",
                unidades: "",
                disponible: ""
            });

        }
    }

    const onSubmit =(e) => {
        e.preventDefault();
        CrearMateriales();
    }

  return (

    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>

    <div className="content-wrapper">

        <ContentHeader
            titulo={"Agregar insumo"}
            breadCrumb1={"Listado de materiales pata carpintería"}
            breadCrumb2={"Agregar"}
            ruta1={"/materiales/agregar"} 
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
                                        placeholder="Ingrese el código de referencia (MATXXXX)"
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
                                        <label htmlFor="descripcion_material">Descripción del material</label>
                                        <input type="text"
                                        className="form-control"
                                        id='descripcion_material'
                                        name='descripcion_material'
                                        placeholder="Ingrese la descripción del material"
                                        value={descripcion_material}
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
                                    <a href="/materiales">
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

export default AgregarMateriales