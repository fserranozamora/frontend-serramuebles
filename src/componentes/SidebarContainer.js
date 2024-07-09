import React from 'react';
import Menu from './Menu';
import logo from "../img/logo_serramuebles.png";
import "../componentes/SidebarContainer.css"
import { Link } from 'react-router-dom';

const SidebarContainer = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"/home"} className="brand-link">
                <img src={logo} className="App-logo1" alt="logo" width={'200px'} />
                <span><p></p></span>
                <span className="brand-text font-weight-light"><p>Control de inventarios</p></span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                       &nbsp; 
                    </div>
                    <div className="info">
                       &nbsp; 
                    </div>
                    <div className="info">
                        <Link to={"/home"} className="d-block"><i className="nav-icon fas fa-th" /><b> Menu Principal </b></Link>
                    </div>
                </div>
                <Menu></Menu>
            </div>
        </aside>
    );
}

export default SidebarContainer;