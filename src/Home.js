import React from 'react'
import { Link } from 'react-router-dom'
import ContentHeader from './componentes/ContentHeader'
import Footer from './componentes/Footer';
import Navbar from './componentes/Navbar';
import SidebarContainer from './componentes/SidebarContainer';

const Home = () => {
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Página principal"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Página principal"}
                    ruta1={"/"}
                />

                <section className="content">
                    <div className="container-fluid">
                        
                        {/* UN SOLO ROW: Permite alinear las tarjetas horizontalmente */}
                        <div className="row">

                            {/* Tarjeta de Herramientas */}
                            {/* col-12: vertical en móviles | col-md-6: horizontal en tablets | col-lg-3: computadoras */}
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <div className="small-box bg-primary">
                                    <div className="inner">
                                        <h3>Herramientas</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-tools" />
                                    </div>
                                    <Link to={"/herramientas"} className="small-box-footer"> 
                                        Herramientas para carpintería <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>

                            {/* Tarjeta de Insumos */}
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <div className="small-box bg-secondary">
                                    <div className="inner">
                                        <h3> Insumos </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-box" />
                                    </div>
                                    <Link to={"/insumos"} className="small-box-footer"> 
                                        Insumos para carpintería <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>

                            {/* Tarjeta de Materiales */}
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <div className="small-box bg-green">
                                    <div className="inner">
                                        <h3> Materiales </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-brush" />
                                    </div>
                                    <Link to={"/materiales"} className="small-box-footer"> 
                                        Productos <i className="fas fa-arrow-circle-right" />
                                    </Link>
                                </div>
                            </div>

                        </div> {/* Fin del row */}

                    </div>
                </section>

            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default Home;
