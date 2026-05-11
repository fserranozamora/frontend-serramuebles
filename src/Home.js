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
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />

                <section className="content">
                    <div className="container-fluid">
                        {/* Un solo row para que todo lo de adentro se alinee horizontalmente */}
                        <div className="row">

                            {/* Caja de Herramientas */}
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="small-box bg-blue">
                                    <div className="inner">
                                        <h3> Herramientas </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-toolbox" />
                                    </div>
                                    <Link to={"/herramientas"} className="small-box-footer"> Herramientas para carpintería <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            {/* Caja de Insumos - Ahora dentro del mismo row */}
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="small-box bg-gray">
                                    <div className="inner">
                                        <h3> Insumos </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-screwdriver" />
                                    </div>
                                    <Link to={"/insumos"} className="small-box-footer"> Insumos para carpintería <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>

                            {/* Caja de Materiales - Ahora dentro del mismo row */}
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="small-box bg-green">
                                    <div className="inner">
                                        <h3> Materiales </h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-brush" />
                                    </div>
                                    <Link to={"/materiales"} className="small-box-footer"> Materiales para carpintería <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>


                        </div> {/* Cierre del único row */}
                    </div>
                </section>


            </div>
            <Footer></Footer>


        </div>
    );
}

export default Home;
